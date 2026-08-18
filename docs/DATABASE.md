# IntervAI — Database Schema & Migration Strategy

## 1. Overview
IntervAI uses **PostgreSQL 16+** with the **`pgvector`** extension for semantic embeddings and vector similarity search.

Hosted provider: **Supabase Free Tier** (500MB DB, pgvector included, 50k MAU).
Local development: Docker Compose `pgvector/pgvector:pg16` or zero-config local storage adapter.

---

## 2. Core Entities

```text
User (users)
 ├── Email Verification (email_verifications)
 ├── Password Reset (password_resets)
 ├── Refresh Tokens (refresh_tokens)
 ├── Candidate Profile (profiles)
 ├── Resumes (resumes)
 │    └── Resume Sections (resume_sections) [embeddings: vector(1536)]
 ├── Target Roles & Companies (target_roles, target_companies)
 ├── Job Descriptions (job_descriptions)
 ├── Interviews (interviews)
 │    ├── Questions (interview_questions)
 │    │    └── Answers (interview_answers)
 │    │         ├── Content Analysis (answer_analysis)
 │    │         ├── Speech Analysis (speech_analysis)
 │    │         └── Video Analysis (video_analysis)
 │    └── Report (interview_reports)
 ├── Memories & Notes (memories) [embeddings: vector(1536)]
 ├── Weaknesses & Strengths (weaknesses, strengths)
 └── Practice Sessions (practice_sessions)
```

---

## 3. Milestone 1 Tables

### `users`
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | UUID | PRIMARY KEY DEFAULT gen_random_uuid() | Unique user ID |
| `email` | VARCHAR(255) | UNIQUE NOT NULL | User email address |
| `password_hash` | VARCHAR(255) | NOT NULL | Bcrypt / Argon2 hash |
| `full_name` | VARCHAR(255) | NOT NULL | Candidate full name |
| `status` | VARCHAR(50) | DEFAULT 'UNVERIFIED' | UNVERIFIED, ACTIVE, SUSPENDED |
| `email_verified_at` | TIMESTAMPTZ | NULL | Timestamp of verification |
| `avatar_url` | TEXT | NULL | Profile image URL |
| `role` | VARCHAR(50) | DEFAULT 'USER' | USER, ADMIN |
| `created_at` | TIMESTAMPTZ | DEFAULT NOW() | Record creation |
| `updated_at` | TIMESTAMPTZ | DEFAULT NOW() | Record last update |

### `email_verifications`
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | UUID | PRIMARY KEY DEFAULT gen_random_uuid() | OTP record ID |
| `user_id` | UUID | REFERENCES users(id) ON DELETE CASCADE | Target user |
| `email` | VARCHAR(255) | NOT NULL | Email sent to |
| `otp_code` | VARCHAR(10) | NOT NULL | 6-digit code |
| `expires_at` | TIMESTAMPTZ | NOT NULL | Expiration timestamp |
| `used` | BOOLEAN | DEFAULT FALSE | One-time usage flag |
| `created_at` | TIMESTAMPTZ | DEFAULT NOW() | Timestamp created |

### `password_resets`
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | UUID | PRIMARY KEY DEFAULT gen_random_uuid() | Reset request ID |
| `user_id` | UUID | REFERENCES users(id) ON DELETE CASCADE | Target user |
| `email` | VARCHAR(255) | NOT NULL | Target email |
| `token_hash` | VARCHAR(255) | NOT NULL | SHA-256 / bcrypt token hash |
| `expires_at` | TIMESTAMPTZ | NOT NULL | Expiration timestamp |
| `used` | BOOLEAN | DEFAULT FALSE | Used status flag |
| `created_at` | TIMESTAMPTZ | DEFAULT NOW() | Timestamp created |

### `refresh_tokens`
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | UUID | PRIMARY KEY DEFAULT gen_random_uuid() | Token ID |
| `user_id` | UUID | REFERENCES users(id) ON DELETE CASCADE | Target user |
| `token_hash` | VARCHAR(255) | NOT NULL | Hashed refresh token |
| `revoked` | BOOLEAN | DEFAULT FALSE | Revocation flag |
| `expires_at` | TIMESTAMPTZ | NOT NULL | Token expiration |
| `created_at` | TIMESTAMPTZ | DEFAULT NOW() | Timestamp created |
