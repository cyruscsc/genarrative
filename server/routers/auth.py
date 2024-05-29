from deps import cookies, session
from fastapi import APIRouter, Depends, HTTPException, Request, Response
from models import user
from supa import auth, users

router = APIRouter()


@router.post("/sign-up", response_model=user.UserRes)
async def sign_up(credentials: user.UserAuth, response: Response):
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
    return user.UserRes(email=supa_session.email, **supa_user.model_dump())


@router.post("/sign-in", response_model=user.UserRes)
async def sign_in(credentials: user.UserAuth, response: Response):
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
    return user.UserRes(email=supa_session.email, **supa_user.model_dump())


@router.get("/sign-out")
async def sign_out(
    request: Request,
    response: Response,
    supa_session: user.UserSession | None = Depends(session.get_supa_session),
):
    if not supa_session:
        raise HTTPException(status_code=401, detail="Unauthorized")
    auth.sign_out(supa_session.access_token)
    cookies.delete_jwt_tokens(response)
    return {"message": "Signed out"}
