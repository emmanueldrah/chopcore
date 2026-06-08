from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.models.audit import AuditLog
from backend.models.user import User, UserRole
from backend.routers.auth import get_current_user
from pydantic import BaseModel

router = APIRouter(prefix="/api/v1/audit", tags=["audit"])

def log_action(db: Session, user_id: str, action: str, details: dict = None, ip: str = None):
    log = AuditLog(user_id=user_id, action=action, details=details, ip_address=ip)
    db.add(log)
    db.commit()

@router.get("/")
def get_logs(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role not in [UserRole.SUPER_ADMIN, UserRole.ADMIN]:
        raise HTTPException(status_code=403, detail="Not authorized")
    return db.query(AuditLog).order_by(AuditLog.created_at.desc()).all()
