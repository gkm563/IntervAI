# IntervAI — System Architecture (v2)

## 1. High-Level Component Overview
IntervAI follows a decoupled microservices architecture designed for high scalability, independent deployment, and maximum free-tier leverage.

```text
┌──────────────────────────────────────────────────────────────────────────┐
│                              CLIENT LAYER                                │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────────────────┐ │
│  │ Landing Pg │ │ Auth Pages │ │ Dashboard  │ │ Interview Room (Voice/  │ │
│  │ (SEO, SSR) │ │ (Login/Reg)│ │ (SPA)      │ │ Video/Text + 3D Avatar) │ │
│  └────────────┘ └────────────┘ └────────────┘ └────────────────────────┘ │
│        React 18 + TypeScript + Vite + Tailwind CSS + Lucide Icons        │
└──────────────────────────────────┬───────────────────────────────────────┘
                                    │ HTTPS (REST) + WSS (Realtime)
┌──────────────────────────────────▼───────────────────────────────────────┐
│                             API GATEWAY / BFF                            │
│        Nginx / Node (Express) — TLS termination, rate limiting,          │
│        JWT validation, request routing, CORS, compression                │
└───────┬───────────────────┬───────────────────┬──────────────────────────┘
        │                   │                   │
┌───────▼────────┐  ┌───────▼─────────┐ ┌───────▼───────────┐
│  CORE BACKEND   │  │   AI SERVICE     │ │  REALTIME SERVICE  │
│  (Node/NestJS)  │  │   (FastAPI/Py)   │ │  (LiveKit/WebRTC)   │
│  - Auth (JWT)   │  │ - Resume Parser  │ │ - Voice room        │
│  - Users        │  │ - JD Analyzer    │ │ - Video room        │
│  - Profiles     │  │ - Interview      │ │ - STT streaming     │
│  - Resume CRUD  │  │   Planner        │ │ - TTS streaming     │
│  - Interviews   │  │ - Question Gen   │ │ - Avatar viseme     │
│  - Reports      │  │ - Answer Eval    │ │   sync events       │
│  - Notifications│  │ - Speech/Vision  │ │                     │
│  - Scheduling   │  │   Analysis       │ │                     │
│  - Billing(fut.)│  │ - Coaching Engine│ │                     │
└───────┬─────────┘  └────────┬─────────┘ └──────────┬──────────┘
        │                     │                       │
        └──────────┬──────────┴───────────┬───────────┘
                    │                      │
        ┌───────────▼───────────┐  ┌───────▼────────────┐
        │   PRIMARY DATABASE     │  │   OBJECT STORAGE     │
        │  PostgreSQL + pgvector │  │  Resumes, avatars,   │
        │  (Supabase free tier)  │  │  audio/video clips    │
        │                        │  │  (Supabase Storage)   │
        │  Redis (session/cache/ │  │                       │
        │  queue - Upstash free) │  │                       │
        └────────────────────────┘  └────────────────────────┘
                    │
        ┌───────────▼───────────┐
        │   LLM / MODEL LAYER     │
        │  Local: Ollama (Qwen3) │
        │  Hosted free-tier:       │
        │  Groq / Gemini Flash     │
        └──────────────────────────┘
```

## 2. Service Separation Principles
- **Core Backend (`backend/`)**: Acts as the single source of truth for identity, relational data, and business logic. Only this service writes to primary tables.
- **AI Service (`ai-service/`)**: Pure stateless computation layer. Processes resumes, generates questions, scores answers, and delivers structured JSON.
- **Realtime Service (`realtime-service/`)**: Low-latency voice/video streaming and avatar viseme synchronization.
- **Client (`frontend/`)**: Modern responsive web application with fast page loads, rich animations, and accessible interfaces.
