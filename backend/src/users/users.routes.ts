import { Router, Response } from 'express';
import { requireAuth } from '../middleware/auth.middleware';
import { AuthenticatedRequest, UserDashboardStats } from '../types';
import { authService } from '../auth/auth.service';
import { query } from '../database/db';

const router = Router();

const asyncHandler = (fn: Function) => (req: any, res: any, next: any) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// GET /api/users/profile
router.get('/profile', requireAuth, asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) {
    res.status(401).json({ success: false, message: 'Unauthorized' });
    return;
  }
  const user = await authService.getMe(req.user.userId);
  res.status(200).json({ success: true, user });
}));

// GET /api/users/stats (Real user statistics — 0% for new accounts without dummy mock data)
router.get('/stats', requireAuth, asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) {
    res.status(401).json({ success: false, message: 'Unauthorized' });
    return;
  }

  const userId = req.user.userId;

  // Query actual completed interviews count
  const interviewRes = await query<{ count: string; avg_score: string }>(
    `SELECT COUNT(*) as count, AVG(overall_score) as avg_score FROM interviews WHERE user_id = $1 AND status = 'COMPLETED'`,
    [userId]
  );

  const completedCount = parseInt(interviewRes.rows[0]?.count || '0', 10);
  const avgScore = Math.round(parseFloat(interviewRes.rows[0]?.avg_score || '0'));

  // Query resume
  const resumeRes = await query<{ count: string }>(
    `SELECT COUNT(*) as count FROM resumes WHERE user_id = $1 AND is_active = true`,
    [userId]
  );
  const hasResume = parseInt(resumeRes.rows[0]?.count || '0', 10) > 0;

  let readinessLevel = 'Beginner (Uncalibrated)';
  if (completedCount > 0) {
    if (avgScore >= 85) readinessLevel = 'Level 3 (Senior Ready)';
    else if (avgScore >= 70) readinessLevel = 'Level 2 (Placement Calibrated)';
    else readinessLevel = 'Level 1 (Foundation)';
  }

  const stats: UserDashboardStats = {
    readinessScore: completedCount > 0 ? avgScore : 0,
    readinessLevel,
    interviewsCompleted: completedCount,
    totalQuestionsAnswered: completedCount * 5, // 0 if completedCount is 0
    weaknessesCount: 0,
    hasResume,
    activeDrillsCount: 0,
  };

  res.status(200).json({
    success: true,
    stats,
  });
}));

// PUT /api/users/profile
router.put('/profile', requireAuth, asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) {
    res.status(401).json({ success: false, message: 'Unauthorized' });
    return;
  }

  const { fullName, targetRole, targetCompany } = req.body;
  await query(
    `UPDATE users SET full_name = COALESCE($1, full_name), target_role = COALESCE($2, target_role), target_company = COALESCE($3, target_company), updated_at = NOW() WHERE id = $4`,
    [fullName, targetRole, targetCompany, req.user.userId]
  );

  const user = await authService.getMe(req.user.userId);
  res.status(200).json({ success: true, message: 'Profile updated successfully', user });
}));

export default router;
