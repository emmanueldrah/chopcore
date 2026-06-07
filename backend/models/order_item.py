from sqlalchemy import Column, String, Integer, DateTime, ForeignKey, JSON, Enum
from sqlalchemy.orm import relationship
from backend.database import Base
import uuid
from datetime import datetime
import enum

class OrderItemStatus(enum.Enum):
    PENDING = "PENDING"
    PREPARING = "PREPARING"
    READY = "READY"
    SERVED = "SERVED"
    CANCELLED = "CANCELLED"

class OrderItem(Base):
    __tablename__ = "order_items"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    order_id = Column(String, ForeignKey("orders.id"), nullable=False)
    menu_item_id = Column(String, ForeignKey("menu_items.id"), nullable=False)
    quantity = Column(Integer, default=1)
    unit_price = Column(Integer, nullable=False)
    total_price = Column(Integer, nullable=False)
    notes = Column(String, nullable=True)
    course = Column(String, nullable=True) # Starter, Main, Dessert
    status = Column(Enum(OrderItemStatus), default=OrderItemStatus.PENDING)

    # Store selected modifiers as JSON to easily recreate the state
    modifiers = Column(JSON, default=[]) # List of {id: uuid, name: str, price: int}

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    deleted_at = Column(DateTime, nullable=True)

    order = relationship("Order", back_populates="items")
    menu_item = relationship("MenuItem")
