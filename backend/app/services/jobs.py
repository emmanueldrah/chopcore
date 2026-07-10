from sqlalchemy.ext.asyncio import AsyncSession
from app.models.models import Order, OrderStatus, EscrowStatus
from sqlalchemy import select, and_
from datetime import datetime, timedelta

async def auto_decline_timed_out_orders(db: AsyncSession):
    """Decline orders in 'placed' status for more than 15 minutes"""
    timeout = datetime.utcnow() - timedelta(minutes=15)
    query = select(Order).where(and_(Order.status == OrderStatus.PLACED, Order.placed_at < timeout))
    result = await db.execute(query)
    orders = result.scalars().all()

    for order in orders:
        order.status = OrderStatus.DECLINED
        order.escrow_status = EscrowStatus.REFUNDED
        # Trigger notification here

    await db.commit()

async def auto_flag_long_deliveries(db: AsyncSession):
    """Flag orders in 'out_for_delivery' status for more than 24 hours"""
    timeout = datetime.utcnow() - timedelta(hours=24)
    query = select(Order).where(and_(Order.status == OrderStatus.OUT_FOR_DELIVERY, Order.out_for_delivery_at < timeout))
    result = await db.execute(query)
    orders = result.scalars().all()

    for order in orders:
        order.status = OrderStatus.AUTO_FLAGGED
        # Trigger admin alert

    await db.commit()
