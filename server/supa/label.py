from models.label import LabelBase, LabelFromDB, LabelToDB
from supa import supa
from uuid import UUID


def get_label_by_id(id: UUID) -> LabelFromDB:
    supa_label = (
        supa.from_("labels")
        .select("*")
        .eq("id", str(id))
        .eq("status", "active")
        .execute()
        .data[0]
    )
    return LabelFromDB(**supa_label)


def get_labels_by_user(user_id: UUID) -> list[LabelFromDB]:
    supa_labels = (
        supa.from_("labels")
        .select("*")
        .eq("user_id", str(user_id))
        .eq("status", "active")
        .execute()
        .data
    )
    return [LabelFromDB(**label) for label in supa_labels]


def set_label(id: UUID, label: LabelBase) -> LabelFromDB:
    supa_label = (
        supa.from_("labels")
        .update(label.model_dump())
        .eq("id", str(id))
        .execute()
        .data[0]
    )
    return LabelFromDB(**supa_label)


def add_label(label: LabelToDB) -> LabelFromDB:
    supa_label = supa.from_("labels").insert(label.model_dump()).execute().data[0]
    return LabelFromDB(**supa_label)


def delete_label(id: UUID) -> LabelFromDB:
    supa_label = (
        supa.from_("labels")
        .update({"status": "inactive"})
        .eq("id", str(id))
        .execute()
        .data[0]
    )
    return LabelFromDB(**supa_label)
