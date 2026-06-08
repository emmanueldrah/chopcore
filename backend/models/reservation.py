from sqlalchemy import Column, String, Integer, Enum, ForeignKey, DateTime
from backend.database import Base
from backend.models.base import BaseMixin
import enum

class ReservationStatus(enum.Enum):
    CONFIRMED = "CONFIRMED"
    SEATED = "SEATED"
    COMPLETED = "COMPLETED"
    CANCELLED = "CANCELLED"
    NO_SHOW = "NO_SHOW"

class Reservation(Base, BaseMixin):
    __tablename__ = "reservations"

    customer_name = Column(String, nullable=False)
    customer_phone = Column(String, nullable=False)
    reservation_date = Column(DateTime, nullable=False)
    party_size = Column(Integer, nullable=False)
    table_id = Column(String, ForeignKey("tables.id"), nullable=True)
    status = Column(Enum(ReservationStatus), default=ReservationStatus.CONFIRMED)
    special_requests = Column(String, nullable=True)
