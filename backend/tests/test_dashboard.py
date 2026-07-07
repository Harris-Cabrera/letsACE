from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def get_auth_header():

    client.post(
        "/auth/register",
        json={
            "email": "dashboard_test@example.com",
            "password": "password123"
        }
    )


    response = client.post(
        "/auth/login",
        data={
            "username": "dashboard_test@example.com",
            "password": "password123"
        }
    )


    token = response.json()["access_token"]


    return {
        "Authorization": f"Bearer {token}"
    }



def test_dashboard_stats():

    headers = get_auth_header()


    response = client.get(
        "/dashboard/stats",
        headers=headers
    )


    assert response.status_code == 200


    data = response.json()


    assert "total_attempts" in data
    assert "questions_answered" in data
    assert "correct_answers" in data
    assert "accuracy" in data



def test_domain_performance():

    headers = get_auth_header()


    response = client.get(
        "/dashboard/domain-performance",
        headers=headers
    )


    assert response.status_code == 200

    assert isinstance(
        response.json(),
        list
    )