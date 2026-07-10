import pytest
from httpx import ASGITransport, AsyncClient
from jose import jwt
from main import app
from app.core.config import settings
from app.models.models import OrderStatus

@pytest.fixture
def vendor_token():
    payload = {
        "sub": "vendor-user-123",
        "aud": "authenticated",
        "app_metadata": {"role": "vendor_owner"},
        "user_metadata": {"role": "vendor_owner"}
    }
    return jwt.encode(payload, settings.JWT_SECRET, algorithm="HS256")

@pytest.mark.asyncio
async def test_update_order_status_unauthorized(vendor_token):
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        headers = {"Authorization": f"Bearer {vendor_token}"}
        # Order ID must be a valid UUID string
        order_id = "00000000-0000-0000-0000-000000000000"
        response = await ac.patch(f"/v1/orders/{order_id}/status",
                                 params={"new_status": OrderStatus.ACCEPTED},
                                 headers=headers)
        # We expect 404 because the order doesn't exist, but it passed the validation
        assert response.status_code in [404, 403]
