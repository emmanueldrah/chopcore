from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.models.kitchen_ticket import KitchenTicket, KitchenTicketStatus
from backend.websocket.kitchen import kitchen_manager
import json

router = APIRouter(prefix="/api/v1/kitchen", tags=["kitchen"])

@router.websocket("/ws")
async def kitchen_ws_endpoint(websocket: WebSocket):
    await kitchen_manager.connect(websocket)
    try:
        while True:
            # Wait for any messages from kitchen (e.g. mark as ready)
            data = await websocket.receive_text()
            message = json.loads(data)
            # Process message if needed
    except WebSocketDisconnect:
        kitchen_manager.disconnect(websocket)

@router.get("/tickets")
def get_tickets(db: Session = Depends(get_db)):
    return db.query(KitchenTicket).filter(KitchenTicket.status != KitchenTicketStatus.DISMISSED).all()

@router.patch("/tickets/{ticket_id}/status")
async def update_ticket_status(ticket_id: str, status: KitchenTicketStatus, db: Session = Depends(get_db)):
    ticket = db.query(KitchenTicket).filter(KitchenTicket.id == ticket_id).first()
    if not ticket:
        return {"error": "Ticket not found"}
    ticket.status = status
    db.commit()

    # Broadcast update
    await kitchen_manager.broadcast({
        "type": "TICKET_UPDATED",
        "ticket_id": ticket_id,
        "status": status.value
    })
    return ticket
