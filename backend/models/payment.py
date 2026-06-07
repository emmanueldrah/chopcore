from sqlalchemy import Column, String, Integer, DateTime, ForeignKey, Enum
from sqlalchemy.orm import relationship
from backend.database import Base
import uuid
from datetime import datetime
import enum

class PaymentMethod(enum.Enum):
    CASH = "CASH"
    MTN_MOMO = "MTN_MOMO"
    VODAFONE_CASH = "VODAFONE_CASH"
    AIRTELTIGO_MONEY = "AIRTELTIGO_MONEY"
    BANK_CARD = "BANK_CARD"
    LOYALTY_POINTS = "LOYALTY_POINTS"

class Payment(Base):
    __tablename__ = "payments"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    bill_id = Column(String, ForeignKey("bills.id"), nullable=False)
    amount = Column(Integer, nullable=False)
    method = Column(Enum(PaymentMethod), nullable=False)
    transaction_id = Column(String, nullable=True) # For mobile money / card

    created_at = Column(DateTime, default=datetime.utcnow)

    bill = relationship("Bill", back_populates="payments")
