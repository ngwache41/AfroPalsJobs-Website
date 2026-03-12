from fastapi import APIRouter, HTTPException, Depends, UploadFile, File, Form, status
from typing import Optional
from datetime import datetime
from bson import ObjectId
from app.database import get_database
from app.models.application import ApplicationCreate, ApplicationUpdate, ApplicationResponse
from app.models.user import UserInDB
from app.api.auth import get_current_user
from app.services.s3 import s3_service
from app.services.email import email_service

router = APIRouter(prefix="/applications", tags=["applications"])


@router.post("/", response_model=ApplicationResponse, status_code=status.HTTP_201_CREATED)
async def create_application(
    job_id: str = Form(...),
    cover_letter: Optional[str] = Form(None),
    resume: Optional[UploadFile] = File(None),
    current_user: UserInDB = Depends(get_current_user)
):
    """Apply for a job"""
    if current_user.role != "candidate":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only candidates can apply for jobs"
        )
    
    db = get_database()
    
    # Check if job exists
    if not ObjectId.is_valid(job_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid job ID"
        )
    
    job = await db.jobs.find_one({"_id": ObjectId(job_id)})
    if not job:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Job not found"
        )
    
    # Check if already applied
    existing_application = await db.applications.find_one({
        "job_id": job_id,
        "candidate_id": str(current_user.id)
    })
    
    if existing_application:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You have already applied for this job"
        )
    
    # Upload resume if provided
    resume_url = None
    if resume:
        resume_content = await resume.read()
        resume_url = await s3_service.upload_file(
            resume_content,
            resume.filename,
            resume.content_type
        )
    
    # Create application
    application_data = {
        "job_id": job_id,
        "candidate_id": str(current_user.id),
        "cover_letter": cover_letter,
        "resume_url": resume_url or current_user.resume_url,
        "status": "pending",
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }
    
    result = await db.applications.insert_one(application_data)
    application_data["_id"] = result.inserted_id
    
    # Update job application count
    await db.jobs.update_one(
        {"_id": ObjectId(job_id)},
        {"$inc": {"applications_count": 1}}
    )
    
    # Send confirmation email to candidate
    await email_service.send_application_confirmation(
        current_user.email,
        current_user.full_name,
        job["title"],
        job["company"]
    )
    
    # Send notification to employer
    employer = await db.users.find_one({"_id": ObjectId(job["employer_id"])})
    if employer:
        await email_service.send_new_application_notification(
            employer["email"],
            current_user.full_name,
            job["title"]
        )
    
    return ApplicationResponse(**application_data)


@router.get("/", response_model=list[ApplicationResponse])
async def get_applications(
    current_user: UserInDB = Depends(get_current_user)
):
    """Get user's applications (candidates) or applications for their jobs (employers)"""
    db = get_database()
    
    if current_user.role == "candidate":
        # Get candidate's applications
        cursor = db.applications.find({"candidate_id": str(current_user.id)}).sort("created_at", -1)
    else:
        # Get applications for employer's jobs
        jobs = await db.jobs.find({"employer_id": str(current_user.id)}).to_list(length=None)
        job_ids = [str(job["_id"]) for job in jobs]
        cursor = db.applications.find({"job_id": {"$in": job_ids}}).sort("created_at", -1)
    
    applications = await cursor.to_list(length=None)
    
    return [ApplicationResponse(**app) for app in applications]


@router.get("/{application_id}", response_model=ApplicationResponse)
async def get_application(
    application_id: str,
    current_user: UserInDB = Depends(get_current_user)
):
    """Get a specific application"""
    db = get_database()
    
    if not ObjectId.is_valid(application_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid application ID"
        )
    
    application = await db.applications.find_one({"_id": ObjectId(application_id)})
    
    if not application:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Application not found"
        )
    
    # Check permissions
    if current_user.role == "candidate":
        if application["candidate_id"] != str(current_user.id):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You don't have permission to view this application"
            )
    else:
        # Check if user owns the job
        job = await db.jobs.find_one({"_id": ObjectId(application["job_id"])})
        if job["employer_id"] != str(current_user.id) and current_user.role != "admin":
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You don't have permission to view this application"
            )
    
    return ApplicationResponse(**application)


@router.put("/{application_id}", response_model=ApplicationResponse)
async def update_application(
    application_id: str,
    update_data: ApplicationUpdate,
    current_user: UserInDB = Depends(get_current_user)
):
    """Update application status (employers only)"""
    if current_user.role not in ["employer", "admin"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only employers can update application status"
        )
    
    db = get_database()
    
    if not ObjectId.is_valid(application_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid application ID"
        )
    
    application = await db.applications.find_one({"_id": ObjectId(application_id)})
    
    if not application:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Application not found"
        )
    
    # Check if user owns the job
    job = await db.jobs.find_one({"_id": ObjectId(application["job_id"])})
    if job["employer_id"] != str(current_user.id) and current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You don't have permission to update this application"
        )
    
    # Update application
    update_dict = update_data.model_dump(exclude_unset=True)
    update_dict["updated_at"] = datetime.utcnow()
    
    await db.applications.update_one(
        {"_id": ObjectId(application_id)},
        {"$set": update_dict}
    )
    
    updated_application = await db.applications.find_one({"_id": ObjectId(application_id)})
    
    return ApplicationResponse(**updated_application)
