import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    APP_NAME: str = "IntervAI AI Service"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = False
    PORT: int = 8000
    HOST: str = "0.0.0.0"
    
    # LLM Settings (Free Tier Defaults)
    LLM_PROVIDER: str = "ollama" # ollama, groq, gemini
    OLLAMA_BASE_URL: str = "http://localhost:11434"
    OLLAMA_MODEL: str = "qwen2.5:7b"
    GROQ_API_KEY: str = ""
    GEMINI_API_KEY: str = ""
    
    # Core Backend Communication
    CORE_BACKEND_URL: str = "http://localhost:4000"

    class Config:
        env_file = ".env"
        extra = "ignore"

settings = Settings()
