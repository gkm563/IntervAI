# IntervAI — API Documentation

## Base URL
- Development: `http://localhost:4000/api`
- Production: `https://api.intervai.com/api` (or environment-configured API gateway)

---

## Authentication Endpoints (`/api/auth`)

### 1. Register User
- **Method**: `POST`
- **Path**: `/api/auth/register`
- **Rate Limit**: 10 requests / 15 minutes per IP
- **Request Body**:
```json
{
  "fullName": "Gautam Kumar Maurya",
  "email": "user@example.com",
  "password": "StrongPassword123!",
  "confirmPassword": "StrongPassword123!"
}
```
- **Response `201 Created`**:
```json
{
  "success": true,
  "message": "Account created. A 6-digit verification code has been sent to your email.",
  "email": "user@example.com"
}
```

---

### 2. Verify Email (OTP)
- **Method**: `POST`
- **Path**: `/api/auth/verify-email`
- **Rate Limit**: 10 requests / 15 minutes
- **Request Body**:
```json
{
  "email": "user@example.com",
  "otp": "123456"
}
```
- **Response `200 OK`**:
```json
{
  "success": true,
  "message": "Email verified successfully.",
  "accessToken": "eyJhbGciOi...",
  "user": {
    "id": "c1f7a220-3b02-4d1a-8c43-85f0cf49b389",
    "email": "user@example.com",
    "fullName": "Gautam Kumar Maurya",
    "status": "ACTIVE",
    "role": "USER",
    "emailVerifiedAt": "2026-08-18T12:00:00.000Z"
  }
}
```
*(Also sets `refreshToken` httpOnly cookie: `SameSite=Strict; HttpOnly; Path=/api/auth`)*

---

### 3. Resend Verification OTP
- **Method**: `POST`
- **Path**: `/api/auth/resend-otp`
- **Rate Limit**: 3 requests / 5 minutes
- **Request Body**:
```json
{
  "email": "user@example.com"
}
```
- **Response `200 OK`**:
```json
{
  "success": true,
  "message": "New verification code sent."
}
```

---

### 4. Login
- **Method**: `POST`
- **Path**: `/api/auth/login`
- **Rate Limit**: 5 requests / minute
- **Request Body**:
```json
{
  "email": "user@example.com",
  "password": "StrongPassword123!"
}
```
- **Response `200 OK`**:
```json
{
  "success": true,
  "message": "Login successful.",
  "accessToken": "eyJhbGciOi...",
  "user": {
    "id": "c1f7a220-3b02-4d1a-8c43-85f0cf49b389",
    "email": "user@example.com",
    "fullName": "Gautam Kumar Maurya",
    "status": "ACTIVE",
    "role": "USER"
  }
}
```

---

### 5. Silent Token Refresh
- **Method**: `POST`
- **Path**: `/api/auth/refresh`
- **Headers**: Cookie `refreshToken=...`
- **Response `200 OK`**:
```json
{
  "success": true,
  "accessToken": "eyJhbGciOi...",
  "user": { ... }
}
```

---

### 6. Logout
- **Method**: `POST`
- **Path**: `/api/auth/logout`
- **Response `200 OK`**:
```json
{
  "success": true,
  "message": "Logged out successfully."
}
```

---

### 7. Forgot Password
- **Method**: `POST`
- **Path**: `/api/auth/forgot-password`
- **Rate Limit**: 5 requests / 15 minutes
- **Request Body**:
```json
{
  "email": "user@example.com"
}
```
- **Response `200 OK`** (Anti-enumeration: always returns 200 regardless of email existence):
```json
{
  "success": true,
  "message": "If an account exists with that email, a password reset link has been sent."
}
```

---

### 8. Reset Password
- **Method**: `POST`
- **Path**: `/api/auth/reset-password`
- **Request Body**:
```json
{
  "email": "user@example.com",
  "token": "a4f891...",
  "newPassword": "BrandNewPassword123!",
  "confirmPassword": "BrandNewPassword123!"
}
```
- **Response `200 OK`**:
```json
{
  "success": true,
  "message": "Password reset successfully. Please log in with your new password."
}
```

---

### 9. Get Current User (`/api/auth/me`)
- **Method**: `GET`
- **Path**: `/api/auth/me`
- **Headers**: `Authorization: Bearer <accessToken>`
- **Response `200 OK`**:
```json
{
  "success": true,
  "user": {
    "id": "c1f7a220-3b02-4d1a-8c43-85f0cf49b389",
    "email": "user@example.com",
    "fullName": "Gautam Kumar Maurya",
    "status": "ACTIVE",
    "role": "USER"
  }
}
```
