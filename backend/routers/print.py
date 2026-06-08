from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.models.order import Order
from backend.models.bill import Bill
from backend.models.business import Business
from weasyprint import HTML
from datetime import datetime

router = APIRouter(prefix="/api/v1/print", tags=["print"])

@router.get("/receipt/{order_id}")
def generate_receipt_pdf(order_id: str, format: str = "thermal", db: Session = Depends(get_db)):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    business = db.query(Business).first()
    tin = f"TIN: {business.tin}" if business and business.tin else "TIN: NOT REGISTERED"

    items_html = "".join([
        f"""
        <tr>
            <td style="padding: 6px 0;">
                <div style="font-weight: bold; font-size: 13px;">{item.menu_item.name}</div>
                <div style="font-size: 10px; color: #444; font-weight: bold;">{item.quantity} x ₵ {item.unit_price/100:.2f}</div>
            </td>
            <td align="right" style="vertical-align: top; padding: 6px 0; font-weight: bold; font-size: 13px;">₵ {item.total_price/100:.2f}</td>
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
            body {{ font-family: 'Courier New', Courier, monospace; width: {width}; margin: 0; padding: 30px; color: #000; line-height: 1.2; }}
            .header {{ text-align: center; border-bottom: 3px double #000; padding-bottom: 15px; margin-bottom: 20px; }}
            .logo {{ font-size: 28px; font-weight: 900; letter-spacing: -2px; }}
            .biz-info {{ font-size: 11px; font-weight: bold; margin-top: 5px; text-transform: uppercase; }}
            .order-info {{ font-size: 12px; font-weight: bold; margin-bottom: 20px; border-bottom: 1px solid #000; padding-bottom: 10px; }}
            table {{ width: 100%; border-collapse: collapse; }}
            th {{ border-bottom: 1px solid #000; padding: 8px 0; font-size: 11px; text-transform: uppercase; }}
            .totals {{ margin-top: 20px; border-top: 2px solid #000; padding-top: 10px; }}
            .total-row {{ display: flex; justify-content: space-between; font-weight: bold; font-size: 14px; margin-bottom: 5px; }}
            .grand-total {{ font-size: 24px; border-top: 3px double #000; margin-top: 10px; padding-top: 10px; letter-spacing: -1px; }}
            .vat-summary {{ margin-top: 25px; font-size: 11px; border: 1px solid #000; padding: 10px; }}
            .footer {{ text-align: center; margin-top: 40px; font-size: 12px; font-weight: bold; text-transform: uppercase; border-top: 1px dashed #000; padding-top: 20px; }}
        </style>
    </head>
    <body>
        <div class="header">
            <div class="logo">CHOPCORE</div>
            <div class="biz-info">
                {business.name if business else 'PREMIUM RESTAURANT'}<br>
                {business.address if business else 'ACCRA, GHANA'}<br>
                {tin}
            </div>
        </div>

        <div class="order-info">
            RECEIPT #: {order.order_number}<br>
            DATE: {order.created_at.strftime('%d/%m/%Y %H:%M')}<br>
            CASHIER: ADMIN<br>
            MODE: {order.order_type.value}<br>
            {f"TABLE: {order.table.number}" if order.table else "WALK-IN CUSTOMER"}
        </div>

        <table>
            <thead><tr><th align="left">Description</th><th align="right">Amount</th></tr></thead>
            <tbody>{items_html}</tbody>
        </table>

        <div class="totals">
            <div class="total-row"><span>Subtotal</span><span>₵ {order.subtotal/100:.2f}</span></div>
            <div class="total-row"><span>VAT (15%)</span><span>₵ {order.tax_amount/100:.2f}</span></div>
            <div class="total-row grand-total">
                <span>TOTAL</span>
                <span>₵ {order.total_amount/100:.2f}</span>
            </div>
        </div>

        <div class="vat-summary">
            TAX COMPLIANCE SUMMARY:<br>
            Taxable Amount: ₵ {(order.total_amount - order.tax_amount)/100:.2f}<br>
            VAT Output (15%): ₵ {order.tax_amount/100:.2f}<br>
            Total Payable: ₵ {order.total_amount/100:.2f}
        </div>

        <div class="footer">
            *** CUSTOMER COPY ***<br>
            THANK YOU FOR CHOOSING {business.name.upper() if business else 'US'}<br>
            PLEASE KEEP YOUR RECEIPT
        </div>
    </body>
    </html>
    """

    pdf = HTML(string=html_content).write_pdf()
    return Response(content=pdf, media_type="application/pdf")
