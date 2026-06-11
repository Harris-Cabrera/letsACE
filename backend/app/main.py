from fastapi import FastAPI

from app.database import engine
from app import models
from app.routes import auth_routes, question_routes

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="letsACE API")

app.include_router(auth_routes.router)
app.include_router(question_routes.router)


@app.get("/")
def root():
    return {"message": "letsACE API is running"}
