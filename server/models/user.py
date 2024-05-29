from datetime import datetime
from models.types import Status
from pydantic import BaseModel
from uuid import UUID


class UserBase(BaseModel):
    email: str
    display_name: str | None = None


class UserAuth(UserBase):
    password: str


class UserRes(UserBase):
    id: UUID
    status: Status
    created_at: datetime
    updated_at: datetime


class UserSession(BaseModel):
    id: UUID
    email: str
    access_token: str
    refresh_token: str
