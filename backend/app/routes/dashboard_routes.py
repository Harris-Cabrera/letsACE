from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from collections import defaultdict

from app.database import get_db
from app.auth import get_current_user
from app import models, schemas

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])


@router.get("/stats", response_model=schemas.DashboardStats)
def get_dashboard_stats(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    attempts = (
        db.query(models.QuizAttempt)
        .filter(models.QuizAttempt.user_id == current_user.id)
        .all()
    )

    total_attempts = len(attempts)
    questions_answered = sum(attempt.total_questions for attempt in attempts)
    correct_answers = sum(attempt.score for attempt in attempts)

    accuracy = (
        correct_answers / questions_answered * 100 if questions_answered > 0 else 0
    )

    best_score = (
        max((attempt.score / attempt.total_questions) * 100 for attempt in attempts)
        if attempts
        else 0
    )

    return {
        "total_attempts": total_attempts,
        "questions_answered": questions_answered,
        "correct_answers": correct_answers,
        "accuracy": accuracy,
        "best_score": best_score,
    }


@router.get("/domain-performance", response_model=list[schemas.DomainPerformance])
def get_domain_performance(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    answers = (
        db.query(models.UserAnswer)
        .join(models.QuizAttempt, models.UserAnswer.attempt_id == models.QuizAttempt.id)
        .filter(models.QuizAttempt.user_id == current_user.id)
        .all()
    )

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
