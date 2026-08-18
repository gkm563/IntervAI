import React from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  Plus,
  Sparkles,
  CheckCircle2,
  Video,
  Mic,
  MessageSquare,
} from 'lucide-react';

export const SchedulePage: React.FC = () => {
  const scheduledSessions = [
    {
      id: 1,
      title: 'Google SDE-1 Technical Round 1 Mock',
      date: 'Tomorrow, 5:00 PM IST',
      duration: '45 mins',
      mode: 'Voice Mode',
      type: 'Data Structures & System Architecture',
    },
    {
      id: 2,
      title: 'Behavioral Leadership STAR Round',
      date: 'Saturday, 11:00 AM IST',
      duration: '30 mins',
      mode: '3D Avatar Video',
      type: 'Cross-functional Collaboration & Conflict',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Schedule & Mock Calendar
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Plan your upcoming AI mock interview simulations and set daily practice reminders.
          </p>
        </div>

        <button
          onClick={() => alert('Custom calendar scheduling will activate in Milestone 8.')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs shadow-md shadow-sky-500/20 transition-all cursor-pointer w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Book Mock Slot</span>
        </button>
      </div>

      {/* Scheduled Sessions List */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-700/80 shadow-2xl space-y-6">
        <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <CalendarIcon className="w-4 h-4 text-sky-400" />
          Upcoming Scheduled Mock Rounds
        </h2>

        <div className="space-y-4">
          {scheduledSessions.map((session) => (
            <div
              key={session.id}
              className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-700 transition-all"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white">{session.title}</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
                    {session.mode}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-sky-400" /> {session.date} ({session.duration})</span>
                  <span>•</span>
                  <span>{session.type}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => alert(`Starting ${session.title}`)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-xs shadow-sm transition-all"
                >
                  Join Room
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
