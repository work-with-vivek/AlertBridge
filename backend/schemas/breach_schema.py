from pydantic import BaseModel


class Breach(BaseModel):

    company_name: str
    sector: str
    exposed_data: str

    country: str
    city: str

    breach_date: str

    affected_records: str

    latitude: float
    longitude: float