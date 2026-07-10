from fastapi import APIRouter, Depends, HTTPException, Body
from app.middleware.auth import check_role
from app.db.session import get_db
from app.models.models import Vendor, VerificationStatus, OtcCategory
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List
from pydantic import BaseModel

router = APIRouter()

class VendorAction(BaseModel):
    reason: str = None

@router.get("/pending", dependencies=[Depends(check_role(["admin"]))])
async def list_pending_vendors(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Vendor).where(Vendor.verification_status == VerificationStatus.PENDING))
    return result.scalars().all()

@router.post("/{vendor_id}/approve", dependencies=[Depends(check_role(["admin"]))])
async def approve_vendor(vendor_id: str, db: AsyncSession = Depends(get_db)):
    vendor = await db.get(Vendor, vendor_id)
    if not vendor:
        raise HTTPException(status_code=404, detail="Vendor not found")

    vendor.verification_status = VerificationStatus.APPROVED
    await db.commit()
    return {"status": "approved"}

@router.post("/{vendor_id}/reject", dependencies=[Depends(check_role(["admin"]))])
async def reject_vendor(vendor_id: str, action: VendorAction, db: AsyncSession = Depends(get_db)):
    vendor = await db.get(Vendor, vendor_id)
    if not vendor:
        raise HTTPException(status_code=404, detail="Vendor not found")

    vendor.verification_status = VerificationStatus.REJECTED
    vendor.rejection_reason = action.reason
    await db.commit()
    return {"status": "rejected"}

@router.get("/otc-categories")
async def get_otc_categories(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(OtcCategory))
    return result.scalars().all()
