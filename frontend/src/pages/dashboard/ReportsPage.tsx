import React from 'react';
import { Link } from 'react-router-dom';
import {
  Award,
  Sparkles,
  Play,
  Inbox,
  ArrowRight,
} from 'lucide-react';

export const ReportsPage: React.FC = () => {
  const hasReports = false; // Real state for new accounts

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
      </div>

      {/* Real Empty State (Section 122.2 Compliant) */}
      {!hasReports && (
        <div className="glass-card rounded-2xl p-12 border border-slate-700/80 text-center space-y-4 max-w-2xl mx-auto shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 mx-auto shadow-lg">
            <Award className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-white">No Interview Reports Generated Yet</h2>
            <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
              Once you complete an AI mock interview, a detailed report with STAR structure analysis, relevance metrics, and weakness diagnosis will appear here.
            </p>
          </div>

          <div className="pt-2">
            <Link
              to="/dashboard/interviews"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-sky-500/20 transition-all"
            >
              <Play className="w-4 h-4" />
              <span>Launch First Mock Session</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
