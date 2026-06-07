from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.models.bill import Bill, BillStatus
from backend.models.payment import Payment, PaymentMethod
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter(prefix="/api/v1/billing", tags=["billing"])

class PaymentCreate(BaseModel):
    amount: int
    method: PaymentMethod
    transaction_id: Optional[str] = None

class BillCreate(BaseModel):
    order_id: str
    discount_amount: int = 0

@router.get("/{order_id}")
def get_bill_for_order(order_id: str, db: Session = Depends(get_db)):
    return db.query(Bill).filter(Bill.order_id == order_id).first()

@router.post("/")
def create_bill(data: BillCreate, db: Session = Depends(get_db)):
    from backend.models.order import Order
    order = db.query(Order).filter(Order.id == data.order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    bill = Bill(
        order_id=order.id,
        subtotal=order.subtotal,
        discount_amount=data.discount_amount,
        tax_amount=order.tax_amount,
        delivery_fee=order.delivery_fee,
        total_amount=order.total_amount - data.discount_amount
    )
    db.add(bill)
    db.commit()
    db.refresh(bill)
    return bill

@router.post("/{bill_id}/payments")
def add_payment(bill_id: str, data: PaymentCreate, db: Session = Depends(get_db)):
    bill = db.query(Bill).filter(Bill.id == bill_id).first()
    if not bill:
        raise HTTPException(status_code=404, detail="Bill not found")

    payment = Payment(
        bill_id=bill_id,
        amount=data.amount,
        method=data.method,
        transaction_id=data.transaction_id
    )
    db.add(payment)

    # Check if bill is fully paid
    total_paid = sum(p.amount for p in bill.payments) + data.amount
    if total_paid >= bill.total_amount:
        bill.status = BillStatus.PAID

    db.commit()
    db.refresh(bill)
    return bill
