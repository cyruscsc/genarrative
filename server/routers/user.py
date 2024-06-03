from deps import session
from fastapi import APIRouter, Depends, HTTPException
from models.user import UserReq, UserRes, UserSession
from supa import user

router = APIRouter()


@router.get("", response_model=UserRes)
async def retrieve_profile(
    supa_session: UserSession = Depends(session.verify_session),
) -> UserRes:
    try:
        supa_user = user.get_profile(supa_session.id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    return UserRes(email=supa_session.email, **supa_user.model_dump())


@router.put("", response_model=UserRes)
async def update_profile(
    profile: UserReq,
    supa_session: UserSession = Depends(session.verify_session),
) -> UserRes:
    try:
        supa_tier = user.get_user_tier(supa_session.id)
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
        supa_user = user.set_profile(supa_session.id, profile)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    return UserRes(email=supa_session.email, **supa_user.model_dump())
