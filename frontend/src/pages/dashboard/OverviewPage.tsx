import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  TrendingUp,
  PlusCircle,
  Mic,
  Video,
  MessageSquare,
  ChevronRight,
  Zap,
  FileText,
  Target,
  ArrowUpRight,
  Sparkles,
  Award,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const OverviewPage: React.FC = () => {
  const { user } = useAuth();
  const [interviewMode, setInterviewMode] = useState<'VOICE' | 'VIDEO' | 'TEXT'>('VOICE');
  const [targetRole, setTargetRole] = useState('Frontend Engineer (React / TypeScript)');
  const [difficulty, setDifficulty] = useState('MEDIUM');

  return (
    <div className="space-y-8">
      {/* Welcome Banner & Readiness Ring */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center glass-card rounded-2xl p-6 sm:p-8 border border-slate-700/80 shadow-2xl">
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
        <div className="lg:col-span-4 bg-slate-900/90 rounded-2xl p-5 border border-slate-800 flex items-center justify-between gap-4">
          <div>
            <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Placement Readiness</div>
            <div className="text-3xl font-black text-sky-400 mt-1">74%</div>
            <div className="text-[11px] text-emerald-400 font-medium mt-0.5 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>+8% this week</span>
            </div>
          </div>
          <div className="w-16 h-16 rounded-full border-4 border-slate-800 border-t-sky-400 border-r-teal-400 flex items-center justify-center text-xs font-bold text-white shadow-inner">
            Level 2
          </div>
        </div>
      </div>

      {/* Primary Action: Start New Interview Card */}
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

          <Link
            to="/dashboard/interviews"
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-sky-500/20 transition-all"
          >
            <span>Start Session</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* 3-Column Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 1. Resume Quick Card */}
        <Link
          to="/dashboard/resume"
          className="glass-card rounded-2xl p-6 border border-slate-800 flex flex-col justify-between space-y-4 glass-card-hover group"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-white uppercase tracking-wider">Resume Pipeline</span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
                Milestone 2
              </span>
            </div>
            <h3 className="text-sm font-bold text-slate-200 mb-1 group-hover:text-sky-300 transition-colors">
              Upload Your Resume
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Upload your PDF/DOCX to unlock custom question generation based on your exact projects.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-dashed border-slate-700 bg-slate-900/50 text-center text-xs text-slate-400 group-hover:border-sky-500/50 transition-colors">
            <FileText className="w-6 h-6 text-slate-500 mx-auto mb-1.5 group-hover:text-sky-400 transition-colors" />
            <span>Drag & drop resume PDF (Max 5MB)</span>
          </div>
        </Link>

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
            <Link
              to="/dashboard/practice"
              className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-sky-400 border border-slate-700 transition-colors"
            >
              <span>Practice 3 Targeted Questions</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
