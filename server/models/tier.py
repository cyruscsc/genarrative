from datetime import datetime
from models.types import Status
from pydantic import BaseModel


class TierBase(BaseModel):
    id: int
    name: str
    word_limit: int
    token_limit: int
    prompt_limit: int


class TierDetail(TierBase):
    price: float
    status: Status
    created_at: datetime
    updated_at: datetime
