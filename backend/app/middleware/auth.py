from fastapi import Request, HTTPException, Depends
from jose import jwt, JWTError
from app.core.config import settings

async def get_current_user(request: Request):
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid authorization header")

    token = auth_header.split(" ")[1]
    try:
        # For Supabase, the JWT is signed with the JWT_SECRET
        payload = jwt.decode(token, settings.JWT_SECRET, algorithms=["HS256"], audience="authenticated")
        return payload
    except JWTError as e:
        raise HTTPException(status_code=401, detail=f"Could not validate credentials: {str(e)}")

def check_role(required_roles: list[str]):
    async def role_checker(payload: dict = Depends(get_current_user)):
        # Supabase stores custom claims in app_metadata or user_metadata
        # We'll expect the role to be in the JWT claims
        user_role = payload.get("user_metadata", {}).get("role") or payload.get("app_metadata", {}).get("role")
        if user_role not in required_roles:
            raise HTTPException(status_code=403, detail="Not enough permissions")
        return payload
    return role_checker
