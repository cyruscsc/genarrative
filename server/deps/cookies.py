from fastapi import Request, Response


def get_jwt_tokens(request: Request):
    return {
        "access_token": request.cookies.get("access_token"),
        "refresh_token": request.cookies.get("refresh_token"),
    }


def set_jwt_tokens(response: Response, access_token: str, refresh_token: str):
    response.set_cookie("access_token", access_token, httponly=True)
    response.set_cookie("refresh_token", refresh_token, httponly=True)
    return response


def delete_jwt_tokens(response: Response):
    response.delete_cookie("access_token")
    response.delete_cookie("refresh_token")
    return response
