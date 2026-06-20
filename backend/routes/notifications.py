from fastapi import APIRouter, Depends
from sqlalchemy import text

from database import engine
from auth.roles import require_role

router = APIRouter(
    prefix="/notifications",
    tags=["Notifications"]
)


@router.get("/")
def get_notifications(
    current_user=Depends(require_role("admin", "analyst", "auditor"))
):

    with engine.connect() as conn:

        result = conn.execute(
            text("""
                SELECT
                    id,
                    title,
                    severity,
                    created_at
                FROM notifications
                ORDER BY id DESC
            """)
        )

        notifications = []

        for row in result:

            notifications.append({
                "id": row.id,
                "title": row.title,
                "severity": row.severity,
                "date": row.created_at
            })

    return notifications