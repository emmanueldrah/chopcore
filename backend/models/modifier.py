from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship
from backend.database import Base
from backend.models.base import BaseMixin

class ModifierGroup(Base, BaseMixin):
    __tablename__ = "modifier_groups"

    name = Column(String, nullable=False)
    min_selection = Column(Integer, default=0)
    max_selection = Column(Integer, default=1)

    options = relationship("ModifierOption", back_populates="group")

class ModifierOption(Base, BaseMixin):
    __tablename__ = "modifier_options"

    group_id = Column(String, ForeignKey("modifier_groups.id"), nullable=False)
    name = Column(String, nullable=False)
    price = Column(Integer, default=0) # Extra price in pesewas

    group = relationship("ModifierGroup", back_populates="options")

class MenuItemModifierGroup(Base, BaseMixin):
    __tablename__ = "menu_item_modifier_groups"

    menu_item_id = Column(String, ForeignKey("menu_items.id"), nullable=False)
    modifier_group_id = Column(String, ForeignKey("modifier_groups.id"), nullable=False)

    menu_item = relationship("MenuItem", back_populates="modifier_groups")
    modifier_group = relationship("ModifierGroup")
