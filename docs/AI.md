# IntervAI — AI & LLM Service Specifications

## 1. Role of AI Service (`ai-service/`)
The AI Service is a stateless Python/FastAPI service responsible for:
1. **Resume Parsing & Structuring**: Converting PDF/DOCX to structured schema (education, experience, projects, skills).
2. **JD & Role Alignment**: Extracting key competencies and difficulty calibrations.
3. **Adaptive Question Generation**: Generating contextual questions matching candidate resume and previous turns.
4. **Multi-dimensional Answer Evaluation**: Relevance, correctness, structure, clarity, depth, behavioral STAR alignment.
5. **Speech & Communication Feedback**: Filler word analysis, cadence, confidence markers.

## 2. Models & Providers (Free-Tier Stack)
- **Local Dev**: Ollama running `qwen2.5` or `llama3.1:8b`.
- **Cloud Hosted (Free Tier)**:
  - Groq API (ultra low latency Llama-3-70b/8b)
  - Google Gemini Flash (generous free quota)
- **STT**: `faster-whisper`
- **TTS**: `piper-tts` (open-source) / ElevenLabs free tier
