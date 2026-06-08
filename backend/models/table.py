from sqlalchemy import Column, String, Integer, Enum, Float
from backend.database import Base
from backend.models.base import BaseMixin
import enum

class TableStatus(enum.Enum):
    AVAILABLE = "AVAILABLE"
    OCCUPIED = "OCCUPIED"
    RESERVED = "RESERVED"
    NEEDS_CLEANING = "NEEDS_CLEANING"

class Table(Base, BaseMixin):
    __tablename__ = "tables"

    number = Column(String, nullable=False)
    capacity = Column(Integer, default=2)
    section = Column(String, default="Main") # e.g. Indoor, Outdoor, VIP
    status = Column(Enum(TableStatus), default=TableStatus.AVAILABLE)

    x = Column(Float, default=0.0)
    y = Column(Float, default=0.0)
    width = Column(Float, default=100.0)
    height = Column(Float, default=100.0)
    shape = Column(String, default="square") # square, round, rectangle
