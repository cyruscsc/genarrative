from deps import cookies, session
from fastapi import APIRouter, Depends, HTTPException, Response
from models.user import UserAuth, UserRes, UserSession
from supa import auth, users

router = APIRouter()


@router.post("/sign-up", response_model=UserRes)
async def sign_up(credentials: UserAuth, response: Response) -> UserRes:
    try:
        supa_session = auth.sign_up(credentials.email, credentials.password)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    cookies.set_jwt_tokens(
        response,
        supa_session.access_token,
        supa_session.refresh_token,
    )
    try:
        supa_user = users.get_profile(supa_session.id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    return UserRes(email=supa_session.email, **supa_user.model_dump())


@router.post("/sign-in", response_model=UserRes)
async def sign_in(credentials: UserAuth, response: Response) -> UserRes:
    try:
        supa_session = auth.sign_in(credentials.email, credentials.password)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    cookies.set_jwt_tokens(
        response,
        supa_session.access_token,
        supa_session.refresh_token,
    )
    try:
        supa_user = users.get_profile(supa_session.id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    return UserRes(email=supa_session.email, **supa_user.model_dump())


@router.get("/sign-out")
async def sign_out(
    response: Response,
    supa_session: UserSession | None = Depends(session.get_supa_session),
) -> None:
    if not supa_session:
        raise HTTPException(status_code=401, detail="Unauthorized")
    auth.sign_out(supa_session.access_token)
    cookies.delete_jwt_tokens(response)
    return
