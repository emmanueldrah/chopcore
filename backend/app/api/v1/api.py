from fastapi import APIRouter
from app.api.v1.endpoints import auth, vendors, orders, admin, vendor_portal, disputes

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(vendors.router, prefix="/vendors", tags=["vendors"])
api_router.include_router(orders.router, prefix="/orders", tags=["orders"])
api_router.include_router(admin.router, prefix="/admin", tags=["admin"])
api_router.include_router(vendor_portal.router, prefix="/vendor", tags=["vendor-portal"])
api_router.include_router(disputes.router, prefix="/disputes", tags=["disputes"])
