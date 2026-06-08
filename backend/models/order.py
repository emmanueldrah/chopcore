from sqlalchemy import Column, String, Integer, Enum, ForeignKey
from sqlalchemy.orm import relationship
from backend.database import Base
from backend.models.base import BaseMixin
import enum

class OrderStatus(enum.Enum):
    PENDING = "PENDING"
    IN_KITCHEN = "IN_KITCHEN"
    READY = "READY"
    SERVED = "SERVED"
    COMPLETED = "COMPLETED"
    CANCELLED = "CANCELLED"

class OrderType(enum.Enum):
    DINE_IN = "DINE_IN"
    TAKEAWAY = "TAKEAWAY"
    DELIVERY = "DELIVERY"

class Order(Base, BaseMixin):
    __tablename__ = "orders"

    order_number = Column(String, nullable=False) # Sequential daily number e.g. #0042
    table_id = Column(String, ForeignKey("tables.id"), nullable=True)
    customer_name = Column(String, nullable=True)
    status = Column(Enum(OrderStatus), default=OrderStatus.PENDING)
    order_type = Column(Enum(OrderType), default=OrderType.DINE_IN)

    waiter_id = Column(String, ForeignKey("users.id"), nullable=True)
    cashier_id = Column(String, ForeignKey("users.id"), nullable=True)

    subtotal = Column(Integer, default=0)
    discount_amount = Column(Integer, default=0)
    tax_amount = Column(Integer, default=0)
    delivery_fee = Column(Integer, default=0)
    total_amount = Column(Integer, default=0)
    stock_deducted = Column(Boolean, default=False)

    table = relationship("Table")
    waiter = relationship("User", foreign_keys=[waiter_id])
    cashier = relationship("User", foreign_keys=[cashier_id])
    items = relationship("OrderItem", back_populates="order")
