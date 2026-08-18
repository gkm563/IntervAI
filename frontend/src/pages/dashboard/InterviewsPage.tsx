import React, { useState } from 'react';
import {
  Video,
  Mic,
  MessageSquare,
  Play,
  Clock,
  Award,
  Sparkles,
  ChevronRight,
  Filter,
  CheckCircle2,
  Zap,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const InterviewsPage: React.FC = () => {
  const { user } = useAuth();
  const [selectedMode, setSelectedMode] = useState<'VOICE' | 'VIDEO' | 'TEXT'>('TEXT');
  const [selectedRole, setSelectedRole] = useState('Frontend Engineer (React / TypeScript)');
  const [selectedDifficulty, setSelectedDifficulty] = useState('MEDIUM');
  const [targetCompany, setTargetCompany] = useState('Google / Amazon');

  const pastInterviews = [
    {
      id: 'mock-1',
      title: 'Full-Stack Architecture & State Management',
      role: 'SDE-2 Fullstack',
      date: 'Aug 18, 2026',
      duration: '22 mins',
      mode: 'TEXT',
      score: 88,
      status: 'COMPLETED',
    },
    {
      id: 'mock-2',
      title: 'React Internals, Virtual DOM & Performance',
      role: 'Frontend Engineer',
      date: 'Aug 16, 2026',
      duration: '18 mins',
      mode: 'VOICE',
      score: 82,
      status: 'COMPLETED',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 text-xs font-semibold mb-2 border border-sky-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Milestone 3 Preview (Text Mode)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Interview Simulation Room
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Launch interactive AI mock interviews tailored to your resume with real-time adaptive questioning.
          </p>
        </div>
      </div>

      {/* Main Interactive Launcher Card */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-700/80 shadow-2xl space-y-6">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Play className="w-5 h-5 text-sky-400" />
          Configure & Launch New Interview Session
        </h2>

        {/* Modality Selector */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2.5">
            Choose Interview Modality
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              onClick={() => setSelectedMode('VOICE')}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                selectedMode === 'VOICE'
                  ? 'bg-sky-500/15 border-sky-500 text-white shadow-md'
                  : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <Mic className={`w-5 h-5 mb-2 ${selectedMode === 'VOICE' ? 'text-sky-400' : 'text-slate-400'}`} />
              <div className="font-bold text-sm text-white">Voice Mode</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Real-time speech-to-speech STT/TTS</div>
            </button>

            <button
              onClick={() => setSelectedMode('VIDEO')}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                selectedMode === 'VIDEO'
                  ? 'bg-indigo-600/15 border-indigo-500 text-white shadow-md'
                  : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <Video className={`w-5 h-5 mb-2 ${selectedMode === 'VIDEO' ? 'text-indigo-400' : 'text-slate-400'}`} />
              <div className="font-bold text-sm text-white">3D Avatar Video</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Facial presence with viseme lip-sync</div>
            </button>

            <button
              onClick={() => setSelectedMode('TEXT')}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                selectedMode === 'TEXT'
                  ? 'bg-teal-600/15 border-teal-500 text-white shadow-md'
                  : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <MessageSquare className={`w-5 h-5 mb-2 ${selectedMode === 'TEXT' ? 'text-teal-400' : 'text-slate-400'}`} />
              <div className="font-bold text-sm text-white">Text-Only Mode</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Low-bandwidth, chat-driven simulation</div>
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
            <span>AI question planner calibrated with your resume.</span>
          </div>

          <button
            onClick={() => alert('Starting Text-Mode Interview session! Full question generator and multi-turn state machine connects in Milestone 3.')}
            className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-sky-500 via-sky-600 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-sky-500/25 transition-all cursor-pointer hover:scale-[1.02]"
          >
            <Play className="w-4 h-4" />
            <span>Start Mock Interview</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Past Mock Interviews Table */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-sky-400" />
            Recent Mock Interviews History
          </h3>
          <span className="text-xs text-slate-400">{pastInterviews.length} Completed</span>
        </div>

        <div className="space-y-3">
          {pastInterviews.map((item) => (
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
                <p className="text-xs text-slate-400">{item.role} • {item.date} • {item.duration}</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-base font-black text-emerald-400">{item.score}%</div>
                  <div className="text-[10px] text-slate-500">Readiness</div>
                </div>
                <button
                  onClick={() => alert(`Viewing report for ${item.title}`)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-sky-400 border border-slate-700"
                >
                  View Report
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
