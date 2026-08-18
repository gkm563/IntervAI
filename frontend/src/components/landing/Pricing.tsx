import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Sparkles, Clock, Bell, CheckCircle2 } from 'lucide-react';

export const Pricing: React.FC = () => {
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');
  const [joinedWaitlist, setJoinedWaitlist] = useState(false);

  const handleJoinWaitlist = () => {
    setJoinedWaitlist(true);
  };

  return (
    <section id="pricing" className="py-20 lg:py-28 bg-white dark:bg-[#0B1B3A]/60 border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <h2 className="text-xs uppercase font-bold tracking-widest text-sky-600 dark:text-sky-400">Simple & Fair</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
            Transparent pricing for students and job seekers
          </p>
          <p className="text-slate-600 dark:text-slate-400 text-base">
            Start with our generous free tier today. Voice, 3D Avatar, Text modes, and Practice Drills are 100% active and free.
          </p>

          {/* Currency Toggle */}
          <div className="pt-4 flex justify-center">
            <div className="inline-flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-xs font-bold shadow-sm">
              <button
                onClick={() => setCurrency('INR')}
                className={`px-4 py-1.5 rounded-lg transition-all cursor-pointer ${
                  currency === 'INR' ? 'bg-sky-500 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                ₹ INR (India)
              </button>
              <button
                onClick={() => setCurrency('USD')}
                className={`px-4 py-1.5 rounded-lg transition-all cursor-pointer ${
                  currency === 'USD' ? 'bg-sky-500 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                $ USD (Global)
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* Free Tier — 100% Active */}
          <div className="glass-card rounded-2xl p-8 border-2 border-emerald-500/80 flex flex-col justify-between shadow-xl shadow-emerald-500/10">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 text-xs font-bold mb-4 border border-emerald-200 dark:border-emerald-500/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Active & Free for Students</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Starter Practice</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-6">Everything needed to practice your core resume projects.</p>

              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-extrabold text-slate-900 dark:text-white">
                  {currency === 'INR' ? '₹0' : '$0'}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">/ forever</span>
              </div>

              <ul className="space-y-3 text-xs text-slate-700 dark:text-slate-300 mb-8">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span><strong>Unlimited</strong> Text-Only AI Mock Interviews</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span><strong>Full Voice & 3D Avatar</strong> Simulation Access</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Resume Parsing & Project-Specific Questions</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>STAR Rubric Scoring & Weakness Analytics</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Interactive Practice Drills & Gamified Quests</span>
                </li>
              </ul>
            </div>

            <Link
              to="/register"
              className="w-full py-3 px-4 rounded-xl text-sm font-bold text-center text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-600/25 transition-all cursor-pointer block"
            >
              Get Started Now — 100% Free
            </Link>
          </div>

          {/* Career Pro Tier — Coming Soon */}
          <div className="glass-card rounded-2xl p-8 border border-slate-200 dark:border-slate-800 flex flex-col justify-between relative overflow-hidden bg-slate-50/50 dark:bg-slate-900/40">
            {/* Ribbon */}
            <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-500/15 text-amber-700 dark:text-amber-300 text-xs font-bold border border-amber-200 dark:border-amber-500/30">
              <Clock className="w-3.5 h-3.5" />
              <span>Coming Soon 🚀</span>
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-500/15 text-sky-700 dark:text-sky-400 text-xs font-bold mb-4 border border-sky-200 dark:border-sky-500/30">
                <span>Enterprise Tier</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Career Pro</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-6">Advanced institutional calibration & 1-on-1 expert mentor reviews.</p>

              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-extrabold text-slate-400">
                  {currency === 'INR' ? '₹799' : '$19'}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">/ month (Planned)</span>
              </div>

              <ul className="space-y-3 text-xs text-slate-600 dark:text-slate-400 mb-8 opacity-80">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-sky-500 flex-shrink-0" />
                  <span>Unlimited High-Fidelity 3D Video Sessions</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-sky-500 flex-shrink-0" />
                  <span>FAANG Company-Specific Secret Question Banks</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-sky-500 flex-shrink-0" />
                  <span>Monthly Human Staff Engineer Mock Feedback</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-sky-500 flex-shrink-0" />
                  <span>Priority Placement Readiness Certificate</span>
                </li>
              </ul>
            </div>

            {joinedWaitlist ? (
              <div className="w-full py-3 px-4 rounded-xl text-xs font-bold text-center text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>You&apos;re on the VIP Early-Access List!</span>
              </div>
            ) : (
              <button
                onClick={handleJoinWaitlist}
                className="w-full py-3 px-4 rounded-xl text-sm font-bold text-center text-slate-800 dark:text-white bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Bell className="w-4 h-4 text-amber-500" />
                <span>Join VIP Waitlist</span>
              </button>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
