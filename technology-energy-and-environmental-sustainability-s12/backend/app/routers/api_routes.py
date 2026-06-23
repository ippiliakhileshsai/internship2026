from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.connection import get_db
from app.models.energy_models import EnergySource, SimulationResult, Challenge, ChallengeStatusEnum
from app.schemas.energy_schemas import (
    EnergySourceResponse, SimulationRequest, SimulationResponse,
    RecommendationResponse, ChallengeRequest, ChallengeResponse
)
from app.services.simulation_engine import SimulationEngine
from app.services.recommendation_engine import RecommendationEngine

router = APIRouter(prefix="/api", tags=["energy"])

@router.get("/energy-sources", response_model=list[EnergySourceResponse])
def get_energy_sources(db: Session = Depends(get_db)):
    sources = db.query(EnergySource).all()
    return sources

@router.post("/simulate", response_model=SimulationResponse)
def simulate(req: SimulationRequest, db: Session = Depends(get_db)):
    scores = SimulationEngine.calculate_scores(
        req.solar_pct, req.wind_pct, req.hydro_pct,
        req.coal_pct, req.petroleum_pct
    )
    
    result = SimulationResult(
        solar_pct=req.solar_pct,
        wind_pct=req.wind_pct,
        hydro_pct=req.hydro_pct,
        coal_pct=req.coal_pct,
        petroleum_pct=req.petroleum_pct,
        pollution_score=scores['pollution_score'],
        co2_score=scores['co2_score'],
        sustainability_score=scores['sustainability_score'],
        cost_score=scores['cost_score']
    )
    
    db.add(result)
    db.commit()
    db.refresh(result)
    return result

@router.post("/recommend", response_model=RecommendationResponse)
def recommend(req: SimulationRequest, db: Session = Depends(get_db)):
    scores = SimulationEngine.calculate_scores(
        req.solar_pct, req.wind_pct, req.hydro_pct,
        req.coal_pct, req.petroleum_pct
    )
    
    recommendation = RecommendationEngine.evaluate_mix(
        scores['pollution_score'],
        scores['co2_score'],
        scores['sustainability_score'],
        req.solar_pct,
        req.wind_pct,
        req.coal_pct,
        req.petroleum_pct
    )
    
    return recommendation

@router.post("/challenge-result", response_model=ChallengeResponse)
def save_challenge_result(req: ChallengeRequest, db: Session = Depends(get_db)):
    status = ChallengeStatusEnum.SUCCESS if (
        req.achieved_pollution <= req.target_pollution and
        req.achieved_sustainability >= req.target_sustainability and
        req.achieved_co2 <= req.target_co2
    ) else ChallengeStatusEnum.FAILED
    
    challenge = Challenge(
        challenge_name=req.challenge_name,
        target_pollution=req.target_pollution,
        target_sustainability=req.target_sustainability,
        target_co2=req.target_co2,
        status=status
    )
    
    db.add(challenge)
    db.commit()
    db.refresh(challenge)
    return challenge
