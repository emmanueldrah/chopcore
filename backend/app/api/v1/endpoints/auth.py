from fastapi import APIRouter, HTTPException, Request
from app.core.rate_limit import otp_rate_limiter
from pydantic import BaseModel

router = APIRouter()

class OtpRequest(BaseModel):
    phone_number: str

@router.post("/otp/request")
async def request_otp(payload: OtpRequest, request: Request):
    # In a real app, this would trigger Supabase Auth or our custom SMS provider
    # Here we demonstrate the rate limiting logic
    allowed, message = otp_rate_limiter.is_allowed(payload.phone_number)
    if not allowed:
        raise HTTPException(status_code=429, detail=message)

    return {"message": "OTP requested"}

@router.post("/otp/verify")
async def verify_otp():
    return {"message": "OTP verified"}
