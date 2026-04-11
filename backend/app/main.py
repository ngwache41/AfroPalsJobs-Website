from collections.abc import Generator
from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
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

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://afropalsjobs.ru",
    "https://www.afropalsjobs.ru",
    "https://afropals-frontend.onrender.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)


def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
def root():
    return {"message": "API is running"}


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
    jobs = db.query(Job).all()
    return jobs


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
def list_visa_applications(db: Session = Depends(get_db)):
    applications = db.query(VisaApplication).all()
    return applications


@app.get("/visa-applications/{application_id}", response_model=VisaApplicationRead)
def get_visa_application(application_id: int, db: Session = Depends(get_db)):
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