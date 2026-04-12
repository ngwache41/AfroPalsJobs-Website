from collections.abc import Generator
import os
from datetime import datetime, timedelta, timezone

import jwt
from fastapi import Depends, FastAPI, Header, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database import Base, SessionLocal, engine
from app.models import Job
from app.schemas import JobCreate, JobRead
from app.visa_models import VisaApplication
from app.visa_schemas import (
    VisaApplicationCreate,
    VisaApplicationRead,
    VisaApplicationStatusUpdate,
)

app = FastAPI(title="AfroPals Jobs API")

frontend_url = os.getenv("FRONTEND_URL", "https://afropalsjobs.ru")
secret_key = os.getenv("SECRET_KEY", "supersecretkey")
admin_username = os.getenv("ADMIN_USERNAME", "admin")
admin_password = os.getenv("ADMIN_PASSWORD", "ChangeThisToAStrongPassword123!")
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


class AdminLoginRequest(BaseModel):
    username: str
    password: str


class AdminLoginResponse(BaseModel):
    access_token: str
    token_type: str


def create_admin_token(username: str) -> str:
    expire = datetime.now(timezone.utc) + timedelta(minutes=access_token_expire_minutes)
    payload = {
        "sub": username,
        "role": "admin",
        "exp": expire,
    }
    return jwt.encode(payload, secret_key, algorithm="HS256")


def verify_admin_token(authorization: str | None = Header(default=None)) -> dict:
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Not authenticated")

    token = authorization.split(" ", 1)[1]

    try:
        payload = jwt.decode(token, secret_key, algorithms=["HS256"])
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    if payload.get("role") != "admin":
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


@app.post("/admin/login", response_model=AdminLoginResponse)
def admin_login(payload: AdminLoginRequest):
    if payload.username != admin_username or payload.password != admin_password:
        raise HTTPException(status_code=401, detail="Invalid admin credentials")

    access_token = create_admin_token(payload.username)
    return AdminLoginResponse(access_token=access_token, token_type="bearer")


@app.get("/admin/me")
def admin_me(_: dict = Depends(verify_admin_token)):
    return {"message": "Authenticated admin"}


@app.post("/jobs", response_model=JobRead)
def create_job(payload: JobCreate, db: Session = Depends(get_db)):
    job = Job(
        title=payload.title,
        company=payload.company,
        location=payload.location,
        description=payload.description,
    )
    db.add(job)
    db.commit()
    db.refresh(job)
    return job


@app.get("/jobs", response_model=list[JobRead])
def list_jobs(db: Session = Depends(get_db)):
    return db.query(Job).all()


@app.get("/jobs/{job_id}", response_model=JobRead)
def get_job(job_id: int, db: Session = Depends(get_db)):
    job = db.query(Job).filter(Job.id == job_id).first()
    if job is None:
        raise HTTPException(status_code=404, detail="Job not found")
    return job


@app.post("/visa-applications", response_model=VisaApplicationRead)
def create_visa_application(
    payload: VisaApplicationCreate,
    db: Session = Depends(get_db),
):
    visa_application = VisaApplication(
        full_name=payload.full_name,
        email=payload.email,
        phone=payload.phone,
        nationality=payload.nationality,
        passport_number=payload.passport_number,
        visa_type=payload.visa_type,
        destination_city=payload.destination_city,
        travel_date=payload.travel_date,
        purpose_of_visit=payload.purpose_of_visit,
        host_or_company=payload.host_or_company,
        school_name=payload.school_name,
        accommodation_details=payload.accommodation_details,
        extra_notes=payload.extra_notes,
        status="pending",
    )
    db.add(visa_application)
    db.commit()
    db.refresh(visa_application)
    return visa_application


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