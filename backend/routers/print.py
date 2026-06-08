from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.models.order import Order
from backend.models.bill import Bill
from weasyprint import HTML
from datetime import datetime

router = APIRouter(prefix="/api/v1/print", tags=["print"])

@router.get("/receipt/{order_id}")
def generate_receipt_pdf(order_id: str, format: str = "thermal", db: Session = Depends(get_db)):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    items_html = "".join([
        f"""
        <tr>
            <td style="padding: 4px 0;">
                <div style="font-weight: bold;">{item.menu_item.name}</div>
                <div style="font-size: 10px; color: #666;">{item.quantity} x ₵ {item.unit_price/100:.2f}</div>
            </td>
            <td align="right" style="vertical-align: top; padding: 4px 0; font-weight: bold;">₵ {item.total_price/100:.2f}</td>
        </tr>
        """
        for item in order.items
    ])

    width = "80mm" if format == "thermal" else "210mm"

    html_content = f"""
    <html>
    <head>
        <style>
            @page {{ margin: 0; }}
            body {{ font-family: 'Courier New', Courier, monospace; width: {width}; margin: 0; padding: 20px; color: #000; }}
            .header {{ text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 15px; }}
            .logo {{ font-size: 24px; font-weight: 900; letter-spacing: -1px; }}
            .info {{ font-size: 12px; line-height: 1.4; margin-bottom: 20px; }}
            table {{ width: 100%; border-collapse: collapse; }}
            th {{ border-bottom: 1px solid #000; padding: 5px 0; font-size: 12px; text-transform: uppercase; }}
            .totals {{ margin-top: 15px; border-top: 1px solid #000; padding-top: 10px; }}
            .total-row {{ display: flex; justify-content: space-between; font-weight: bold; font-size: 14px; margin-bottom: 4px; }}
            .grand-total {{ font-size: 20px; border-top: 2px solid #000; margin-top: 10px; padding-top: 10px; }}
            .vat-box {{ margin-top: 20px; font-size: 10px; border: 1px solid #ccc; padding: 8px; border-radius: 4px; }}
            .footer {{ text-align: center; margin-top: 30px; font-size: 11px; font-style: italic; }}
            .barcode {{ text-align: center; margin-top: 20px; font-family: 'Libre Barcode 39'; font-size: 40px; }}
        </style>
    </head>
    <body>
        <div class="header">
            <div class="logo">CHOPCORE</div>
            <div style="font-size: 10px; font-weight: bold;">PREMIUM FOOD & DRINKS</div>
        </div>

        <div class="info">
            ORDER #: {order.order_number}<br>
            DATE: {order.created_at.strftime('%d/%m/%Y %H:%M')}<br>
            TYPE: {order.order_type.value}<br>
            {f"TABLE: {order.table.number}" if order.table else "COUNTER ORDER"}
        </div>

        <table>
            <thead><tr><th align="left">Description</th><th align="right">Amount</th></tr></thead>
            <tbody>{items_html}</tbody>
        </table>

        <div class="totals">
            <div class="total-row"><span>Subtotal</span><span>₵ {order.subtotal/100:.2f}</span></div>
            <div class="total-row"><span>VAT (15%)</span><span>₵ {order.tax_amount/100:.2f}</span></div>
            {f'<div class="total-row"><span>Delivery</span><span>₵ {order.delivery_fee/100:.2f}</span></div>' if order.delivery_fee > 0 else ''}
            <div class="total-row grand-total">
                <span>TOTAL</span>
                <span>₵ {order.total_amount/100:.2f}</span>
            </div>
        </div>

        <div class="vat-box">
            VAT SUMMARY:<br>
            Net Amount: ₵ {(order.total_amount - order.tax_amount)/100:.2f}<br>
            VAT (15%): ₵ {order.tax_amount/100:.2f}
        </div>

        <div class="footer">
            Thank you for dining with us!<br>
            Please come again.
        </div>
    </body>
    </html>
    """

    pdf = HTML(string=html_content).write_pdf()
    return Response(content=pdf, media_type="application/pdf")
