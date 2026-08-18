import React, { useState } from 'react';
import {
  Trophy,
  Flame,
  Star,
  Sparkles,
  CheckCircle2,
  X,
  Target,
  Zap,
  Gift,
  Award,
  Lock,
} from 'lucide-react';
import { useGamification } from '../../context/GamificationContext';

interface GamificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GamificationModal: React.FC<GamificationModalProps> = ({ isOpen, onClose }) => {
  const {
    xp,
    level,
    levelTitle,
    progressPercent,
    nextLevelXp,
    streakDays,
    badges,
    dailyQuests,
    claimQuest,
  } = useGamification();

  const [activeTab, setActiveTab] = useState<'QUESTS' | 'BADGES' | 'LEADERBOARD'>('QUESTS');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in-50 duration-150">
      <div className="relative w-full max-w-2xl bg-[#0B1B3A] border border-slate-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-6 bg-gradient-to-r from-sky-950/80 via-[#0B1B3A] to-indigo-950/80 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-600 flex items-center justify-center text-white shadow-lg shadow-amber-500/20">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold text-white">Level {level}: {levelTitle}</h2>
                <span className="flex items-center gap-1 text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                  <Flame className="w-3.5 h-3.5 fill-amber-400" />
                  {streakDays} Day Streak!
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {xp} Total XP • {nextLevelXp - xp} XP to reach next tier
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Level XP Progress Bar */}
        <div className="px-6 py-3 bg-slate-900/90 border-b border-slate-800">
          <div className="flex items-center justify-between text-xs font-bold mb-1.5">
            <span className="text-sky-400">Level {level} Progress</span>
            <span className="text-emerald-400">{progressPercent}%</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-sky-400 to-emerald-400 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-800 bg-slate-900/40 text-xs font-bold">
          <button
            onClick={() => setActiveTab('QUESTS')}
            className={`flex-1 py-3 text-center border-b-2 transition-all cursor-pointer ${
              activeTab === 'QUESTS'
                ? 'border-sky-400 text-sky-400 bg-sky-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Daily Quests & Challenges
          </button>
          <button
            onClick={() => setActiveTab('BADGES')}
            className={`flex-1 py-3 text-center border-b-2 transition-all cursor-pointer ${
              activeTab === 'BADGES'
                ? 'border-sky-400 text-sky-400 bg-sky-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Achievement Badges ({badges.filter((b) => b.unlocked).length}/{badges.length})
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {activeTab === 'QUESTS' && (
            <div className="space-y-3">
              {dailyQuests.map((quest) => (
                <div
                  key={quest.id}
                  className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                    quest.claimed
                      ? 'bg-slate-900/40 border-slate-800 opacity-60'
                      : quest.completed
                      ? 'bg-emerald-950/20 border-emerald-500/40 shadow-lg shadow-emerald-500/10'
                      : 'bg-slate-900/80 border-slate-800'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">{quest.title}</span>
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        +{quest.xpReward} XP
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">{quest.description}</p>
                  </div>

                  <div>
                    {quest.claimed ? (
                      <span className="text-xs text-slate-500 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        Claimed
                      </span>
                    ) : quest.completed ? (
                      <button
                        onClick={() => claimQuest(quest.id)}
                        className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-extrabold text-xs shadow-md shadow-emerald-500/20 transition-all cursor-pointer animate-pulse"
                      >
                        Claim XP!
                      </button>
                    ) : (
                      <span className="text-xs text-slate-500 font-semibold">
                        {quest.progress}/{quest.total}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'BADGES' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {badges.map((badge) => (
                <div
                  key={badge.id}
                  className={`p-4 rounded-2xl border flex items-start gap-3 transition-all ${
                    badge.unlocked
                      ? 'bg-slate-900/90 border-sky-500/40 shadow-lg shadow-sky-500/10'
                      : 'bg-slate-900/30 border-slate-800 opacity-50'
                  }`}
                >
                  <div className="text-3xl flex-shrink-0">{badge.icon}</div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-white">{badge.name}</h4>
                      {badge.unlocked ? (
                        <span className="text-[9px] font-bold text-emerald-400">Unlocked</span>
                      ) : (
                        <Lock className="w-3 h-3 text-slate-500" />
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">{badge.description}</p>
                    <div className="text-[10px] text-amber-400 font-semibold pt-0.5">
                      +{badge.xpReward} XP Reward
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
