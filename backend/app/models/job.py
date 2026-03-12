from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from bson import ObjectId
from app.models.user import PyObjectId


class JobBase(BaseModel):
    title: str
    company: str
    location: str
    type: str  # Full-time, Part-time, Contract, Remote
    salary: str
    description: str
    requirements: list[str] = []
    responsibilities: list[str] = []
    benefits: list[str] = []
    tags: list[str] = []


class JobCreate(JobBase):
    pass


class JobUpdate(BaseModel):
    title: Optional[str] = None
    company: Optional[str] = None
    location: Optional[str] = None
    type: Optional[str] = None
    salary: Optional[str] = None
    description: Optional[str] = None
    requirements: Optional[list[str]] = None
    responsibilities: Optional[list[str]] = None
    benefits: Optional[list[str]] = None
    tags: Optional[list[str]] = None
    is_active: Optional[bool] = None


class JobInDB(JobBase):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    employer_id: str
    is_active: bool = True
    views: int = 0
    applications_count: int = 0
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}


class JobResponse(JobBase):
    id: str = Field(alias="_id")
    employer_id: str
    is_active: bool
    views: int
    applications_count: int
    created_at: datetime
    updated_at: datetime

    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}
