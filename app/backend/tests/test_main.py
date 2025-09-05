from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_healthz():
    r = client.get("/healthz")
    assert r.status_code == 200
    assert r.json()["status"] == "ok"

def test_readyz():
    r = client.get("/readyz")
    assert r.status_code == 200
    assert r.json()["status"] == "ready"

def test_api_hello():
    r = client.get("/api/hello")
    assert r.status_code == 200
    assert r.json()["message"] == "Hello from FastAPI"
