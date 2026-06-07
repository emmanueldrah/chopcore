from sqlalchemy import Column, String, Integer, DateTime, ForeignKey, Enum, Boolean
from sqlalchemy.orm import relationship
from backend.database import Base
import uuid
from datetime import datetime
import enum

class BillStatus(enum.Enum):
    OPEN = "OPEN"
    PAID = "PAID"
    VOIDED = "VOIDED"

class Bill(Base):
    __tablename__ = "bills"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    order_id = Column(String, ForeignKey("orders.id"), nullable=False)
    status = Column(Enum(BillStatus), default=BillStatus.OPEN)

    subtotal = Column(Integer, default=0)
    discount_amount = Column(Integer, default=0)
    tax_amount = Column(Integer, default=0)
    delivery_fee = Column(Integer, default=0)
    total_amount = Column(Integer, default=0)

    is_split = Column(Boolean, default=False)

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    deleted_at = Column(DateTime, nullable=True)

    order = relationship("Order")
    payments = relationship("Payment", back_populates="bill")
