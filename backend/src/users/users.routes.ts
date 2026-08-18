import { Router, Response } from 'express';
import { authenticateToken } from '../middleware/auth.middleware';
import { AuthenticatedRequest } from '../types';
import { authService } from '../auth/auth.service';

const router = Router();

const asyncHandler = (fn: Function) => (req: any, res: any, next: any) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// GET /api/users/profile
router.get('/profile', authenticateToken, asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) {
    res.status(401).json({ success: false, message: 'Unauthorized' });
    return;
  }
  const user = await authService.getMe(req.user.userId);
  res.status(200).json({ success: true, user });
}));

export default router;
