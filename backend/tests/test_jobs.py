import pytest
from datetime import datetime, timedelta
from app.services.jobs import auto_decline_timed_out_orders, auto_flag_long_deliveries
from app.models.models import Order, OrderStatus, EscrowStatus, PayoutStatus
from unittest.mock import AsyncMock, MagicMock

@pytest.mark.asyncio
async def test_auto_decline_job():
    db = AsyncMock()
    order = MagicMock()
    order.status = OrderStatus.PLACED
    order.placed_at = datetime.utcnow() - timedelta(minutes=20)
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = [order]
    db.execute.return_value = mock_result
    await auto_decline_timed_out_orders(db)
    assert order.status == OrderStatus.DECLINED
    assert order.escrow_status == EscrowStatus.REFUNDED
    db.commit.assert_called_once()

@pytest.mark.asyncio
async def test_auto_flag_job():
    db = AsyncMock()
    order = MagicMock()
    order.status = OrderStatus.OUT_FOR_DELIVERY
    order.out_for_delivery_at = datetime.utcnow() - timedelta(hours=25)
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = [order]
    db.execute.return_value = mock_result
    await auto_flag_long_deliveries(db)
    assert order.status == OrderStatus.AUTO_FLAGGED
    db.commit.assert_called_once()

@pytest.mark.asyncio
async def test_process_daily_payouts():
    db = AsyncMock()

    order = MagicMock()
    order.id = "order-1"
    order.vendor_id = "vendor-1"
    order.subtotal_pesewas = 4500
    order.escrow_status = EscrowStatus.RELEASED
    order.status = "delivered"

    # 1. First execute call: get orders
    mock_order_result = MagicMock()
    mock_order_result.scalars.return_value.all.return_value = [order]

    # 2. Second execute call: check existing payout
    mock_payout_result = MagicMock()
    mock_payout_result.scalars.return_value.first.return_value = None

    db.execute.side_effect = [mock_order_result, mock_payout_result]

    from app.services.payouts import process_daily_payouts
    await process_daily_payouts(db)

    assert db.add.called
    payout = db.add.call_args[0][0]
    assert payout.amount_pesewas == 4500
    assert payout.vendor_id == "vendor-1"
    db.commit.assert_called_once()
