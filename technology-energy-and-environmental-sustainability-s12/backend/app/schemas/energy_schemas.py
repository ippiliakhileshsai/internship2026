from pydantic import BaseModel, field_validator
from typing import Optional
from datetime import datetime

class EnergySourceResponse(BaseModel):
    id: int
    name: str
    category: str
    pollution_score: float
    co2_score: float
    sustainability_score: float
    cost_score: float

    class Config:
        from_attributes = True

class SimulationRequest(BaseModel):
    solar_pct: float
    wind_pct: float
    hydro_pct: float
    coal_pct: float
    petroleum_pct: float

    @field_validator('*')
    @classmethod
    def validate_non_negative(cls, v):
        if v < 0:
            raise ValueError("Percentage must be non-negative")
        return v

    @field_validator('petroleum_pct')
    @classmethod
    def validate_sum_100(cls, v, info):
        values = info.data
        total = sum(values.values()) + v
        if abs(total - 100) > 0.01:
            raise ValueError("Percentages must sum to 100%")
        return v

class SimulationResponse(BaseModel):
    id: int
    pollution_score: float
    co2_score: float
    sustainability_score: float
    cost_score: float
    created_at: datetime

    class Config:
        from_attributes = True

class RecommendationResponse(BaseModel):
    recommendation: str
    tips: list[str]

class ChallengeRequest(BaseModel):
    challenge_name: str
    target_pollution: float
    target_sustainability: float
    target_co2: float
    achieved_pollution: float
    achieved_sustainability: float
    achieved_co2: float

class ChallengeResponse(BaseModel):
    id: int
    challenge_name: str
    status: str

    class Config:
        from_attributes = True
