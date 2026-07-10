from sqlalchemy.ext.asyncio import AsyncSession
from app.models.models import Order, Payout, PayoutStatus, EscrowStatus
from sqlalchemy import select, and_

async def process_daily_payouts(db: AsyncSession):
    """Process all released escrow amounts into payouts"""
    query = select(Order).where(and_(Order.escrow_status == EscrowStatus.RELEASED, Order.status == "delivered"))
    result = await db.execute(query)
    orders = result.scalars().all()

    for order in orders:
        # Check if payout already exists
        existing = await db.execute(select(Payout).where(Payout.order_id == order.id))
        if existing.scalars().first():
            continue

        payout = Payout(
            vendor_id=order.vendor_id,
            order_id=order.id,
            amount_pesewas=order.subtotal_pesewas, # subtotal only, we keep commission
            status=PayoutStatus.PENDING
        )
        db.add(payout)

    await db.commit()
