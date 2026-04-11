from pydantic import BaseModel, ConfigDict


class VisaApplicationCreate(BaseModel):
    full_name: str
    email: str
    phone: str
    nationality: str
    passport_number: str

    visa_type: str
    destination_city: str
    travel_date: str
    purpose_of_visit: str

    host_or_company: str | None = None
    school_name: str | None = None
    accommodation_details: str | None = None
    extra_notes: str | None = None


class VisaApplicationStatusUpdate(BaseModel):
    status: str


class VisaApplicationRead(BaseModel):
    id: int
    full_name: str
    email: str
    phone: str
    nationality: str
    passport_number: str

    visa_type: str
    destination_city: str
    travel_date: str
    purpose_of_visit: str

    host_or_company: str | None = None
    school_name: str | None = None
    accommodation_details: str | None = None
    extra_notes: str | None = None
    status: str

    model_config = ConfigDict(from_attributes=True)