from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.models.table import Table, TableStatus
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter(prefix="/api/v1/tables", tags=["tables"])

class TableBase(BaseModel):
    number: str
    capacity: int = 2
    section: str = "Main"
    shape: str = "square"
    x: float = 0.0
    y: float = 0.0
    width: float = 100.0
    height: float = 100.0

class TableCreate(TableBase):
    pass

@router.get("/")
def get_tables(db: Session = Depends(get_db)):
    return db.query(Table).all()

@router.post("/")
def create_table(data: TableCreate, db: Session = Depends(get_db)):
    table = Table(**data.dict())
    db.add(table)
    db.commit()
    db.refresh(table)
    return table

@router.patch("/{table_id}/position")
def update_table_position(table_id: str, x: float, y: float, db: Session = Depends(get_db)):
    table = db.query(Table).filter(Table.id == table_id).first()
    if not table:
        raise HTTPException(status_code=404, detail="Table not found")
    table.x = x
    table.y = y
    db.commit()
    return table
