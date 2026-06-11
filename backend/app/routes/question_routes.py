from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy.sql.expression import func

from app.database import get_db
from app import models, schemas

router = APIRouter(prefix="/questions", tags=["Questions"])


@router.get("/", response_model=list[schemas.QuestionResponse])
def get_questions(db: Session = Depends(get_db)):
    return db.query(models.Question).all()


@router.get("/random", response_model=list[schemas.QuestionResponse])
def get_random_questions(limit: int = 5, db: Session = Depends(get_db)):
    return db.query(models.Question).order_by(func.random()).limit(limit).all()
