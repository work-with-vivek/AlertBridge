from datetime import datetime, timedelta, UTC

from jose import JWTError, jwt
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer

SECRET_KEY = "alertbridge-secret-key-change-this"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


def create_access_token(data: dict):

    to_encode = data.copy()

    expire = datetime.now(UTC) + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    to_encode["exp"] = expire

    print("SECRET USED TO SIGN:", repr(SECRET_KEY))
    print("ALGORITHM:", ALGORITHM)

    token = jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    print("GENERATED TOKEN:", token)

    return token
def verify_token(token: str = Depends(oauth2_scheme)):

    print("\n========== RECEIVED TOKEN ==========")
    print(token)

    try:

        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        print("\n========== TOKEN PAYLOAD ==========")
        print(payload)

        return payload

    except JWTError as e:

        print("\n========== JWT ERROR ==========")
        print(str(e))

        raise HTTPException(
            status_code=401,
            detail="Invalid or Expired Token"
        )