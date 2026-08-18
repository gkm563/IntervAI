import React, { useState } from 'react';
import { Bot, Send, Sparkles, CheckCircle2, RotateCcw, Award } from 'lucide-react';

export const LiveDemoPreview: React.FC = () => {
  const sampleQuestion = "Can you explain the difference between optimistic UI updates and traditional server-confirmed updates, and how you would handle an optimistic mutation failure?";
  
  const sampleOptions = [
    {
      label: "Detailed STAR Answer",
      text: "Optimistic UI immediately updates the client cache before the backend confirms, providing zero perceived latency. If the mutation fails, we roll back to the previous snapshot saved in cache and display a non-intrusive error banner with a retry button.",
      score: 95,
      verdict: "Exceptional depth, mentions rollback snapshot and user experience handling.",
    },
    {
      label: "Basic Answer",
      text: "Optimistic UI makes the UI faster by changing state first. If the server says error, we just change the state back.",
      score: 68,
      verdict: "Correct high-level concept, but lacks mention of error recovery, caching mechanics, or snapshot management.",
    }
  ];

  const [candidateText, setCandidateText] = useState(sampleOptions[0].text);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<any>({
    score: sampleOptions[0].score,
    verdict: sampleOptions[0].verdict,
    metrics: { relevance: 96, clarity: 94, depth: 95 },
  });

  const handleEvaluate = (textToEval: string) => {
    setIsEvaluating(true);
    setTimeout(() => {
      if (textToEval.toLowerCase().includes('rollback') || textToEval.toLowerCase().includes('cache')) {
        setEvaluationResult({
          score: 95,
          verdict: "Strong technical answer! Clear understanding of state rollback and resilient UX.",
          metrics: { relevance: 96, clarity: 94, depth: 95 },
        });
      } else {
        setEvaluationResult({
          score: 72,
          verdict: "Good base explanation, but can be improved with specific state rollback strategies.",
          metrics: { relevance: 78, clarity: 80, depth: 65 },
        });
      }
      setIsEvaluating(false);
    }, 700);
  };

  return (
    <section id="demo" className="py-20 bg-slate-50/50 dark:bg-[#070F22] border-t border-slate-200 dark:border-slate-800 relative transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-semibold text-sky-500">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive 60-Second Simulator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
            Try an AI Interview Turn Right Now
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            No signup needed. Test how the AI interviewer scores candidate responses and offers precision feedback.
          </p>
        </div>

        {/* Interactive Simulator Box */}
        <div className="glass-card rounded-2xl border border-slate-200 dark:border-slate-700/80 p-6 sm:p-8 shadow-2xl space-y-6">
          
          {/* Interviewer Turn */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-500 flex-shrink-0 mt-1">
              <Bot className="w-6 h-6" />
            </div>
            <div className="bg-slate-50 dark:bg-slate-900/90 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 flex-1">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-sky-500">AI Interviewer • SDE-2 Frontend</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">Technical Depth Question</span>
              </div>
              <p className="text-slate-800 dark:text-slate-200 text-sm sm:text-base leading-relaxed">
                &quot;{sampleQuestion}&quot;
              </p>
            </div>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium mr-2">Try sample answers:</span>
            {sampleOptions.map((opt, i) => (
              <button
                key={i}
                onClick={() => {
                  setCandidateText(opt.text);
                  handleEvaluate(opt.text);
                }}
                className={`text-xs px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                  candidateText === opt.text
                    ? 'bg-sky-500/15 border-sky-500 text-sky-600 dark:text-sky-300 font-semibold shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {opt.label} ({opt.score}%)
              </button>
            ))}
          </div>

          {/* User Input Area */}
          <div className="space-y-3">
            <div className="relative">
              <textarea
                value={candidateText}
                onChange={(e) => setCandidateText(e.target.value)}
                rows={3}
                className="w-full bg-slate-50 dark:bg-[#0B1B3A] border border-slate-300 dark:border-slate-700 rounded-xl p-4 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
                placeholder="Type or customize your interview answer here..."
              />
              <button
                onClick={() => handleEvaluate(candidateText)}
                disabled={isEvaluating || !candidateText.trim()}
                className="absolute right-3 bottom-3 flex items-center gap-1.5 px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 disabled:opacity-50 text-white font-semibold text-xs shadow-md transition-all cursor-pointer"
              >
                {isEvaluating ? (
                  <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <>
                    <span>Evaluate</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Live Evaluation Card */}
          {evaluationResult && (
            <div className="bg-slate-50 dark:bg-slate-900/90 rounded-xl p-5 border border-sky-500/30 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-sky-500" />
                  <span className="font-bold text-slate-900 dark:text-white text-sm">Instant Turn Score</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{evaluationResult.score}%</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Readiness Level</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {evaluationResult.verdict}
              </p>

              <div className="grid grid-cols-3 gap-3 pt-2 text-center text-xs">
                <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                  <div className="text-slate-500 dark:text-slate-400 text-[10px] uppercase font-bold">Relevance</div>
                  <div className="text-sm font-bold text-sky-600 dark:text-sky-400 mt-0.5">{evaluationResult.metrics.relevance}%</div>
                </div>
                <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                  <div className="text-slate-500 dark:text-slate-400 text-[10px] uppercase font-bold">Clarity</div>
                  <div className="text-sm font-bold text-indigo-600 dark:text-indigo-400 mt-0.5">{evaluationResult.metrics.clarity}%</div>
                </div>
                <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                  <div className="text-slate-500 dark:text-slate-400 text-[10px] uppercase font-bold">Depth</div>
                  <div className="text-sm font-bold text-teal-600 dark:text-teal-400 mt-0.5">{evaluationResult.metrics.depth}%</div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};
