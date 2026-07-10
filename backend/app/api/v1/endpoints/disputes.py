from fastapi import APIRouter, Depends, HTTPException
from app.middleware.auth import get_current_user, check_role
from app.db.session import get_db
from app.models.models import Dispute, Order, OrderStatus, DisputeStatus, DisputeResolution, EscrowStatus
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import BaseModel
from datetime import datetime

router = APIRouter()

class DisputeCreate(BaseModel):
    reason: str
    note: str
    photo_url: str = None

class DisputeResolve(BaseModel):
    resolution: DisputeResolution
    notes: str

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

    # Ownership check: Only the buyer of the order can raise a dispute
    if str(order.buyer_id) != user["sub"]:
        raise HTTPException(status_code=403, detail="Only the buyer can dispute this order")

    if order.status not in [OrderStatus.DELIVERED, OrderStatus.OUT_FOR_DELIVERY]:
        raise HTTPException(status_code=400, detail="Dispute can only be raised for active/delivered orders")

    dispute = Dispute(
        order_id=order_id,
        raised_by=user["sub"],
        reason=dispute_in.reason,
        note=dispute_in.note,
        photo_url=dispute_in.photo_url,
        status=DisputeStatus.OPEN
    )

    order.status = OrderStatus.DISPUTED
    db.add(dispute)
    await db.commit()
    await db.refresh(dispute)
    return dispute

@router.post("/{dispute_id}/resolve", dependencies=[Depends(check_role(["admin"]))])
async def resolve_dispute(
    dispute_id: str,
    resolve_in: DisputeResolve,
    user: dict = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    dispute = await db.get(Dispute, dispute_id)
    if not dispute:
        raise HTTPException(status_code=404, detail="Dispute not found")

    order = await db.get(Order, dispute.order_id)

    dispute.status = DisputeStatus.RESOLVED
    dispute.resolution = resolve_in.resolution
    dispute.resolution_notes = resolve_in.notes
    dispute.resolved_by_admin_id = user["sub"]
    dispute.resolved_at = datetime.utcnow()

    if resolve_in.resolution == DisputeResolution.REFUNDED:
        order.status = OrderStatus.REFUNDED
        order.escrow_status = EscrowStatus.REFUNDED
    else:
        # Released to vendor
        order.status = OrderStatus.DELIVERED
        order.escrow_status = EscrowStatus.RELEASED

    await db.commit()
    return dispute
