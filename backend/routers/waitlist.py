from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.models.waitlist import WaitlistEntry
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter(prefix="/api/v1/waitlist", tags=["waitlist"])

class WaitlistCreate(BaseModel):
    customer_name: str
    customer_phone: str
    party_size: int
    notes: Optional[str] = None

@router.get("/")
def get_waitlist(db: Session = Depends(get_db)):
    return db.query(WaitlistEntry).filter(WaitlistEntry.status == "WAITING").all()

@router.post("/")
def add_to_waitlist(data: WaitlistCreate, db: Session = Depends(get_db)):
    entry = WaitlistEntry(**data.dict())
    db.add(entry)
    db.commit()
    db.refresh(entry)
    return entry

@router.patch("/{id}/status")
def update_waitlist_status(id: str, status: str, db: Session = Depends(get_db)):
    entry = db.query(WaitlistEntry).filter(WaitlistEntry.id == id).first()
    if not entry:
        raise HTTPException(status_code=404, detail="Entry not found")
    entry.status = status
    db.commit()
    return entry
