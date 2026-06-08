from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship
from backend.database import Base
from backend.models.base import BaseMixin

class LoyaltyTransaction(Base, BaseMixin):
    __tablename__ = "loyalty_transactions"

    customer_id = Column(String, ForeignKey("customers.id"), nullable=False)
    points = Column(Integer, nullable=False) # Positive for earned, negative for redeemed
    type = Column(String, nullable=False) # EARNED, REDEEMED
    order_id = Column(String, ForeignKey("orders.id"), nullable=True)

    customer = relationship("Customer")
    order = relationship("Order")
