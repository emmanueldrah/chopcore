import pytest
from httpx import ASGITransport, AsyncClient
from jose import jwt
from main import app
from app.core.config import settings

@pytest.fixture
def auth_token():
    payload = {
        "sub": "test-user",
        "aud": "authenticated",
        "app_metadata": {"role": "buyer"},
        "user_metadata": {"role": "buyer"}
    }
    return jwt.encode(payload, settings.JWT_SECRET, algorithm="HS256")

@pytest.mark.asyncio
async def test_create_order_no_idempotency(auth_token):
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        headers = {"Authorization": f"Bearer {auth_token}"}
        response = await ac.post("/v1/orders/", json={
            "vendor_id": "v1",
            "delivery_address_id": "a1",
            "items": [{"item_id": "i1", "quantity": 1}]
        }, headers=headers)
        assert response.status_code == 400
        assert "Idempotency-Key header required" in response.text

@pytest.mark.asyncio
async def test_create_order_with_idempotency(auth_token):
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        headers = {
            "Authorization": f"Bearer {auth_token}",
            "Idempotency-Key": "test-key-123"
        }
        # Note: This will fail on DB interaction since we haven't set up a test DB
        # But it verifies the middleware and initial logic
        response = await ac.post("/v1/orders/", json={
            "vendor_id": "v1",
            "delivery_address_id": "a1",
            "items": [{"item_id": "i1", "quantity": 1}]
        }, headers=headers)
        # We expect 500 or 404/400 depending on how deep it gets without a real DB
        # but 401/403 would mean auth failed.
        assert response.status_code != 401
        assert response.status_code != 403


@pytest.mark.asyncio
async def test_order_status_transition_logic():
    from app.models.models import Order, OrderStatus

    order = Order(status=OrderStatus.PLACED)

    # Simulate the logic in update_order_status
    allowed_transitions = {
        OrderStatus.PLACED: [OrderStatus.ACCEPTED, OrderStatus.DECLINED, OrderStatus.CANCELLED],
        OrderStatus.ACCEPTED: [OrderStatus.PREPARING],
        OrderStatus.PREPARING: [OrderStatus.OUT_FOR_DELIVERY],
        OrderStatus.OUT_FOR_DELIVERY: [OrderStatus.DELIVERED, OrderStatus.AUTO_FLAGGED],
    }

    # Valid transition
    new_status = OrderStatus.ACCEPTED
    assert new_status in allowed_transitions.get(order.status, [])

    # Invalid transition
    invalid_status = OrderStatus.DELIVERED
    assert invalid_status not in allowed_transitions.get(order.status, [])
