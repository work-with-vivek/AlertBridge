from fastapi import APIRouter

router = APIRouter(
    prefix="/threat-feed",
    tags=["Threat Feed"]
)


@router.get("/")
def get_threat_feed():

    return [
        {
            "title": "Ransomware campaign targets healthcare sector",
            "severity": "Critical",
            "source": "AlertBridge Intelligence"
        },
        {
            "title": "New phishing campaign detected",
            "severity": "High",
            "source": "AlertBridge Intelligence"
        },
        {
            "title": "Zero-day vulnerability under investigation",
            "severity": "Critical",
            "source": "AlertBridge Intelligence"
        },
        {
            "title": "Credential stuffing attacks increasing",
            "severity": "Medium",
            "source": "AlertBridge Intelligence"
        }
    ]