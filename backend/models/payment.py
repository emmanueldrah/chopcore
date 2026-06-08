from sqlalchemy import Column, String, Integer, ForeignKey, Enum
from sqlalchemy.orm import relationship
from backend.database import Base
from backend.models.base import BaseMixin
import enum

class PaymentMethod(enum.Enum):
    CASH = "CASH"
    MTN_MOMO = "MTN_MOMO"
    VODAFONE_CASH = "VODAFONE_CASH"
    AIRTELTIGO_MONEY = "AIRTELTIGO_MONEY"
    BANK_CARD = "BANK_CARD"
    LOYALTY_POINTS = "LOYALTY_POINTS"

class Payment(Base, BaseMixin):
    __tablename__ = "payments"

    bill_id = Column(String, ForeignKey("bills.id"), nullable=False)
    amount = Column(Integer, nullable=False)
    method = Column(Enum(PaymentMethod), nullable=False)
    transaction_id = Column(String, nullable=True) # For mobile money / card

    bill = relationship("Bill", back_populates="payments")
