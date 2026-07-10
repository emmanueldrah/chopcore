from fastapi import APIRouter, Depends, HTTPException
from app.middleware.auth import get_current_user
from app.db.session import get_db
from app.models.models import Dispute, Order, OrderStatus, DisputeStatus
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import BaseModel

router = APIRouter()

class DisputeCreate(BaseModel):
    reason: str
    note: str
    photo_url: str = None

@router.post("/{order_id}/dispute", dependencies=[Depends(get_current_user)])
async def raise_dispute(
    order_id: str,
    dispute_in: DisputeCreate,
    user: dict = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    order = await db.get(Order, order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    if order.status not in [OrderStatus.DELIVERED, OrderStatus.OUT_FOR_DELIVERY]:
        raise HTTPException(status_code=400, detail="Dispute can only be raised for active/delivered orders")

    dispute = Dispute(
        order_id=order_id,
        raised_by=user["sub"], # UUID from Supabase JWT
        reason=dispute_in.reason,
        note=dispute_in.note,
        photo_url=dispute_in.photo_url
    )

    order.status = OrderStatus.DISPUTED
    db.add(dispute)
    await db.commit()
    return {"id": str(dispute.id)}
