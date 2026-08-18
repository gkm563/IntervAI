import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Sparkles, Clock, Bell, CheckCircle2 } from 'lucide-react';

export const Pricing: React.FC = () => {
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');
  const [joinedWaitlist, setJoinedWaitlist] = useState(false);

  const handleJoinWaitlist = () => {
    setJoinedWaitlist(true);
    setTimeout(() => {
      // Keep state true
    }, 500);
  };

  return (
    <section id="pricing" className="py-20 lg:py-28 bg-[#0B1B3A]/60 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <h2 className="text-xs uppercase font-bold tracking-widest text-sky-400">Simple & Fair</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
            Transparent pricing for students and job seekers
          </p>
          <p className="text-slate-400 text-base">
            Start with our generous free tier today. Voice, 3D Avatar, Text modes, and Practice Drills are 100% active and free.
          </p>

          {/* Currency Toggle */}
          <div className="pt-4 flex justify-center">
            <div className="inline-flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setCurrency('INR')}
                className={`px-4 py-1.5 rounded-lg transition-all ${
                  currency === 'INR' ? 'bg-sky-500 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                ₹ INR (India)
              </button>
              <button
                onClick={() => setCurrency('USD')}
                className={`px-4 py-1.5 rounded-lg transition-all ${
                  currency === 'USD' ? 'bg-sky-500 text-white shadow-sm' : 'text-slate-400 hover:text-white'
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
          <div className="glass-card rounded-2xl p-8 border-2 border-emerald-500/60 flex flex-col justify-between shadow-xl shadow-emerald-500/10">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-bold mb-4 border border-emerald-500/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Active & Free for Students</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">Starter Practice</h3>
              <p className="text-xs text-slate-400 mb-6">Everything needed to practice your core resume projects.</p>

              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-extrabold text-white">
                  {currency === 'INR' ? '₹0' : '$0'}
                </span>
                <span className="text-xs text-slate-400 font-medium">/ forever</span>
              </div>

              <ul className="space-y-3.5 text-sm text-slate-300 mb-8">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Resume upload & AI project extraction</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>3D Avatar Video Simulations (Procedural lip-sync)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Real-time Voice STT / TTS Audio Interviewing</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Full Text Mode & Targeted Practice Drills</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Detailed breakdown scores & improvement suggestions</span>
                </li>
              </ul>
            </div>

            <Link
              to="/register"
              className="w-full flex items-center justify-center py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 shadow-lg shadow-emerald-500/20 transition-all text-center"
            >
              Get Started Free (All Features Active)
            </Link>
          </div>

          {/* Career Pro — Coming Soon Feature */}
          <div className="relative glass-card rounded-2xl p-8 border border-slate-700/80 shadow-2xl flex flex-col justify-between bg-gradient-to-b from-[#0F244C]/60 to-[#0B1B3A]/80">
            <div className="absolute -top-3.5 right-8">
              <span className="inline-flex items-center gap-1 px-3.5 py-1 rounded-full bg-slate-800 text-amber-400 text-xs font-extrabold border border-amber-400/30 shadow-md">
                <Clock className="w-3.5 h-3.5" />
                Coming Soon
              </span>
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 text-xs font-semibold mb-4 border border-sky-500/20">
                <span>Enterprise Tier</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">Career Pro</h3>
              <p className="text-xs text-slate-400 mb-6">Advanced enterprise features & dedicated live recruiter mock calibrations.</p>

              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-extrabold text-white">
                  {currency === 'INR' ? '₹499' : '$9'}
                </span>
                <span className="text-xs text-slate-400 font-medium">/ month (Planned)</span>
              </div>

              <ul className="space-y-3.5 text-sm text-slate-400 mb-8">
                <li className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>Company-specific bar-raiser calibrations (FAANG / Hedge Funds)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>Longitudinal vector memory tracking weakness trends across months</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>1-on-1 human expert mock review integration</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>Custom institutional placement drive portal</span>
                </li>
              </ul>
            </div>

            {joinedWaitlist ? (
              <div className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-sm font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-500/40 text-center animate-in fade-in-50 duration-150">
                <CheckCircle2 className="w-4 h-4" />
                <span>You&apos;re on the Career Pro VIP Waitlist!</span>
              </div>
            ) : (
              <button
                onClick={handleJoinWaitlist}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-sm font-bold text-slate-200 bg-slate-800/90 hover:bg-slate-700 hover:text-white border border-slate-700 transition-all text-center cursor-pointer"
              >
                <Bell className="w-4 h-4 text-amber-400" />
                <span>Join Career Pro Early Access Waitlist</span>
              </button>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
