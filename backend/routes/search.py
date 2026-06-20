from fastapi import APIRouter, Depends, Query
from sqlalchemy import text

from database import engine
from auth.jwt_handler import verify_token

router = APIRouter(
    prefix="/search",
    tags=["Search"]
)


@router.get("/")
def global_search(
    q: str = Query(..., min_length=1),
    user=Depends(verify_token)
):

    with engine.connect() as conn:

        result = conn.execute(
            text("""
                SELECT
                    id,
                    company_name,
                    sector,
                    severity,
                    breach_date
                FROM breaches
                WHERE
                    LOWER(company_name) LIKE LOWER(:query)
                    OR LOWER(sector) LIKE LOWER(:query)
                    OR LOWER(severity) LIKE LOWER(:query)
                ORDER BY breach_date DESC
                LIMIT 20
            """),
            {
                "query": f"%{q}%"
            }
        )

        data = []

        for row in result:

            data.append({
                "id": row.id,
                "company_name": row.company_name,
                "sector": row.sector,
                "severity": row.severity,
                "breach_date": row.breach_date
            })

    return data