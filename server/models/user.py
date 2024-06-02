from datetime import datetime
from models.types import ColorMode, Status
from pydantic import BaseModel
from uuid import UUID


class UserBase(BaseModel):
    email: str


class UserAuth(UserBase):
    password: str


class UserReq(BaseModel):
    display_name: str | None = None
    color_mode: ColorMode
    temperature: float
    max_words: int


class UserProfile(UserReq):
    id: UUID
    tier: str
    status: Status
    created_at: datetime
    updated_at: datetime


class UserRes(UserBase, UserProfile):
    pass


class UserSession(BaseModel):
    id: UUID
    email: str
    access_token: str
    refresh_token: str
