from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import engine
from app import models
from app.routes import (
    auth_routes,
    question_routes,
    quiz_routes,
    dashboard_routes,
    history_routes,
)

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="letsACE API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://lets-ace.vercel.app",
        "https://letsace.app",
        "https://www.letsace.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# router reguistration
app.include_router(auth_routes.router)
app.include_router(question_routes.router)
app.include_router(quiz_routes.router)
app.include_router(dashboard_routes.router)
app.include_router(history_routes.router)


@app.get("/")
def root():
    return {"message": "letsACE API is running"}
