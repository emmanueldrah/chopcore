from sqlalchemy import Column, String, Integer, DateTime, Enum, Float
from backend.database import Base
import uuid
from datetime import datetime
import enum

class TableStatus(enum.Enum):
    AVAILABLE = "AVAILABLE"
    OCCUPIED = "OCCUPIED"
    RESERVED = "RESERVED"
    NEEDS_CLEANING = "NEEDS_CLEANING"

class Table(Base):
    __tablename__ = "tables"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    number = Column(String, nullable=False)
    capacity = Column(Integer, default=2)
    section = Column(String, default="Main") # e.g. Indoor, Outdoor, VIP
    status = Column(Enum(TableStatus), default=TableStatus.AVAILABLE)

    # Position for floor plan
    x = Column(Float, default=0.0)
    y = Column(Float, default=0.0)
    width = Column(Float, default=100.0)
    height = Column(Float, default=100.0)
    shape = Column(String, default="square") # square, round, rectangle

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    deleted_at = Column(DateTime, nullable=True)
