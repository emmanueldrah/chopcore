from fastapi import APIRouter, Depends, Query
from app.db.session import get_db
from app.models.models import Vendor, Item, VendorCategory
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, and_
from typing import Optional, List

router = APIRouter()

@router.get("/")
async def list_vendors(
    category: Optional[VendorCategory] = None,
    lat: Optional[float] = None,
    lng: Optional[float] = None,
    search: Optional[str] = None,
    db: AsyncSession = Depends(get_db)
):
    query = select(Vendor).where(Vendor.verification_status == "approved")

    if category:
        query = query.where(Vendor.category == category)

    if search:
        query = query.where(Vendor.business_name.ilike(f"%{search}%"))

    # Proximity sorting logic would go here

    result = await db.execute(query)
    return result.scalars().all()

@router.get("/{vendor_id}")
async def get_vendor_detail(vendor_id: str, db: AsyncSession = Depends(get_db)):
    vendor = await db.get(Vendor, vendor_id)
    if not vendor:
        return {"error": "Not found"}

    # Also get items
    result = await db.execute(select(Item).where(and_(Item.vendor_id == vendor_id, Item.is_active == True)))
    items = result.scalars().all()

    return {"vendor": vendor, "items": items}
