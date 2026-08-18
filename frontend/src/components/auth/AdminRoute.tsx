import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ShieldAlert } from 'lucide-react';

export const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#070F22] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-rose-500/30 border-t-rose-500 rounded-full animate-spin"></div>
          <span className="text-xs text-slate-400 font-medium">Verifying Administrative Privileges...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // Gautam Kumar Maurya (gkm563) Master Super Admin or ADMIN role
  const isMasterAdmin = user.email === 'maurgk212104@gmail.com' || user.role === 'ADMIN';

  if (!isMasterAdmin) {
    return (
      <div className="min-h-screen bg-[#070F22] text-slate-100 flex items-center justify-center p-4">
        <div className="glass-card max-w-md w-full rounded-2xl p-8 border border-rose-500/40 text-center space-y-4 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400 mx-auto">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-white">403 — Unauthorized Access</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Administrative portal access is restricted to authorized IntervAI platform operators.
          </p>
          <a
            href="/dashboard"
            className="inline-block px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold transition-colors"
          >
            Return to Candidate Dashboard
          </a>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
