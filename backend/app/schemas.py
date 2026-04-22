from pydantic import BaseModel, ConfigDict


class JobCreate(BaseModel):
    title: str
    company: str
    location: str
    description: str


class JobStatusUpdate(BaseModel):
    status: str


class JobRead(BaseModel):
    id: int
    title: str
    company: str
    location: str
    description: str
    status: str
    created_by: str

    model_config = ConfigDict(from_attributes=True)


class JobApplicationRead(BaseModel):
    id: int
    job_id: int
    full_name: str
    email: str
    phone: str
    cover_letter: str
    cv_file_path: str
    status: str

    model_config = ConfigDict(from_attributes=True)