from fastapi import APIRouter, Depends, HTTPException, Header
from app.middleware.auth import get_current_user, check_role
from app.db.session import get_db
from app.models.models import Order, OrderItem, OrderStatus, Item, EscrowStatus, Vendor
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from pydantic import BaseModel
from typing import List
import uuid
from datetime import datetime

router = APIRouter()

class CreateOrderItem(BaseModel):
    item_id: str
    quantity: int

class CreateOrder(BaseModel):
    vendor_id: str
    delivery_address_id: str
    items: List[CreateOrderItem]

@router.post("/", dependencies=[Depends(get_current_user)])
async def create_order(
    order_in: CreateOrder,
    idempotency_key: str = Header(None),
    user: dict = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    if not idempotency_key:
        raise HTTPException(status_code=400, detail="Idempotency-Key header required")

    # 1. Check for existing order with same idempotency key
    existing_order_stmt = select(Order).where(Order.idempotency_key == idempotency_key)
    existing_order_result = await db.execute(existing_order_stmt)
    existing = existing_order_result.scalars().first()
    if existing:
        return existing

    # 2. Validate items and calculate totals
    subtotal = 0
    order_items = []

    for item_in in order_in.items:
        stmt = select(Item).where(Item.id == item_in.item_id)
        result = await db.execute(stmt)
        item = result.scalars().first()

        if not item or not item.is_active:
            raise HTTPException(status_code=404, detail=f"Item {item_in.item_id} not found")

        if item.stock_quantity < item_in.quantity:
            raise HTTPException(status_code=400, detail=f"Not enough stock for {item.name}")

        if str(item.vendor_id) != order_in.vendor_id:
            raise HTTPException(status_code=400, detail="All items must belong to the same vendor")

        item_total = item.price_pesewas * item_in.quantity
        subtotal += item_total

        order_items.append(OrderItem(
            item_id=item.id,
            item_name_snapshot=item.name,
            quantity=item_in.quantity,
            unit_price_pesewas=item.price_pesewas
        ))

        # Deduct stock
        item.stock_quantity -= item_in.quantity

    # 3. Calculate commission (mocked 10% snapshot)
    commission_rate = 0.10
    commission = int(subtotal * commission_rate)

    # 4. Create Order
    new_order = Order(
        buyer_id=user["sub"],
        vendor_id=order_in.vendor_id,
        delivery_address_id=order_in.delivery_address_id,
        status=OrderStatus.PLACED,
        subtotal_pesewas=subtotal,
        commission_pesewas=commission,
        total_pesewas=subtotal, # total includes commission internally
        commission_rate_snapshot=commission_rate,
        escrow_status=EscrowStatus.HELD,
        idempotency_key=idempotency_key,
        items=order_items
    )

    db.add(new_order)
    await db.commit()
    await db.refresh(new_order)

    return new_order

@router.patch("/{order_id}/status")
async def update_order_status(
    order_id: str,
    new_status: OrderStatus,
    user: dict = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    order = await db.get(Order, order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    user_role = user.get("app_metadata", {}).get("role") or user.get("user_metadata", {}).get("role")

    # Ownership Check
    if user_role == "vendor_owner":
        # Check if this user owns the vendor associated with the order
        vendor_stmt = select(Vendor).where(Vendor.owner_user_id == user["sub"])
        vendor_result = await db.execute(vendor_stmt)
        vendor = vendor_result.scalars().first()
        if not vendor or vendor.id != order.vendor_id:
            raise HTTPException(status_code=403, detail="Unauthorized: You do not own this order's vendor")
    elif user_role == "admin":
        pass # Admins can change status
    else:
        raise HTTPException(status_code=403, detail="Unauthorized")

    # State machine transition rules
    allowed_transitions = {
        OrderStatus.PLACED: [OrderStatus.ACCEPTED, OrderStatus.DECLINED, OrderStatus.CANCELLED],
        OrderStatus.ACCEPTED: [OrderStatus.PREPARING],
        OrderStatus.PREPARING: [OrderStatus.OUT_FOR_DELIVERY],
        OrderStatus.OUT_FOR_DELIVERY: [OrderStatus.DELIVERED, OrderStatus.AUTO_FLAGGED],
    }

    if new_status not in allowed_transitions.get(order.status, []):
        raise HTTPException(status_code=400, detail=f"Invalid transition from {order.status} to {new_status}")

    order.status = new_status
    if new_status == OrderStatus.ACCEPTED:
        order.accepted_at = datetime.utcnow()
    elif new_status == OrderStatus.OUT_FOR_DELIVERY:
        order.out_for_delivery_at = datetime.utcnow()
    elif new_status == OrderStatus.DELIVERED:
        order.delivered_at = datetime.utcnow()
        order.escrow_status = EscrowStatus.RELEASED

    await db.commit()
    return order
