import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  Plus,
  Inbox,
  CheckCircle2,
} from 'lucide-react';

export const SchedulePage: React.FC = () => {
  const [scheduledSessions, setScheduledSessions] = useState<any[]>([]);
  const [showBookModal, setShowBookModal] = useState(false);
  const [sessionTitle, setSessionTitle] = useState('Frontend Mock Round 1');
  const [sessionDate, setSessionDate] = useState('');
  const [sessionMode, setSessionMode] = useState('Voice Mode');

  const handleBookSlot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sessionDate) return;
    const newSession = {
      id: Date.now(),
      title: sessionTitle,
      date: sessionDate,
      mode: sessionMode,
      duration: '30 mins',
    };
    setScheduledSessions([...scheduledSessions, newSession]);
    setShowBookModal(false);
    setSessionDate('');
  };

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
          onClick={() => setShowBookModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs shadow-md shadow-sky-500/20 transition-all cursor-pointer w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Book Mock Slot</span>
        </button>
      </div>

      {/* Book Slot Modal */}
      {showBookModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#0B1B3A] border border-slate-700 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-white">Schedule Mock Interview Slot</h3>
            <form onSubmit={handleBookSlot} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1.5">Session Focus / Topic</label>
                <input
                  type="text"
                  value={sessionTitle}
                  onChange={(e) => setSessionTitle(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1.5">Interview Modality</label>
                <select
                  value={sessionMode}
                  onChange={(e) => setSessionMode(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:ring-1 focus:ring-sky-500"
                >
                  <option value="Voice Mode">Voice Mode (STT / TTS)</option>
                  <option value="3D Avatar Video">3D Avatar Video</option>
                  <option value="Text Mode">Text-Only Mode</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1.5">Date & Time</label>
                <input
                  type="datetime-local"
                  required
                  value={sessionDate}
                  onChange={(e) => setSessionDate(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowBookModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Scheduled Sessions List */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-700/80 shadow-2xl space-y-6">
        <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <CalendarIcon className="w-4 h-4 text-sky-400" />
          Scheduled Mock Rounds ({scheduledSessions.length})
        </h2>

        {scheduledSessions.length === 0 ? (
          <div className="p-8 text-center space-y-2 bg-slate-900/40 rounded-xl border border-slate-800/80">
            <Inbox className="w-6 h-6 text-slate-500 mx-auto" />
            <h4 className="text-xs font-bold text-slate-300">No mock rounds scheduled yet</h4>
            <p className="text-[11px] text-slate-500">
              Click &quot;Book Mock Slot&quot; to schedule your practice interview sessions.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {scheduledSessions.map((session) => (
              <div
                key={session.id}
                className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">{session.title}</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
                      {session.mode}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-sky-400" />
                    <span>{new Date(session.date).toLocaleString()} ({session.duration})</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
