from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.models.reconciliation import CashReconciliation
from backend.models.payment import Payment, PaymentMethod
from sqlalchemy import func
from datetime import datetime
from pydantic import BaseModel

router = APIRouter(prefix="/api/v1/reconciliation", tags=["reconciliation"])

class ReconciliationRequest(BaseModel):
    cashier_id: str
    actual_amount: int
    notes: str = ""

@router.get("/expected/{cashier_id}")
def get_expected_cash(cashier_id: str, db: Session = Depends(get_db)):
    today = datetime.utcnow().date()
    # Logic: sum of all CASH payments for this cashier today
    # (In a real app, you'd filter by cashier who handled the order/bill)
    # For now, let's just sum all cash payments today
    expected = db.query(func.sum(Payment.amount)).filter(
        Payment.method == PaymentMethod.CASH,
        Payment.created_at >= today
    ).scalar() or 0
    return {"expected_amount": expected}

@router.post("/")
def create_reconciliation(data: ReconciliationRequest, db: Session = Depends(get_db)):
    expected = get_expected_cash(data.cashier_id, db)["expected_amount"]

    recon = CashReconciliation(
        cashier_id=data.cashier_id,
        expected_amount=expected,
        actual_amount=data.actual_amount,
        difference=data.actual_amount - expected,
        notes=data.notes
    )
    db.add(recon)
    db.commit()
    return recon
