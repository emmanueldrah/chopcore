from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
# In tests, we might not have a real DB, but we'll try to use the one defined
from backend.database import get_db
from backend.models.business import Business, BusinessMode
from backend.models.user import User, UserRole
from pydantic import BaseModel
from typing import Optional, Dict
from passlib.context import CryptContext

router = APIRouter(prefix="/api/v1/setup", tags=["setup"])
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class BusinessSetup(BaseModel):
    name: str
    mode: BusinessMode
    logo_url: Optional[str] = None
    address: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    opening_hours: Optional[Dict] = None
    currency: str = "GHS"
    tax_rate: int = 1500

class AdminSetup(BaseModel):
    full_name: str
    username: str
    password: str

class SetupRequest(BaseModel):
    business: BusinessSetup
    admin: AdminSetup

@router.get("/status")
def get_setup_status(db: Session = Depends(get_db)):
    try:
        business = db.query(Business).first()
        return {"is_setup": business is not None}
    except Exception:
        return {"is_setup": False}

@router.get("/mode")
def get_business_mode(db: Session = Depends(get_db)):
    business = db.query(Business).first()
    if not business:
        return {"mode": None}
    return {"mode": business.mode}

@router.post("/")
def complete_setup(data: SetupRequest, db: Session = Depends(get_db)):
    existing_business = db.query(Business).first()
    if existing_business:
        raise HTTPException(status_code=400, detail="System already setup")

    # Create business
    new_business = Business(
        name=data.business.name,
        mode=data.business.mode,
        logo_url=data.business.logo_url,
        address=data.business.address,
        phone=data.business.phone,
        email=data.business.email,
        opening_hours=data.business.opening_hours,
        currency=data.business.currency,
        tax_rate=data.business.tax_rate
    )
    db.add(new_business)

    # Create admin
    hashed_password = pwd_context.hash(data.admin.password)
    new_admin = User(
        full_name=data.admin.full_name,
        username=data.admin.username,
        hashed_password=hashed_password,
        role=UserRole.SUPER_ADMIN
    )
    db.add(new_admin)

    db.commit()
    return {"success": True, "message": "Setup completed successfully"}
