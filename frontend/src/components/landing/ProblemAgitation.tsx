import React from 'react';
import { HelpCircle, AlertTriangle, TrendingDown } from 'lucide-react';

export const ProblemAgitation: React.FC = () => {
  const problems = [
    {
      icon: HelpCircle,
      title: 'Generic Question Banks',
      desc: 'Most practice websites ask random trivia that has nothing to do with what is written on your resume or the specific company you are targeting.',
      badge: 'Unrealistic',
    },
    {
      icon: AlertTriangle,
      title: 'Vague, Unactionable Scores',
      desc: 'Getting a "6/10" tells you nothing about why you lost points, what was missing from your explanation, or how a real interviewer perceived your clarity.',
      badge: 'No Guidance',
    },
    {
      icon: TrendingDown,
      title: 'Interview Anxiety & No Re-tests',
      desc: 'Without realistic simulation under pressure, candidates freeze on unexpected follow-ups and repeat the same communication mistakes repeatedly.',
      badge: 'Blind Spots',
    },
  ];

  return (
    <section className="py-20 bg-slate-50/50 dark:bg-[#070F22] border-t border-slate-200 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-xs uppercase font-bold tracking-widest text-sky-600 dark:text-sky-400">The Problem</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
            Why standard interview prep fails ambitious candidates
          </p>
          <p className="text-slate-600 dark:text-slate-400 text-base">
            Memorizing textbook answers doesn&apos;t prepare you for a real conversational interview where every follow-up probes your actual project experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((prob, idx) => {
            const Icon = prob.icon;
            return (
              <div
                key={idx}
                className="glass-card rounded-2xl p-8 relative overflow-hidden group hover:border-sky-500/50 transition-all border border-slate-200 dark:border-slate-800"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-sky-50 dark:bg-slate-800/90 border border-sky-200 dark:border-slate-700/80 flex items-center justify-center text-sky-600 dark:text-sky-400 group-hover:scale-110 group-hover:bg-sky-500/15 transition-all">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-500/20">
                    {prob.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-sky-600 dark:group-hover:text-sky-300 transition-colors">
                  {prob.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  {prob.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
