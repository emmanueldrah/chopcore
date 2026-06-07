from sqlalchemy import Column, String, Integer, DateTime, Boolean, ForeignKey, JSON
from sqlalchemy.orm import relationship
from backend.database import Base
import uuid
from datetime import datetime

class MenuItem(Base):
    __tablename__ = "menu_items"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
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

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    deleted_at = Column(DateTime, nullable=True)

    category = relationship("Category")
    modifier_groups = relationship("MenuItemModifierGroup", back_populates="menu_item")
