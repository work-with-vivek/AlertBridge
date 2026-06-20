from fastapi import APIRouter, Depends
from sqlalchemy import text

from auth.jwt_handler import verify_token
from database import engine
from services.forecast_service import generate_forecast

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/stats")
def dashboard_stats(user=Depends(verify_token)):

    with engine.connect() as conn:

        total = conn.execute(
            text("SELECT COUNT(*) FROM breaches")
        ).scalar()

        high = conn.execute(
            text("""
                SELECT COUNT(*)
                FROM breaches
                WHERE severity = 'High'
            """)
        ).scalar()

        critical = conn.execute(
            text("""
                SELECT COUNT(*)
                FROM breaches
                WHERE severity = 'Critical'
            """)
        ).scalar()

    return {
        "total_breaches": total,
        "high_risk": high,
        "critical_risk": critical
    }


@router.get("/sectors")
def sector_stats(user=Depends(verify_token)):

    with engine.connect() as conn:

        result = conn.execute(
            text("""
                SELECT sector,
                       COUNT(*) AS total
                FROM breaches
                GROUP BY sector
                ORDER BY total DESC
            """)
        )

        sectors = {}

        for row in result:
            sectors[row.sector] = row.total

    return sectors


@router.get("/intelligence")
def intelligence_dashboard(user=Depends(verify_token)):

    with engine.connect() as conn:

        breach = conn.execute(
            text("""
                SELECT
                    company_name,
                    sector,
                    severity,
                    exposed_data,
                    breach_date
                FROM breaches
                ORDER BY breach_date DESC
                LIMIT 1
            """)
        ).fetchone()

    if breach is None:
        return {
            "message": "No breaches found."
        }

    forecast = generate_forecast(
        breach.sector,
        breach.exposed_data
    )

    return {
        "latest_breach": {
            "company": breach.company_name,
            "sector": breach.sector,
            "risk": breach.severity,
            "date": breach.breach_date
        },
        "predicted_threats": forecast["predicted_threats"],
        "recommended_actions": forecast["recommended_actions"]
    }


@router.get("/recent")
def recent_breaches(user=Depends(verify_token)):

    with engine.connect() as conn:

        result = conn.execute(
            text("""
                SELECT
                    company_name,
                    sector,
                    severity,
                    breach_date
                FROM breaches
                ORDER BY breach_date DESC
                LIMIT 10
            """)
        )

        breaches = []

        for row in result:
            breaches.append({
                "company_name": row.company_name,
                "sector": row.sector,
                "severity": row.severity,
                "breach_date": row.breach_date
            })

    return breaches


@router.get("/registry")
def public_registry(user=Depends(verify_token)):

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
                ORDER BY id DESC
            """)
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


@router.get("/monthly-trends")
def monthly_trends(user=Depends(verify_token)):

    with engine.connect() as conn:

        result = conn.execute(
            text("""
                SELECT
                    TO_CHAR(created_at, 'Mon') AS month,
                    COUNT(*) AS total
                FROM breaches
                GROUP BY TO_CHAR(created_at, 'Mon'),
                         DATE_TRUNC('month', created_at)
                ORDER BY DATE_TRUNC('month', created_at)
            """)
        )

        data = []

        for row in result:
            data.append({
                "month": row.month,
                "total": row.total
            })

    return data


@router.get("/severity-chart")
def severity_chart(user=Depends(verify_token)):

    with engine.connect() as conn:

        result = conn.execute(
            text("""
                SELECT
                    severity,
                    COUNT(*) AS total
                FROM breaches
                GROUP BY severity
            """)
        )

        data = []

        for row in result:

            data.append({
                "severity": row.severity,
                "total": row.total
            })

    return data