import { Request } from 'express';

export type UserStatus = 'UNVERIFIED' | 'ACTIVE' | 'SUSPENDED';
export type UserRole = 'USER' | 'ADMIN' | 'COACH';

export interface User {
  id: string;
  email: string;
  password_hash: string;
  full_name: string;
  status: UserStatus;
  email_verified_at: Date | null;
  avatar_url: string | null;
  role: UserRole;
  target_role?: string | null;
  target_company?: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface UserSanitized {
  id: string;
  email: string;
  fullName: string;
  status: UserStatus;
  role: UserRole;
  emailVerifiedAt: Date | null;
  avatarUrl: string | null;
  targetRole?: string | null;
  targetCompany?: string | null;
  createdAt: Date;
}

export interface TokenPayload {
  userId: string;
  email: string;
  role: UserRole;
}

export interface AuthenticatedRequest extends Request {
  user?: TokenPayload;
}

export type NotificationType = 'AUTH' | 'SYSTEM' | 'INTERVIEW' | 'PRACTICE';

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: NotificationType;
  is_read: boolean;
  link_url?: string | null;
  created_at: Date;
}

export interface UserDashboardStats {
  readinessScore: number;
  readinessLevel: string;
  interviewsCompleted: number;
  totalQuestionsAnswered: number;
  weaknessesCount: number;
  hasResume: boolean;
  activeDrillsCount: number;
}

export interface AdminAuditLog {
  id: string;
  admin_id: string;
  admin_email: string;
  action: string;
  target_resource?: string;
  details?: string;
  ip_address?: string;
  created_at: Date;
}

export interface AdminQuestion {
  id: string;
  title: string;
  category: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  question: string;
  focus: string;
  xp_reward: number;
  created_at: Date;
}


