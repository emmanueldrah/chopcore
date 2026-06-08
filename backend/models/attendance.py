from sqlalchemy import Column, String, ForeignKey, DateTime
from backend.database import Base
from backend.models.base import BaseMixin

class Attendance(Base, BaseMixin):
    __tablename__ = "attendance"

    staff_id = Column(String, ForeignKey("staff.id"), nullable=False)
    clock_in = Column(DateTime, nullable=False)
    clock_out = Column(DateTime, nullable=True)
    notes = Column(String, nullable=True)
