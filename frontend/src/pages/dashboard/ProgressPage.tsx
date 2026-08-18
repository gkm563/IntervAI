import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  Sparkles,
  Award,
  BrainCircuit,
  Zap,
  Play,
  Inbox,
} from 'lucide-react';
import { apiRequest } from '../../lib/api';
import { UserDashboardStats } from '../../lib/types';

export const ProgressPage: React.FC = () => {
  const [stats, setStats] = useState<UserDashboardStats>({
    readinessScore: 0,
    readinessLevel: 'Uncalibrated',
    interviewsCompleted: 0,
    totalQuestionsAnswered: 0,
    weaknessesCount: 0,
    hasResume: false,
    activeDrillsCount: 0,
  });

  useEffect(() => {
    apiRequest<{ success: boolean; stats: UserDashboardStats }>('/api/users/stats')
      .then((res) => {
        if (res.success && res.stats) setStats(res.stats);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 text-xs font-semibold mb-2 border border-sky-500/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Milestone 8 Preview (Longitudinal Memory)</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Readiness Progress & Memory Engine
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Track your interview competency scores over time with persistent vector memory across all your sessions.
        </p>
      </div>

      {/* Real Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-2">
          <div className="text-xs text-slate-400 font-semibold uppercase">Placement Readiness</div>
          <div className="text-3xl font-black text-sky-400">{stats.readinessScore}%</div>
          <div className="text-[11px] text-slate-500 font-medium">
            {stats.interviewsCompleted === 0 ? 'Uncalibrated (Take 1st Mock)' : stats.readinessLevel}
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-2">
          <div className="text-xs text-slate-400 font-semibold uppercase">Questions Answered</div>
          <div className="text-3xl font-black text-indigo-400">{stats.totalQuestionsAnswered}</div>
          <div className="text-[11px] text-slate-500 font-medium">Across {stats.interviewsCompleted} sessions</div>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-2">
          <div className="text-xs text-slate-400 font-semibold uppercase">Weaknesses Overcome</div>
          <div className="text-3xl font-black text-emerald-400">{stats.weaknessesCount}</div>
          <div className="text-[11px] text-slate-500 font-medium">Auto-tracked over time</div>
        </div>
      </div>

      {/* Real Trajectory Card */}
      <div className="glass-card rounded-2xl p-8 border border-slate-700/80 shadow-2xl space-y-6 text-center">
        <div className="w-14 h-14 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 mx-auto">
          <TrendingUp className="w-7 h-7" />
        </div>
        <div className="space-y-1">
          <h3 className="text-base font-bold text-white">Score Trajectory Tracker</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Your longitudinal progression graph across Technical Depth, STAR Structure, and Communication will plot here as you complete mock sessions.
          </p>
        </div>

        <div className="pt-2">
          <Link
            to="/dashboard/interviews"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-400 font-bold text-xs border border-slate-700 transition-colors"
          >
            <Play className="w-4 h-4" />
            <span>Take Diagnostic Mock</span>
          </Link>
        </div>
      </div>

      {/* Vector Memory Card */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <BrainCircuit className="w-4 h-4 text-sky-400" />
          AI Coach Long-Term Memory Notes
        </h3>
        <div className="p-6 text-center text-xs text-slate-500 bg-slate-900/40 rounded-xl border border-slate-800/80">
          <Inbox className="w-5 h-5 text-slate-600 mx-auto mb-1" />
          <p>No memory notes logged yet. Your AI Coach will record cross-session observations as you practice.</p>
        </div>
      </div>
    </div>
  );
};
