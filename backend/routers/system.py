from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.database import get_db, engine, Base
from backend.models.user import User, UserRole
from backend.routers.auth import get_current_user

router = APIRouter(prefix="/api/v1/system", tags=["system"])

@router.post("/reset")
def reset_system(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role != UserRole.SUPER_ADMIN:
        raise HTTPException(status_code=403, detail="Only Super Admin can reset the system")

    # Drop all tables and recreate
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

    return {"success": True, "message": "System reset completed. Please restart setup."}
