from supa import supa


def get_profile(id: str):
    return supa.from_("profiles").select("*").eq("id", id).execute().data[0]


def set_display_name(id: str, display_name: str):
    return (
        supa.from_("profiles")
        .update({"display_name": display_name})
        .eq("id", id)
        .execute()
        .data[0]
    )
