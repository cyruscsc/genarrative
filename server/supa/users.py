from models.tier import TierBase
from models.user import UserProfile, UserReq
from supa import supa


def get_user_tier(id: str) -> TierBase:
    supa_tier = (
        supa.from_("user_tiers")
        .select("tiers(id, name, word_limit, token_limit, prompt_limit)")
        .eq("user_id", id)
        .execute()
        .data[0]["tiers"]
    )
    return TierBase(**supa_tier)


def get_profile(id: str) -> UserProfile:
    supa_user = supa.from_("profiles").select("*").eq("id", id).execute().data[0]
    return UserProfile(**supa_user, tier=get_user_tier(id).name)


def set_profile(id: str, profile: UserReq) -> UserProfile:
    supa_user = (
        supa.from_("profiles")
        .update(profile.model_dump())
        .eq("id", id)
        .execute()
        .data[0]
    )
    return UserProfile(**supa_user, tier=get_user_tier(id).name)
