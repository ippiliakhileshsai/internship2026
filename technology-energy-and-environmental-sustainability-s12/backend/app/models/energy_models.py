from sqlalchemy import Column, Integer, String, Float, DateTime, Enum
from sqlalchemy.sql import func
from app.database.base import Base
import enum

class CategoryEnum(str, enum.Enum):
    RENEWABLE = "Renewable"
    NON_RENEWABLE = "Non-Renewable"

class ChallengeStatusEnum(str, enum.Enum):
    SUCCESS = "SUCCESS"
    FAILED = "FAILED"

class EnergySource(Base):
    __tablename__ = "energy_sources"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    category = Column(Enum(CategoryEnum))
    pollution_score = Column(Float)
    co2_score = Column(Float)
    sustainability_score = Column(Float)
    cost_score = Column(Float)

class SimulationResult(Base):
    __tablename__ = "simulation_results"
    
    id = Column(Integer, primary_key=True, index=True)
    solar_pct = Column(Float)
    wind_pct = Column(Float)
    hydro_pct = Column(Float)
    coal_pct = Column(Float)
    petroleum_pct = Column(Float)
    pollution_score = Column(Float)
    co2_score = Column(Float)
    sustainability_score = Column(Float)
    cost_score = Column(Float)
    created_at = Column(DateTime, server_default=func.now())

class Challenge(Base):
    __tablename__ = "challenges"
    
    id = Column(Integer, primary_key=True, index=True)
    challenge_name = Column(String)
    target_pollution = Column(Float)
    target_sustainability = Column(Float)
    target_co2 = Column(Float)
    status = Column(Enum(ChallengeStatusEnum))
