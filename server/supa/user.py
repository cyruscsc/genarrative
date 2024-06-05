from models.tier import TierFromDB
from models.user import ProfileFromDB, ProfileToDB
from supa import supa
from uuid import UUID


def get_user_tier(id: UUID) -> TierFromDB:
    supa_tier = (
        supa.from_("user_tiers")
        .select("tiers(*)")
        .eq("user_id", str(id))
        .execute()
        .data[0]["tiers"]
    )
    return TierFromDB(**supa_tier)


def get_profile(id: UUID) -> ProfileFromDB:
    supa_user = supa.from_("profiles").select("*").eq("id", str(id)).execute().data[0]
    return ProfileFromDB(**supa_user, tier=get_user_tier(id).name)


def set_profile(id: UUID, profile: ProfileToDB) -> ProfileFromDB:
    supa_user = (
        supa.from_("profiles")
        .update(profile.model_dump())
        .eq("id", str(id))
        .execute()
        .data[0]
    )
    return ProfileFromDB(**supa_user, tier=get_user_tier(id).name)
