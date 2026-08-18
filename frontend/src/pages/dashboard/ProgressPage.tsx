import React from 'react';
import {
  TrendingUp,
  Sparkles,
  Award,
  Calendar,
  CheckCircle2,
  BrainCircuit,
  Zap,
} from 'lucide-react';

export const ProgressPage: React.FC = () => {
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

      {/* Overview Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-2">
          <div className="text-xs text-slate-400 font-semibold uppercase">Overall Placement Readiness</div>
          <div className="text-3xl font-black text-sky-400">74%</div>
          <div className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>+14% since your first session</span>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-2">
          <div className="text-xs text-slate-400 font-semibold uppercase">Total Questions Answered</div>
          <div className="text-3xl font-black text-indigo-400">28</div>
          <div className="text-[11px] text-slate-400 font-medium">Across 4 mock interviews & drills</div>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-2">
          <div className="text-xs text-slate-400 font-semibold uppercase">Weaknesses Overcome</div>
          <div className="text-3xl font-black text-emerald-400">5 / 7</div>
          <div className="text-[11px] text-emerald-400 font-medium">71% mastery rate</div>
        </div>
      </div>

      {/* Progress Chart Placeholder / Visualizer */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-700/80 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-lg font-bold text-white">Score Trajectory (Past 30 Days)</h2>
            <p className="text-xs text-slate-400 mt-0.5">Tracking Technical Depth, Communication & Relevance</p>
          </div>
          <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            Steady Upward Trend
          </span>
        </div>

        {/* Visual Bar Progression */}
        <div className="grid grid-cols-4 gap-4 items-end h-44 pt-6 pb-2">
          <div className="space-y-2 text-center">
            <div className="text-[11px] font-bold text-slate-400">62%</div>
            <div className="w-full bg-slate-800 hover:bg-sky-500/40 rounded-xl transition-all h-24"></div>
            <div className="text-[10px] text-slate-500 font-semibold">Session 1</div>
          </div>
          <div className="space-y-2 text-center">
            <div className="text-[11px] font-bold text-slate-400">71%</div>
            <div className="w-full bg-slate-800 hover:bg-sky-500/40 rounded-xl transition-all h-28"></div>
            <div className="text-[10px] text-slate-500 font-semibold">Session 2</div>
          </div>
          <div className="space-y-2 text-center">
            <div className="text-[11px] font-bold text-slate-400">79%</div>
            <div className="w-full bg-slate-800 hover:bg-sky-500/40 rounded-xl transition-all h-32"></div>
            <div className="text-[10px] text-slate-500 font-semibold">Session 3</div>
          </div>
          <div className="space-y-2 text-center">
            <div className="text-[11px] font-bold text-emerald-400">86%</div>
            <div className="w-full bg-gradient-to-t from-sky-500 to-emerald-400 rounded-xl transition-all h-36 shadow-lg shadow-sky-500/20"></div>
            <div className="text-[10px] text-emerald-400 font-bold">Latest</div>
          </div>
        </div>
      </div>

      {/* Vector Memory Card */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <BrainCircuit className="w-4 h-4 text-sky-400" />
          AI Coach Long-Term Memory Notes
        </h3>
        <ul className="space-y-2.5 text-xs text-slate-300">
          <li className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <span>Candidate demonstrated mastery of browser rendering pipeline and React reconciler.</span>
          </li>
          <li className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-2.5">
            <Zap className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <span>Need further practice on database locking levels (pessimistic vs optimistic) under high concurrency.</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
