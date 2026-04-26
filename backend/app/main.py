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
admin_password = os.getenv("ADMIN_PASSWORD", "ChangeThis123!")

employer_username = os.getenv("EMPLOYER_USERNAME", "employer")
employer_password = os.getenv("EMPLOYER_PASSWORD", "ChangeEmployer123!")

resend_api_key = os.getenv("RESEND_API_KEY", "")
from_email = os.getenv("FROM_EMAIL", "info@afropalsjobs.ru")
admin_notification_email = os.getenv("ADMIN_NOTIFICATION_EMAIL", "afropalsjobs@yandex.ru")

# ================= CLOUDINARY =================

cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET"),
    secure=True,
)

# ================= CORS =================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # keep simple for now
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ================= DB =================

Base.metadata.create_all(bind=engine)

def get_db() -> Generator:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ================= HELPERS =================

def create_token(username: str, role: str):
    expire = datetime.now(timezone.utc) + timedelta(minutes=60)
    payload = {"sub": username, "role": role, "exp": expire}
    return jwt.encode(payload, secret_key, algorithm="HS256")

def verify_token(role_required: str, authorization: str = Header(None)):
    if not authorization:
        raise HTTPException(401, "No token")

    token = authorization.split(" ")[1]
    payload = jwt.decode(token, secret_key, algorithms=["HS256"])

    if payload["role"] != role_required:
        raise HTTPException(403, "Forbidden")

    return payload

async def upload_to_cloudinary(file: UploadFile):
    content = await file.read()
    result = cloudinary.uploader.upload(io.BytesIO(content))
    return result["secure_url"]

# ================= AUTH =================

class LoginRequest(BaseModel):
    username: str
    password: str

@app.post("/admin/login")
def admin_login(data: LoginRequest):
    if data.username != admin_username or data.password != admin_password:
        raise HTTPException(401, "Invalid admin credentials")

    return {"access_token": create_token(data.username, "admin")}

@app.post("/employer/login")
def employer_login(data: LoginRequest):
    if data.username != employer_username or data.password != employer_password:
        raise HTTPException(401, "Invalid employer credentials")

    return {"access_token": create_token(data.username, "employer")}

# ================= JOBS =================

@app.get("/jobs", response_model=list[JobRead])
def get_jobs(db: Session = Depends(get_db)):
    return db.query(Job).filter(Job.status == "approved").all()

@app.get("/admin/jobs", response_model=list[JobRead])
def admin_jobs(db: Session = Depends(get_db), _: dict = Depends(lambda h=Header(None): verify_token("admin", h))):
    return db.query(Job).all()

@app.post("/jobs", response_model=JobRead)
def create_job(data: JobCreate, db: Session = Depends(get_db)):
    job = Job(**data.dict(), status="approved", created_by="admin")
    db.add(job)
    db.commit()
    db.refresh(job)
    return job

# ================= JOB APPLICATION =================

@app.post("/job-applications")
async def job_application(
    job_id: int = Form(...),
    full_name: str = Form(...),
    email: str = Form(...),
    phone: str = Form(...),
    cover_letter: str = Form(""),
    cv_file: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    file_url = await upload_to_cloudinary(cv_file)

    app_data = JobApplication(
        job_id=job_id,
        full_name=full_name,
        email=email,
        phone=phone,
        cover_letter=cover_letter,
        cv_file_path=file_url,
        status="pending",
    )

    db.add(app_data)
    db.commit()

    return {"message": "Application submitted"}

@app.get("/job-applications", response_model=list[JobApplicationRead])
def get_apps(db: Session = Depends(get_db), _: dict = Depends(lambda h=Header(None): verify_token("admin", h))):
    return db.query(JobApplication).all()

# ================= VISA =================

@app.post("/visa-applications")
async def visa_application(
    full_name: str = Form(...),
    email: str = Form(...),
    phone: str = Form(...),
    nationality: str = Form(...),
    passport_number: str = Form(...),
    visa_type: str = Form(...),
    destination_city: str = Form(...),
    travel_date: str = Form(...),
    purpose_of_visit: str = Form(...),
    passport_file: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    file_url = await upload_to_cloudinary(passport_file)

    visa = VisaApplication(
        full_name=full_name,
        email=email,
        phone=phone,
        nationality=nationality,
        passport_number=passport_number,
        visa_type=visa_type,
        destination_city=destination_city,
        travel_date=travel_date,
        purpose_of_visit=purpose_of_visit,
        passport_file_path=file_url,
        status="pending",
    )

    db.add(visa)
    db.commit()

    return {"message": "Visa submitted"}

@app.get("/visa-applications", response_model=list[VisaApplicationRead])
def get_visas(db: Session = Depends(get_db), _: dict = Depends(lambda h=Header(None): verify_token("admin", h))):
    return db.query(VisaApplication).all()

# ================= ROOT =================

@app.get("/")
def root():
    return {"message": "API running"}