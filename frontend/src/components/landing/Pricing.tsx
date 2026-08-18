import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Sparkles } from 'lucide-react';

export const Pricing: React.FC = () => {
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');

  return (
    <section id="pricing" className="py-20 lg:py-28 bg-[#0B1B3A]/60 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <h2 className="text-xs uppercase font-bold tracking-widest text-sky-400">Simple & Fair</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
            Transparent pricing for students and job seekers
          </p>
          <p className="text-slate-400 text-base">
            Start with our generous free tier today. Upgrade only when you want unlimited AI voice simulations.
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
          
          {/* Free Tier */}
          <div className="glass-card rounded-2xl p-8 border border-slate-700/80 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold mb-4 border border-slate-700">
                <span>Free Forever for Students</span>
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
                  <span>Full Text-Mode Interviews (Unlimited)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>3 Free Voice & Avatar Mock Interviews / month</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Detailed breakdown scores & improvement suggestions</span>
                </li>
              </ul>
            </div>

            <Link
              to="/register"
              className="w-full flex items-center justify-center py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all text-center"
            >
              Get Started Free
            </Link>
          </div>

          {/* Pro Career Tier */}
          <div className="relative glass-card rounded-2xl p-8 border-2 border-sky-500/80 shadow-2xl flex flex-col justify-between bg-gradient-to-b from-[#0F244C] to-[#0B1B3A]">
            <div className="absolute -top-3.5 right-8">
              <span className="inline-flex items-center gap-1 px-3.5 py-1 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 text-white text-xs font-bold shadow-md">
                <Sparkles className="w-3.5 h-3.5" />
                Most Popular
              </span>
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 text-xs font-semibold mb-4 border border-sky-500/20">
                <span>Placement Mastery</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">Career Pro</h3>
              <p className="text-xs text-slate-400 mb-6">Unlimited voice, video, and memory-backed coaching.</p>

              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-extrabold text-white">
                  {currency === 'INR' ? '₹499' : '$9'}
                </span>
                <span className="text-xs text-slate-400 font-medium">/ month</span>
              </div>

              <ul className="space-y-3.5 text-sm text-slate-200 mb-8">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-sky-400 flex-shrink-0" />
                  <span><strong>Unlimited</strong> Voice & 3D Avatar Simulations</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-sky-400 flex-shrink-0" />
                  <span>Company-specific interview calibrations (FAANG / Startups)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-sky-400 flex-shrink-0" />
                  <span>Longitudinal memory: AI tracks your weaknesses over time</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-sky-400 flex-shrink-0" />
                  <span>Custom question retries & targeted improvement drills</span>
                </li>
              </ul>
            </div>

            <Link
              to="/register"
              className="w-full flex items-center justify-center py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 shadow-lg shadow-sky-500/25 transition-all text-center"
            >
              Start 7-Day Free Trial
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};
