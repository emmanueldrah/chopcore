from sqlalchemy import Column, String, ForeignKey, JSON
from backend.database import Base
from backend.models.base import BaseMixin

class AuditLog(Base, BaseMixin):
    __tablename__ = "audit_logs"

    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    action = Column(String, nullable=False) # e.g. VOID_ITEM, LOGIN, CHANGE_PRICE
    details = Column(JSON, nullable=True)
    ip_address = Column(String, nullable=True)
