import os
import sys
from backend.database import engine, Base
# Import all models to ensure they are registered
import backend.models.business
import backend.models.user
import backend.models.category
import backend.models.menu_item
import backend.models.modifier
import backend.models.table
import backend.models.order
import backend.models.order_item
import backend.models.kitchen_ticket
import backend.models.bill
import backend.models.payment
import backend.models.reservation
import backend.models.event
import backend.models.delivery
import backend.models.ingredient
import backend.models.stock
import backend.models.staff
import backend.models.customer
import backend.models.loyalty
import backend.models.audit
import backend.models.attendance
import backend.models.reconciliation
import backend.models.waitlist

def init_db():
    print("Initializing database...")
    Base.metadata.create_all(bind=engine)
    print("Database initialized.")

    from scripts.seed import seed_data
    seed_data()

if __name__ == "__main__":
    init_db()
