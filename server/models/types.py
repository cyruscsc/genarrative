from enum import Enum


class Status(str, Enum):
    active = "active"
    inactive = "inactive"


class ColorMode(str, Enum):
    light = "light"
    dark = "dark"
