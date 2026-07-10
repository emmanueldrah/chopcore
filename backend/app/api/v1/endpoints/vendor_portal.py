from fastapi import APIRouter, Depends, HTTPException, Body
from app.middleware.auth import check_role, get_current_user
from app.db.session import get_db
from app.models.models import Vendor, Item, VendorCategory
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from pydantic import BaseModel, field_validator
from typing import Optional, List

router = APIRouter()

class ItemCreate(BaseModel):
    name: str
    description: Optional[str]
    price_pesewas: int
    stock_quantity: int
    otc_category_id: Optional[str] = None

@router.post("/items", dependencies=[Depends(check_role(["vendor_owner"]))])
async def create_item(
    item_in: ItemCreate,
    user: dict = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    # 1. Get vendor for this owner
    stmt = select(Vendor).where(Vendor.owner_user_id == user["sub"])
    result = await db.execute(stmt)
    vendor = result.scalars().first()

    if not vendor:
        raise HTTPException(status_code=404, detail="Vendor profile not found for user")

    # 2. Check OTC enforcement if category is pharmacy
    if vendor.category == VendorCategory.PHARMACY_OTC and not item_in.otc_category_id:
        raise HTTPException(status_code=400, detail="Pharmacy items must have an OTC category")

    # 3. Create item
    new_item = Item(
        vendor_id=vendor.id,
        name=item_in.name,
        description=item_in.description,
        price_pesewas=item_in.price_pesewas,
        stock_quantity=item_in.stock_quantity,
        otc_category_id=item_in.otc_category_id,
        is_active=True
    )

    db.add(new_item)
    await db.commit()
    await db.refresh(new_item)

    return new_item

@router.get("/my-storefront", dependencies=[Depends(check_role(["vendor_owner"]))])
async def get_my_storefront(user: dict = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    stmt = select(Vendor).where(Vendor.owner_user_id == user["sub"])
    result = await db.execute(stmt)
    vendor = result.scalars().first()

    if not vendor:
        raise HTTPException(status_code=404, detail="Vendor profile not found")

    items_stmt = select(Item).where(Item.vendor_id == vendor.id)
    items_result = await db.execute(items_stmt)
    items = items_result.scalars().all()

    return {"vendor": vendor, "items": items}
