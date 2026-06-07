from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.models.category import Category
from backend.models.menu_item import MenuItem
from backend.models.modifier import ModifierGroup, ModifierOption, MenuItemModifierGroup
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter(prefix="/api/v1/menu", tags=["menu"])

class CategoryBase(BaseModel):
    name: str
    order: Optional[int] = 0

class CategoryCreate(CategoryBase):
    pass

class MenuItemBase(BaseModel):
    category_id: str
    name: str
    description: Optional[str] = None
    price: int
    cost_price: Optional[int] = None
    image_url: Optional[str] = None
    is_available: bool = True
    prep_time: int = 15
    tags: List[str] = []

class MenuItemCreate(MenuItemBase):
    pass

@router.get("/categories")
def get_categories(db: Session = Depends(get_db)):
    return db.query(Category).order_by(Category.order).all()

@router.post("/categories")
def create_category(data: CategoryCreate, db: Session = Depends(get_db)):
    category = Category(**data.dict())
    db.add(category)
    db.commit()
    db.refresh(category)
    return category

@router.get("/items")
def get_menu_items(category_id: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(MenuItem)
    if category_id:
        query = query.filter(MenuItem.category_id == category_id)
    return query.all()

@router.post("/items")
def create_menu_item(data: MenuItemCreate, db: Session = Depends(get_db)):
    item = MenuItem(**data.dict())
    db.add(item)
    db.commit()
    db.refresh(item)
    return item
