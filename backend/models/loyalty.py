from sqlalchemy import Column, String, Integer, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from backend.database import Base
import uuid
from datetime import datetime

class LoyaltyTransaction(Base):
    __tablename__ = "loyalty_transactions"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    customer_id = Column(String, ForeignKey("customers.id"), nullable=False)
    points = Column(Integer, nullable=False) # Positive for earned, negative for redeemed
    type = Column(String, nullable=False) # EARNED, REDEEMED
    order_id = Column(String, ForeignKey("orders.id"), nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow)

    customer = relationship("Customer")
    order = relationship("Order")
