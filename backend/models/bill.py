from sqlalchemy import Column, String, Integer, ForeignKey, Enum, Boolean
from sqlalchemy.orm import relationship
from backend.database import Base
from backend.models.base import BaseMixin
import enum

class BillStatus(enum.Enum):
    OPEN = "OPEN"
    PAID = "PAID"
    VOIDED = "VOIDED"

class Bill(Base, BaseMixin):
    __tablename__ = "bills"

    order_id = Column(String, ForeignKey("orders.id"), nullable=False)
    status = Column(Enum(BillStatus), default=BillStatus.OPEN)

    subtotal = Column(Integer, default=0)
    discount_amount = Column(Integer, default=0)
    tax_amount = Column(Integer, default=0)
    delivery_fee = Column(Integer, default=0)
    total_amount = Column(Integer, default=0)

    is_split = Column(Boolean, default=False)

    order = relationship("Order")
    payments = relationship("Payment", back_populates="bill")
