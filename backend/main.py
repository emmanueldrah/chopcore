from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from backend.routers.setup import router as setup_router
from backend.routers.auth import router as auth_router
from backend.routers.menu import router as menu_router
from backend.routers.inventory import router as inventory_router
from backend.routers.tables import router as tables_router
from backend.routers.orders import router as orders_router
from backend.routers.kitchen import router as kitchen_router
from backend.routers.billing import router as billing_router
from backend.routers.reservations import router as reservations_router
from backend.routers.events import router as events_router
from backend.routers.staff import router as staff_router
from backend.routers.delivery import router as delivery_router
from backend.routers.loyalty import router as loyalty_router
from backend.routers.reports import router as reports_router
from backend.routers.print import router as print_router

from backend.middleware.mode_guard import ModeGuardMiddleware

app = FastAPI(title="ChopCore API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(ModeGuardMiddleware)

app.include_router(setup_router)
app.include_router(auth_router)
app.include_router(menu_router)
app.include_router(inventory_router)
app.include_router(tables_router)
app.include_router(orders_router)
app.include_router(kitchen_router)
app.include_router(billing_router)
app.include_router(reservations_router)
app.include_router(events_router)
app.include_router(staff_router)
app.include_router(delivery_router)
app.include_router(loyalty_router)
app.include_router(reports_router)
app.include_router(print_router)

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.get("/api/v1/health")
def api_health_check():
    return {"status": "ok"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8768, reload=True)
