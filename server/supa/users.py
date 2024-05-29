from models import user
from supa import supa


def get_profile(id: str) -> user.UserProfile:
    supa_user = supa.from_("profiles").select("*").eq("id", id).execute().data[0]
    return user.UserProfile(**supa_user)


def set_display_name(id: str, display_name: str) -> user.UserProfile:
    supa_user = (
        supa.from_("profiles")
        .update({"display_name": display_name})
        .eq("id", id)
        .execute()
        .data[0]
    )
    return user.UserProfile(**supa_user)
