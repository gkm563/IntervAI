import { Router } from 'express';
import { authenticateToken } from '../middleware/auth.middleware';
import {
  authRateLimiter,
  forgotPasswordRateLimiter,
  loginRateLimiter,
} from '../middleware/rateLimiter';
import { authController } from './auth.controller';

const router = Router();

// Wrapper to catch async errors cleanly in Express
const asyncHandler = (fn: Function) => (req: any, res: any, next: any) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// 1. Register & Email Verification Flow (Section 119.2)
router.post('/register', authRateLimiter, asyncHandler(authController.register.bind(authController)));
router.post('/verify-email', authRateLimiter, asyncHandler(authController.verifyEmail.bind(authController)));
router.post('/resend-otp', authRateLimiter, asyncHandler(authController.resendOtp.bind(authController)));

// 2. Login & Session Flow (Section 119.3)
router.post('/login', loginRateLimiter, asyncHandler(authController.login.bind(authController)));
router.post('/refresh', asyncHandler(authController.refresh.bind(authController)));
router.post('/logout', asyncHandler(authController.logout.bind(authController)));

// 3. Password Reset Flow (Section 119.4)
router.post('/forgot-password', forgotPasswordRateLimiter, asyncHandler(authController.forgotPassword.bind(authController)));
router.post('/reset-password', forgotPasswordRateLimiter, asyncHandler(authController.resetPassword.bind(authController)));

// 4. Authenticated Profile Endpoint
router.get('/me', authenticateToken, asyncHandler(authController.getMe.bind(authController)));

export default router;
