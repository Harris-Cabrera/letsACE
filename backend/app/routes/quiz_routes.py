from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database import get_db
from app import models, schemas
from app.auth import get_current_user

router = APIRouter(prefix="/quiz", tags=["Quiz"])


@router.post("/submit", response_model=schemas.QuizResult)
def submit_quiz(
    submission: schemas.QuizSubmission,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    score = 0
    total = len(submission.answers)
    answer_results = []

    for answer in submission.answers:
        question = (
            db.query(models.Question)
            .filter(models.Question.id == answer.question_id)
            .first()
        )

        is_correct = False

        if (
            question
            and answer.selected_answer.upper() == question.correct_answer.upper()
        ):
            is_correct = True
            score += 1

        answer_results.append(
            {
                "question_id": answer.question_id,
                "selected_answer": answer.selected_answer.upper(),
                "is_correct": is_correct,
            }
        )

    new_attempt = models.QuizAttempt(
        user_id=current_user.id, score=score, total_questions=total
    )

    db.add(new_attempt)
    db.commit()
    db.refresh(new_attempt)

    for result in answer_results:
        new_answer = models.UserAnswer(
            attempt_id=new_attempt.id,
            question_id=result["question_id"],
            selected_answer=result["selected_answer"],
            is_correct=result["is_correct"],
        )
        db.add(new_answer)

    db.commit()

    percentage = (score / total * 100) if total > 0 else 0

    return {
        "attempt_id": new_attempt.id,
        "score": score,
        "total": total,
        "percentage": percentage,
    }


# @router.post("/create")
# def create_quiz(
#     quiz: schemas.QuizCreate,
#     db: Session = Depends(get_db),
#     current_user: models.User = Depends(get_current_user),
# ):

#     questions = (
#         db.query(models.Question)
#         .filter(models.Question.domain.in_(quiz.domains))
#         .order_by(func.random())
#         .limit(quiz.limit)
#         .all()
#     )


@router.post("/create")
def create_quiz(
    quiz: schemas.QuizCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    print("Requested domains:", quiz.domains)
    print("Requested limit:", quiz.limit)

    questions = (
        db.query(models.Question)
        .filter(models.Question.domain.in_(quiz.domains))
        .order_by(func.random())
        .limit(quiz.limit)
        .all()
    )

    print("Questions returned:", len(questions))
    print("Domains returned:", [q.domain for q in questions])

    return questions
