import { Response } from 'express';
import { AuthenticatedRequest } from '../types';
import { AdminService } from './admin.service';

export class AdminController {
  static async getMetrics(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const data = await AdminService.getSystemMetrics();
      res.json({ success: true, ...data });
    } catch (err: any) {
      console.error('[Admin Metrics Error]', err.message);
      res.status(500).json({ success: false, error: 'Failed to retrieve system metrics.' });
    }
  }

  static async listUsers(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const search = (req.query.search as string) || '';
      const page = parseInt((req.query.page as string) || '1', 10);
      const limit = parseInt((req.query.limit as string) || '20', 10);

      const data = await AdminService.listUsers(search, page, limit);
      res.json({ success: true, ...data });
    } catch (err: any) {
      console.error('[Admin List Users Error]', err.message);
      res.status(500).json({ success: false, error: 'Failed to list candidates.' });
    }
  }

  static async updateUserStatus(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!['ACTIVE', 'UNVERIFIED', 'SUSPENDED'].includes(status)) {
        res.status(400).json({ success: false, error: 'Invalid user status.' });
        return;
      }

      const result = await AdminService.updateUserStatus(id, status, req.user?.email || 'admin');
      res.json(result);
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }

  static async updateUserRole(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { role } = req.body;

      if (!['USER', 'ADMIN', 'COACH'].includes(role)) {
        res.status(400).json({ success: false, error: 'Invalid user role.' });
        return;
      }

      const result = await AdminService.updateUserRole(id, role, req.user?.email || 'admin');
      res.json(result);
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }

  static async getAuditLogs(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const logs = await AdminService.getAuditLogs();
      res.json({ success: true, logs });
    } catch (err: any) {
      res.status(500).json({ success: false, error: 'Failed to fetch audit logs.' });
    }
  }

  static async sendBroadcast(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { title, message, type } = req.body;
      if (!title || !message) {
        res.status(400).json({ success: false, error: 'Title and message are required.' });
        return;
      }

      const result = await AdminService.sendBroadcast(
        title,
        message,
        type || 'SYSTEM',
        req.user?.email || 'admin'
      );
      res.json(result);
    } catch (err: any) {
      res.status(500).json({ success: false, error: 'Failed to send broadcast.' });
    }
  }

  static async listQuestions(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const questions = await AdminService.listQuestions();
      res.json({ success: true, questions });
    } catch (err: any) {
      res.status(500).json({ success: false, error: 'Failed to list question bank.' });
    }
  }
}
