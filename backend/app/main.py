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

# ========================
# ENV CONFIG
# ========================
frontend_url = os.getenv("FRONTEND_URL", "https://afropalsjobs.ru")
secret_key = os.getenv("SECRET_KEY", "supersecretkey")

admin_username = os.getenv("ADMIN_USERNAME", "admin")
admin_password = os.getenv("ADMIN_PASSWORD", "password")

employer_username = os.getenv("EMPLOYER_USERNAME", "employer")
employer_password = os.getenv("EMPLOYER_PASSWORD", "password")

access_token_expire_minutes = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "60"))

# ========================
# CORS
# ========================
origins = [
    frontend_url,
    "https://afropalsjobs.ru",
    "https://www.afropalsjobs.ru",
    "https://afropals-frontend.onrender.com",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

# ========================
# SCHEMAS
# ========================
class LoginRequest(BaseModel):
    username: str
    password: str


class LoginResponse(BaseModel):
    access_token: str
    token_type: str


# ========================
# TOKEN HELPERS
# ========================
def create_token(username: str, role: str):
    expire = datetime.now(timezone.utc) + timedelta(minutes=access_token_expire_minutes)
    payload = {"sub": username, "role": role, "exp": expire}
    return jwt.encode(payload, secret_key, algorithm="HS256")


def verify_token(required_role: str, authorization: str | None = Header(default=None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Not authenticated")

    token = authorization.split(" ")[1]

    try:
        payload = jwt.decode(token, secret_key, algorithms=["HS256"])
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")

    if payload.get("role") != required_role:
        raise HTTPException(status_code=403, detail="Forbidden")

    return payload


# ========================
# DB
# ========================
def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ========================
# ROOT
# ========================
@app.get("/")
def root():
    return {"message": "API is running"}


# ========================
# ADMIN LOGIN
# ========================
@app.post("/admin/login", response_model=LoginResponse)
def admin_login(data: LoginRequest):
    if data.username != admin_username or data.password != admin_password:
        raise HTTPException(status_code=401, detail="Invalid admin credentials")

    token = create_token(data.username, "admin")
    return {"access_token": token, "token_type": "bearer"}


# ========================
# EMPLOYER LOGIN ✅ (THIS FIXES YOUR ISSUE)
# ========================
@app.post("/employer/login", response_model=LoginResponse)
def employer_login(data: LoginRequest):
    if data.username != employer_username or data.password != employer_password:
        raise HTTPException(status_code=401, detail="Invalid employer credentials")

    token = create_token(data.username, "employer")
    return {"access_token": token, "token_type": "bearer"}


# ========================
# JOBS
# ========================
@app.post("/jobs", response_model=JobRead)
def create_job(
    payload: JobCreate,
    db: Session = Depends(get_db),
    _: dict = Depends(lambda authorization: verify_token("employer", authorization)),
):
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
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return job


# ========================
# VISA
# ========================
@app.post("/visa-applications", response_model=VisaApplicationRead)
def create_visa_application(
    payload: VisaApplicationCreate,
    db: Session = Depends(get_db),
):
    visa = VisaApplication(**payload.dict(), status="pending")
    db.add(visa)
    db.commit()
    db.refresh(visa)
    return visa


@app.get("/visa-applications", response_model=list[VisaApplicationRead])
def list_visa_applications(
    db: Session = Depends(get_db),
    _: dict = Depends(lambda authorization: verify_token("admin", authorization)),
):
    return db.query(VisaApplication).all()