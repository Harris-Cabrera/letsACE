from app.database import SessionLocal
from app.models import Question


sample_questions = [
    {
        "domain": "General Security Concepts",
        "question_text": "Which security concept ensures that data has not been altered without authorization?",
        "option_a": "Confidentiality",
        "option_b": "Integrity",
        "option_c": "Availability",
        "option_d": "Non-repudiation",
        "correct_answer": "B",
        "explanation": "Integrity ensures data remains accurate and unchanged unless modified by authorized users."
    },
    {
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "question_text": "Which type of attack tricks a user into revealing sensitive information?",
        "option_a": "Phishing",
        "option_b": "DDoS",
        "option_c": "Brute force",
        "option_d": "SQL injection",
        "correct_answer": "A",
        "explanation": "Phishing uses deception to trick users into revealing credentials or sensitive data."
    },
    {
        "domain": "Security Architecture",
        "question_text": "What does MFA require?",
        "option_a": "Two passwords",
        "option_b": "Multiple usernames",
        "option_c": "Two or more authentication factors",
        "option_d": "A firewall and antivirus",
        "correct_answer": "C",
        "explanation": "MFA requires two or more authentication factors, such as something you know, have, or are."
    }
]


def seed_questions():
    db = SessionLocal()

    for q in sample_questions:
        existing = db.query(Question).filter(
            Question.question_text == q["question_text"]
        ).first()

        if not existing:
            db.add(Question(**q))

    db.commit()
    db.close()

    print("Sample questions inserted successfully.")


if __name__ == "__main__":
    seed_questions()