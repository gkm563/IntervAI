import React from 'react';
import { Star } from 'lucide-react';

export const SocialProof: React.FC = () => {
  const testimonials = [
    {
      name: 'Rohan Sharma',
      role: 'Placed at Microsoft India (SDE-1)',
      college: 'IIT Roorkee',
      text: 'The AI interviewer actually cross-questioned me on my distributed cache project listed in my resume. The feedback on my communication structure helped me crack the real round.',
    },
    {
      name: 'Ananya Verma',
      role: 'Frontend Developer @ Swiggy',
      college: 'DTU Delhi',
      text: 'Practicing with the 3D avatar removed my video interview anxiety. The score breakdowns on depth and clarity are 10x more useful than generic question banks.',
    },
    {
      name: 'Priya Iyer',
      role: 'Associate Software Engineer @ TCS Digital',
      college: 'VIT Vellore',
      text: 'Text mode let me practice mock drills during my daily bus commute. The STAR method breakdown transformed how I answer behavioral questions.',
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-[#070F22] border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-xs uppercase font-bold tracking-widest text-sky-600 dark:text-sky-400">Student Success</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
            Loved by candidates preparing for competitive placements
          </p>
          <p className="text-slate-600 dark:text-slate-400 text-base">
            From tier-1 colleges to self-taught developers across India and globally.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="glass-card rounded-2xl p-7 border border-slate-200 dark:border-slate-800 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-6 italic">
                  &quot;{t.text}&quot;
                </p>
              </div>

              <div className="border-t border-slate-100 dark:border-slate-800/80 pt-4 flex items-center justify-between">
                <div>
                  <h4 className="text-slate-900 dark:text-white font-bold text-sm">{t.name}</h4>
                  <p className="text-xs text-sky-600 dark:text-sky-400 font-semibold">{t.role}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-500">{t.college}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
