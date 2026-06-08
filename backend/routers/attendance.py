from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.models.attendance import Attendance
from datetime import datetime
from pydantic import BaseModel
from typing import Optional

router = APIRouter(prefix="/api/v1/attendance", tags=["attendance"])

class ClockRequest(BaseModel):
    staff_id: str

@router.post("/clock-in")
def clock_in(data: ClockRequest, db: Session = Depends(get_db)):
    # Check if already clocked in
    existing = db.query(Attendance).filter(
        Attendance.staff_id == data.staff_id,
        Attendance.clock_out == None
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="Already clocked in")

    entry = Attendance(staff_id=data.staff_id, clock_in=datetime.utcnow())
    db.add(entry)
    db.commit()
    return {"status": "clocked_in", "time": entry.clock_in}

@router.post("/clock-out")
def clock_out(data: ClockRequest, db: Session = Depends(get_db)):
    entry = db.query(Attendance).filter(
        Attendance.staff_id == data.staff_id,
        Attendance.clock_out == None
    ).first()
    if not entry:
        raise HTTPException(status_code=400, detail="Not clocked in")

    entry.clock_out = datetime.utcnow()
    db.commit()
    return {"status": "clocked_out", "time": entry.clock_out}
