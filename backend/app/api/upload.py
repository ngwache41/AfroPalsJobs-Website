from fastapi import APIRouter, HTTPException, Depends, UploadFile, File, status
from app.models.user import UserInDB
from app.api.auth import get_current_user
from app.services.s3 import s3_service
from app.database import get_database
from datetime import datetime

router = APIRouter(prefix="/upload", tags=["upload"])


@router.post("/resume")
async def upload_resume(
    file: UploadFile = File(...),
    current_user: UserInDB = Depends(get_current_user)
):
    """Upload user resume"""
    # Validate file type
    allowed_types = ["application/pdf", "application/msword", 
                     "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]
    
    if file.content_type not in allowed_types:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only PDF and Word documents are allowed"
        )
    
    # Validate file size (max 5MB)
    content = await file.read()
    if len(content) > 5 * 1024 * 1024:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="File size must be less than 5MB"
        )
    
    # Upload to S3
    file_url = await s3_service.upload_file(content, file.filename, file.content_type)
    
    if not file_url:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to upload file"
        )
    
    # Update user profile
    db = get_database()
    await db.users.update_one(
        {"_id": current_user.id},
        {
            "$set": {
                "resume_url": file_url,
                "updated_at": datetime.utcnow()
            }
        }
    )
    
    return {"url": file_url, "message": "Resume uploaded successfully"}
