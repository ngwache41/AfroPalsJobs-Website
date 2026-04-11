from pydantic import BaseModel, ConfigDict


class JobCreate(BaseModel):
    title: str
    company: str
    location: str
    description: str


class JobRead(BaseModel):
    id: int
    title: str
    company: str
    location: str
    description: str

    model_config = ConfigDict(from_attributes=True)