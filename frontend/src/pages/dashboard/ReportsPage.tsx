import React from 'react';
import {
  Award,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  TrendingUp,
  Download,
  BarChart2,
  BookOpen,
} from 'lucide-react';

export const ReportsPage: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 text-xs font-semibold mb-2 border border-sky-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Milestone 4 Preview</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Interview Reports & Analytics
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Detailed performance breakdown on technical correctness, STAR structure, clarity, and communication metrics.
          </p>
        </div>

        <button
          onClick={() => alert('PDF export feature will activate in Milestone 4.')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-sky-400 border border-slate-700 transition-colors w-fit"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Summary PDF</span>
        </button>
      </div>

      {/* Main Score Breakdown Card */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-700/80 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <h2 className="text-xl font-bold text-white">Latest Session Analysis: Frontend & Systems Mock</h2>
            <p className="text-xs text-slate-400 mt-0.5">Completed Today • 6 Questions Answered • 22 Minutes</p>
          </div>

          <div className="flex items-center gap-3 bg-slate-900/90 px-4 py-2.5 rounded-xl border border-slate-800">
            <Award className="w-7 h-7 text-sky-400" />
            <div>
              <div className="text-2xl font-black text-emerald-400">86 / 100</div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Overall Readiness</div>
            </div>
          </div>
        </div>

        {/* 4 Rubric Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 text-center">
            <div className="text-xs text-slate-400 font-semibold mb-1">Relevance</div>
            <div className="text-2xl font-bold text-sky-400">92%</div>
            <div className="text-[10px] text-emerald-400 mt-1">Directly targeted prompt</div>
          </div>

          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 text-center">
            <div className="text-xs text-slate-400 font-semibold mb-1">Technical Depth</div>
            <div className="text-2xl font-bold text-teal-400">88%</div>
            <div className="text-[10px] text-emerald-400 mt-1">Detailed trade-off analysis</div>
          </div>

          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 text-center">
            <div className="text-xs text-slate-400 font-semibold mb-1">STAR Structure</div>
            <div className="text-2xl font-bold text-indigo-400">84%</div>
            <div className="text-[10px] text-sky-400 mt-1">Clear action & result framing</div>
          </div>

          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 text-center">
            <div className="text-xs text-slate-400 font-semibold mb-1">Communication</div>
            <div className="text-2xl font-bold text-emerald-400">81%</div>
            <div className="text-[10px] text-amber-400 mt-1">Minor hesitation fillers</div>
          </div>
        </div>

        {/* Strengths & Weaknesses Detailed */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-800 space-y-3">
            <h3 className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" /> Strong Answer Highlights
            </h3>
            <ul className="text-xs text-slate-300 space-y-2.5">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span>Exceptional explanation of optimistic state updates with client cache rollback snapshots.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span>Explicit mention of personal ownership and architecture decisions in the WebSocket project.</span>
              </li>
            </ul>
          </div>

          <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-800 space-y-3">
            <h3 className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
              <AlertCircle className="w-4 h-4" /> Priority Areas to Refine
            </h3>
            <ul className="text-xs text-slate-300 space-y-2.5">
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span>Include numerical metrics in the Result section (e.g. &quot;reduced render latency by 40%&quot;).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span>Keep transition statements tighter when explaining database failover scenarios.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
