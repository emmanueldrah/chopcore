from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.models.kitchen_ticket import KitchenTicket, KitchenTicketStatus
from backend.models.order_item import OrderItem, OrderItemStatus
from backend.websocket.kitchen import kitchen_manager
import json

router = APIRouter(prefix="/api/v1/kitchen", tags=["kitchen"])

@router.websocket("/ws")
async def kitchen_ws_endpoint(websocket: WebSocket):
    await kitchen_manager.connect(websocket)
    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        kitchen_manager.disconnect(websocket)

@router.get("/tickets")
def get_tickets(db: Session = Depends(get_db)):
    return db.query(KitchenTicket).filter(KitchenTicket.status != KitchenTicketStatus.DISMISSED).all()

@router.patch("/tickets/{ticket_id}/status")
async def update_ticket_status(ticket_id: str, status: KitchenTicketStatus, db: Session = Depends(get_db)):
    ticket = db.query(KitchenTicket).filter(KitchenTicket.id == ticket_id).first()
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")
    ticket.status = status
    db.commit()
    await kitchen_manager.broadcast({"type": "TICKET_UPDATED", "ticket_id": ticket_id, "status": status.value})
    return ticket

@router.patch("/items/{item_id}/status")
async def update_item_status(item_id: str, status: OrderItemStatus, db: Session = Depends(get_db)):
    item = db.query(OrderItem).filter(OrderItem.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")

    item.status = status
    db.commit()

    ticket = db.query(KitchenTicket).filter(KitchenTicket.order_id == item.order_id).first()
    if ticket:
        all_items = db.query(OrderItem).filter(OrderItem.order_id == item.order_id).all()
        if all(i.status == OrderItemStatus.READY for i in all_items):
            ticket.status = KitchenTicketStatus.READY
            db.commit()

    await kitchen_manager.broadcast({"type": "ITEM_UPDATED", "item_id": item_id, "status": status.value})
    return item
