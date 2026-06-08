from sqlalchemy import Column, String, Integer, ForeignKey, JSON, Enum
from sqlalchemy.orm import relationship
from backend.database import Base
from backend.models.base import BaseMixin
import enum

class OrderItemStatus(enum.Enum):
    PENDING = "PENDING"
    PREPARING = "PREPARING"
    READY = "READY"
    SERVED = "SERVED"
    CANCELLED = "CANCELLED"

class OrderItem(Base, BaseMixin):
    __tablename__ = "order_items"

    order_id = Column(String, ForeignKey("orders.id"), nullable=False)
    menu_item_id = Column(String, ForeignKey("menu_items.id"), nullable=False)
    quantity = Column(Integer, default=1)
    unit_price = Column(Integer, nullable=False)
    total_price = Column(Integer, nullable=False)
    notes = Column(String, nullable=True)
    course = Column(String, nullable=True) # Starter, Main, Dessert
    status = Column(Enum(OrderItemStatus), default=OrderItemStatus.PENDING)
    modifiers = Column(JSON, default=[]) # List of {id: uuid, name: str, price: int}

    order = relationship("Order", back_populates="items")
    menu_item = relationship("MenuItem")
