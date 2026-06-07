from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.models.customer import Customer
from backend.models.loyalty import LoyaltyTransaction
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter(prefix="/api/v1/loyalty", tags=["loyalty"])

class CustomerCreate(BaseModel):
    name: str
    phone: str
    email: Optional[str] = None

@router.get("/customers")
def get_customers(phone: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(Customer)
    if phone:
        query = query.filter(Customer.phone == phone)
    return query.all()

@router.post("/customers")
def create_customer(data: CustomerCreate, db: Session = Depends(get_db)):
    customer = Customer(**data.dict())
    db.add(customer)
    db.commit()
    db.refresh(customer)
    return customer
