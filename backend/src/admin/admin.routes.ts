import { Router } from 'express';
import { AdminController } from './admin.controller';
import { requireAdmin } from './admin.middleware';

const router = Router();

// All admin routes are guarded by requireAdmin (JWT + Admin Role / Master Email)
router.use(requireAdmin);

router.get('/metrics', AdminController.getMetrics);
router.get('/users', AdminController.listUsers);
router.patch('/users/:id/status', AdminController.updateUserStatus);
router.patch('/users/:id/role', AdminController.updateUserRole);
router.get('/audit-logs', AdminController.getAuditLogs);
router.post('/broadcast', AdminController.sendBroadcast);
router.get('/questions', AdminController.listQuestions);

export default router;
