export type UserStatus = 'UNVERIFIED' | 'ACTIVE' | 'SUSPENDED';
export type UserRole = 'USER' | 'ADMIN' | 'COACH';

export interface User {
  id: string;
  email: string;
  fullName: string;
  status: UserStatus;
  role: UserRole;
  emailVerifiedAt: string | null;
  avatarUrl: string | null;
  targetRole?: string | null;
  targetCompany?: string | null;
  createdAt: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  accessToken?: string;
  user?: User;
  email?: string;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: any[];
}

export type NotificationType = 'AUTH' | 'SYSTEM' | 'INTERVIEW' | 'PRACTICE';

export interface NotificationItem {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: NotificationType;
  is_read: boolean;
  link_url?: string | null;
  created_at: string;
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

