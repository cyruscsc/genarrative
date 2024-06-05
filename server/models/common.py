from datetime import datetime
from enum import Enum


class Status(str, Enum):
    active = "active"
    inactive = "inactive"


class ColorMode(str, Enum):
    light = "light"
    dark = "dark"


class TableProps:
    status: Status
    created_at: datetime
    updated_at: datetime
