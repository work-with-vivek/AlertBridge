from pydantic import BaseModel


class ForecastRequest(BaseModel):
    sector: str
    exposed_data: str