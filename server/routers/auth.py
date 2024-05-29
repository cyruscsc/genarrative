import deps.cookies, deps.session, models.user, supa.auth, supa.users
from fastapi import APIRouter, Depends, HTTPException, Request, Response


router = APIRouter()


@router.post("/sign-up", response_model=models.user.UserRes)
async def sign_up(user: models.user.UserAuth, response: Response):
    try:
        supa_session = supa.auth.sign_up(user.email, user.password)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    deps.cookies.set_jwt_tokens(
        response,
        supa_session.access_token,
        supa_session.refresh_token,
    )
    try:
        supa_user = supa.users.get_profile(supa_session.id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    return models.user.UserRes(email=supa_session.email, **supa_user)


@router.post("/sign-in", response_model=models.user.UserRes)
async def sign_in(user: models.user.UserAuth, response: Response):
    try:
        supa_session = supa.auth.sign_in(user.email, user.password)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    deps.cookies.set_jwt_tokens(
        response,
        supa_session.access_token,
        supa_session.refresh_token,
    )
    try:
        supa_user = supa.users.get_profile(supa_session.id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    return models.user.UserRes(email=supa_session.email, **supa_user)


@router.get("/sign-out")
async def sign_out(
    request: Request,
    response: Response,
    supa_session: models.user.UserSession | None = Depends(
        deps.session.get_supa_session
    ),
):
    if not supa_session:
        raise HTTPException(status_code=401, detail="Unauthorized")
    supa.auth.sign_out(supa_session.access_token)
    deps.cookies.delete_jwt_tokens(response)
    return {"message": "Signed out"}
