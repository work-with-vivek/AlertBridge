from sqlalchemy import text
from database import engine


def log_action(username: str, action: str):

    with engine.connect() as conn:

        conn.execute(
            text("""
                INSERT INTO audit_logs
                (
                    username,
                    action
                )
                VALUES
                (
                    :username,
                    :action
                )
            """),
            {
                "username": username,
                "action": action
            }
        )

        conn.commit()