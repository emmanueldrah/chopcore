from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.models.event import Event, EventStatus
from pydantic import BaseModel
from typing import List, Optional, Any
from datetime import datetime

router = APIRouter(prefix="/api/v1/events", tags=["events"])

class EventCreate(BaseModel):
    client_name: str
    client_phone: str
    event_date: datetime
    venue: str
    event_type: str
    expected_guests: int
    per_head_price: int = 0

@router.get("/")
def get_events(db: Session = Depends(get_db)):
    return db.query(Event).all()

@router.post("/")
def create_event(data: EventCreate, db: Session = Depends(get_db)):
    event = Event(**data.dict())
    event.total_budget = event.expected_guests * event.per_head_price
    db.add(event)
    db.commit()
    db.refresh(event)
    return event
