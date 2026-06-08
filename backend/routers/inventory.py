from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.models.ingredient import Ingredient, Recipe
from backend.models.stock import Stock, StockTransaction
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter(prefix="/api/v1/inventory", tags=["inventory"])

class IngredientCreate(BaseModel):
    name: str
    unit: str
    reorder_level: int = 0

class StockUpdate(BaseModel):
    ingredient_id: str
    quantity: int
    type: str # PURCHASE, ADJUSTMENT, WASTE
    reason: Optional[str] = None

@router.get("/ingredients")
def get_ingredients(db: Session = Depends(get_db)):
    return db.query(Ingredient).all()

@router.post("/ingredients")
def create_ingredient(data: IngredientCreate, db: Session = Depends(get_db)):
    ingredient = Ingredient(**data.dict())
    db.add(ingredient)
    db.commit()
    db.refresh(ingredient)
    return ingredient

class RecipeItem(BaseModel):
    ingredient_id: str
    quantity: int

class RecipeUpdate(BaseModel):
    items: List[RecipeItem]

@router.post("/recipes/{menu_item_id}")
def update_recipe(menu_item_id: str, data: RecipeUpdate, db: Session = Depends(get_db)):
    # Clear existing recipe
    db.query(Recipe).filter(Recipe.menu_item_id == menu_item_id).delete()

    for item in data.items:
        recipe = Recipe(
            menu_item_id=menu_item_id,
            ingredient_id=item.ingredient_id,
            quantity=item.quantity
        )
        db.add(recipe)

    db.commit()
    return {"success": True}

@router.post("/stock")
def update_stock(data: StockUpdate, db: Session = Depends(get_db)):
    stock = db.query(Stock).filter(Stock.ingredient_id == data.ingredient_id).first()
    if not stock:
        stock = Stock(ingredient_id=data.ingredient_id, quantity=0)
        db.add(stock)

    stock.quantity += data.quantity

    transaction = StockTransaction(
        ingredient_id=data.ingredient_id,
        quantity=data.quantity,
        type=data.type,
        reason=data.reason
    )
    db.add(transaction)

    db.commit()
    db.refresh(stock)
    return stock

def deduct_stock_for_order(order_id: str, db: Session):
    from backend.models.order_item import OrderItem
    order_items = db.query(OrderItem).filter(OrderItem.order_id == order_id).all()

    for item in order_items:
        recipes = db.query(Recipe).filter(Recipe.menu_item_id == item.menu_item_id).all()
        for recipe in recipes:
            total_deduction = recipe.quantity * item.quantity
            stock = db.query(Stock).filter(Stock.ingredient_id == recipe.ingredient_id).first()
            if stock:
                stock.quantity -= total_deduction
                transaction = StockTransaction(
                    ingredient_id=recipe.ingredient_id,
                    quantity=-total_deduction,
                    type="SALE",
                    reason=f"Order {order_id}"
                )
                db.add(transaction)
    db.commit()
