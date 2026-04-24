from collections.abc import Generator
import os
from datetime import datetime, timedelta, timezone
import shutil
import time
from pathlib import Path

import jwt
import resend
from fastapi import Depends, FastAPI, Header, HTTPException, UploadFile, File, Form, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database import Base, SessionLocal, engine
from app.models import Job, JobApplication
from app.schemas import JobCreate, JobRead, JobApplicationRead, JobStatusUpdate
from app.visa_models import VisaApplication
from app.visa_schemas import VisaApplicationRead, VisaApplicationStatusUpdate

app = FastAPI(title="AfroPals Jobs API")

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

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

Base.metadata.create_all(bind=engine)

RATE_LIMIT_STORE: dict[str, list[float]] = {}
PUBLIC_SUBMISSION_LIMIT = 5
PUBLIC_SUBMISSION_WINDOW_SECONDS = 300

ALLOWED_CV_EXTENSIONS = {".pdf", ".doc", ".docx"}
ALLOWED_PASSPORT_EXTENSIONS = {".pdf", ".jpg", ".jpeg", ".png"}
MAX_UPLOAD_SIZE_BYTES = 8 * 1024 * 1024


class LoginRequest(BaseModel):
    username: str
    password: str


class LoginResponse(BaseModel):
    access_token: str
    token_type: str


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


async def validate_and_save_upload(
    upload_file: UploadFile,
    allowed_extensions: set[str],
    label: str,
) -> tuple[str, str]:
    filename = safe_upload_filename(upload_file.filename or "")
    extension = Path(filename).suffix.lower()

    if extension not in allowed_extensions:
        allowed = ", ".join(sorted(allowed_extensions))
        raise HTTPException(
            status_code=400,
            detail=f"Invalid {label} file type. Allowed file types: {allowed}",
        )

    file_path = os.path.join(UPLOAD_DIR, filename)

    total_size = 0
    with open(file_path, "wb") as buffer:
        while True:
            chunk = await upload_file.read(1024 * 1024)
            if not chunk:
                break

            total_size += len(chunk)
            if total_size > MAX_UPLOAD_SIZE_BYTES:
                buffer.close()
                try:
                    os.remove(file_path)
                except FileNotFoundError:
                    pass
                raise HTTPException(
                    status_code=400,
                    detail=f"{label.capitalize()} file is too large. Maximum size is 8MB.",
                )

            buffer.write(chunk)

    await upload_file.close()

    return file_path, f"/uploads/{filename}"


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


def send_employer_notification(subject: str, html: str) -> dict:
    return send_email_via_resend(admin_notification_email, subject, html)


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


def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
def root():
    return {"message": "API is running"}


@app.get("/debug/send-test-email")
def debug_send_test_email():
    html = build_email_layout(
        "Test Email Working",
        """
        <p>This is a successful test email from AfroPals Jobs.</p>
        <p>Your email system is active and working correctly.</p>
        """
    )
    return send_email_via_resend(
        to_email=admin_notification_email,
        subject="AfroPals test email",
        html=html,
    )


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


@app.get("/jobs/{job_id}", response_model=JobRead)
def get_job(job_id: int, db: Session = Depends(get_db)):
    job = db.query(Job).filter(Job.id == job_id).first()
    if job is None:
        raise HTTPException(status_code=404, detail="Job not found")
    return job


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
        <p>Please review this job in the admin dashboard.</p>
        """
    )
    notification_result = send_admin_notification(
        subject="New employer job pending approval",
        html=admin_html,
    )
    print("RESEND DEBUG employer job notification =", notification_result)

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

    employer_html = build_email_layout(
        "Job Status Updated",
        f"""
        <p>Your submitted job has been reviewed.</p>
        <p><strong>Title:</strong> {job.title}</p>
        <p><strong>Company:</strong> {job.company}</p>
        <p><strong>New Status:</strong> {job.status}</p>
        <p>Please contact AfroPals Jobs if you need further support.</p>
        """
    )
    notification_result = send_employer_notification(
        subject=f"Job status updated: {job.title}",
        html=employer_html,
    )
    print("RESEND DEBUG job status notification =", notification_result)

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

    file_path, file_url = await validate_and_save_upload(
        cv_file,
        ALLOWED_CV_EXTENSIONS,
        "CV",
    )

    application = JobApplication(
        job_id=job_id,
        full_name=full_name,
        email=email,
        phone=phone,
        cover_letter=cover_letter,
        cv_file_path=file_path,
        status="pending",
    )
    db.add(application)
    db.commit()
    db.refresh(application)

    admin_html = build_email_layout(
        "New Job Application Received",
        f"""
        <p>A new candidate application has been submitted.</p>
        <p><strong>Job:</strong> {job.title}</p>
        <p><strong>Applicant:</strong> {application.full_name}</p>
        <p><strong>Email:</strong> {application.email}</p>
        <p><strong>Phone:</strong> {application.phone}</p>
        <p><strong>Cover Letter:</strong> {application.cover_letter or "No cover letter provided."}</p>
        <p>Please review this application in the admin dashboard.</p>
        """
    )
    notification_result = send_admin_notification(
        subject="New job application received",
        html=admin_html,
    )
    print("RESEND DEBUG job application notification =", notification_result)

    user_html = build_email_layout(
        "Application Received",
        f"""
        <p>Dear {full_name},</p>
        <p>Thank you for applying through AfroPals Jobs.</p>
        <p>We have successfully received your application for:</p>
        <p><strong>{job.title}</strong></p>
        <p>Our team will review your submission and contact you if your profile matches the role.</p>
        """
    )
    user_result = send_email_via_resend(
        to_email=email,
        subject="Application received - AfroPals Jobs",
        html=user_html,
    )
    print("RESEND DEBUG applicant confirmation =", user_result)

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


@app.get("/job-applications/{application_id}", response_model=JobApplicationRead)
def get_job_application(
    application_id: int,
    db: Session = Depends(get_db),
    _: dict = Depends(verify_admin_token),
):
    application = (
        db.query(JobApplication)
        .filter(JobApplication.id == application_id)
        .first()
    )
    if application is None:
        raise HTTPException(status_code=404, detail="Job application not found")
    return application


# ================= VISA =================

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

    file_path, file_url = await validate_and_save_upload(
        passport_file,
        ALLOWED_PASSPORT_EXTENSIONS,
        "passport",
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
        status="pending",
    )

    if hasattr(visa_application, "file_path"):
        visa_application.file_path = file_path

    db.add(visa_application)
    db.commit()
    db.refresh(visa_application)

    admin_html = build_email_layout(
        "New Visa Application Received",
        f"""
        <p>A new visa application has been submitted.</p>
        <p><strong>Full Name:</strong> {visa_application.full_name}</p>
        <p><strong>Email:</strong> {visa_application.email}</p>
        <p><strong>Phone:</strong> {visa_application.phone}</p>
        <p><strong>Nationality:</strong> {visa_application.nationality}</p>
        <p><strong>Passport Number:</strong> {visa_application.passport_number}</p>
        <p><strong>Visa Type:</strong> {visa_application.visa_type}</p>
        <p><strong>Destination City:</strong> {visa_application.destination_city}</p>
        <p><strong>Travel Date:</strong> {visa_application.travel_date}</p>
        <p><strong>Purpose of Visit:</strong> {visa_application.purpose_of_visit}</p>
        <p>Please review this application in the admin dashboard.</p>
        """
    )
    notification_result = send_admin_notification(
        subject="New visa application received",
        html=admin_html,
    )
    print("RESEND DEBUG visa application notification =", notification_result)

    user_html = build_email_layout(
        "Visa Application Received",
        f"""
        <p>Dear {full_name},</p>
        <p>Your visa application has been received successfully.</p>
        <p>Our team will review your request and contact you with the next steps.</p>
        <p><strong>Visa Type:</strong> {visa_type}</p>
        <p><strong>Destination City:</strong> {destination_city}</p>
        <p><strong>Travel Date:</strong> {travel_date}</p>
        """
    )
    user_result = send_email_via_resend(
        to_email=email,
        subject="Visa application received - AfroPals Jobs",
        html=user_html,
    )
    print("RESEND DEBUG visa applicant confirmation =", user_result)

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


@app.get("/visa-applications/{application_id}", response_model=VisaApplicationRead)
def get_visa_application(
    application_id: int,
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
    return application


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