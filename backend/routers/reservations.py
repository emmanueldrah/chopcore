from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.models.reservation import Reservation, ReservationStatus
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

router = APIRouter(prefix="/api/v1/reservations", tags=["reservations"])

class ReservationCreate(BaseModel):
    customer_name: str
    customer_phone: str
    reservation_date: datetime
    party_size: int
    table_id: Optional[str] = None
    special_requests: Optional[str] = None

@router.get("/")
def get_reservations(db: Session = Depends(get_db)):
    return db.query(Reservation).all()

@router.post("/")
def create_reservation(data: ReservationCreate, db: Session = Depends(get_db)):
    res = Reservation(**data.dict())
    db.add(res)
    db.commit()
    db.refresh(res)
    return res
