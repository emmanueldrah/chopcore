from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.models.order import Order
from backend.models.bill import Bill
from weasyprint import HTML
import tempfile
import os

router = APIRouter(prefix="/api/v1/print", tags=["print"])

@router.get("/receipt/{order_id}")
def generate_receipt_pdf(order_id: str, format: str = "thermal", db: Session = Depends(get_db)):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    items_html = "".join([
        f"<tr><td>{item.quantity}x {item.menu_item.name}</td><td align='right'>₵ {item.total_price/100:.2f}</td></tr>"
        for item in order.items
    ])

    width = "80mm" if format == "thermal" else "210mm"

    html_content = f"""
    <html>
    <head>
        <style>
            body {{ font-family: sans-serif; width: {width}; margin: 0 auto; padding: 10px; }}
            h1 {{ text-align: center; margin-bottom: 5px; }}
            .info {{ text-align: center; font-size: 12px; margin-bottom: 20px; }}
            table {{ width: 100%; border-collapse: collapse; }}
            th {{ border-bottom: 1px dashed #000; padding: 5px 0; }}
            td {{ padding: 5px 0; font-size: 14px; }}
            .total {{ border-top: 2px solid #000; margin-top: 10px; padding-top: 10px; font-weight: bold; font-size: 18px; }}
            .footer {{ text-align: center; margin-top: 30px; font-size: 10px; opacity: 0.5; }}
        </style>
    </head>
    <body>
        <h1>CHOPCORE</h1>
        <div class="info">
            Order: {order.order_number}<br>
            Date: {order.created_at.strftime('%d/%m/%Y %H:%M')}<br>
            Type: {order.order_type.value}
        </div>
        <table>
            <thead><tr><th align="left">Item</th><th align="right">Price</th></tr></thead>
            <tbody>{items_html}</tbody>
        </table>
        <div class="total">
            <div style="display: flex; justify-content: space-between;">
                <span>TOTAL</span>
                <span>₵ {order.total_amount/100:.2f}</span>
            </div>
        </div>
        <div class="footer">Thank you for your business!</div>
    </body>
    </html>
    """

    pdf = HTML(string=html_content).write_pdf()
    return Response(content=pdf, media_type="application/pdf")
