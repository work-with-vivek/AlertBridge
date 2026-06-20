from fastapi import Depends, HTTPException

from auth.jwt_handler import verify_token


def require_role(*allowed_roles):

    def role_checker(user=Depends(verify_token)):

        role = user.get("role")

        if role not in allowed_roles:
            raise HTTPException(
                status_code=403,
                detail="Access Denied"
            )

        return user

    return role_checker