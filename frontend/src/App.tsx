import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LandingPage } from './pages/LandingPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { VerifyEmailPage } from './pages/auth/VerifyEmailPage';
import { LoginPage } from './pages/auth/LoginPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/auth/ResetPasswordPage';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { OverviewPage } from './pages/dashboard/OverviewPage';
import { ResumePage } from './pages/dashboard/ResumePage';
import { InterviewsPage } from './pages/dashboard/InterviewsPage';
import { ReportsPage } from './pages/dashboard/ReportsPage';
import { PracticePage } from './pages/dashboard/PracticePage';
import { ProgressPage } from './pages/dashboard/ProgressPage';
import { SchedulePage } from './pages/dashboard/SchedulePage';
import { SettingsPage } from './pages/dashboard/SettingsPage';

// Protected Route Guard
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#070F22] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-sky-500/30 border-t-sky-400 rounded-full animate-spin"></div>
          <span className="text-xs text-slate-400 font-medium">Authenticating session...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// Public Only Route (redirects to /dashboard if already authenticated)
const PublicOnlyRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#070F22] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-sky-500/30 border-t-sky-400 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

import { ThemeProvider } from './context/ThemeContext';
import { GamificationProvider } from './context/GamificationContext';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <GamificationProvider>
        <AuthProvider>
          <Router>
            <Routes>
              {/* Public Marketing Landing Page */}
              <Route path="/" element={<LandingPage />} />

          {/* Authentication Routes */}
          <Route
            path="/register"
            element={
              <PublicOnlyRoute>
                <RegisterPage />
              </PublicOnlyRoute>
            }
          />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route
            path="/login"
            element={
              <PublicOnlyRoute>
                <LoginPage />
              </PublicOnlyRoute>
            }
          />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />

          {/* Protected Application Dashboard Routes (Section 122 & Milestone Plan) */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            {/* 1. Home Overview */}
            <Route index element={<OverviewPage />} />
            <Route path="overview" element={<OverviewPage />} />

            {/* 2. Resume & Profile (M2) */}
            <Route path="resume" element={<ResumePage />} />
            <Route path="profile" element={<ResumePage />} />

            {/* 3. Interviews Simulation Room (M3) */}
            <Route path="interviews" element={<InterviewsPage />} />

            {/* 4. Reports & Analytics (M4) */}
            <Route path="reports" element={<ReportsPage />} />

            {/* 5. Targeted Practice Drills (M4) */}
            <Route path="practice" element={<PracticePage />} />

            {/* 6. Readiness Progress & Longitudinal Memory (M8) */}
            <Route path="progress" element={<ProgressPage />} />

            {/* 7. Schedule & Mock Calendar */}
            <Route path="schedule" element={<SchedulePage />} />

            {/* 8. Account & Security Settings */}
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
    </GamificationProvider>
    </ThemeProvider>
  );
};

export default App;
