from fastapi import FastAPI
from routers import auth, label, user

app = FastAPI(root_path="/api/v1")

app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(label.router, prefix="/label", tags=["label"])
app.include_router(user.router, prefix="/user", tags=["user"])


@app.get("/")
def read_root():
    return {"Hello": "World"}
