from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.auth import get_current_user
from app import models, schemas

router = APIRouter(prefix="/history", tags=["History"])


@router.get("/")
def get_history(
    db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)
):
    attempts = (
        db.query(models.QuizAttempt)
        .filter(models.QuizAttempt.user_id == current_user.id)
        .order_by(models.QuizAttempt.created_at.desc())
        .all()
    )

    return attempts


@router.get("/{attempt_id}", response_model=schemas.QuizAttemptReview)
def get_attempt_review(
    attempt_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    attempt = (
        db.query(models.QuizAttempt)
        .filter(
            models.QuizAttempt.id == attempt_id,
            models.QuizAttempt.user_id == current_user.id,
        )
        .first()
    )

    if not attempt:
        raise HTTPException(status_code=404, detail="Quiz attempt not found")

    answers = (
        db.query(models.UserAnswer, models.Question)
        .join(models.Question, models.UserAnswer.question_id == models.Question.id)
        .filter(models.UserAnswer.attempt_id == attempt.id)
        .all()
    )

    review_answers = []

    for user_answer, question in answers:
        review_answers.append(
            {
                "question_id": question.id,
                "domain": question.domain,
                "question_text": question.question_text,
                "option_a": question.option_a,
                "option_b": question.option_b,
                "option_c": question.option_c,
                "option_d": question.option_d,
                "selected_answer": user_answer.selected_answer,
                "correct_answer": question.correct_answer,
                "is_correct": user_answer.is_correct,
                "explanation": question.explanation,
            }
        )

    return {
        "attempt_id": attempt.id,
        "score": attempt.score,
        "total": attempt.total_questions,
        "percentage": round((attempt.score / attempt.total_questions) * 100, 1),
        "created_at": attempt.created_at,
        "answers": review_answers,
    }
