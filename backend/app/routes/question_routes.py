from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from sqlalchemy.sql.expression import func


from app.dependencies import require_admin

import csv
import io

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


@router.put("/{question_id}")
def update_question(
    question_id: int,
    updated_question: schemas.QuestionCreate,
    db: Session = Depends(get_db),
    admin=Depends(require_admin),
):
    question = (
        db.query(models.Question).filter(models.Question.id == question_id).first()
    )

    if not question:
        raise HTTPException(status_code=404, detail="Question not found")

    question.domain = updated_question.domain
    question.question_text = updated_question.question_text
    question.option_a = updated_question.option_a
    question.option_b = updated_question.option_b
    question.option_c = updated_question.option_c
    question.option_d = updated_question.option_d
    question.correct_answer = updated_question.correct_answer
    question.explanation = updated_question.explanation

    db.commit()
    db.refresh(question)

    return question


@router.post("/import")
def import_questions(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    admin=Depends(require_admin),
):
    if not file.filename.endswith(".csv"):
        raise HTTPException(status_code=400, detail="Only CSV files are supported")

    contents = file.file.read().decode("utf-8")

    reader = csv.DictReader(io.StringIO(contents))

    imported = 0
    skipped = 0
    for row in reader:
        existing_question = (
            db.query(models.Question)
            .filter(models.Question.question_text == row["question_text"])
            .first()
        )

        if existing_question:
            skipped += 1
            continue

        question = models.Question(
            domain=row["domain"],
            question_text=row["question_text"],
            option_a=row["option_a"],
            option_b=row["option_b"],
            option_c=row["option_c"],
            option_d=row["option_d"],
            correct_answer=row["correct_answer"],
            explanation=row["explanation"],
        )

        db.add(question)
        imported += 1

    db.commit()

    return {
        "message": "Questions imported successfully",
        "imported": imported,
        "skipped": skipped,
    }


@router.delete("/{question_id}")
def delete_question(
    question_id: int,
    db: Session = Depends(get_db),
    admin=Depends(require_admin),
):
    question = (
        db.query(models.Question).filter(models.Question.id == question_id).first()
    )

    if not question:
        raise HTTPException(status_code=404, detail="Question not found")

    db.delete(question)
    db.commit()

    return {"message": "Question deleted"}
