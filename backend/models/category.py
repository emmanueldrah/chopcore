from sqlalchemy import Column, String, Integer
from backend.database import Base
from backend.models.base import BaseMixin

class Category(Base, BaseMixin):
    __tablename__ = "categories"

    name = Column(String, nullable=False)
    order = Column(Integer, default=0)
