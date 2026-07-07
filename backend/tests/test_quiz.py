from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def get_auth_header():

    client.post(
        "/auth/register",
        json={"email": "quiz_test@example.com", "password": "password123"},
    )

    response = client.post(
        "/auth/login",
        data={"username": "quiz_test@example.com", "password": "password123"},
    )

    token = response.json()["access_token"]

    return {"Authorization": f"Bearer {token}"}


def test_submit_quiz():

    headers = get_auth_header()

    question_response = client.get("/questions/random?limit=1")

    question = question_response.json()[0]

    response = client.post(
        "/quiz/submit",
        json={
            "answers": [
                {
                    "question_id": question["id"],
                    "selected_answer": question["correct_answer"],
                }
            ]
        },
        headers=headers,
    )

    assert response.status_code == 200

    data = response.json()

    assert data["score"] == 1
    assert data["total"] == 1
    assert data["percentage"] == 100
