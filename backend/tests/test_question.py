from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_get_questions():
    response = client.get("/questions/")

    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_get_random_questions():
    response = client.get("/questions/random?limit=5")

    assert response.status_code == 200
    assert isinstance(response.json(), list)
    assert len(response.json()) <= 5
