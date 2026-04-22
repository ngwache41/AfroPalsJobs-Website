from collections.abc import Generator
import os
from datetime import datetime, timedelta, timezone
import shutil

import jwt
import resend
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


class LoginRequest(BaseModel):
    username: str
    password: str


class LoginResponse(BaseModel):
    access_token: str
    token_type: str


# ================= EMAIL (FIXED WITH RESEND SDK) =================

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


def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
def root():
    return {"message": "API is running"}


# ================= DEBUG =================

@app.get("/debug/send-test-email")
def debug_send_test_email():
    return send_email_via_resend(
        to_email=admin_notification_email,
        subject="AfroPals test email",
        html="<h2>Test Email Working ✅</h2>",
    )


# ================= ADMIN =================

@app.post("/admin/login", response_model=LoginResponse)
def admin_login(payload: LoginRequest):
    if payload.username != admin_username or payload.password != admin_password:
        raise HTTPException(status_code=401, detail="Invalid admin credentials")

    access_token = create_token(payload.username, "admin")
    return LoginResponse(access_token=access_token, token_type="bearer")


@app.get("/admin/me")
def admin_me(_: dict = Depends(verify_admin_token)):
    return {"message": "Authenticated admin"}


# ================= EMPLOYER =================

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
        "New employer job pending approval",
        f"<h2>{job.title}</h2><p>{job.company}</p>",
    )

    return job


# ================= JOB APPLICATION =================

@app.post("/job-applications")
async def create_job_application(
    job_id: int = Form(...),
    full_name: str = Form(...),
    email: str = Form(...),
    phone: str = Form(...),
    cv_file: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    job = db.query(Job).filter(Job.id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    filename = f"{datetime.utcnow().timestamp()}_{cv_file.filename}"
    path = os.path.join(UPLOAD_DIR, filename)

    with open(path, "wb") as buffer:
        shutil.copyfileobj(cv_file.file, buffer)

    application = JobApplication(
        job_id=job_id,
        full_name=full_name,
        email=email,
        phone=phone,
        cv_file_path=path,
        status="pending",
    )

    db.add(application)
    db.commit()

    send_admin_notification(
        "New job application",
        f"<p>{full_name} applied for {job.title}</p>",
    )

    return {"message": "Application submitted"}


# ================= VISA =================

@app.post("/visa-applications")
async def create_visa_application(
    full_name: str = Form(...),
    email: str = Form(...),
    passport_file: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    filename = f"{datetime.utcnow().timestamp()}_{passport_file.filename}"
    path = os.path.join(UPLOAD_DIR, filename)

    with open(path, "wb") as buffer:
        shutil.copyfileobj(passport_file.file, buffer)

    visa = VisaApplication(
        full_name=full_name,
        email=email,
        status="pending",
    )

    db.add(visa)
    db.commit()

    send_admin_notification(
        "New visa application",
        f"<p>{full_name} submitted visa request</p>",
    )

    return {"message": "Visa application submitted"}