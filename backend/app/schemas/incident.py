from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class IncidentCreate(BaseModel):
    title: str = Field(..., min_length=3)
    description: Optional[str] = None
    latitude: float
    longitude: float
    severity: int = Field(ge=1, le=5)

class IncidentResponse(IncidentCreate):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
