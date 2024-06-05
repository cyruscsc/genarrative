from models.common import ColorMode, TableProps
from pydantic import BaseModel
from uuid import UUID


class UserBase(BaseModel):
    email: str


class UserAuth(UserBase):
    password: str


class ProfileToDB(BaseModel):
    display_name: str | None = None
    color_mode: ColorMode
    temperature: float
    max_words: int


class ProfileFromDB(ProfileToDB, TableProps):
    id: UUID
    tier: str


class UserOutput(UserBase, ProfileFromDB):
    pass


class UserSession(BaseModel):
    id: UUID
    email: str
    access_token: str
    refresh_token: str
