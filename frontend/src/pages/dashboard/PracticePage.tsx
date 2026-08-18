import React, { useState } from 'react';
import {
  BookOpen,
  Sparkles,
  CheckCircle2,
  RotateCcw,
  Target,
  ArrowRight,
  Zap,
} from 'lucide-react';

export const PracticePage: React.FC = () => {
  const [activeDrill, setActiveDrill] = useState(0);

  const drills = [
    {
      id: 1,
      title: 'STAR Method: Behavioral Conflict Resolution',
      category: 'Behavioral',
      estTime: '8 mins',
      difficulty: 'Medium',
      question: 'Describe a situation where a technical disagreement occurred regarding database schema design, and how you reached consensus.',
      focus: 'Emphasize Situation, Task, Action, and Quantified Result.',
    },
    {
      id: 2,
      title: 'Distributed Systems: Cache Stampede Mitigation',
      category: 'System Design',
      estTime: '10 mins',
      difficulty: 'Hard',
      question: 'How do you prevent a cache stampede / thundering herd problem when a high-traffic cache key expires simultaneously for 50k users?',
      focus: 'Mutual exclusion locks, probabilistic early expiration (XFetch), or background refresh.',
    },
    {
      id: 3,
      title: 'Frontend: Re-render Optimization in Deep React Trees',
      category: 'Frontend',
      estTime: '6 mins',
      difficulty: 'Medium',
      question: 'When should you choose React.memo and useMemo vs restructuring component composition to avoid prop drilling and unnecessary re-renders?',
      focus: 'Children composition patterns, stable callback references, and profiler metrics.',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 text-xs font-semibold mb-2 border border-sky-500/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Milestone 4 Preview</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Targeted Practice Drills
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Bite-sized question drills generated from your previous mock interview weaknesses and target company rubrics.
        </p>
      </div>

      {/* Drills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {drills.map((drill, index) => (
          <div
            key={drill.id}
            onClick={() => setActiveDrill(index)}
            className={`glass-card rounded-2xl p-6 border transition-all cursor-pointer flex flex-col justify-between ${
              activeDrill === index
                ? 'border-sky-500/80 bg-sky-950/20 shadow-xl'
                : 'border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
                  {drill.category}
                </span>
                <span className="text-xs text-slate-400 font-medium">{drill.estTime}</span>
              </div>

              <h3 className="text-base font-bold text-white leading-snug">{drill.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed italic">
                &quot;{drill.question}&quot;
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-medium">Difficulty: {drill.difficulty}</span>
              <span className="text-xs font-semibold text-sky-400 flex items-center gap-1">
                <span>Practice Now</span>
                <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Drill Interactive Card */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-700/80 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">Active Question Drill</span>
            <h2 className="text-xl font-bold text-white mt-1">{drills[activeDrill].title}</h2>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300">
            {drills[activeDrill].estTime}
          </span>
        </div>

        <div className="bg-slate-900/90 rounded-xl p-5 border border-slate-800 space-y-2">
          <div className="text-xs font-semibold text-slate-400">Interviewer Prompt:</div>
          <p className="text-slate-100 text-sm sm:text-base leading-relaxed">
            &quot;{drills[activeDrill].question}&quot;
          </p>
          <div className="text-[11px] text-sky-400 pt-1 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5" />
            <span>Key Focus: {drills[activeDrill].focus}</span>
          </div>
        </div>

        <div className="space-y-3">
          <textarea
            rows={4}
            placeholder="Type your structured practice response here..."
            className="w-full bg-[#0B1B3A] border border-slate-700 rounded-xl p-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500 resize-none"
          />

          <div className="flex items-center justify-end gap-3">
            <button
              onClick={() => alert('Drill evaluation will score your response in Milestone 4.')}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-sky-500/20 transition-all cursor-pointer"
            >
              <span>Submit Drill for AI Scoring</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
