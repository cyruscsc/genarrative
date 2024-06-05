from models.common import TableProps
from pydantic import BaseModel


class TierBase(BaseModel):
    id: int
    name: str
    word_limit: int
    token_limit: int
    prompt_limit: int


class TierFromDB(TierBase, TableProps):
    price: float
