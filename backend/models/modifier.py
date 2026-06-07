from sqlalchemy import Column, String, Integer, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from backend.database import Base
import uuid
from datetime import datetime

class ModifierGroup(Base):
    __tablename__ = "modifier_groups"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, nullable=False)
    min_selection = Column(Integer, default=0)
    max_selection = Column(Integer, default=1)

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    deleted_at = Column(DateTime, nullable=True)

    options = relationship("ModifierOption", back_populates="group")

class ModifierOption(Base):
    __tablename__ = "modifier_options"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    group_id = Column(String, ForeignKey("modifier_groups.id"), nullable=False)
    name = Column(String, nullable=False)
    price = Column(Integer, default=0) # Extra price in pesewas

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    deleted_at = Column(DateTime, nullable=True)

    group = relationship("ModifierGroup", back_populates="options")

class MenuItemModifierGroup(Base):
    __tablename__ = "menu_item_modifier_groups"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    menu_item_id = Column(String, ForeignKey("menu_items.id"), nullable=False)
    modifier_group_id = Column(String, ForeignKey("modifier_groups.id"), nullable=False)

    menu_item = relationship("MenuItem", back_populates="modifier_groups")
    modifier_group = relationship("ModifierGroup")
