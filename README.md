# IntervAI 🚀
### AI-Powered Real-Time Interview Coach & Simulation Platform

> **Status:** Milestone 1 (Foundation) Complete  
> **Target:** Web-first, responsive, globally accessible AI interview platform optimized for Indian & international students / professionals  
> **Repository:** [https://github.com/gkm563/IntervAI.git](https://github.com/gkm563/IntervAI.git)  
> **Author:** Gautam Kumar Maurya ([@gkm563](https://github.com/gkm563))

---

## 📖 Overview

**IntervAI** is an AI-powered real-time mock interview simulation and coaching platform. Unlike static question banks, IntervAI parses your actual resume projects, calibrates questions against your target job role and company, and simulates realistic interview turns across **Voice**, **3D Avatar Video**, and **Text-Only** modes with deep feedback on technical depth, STAR structure, and communication.

---

## 🏗️ Architecture & Service Boundaries (Section 118 & 130)

IntervAI enforces strict service separation:

```text
intervai/
├── docs/                      # Full technical documentation suite
├── frontend/                  # React 18 + Vite + TypeScript + Tailwind CSS
├── backend/                   # Node.js / TypeScript Modular Backend (Auth & Relational Data)
├── ai-service/                # Python + FastAPI (Stateless AI Computation & Question Engine)
├── infrastructure/            # Docker, Nginx Reverse Proxy, and Postgres migrations
├── .github/workflows/         # CI pipeline for automated build & test validation
├── docker-compose.yml         # One-command orchestration
├── CHANGELOG.md               # Milestone changelog
└── README.md
```

### Service Principles:
1. **Core Backend (`backend/`)**: Single source of truth for identity, PostgreSQL relational schema, and session cookies.
2. **AI Microservice (`ai-service/`)**: Pure stateless microservice for LLM reasoning, question generation, and evaluation.
3. **Web Client (`frontend/`)**: High-performance React SPA with responsive design, instant demo simulations, and accessible auth.
4. **Primary Database**: PostgreSQL 16 with `pgvector` extension (Supabase Free Tier / Docker pgvector).

---

## 🎯 Milestone 1 Deliverables (Foundation)

| Deliverable | Status | Description |
|---|---|---|
| **1. Repository Scaffold** | ✅ Completed | Structure matching Section 130 with `docs/`, `backend/`, `frontend/`, `ai-service/`, `infrastructure/`. |
| **2. Docker Compose** | ✅ Completed | `docker-compose.yml` bringing up PostgreSQL 16 + pgvector, Backend, Frontend, and AI Service with one command. |
| **3. Database Migration** | ✅ Completed | `001_initial_auth_schema.sql` defining `users`, `email_verifications`, `password_resets`, `refresh_tokens`, and future entity stubs. |
| **4. Authentication Flow** | ✅ Completed | Register → Email OTP (6-digit, 10m expiry) → Login → Silent Refresh (`httpOnly` cookie) → Forgot/Reset Password with global session revocation. |
| **5. Landing Page Skeleton** | ✅ Completed | Section 121 compliant landing page with Hero, 60s interactive demo turn, Problem cards, How-it-works, Feature grid, Modality tabs, Pricing (INR/USD), FAQs, and SEO structured data. |
| **6. Dashboard Skeleton** | ✅ Completed | Section 122 compliant candidate dashboard with Readiness score ring, interview launcher, and navigation. |

---

## 🚀 Quickstart: Running Locally

### Option A: Via Docker Compose (Recommended)
Make sure Docker Desktop is installed and running, then run:

```bash
# From repository root:
docker compose up --build
```

Services will be available at:
- **Frontend Web App:** [http://localhost:5173](http://localhost:5173)
- **Core Backend API:** [http://localhost:4000/api](http://localhost:4000/api)
- **AI Microservice:** [http://localhost:8000/health](http://localhost:8000/health)
- **PostgreSQL + pgvector:** `localhost:5432` (`postgres` / `postgrespassword`)

---

### Option B: Native Development Mode (Zero-Config Standalone)

You can run each service directly using Node.js (v18+) and Python (3.10+):

#### 1. Start Core Backend
```bash
cd backend
npm install
npm run build
npm run dev
# Server will listen on http://localhost:4000
```
> *Note:* If no local PostgreSQL is running, the backend automatically uses its resilient zero-config embedded development engine so you can test authentication immediately!

#### 2. Start Frontend Web Client
```bash
cd frontend
npm install
npm run dev
# Client will run at http://localhost:5173
```

#### 3. Start AI Microservice
```bash
cd ai-service
pip install -r requirements.txt
python -m uvicorn app.main:app --port 8000 --reload
```

---

## 🧪 Testing & Verification

### Run Automated Backend Auth Flow Tests
```bash
cd backend
npm run build
node dist/test-auth.js
```
This automated suite verifies:
- `/health` endpoint status
- User registration & OTP generation
- Unverified account login protection (403 block)
- Invalid OTP rejection
- Anti-enumeration behavior on forgot-password requests

### Manual End-to-End Auth Journey
1. Open [http://localhost:5173/](http://localhost:5173/) in your browser.
2. Click **"Get Started Free"** or navigate to `/register`.
3. Enter your Name, Email, and a strong password (watch the live strength meter).
4. Click **"Create Account & Verify"** — you will be redirected to `/verify-email`.
5. In dev mode (`EMAIL_PROVIDER=console`), the 6-digit OTP code is logged directly to the backend terminal.
6. Enter the 6 digits into the auto-focusing boxes and click **"Verify"**.
7. You are automatically logged in with a secure JWT + `httpOnly` refresh cookie and redirected to `/dashboard`.
8. Test **"Log out"**, then log back in via `/login`.
9. Test **"Forgot Password"** on `/forgot-password` to receive the single-use reset link.

---

## 🌐 Free-Tier Hosting Deployment Guide

### 1. Frontend (Vercel / Netlify)
- **Root Directory:** `frontend`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Environment Variables:** `VITE_API_URL=https://your-backend.onrender.com`

### 2. Core Backend (Render / Railway / Oracle Free Tier)
- **Root Directory:** `backend`
- **Build Command:** `npm install && npm run build`
- **Start Command:** `npm run start`
- **Environment Variables:**
  - `DATABASE_URL`: Your Supabase connection string (`postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres`)
  - `DB_SSL`: `true`
  - `JWT_ACCESS_SECRET`: Generate a 32-byte secret (`openssl rand -base64 32`)
  - `JWT_REFRESH_SECRET`: Generate a 32-byte secret
  - `CLIENT_URL`: `https://your-frontend.vercel.app`
  - `EMAIL_PROVIDER`: `resend` (or `smtp`)
  - `RESEND_API_KEY`: Your Resend free-tier API key

### 3. AI Service (Render / Railway Free Tier)
- **Root Directory:** `ai-service`
- **Start Command:** `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
- **Environment Variables:**
  - `GROQ_API_KEY`: For free ultra-low latency Llama-3 inference
  - `GEMINI_API_KEY`: For Google Gemini Flash free tier backup

---

## 🔒 Security Best Practices Implemented

- **Password Hashing:** Passwords hashed with `bcrypt` (work factor 12).
- **Dual-Token Architecture:** Short-lived JWT access tokens stored strictly in memory + long-lived refresh tokens in `httpOnly`, `SameSite=Strict`, `Secure` cookies.
- **Anti-Enumeration:** Password reset and OTP endpoints never reveal whether an email exists in the database.
- **Session Revocation:** Password resets invalidate all active refresh tokens for that user across all devices.
- **Rate Limiting:** Multi-window rate limiters prevent brute-force attacks on login, registration, and OTP endpoints.
- **Security Headers:** `helmet` headers and strict CORS configuration with origin whitelisting.

---

## 🗺️ Roadmap & Next Milestone

- [x] **Milestone 1:** Foundation (Architecture, Database Schema, Full Auth Flow, Landing Page, Dashboard Skeleton, Docker Compose)
- [ ] **Milestone 2:** Candidate Profile & Resume Pipeline (PDF/DOCX upload, AI extraction, structured storage, inline editor)
- [ ] **Milestone 3:** Text-Mode Interview Engine (State machine, adaptive question generation, STAR evaluation)
- [ ] **Milestone 4:** Report & Targeted Learning Path (Multi-metric reports, weakness drills)
- [ ] **Milestone 5:** Voice Mode (STT / TTS streaming)
- [ ] **Milestone 6:** 3D Human-like Avatar (Ready Player Me + Three.js + Viseme lip-sync)

---

## 📄 License & Attribution
Author: Gautam Kumar Maurya ([@gkm563](https://github.com/gkm563))  
Built for students and job seekers worldwide.
