from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.models.delivery import Delivery, DeliveryStatus
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter(prefix="/api/v1/delivery", tags=["delivery"])

class DeliveryUpdate(BaseModel):
    status: DeliveryStatus
    rider_id: Optional[str] = None

@router.get("/")
def get_deliveries(status: Optional[DeliveryStatus] = None, db: Session = Depends(get_db)):
    query = db.query(Delivery)
    if status:
        query = query.filter(Delivery.status == status)
    return query.all()

@router.patch("/{delivery_id}")
def update_delivery(delivery_id: str, data: DeliveryUpdate, db: Session = Depends(get_db)):
    delivery = db.query(Delivery).filter(Delivery.id == delivery_id).first()
    if not delivery:
        raise HTTPException(status_code=404, detail="Delivery not found")

    if data.status:
        delivery.status = data.status
    if data.rider_id:
        delivery.rider_id = data.rider_id

    db.commit()
    return delivery
