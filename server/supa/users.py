from models import user
from supa import supa


def get_profile(id: str) -> user.UserProfile:
    supa_user = supa.from_("profiles").select("*").eq("id", id).execute().data[0]
    supa_tier = (
        supa.from_("user_tiers")
        .select("tiers(name)")
        .eq("user_id", supa_user["id"])
        .execute()
        .data[0]["tiers"]["name"]
    )
    return user.UserProfile(**supa_user, tier=supa_tier)


def set_display_name(id: str, display_name: str) -> user.UserProfile:
    supa_user = (
        supa.from_("profiles")
        .update({"display_name": display_name})
        .eq("id", id)
        .execute()
        .data[0]
    )
    return user.UserProfile(**supa_user)
