import React, { createContext, useContext, useEffect, useState } from 'react';
import { apiRequest, setAccessToken } from '../lib/api';
import { AuthResponse, User } from '../lib/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  register: (fullName: string, email: string, password: string, confirmPassword: string) => Promise<AuthResponse>;
  verifyEmail: (email: string, otp: string) => Promise<AuthResponse>;
  resendOtp: (email: string) => Promise<AuthResponse>;
  login: (email: string, password: string) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<AuthResponse>;
  resetPassword: (email: string, token: string, newPassword: string, confirmPassword: string) => Promise<AuthResponse>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const checkAuth = async () => {
    try {
      const data = await apiRequest<AuthResponse>('/api/auth/refresh', {
        method: 'POST',
        retryOn401: false,
      });
      if (data.accessToken && data.user) {
        setAccessToken(data.accessToken);
        setUser(data.user);
      } else {
        setAccessToken(null);
        setUser(null);
      }
    } catch {
      setAccessToken(null);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const register = async (fullName: string, email: string, password: string, confirmPassword: string) => {
    const data = await apiRequest<AuthResponse>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ fullName, email, password, confirmPassword }),
      skipAuth: true,
    });
    return data;
  };

  const verifyEmail = async (email: string, otp: string) => {
    const data = await apiRequest<AuthResponse>('/api/auth/verify-email', {
      method: 'POST',
      body: JSON.stringify({ email, otp }),
      skipAuth: true,
    });
    if (data.accessToken && data.user) {
      setAccessToken(data.accessToken);
      setUser(data.user);
    }
    return data;
  };

  const resendOtp = async (email: string) => {
    const data = await apiRequest<AuthResponse>('/api/auth/resend-otp', {
      method: 'POST',
      body: JSON.stringify({ email }),
      skipAuth: true,
    });
    return data;
  };

  const login = async (email: string, password: string) => {
    const data = await apiRequest<AuthResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      skipAuth: true,
    });
    if (data.accessToken && data.user) {
      setAccessToken(data.accessToken);
      setUser(data.user);
    }
    return data;
  };

  const logout = async () => {
    try {
      await apiRequest('/api/auth/logout', { method: 'POST' });
    } finally {
      setAccessToken(null);
      setUser(null);
    }
  };

  const forgotPassword = async (email: string) => {
    const data = await apiRequest<AuthResponse>('/api/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
      skipAuth: true,
    });
    return data;
  };

  const resetPassword = async (email: string, token: string, newPassword: string, confirmPassword: string) => {
    const data = await apiRequest<AuthResponse>('/api/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ email, token, newPassword, confirmPassword }),
      skipAuth: true,
    });
    return data;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        register,
        verifyEmail,
        resendOtp,
        login,
        logout,
        forgotPassword,
        resetPassword,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
