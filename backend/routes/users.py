from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy import text

from database import engine
from schemas.user_schema import UserCreate
from auth.roles import require_role
from auth.password import hash_password
from services.audit_service import log_action

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


class UpdateRole(BaseModel):
    role: str


class UpdateStatus(BaseModel):
    is_active: bool


@router.get("/")
def get_users(current_user=Depends(require_role("admin"))):

    with engine.connect() as conn:

        result = conn.execute(
            text("""
                SELECT
                    id,
                    username,
                    role,
                    full_name,
                    email,
                    is_active
                FROM users
                ORDER BY id
            """)
        )

        users = []

        for row in result:
            users.append({
                "id": row.id,
                "username": row.username,
                "role": row.role,
                "full_name": row.full_name,
                "email": row.email,
                "is_active": row.is_active
            })

    return users


@router.post("/")
def create_user(
    new_user: UserCreate,
    current_user=Depends(require_role("admin"))
):

    hashed_password = hash_password(new_user.password)

    with engine.connect() as conn:

        existing = conn.execute(
            text("""
                SELECT id
                FROM users
                WHERE username=:username
            """),
            {
                "username": new_user.username
            }
        ).fetchone()

        if existing:
            raise HTTPException(
                status_code=400,
                detail="Username already exists"
            )

        conn.execute(
            text("""
                INSERT INTO users
                (
                    username,
                    password,
                    role,
                    full_name,
                    email,
                    is_active
                )
                VALUES
                (
                    :username,
                    :password,
                    :role,
                    :full_name,
                    :email,
                    TRUE
                )
            """),
            {
                "username": new_user.username,
                "password": hashed_password,
                "role": new_user.role,
                "full_name": new_user.full_name,
                "email": new_user.email
            }
        )

        conn.commit()

    log_action(
        current_user["sub"],
        f"Created user: {new_user.username}"
    )

    return {
        "message": "User created successfully"
    }


@router.put("/{user_id}/role")
def update_role(
    user_id: int,
    data: UpdateRole,
    current_user=Depends(require_role("admin"))
):

    if data.role not in ["admin", "analyst", "auditor"]:
        raise HTTPException(
            status_code=400,
            detail="Invalid role"
        )

    with engine.connect() as conn:

        conn.execute(
            text("""
                UPDATE users
                SET role=:role
                WHERE id=:id
            """),
            {
                "role": data.role,
                "id": user_id
            }
        )

        conn.commit()

    log_action(
        current_user["sub"],
        f"Updated role for user ID {user_id} to {data.role}"
    )

    return {
        "message": "Role updated successfully"
    }


@router.put("/{user_id}/status")
def update_status(
    user_id: int,
    data: UpdateStatus,
    current_user=Depends(require_role("admin"))
):

    with engine.connect() as conn:

        conn.execute(
            text("""
                UPDATE users
                SET is_active=:status
                WHERE id=:id
            """),
            {
                "status": data.is_active,
                "id": user_id
            }
        )

        conn.commit()

    log_action(
        current_user["sub"],
        f"Changed status for user ID {user_id} to {'Active' if data.is_active else 'Inactive'}"
    )

    return {
        "message": "User status updated successfully"
    }


@router.delete("/{user_id}")
def delete_user(
    user_id: int,
    current_user=Depends(require_role("admin"))
):

    with engine.connect() as conn:

        result = conn.execute(
            text("""
                SELECT username
                FROM users
                WHERE id=:id
            """),
            {
                "id": user_id
            }
        ).fetchone()

        if not result:
            raise HTTPException(
                status_code=404,
                detail="User not found"
            )

        deleted_username = result.username

        conn.execute(
            text("""
                DELETE FROM users
                WHERE id=:id
            """),
            {
                "id": user_id
            }
        )

        conn.commit()

    log_action(
        current_user["sub"],
        f"Deleted user: {deleted_username}"
    )

    return {
        "message": "User deleted successfully"
    }