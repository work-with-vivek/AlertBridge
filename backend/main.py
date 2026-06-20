from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
import asyncio

from auth.auth import router as auth_router
from database import engine
from websocket_manager import manager

from routes.dashboard import router as dashboard_router
from routes.users import router as users_router
from routes.audit import router as audit_router
from routes.notifications import router as notifications_router

from schemas.breach_schema import Breach
from schemas.compliance_schema import ComplianceUpdate
from schemas.forecast_schema import ForecastRequest

from risk_engine import analyze_risk
from services.compliance_service import calculate_compliance_score
from services.forecast_service import generate_forecast

from routes.search import router as search_router
from routes.threat_feed import router as threat_feed_router

app = FastAPI(title="AlertBridge API")

# -------------------------
# Routers
# -------------------------

app.include_router(auth_router)
app.include_router(dashboard_router)
app.include_router(users_router)
app.include_router(audit_router)
app.include_router(notifications_router)
app.include_router(search_router)
app.include_router(threat_feed_router)

# -------------------------
# CORS
# -------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------
# Home
# -------------------------

@app.get("/")
def home():

    return {
        "project": "AlertBridge",
        "status": "Running"
    }


# -------------------------
# Breach Registration
# -------------------------

@app.post("/breach/register")
def register_breach(breach: Breach):

    analysis = analyze_risk(
        breach.exposed_data
    )

    with engine.connect() as conn:

        conn.execute(
            text("""
                INSERT INTO breaches
                (
                    company_name,
                    sector,
                    severity,
                    exposed_data,
                    country,
                    city,
                    breach_date,
                    affected_records,
                    latitude,
                    longitude
                )
                VALUES
                (
                    :company_name,
                    :sector,
                    :severity,
                    :exposed_data,
                    :country,
                    :city,
                    :breach_date,
                    :affected_records,
                    :latitude,
                    :longitude
                )
            """),
            {
                "company_name": breach.company_name,
                "sector": breach.sector,
                "severity": analysis["risk"],
                "exposed_data": breach.exposed_data,
                "country": breach.country,
                "city": breach.city,
                "breach_date": breach.breach_date,
                "affected_records": breach.affected_records,
                "latitude": breach.latitude,
                "longitude": breach.longitude
            }
        )

        conn.commit()

    return {
        "status": "success",
        "message": "Breach Registered",
        "risk": analysis["risk"],
        "likely_threats": analysis["threats"]
    }

# -------------------------
# Compliance Update
# -------------------------

@app.put("/breach/compliance/{breach_id}")
def update_compliance(
    breach_id: int,
    compliance: ComplianceUpdate
):

    score = calculate_compliance_score(
        compliance.notification_status,
        compliance.evidence_status
    )

    with engine.connect() as conn:

        conn.execute(
            text("""
                UPDATE breaches
                SET
                    notification_status = :notification_status,
                    notification_date = :notification_date,
                    evidence_status = :evidence_status,
                    compliance_score = :compliance_score
                WHERE id = :breach_id
            """),
            {
                "notification_status": compliance.notification_status,
                "notification_date": compliance.notification_date,
                "evidence_status": compliance.evidence_status,
                "compliance_score": score,
                "breach_id": breach_id
            }
        )

        conn.commit()

    return {
        "status": "success",
        "message": "Compliance Updated Successfully",
        "compliance_score": score
    }


# -------------------------
# Cybercrime Forecast
# -------------------------

@app.post("/forecast")
def forecast(request: ForecastRequest):

    result = generate_forecast(
        request.sector,
        request.exposed_data
    )

    return {
        "status": "success",
        "forecast": result
    }


# -------------------------
# WebSocket
# -------------------------

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):

    await manager.connect(websocket)

    try:

        while True:
            await websocket.receive_text()

    except WebSocketDisconnect:

        manager.disconnect(websocket)


# -------------------------
# Breach Details
# -------------------------

@app.get("/breach/{breach_id}")
def get_breach(breach_id: int):

    with engine.connect() as conn:

        breach = conn.execute(
            text("""
                SELECT
                    id,
                    company_name,
                    sector,
                    severity,
                    exposed_data,
                    breach_date,
                    notification_status,
                    compliance_score
                FROM breaches
                WHERE id = :id
            """),
            {
                "id": breach_id
            }
        ).fetchone()

    if breach is None:
        return {
            "message": "Breach not found"
        }

    return {
        "id": breach.id,
        "company_name": breach.company_name,
        "sector": breach.sector,
        "severity": breach.severity,
        "exposed_data": breach.exposed_data,
        "breach_date": breach.breach_date,
        "notification_status": breach.notification_status,
        "compliance_score": breach.compliance_score
    }
@app.put("/breach/{breach_id}/incident")
def update_incident(
    breach_id: int,
    status: str,
    assigned_to: str,
    notes: str
):


    with engine.connect() as conn:

        conn.execute(
            text("""
                UPDATE breaches
                SET
                    incident_status = :status,
                    assigned_to = :assigned_to,
                    investigation_notes = :notes
                WHERE id = :id
            """),
            {
                "status": status,
                "assigned_to": assigned_to,
                "notes": notes,
                "id": breach_id
            }
        )

        conn.commit()

    return {
        "message": "Incident updated successfully"

    }
@app.post("/breach/{breach_id}/notify")
def send_notification(breach_id: int):

    with engine.connect() as conn:

        breach = conn.execute(
            text("""
                SELECT company_name, severity
                FROM breaches
                WHERE id=:id
            """),
            {
                "id": breach_id
            }
        ).fetchone()

        if breach is None:
            return {
                "status": "error",
                "message": "Breach not found"
            }

        conn.execute(
            text("""
                INSERT INTO notifications
                (
                    title,
                    severity
                )
                VALUES
                (
                    :title,
                    :severity
                )
            """),
            {
                "title": f"Notification sent to affected users of {breach.company_name}",
                "severity": breach.severity
            }
        )

        conn.execute(
            text("""
                INSERT INTO audit_logs
                (
                    username,
                    action
                )
                VALUES
                (
                    'system',
                    :action
                )
            """),
            {
                "action": f"Notification sent for {breach.company_name}"
            }
        )

        conn.commit()

    return {
        "status": "success",
        "message": "Notification sent successfully."
    }
# -------------------------
# Security Analytics
# -------------------------

@app.get("/analytics/overview")
def analytics_overview():

    with engine.connect() as conn:

        total = conn.execute(
            text("SELECT COUNT(*) FROM breaches")
        ).scalar()

        critical = conn.execute(
            text("""
                SELECT COUNT(*)
                FROM breaches
                WHERE severity='Critical'
            """)
        ).scalar()

        high = conn.execute(
            text("""
                SELECT COUNT(*)
                FROM breaches
                WHERE severity='High'
            """)
        ).scalar()

        sectors = conn.execute(
            text("""
                SELECT
                    sector,
                    COUNT(*) AS total
                FROM breaches
                GROUP BY sector
                ORDER BY total DESC
                LIMIT 5
            """)
        ).fetchall()

    return {
        "total_breaches": total,
        "critical": critical,
        "high": high,
        "top_sectors": [
            {
                "sector": row.sector,
                "count": row.total
            }
            for row in sectors
        ]
    }
@app.get("/attack-map")
def attack_map():

    with engine.connect() as conn:

        result = conn.execute(text("""
            SELECT
                id,
                company_name,
                sector,
                severity,
                latitude,
                longitude
            FROM breaches
            WHERE latitude IS NOT NULL
            AND longitude IS NOT NULL
        """))

        data = []

        for row in result:

            data.append({
                "id": row.id,
                "company": row.company_name,
                "sector": row.sector,
                "severity": row.severity,
                "latitude": row.latitude,
                "longitude": row.longitude
            })

    return data
@app.post("/breach/{breach_id}/notify")
def send_notification(
    breach_id: int
):

    with engine.connect() as conn:

        breach = conn.execute(
            text("""
                SELECT
                    company_name,
                    severity
                FROM breaches
                WHERE id = :id
            """),
            {
                "id": breach_id
            }
        ).fetchone()

        if breach is None:

            return {
                "status": "error",
                "message": "Breach not found"
            }

        conn.execute(
            text("""
                INSERT INTO audit_logs
                (
                    username,
                    action
                )
                VALUES
                (
                    'system',
                    :action
                )
            """),
            {
                "action": f"Notification sent for {breach.company_name}"
            }
        )

        conn.commit()

    return {
        "status": "success",
        "message": f"Notification sent successfully for {breach.company_name}"
    }