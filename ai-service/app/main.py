from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .config import settings

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="Stateless AI Microservice for IntervAI - Resume parsing, question generation, and real-time evaluation."
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "intervai-ai-service",
        "milestone": "M1-Foundation",
        "version": settings.APP_VERSION,
        "llm_provider": settings.LLM_PROVIDER
    }

@app.get("/api/v1/status")
def service_status():
    return {
        "status": "online",
        "capabilities": [
            "resume_parsing (M2)",
            "text_interview_generation (M3)",
            "answer_evaluation (M3)",
            "speech_analysis (M5)",
            "avatar_viseme_sync (M6)",
            "pgvector_memory (M8)"
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host=settings.HOST, port=settings.PORT, reload=settings.DEBUG)
