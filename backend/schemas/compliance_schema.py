from pydantic import BaseModel
from datetime import date


class ComplianceUpdate(BaseModel):
    notification_status: str
    notification_date: date
    evidence_status: str