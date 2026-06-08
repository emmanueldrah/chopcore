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
    total_amount: Optional[int] = None # For splits
    is_split: bool = False

@router.get("/{order_id}")
def get_bills_for_order(order_id: str, db: Session = Depends(get_db)):
    return db.query(Bill).filter(Bill.order_id == order_id).all()

@router.post("/")
def create_bill(data: BillCreate, db: Session = Depends(get_db)):
    from backend.models.order import Order
    order = db.query(Order).filter(Order.id == data.order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    amount = data.total_amount if data.total_amount is not None else order.total_amount

    bill = Bill(
        order_id=order.id,
        subtotal=order.subtotal,
        discount_amount=0,
        tax_amount=order.tax_amount,
        delivery_fee=order.delivery_fee,
        total_amount=amount,
        is_split=data.is_split
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

    total_paid = sum(p.amount for p in bill.payments) + data.amount
    if total_paid >= bill.total_amount:
        bill.status = BillStatus.PAID

        # Check if all bills for this order are paid
        from backend.models.order import Order, OrderStatus
        order = db.query(Order).filter(Order.id == bill.order_id).first()
        all_bills = db.query(Bill).filter(Bill.order_id == order.id).all()
        if all(b.status == BillStatus.PAID for b in all_bills):
            order.status = OrderStatus.COMPLETED
            if not order.stock_deducted:
                from backend.routers.inventory import deduct_stock_for_order
                deduct_stock_for_order(order.id, db)
                order.stock_deducted = True

    db.commit()
    db.refresh(bill)
    return bill
