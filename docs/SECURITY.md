# IntervAI — Security & Compliance Standards

## 1. Authentication & Session Security
- **Password Storage**: Passwords hashed with `bcrypt` (work factor 12) or `argon2id`.
- **JWT Access Tokens**: Short-lived (15 minutes expiry) stored in frontend memory (never `localStorage`).
- **Refresh Tokens**: Long-lived (30 days expiry) stored in `HttpOnly`, `Secure`, `SameSite=Strict` cookies.
- **Anti-Enumeration**: Forgot password requests always return `200 OK` regardless of whether the email exists in the database.
- **Session Revocation**: Password reset immediately invalidates all existing refresh tokens across all active devices.
- **Rate Limiting**: Applied to `/login`, `/register`, `/forgot-password`, `/resend-otp`, and `/verify-email`.

## 2. Data Privacy
- Candidate resumes are kept private and isolated.
- Raw files in object storage are never made public.
- No resume data or interview transcripts are used for public model training without explicit consent.
