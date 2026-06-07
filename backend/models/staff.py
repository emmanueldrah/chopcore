from sqlalchemy import Column, String, Integer, DateTime, ForeignKey, Enum, JSON
from sqlalchemy.orm import relationship
from backend.database import Base
import uuid
from datetime import datetime
import enum

class StaffStatus(enum.Enum):
    ACTIVE = "ACTIVE"
    INACTIVE = "INACTIVE"
    ON_LEAVE = "ON_LEAVE"

class Staff(Base):
    __tablename__ = "staff"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"), nullable=True)
    staff_id = Column(String, unique=True, nullable=False)
    full_name = Column(String, nullable=False)
    gender = Column(String, nullable=True)
    role = Column(String, nullable=False)
    contact_info = Column(JSON, nullable=True)
    photo_url = Column(String, nullable=True)
    employment_date = Column(DateTime, default=datetime.utcnow)
    status = Column(Enum(StaffStatus), default=StaffStatus.ACTIVE)

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    deleted_at = Column(DateTime, nullable=True)

    user = relationship("User")
