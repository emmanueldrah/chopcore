from sqlalchemy import Column, String, Enum, ForeignKey
from sqlalchemy.orm import relationship
from backend.database import Base
from backend.models.base import BaseMixin
import enum

class KitchenTicketStatus(enum.Enum):
    PENDING = "PENDING"
    IN_PROGRESS = "IN_PROGRESS"
    READY = "READY"
    DISMISSED = "DISMISSED"

class KitchenTicket(Base, BaseMixin):
    __tablename__ = "kitchen_tickets"

    order_id = Column(String, ForeignKey("orders.id"), nullable=False)
    status = Column(Enum(KitchenTicketStatus), default=KitchenTicketStatus.PENDING)

    order = relationship("Order")
