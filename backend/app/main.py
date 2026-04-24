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
admin_notification_email = os.getenv("ADMIN_NOTIFICATION_EMAIL", "afropalsjobs@yandex.ru")

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


# ================= AUTH =================

class LoginRequest(BaseModel):
    username: str
    password: str


class LoginResponse(BaseModel):
    access_token: str
    token_type: str


def create_token(username: str, role: str) -> str:
    expire = datetime.now(timezone.utc) + timedelta(minutes=access_token_expire_minutes)
    payload = {"sub": username, "role": role, "exp": expire}
    return jwt.encode(payload, secret_key, algorithm="HS256")


def decode_token_from_header(authorization: str | None) -> dict:
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Not authenticated")

    token = authorization.split(" ", 1)[1]

    try:
        return jwt.decode(token, secret_key, algorithms=["HS256"])
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid or expired token")


def verify_admin_token(authorization: str | None = Header(default=None)):
    payload = decode_token_from_header(authorization)
    if payload.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Forbidden")
    return payload


def verify_employer_token(authorization: str | None = Header(default=None)):
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


# ================= EMAIL =================

def send_email_via_resend(to_email: str, subject: str, html: str):
    data = json.dumps({
        "from": from_email,
        "to": [to_email],
        "subject": subject,
        "html": html,
    }).encode("utf-8")

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
        with request.urlopen(req) as res:
            return {"ok": True, "response": res.read().decode()}
    except error.HTTPError as e:
        return {"ok": False, "error": e.read().decode()}


# ================= ROOT =================

@app.get("/")
def root():
    return {"message": "API is running"}


# ================= ADMIN LOGIN =================

@app.post("/admin/login", response_model=LoginResponse)
def admin_login(payload: LoginRequest):
    if payload.username != admin_username or payload.password != admin_password:
        raise HTTPException(status_code=401, detail="Invalid admin credentials")
    return LoginResponse(access_token=create_token(payload.username, "admin"), token_type="bearer")


@app.post("/employer/login", response_model=LoginResponse)
def employer_login(payload: LoginRequest):
    if payload.username != employer_username or payload.password != employer_password:
        raise HTTPException(status_code=401, detail="Invalid employer credentials")
    return LoginResponse(access_token=create_token(payload.username, "employer"), token_type="bearer")


# ================= JOBS =================

@app.get("/jobs", response_model=list[JobRead])
def list_jobs(db: Session = Depends(get_db)):
    return db.query(Job).filter(Job.status == "approved").all()


@app.post("/jobs", response_model=JobRead)
def create_job(payload: JobCreate, db: Session = Depends(get_db), _: dict = Depends(verify_admin_token)):
    job = Job(**payload.dict(), status="approved", created_by="admin")
    db.add(job)
    db.commit()
    db.refresh(job)
    return job


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
    host_or_company: str = Form(None),
    school_name: str = Form(None),
    accommodation_details: str = Form(None),
    extra_notes: str = Form(None),
    passport_file: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    timestamp = datetime.utcnow().strftime("%Y%m%d%H%M%S")
    filename = f"{timestamp}_{passport_file.filename}"
    file_path = os.path.join(UPLOAD_DIR, filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(passport_file.file, buffer)

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
        host_or_company=host_or_company,
        school_name=school_name,
        accommodation_details=accommodation_details,
        extra_notes=extra_notes,
        passport_file_path=file_path,
        status="pending",
    )

    db.add(visa)
    db.commit()
    db.refresh(visa)

    send_email_via_resend(
        admin_notification_email,
        "New Visa Application",
        f"""
        <h2>Visa Application</h2>
        <p>{visa.full_name}</p>
        <a href="https://afropals-backend.onrender.com/{file_path}">
        View Passport File
        </a>
        """,
    )

    return {"message": "Application submitted"}