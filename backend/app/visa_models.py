from sqlalchemy import Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class VisaApplication(Base):
    __tablename__ = "visa_applications"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    full_name: Mapped[str] = mapped_column(String(255), nullable=False)
    email: Mapped[str] = mapped_column(String(255), nullable=False)
    phone: Mapped[str] = mapped_column(String(100), nullable=False)
    nationality: Mapped[str] = mapped_column(String(100), nullable=False)
    passport_number: Mapped[str] = mapped_column(String(100), nullable=False)

    visa_type: Mapped[str] = mapped_column(String(100), nullable=False)
    destination_city: Mapped[str] = mapped_column(String(255), nullable=False)
    travel_date: Mapped[str] = mapped_column(String(100), nullable=False)
    purpose_of_visit: Mapped[str] = mapped_column(Text, nullable=False)

    host_or_company: Mapped[str | None] = mapped_column(String(255), nullable=True)
    school_name: Mapped[str | None] = mapped_column(String(255), nullable=True)
    accommodation_details: Mapped[str | None] = mapped_column(Text, nullable=True)
    extra_notes: Mapped[str | None] = mapped_column(Text, nullable=True)

    passport_file_path: Mapped[str | None] = mapped_column(String(500), nullable=True)

    status: Mapped[str] = mapped_column(String(50), nullable=False, default="pending")