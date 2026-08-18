import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Bot,
  Home,
  FileText,
  Video,
  Mic,
  MessageSquare,
  Award,
  BookOpen,
  TrendingUp,
  Calendar,
  Settings,
  LogOut,
  Sparkles,
  PlusCircle,
  Bell,
  Search,
  ChevronRight,
  Target,
  ArrowUpRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'home' | 'resume' | 'interviews' | 'reports' | 'practice' | 'progress' | 'schedule' | 'settings'>('home');
  const [interviewMode, setInterviewMode] = useState<'VOICE' | 'VIDEO' | 'TEXT'>('VOICE');
  const [targetRole, setTargetRole] = useState('Frontend Engineer (React / TypeScript)');
  const [difficulty, setDifficulty] = useState('MEDIUM');

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const navItems = [
    { id: 'home', label: 'Home Overview', icon: Home },
    { id: 'resume', label: 'Resume & Profile', icon: FileText, badge: 'M2' },
    { id: 'interviews', label: 'Interviews', icon: Video, badge: 'M3' },
    { id: 'reports', label: 'Reports & Analytics', icon: Award, badge: 'M4' },
    { id: 'practice', label: 'Practice Drills', icon: BookOpen, badge: 'M4' },
    { id: 'progress', label: 'Readiness Progress', icon: TrendingUp, badge: 'M8' },
    { id: 'schedule', label: 'Schedule & Calendar', icon: Calendar },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#070F22] text-slate-100 flex flex-col">
      {/* Top Bar (Section 122.1) */}
      <header className="sticky top-0 z-40 bg-[#0B1B3A] border-b border-slate-800 px-4 sm:px-8 h-16 flex items-center justify-between">
        {/* Left: Brand */}
        <div className="flex items-center gap-6">
          <Link to="/dashboard" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-indigo-600 flex items-center justify-center shadow-md">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-extrabold tracking-tight text-white font-['Plus_Jakarta_Sans',sans-serif]">
              Interv<span className="text-sky-400">AI</span>
            </span>
          </Link>

          {/* Quick Search */}
          <div className="hidden md:flex items-center relative">
            <Search className="w-4 h-4 absolute left-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search past questions, skills, notes..."
              className="bg-slate-900/90 border border-slate-700/80 rounded-lg pl-9 pr-4 py-1.5 text-xs text-slate-200 placeholder-slate-500 w-64 focus:outline-none focus:ring-1 focus:ring-sky-500"
            />
          </div>
        </div>

        {/* Right: Notifications & User Profile */}
        <div className="flex items-center gap-4">
          <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors relative" title="Notifications">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-sky-400"></span>
          </button>

          <div className="flex items-center gap-3 pl-2 border-l border-slate-800">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white shadow-sm">
              {user?.fullName?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-xs font-bold text-white leading-tight">{user?.fullName || 'Candidate'}</div>
              <div className="text-[10px] text-sky-400 font-medium">{user?.email}</div>
            </div>

            <button
              onClick={handleLogout}
              className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors ml-1"
              title="Log out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main App Grid */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar (Section 122.1) */}
        <aside className="w-64 bg-[#09152E] border-r border-slate-800 p-4 hidden lg:flex flex-col justify-between">
          <div className="space-y-1">
            <div className="px-3 py-2 text-[10px] uppercase font-bold text-slate-500 tracking-wider">
              Navigation
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-sky-500/15 text-sky-400 border border-sky-500/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-sky-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Sidebar Pro Banner */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-sky-950/40 to-indigo-950/40 border border-sky-800/30 text-xs space-y-2">
            <div className="flex items-center gap-1.5 text-sky-400 font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Milestone 1 Active</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Authentication and foundation established. Ready for Milestone 2 (Resume Pipeline).
            </p>
          </div>
        </aside>

        {/* Main Content Dashboard Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-8">
          
          {/* Welcome Banner & Readiness Ring */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center glass-card rounded-2xl p-6 sm:p-8 border border-slate-700/80">
            <div className="lg:col-span-8 space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Account Verified & Active</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                Welcome back, {user?.fullName || 'Candidate'}!
              </h1>
              <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
                Your AI interview workspace is active. Complete your resume upload and launch targeted mock interview sessions to build interview confidence.
              </p>
            </div>

            {/* Readiness Score Widget */}
            <div className="lg:col-span-4 bg-slate-900/90 rounded-xl p-5 border border-slate-800 flex items-center justify-between gap-4">
              <div>
                <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Placement Readiness</div>
                <div className="text-3xl font-black text-sky-400 mt-1">74%</div>
                <div className="text-[11px] text-emerald-400 font-medium mt-0.5 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>+8% this week</span>
                </div>
              </div>
              <div className="w-16 h-16 rounded-full border-4 border-slate-800 border-t-sky-400 border-r-teal-400 flex items-center justify-center text-xs font-bold text-white">
                Level 2
              </div>
            </div>
          </div>

          {/* Primary Action: Start New Interview Card (Section 122.1) */}
          <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-700/80 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <PlusCircle className="w-5 h-5 text-sky-400" />
                  Launch New AI Mock Interview
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Configure role calibration and interview modality for your upcoming session.
                </p>
              </div>

              {/* Mode Selector */}
              <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold">
                <button
                  onClick={() => setInterviewMode('VOICE')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                    interviewMode === 'VOICE' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Mic className="w-3.5 h-3.5" />
                  Voice
                </button>
                <button
                  onClick={() => setInterviewMode('VIDEO')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                    interviewMode === 'VIDEO' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Video className="w-3.5 h-3.5" />
                  3D Avatar
                </button>
                <button
                  onClick={() => setInterviewMode('TEXT')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                    interviewMode === 'TEXT' ? 'bg-teal-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  Text
                </button>
              </div>
            </div>

            {/* Quick Calibration Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Target Job Role</label>
                <input
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  className="w-full bg-[#0B1B3A] border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Difficulty Calibration</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full bg-[#0B1B3A] border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-sky-500"
                >
                  <option value="EASY">Entry / Fresher Level</option>
                  <option value="MEDIUM">Mid-Level (SDE-1 / SDE-2)</option>
                  <option value="HARD">Senior / Staff Level Pressure</option>
                </select>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-400 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Text Mode active for Milestone 1 foundation</span>
              </span>

              <button
                onClick={() => alert('Milestone 1 foundation active! Full AI Interview State Machine & Session turns connect in Milestone 3.')}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-sky-500/20 transition-all cursor-pointer"
              >
                <span>Start Session</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 3-Column Dashboard Sections: Empty State, Weakness Radar, Recommended Practice */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* 1. Resume Quick Card (Section 122.2 Empty State) */}
            <div className="glass-card rounded-2xl p-6 border border-slate-800 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">Resume Pipeline</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
                    Milestone 2
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-200 mb-1">No Resume Uploaded Yet</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Upload your PDF/DOCX to unlock custom question generation based on your exact projects.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-dashed border-slate-700 bg-slate-900/50 text-center text-xs text-slate-400 hover:border-sky-500/50 cursor-pointer transition-colors">
                <FileText className="w-6 h-6 text-slate-500 mx-auto mb-1.5" />
                <span>Drag & drop resume PDF (Max 5MB)</span>
              </div>
            </div>

            {/* 2. Weakness & Strengths Card */}
            <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white uppercase tracking-wider">Top Weaknesses Detected</span>
                <Target className="w-4 h-4 text-amber-400" />
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 flex items-start gap-2">
                  <span className="text-amber-400">•</span>
                  <span><strong>STAR Framing:</strong> Missing quantified metrics in project delivery answers.</span>
                </li>
                <li className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 flex items-start gap-2">
                  <span className="text-amber-400">•</span>
                  <span><strong>Distributed DBs:</strong> Sharding vs Partitioning explanation depth.</span>
                </li>
              </ul>
            </div>

            {/* 3. Recommended Practice Today */}
            <div className="glass-card rounded-2xl p-6 border border-slate-800 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-xs font-bold text-white uppercase tracking-wider">Today&apos;s Recommended Drill</span>
                <h3 className="text-sm font-bold text-slate-200 mt-2 mb-1">State Management & Cache Invalidation</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  10-minute rapid drill focusing on cache consistency trade-offs.
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => alert('Drills will activate in Milestone 4.')}
                  className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-sky-400 border border-slate-700 transition-colors"
                >
                  <span>Practice 3 Targeted Questions</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

        </main>
      </div>
    </div>
  );
};
