from datetime import datetime
from models.types import Status
from pydantic import BaseModel
from uuid import UUID


class LabelBase(BaseModel):
    name: str
    note: str | None = None


class LabelDetail(LabelBase):
    id: UUID
    user_id: UUID
    status: Status
    created_at: datetime
    updated_at: datetime
