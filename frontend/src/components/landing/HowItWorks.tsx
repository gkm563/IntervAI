import React from 'react';
import { FileUp, Target, Bot, Award, ArrowRight } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      icon: FileUp,
      title: 'Upload Your Resume',
      desc: 'Our AI parses your projects, tech stack, and experience bullets to craft customized, realistic questions.',
    },
    {
      num: '02',
      icon: Target,
      title: 'Set Target Role & Company',
      desc: 'Choose your desired role (Frontend, Backend, Fullstack, AI) and target company style (FAANG, Startup, Indian IT).',
    },
    {
      num: '03',
      icon: Bot,
      title: 'Take the Live AI Interview',
      desc: 'Answer naturally via voice, 3D avatar video, or text mode with dynamic follow-up questioning.',
    },
    {
      num: '04',
      icon: Award,
      title: 'Get Report & Targeted Practice',
      desc: 'Review multi-dimensional scores, see ideal answers, retry weak areas, and track your readiness progress.',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-[#0B1B3A]/60 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-xs uppercase font-bold tracking-widest text-sky-400">The Workflow</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
            How IntervAI prepares you for the real room
          </p>
          <p className="text-slate-400 text-base">
            A seamless 4-step loop designed to transform interview anxiety into repeatable confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="glass-card rounded-2xl p-6 relative flex flex-col justify-between glass-card-hover border border-slate-800"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500/20 to-indigo-500/20 border border-sky-500/30 flex items-center justify-center text-sky-400">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-black text-slate-700 select-none">
                      {step.num}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                </div>

                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-20 text-slate-600">
                    <ArrowRight className="w-5 h-5 text-slate-600" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
