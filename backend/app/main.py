from fastapi import FastAPI

app = FastAPI(title="letsACE API")

@app.get("/")
def root():
    return {"message": "letsACE API is running"}