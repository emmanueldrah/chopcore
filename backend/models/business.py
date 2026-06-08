from sqlalchemy import Column, String, Integer, Enum, Boolean, JSON
from backend.database import Base
from backend.models.base import BaseMixin
import enum

class BusinessMode(enum.Enum):
    FAST_FOOD = "FAST_FOOD"
    SIT_DOWN = "SIT_DOWN"
    CHOP_BAR = "CHOP_BAR"
    CATERING = "CATERING"

class Business(Base, BaseMixin):
    __tablename__ = "business"

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
