from models.label import LabelBase, LabelDetail
from supa import supa
from uuid import UUID


def get_labels_by_user(user_id: UUID) -> list[LabelDetail]:
    supa_labels = (
        supa.from_("labels")
        .select("*")
        .eq("user_id", str(user_id))
        .eq("status", "active")
        .execute()
        .data
    )
    return [LabelDetail(**label) for label in supa_labels]


def set_label(id: UUID, label: LabelBase) -> LabelDetail:
    supa_label = (
        supa.from_("labels")
        .update(label.model_dump())
        .eq("id", str(id))
        .execute()
        .data[0]
    )
    return LabelDetail(**supa_label)


def add_label_by_user(label: LabelBase, user_id: UUID) -> LabelDetail:
    new_label = {**label.model_dump(), "user_id": str(user_id)}
    supa_label = supa.from_("labels").insert(new_label).execute().data[0]
    return LabelDetail(**supa_label)


def delete_label(id: UUID) -> LabelDetail:
    supa_label = (
        supa.from_("labels")
        .update({"status": "inactive"})
        .eq("id", str(id))
        .execute()
        .data[0]
    )
    return LabelDetail(**supa_label)
