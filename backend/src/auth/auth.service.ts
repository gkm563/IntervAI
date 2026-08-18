import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { config } from '../config';
import { query } from '../database/db';
import { emailService } from '../email/email.service';
import { notificationsService } from '../notifications/notifications.service';
import { AppError } from '../middleware/errorHandler';
import { TokenPayload, User, UserSanitized } from '../types';
import {
  ForgotPasswordDto,
  LoginDto,
  RegisterDto,
  ResendOtpDto,
  ResetPasswordDto,
  VerifyEmailDto,
} from './auth.dto';

export class AuthService {
  private hashToken(token: string): string {
    return crypto.createHash('sha256').update(token).digest('hex');
  }

  private generate6DigitOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  private sanitizeUser(user: User): UserSanitized {
    return {
      id: user.id,
      email: user.email,
      fullName: user.full_name,
      status: user.status,
      role: user.role,
      emailVerifiedAt: user.email_verified_at,
      avatarUrl: user.avatar_url,
      targetRole: user.target_role,
      targetCompany: user.target_company,
      createdAt: user.created_at,
    };
  }

  private createAccessToken(user: User): string {
    const payload: TokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };
    return jwt.sign(payload, config.jwt.accessSecret, {
      expiresIn: config.jwt.accessExpiresIn as any,
    });
  }

  private createRefreshToken(user: User): string {
    const payload: TokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };
    return jwt.sign(payload, config.jwt.refreshSecret, {
      expiresIn: config.jwt.refreshExpiresIn as any,
    });
  }

  async register(dto: RegisterDto): Promise<{ success: boolean; message: string; email: string }> {
    const existingUserRes = await query<User>('SELECT * FROM users WHERE LOWER(email) = LOWER($1)', [dto.email]);
    const existingUser = existingUserRes.rows[0];

    if (existingUser && existingUser.status === 'ACTIVE') {
      throw new AppError('An account with this email already exists. Please log in.', 409);
    }

    const passwordHash = await bcrypt.hash(dto.password, 12);
    let userId: string;

    if (existingUser && existingUser.status === 'UNVERIFIED') {
      userId = existingUser.id;
      await query(
        'UPDATE users SET password_hash = $1, full_name = $2, updated_at = NOW() WHERE id = $3',
        [passwordHash, dto.fullName, userId]
      );
    } else {
      userId = uuidv4();
      await query(
        `INSERT INTO users (id, email, password_hash, full_name, status, role, created_at, updated_at)
         VALUES ($1, $2, $3, $4, 'UNVERIFIED', 'USER', NOW(), NOW())`,
        [userId, dto.email.toLowerCase(), passwordHash, dto.fullName]
      );
    }

    // Generate 6-digit OTP (10 minute expiry)
    const otp = this.generate6DigitOtp();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await query(
      `INSERT INTO email_verifications (id, user_id, email, otp_code, expires_at, used, created_at)
       VALUES ($1, $2, $3, $4, $5, false, NOW())`,
      [uuidv4(), userId, dto.email.toLowerCase(), otp, expiresAt]
    );

    // Send email with OTP
    await emailService.sendVerificationOtp(dto.email.toLowerCase(), otp, dto.fullName);

    return {
      success: true,
      message: 'Account created. A 6-digit verification code has been sent to your email.',
      email: dto.email.toLowerCase(),
    };
  }

  async verifyEmail(dto: VerifyEmailDto): Promise<{ user: UserSanitized; accessToken: string; refreshToken: string }> {
    const otpRes = await query(
      `SELECT * FROM email_verifications
       WHERE LOWER(email) = LOWER($1) AND otp_code = $2 AND used = false`,
      [dto.email, dto.otp]
    );

    const otpRecord = otpRes.rows[0];
    if (!otpRecord) {
      throw new AppError('Invalid verification code. Please check and try again.', 400);
    }

    if (new Date() > new Date(otpRecord.expires_at)) {
      throw new AppError('Verification code has expired. Please request a new one.', 400);
    }

    // Mark OTP used
    await query('UPDATE email_verifications SET used = true WHERE id = $1', [otpRecord.id]);

    // Activate user
    const now = new Date();
    await query(
      `UPDATE users SET status = 'ACTIVE', email_verified_at = $1, updated_at = NOW() WHERE id = $2`,
      [now, otpRecord.user_id]
    );

    const userRes = await query<User>('SELECT * FROM users WHERE id = $1', [otpRecord.user_id]);
    const user = userRes.rows[0];
    if (!user) {
      throw new AppError('User not found', 404);
    }

    const accessToken = this.createAccessToken(user);
    const refreshToken = this.createRefreshToken(user);

    // Store refresh token
    const refreshTokenHash = this.hashToken(refreshToken);
    const refreshExpiresAt = new Date(Date.now() + config.jwt.refreshCookieMaxAgeMs);
    await query(
      `INSERT INTO refresh_tokens (id, user_id, token_hash, revoked, expires_at, created_at)
       VALUES ($1, $2, $3, false, $4, NOW())`,
      [uuidv4(), user.id, refreshTokenHash, refreshExpiresAt]
    );

    // Create initial welcome system notification
    await notificationsService.createNotification(
      user.id,
      'Welcome to IntervAI! 🎉',
      'Your email is verified. Upload your resume in the Resume tab to unlock personalized question generation.',
      'AUTH',
      '/dashboard/resume'
    );

    return {
      user: this.sanitizeUser(user),
      accessToken,
      refreshToken,
    };
  }

  async resendOtp(dto: ResendOtpDto): Promise<{ success: boolean; message: string }> {
    const userRes = await query<User>('SELECT * FROM users WHERE LOWER(email) = LOWER($1)', [dto.email]);
    const user = userRes.rows[0];

    if (!user) {
      // Don't disclose non-existence
      return { success: true, message: 'If an account exists, a new verification code has been sent.' };
    }

    if (user.status === 'ACTIVE') {
      return { success: true, message: 'This account is already verified. You may log in directly.' };
    }

    const otp = this.generate6DigitOtp();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await query(
      `INSERT INTO email_verifications (id, user_id, email, otp_code, expires_at, used, created_at)
       VALUES ($1, $2, $3, $4, $5, false, NOW())`,
      [uuidv4(), user.id, user.email, otp, expiresAt]
    );

    await emailService.sendVerificationOtp(user.email, otp, user.full_name);

    return {
      success: true,
      message: 'A new 6-digit verification code has been sent to your email.',
    };
  }

  async login(
    dto: LoginDto,
    userAgent?: string,
    ipAddress?: string
  ): Promise<{ user: UserSanitized; accessToken: string; refreshToken: string }> {
    const userRes = await query<User>('SELECT * FROM users WHERE LOWER(email) = LOWER($1)', [dto.email]);
    const user = userRes.rows[0];

    if (!user) {
      throw new AppError('Invalid email or password.', 401);
    }

    const isMatch = await bcrypt.compare(dto.password, user.password_hash);
    if (!isMatch) {
      throw new AppError('Invalid email or password.', 401);
    }

    if (user.status === 'UNVERIFIED') {
      // Auto-send fresh OTP and advise verification
      const otp = this.generate6DigitOtp();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
      await query(
        `INSERT INTO email_verifications (id, user_id, email, otp_code, expires_at, used, created_at)
         VALUES ($1, $2, $3, $4, $5, false, NOW())`,
        [uuidv4(), user.id, user.email, otp, expiresAt]
      );
      await emailService.sendVerificationOtp(user.email, otp, user.full_name);

      throw new AppError(
        'Your email address is not verified yet. We have sent a new verification code to your inbox.',
        403
      );
    }

    if (user.status === 'SUSPENDED') {
      throw new AppError('Your account has been suspended. Please contact support.', 403);
    }

    const accessToken = this.createAccessToken(user);
    const refreshToken = this.createRefreshToken(user);

    const refreshTokenHash = this.hashToken(refreshToken);
    const refreshExpiresAt = new Date(Date.now() + config.jwt.refreshCookieMaxAgeMs);

    await query(
      `INSERT INTO refresh_tokens (id, user_id, token_hash, revoked, expires_at, user_agent, ip_address, created_at)
       VALUES ($1, $2, $3, false, $4, $5, $6, NOW())`,
      [uuidv4(), user.id, refreshTokenHash, refreshExpiresAt, userAgent || null, ipAddress || null]
    );

    return {
      user: this.sanitizeUser(user),
      accessToken,
      refreshToken,
    };
  }

  async refresh(refreshToken: string): Promise<{ accessToken: string; user: UserSanitized }> {
    if (!refreshToken) {
      throw new AppError('Missing refresh token cookie.', 401);
    }

    let payload: TokenPayload;
    try {
      payload = jwt.verify(refreshToken, config.jwt.refreshSecret) as TokenPayload;
    } catch {
      throw new AppError('Invalid or expired refresh token. Please log in again.', 401);
    }

    const tokenHash = this.hashToken(refreshToken);
    const tokenRes = await query(
      `SELECT * FROM refresh_tokens WHERE token_hash = $1 AND revoked = false`,
      [tokenHash]
    );
    const storedToken = tokenRes.rows[0];

    if (!storedToken || new Date() > new Date(storedToken.expires_at)) {
      throw new AppError('Refresh token revoked or expired. Please log in again.', 401);
    }

    const userRes = await query<User>('SELECT * FROM users WHERE id = $1', [payload.userId]);
    const user = userRes.rows[0];

    if (!user || user.status !== 'ACTIVE') {
      throw new AppError('User not found or inactive.', 401);
    }

    const newAccessToken = this.createAccessToken(user);

    return {
      accessToken: newAccessToken,
      user: this.sanitizeUser(user),
    };
  }

  async logout(refreshToken?: string): Promise<{ success: boolean; message: string }> {
    if (refreshToken) {
      const tokenHash = this.hashToken(refreshToken);
      await query('UPDATE refresh_tokens SET revoked = true WHERE token_hash = $1', [tokenHash]);
    }
    return { success: true, message: 'Logged out successfully.' };
  }

  async forgotPassword(dto: ForgotPasswordDto): Promise<{ success: boolean; message: string }> {
    const userRes = await query<User>('SELECT * FROM users WHERE LOWER(email) = LOWER($1)', [dto.email]);
    const user = userRes.rows[0];

    // Anti-enumeration: always return same message
    if (user && user.status === 'ACTIVE') {
      const rawToken = crypto.randomBytes(32).toString('hex');
      const tokenHash = this.hashToken(rawToken);
      const expiresAt = new Date(Date.now() + 30 * 60 * 1000); // 30 mins

      await query(
        `INSERT INTO password_resets (id, user_id, email, token_hash, expires_at, used, created_at)
         VALUES ($1, $2, $3, $4, $5, false, NOW())`,
        [uuidv4(), user.id, user.email, tokenHash, expiresAt]
      );

      await emailService.sendPasswordResetLink(user.email, rawToken, user.full_name);
    }

    return {
      success: true,
      message: 'If an account exists with that email, a password reset link has been sent.',
    };
  }

  async resetPassword(dto: ResetPasswordDto): Promise<{ success: boolean; message: string }> {
    const tokenHash = this.hashToken(dto.token);

    const resetRes = await query(
      `SELECT * FROM password_resets
       WHERE LOWER(email) = LOWER($1) AND token_hash = $2 AND used = false`,
      [dto.email, tokenHash]
    );

    const resetRecord = resetRes.rows[0];
    if (!resetRecord) {
      throw new AppError('Invalid or expired password reset link.', 400);
    }

    if (new Date() > new Date(resetRecord.expires_at)) {
      throw new AppError('Password reset link has expired. Please request a new one.', 400);
    }

    const newPasswordHash = await bcrypt.hash(dto.newPassword, 12);

    // Update password
    await query('UPDATE users SET password_hash = $1, updated_at = NOW() WHERE id = $2', [
      newPasswordHash,
      resetRecord.user_id,
    ]);

    // Mark reset record used
    await query('UPDATE password_resets SET used = true WHERE id = $1', [resetRecord.id]);

    // Force re-login everywhere per Section 119.4 by invalidating all active refresh tokens
    await query('UPDATE refresh_tokens SET revoked = true WHERE user_id = $1', [resetRecord.user_id]);

    // Send security notification
    await notificationsService.createNotification(
      resetRecord.user_id,
      'Security Alert: Password Changed',
      'Your account password was successfully updated. All other active sessions have been signed out.',
      'AUTH'
    );

    return {
      success: true,
      message: 'Password reset successfully. Please log in with your new password.',
    };
  }

  async getMe(userId: string): Promise<UserSanitized> {
    const userRes = await query<User>('SELECT * FROM users WHERE id = $1', [userId]);
    const user = userRes.rows[0];
    if (!user) {
      throw new AppError('User profile not found.', 404);
    }
    return this.sanitizeUser(user);
  }
}

export const authService = new AuthService();
