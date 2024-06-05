from models.common import TableProps
from pydantic import BaseModel
from uuid import UUID


class LabelBase(BaseModel):
    name: str
    note: str | None = None


class LabelInput(LabelBase):
    pass


class LabelToDB(LabelBase):
    user_id: UUID


class LabelFromDB(LabelBase, TableProps):
    id: UUID
