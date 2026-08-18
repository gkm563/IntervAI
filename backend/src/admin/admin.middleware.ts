import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types';
import { authenticateToken } from '../middleware/auth.middleware';
import { query } from '../database/db';

export async function requireAdmin(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  // First run standard JWT authentication
  authenticateToken(req, res, async () => {
    try {
      if (!req.user || !req.user.userId) {
        res.status(401).json({
          success: false,
          error: 'Authentication required for administrative access.',
        });
        return;
      }

      // Master Super Admin Override for Gautam Kumar Maurya (gkm563)
      if (req.user.email === 'maurgk212104@gmail.com') {
        next();
        return;
      }

      // Check DB role
      const userRes = await query('SELECT role, status FROM users WHERE id = $1', [
        req.user.userId,
      ]);

      if (userRes.rows.length === 0) {
        res.status(401).json({
          success: false,
          error: 'User account not found.',
        });
        return;
      }

      const dbUser = userRes.rows[0];

      if (dbUser.status === 'SUSPENDED') {
        res.status(403).json({
          success: false,
          error: 'Account suspended. Administrative privileges revoked.',
        });
        return;
      }

      if (dbUser.role !== 'ADMIN') {
        res.status(403).json({
          success: false,
          error: 'Access denied: Requires ADMIN role privileges.',
        });
        return;
      }

      next();
    } catch (err: any) {
      console.error('[Admin Auth Error]', err.message);
      res.status(500).json({
        success: false,
        error: 'Internal server error validating administrative credentials.',
      });
    }
  });
}
