from collections.abc import Generator
import os
from datetime import datetime, timedelta, timezone
import shutil

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