from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI(title="TraderPulse API")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class GamificationData(BaseModel):
    xp: int
    level: int
    badges: List[str]
    progress: int

# In-memory storage (in production, use a database)
gamification_store = {
    "xp": 0,
    "level": 1,
    "badges": [],
    "progress": 0
}

@app.get("/")
async def root():
    return {"message": "TraderPulse API - AI SaaS Dashboard Backend"}

@app.get("/api/gamification")
async def get_gamification():
    return gamification_store

@app.post("/api/gamification")
async def update_gamification(data: GamificationData):
    gamification_store.update(data.dict())
    return gamification_store

@app.get("/api/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
