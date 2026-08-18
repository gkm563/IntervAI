import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  User,
  Mail,
  Lock,
  Bell,
  Shield,
  Save,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  const [fullName, setFullName] = useState(user?.fullName || 'Gautam Kumar Maurya');
  const [email] = useState(user?.email || 'maurgk212104@gmail.com');
  const [targetRole, setTargetRole] = useState(user?.targetRole || 'SDE-1 / Frontend Engineer');
  const [targetCompany, setTargetCompany] = useState(user?.targetCompany || 'Google / Amazon / Product Startups');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Account & Platform Settings
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Manage your candidate profile, security credentials, and AI interview preferences.
        </p>
      </div>

      {isSaved && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3 text-emerald-300 text-sm">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <span>Settings saved successfully!</span>
        </div>
      )}

      {/* Settings Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Col: Profile & Career Preferences */}
        <div className="lg:col-span-7 space-y-6">
          <form onSubmit={handleSave} className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-700/80 shadow-2xl space-y-6">
            <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <User className="w-4 h-4 text-sky-400" />
              Candidate Profile Information
            </h2>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-[#0B1B3A] border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1.5">Email Address (Verified)</label>
                <input
                  type="email"
                  disabled
                  value={email}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-400 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1.5">Target Job Title</label>
                <input
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  className="w-full bg-[#0B1B3A] border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1.5">Target Company Context</label>
                <input
                  type="text"
                  value={targetCompany}
                  onChange={(e) => setTargetCompany(e.target.value)}
                  className="w-full bg-[#0B1B3A] border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs shadow-md shadow-sky-500/20 transition-all cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Col: Security & Notifications */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Security & Sessions */}
          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Shield className="w-4 h-4 text-emerald-400" />
              Security & Authentication
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <div>
                  <div className="font-bold text-white">Password</div>
                  <div className="text-slate-400 text-[11px]">••••••••••••</div>
                </div>
                <button
                  onClick={() => alert('Password change form will open here.')}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-sky-400 border border-slate-700"
                >
                  Change
                </button>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <div>
                  <div className="font-bold text-white">2-Factor Authentication</div>
                  <div className="text-slate-400 text-[11px]">TOTP / Authenticator App (v2)</div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-500">Coming soon</span>
              </div>
            </div>
          </div>

          {/* Email Preferences */}
          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Bell className="w-4 h-4 text-amber-400" />
              Email Notifications
            </h3>

            <label className="flex items-start gap-3 text-xs text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded bg-slate-800 border-slate-700 text-sky-500 focus:ring-sky-500"
              />
              <div>
                <span className="font-semibold text-white">Interview Report Summaries</span>
                <p className="text-slate-400 text-[11px] mt-0.5">Receive summary PDF and improvement points after each mock session.</p>
              </div>
            </label>
          </div>

        </div>

      </div>
    </div>
  );
};
