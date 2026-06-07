from sqlalchemy import Column, String, Integer, Enum, DateTime, Boolean, JSON
from backend.database import Base
import uuid
from datetime import datetime
import enum

class BusinessMode(enum.Enum):
    FAST_FOOD = "FAST_FOOD"
    SIT_DOWN = "SIT_DOWN"
    CHOP_BAR = "CHOP_BAR"
    CATERING = "CATERING"

class Business(Base):
    __tablename__ = "business"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, nullable=False)
    logo_url = Column(String, nullable=True)
    address = Column(String, nullable=True)
    phone = Column(String, nullable=True)
    email = Column(String, nullable=True)
    opening_hours = Column(JSON, nullable=True)
    currency = Column(String, default="GHS")
    tax_rate = Column(Integer, default=1500) # 15% in basis points
    tax_enabled = Column(Boolean, default=True)
    mode = Column(Enum(BusinessMode), nullable=False)

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    deleted_at = Column(DateTime, nullable=True)
