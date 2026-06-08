from sqlalchemy import Column, String, Enum, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from backend.database import Base
from backend.models.base import BaseMixin
import enum

class DeliveryStatus(enum.Enum):
    ORDER_PLACED = "ORDER_PLACED"
    IN_KITCHEN = "IN_KITCHEN"
    OUT_FOR_DELIVERY = "OUT_FOR_DELIVERY"
    DELIVERED = "DELIVERED"
    CANCELLED = "CANCELLED"

class Delivery(Base, BaseMixin):
    __tablename__ = "deliveries"

    order_id = Column(String, ForeignKey("orders.id"), nullable=False)
    rider_id = Column(String, ForeignKey("users.id"), nullable=True)
    customer_address = Column(String, nullable=False)
    status = Column(Enum(DeliveryStatus), default=DeliveryStatus.ORDER_PLACED)
    estimated_delivery_time = Column(DateTime, nullable=True)
    delivered_at = Column(DateTime, nullable=True)

    order = relationship("Order")
    rider = relationship("User")
