from sqlalchemy import Column, String, Integer, DateTime, JSON
from backend.database import Base
import uuid
from datetime import datetime

class Customer(Base):
    __tablename__ = "customers"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, nullable=False)
    phone = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, nullable=True)
    birthday = Column(DateTime, nullable=True)
    tier = Column(String, default="Bronze") # Bronze, Silver, Gold
    total_spend = Column(Integer, default=0)
    loyalty_points = Column(Integer, default=0)

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    deleted_at = Column(DateTime, nullable=True)
