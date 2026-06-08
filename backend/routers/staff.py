from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.models.staff import Staff, StaffStatus
from backend.models.attendance import Attendance
from sqlalchemy import func
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter(prefix="/api/v1/staff", tags=["staff"])

class StaffCreate(BaseModel):
    staff_id: str
    full_name: str
    role: str
    hourly_rate: int = 0

@router.get("/")
def get_staff(db: Session = Depends(get_db)):
    return db.query(Staff).all()

@router.get("/{id}/payroll")
def get_payroll(id: str, db: Session = Depends(get_db)):
    staff = db.query(Staff).filter(Staff.id == id).first()
    if not staff:
        raise HTTPException(status_code=404, detail="Staff not found")

    # Calculate hours worked this month
    from datetime import datetime, timedelta
    start_of_month = datetime.utcnow().replace(day=1, hour=0, minute=0, second=0, microsecond=0)

    attendances = db.query(Attendance).filter(
        Attendance.staff_id == id,
        Attendance.clock_in >= start_of_month,
        Attendance.clock_out != None
    ).all()

    total_seconds = sum((a.clock_out - a.clock_in).total_seconds() for a in attendances)
    total_hours = total_seconds / 3600

    return {
        "hours_worked": round(total_hours, 2),
        "hourly_rate": staff.hourly_rate,
        "total_pay": round(total_hours * staff.hourly_rate)
    }

@router.post("/")
def create_staff(data: StaffCreate, db: Session = Depends(get_db)):
    staff = Staff(**data.dict())
    db.add(staff)
    db.commit()
    db.refresh(staff)
    return staff
