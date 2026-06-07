from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.models.staff import Staff, StaffStatus
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter(prefix="/api/v1/staff", tags=["staff"])

class StaffCreate(BaseModel):
    staff_id: str
    full_name: str
    role: str
    gender: Optional[str] = None

@router.get("/")
def get_staff(db: Session = Depends(get_db)):
    return db.query(Staff).all()

@router.post("/")
def create_staff(data: StaffCreate, db: Session = Depends(get_db)):
    staff = Staff(**data.dict())
    db.add(staff)
    db.commit()
    db.refresh(staff)
    return staff
