from collections.abc import Generator
import io
import os
from datetime import datetime, timedelta, timezone
import time
from pathlib import Path

import cloudinary
import cloudinary.uploader
import jwt
import resend
from fastapi import Depends, FastAPI, Header, HTTPException, UploadFile, File, Form, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import text
from sqlalchemy.orm import Session

from app.database import Base, SessionLocal, engine
from app.models import Job, JobApplication
from app.schemas import JobCreate, JobRead, JobApplicationRead, JobStatusUpdate
from app.visa_models import VisaApplication
from app.visa_schemas import VisaApplicationRead, VisaApplicationStatusUpdate

app = FastAPI(title="AfroPals Jobs API")

# ================= ENV =================

frontend_url = os.getenv("FRONTEND_URL", "https://afropalsjobs.ru")
secret_key = os.getenv("SECRET_KEY", "supersecretkey")

admin_username = os.getenv("ADMIN_USERNAME", "admin")
admin_password = os.getenv("ADMIN_PASSWORD", "ChangeThisToAStrongPassword123!")

employer_username = os.getenv("EMPLOYER_USERNAME", "employer")
employer_password = os.getenv("EMPLOYER_PASSWORD", "ChangeEmployerPassword123!")

access_token_expire_minutes = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "60"))

resend_api_key = os.getenv("RESEND_API_KEY", "")
from_email = os.getenv("FROM_EMAIL", "info@afropalsjobs.ru")
admin_notification_email = os.getenv("ADMIN_NOTIFICATION_EMAIL", "afropalsjobs@yandex.ru")

cloudinary_cloud_name = os.getenv("CLOUDINARY_CLOUD_NAME", "")
cloudinary_api_key = os.getenv("CLOUDINARY_API_KEY", "")
cloudinary_api_secret = os.getenv("CLOUDINARY_API_SECRET", "")

cloudinary.config(
    cloud_name=cloudinary_cloud_name,
    api_key=cloudinary_api_key,
    api_secret=cloudinary_api_secret,
    secure=True,
)

# ================= CORS =================

origins = [
    frontend_url,
    "https://afropalsjobs.ru",
    "https://www.afropalsjobs.ru",
    "https://afropals-frontend.onrender.com",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ================= DATABASE =================

Base.metadata.create_all(bind=engine)


def run_light_migrations() -> None:
    with engine.connect() as connection:
        visa_columns = connection.execute(text("PRAGMA table_info(visa_applications)")).fetchall()
        visa_column_names = [column[1] for column in visa_columns]

        if "passport_file_path" not in visa_column_names:
            connection.execute(
                text("ALTER TABLE visa_applications ADD COLUMN passport_file_path VARCHAR(500)")
            )
            connection.commit()


run_light_migrations()


def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ================= SECURITY / UPLOAD SETTINGS =================

RATE_LIMIT_STORE: dict[str, list[float]] = {}
PUBLIC_SUBMISSION_LIMIT = 5
PUBLIC_SUBMISSION_WINDOW_SECONDS = 300

ALLOWED_CV_EXTENSIONS = {".pdf", ".doc", ".docx"}
ALLOWED_PASSPORT_EXTENSIONS = {".pdf", ".jpg", ".jpeg", ".png"}
MAX_UPLOAD_SIZE_BYTES = 8 * 1024 * 1024


# ================= MODELS =================

class LoginRequest(BaseModel):
    username: str
    password: str


class LoginResponse(BaseModel):
    access_token: str
    token_type: str


# ================= RATE LIMIT =================

def get_client_ip(request: Request) -> str:
    forwarded_for = request.headers.get("x-forwarded-for")
    if forwarded_for:
        return forwarded_for.split(",")[0].strip()

    if request.client:
        return request.client.host

    return "unknown"


def check_rate_limit(request: Request, action: str) -> None:
    client_ip = get_client_ip(request)
    key = f"{action}:{client_ip}"
    now = time.time()

    timestamps = RATE_LIMIT_STORE.get(key, [])
    timestamps = [
        timestamp
        for timestamp in timestamps
        if now - timestamp < PUBLIC_SUBMISSION_WINDOW_SECONDS
    ]

    if len(timestamps) >= PUBLIC_SUBMISSION_LIMIT:
        raise HTTPException(
            status_code=429,
            detail="Too many submissions. Please wait a few minutes and try again.",
        )

    timestamps.append(now)
    RATE_LIMIT_STORE[key] = timestamps


# ================= FILE HELPERS =================

def safe_upload_filename(original_filename: str) -> str:
    original_name = Path(original_filename or "uploaded_file").name
    stem = Path(original_name).stem
    suffix = Path(original_name).suffix.lower()

    safe_stem = "".join(
        character if character.isalnum() or character in ("-", "_") else "_"
        for character in stem
    ).strip("_")

    if not safe_stem:
        safe_stem = "file"

    timestamp = datetime.utcnow().strftime("%Y%m%d%H%M%S")
    return f"{timestamp}_{safe_stem}{suffix}"


async def validate_upload_file(
    upload_file: UploadFile,
    allowed_extensions: set[str],
    label: str,
) -> tuple[str, bytes]:
    filename = safe_upload_filename(upload_file.filename or "")
    extension = Path(filename).suffix.lower()

    if extension not in allowed_extensions:
        allowed = ", ".join(sorted(allowed_extensions))
        raise HTTPException(
            status_code=400,
            detail=f"Invalid {label} file type. Allowed file types: {allowed}",
        )

    file_bytes = await upload_file.read()

    if len(file_bytes) > MAX_UPLOAD_SIZE_BYTES:
        raise HTTPException(
            status_code=400,
            detail=f"{label.capitalize()} file is too large. Maximum size is 8MB.",
        )

    if len(file_bytes) == 0:
        raise HTTPException(
            status_code=400,
            detail=f"{label.capitalize()} file is empty.",
        )

    return filename, file_bytes


async def upload_to_cloudinary(
    upload_file: UploadFile,
    allowed_extensions: set[str],
    label: str,
    folder: str,
) -> str:
    if not cloudinary_cloud_name or not cloudinary_api_key or not cloudinary_api_secret:
        raise HTTPException(
            status_code=500,
            detail="Cloudinary is not configured on the backend.",
        )

    filename, file_bytes = await validate_upload_file(
        upload_file,
        allowed_extensions,
        label,
    )

    public_id = Path(filename).stem

    try:
        result = cloudinary.uploader.upload(
            io.BytesIO(file_bytes),
            folder=folder,
            resource_type="raw",
            public_id=public_id,
            filename_override=filename,
            use_filename=True,
            unique_filename=True,
            overwrite=False,
            type="upload",
            access_mode="public",
        )
    except Exception as exc:
        print("CLOUDINARY ERROR:", str(exc))
        raise HTTPException(
            status_code=500,
            detail=f"Failed to upload {label} file to cloud storage: {str(exc)}",
        )

    secure_url = result.get("secure_url")

    if not secure_url:
        raise HTTPException(
            status_code=500,
            detail=f"Cloudinary did not return a secure URL for the {label} file.",
        )

    return secure_url


# ================= EMAIL =================

def build_email_layout(title: str, body_html: str) -> str:
    return f"""
    <div style="margin:0;padding:0;background:#f5f7fb;font-family:Arial,Helvetica,sans-serif;">
      <div style="max-width:640px;margin:0 auto;padding:32px 20px;">
        <div style="background:linear-gradient(135deg,#0f172a 0%,#111827 60%,#1f2937 100%);padding:24px 28px;border-radius:18px 18px 0 0;">
          <h1 style="margin:0;font-size:28px;color:#ffffff;">AfroPals Jobs</h1>
          <p style="margin:8px 0 0 0;color:rgba(255,255,255,0.82);font-size:14px;">
            Jobs, visa support, and invitation applications
          </p>
        </div>

        <div style="background:#ffffff;padding:28px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 18px 18px;">
          <h2 style="margin:0 0 18px 0;color:#0f172a;font-size:24px;">{title}</h2>
          <div style="color:#334155;font-size:15px;line-height:1.75;">
            {body_html}
          </div>

          <div style="margin-top:28px;padding-top:18px;border-top:1px solid #e5e7eb;color:#64748b;font-size:13px;line-height:1.7;">
            AfroPals Jobs<br/>
            Website: www.afropalsjobs.ru<br/>
            Email: info@afropalsjobs.ru
          </div>
        </div>
      </div>
    </div>
    """


def send_email_via_resend(to_email: str, subject: str, html: str) -> dict:
    try:
        resend.api_key = resend_api_key

        response = resend.Emails.send({
            "from": from_email,
            "to": [to_email],
            "subject": subject,
            "html": html,
        })

        print("RESEND SUCCESS:", response)
        return {"ok": True, "response": response}

    except Exception as e:
        print("RESEND ERROR:", str(e))
        return {"ok": False, "error": str(e)}


def send_admin_notification(subject: str, html: str) -> dict:
    return send_email_via_resend(admin_notification_email, subject, html)


# ================= AUTH =================

def create_token(username: str, role: str) -> str:
    expire = datetime.now(timezone.utc) + timedelta(minutes=access_token_expire_minutes)
    payload = {
        "sub": username,
        "role": role,
        "exp": expire,
    }
    return jwt.encode(payload, secret_key, algorithm="HS256")


def decode_token_from_header(authorization: str | None) -> dict:
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Not authenticated")

    token = authorization.split(" ", 1)[1]

    try:
        payload = jwt.decode(token, secret_key, algorithms=["HS256"])
        return payload
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid or expired token")


def verify_admin_token(authorization: str | None = Header(default=None)) -> dict:
    payload = decode_token_from_header(authorization)

    if payload.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Forbidden")

    return payload


def verify_employer_token(authorization: str | None = Header(default=None)) -> dict:
    payload = decode_token_from_header(authorization)

    if payload.get("role") != "employer":
        raise HTTPException(status_code=403, detail="Forbidden")

    return payload


# ================= ROOT =================

@app.get("/")
def root():
    return {"message": "API is running"}


# ================= ADMIN AUTH =================

@app.post("/admin/login", response_model=LoginResponse)
def admin_login(payload: LoginRequest):
    if payload.username != admin_username or payload.password != admin_password:
        raise HTTPException(status_code=401, detail="Invalid admin credentials")

    access_token = create_token(payload.username, "admin")
    return LoginResponse(access_token=access_token, token_type="bearer")


@app.get("/admin/me")
def admin_me(_: dict = Depends(verify_admin_token)):
    return {"message": "Authenticated admin"}


# ================= EMPLOYER AUTH =================

@app.post("/employer/login", response_model=LoginResponse)
def employer_login(payload: LoginRequest):
    if payload.username != employer_username or payload.password != employer_password:
        raise HTTPException(status_code=401, detail="Invalid employer credentials")

    access_token = create_token(payload.username, "employer")
    return LoginResponse(access_token=access_token, token_type="bearer")


@app.get("/employer/me")
def employer_me(_: dict = Depends(verify_employer_token)):
    return {"message": "Authenticated employer"}


# ================= JOBS =================

@app.get("/jobs", response_model=list[JobRead])
def list_jobs(db: Session = Depends(get_db)):
    return db.query(Job).filter(Job.status == "approved").all()


@app.get("/admin/jobs", response_model=list[JobRead])
def list_all_jobs_for_admin(
    db: Session = Depends(get_db),
    _: dict = Depends(verify_admin_token),
):
    return db.query(Job).all()


@app.post("/jobs", response_model=JobRead)
def create_job(
    payload: JobCreate,
    db: Session = Depends(get_db),
    _: dict = Depends(verify_admin_token),
):
    job = Job(
        title=payload.title,
        company=payload.company,
        location=payload.location,
        description=payload.description,
        status="approved",
        created_by="admin",
    )

    db.add(job)
    db.commit()
    db.refresh(job)

    return job


@app.post("/employer/jobs", response_model=JobRead)
def create_employer_job(
    payload: JobCreate,
    db: Session = Depends(get_db),
    _: dict = Depends(verify_employer_token),
):
    job = Job(
        title=payload.title,
        company=payload.company,
        location=payload.location,
        description=payload.description,
        status="pending",
        created_by="employer",
    )

    db.add(job)
    db.commit()
    db.refresh(job)

    admin_html = build_email_layout(
        "New Employer Job Pending Approval",
        f"""
        <p>A new employer-submitted job requires review.</p>
        <p><strong>Title:</strong> {job.title}</p>
        <p><strong>Company:</strong> {job.company}</p>
        <p><strong>Location:</strong> {job.location}</p>
        <p><strong>Status:</strong> {job.status}</p>
        """
    )

    send_admin_notification(
        subject="New employer job pending approval",
        html=admin_html,
    )

    return job


@app.patch("/admin/jobs/{job_id}/status", response_model=JobRead)
def update_job_status(
    job_id: int,
    payload: JobStatusUpdate,
    db: Session = Depends(get_db),
    _: dict = Depends(verify_admin_token),
):
    job = db.query(Job).filter(Job.id == job_id).first()

    if job is None:
        raise HTTPException(status_code=404, detail="Job not found")

    job.status = payload.status
    db.commit()
    db.refresh(job)

    return job


# ================= JOB APPLICATIONS =================

@app.post("/job-applications")
async def create_job_application(
    request: Request,
    job_id: int = Form(...),
    full_name: str = Form(...),
    email: str = Form(...),
    phone: str = Form(...),
    cover_letter: str = Form(""),
    cv_file: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    check_rate_limit(request, "job_application")

    job = db.query(Job).filter(Job.id == job_id, Job.status == "approved").first()

    if job is None:
        raise HTTPException(status_code=404, detail="Approved job not found")

    file_url = await upload_to_cloudinary(
        cv_file,
        ALLOWED_CV_EXTENSIONS,
        "CV",
        "afropals_jobs/cv_uploads",
    )

    application = JobApplication(
        job_id=job_id,
        full_name=full_name,
        email=email,
        phone=phone,
        cover_letter=cover_letter,
        cv_file_path=file_url,
        status="pending",
    )

    db.add(application)
    db.commit()
    db.refresh(application)

    admin_html = build_email_layout(
        "New Job Application Received",
        f"""
        <p><strong>Job:</strong> {job.title}</p>
        <p><strong>Applicant:</strong> {application.full_name}</p>
        <p><strong>Email:</strong> {application.email}</p>
        <p><strong>Phone:</strong> {application.phone}</p>
        <p><strong>Cover Letter:</strong> {application.cover_letter or "No cover letter provided."}</p>
        <p><a href="{file_url}">View uploaded CV</a></p>
        """
    )

    send_admin_notification(
        subject="New job application received",
        html=admin_html,
    )

    user_html = build_email_layout(
        "Application Received",
        f"""
        <p>Dear {full_name},</p>
        <p>Thank you for applying through AfroPals Jobs.</p>
        <p>We received your application for <strong>{job.title}</strong>.</p>
        """
    )

    send_email_via_resend(
        to_email=email,
        subject="Application received - AfroPals Jobs",
        html=user_html,
    )

    return {
        "message": "Job application submitted successfully",
        "application_id": application.id,
        "cv_file_url": file_url,
    }


@app.get("/job-applications", response_model=list[JobApplicationRead])
def list_job_applications(
    db: Session = Depends(get_db),
    _: dict = Depends(verify_admin_token),
):
    return db.query(JobApplication).all()


# ================= VISA APPLICATIONS =================

@app.post("/visa-applications")
async def create_visa_application(
    request: Request,
    full_name: str = Form(...),
    email: str = Form(...),
    phone: str = Form(...),
    nationality: str = Form(...),
    passport_number: str = Form(...),
    visa_type: str = Form(...),
    destination_city: str = Form(...),
    travel_date: str = Form(...),
    purpose_of_visit: str = Form(...),
    host_or_company: str | None = Form(None),
    school_name: str | None = Form(None),
    accommodation_details: str | None = Form(None),
    extra_notes: str | None = Form(None),
    passport_file: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    check_rate_limit(request, "visa_application")

    file_url = await upload_to_cloudinary(
        passport_file,
        ALLOWED_PASSPORT_EXTENSIONS,
        "passport",
        "afropals_jobs/passport_uploads",
    )

    visa_application = VisaApplication(
        full_name=full_name,
        email=email,
        phone=phone,
        nationality=nationality,
        passport_number=passport_number,
        visa_type=visa_type,
        destination_city=destination_city,
        travel_date=travel_date,
        purpose_of_visit=purpose_of_visit,
        host_or_company=host_or_company,
        school_name=school_name,
        accommodation_details=accommodation_details,
        extra_notes=extra_notes,
        passport_file_path=file_url,
        status="pending",
    )

    db.add(visa_application)
    db.commit()
    db.refresh(visa_application)

    admin_html = build_email_layout(
        "New Visa Application Received",
        f"""
        <p><strong>Full Name:</strong> {visa_application.full_name}</p>
        <p><strong>Email:</strong> {visa_application.email}</p>
        <p><strong>Phone:</strong> {visa_application.phone}</p>
        <p><strong>Nationality:</strong> {visa_application.nationality}</p>
        <p><strong>Passport Number:</strong> {visa_application.passport_number}</p>
        <p><strong>Visa Type:</strong> {visa_application.visa_type}</p>
        <p><strong>Destination City:</strong> {visa_application.destination_city}</p>
        <p><strong>Travel Date:</strong> {visa_application.travel_date}</p>
        <p><strong>Purpose of Visit:</strong> {visa_application.purpose_of_visit}</p>
        <p><a href="{file_url}">View uploaded passport file</a></p>
        """
    )

    send_admin_notification(
        subject="New visa application received",
        html=admin_html,
    )

    user_html = build_email_layout(
        "Visa Application Received",
        f"""
        <p>Dear {full_name},</p>
        <p>Your visa application has been received successfully.</p>
        <p>Our team will review your request and contact you with the next steps.</p>
        """
    )

    send_email_via_resend(
        to_email=email,
        subject="Visa application received - AfroPals Jobs",
        html=user_html,
    )

    return {
        "message": "Application submitted",
        "file_url": file_url,
    }


@app.get("/visa-applications", response_model=list[VisaApplicationRead])
def list_visa_applications(
    db: Session = Depends(get_db),
    _: dict = Depends(verify_admin_token),
):
    return db.query(VisaApplication).all()


@app.patch("/visa-applications/{application_id}/status", response_model=VisaApplicationRead)
def update_visa_application_status(
    application_id: int,
    payload: VisaApplicationStatusUpdate,
    db: Session = Depends(get_db),
    _: dict = Depends(verify_admin_token),
):
    application = (
        db.query(VisaApplication)
        .filter(VisaApplication.id == application_id)
        .first()
    )

    if application is None:
        raise HTTPException(status_code=404, detail="Visa application not found")

    application.status = payload.status
    db.commit()
    db.refresh(application)

    return application