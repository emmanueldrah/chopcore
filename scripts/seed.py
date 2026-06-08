from backend.database import SessionLocal, engine, Base
from backend.models.user import User, UserRole
from backend.models.business import Business, BusinessMode
from backend.models.category import Category
from backend.models.menu_item import MenuItem
from backend.models.ingredient import Ingredient, Recipe
from backend.models.stock import Stock
from passlib.context import CryptContext
import uuid

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def seed_data():
    db = SessionLocal()

    # Check if data already exists
    if db.query(User).first():
        print("Data already seeded.")
        return

    print("Seeding initial data...")

    # Base category
    main_course = Category(name="Main Course", order=1)
    drinks = Category(name="Drinks", order=2)
    db.add_all([main_course, drinks])
    db.flush()

    # Ingredients
    rice = Ingredient(name="Rice", unit="kg", reorder_level=10)
    chicken = Ingredient(name="Chicken", unit="pieces", reorder_level=20)
    db.add_all([rice, chicken])
    db.flush()

    # Menu Items
    jollof = MenuItem(
        category_id=main_course.id,
        name="Jollof Rice with Chicken",
        price=4500, # ₵ 45.00
        cost_price=2000,
        description="Authentic Ghana Jollof"
    )
    coke = MenuItem(
        category_id=drinks.id,
        name="Coca Cola",
        price=1000, # ₵ 10.00
        cost_price=500
    )
    db.add_all([jollof, coke])
    db.flush()

    # Recipes
    db.add(Recipe(menu_item_id=jollof.id, ingredient_id=rice.id, quantity=500)) # 500g
    db.add(Recipe(menu_item_id=jollof.id, ingredient_id=chicken.id, quantity=1))

    # Initial Stock
    db.add(Stock(ingredient_id=rice.id, quantity=100000)) # 100kg
    db.add(Stock(ingredient_id=chicken.id, quantity=100))

    db.commit()
    db.close()
    print("Seeding complete.")

if __name__ == "__main__":
    seed_data()
