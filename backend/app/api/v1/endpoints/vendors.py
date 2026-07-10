from fastapi import APIRouter, Depends, Query, HTTPException
from app.db.session import get_db
from app.models.models import Vendor, Item, VendorCategory, VerificationStatus
from app.middleware.auth import get_current_user
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, and_
from typing import Optional, List
from pydantic import BaseModel
import uuid

router = APIRouter()

class VendorApply(BaseModel):
    business_name: str
    category: VendorCategory
    address_text: str
    verification_doc_url: str

@router.get("/")
async def list_vendors(
    category: Optional[VendorCategory] = None,
    lat: Optional[float] = None,
    lng: Optional[float] = None,
    search: Optional[str] = None,
    db: AsyncSession = Depends(get_db)
):
    query = select(Vendor).where(Vendor.verification_status == VerificationStatus.APPROVED)

    if category:
        query = query.where(Vendor.category == category)

    if search:
        query = query.where(Vendor.business_name.ilike(f"%{search}%"))

    # Proximity sorting logic would go here

    result = await db.execute(query)
    return result.scalars().all()

@router.post("/apply")
async def apply_to_be_vendor(
    vendor_in: VendorApply,
    user: dict = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    # Check if user already has a vendor profile
    existing = await db.execute(select(Vendor).where(Vendor.owner_user_id == user["sub"]))
    if existing.scalars().first():
        raise HTTPException(status_code=400, detail="User already has a vendor profile or application")

    new_vendor = Vendor(
        owner_user_id=user["sub"],
        business_name=vendor_in.business_name,
        category=vendor_in.category,
        address_text=vendor_in.address_text,
        verification_doc_url=vendor_in.verification_doc_url,
        verification_status=VerificationStatus.PENDING
    )

    db.add(new_vendor)
    await db.commit()
    await db.refresh(new_vendor)
    return new_vendor

@router.get("/{vendor_id}")
async def get_vendor_detail(vendor_id: str, db: AsyncSession = Depends(get_db)):
    vendor = await db.get(Vendor, vendor_id)
    if not vendor:
        raise HTTPException(status_code=404, detail="Vendor not found")

    # Also get items
    result = await db.execute(select(Item).where(and_(Item.vendor_id == vendor_id, Item.is_active == True)))
    items = result.scalars().all()

    return {"vendor": vendor, "items": items}

@router.post("/seed", dependencies=[Depends(get_current_user)])
async def seed_vendors(db: AsyncSession = Depends(get_db)):
    # Simple seeding for verification/local dev
    vendor = Vendor(
        owner_user_id=uuid.uuid4(),
        business_name="Auntie Mary's Chop Bar",
        category=VendorCategory.FOOD,
        address_text="Ho Bankoe",
        verification_status=VerificationStatus.APPROVED,
        avg_rating=4.8
    )
    db.add(vendor)
    await db.commit()
    await db.refresh(vendor)

    item = Item(
        vendor_id=vendor.id,
        name="Banku with Tilapia",
        price_pesewas=4500,
        description="Freshly grilled",
        is_active=True,
        stock_quantity=10
    )
    db.add(item)
    await db.commit()
    return {"status": "seeded", "vendor_id": str(vendor.id)}
