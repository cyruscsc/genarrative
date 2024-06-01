from fastapi import FastAPI
from routers import auth

app = FastAPI(root_path="/api/v1")

app.include_router(auth.router, prefix="/auth", tags=["auth"])


@app.get("/")
def read_root():
    return {"Hello": "World"}
