from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy.sql.expression import func


from app.dependencies import require_admin

# from app.models import User
from app.database import get_db
from app import models, schemas

router = APIRouter(prefix="/questions", tags=["Questions"])


@router.get("/", response_model=list[schemas.QuestionResponse])
def get_questions(db: Session = Depends(get_db)):
    return db.query(models.Question).all()


@router.get("/random", response_model=list[schemas.QuestionResponse])
def get_random_questions(limit: int = 5, db: Session = Depends(get_db)):
    return db.query(models.Question).order_by(func.random()).limit(limit).all()


@router.post("/")
def create_question(
    question: schemas.QuestionCreate,
    db: Session = Depends(get_db),
    admin=Depends(require_admin),
):
    new_question = models.Question(
        domain=question.domain,
        question_text=question.question_text,
        option_a=question.option_a,
        option_b=question.option_b,
        option_c=question.option_c,
        option_d=question.option_d,
        correct_answer=question.correct_answer,
        explanation=question.explanation,
    )

    db.add(new_question)
    db.commit()
    db.refresh(new_question)

    return new_question
