from fastapi import Request, HTTPException
from starlette.middleware.base import BaseHTTPMiddleware
from backend.database import SessionLocal
from backend.models.business import Business, BusinessMode

class ModeGuardMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        # Paths that are always allowed
        allowed_paths = ["/health", "/api/v1/health", "/api/v1/setup", "/api/v1/auth/login", "/docs", "/openapi.json"]

        if any(request.url.path.startswith(path) for path in allowed_paths):
            return await call_next(request)

        db = SessionLocal()
        business = db.query(Business).first()
        db.close()

        if not business:
            return await call_next(request)

        mode = business.mode
        path = request.url.path

        # Mode-specific restrictions
        if mode == BusinessMode.FAST_FOOD:
            forbidden_prefixes = ["/api/v1/tables", "/api/v1/reservations", "/api/v1/events"]
            if any(path.startswith(prefix) for prefix in forbidden_prefixes):
                raise HTTPException(status_code=403, detail=f"Feature not available in {mode.value} mode")

        elif mode == BusinessMode.CHOP_BAR:
            forbidden_prefixes = ["/api/v1/reservations", "/api/v1/events"]
            if any(path.startswith(prefix) for prefix in forbidden_prefixes):
                raise HTTPException(status_code=403, detail=f"Feature not available in {mode.value} mode")

        elif mode == BusinessMode.CATERING:
            forbidden_prefixes = ["/api/v1/tables", "/api/v1/delivery"]
            if any(path.startswith(prefix) for prefix in forbidden_prefixes):
                raise HTTPException(status_code=403, detail=f"Feature not available in {mode.value} mode")

        return await call_next(request)
