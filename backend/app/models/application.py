from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from bson import ObjectId
from app.models.user import PyObjectId


class ApplicationBase(BaseModel):
    cover_letter: Optional[str] = None


class ApplicationCreate(ApplicationBase):
    job_id: str


class ApplicationUpdate(BaseModel):
    status: str  # pending, reviewing, shortlisted, rejected, accepted
    notes: Optional[str] = None


class ApplicationInDB(ApplicationBase):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    job_id: str
    candidate_id: str
    status: str = "pending"
    notes: Optional[str] = None
    resume_url: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}


class ApplicationResponse(ApplicationBase):
    id: str = Field(alias="_id")
    job_id: str
    candidate_id: str
    status: str
    notes: Optional[str] = None
    resume_url: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}
