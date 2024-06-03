from deps import session
from fastapi import APIRouter, Depends, HTTPException
from models.label import LabelBase, LabelDetail
from models.user import UserSession
from supa import label
from uuid import UUID

router = APIRouter()


@router.get("", response_model=list[LabelDetail])
async def retrieve_labels_by_user(
    supa_session: UserSession = Depends(session.verify_session),
) -> list[LabelDetail]:
    try:
        supa_labels = label.get_labels_by_user(supa_session.id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    return [label.model_dump() for label in supa_labels]


@router.post("", response_model=LabelDetail)
async def create_label(
    new_label: LabelBase,
    supa_session: UserSession = Depends(session.verify_session),
) -> LabelDetail:
    try:
        supa_label = label.add_label_by_user(new_label, supa_session.id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    return supa_label


@router.put("/{id}", response_model=LabelDetail)
async def update_label(
    id: UUID,
    updated_label: LabelBase,
    supa_session: UserSession = Depends(session.verify_session),
) -> LabelDetail:
    try:
        supa_label = label.set_label(id, updated_label)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    return supa_label


@router.delete("/{id}", response_model=LabelDetail)
async def delete_label(
    id: UUID,
    supa_session: UserSession = Depends(session.verify_session),
) -> LabelDetail:
    try:
        supa_label = label.delete_label(id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    return supa_label
