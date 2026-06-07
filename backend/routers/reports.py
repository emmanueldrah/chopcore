from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.models.order import Order
from backend.models.bill import Bill
from sqlalchemy import func
from datetime import datetime, timedelta

router = APIRouter(prefix="/api/v1/reports", tags=["reports"])

@router.get("/daily-summary")
def get_daily_summary(db: Session = Depends(get_db)):
    today = datetime.utcnow().date()

    total_revenue = db.query(func.sum(Bill.total_amount)).filter(
        Bill.created_at >= today,
        Bill.status == "PAID"
    ).scalar() or 0

    total_orders = db.query(Order).filter(Order.created_at >= today).count()

    return {
        "revenue": total_revenue,
        "orders": total_orders,
        "avg_order_value": total_revenue / total_orders if total_orders > 0 else 0
    }
