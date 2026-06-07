from sqlalchemy import Column, String, Integer, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from backend.database import Base
import uuid
from datetime import datetime

class Stock(Base):
    __tablename__ = "stocks"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    ingredient_id = Column(String, ForeignKey("ingredients.id"), nullable=False)
    quantity = Column(Integer, default=0) # Current quantity in smallest unit
    unit_cost = Column(Integer, default=0)
    expiry_date = Column(DateTime, nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    ingredient = relationship("Ingredient")

class StockTransaction(Base):
    __tablename__ = "stock_transactions"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    ingredient_id = Column(String, ForeignKey("ingredients.id"), nullable=False)
    quantity = Column(Integer, nullable=False) # Positive for stock in, negative for stock out
    type = Column(String, nullable=False) # PURCHASE, SALE, WASTE, ADJUSTMENT
    reason = Column(String, nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow)
