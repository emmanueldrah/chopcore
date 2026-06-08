from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.models.table import Table, TableStatus
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter(prefix="/api/v1/tables", tags=["tables"])

class TableUpdate(BaseModel):
    number: Optional[str] = None
    capacity: Optional[int] = None
    x: Optional[float] = None
    y: Optional[float] = None
    width: Optional[float] = None
    height: Optional[float] = None
    shape: Optional[str] = None

class TableCreate(BaseModel):
    number: str
    capacity: int = 2
    x: float = 100.0
    y: float = 100.0
    width: float = 120.0
    height: float = 120.0
    shape: str = "square"

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

@router.patch("/{table_id}")
def update_table(table_id: str, data: TableUpdate, db: Session = Depends(get_db)):
    table = db.query(Table).filter(Table.id == table_id).first()
    if not table:
        raise HTTPException(status_code=404, detail="Table not found")

    for key, value in data.dict(exclude_unset=True).items():
        setattr(table, key, value)

    db.commit()
    return table
