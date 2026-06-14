from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app import models, schemas

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])


@router.get("/stats", response_model=schemas.DashboardStats)
def get_dashboard_stats(db: Session = Depends(get_db)):
    total_attempts = db.query(models.QuizAttempt).count()
    questions_answered = db.query(models.UserAnswer).count()
    correct_answers = (
        db.query(models.UserAnswer).filter(models.UserAnswer.is_correct == True).count()
    )

    accuracy = (
        correct_answers / questions_answered * 100 if questions_answered > 0 else 0
    )

    return {
        "total_attempts": total_attempts,
        "questions_answered": questions_answered,
        "correct_answers": correct_answers,
        "accuracy": accuracy,
    }
