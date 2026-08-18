import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types';
import { notificationsService } from './notifications.service';
import { AppError } from '../middleware/errorHandler';

export class NotificationsController {
  async getNotifications(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user?.userId) {
        throw new AppError('Unauthorized', 401);
      }

      const data = await notificationsService.getUserNotifications(req.user.userId);
      res.status(200).json({
        success: true,
        ...data,
      });
    } catch (err) {
      next(err);
    }
  }

  async markAsRead(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user?.userId) {
        throw new AppError('Unauthorized', 401);
      }

      const { id } = req.params;
      await notificationsService.markAsRead(req.user.userId, id);
      res.status(200).json({
        success: true,
        message: 'Notification marked as read.',
      });
    } catch (err) {
      next(err);
    }
  }

  async markAllAsRead(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user?.userId) {
        throw new AppError('Unauthorized', 401);
      }

      await notificationsService.markAllAsRead(req.user.userId);
      res.status(200).json({
        success: true,
        message: 'All notifications marked as read.',
      });
    } catch (err) {
      next(err);
    }
  }

  async deleteNotification(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user?.userId) {
        throw new AppError('Unauthorized', 401);
      }

      const { id } = req.params;
      await notificationsService.deleteNotification(req.user.userId, id);
      res.status(200).json({
        success: true,
        message: 'Notification deleted.',
      });
    } catch (err) {
      next(err);
    }
  }
}

export const notificationsController = new NotificationsController();
