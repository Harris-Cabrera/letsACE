from fastapi.testclient import TestClient

from main import app

client = TestClient(app)


def test_register_user():
    response = client.post(
        "/auth/register",
        json={"email": "pytest_user@example.com", "password": "password123"},
    )

    assert response.status_code in [200, 201, 400]


def test_login_user():
    client.post(
        "/auth/register",
        json={"email": "pytest_login@example.com", "password": "password123"},
    )

    response = client.post(
        "/auth/login",
        data={"username": "pytest_login@example.com", "password": "password123"},
    )

    assert response.status_code == 200
    assert "access_token" in response.json()
    assert response.json()["token_type"] == "bearer"


def test_login_invalid_password():
    client.post(
        "/auth/register",
        json={"email": "pytest_invalid@example.com", "password": "password123"},
    )

    response = client.post(
        "/auth/login",
        data={"username": "pytest_invalid@example.com", "password": "wrongpassword"},
    )

    assert response.status_code == 401
