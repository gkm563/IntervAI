import React from 'react';
import { Award, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';

export const SampleReportPreview: React.FC = () => {
  return (
    <section id="sample-report" className="py-20 lg:py-28 bg-slate-50/50 dark:bg-[#0B1B3A]/40 border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-xs uppercase font-bold tracking-widest text-sky-600 dark:text-sky-400">Actionable Feedback</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
            Get reports that actually tell you how to improve
          </p>
          <p className="text-slate-600 dark:text-slate-400 text-base">
            No empty praise or arbitrary scores. IntervAI highlights exact gaps in your technical answers and gives structured rewrite examples.
          </p>
        </div>

        {/* Mock Report Card */}
        <div className="max-w-4xl mx-auto glass-card rounded-2xl p-6 sm:p-10 border border-slate-200 dark:border-slate-700/80 shadow-2xl space-y-8">
          {/* Report Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-sky-600 dark:text-sky-400 mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Verified Interview Analysis</span>
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">Full-Stack Engineer Mock (Senior Level)</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Simulated Target: Product Scale • Duration: 24 mins • 6 Questions</p>
            </div>

            <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-900/90 px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <Award className="w-8 h-8 text-sky-500" />
              <div>
                <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">86 / 100</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">Overall Score</div>
              </div>
            </div>
          </div>

          {/* Metric Progress Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-slate-50 dark:bg-slate-900/80 p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
              <div className="text-xs text-slate-600 dark:text-slate-400 mb-1 font-semibold">Relevance</div>
              <div className="text-xl font-bold text-sky-600 dark:text-sky-400">92%</div>
              <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold mt-1">Excellent</div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900/80 p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
              <div className="text-xs text-slate-600 dark:text-slate-400 mb-1 font-semibold">Technical Depth</div>
              <div className="text-xl font-bold text-teal-600 dark:text-teal-400">88%</div>
              <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold mt-1">Strong</div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900/80 p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
              <div className="text-xs text-slate-600 dark:text-slate-400 mb-1 font-semibold">STAR Structure</div>
              <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400">84%</div>
              <div className="text-[10px] text-sky-600 dark:text-sky-400 font-bold mt-1">Good</div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900/80 p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
              <div className="text-xs text-slate-600 dark:text-slate-400 mb-1 font-semibold">Communication</div>
              <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400">81%</div>
              <div className="text-[10px] text-amber-600 dark:text-amber-400 font-bold mt-1">Minor Hesitations</div>
            </div>
          </div>

          {/* Strengths & Actionable Recommendations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-50 dark:bg-slate-900/60 p-5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
              <h4 className="flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                <CheckCircle className="w-4 h-4" /> Top Strengths Identified
              </h4>
              <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span>Deep explanation of Postgres indexing strategies and query execution plan analysis.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span>Clear articulation of personal contributions vs team contributions in the resume project.</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900/60 p-5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
              <h4 className="flex items-center gap-2 text-sm font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                <AlertCircle className="w-4 h-4" /> Priority Areas to Refine
              </h4>
              <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>Quantify business outcomes: When discussing the migration, mention latency dropped by 35%.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>Reduce filler phrases (&quot;you know&quot;, &quot;basically&quot;) when transitioning between points.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
