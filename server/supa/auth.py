from models.user import UserSession
from supa import supa


def sign_up(email: str, password: str) -> UserSession:
    supa_session = supa.auth.sign_up(
        {
            "email": email,
            "password": password,
        }
    )
    return UserSession(
        id=supa_session.user.id,
        email=supa_session.user.email,
        access_token=supa_session.session.access_token,
        refresh_token=supa_session.session.refresh_token,
    )


def sign_in(email: str, password: str) -> UserSession:
    supa_session = supa.auth.sign_in_with_password(
        {
            "email": email,
            "password": password,
        }
    )
    return UserSession(
        id=supa_session.user.id,
        email=supa_session.user.email,
        access_token=supa_session.session.access_token,
        refresh_token=supa_session.session.refresh_token,
    )


def sign_out(access_token: str) -> None:
    return supa.auth.admin.sign_out(access_token)


def supa_session(access_token: str, refresh_token: str) -> UserSession | None:
    try:
        supa_session = supa.auth.set_session(access_token, refresh_token)
    except Exception as e:
        return None
    return UserSession(
        id=supa_session.user.id,
        email=supa_session.user.email,
        access_token=supa_session.session.access_token,
        refresh_token=supa_session.session.refresh_token,
    )
