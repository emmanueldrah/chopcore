from sqlalchemy import Column, String, DateTime
from datetime import datetime
import uuid

class BaseMixin:
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    deleted_at = Column(DateTime, nullable=True)

    def delete(self):
        self.deleted_at = datetime.utcnow()
