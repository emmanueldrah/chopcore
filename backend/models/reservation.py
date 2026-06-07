from sqlalchemy import Column, String, Integer, DateTime, Enum, ForeignKey
from backend.database import Base
import uuid
from datetime import datetime
import enum

class ReservationStatus(enum.Enum):
    CONFIRMED = "CONFIRMED"
    SEATED = "SEATED"
    COMPLETED = "COMPLETED"
    CANCELLED = "CANCELLED"
    NO_SHOW = "NO_SHOW"

class Reservation(Base):
    __tablename__ = "reservations"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    customer_name = Column(String, nullable=False)
    customer_phone = Column(String, nullable=False)
    reservation_date = Column(DateTime, nullable=False)
    party_size = Column(Integer, nullable=False)
    table_id = Column(String, ForeignKey("tables.id"), nullable=True)
    status = Column(Enum(ReservationStatus), default=ReservationStatus.CONFIRMED)
    special_requests = Column(String, nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    deleted_at = Column(DateTime, nullable=True)
