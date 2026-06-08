from sqlalchemy import Column, String, Enum, ForeignKey, JSON, DateTime
from sqlalchemy.orm import relationship
from backend.database import Base
from backend.models.base import BaseMixin
import enum
from datetime import datetime

class StaffStatus(enum.Enum):
    ACTIVE = "ACTIVE"
    INACTIVE = "INACTIVE"
    ON_LEAVE = "ON_LEAVE"

class Staff(Base, BaseMixin):
    __tablename__ = "staff"

    user_id = Column(String, ForeignKey("users.id"), nullable=True)
    staff_id = Column(String, unique=True, nullable=False)
    full_name = Column(String, nullable=False)
    gender = Column(String, nullable=True)
    role = Column(String, nullable=False)
    contact_info = Column(JSON, nullable=True)
    photo_url = Column(String, nullable=True)
    employment_date = Column(DateTime, default=datetime.utcnow)
    status = Column(Enum(StaffStatus), default=StaffStatus.ACTIVE)

    user = relationship("User")
