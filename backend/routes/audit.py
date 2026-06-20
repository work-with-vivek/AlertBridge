from fastapi import APIRouter, Depends
from sqlalchemy import text

from database import engine
from auth.roles import require_role

router = APIRouter(
    prefix="/audit",
    tags=["Audit Logs"]
)


@router.get("/")
def get_audit_logs(
    current_user=Depends(require_role("admin"))
):

    with engine.connect() as conn:

        result = conn.execute(
            text("""
                SELECT
                    id,
                    username,
                    action,
                    created_at
                FROM audit_logs
                ORDER BY created_at DESC
            """)
        )

        logs = []

        for row in result:

            logs.append({
                "id": row.id,
                "username": row.username,
                "action": row.action,
                "created_at": row.created_at
            })

    return logs