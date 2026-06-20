from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import psycopg2

from auth.password import verify_password
from auth.jwt_handler import create_access_token
from services.audit_service import log_action

router = APIRouter()


class LoginRequest(BaseModel):
    username: str
    password: str


@router.post("/login")
def login(user: LoginRequest):

    conn = psycopg2.connect(
        host="localhost",
        database="cybersuraksha",
        user="postgres",
        password="Cyber123@"
    )

    cur = conn.cursor()

    cur.execute(
        """
        SELECT username, password, role
        FROM users
        WHERE username=%s
        """,
        (user.username,)
    )

    result = cur.fetchone()

    cur.close()
    conn.close()

    if result is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid username or password"
        )

    username, hashed_password, role = result

    if not verify_password(user.password, hashed_password):
        raise HTTPException(
            status_code=401,
            detail="Invalid username or password"
        )

    token = create_access_token(
        {
            "sub": username,
            "role": role
        }
    )

    log_action(
        username,
        "User logged in"
    )

    return {
        "access_token": token,
        "token_type": "bearer",
        "username": username,
        "role": role
    }