from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def get_auth_header():
    client.post(
        "/auth/register",
        json={"email": "history_test@example.com", "password": "password123"},
    )

    response = client.post(
        "/auth/login",
        data={"username": "history_test@example.com", "password": "password123"},
    )

    token = response.json()["access_token"]

    return {"Authorization": f"Bearer {token}"}


def test_get_history():
    headers = get_auth_header()

    response = client.get("/history/", headers=headers)

    assert response.status_code == 200
    assert isinstance(response.json(), list)
