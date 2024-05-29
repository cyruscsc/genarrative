import deps.cookies, supa.auth
from fastapi import Request


def get_supa_session(request: Request):
    tokens = deps.cookies.get_jwt_tokens(request)
    if not tokens["access_token"] or not tokens["refresh_token"]:
        return None
    return supa.auth.supa_session(tokens["access_token"], tokens["refresh_token"])
