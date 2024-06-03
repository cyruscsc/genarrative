import deps.cookies, supa.auth
from fastapi import Request, HTTPException
from models.user import UserSession


def verify_session(request: Request) -> UserSession:
    tokens = deps.cookies.get_jwt_tokens(request)
    if not tokens["access_token"] or not tokens["refresh_token"]:
        raise HTTPException(status_code=401, detail="Unauthorized")
    supa_session = supa.auth.supa_session(
        tokens["access_token"], tokens["refresh_token"]
    )
    if not supa_session:
        raise HTTPException(status_code=401, detail="Unauthorized")
    return supa_session
