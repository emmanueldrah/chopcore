from sqlalchemy import Column, String, Integer, DateTime
from backend.database import Base
from backend.models.base import BaseMixin

class Customer(Base, BaseMixin):
    __tablename__ = "customers"

    name = Column(String, nullable=False)
    phone = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, nullable=True)
    birthday = Column(DateTime, nullable=True)
    tier = Column(String, default="Bronze") # Bronze, Silver, Gold
    total_spend = Column(Integer, default=0)
    loyalty_points = Column(Integer, default=0)
