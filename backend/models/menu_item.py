from sqlalchemy import Column, String, Integer, Boolean, ForeignKey, JSON
from sqlalchemy.orm import relationship
from backend.database import Base
from backend.models.base import BaseMixin

class MenuItem(Base, BaseMixin):
    __tablename__ = "menu_items"

    category_id = Column(String, ForeignKey("categories.id"), nullable=False)
    name = Column(String, nullable=False)
    description = Column(String, nullable=True)
    price = Column(Integer, nullable=False) # In pesewas
    cost_price = Column(Integer, nullable=True) # In pesewas
    image_url = Column(String, nullable=True)
    is_available = Column(Boolean, default=True)
    prep_time = Column(Integer, default=15) # Minutes
    tags = Column(JSON, default=[]) # e.g. ["Spicy", "Vegetarian"]
    time_availability = Column(JSON, default={"breakfast": True, "lunch": True, "dinner": True})

    category = relationship("Category")
    modifier_groups = relationship("MenuItemModifierGroup", back_populates="menu_item")
    recipes = relationship("Recipe", back_populates="menu_item")
