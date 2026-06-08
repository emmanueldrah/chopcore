from sqlalchemy import Column, String, Integer, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from backend.database import Base
from backend.models.base import BaseMixin

class Stock(Base, BaseMixin):
    __tablename__ = "stocks"

    ingredient_id = Column(String, ForeignKey("ingredients.id"), nullable=False)
    quantity = Column(Integer, default=0) # Current quantity in smallest unit
    unit_cost = Column(Integer, default=0)
    expiry_date = Column(DateTime, nullable=True)

    ingredient = relationship("Ingredient")

class StockTransaction(Base, BaseMixin):
    __tablename__ = "stock_transactions"

    ingredient_id = Column(String, ForeignKey("ingredients.id"), nullable=False)
    quantity = Column(Integer, nullable=False) # Positive for stock in, negative for stock out
    type = Column(String, nullable=False) # PURCHASE, SALE, WASTE, ADJUSTMENT
    reason = Column(String, nullable=True)
