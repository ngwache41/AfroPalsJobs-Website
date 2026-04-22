from collections.abc import Generator
import json
import os
from datetime import datetime, timedelta, timezone
import shutil
from urllib import request, error

import jwt
from fastapi import Depends, FastAPI, Header, HTTPException, UploadFile, File, Form
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
admin_notification_email = os.getenv("ADMIN_NOTIFICATION_EMAIL", "info@afropalsjobs.ru")

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


class LoginRequest(BaseModel):
    username: str
    password: str


class LoginResponse(BaseModel):
    access_token: str
    token_type: str


def send_email_via_resend(to_email: str, subject: str, html: str) -> None:
    if not resend_api_key or not from_email:
        return

    payload = {
        "from": from_email,
        "to": [to_email],
        "subject": subject,
        "html": html,
    }

    data = json.dumps(payload).encode("utf-8")
    req = request.Request(
        url="https://api.resend.com/emails",
        data=data,
        method="POST",
        headers={
            "Authorization": f"Bearer {resend_api_key}",
            "Content-Type": "application/json",
        },
    )

    try:
        with request.urlopen(req, timeout=20) as response:
            response.read()
    except error.HTTPError as exc:
        try:
            print("Resend HTTP error:", exc.read().decode("utf-8"))
        except Exception:
            print("Resend HTTP error")
    except Exception as exc:
        print("Resend send error:", str(exc))


def send_admin_notification(subject: str, html: str) -> None:
    send_email_via_resend(admin_notification_email, subject, html)


def send_employer_notification(subject: str, html: str) -> None:
    send_email_via_resend(admin_notification_email, subject, html)


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

    send_admin_notification(
        subject="New employer job pending approval",
        html=f"""
        <h2>New Job Pending Approval</h2>
        <p><strong>Title:</strong> {job.title}</p>
        <p><strong>Company:</strong> {job.company}</p>
        <p><strong>Location:</strong> {job.location}</p>
        <p><strong>Status:</strong> {job.status}</p>
        <p>Please review this job in the admin dashboard.</p>
        """,
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

    send_employer_notification(
        subject=f"Job status updated: {job.title}",
        html=f"""
        <h2>Job Status Updated</h2>
        <p><strong>Title:</strong> {job.title}</p>
        <p><strong>Company:</strong> {job.company}</p>
        <p><strong>New Status:</strong> {job.status}</p>
        <p>Your submitted job has been reviewed by the admin.</p>
        """,
    )

    return job


# ================= JOB APPLICATIONS =================

@app.post("/job-applications")
async def create_job_application(
    job_id: int = Form(...),
    full_name: str = Form(...),
    email: str = Form(...),
    phone: str = Form(...),
    cover_letter: str = Form(""),
    cv_file: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    job = db.query(Job).filter(Job.id == job_id, Job.status == "approved").first()
    if job is None:
        raise HTTPException(status_code=404, detail="Approved job not found")

    timestamp = datetime.utcnow().strftime("%Y%m%d%H%M%S")
    filename = f"{timestamp}_{cv_file.filename}"
    file_path = os.path.join(UPLOAD_DIR, filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(cv_file.file, buffer)

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

    send_admin_notification(
        subject="New job application received",
        html=f"""
        <h2>New Job Application</h2>
        <p><strong>Job:</strong> {job.title}</p>
        <p><strong>Applicant:</strong> {application.full_name}</p>
        <p><strong>Email:</strong> {application.email}</p>
        <p><strong>Phone:</strong> {application.phone}</p>
        <p><strong>Cover Letter:</strong> {application.cover_letter or "No cover letter provided."}</p>
        <p>Please review this application in the admin dashboard.</p>
        """,
    )

    return {
        "message": "Job application submitted successfully",
        "application_id": application.id,
        "cv_file_url": f"/uploads/{filename}",
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
    timestamp = datetime.utcnow().strftime("%Y%m%d%H%M%S")
    filename = f"{timestamp}_{passport_file.filename}"
    file_path = os.path.join(UPLOAD_DIR, filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(passport_file.file, buffer)

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

    send_admin_notification(
        subject="New visa application received",
        html=f"""
        <h2>New Visa Application</h2>
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
        """,
    )

    return {
        "message": "Application submitted",
        "file_url": f"/uploads/{filename}",
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