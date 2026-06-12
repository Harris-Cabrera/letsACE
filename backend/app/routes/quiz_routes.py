from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app import models, schemas

router = APIRouter(prefix="/quiz", tags=["Quiz"])


@router.post("/submit", response_model=schemas.QuizResult)
def submit_quiz(submission: schemas.QuizSubmission, db: Session = Depends(get_db)):
    score = 0
    total = len(submission.answers)

    for answer in submission.answers:
        question = (
            db.query(models.Question)
            .filter(models.Question.id == answer.question_id)
            .first()
        )

        if (
            question
            and answer.selected_answer.upper() == question.correct_answer.upper()
        ):
            score += 1

    percentage = (score / total * 100) if total > 0 else 0

    return {"score": score, "total": total, "percentage": percentage}
