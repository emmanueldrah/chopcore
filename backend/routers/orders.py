from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.models.order import Order, OrderStatus, OrderType
from backend.models.order_item import OrderItem, OrderItemStatus
from backend.models.table import Table, TableStatus
from backend.routers.inventory import deduct_stock_for_order
from backend.models.kitchen_ticket import KitchenTicket, KitchenTicketStatus
from backend.websocket.kitchen import kitchen_manager
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

router = APIRouter(prefix="/api/v1/orders", tags=["orders"])

class OrderItemCreate(BaseModel):
    menu_item_id: str
    quantity: int
    unit_price: int
    notes: Optional[str] = None
    course: Optional[str] = None
    modifiers: List[dict] = []

class OrderCreate(BaseModel):
    table_id: Optional[str] = None
    customer_name: Optional[str] = None
    order_type: OrderType
    items: List[OrderItemCreate]

@router.get("/")
def get_orders(status: Optional[OrderStatus] = None, db: Session = Depends(get_db)):
    query = db.query(Order)
    if status:
        query = query.filter(Order.status == status)
    return query.all()

@router.post("/")
def create_order(data: OrderCreate, db: Session = Depends(get_db)):
    # Generate order number (simple sequential for now, logic to reset at midnight should be added)
    today = datetime.utcnow().date()
    order_count = db.query(Order).filter(Order.created_at >= today).count()
    order_number = f"#{order_count + 1:04d}"

    order = Order(
        order_number=order_number,
        table_id=data.table_id,
        customer_name=data.customer_name,
        order_type=data.order_type,
        status=OrderStatus.PENDING
    )
    db.add(order)
    db.flush() # Get order ID

    subtotal = 0
    for item_data in data.items:
        total_price = item_data.unit_price * item_data.quantity
        # Add modifier prices
        for mod in item_data.modifiers:
            total_price += mod.get('price', 0) * item_data.quantity

        order_item = OrderItem(
            order_id=order.id,
            menu_item_id=item_data.menu_item_id,
            quantity=item_data.quantity,
            unit_price=item_data.unit_price,
            total_price=total_price,
            notes=item_data.notes,
            course=item_data.course,
            modifiers=item_data.modifiers
        )
        db.add(order_item)
        subtotal += total_price

    order.subtotal = subtotal
    order.total_amount = subtotal # VAT and discounts can be applied at billing

    if data.table_id:
        table = db.query(Table).filter(Table.id == data.table_id).first()
        if table:
            table.status = TableStatus.OCCUPIED

    db.commit()

    # Create Kitchen Ticket
    ticket = KitchenTicket(order_id=order.id)
    db.add(ticket)
    db.commit()

    # WebSocket Broadcast
    import asyncio
    asyncio.run(kitchen_manager.broadcast({
        "type": "NEW_TICKET",
        "order_number": order.order_number
    }))

    db.refresh(order)
    return order

@router.post("/{order_id}/complete")
def complete_order(order_id: str, db: Session = Depends(get_db)):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    order.status = OrderStatus.COMPLETED

    if order.table_id:
        table = db.query(Table).filter(Table.id == order.table_id).first()
        if table:
            table.status = TableStatus.AVAILABLE

    deduct_stock_for_order(order.id, db)

    db.commit()
    return {"success": True}
