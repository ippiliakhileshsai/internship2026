from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database.connection import engine, get_db
from app.database.base import Base
from app.routers import api_routes
from sqlalchemy.orm import Session

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Smart Energy Advisor API",
    description="Backend for Smart Energy Advisor",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_routes.router)

def seed_energy_sources():
    db = next(get_db())
    try:
        if db.query(api_routes.EnergySource).count() == 0:
            sources = [
                api_routes.EnergySource(
                    name="Solar", category="Renewable",
                    pollution_score=5, co2_score=5,
                    sustainability_score=95, cost_score=60
                ),
                api_routes.EnergySource(
                    name="Wind", category="Renewable",
                    pollution_score=8, co2_score=5,
                    sustainability_score=90, cost_score=55
                ),
                api_routes.EnergySource(
                    name="Hydro", category="Renewable",
                    pollution_score=20, co2_score=15,
                    sustainability_score=80, cost_score=50
                ),
                api_routes.EnergySource(
                    name="Coal", category="Non-Renewable",
                    pollution_score=95, co2_score=100,
                    sustainability_score=25, cost_score=30
                ),
                api_routes.EnergySource(
                    name="Petroleum", category="Non-Renewable",
                    pollution_score=85, co2_score=90,
                    sustainability_score=20, cost_score=35
                ),
            ]
            db.add_all(sources)
            db.commit()
            print("Energy sources seeded successfully")
    finally:
        db.close()

@app.on_event("startup")
def startup_event():
    seed_energy_sources()

@app.get("/health")
def health():
    return {"status": "ok"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
