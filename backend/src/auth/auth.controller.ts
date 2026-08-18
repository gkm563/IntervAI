import { CookieOptions, Request, Response } from 'express';
import { config } from '../config';
import { AuthenticatedRequest } from '../types';
import {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resendOtpSchema,
  resetPasswordSchema,
  verifyEmailSchema,
} from './auth.dto';
import { authService } from './auth.service';

const REFRESH_COOKIE_NAME = 'refreshToken';

const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: config.isProduction,
  sameSite: config.isProduction ? 'strict' : 'lax',
  maxAge: config.jwt.refreshCookieMaxAgeMs,
  path: '/',
};

export class AuthController {
  async register(req: Request, res: Response): Promise<void> {
    const validated = registerSchema.parse(req.body);
    const result = await authService.register(validated);
    res.status(201).json(result);
  }

  async verifyEmail(req: Request, res: Response): Promise<void> {
    const validated = verifyEmailSchema.parse(req.body);
    const result = await authService.verifyEmail(validated);

    // Set httpOnly refresh cookie
    res.cookie(REFRESH_COOKIE_NAME, result.refreshToken, cookieOptions);

    res.status(200).json({
      success: true,
      message: 'Email verified successfully.',
      accessToken: result.accessToken,
      user: result.user,
    });
  }

  async resendOtp(req: Request, res: Response): Promise<void> {
    const validated = resendOtpSchema.parse(req.body);
    const result = await authService.resendOtp(validated);
    res.status(200).json(result);
  }

  async login(req: Request, res: Response): Promise<void> {
    const validated = loginSchema.parse(req.body);
    const userAgent = req.headers['user-agent'];
    const ipAddress = req.ip || req.socket.remoteAddress;

    const result = await authService.login(validated, userAgent, ipAddress);

    // Set httpOnly refresh cookie
    res.cookie(REFRESH_COOKIE_NAME, result.refreshToken, cookieOptions);

    res.status(200).json({
      success: true,
      message: 'Login successful.',
      accessToken: result.accessToken,
      user: result.user,
    });
  }

  async refresh(req: Request, res: Response): Promise<void> {
    const refreshToken = req.cookies[REFRESH_COOKIE_NAME];
    const result = await authService.refresh(refreshToken);
    res.status(200).json({
      success: true,
      accessToken: result.accessToken,
      user: result.user,
    });
  }

  async logout(req: Request, res: Response): Promise<void> {
    const refreshToken = req.cookies[REFRESH_COOKIE_NAME];
    const result = await authService.logout(refreshToken);

    res.clearCookie(REFRESH_COOKIE_NAME, {
      httpOnly: true,
      secure: config.isProduction,
      sameSite: config.isProduction ? 'strict' : 'lax',
      path: '/',
    });

    res.status(200).json(result);
  }

  async forgotPassword(req: Request, res: Response): Promise<void> {
    const validated = forgotPasswordSchema.parse(req.body);
    const result = await authService.forgotPassword(validated);
    res.status(200).json(result);
  }

  async resetPassword(req: Request, res: Response): Promise<void> {
    const validated = resetPasswordSchema.parse(req.body);
    const result = await authService.resetPassword(validated);
    res.status(200).json(result);
  }

  async getMe(req: AuthenticatedRequest, res: Response): Promise<void> {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Unauthorized' });
      return;
    }
    const user = await authService.getMe(req.user.userId);
    res.status(200).json({
      success: true,
      user,
    });
  }
}

export const authController = new AuthController();
