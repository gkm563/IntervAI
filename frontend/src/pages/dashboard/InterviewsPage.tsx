import React, { useState } from 'react';
import {
  Video,
  Mic,
  MessageSquare,
  Play,
  Clock,
  Sparkles,
  ChevronRight,
  Zap,
  Inbox,
  Award,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ActiveInterviewRoom, InterviewModality } from '../../components/interview/ActiveInterviewRoom';

export const InterviewsPage: React.FC = () => {
  const { user } = useAuth();
  const [selectedMode, setSelectedMode] = useState<InterviewModality>('TEXT');
  const [selectedRole, setSelectedRole] = useState(user?.targetRole || 'Frontend Software Engineer');
  const [selectedDifficulty, setSelectedDifficulty] = useState('MEDIUM');
  const [targetCompany, setTargetCompany] = useState(user?.targetCompany || 'Product Tech Company');

  // Live session state
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [completedSessions, setCompletedSessions] = useState<any[]>([]);

  const handleStartSession = () => {
    setIsSessionActive(true);
  };

  const handleSessionComplete = (score: number, report: any) => {
    const newRecord = {
      id: Date.now(),
      title: `${selectedRole} Calibration Mock`,
      role: selectedRole,
      date: 'Just now',
      duration: '5 mins',
      mode: selectedMode,
      score,
      status: 'COMPLETED',
    };
    setCompletedSessions([newRecord, ...completedSessions]);
  };

  return (
    <div className="space-y-8">
      {/* Full Active Interactive Interview Room Modal/Screen */}
      {isSessionActive && (
        <ActiveInterviewRoom
          modality={selectedMode}
          targetRole={selectedRole}
          targetCompany={targetCompany}
          difficulty={selectedDifficulty}
          candidateName={user?.fullName || 'Candidate'}
          onExit={() => setIsSessionActive(false)}
          onSessionComplete={handleSessionComplete}
        />
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100 dark:bg-sky-500/15 text-sky-800 dark:text-sky-300 text-xs font-bold mb-2 border border-sky-300 dark:border-sky-500/30 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Multi-Modal Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Interview Simulation Room
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Choose your preferred modality below (Voice, 3D Avatar, or Text) and practice real-time adaptive questioning.
          </p>
        </div>
      </div>

      {/* Main Interactive Launcher Card */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700/80 shadow-2xl space-y-6">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Play className="w-5 h-5 text-sky-500" />
          Configure & Launch Simulation Session
        </h2>

        {/* Modality Selector */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2.5">
            Choose Interview Modality
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              onClick={() => setSelectedMode('VOICE')}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                selectedMode === 'VOICE'
                  ? 'bg-sky-500/20 border-sky-400 text-white shadow-lg shadow-sky-500/15 ring-1 ring-sky-400'
                  : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <Mic className={`w-5 h-5 mb-2 ${selectedMode === 'VOICE' ? 'text-sky-400' : 'text-slate-400'}`} />
              <div className="font-bold text-sm text-white">Voice Mode</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Real-time speech-to-speech STT / TTS audio</div>
            </button>

            <button
              onClick={() => setSelectedMode('VIDEO')}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                selectedMode === 'VIDEO'
                  ? 'bg-indigo-600/20 border-indigo-400 text-white shadow-lg shadow-indigo-500/15 ring-1 ring-indigo-400'
                  : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <Video className={`w-5 h-5 mb-2 ${selectedMode === 'VIDEO' ? 'text-indigo-400' : 'text-slate-400'}`} />
              <div className="font-bold text-sm text-white">3D Avatar Video</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Procedural 3D avatar with viseme lip-sync & webcam</div>
            </button>

            <button
              onClick={() => setSelectedMode('TEXT')}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                selectedMode === 'TEXT'
                  ? 'bg-teal-600/20 border-teal-400 text-white shadow-lg shadow-teal-500/15 ring-1 ring-teal-400'
                  : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <MessageSquare className={`w-5 h-5 mb-2 ${selectedMode === 'TEXT' ? 'text-teal-400' : 'text-slate-400'}`} />
              <div className="font-bold text-sm text-white">Text-Only Mode</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Low-bandwidth chat-driven simulation</div>
            </button>
          </div>
        </div>

        {/* Configurations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Target Job Role</label>
            <input
              type="text"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full bg-[#0B1B3A] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-sky-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Target Company Context</label>
            <input
              type="text"
              value={targetCompany}
              onChange={(e) => setTargetCompany(e.target.value)}
              className="w-full bg-[#0B1B3A] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-sky-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Difficulty Calibration</label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full bg-[#0B1B3A] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-sky-500"
            >
              <option value="EASY">Entry / College Placement</option>
              <option value="MEDIUM">Mid-Level (SDE-1 / SDE-2)</option>
              <option value="HARD">Senior Product Bar-Raiser</option>
            </select>
          </div>
        </div>

        {/* Start Button */}
        <div className="pt-4 flex items-center justify-between border-t border-slate-800">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-emerald-400" />
            <span>Ready in {selectedMode === 'VIDEO' ? '3D Avatar Mode' : selectedMode === 'VOICE' ? 'Voice Audio Mode' : 'Text Chat Mode'}</span>
          </div>

          <button
            onClick={handleStartSession}
            className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-sky-500 via-sky-600 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-sky-500/25 transition-all cursor-pointer hover:scale-[1.02]"
          >
            <Play className="w-4 h-4" />
            <span>Launch {selectedMode === 'VIDEO' ? '3D Avatar Video' : selectedMode === 'VOICE' ? 'Voice Interview' : 'Text Simulation'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Past Mock Interviews Table */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-sky-400" />
            Session History
          </h3>
          <span className="text-xs text-slate-500">{completedSessions.length} Completed</span>
        </div>

        {completedSessions.length === 0 ? (
          <div className="p-8 text-center space-y-2 bg-slate-900/40 rounded-xl border border-slate-800/80">
            <Inbox className="w-6 h-6 text-slate-500 mx-auto" />
            <h4 className="text-xs font-bold text-slate-300">No mock interviews taken yet</h4>
            <p className="text-[11px] text-slate-500 max-w-sm mx-auto">
              Select your modality and click &quot;Launch&quot; above to start your practice session.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {completedSessions.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-700 transition-all"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">{item.title}</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
                      {item.mode}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{item.role} • {item.date}</p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-base font-black text-emerald-400">{item.score}%</div>
                    <div className="text-[10px] text-slate-500">Readiness</div>
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
