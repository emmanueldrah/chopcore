from sqlalchemy import Column, String, Integer, ForeignKey, DateTime
from backend.database import Base
from backend.models.base import BaseMixin

class WaitlistEntry(Base, BaseMixin):
    __tablename__ = "waitlist"

    customer_name = Column(String, nullable=False)
    customer_phone = Column(String, nullable=False)
    party_size = Column(Integer, nullable=False)
    status = Column(String, default="WAITING") # WAITING, SEATED, CANCELLED
    notes = Column(String, nullable=True)
