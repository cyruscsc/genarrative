from deps import session
from fastapi import APIRouter, Depends, HTTPException
from models.user import UserReq, UserRes, UserSession
from supa import users
from uuid import UUID

router = APIRouter()


@router.get("/{id}", response_model=UserRes)
def get_profile(
    id: UUID,
    supa_session: UserSession | None = Depends(session.get_supa_session),
) -> UserRes:
    if not supa_session:
        raise HTTPException(status_code=401, detail="Unauthorized")
    if supa_session.id != id:
        raise HTTPException(status_code=403, detail="Forbidden")
    try:
        supa_user = users.get_profile(id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    return UserRes(email=supa_session.email, **supa_user.model_dump())


@router.put("/{id}", response_model=UserRes)
def set_profile(
    id: UUID,
    profile: UserReq,
    supa_session: UserSession | None = Depends(session.get_supa_session),
) -> UserRes:
    if not supa_session:
        raise HTTPException(status_code=401, detail="Unauthorized")
    if supa_session.id != id:
        raise HTTPException(status_code=403, detail="Forbidden")
    try:
        supa_tier = users.get_user_tier(id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    if profile.temperature < 0.5 or profile.temperature > 1.0:
        raise HTTPException(
            status_code=400, detail="Temperature must be between 0.5 and 1.0"
        )
    if profile.max_words < 1 or profile.max_words > supa_tier.word_limit:
        raise HTTPException(
            status_code=400,
            detail=f"Max words must be between 1 and {supa_tier.word_limit}",
        )
    try:
        supa_user = users.set_profile(id, profile)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    return UserRes(email=supa_session.email, **supa_user.model_dump())
