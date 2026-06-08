from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.models.customer import Customer
from backend.models.loyalty import LoyaltyTransaction
from backend.models.bill import Bill, BillStatus
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter(prefix="/api/v1/loyalty", tags=["loyalty"])

class CustomerCreate(BaseModel):
    name: str
    phone: str
    email: Optional[str] = None

class RedeemRequest(BaseModel):
    customer_id: str
    points: int
    bill_id: str

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

@router.post("/redeem")
def redeem_points(data: RedeemRequest, db: Session = Depends(get_db)):
    customer = db.query(Customer).filter(Customer.id == data.customer_id).first()
    if not customer or customer.loyalty_points < data.points:
        raise HTTPException(status_code=400, detail="Insufficient points")

    bill = db.query(Bill).filter(Bill.id == data.bill_id).first()
    if not bill:
        raise HTTPException(status_code=404, detail="Bill not found")

    # Conversion rate: 100 points = 1 GHS (100 pesewas)
    discount_pesewas = data.points

    bill.discount_amount += discount_pesewas
    bill.total_amount -= discount_pesewas

    customer.loyalty_points -= data.points

    txn = LoyaltyTransaction(
        customer_id=customer.id,
        points=-data.points,
        type="REDEEMED",
        order_id=bill.order_id
    )
    db.add(txn)

    db.commit()
    return {"success": True, "discount_applied": discount_pesewas}
