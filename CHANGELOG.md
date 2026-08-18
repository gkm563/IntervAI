# IntervAI — Changelog

All notable changes to the IntervAI platform will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Milestone 1: Foundation] - 2026-08-18

### Added
- **Repository Architecture Scaffold**: Established decoupled microservice architecture per Section 118 & 130 (`frontend/`, `backend/`, `ai-service/`, `infrastructure/`, `docs/`, `tests/`).
- **Database & SQL Migrations**:
  - Generated PostgreSQL 16 migration `001_initial_auth_schema.sql` with `pgvector` and `uuid-ossp` extensions.
  - Core authentication tables: `users`, `email_verifications`, `password_resets`, `refresh_tokens`.
  - Future milestone schema foundations: `profiles`, `resumes`, `interviews`, `interview_questions`, `interview_answers`, `answer_analysis`.
  - Automatic migration runner in `backend/src/database/migrator.ts`.
- **Core Backend Authentication Service (Node.js/TypeScript Express)**:
  - `POST /api/auth/register`: Password hashing via `bcrypt` (cost 12), 6-digit OTP generation, anti-duplicate checks.
  - `POST /api/auth/verify-email`: OTP code verification, user state transition to `ACTIVE`, JWT access token issuance (15m) + `httpOnly` `SameSite=Lax/Strict` refresh cookie (30d).
  - `POST /api/auth/resend-otp`: Rate-limited OTP re-issuance.
  - `POST /api/auth/login`: Credential verification, unverified account protection (403 + auto-dispatched OTP), JWT access token + refresh cookie.
  - `POST /api/auth/refresh`: Silent session rotation via `httpOnly` cookie.
  - `POST /api/auth/logout`: Refresh token revocation in database and cookie clearance.
  - `POST /api/auth/forgot-password`: Anti-enumeration 200 response, single-use hashed token with 30-min expiry.
  - `POST /api/auth/reset-password`: Token validation, password update, and global invalidation of all active user sessions.
  - `GET /api/auth/me`: Bearer-token protected candidate profile endpoint.
  - Multi-tier rate limiting via `express-rate-limit`, `helmet` security headers, and strict `zod` input validation.
  - Configurable email provider: Console logger for zero-friction local dev, Resend API, and standard SMTP.
- **Client Frontend Application (React 18 + Vite + TypeScript + Tailwind CSS)**:
  - High-performance, responsive landing page per Section 121:
    - Sticky navigation with brand identity, quick anchors, and auth shortcuts.
    - Hero section with trust badges, direct CTAs, and interactive interviewer preview.
    - Problem/Agitation cards mirroring real placement struggles.
    - 4-step visual "How It Works" pipeline.
    - Interactive 60-Second Sample Q&A Turn simulator with instant multi-metric AI scoring.
    - 6-card Feature Grid and Multi-modal Tab switch (Voice, 3D Avatar, Text Mode).
    - Report breakdown preview with relevance, clarity, depth, and STAR structure metrics.
    - Transparent pricing with ₹ INR / $ USD toggle (Free Student Tier vs Career Pro).
    - 8-question FAQ accordion and comprehensive SEO footer.
  - Full Authentication Pages:
    - `/register`: Registration with 4-level dynamic password strength bar.
    - `/verify-email`: 6-digit auto-advancing OTP input with paste support and 10-minute timer.
    - `/login`: Email & password sign-in with show/hide toggle and unverified redirect.
    - `/forgot-password`: Anti-enumeration reset request card.
    - `/reset-password`: Token-gated password update screen.
  - Protected Dashboard Skeleton per Section 122:
    - Top bar with notifications and user profile.
    - Left navigation sidebar (Home, Resume, Interviews, Reports, Practice, Progress, Schedule, Settings).
    - Placement Readiness score ring (74% Level 2).
    - "Start New Interview" configuration card with modality selector (Voice/Video/Text) and difficulty calibrations.
    - Empty state cards for resume upload and weakness drill previews.
- **AI Microservice Scaffold (Python FastAPI)**:
  - Microservice container in `ai-service/` with `/health` and `/api/v1/status` endpoints.
  - Structured service stubs for resume parsing, question generation, and STAR evaluation.
- **Infrastructure & Containerization**:
  - `docker-compose.yml` orchestrating PostgreSQL (`pgvector/pgvector:pg16`), backend, frontend, and ai-service.
  - Production Dockerfiles and Nginx reverse proxy configurations in `infrastructure/`.
  - GitHub Actions CI workflow in `.github/workflows/ci.yml`.
  - Comprehensive documentation suite in `docs/` (`ARCHITECTURE.md`, `API.md`, `DATABASE.md`, `AI.md`, `AVATAR.md`, `SEO_I18N.md`, `SECURITY.md`, `CONTRIBUTING.md`).
