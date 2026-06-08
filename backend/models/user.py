from sqlalchemy import Column, String, Enum, Boolean
from backend.database import Base
from backend.models.base import BaseMixin
import enum

class UserRole(enum.Enum):
    SUPER_ADMIN = "SUPER_ADMIN"
    ADMIN = "ADMIN"
    MANAGER = "MANAGER"
    CASHIER = "CASHIER"
    WAITER = "WAITER"
    KITCHEN_STAFF = "KITCHEN_STAFF"
    DELIVERY_RIDER = "DELIVERY_RIDER"
    INVENTORY_MANAGER = "INVENTORY_MANAGER"
    ACCOUNTANT = "ACCOUNTANT"

class User(Base, BaseMixin):
    __tablename__ = "users"

    username = Column(String, unique=True, index=True, nullable=False)
    full_name = Column(String, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(Enum(UserRole), nullable=False)
    is_active = Column(Boolean, default=True)
