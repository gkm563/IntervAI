import React from 'react';
import { FileText, Cpu, MessageSquareQuote, LineChart, BrainCircuit, Users } from 'lucide-react';

export const FeatureGrid: React.FC = () => {
  const features = [
    {
      icon: FileText,
      title: 'Resume-Aware Context',
      desc: 'No generic questions. The AI extracts your exact projects, tech stack bullets, and claims to ask authentic behavioral and technical queries.',
    },
    {
      icon: Cpu,
      title: 'Multi-Modal Flexibility',
      desc: 'Practice in the mode that suits your setup: Live Voice, 3D Interactive Avatar, or ultra-fast, low-bandwidth Text-only mode.',
    },
    {
      icon: MessageSquareQuote,
      title: 'Adaptive Follow-Up Questions',
      desc: 'Just like real senior interviewers, IntervAI digs deeper into trade-offs, architecture choices, and edge cases based on your answers.',
    },
    {
      icon: LineChart,
      title: 'Multi-Metric Reports',
      desc: 'Receive immediate breakdown of technical correctness, STAR structure, clarity, speech filler-words, and concrete improvement notes.',
    },
    {
      icon: BrainCircuit,
      title: 'Persistent Memory & Weakness Tracking',
      desc: 'The coach remembers what you struggled with across previous sessions and schedules targeted drills until you achieve mastery.',
    },
    {
      icon: Users,
      title: 'Company & Role Calibration',
      desc: 'Prepare for product giants (Google, Amazon), hypergrowth startups, or Indian service leaders (TCS, Infosys) with tailored difficulty levels.',
    },
  ];

  return (
    <section id="features" className="py-20 lg:py-28 bg-slate-50/50 dark:bg-[#0B1B3A]/40 border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-xs uppercase font-bold tracking-widest text-sky-600 dark:text-sky-400">Core Capabilities</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
            Everything you need to master tech interviews
          </p>
          <p className="text-slate-600 dark:text-slate-400 text-base">
            Built from real hiring rubrics used by leading engineering teams worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="glass-card rounded-2xl p-7 glass-card-hover border border-slate-200 dark:border-slate-800/80 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-sky-50 dark:bg-slate-800 border border-sky-200 dark:border-slate-700 flex items-center justify-center text-sky-600 dark:text-sky-400 mb-5">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2.5">
                    {feat.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
