from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app import models, schemas
from collections import defaultdict

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


@router.get("/domain-performance", response_model=list[schemas.DomainPerformance])
def get_domain_performance(db: Session = Depends(get_db)):
    answers = db.query(models.UserAnswer).all()

    domain_stats = defaultdict(lambda: {"answered": 0, "correct": 0})

    for answer in answers:
        question = (
            db.query(models.Question)
            .filter(models.Question.id == answer.question_id)
            .first()
        )

        if not question:
            continue

        domain = question.domain

        domain_stats[domain]["answered"] += 1

        if answer.is_correct:
            domain_stats[domain]["correct"] += 1

    results = []

    for domain, stats in domain_stats.items():
        accuracy = (
            stats["correct"] / stats["answered"] * 100 if stats["answered"] > 0 else 0
        )

        results.append(
            {
                "domain": domain,
                "answered": stats["answered"],
                "correct": stats["correct"],
                "accuracy": accuracy,
            }
        )

    return results
