"""Integration tests for FastAPI application endpoints."""

import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_health_check_endpoint():
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"
    assert "version" in data
    assert "model" in data
    assert "Python" in data["python_engine"]


def test_root_endpoint():
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert "message" in data
    assert data["health"] == "/health"


def test_summarize_endpoint_success():
    sample_text = (
        "Computer networks are interconnected computing devices that can exchange data "
        "and share resources with each other. These network devices use a system of rules, "
        "called communications protocols, to transmit information over physical or wireless "
        "technologies. The architecture of a computer network defines its framework and "
        "governs data transmission protocols and device interactions."
    )
    payload = {"text": sample_text}
    response = client.post("/api/summarize", json=payload)
    assert response.status_code == 200
    data = response.json()

    assert "summary" in data
    assert len(data["summary"]) > 0
    assert "key_points" in data
    assert isinstance(data["key_points"], list)
    assert len(data["key_points"]) > 0

    assert data["original_word_count"] > 0
    assert data["summary_word_count"] > 0
    assert 0.0 <= data["reduction_percentage"] <= 100.0
    assert "model" in data


def test_summarize_endpoint_empty_text():
    # Empty string should fail validation
    payload = {"text": "   "}
    response = client.post("/api/summarize", json=payload)
    assert response.status_code in [400, 422]


def test_summarize_endpoint_too_short():
    payload = {"text": "Too short"}
    response = client.post("/api/summarize", json=payload)
    assert response.status_code in [400, 422]
