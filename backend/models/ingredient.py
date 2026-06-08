from sqlalchemy import Column, String, Integer, JSON, ForeignKey
from sqlalchemy.orm import relationship
from backend.database import Base
from backend.models.base import BaseMixin

class Ingredient(Base, BaseMixin):
    __tablename__ = "ingredients"

    name = Column(String, nullable=False)
    unit = Column(String, nullable=False) # kg, g, litres, ml, pieces
    reorder_level = Column(Integer, default=0)
    supplier_info = Column(JSON, nullable=True)

class Recipe(Base, BaseMixin):
    __tablename__ = "recipes"

    menu_item_id = Column(String, ForeignKey("menu_items.id"), nullable=False)
    ingredient_id = Column(String, ForeignKey("ingredients.id"), nullable=False)
    quantity = Column(Integer, nullable=False)

    menu_item = relationship("MenuItem", back_populates="recipes")
    ingredient = relationship("Ingredient")
