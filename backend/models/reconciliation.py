from sqlalchemy import Column, String, Integer, DateTime, ForeignKey
from backend.database import Base
from backend.models.base import BaseMixin

class CashReconciliation(Base, BaseMixin):
    __tablename__ = "cash_reconciliations"

    cashier_id = Column(String, ForeignKey("users.id"), nullable=False)
    expected_amount = Column(Integer, nullable=False)
    actual_amount = Column(Integer, nullable=False)
    difference = Column(Integer, nullable=False)
    notes = Column(String, nullable=True)
