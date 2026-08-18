import { v4 as uuidv4 } from 'uuid';
import { query } from '../database/db';
import { Notification, NotificationType } from '../types';

export class NotificationsService {
  async createNotification(
    userId: string,
    title: string,
    message: string,
    type: NotificationType = 'SYSTEM',
    linkUrl?: string
  ): Promise<Notification> {
    const id = uuidv4();
    const res = await query<Notification>(
      `INSERT INTO notifications (id, user_id, title, message, type, link_url, is_read, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, false, NOW())
       RETURNING *`,
      [id, userId, title, message, type, linkUrl || null]
    );

    return res.rows[0] || {
      id,
      user_id: userId,
      title,
      message,
      type,
      link_url: linkUrl || null,
      is_read: false,
      created_at: new Date(),
    };
  }

  async getUserNotifications(userId: string): Promise<{ notifications: Notification[]; unreadCount: number }> {
    const res = await query<Notification>(
      `SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC LIMIT 50`,
      [userId]
    );

    const countRes = await query<{ count: string }>(
      `SELECT COUNT(*) as count FROM notifications WHERE user_id = $1 AND is_read = false`,
      [userId]
    );

    const unreadCount = parseInt(countRes.rows[0]?.count || '0', 10);

    return {
      notifications: res.rows,
      unreadCount,
    };
  }

  async markAsRead(userId: string, notificationId: string): Promise<boolean> {
    await query(
      `UPDATE notifications SET is_read = true WHERE id = $1 AND user_id = $2`,
      [notificationId, userId]
    );
    return true;
  }

  async markAllAsRead(userId: string): Promise<boolean> {
    await query(
      `UPDATE notifications SET is_read = true WHERE user_id = $1`,
      [userId]
    );
    return true;
  }

  async deleteNotification(userId: string, notificationId: string): Promise<boolean> {
    await query(
      `DELETE FROM notifications WHERE id = $1 AND user_id = $2`,
      [notificationId, userId]
    );
    return true;
  }
}

export const notificationsService = new NotificationsService();
