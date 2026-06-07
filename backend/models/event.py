from sqlalchemy import Column, String, Integer, DateTime, Enum, JSON
from backend.database import Base
import uuid
from datetime import datetime
import enum

class EventStatus(enum.Enum):
    ENQUIRY = "ENQUIRY"
    CONFIRMED = "CONFIRMED"
    IN_PREPARATION = "IN_PREPARATION"
    COMPLETED = "COMPLETED"
    CANCELLED = "CANCELLED"

class Event(Base):
    __tablename__ = "events"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    client_name = Column(String, nullable=False)
    client_phone = Column(String, nullable=False)
    event_date = Column(DateTime, nullable=False)
    venue = Column(String, nullable=False)
    event_type = Column(String, nullable=False)
    expected_guests = Column(Integer, nullable=False)
    status = Column(Enum(EventStatus), default=EventStatus.ENQUIRY)

    menu_selection = Column(JSON, default=[])
    per_head_price = Column(Integer, default=0)
    total_budget = Column(Integer, default=0)
    deposit_paid = Column(Integer, default=0)

    checklist = Column(JSON, default=[])

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    deleted_at = Column(DateTime, nullable=True)
