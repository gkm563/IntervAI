import { Router } from 'express';
import { notificationsController } from './notifications.controller';
import { requireAuth } from '../middleware/auth.middleware';

const router = Router();

// All notification endpoints require JWT Bearer authentication
router.use(requireAuth);

router.get('/', (req, res, next) => notificationsController.getNotifications(req, res, next));
router.patch('/read-all', (req, res, next) => notificationsController.markAllAsRead(req, res, next));
router.patch('/:id/read', (req, res, next) => notificationsController.markAsRead(req, res, next));
router.delete('/:id', (req, res, next) => notificationsController.deleteNotification(req, res, next));

export default router;
