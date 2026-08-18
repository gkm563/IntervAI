import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, Sparkles, Play, ShieldCheck, ArrowRight, CheckCircle2, Mic } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-32 overflow-hidden radial-bg">
      {/* Background glowing blurred decorative orb */}
      <div className="mesh-glow bg-sky-500/20 -top-20 -left-20 animate-pulse-subtle"></div>
      <div className="mesh-glow bg-indigo-500/20 top-1/2 -right-20 animate-pulse-subtle delay-1000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Column: Headline & Value Proposition */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-100 dark:bg-sky-500/10 border border-sky-300 dark:border-sky-500/20 text-xs font-extrabold text-sky-800 dark:text-sky-300 shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-600 dark:bg-sky-400 animate-pulse"></span>
              <span>AI-Powered Real-Time Interview Simulation</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15] font-['Plus_Jakarta_Sans',sans-serif]">
              Practice interviews with an AI that{' '}
              <span className="text-sky-600 dark:text-sky-400 underline decoration-sky-400/50 decoration-wavy underline-offset-4 font-black">
                actually knows
              </span>{' '}
              your resume.
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Upload your resume, pick your dream role, and practice with an adaptive AI interviewer — voice, video, or text. Get deep feedback on technical depth, clarity, and communication.
            </p>

            {/* CTA Buttons Group */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/register"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-sky-500 via-sky-600 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 shadow-lg shadow-sky-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Sparkles className="w-4 h-4" />
                <span>Start Free Mock Interview</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="#demo"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700/80 border border-slate-300 dark:border-slate-700 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Try 60s Live Demo</span>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4 text-xs text-slate-600 dark:text-slate-400 font-semibold">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Takes 2 minutes to set up</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>100% private resume analysis</span>
              </div>
            </div>
          </div>

          {/* Right Hero Column: Interactive AI Interviewer Card Mockup */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer decorative glowing ring */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-sky-500 to-indigo-600 rounded-2xl blur-lg opacity-30 animate-pulse-subtle"></div>

              {/* Main Card */}
              <div className="relative rounded-2xl bg-white dark:bg-[#0B1B3A] border-2 border-slate-200 dark:border-slate-700/80 shadow-2xl p-6 overflow-hidden">
                
                {/* Header with Avatar & Live State */}
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                        🤖
                      </div>
                      <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white dark:border-[#0B1B3A]"></span>
                    </div>
                    <div>
                      <h3 className="text-slate-900 dark:text-white font-bold text-sm">Alex — Senior Tech Interviewer</h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Targeting: SDE-1 / Frontend Engineer</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 bg-emerald-100 dark:bg-slate-900/80 px-3 py-1 rounded-full border border-emerald-300 dark:border-slate-800 text-xs text-emerald-800 dark:text-emerald-400 font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400 animate-ping"></span>
                    <span>Live AI</span>
                  </div>
                </div>

                {/* Simulated Question Dialogue */}
                <div className="space-y-3 mb-5">
                  <div className="bg-slate-100 dark:bg-slate-900/90 rounded-xl p-4 border border-slate-200 dark:border-slate-800/80 text-sm">
                    <div className="flex items-center gap-1.5 text-xs text-sky-700 dark:text-sky-400 font-extrabold mb-1">
                      <span>Interviewer (AI)</span>
                    </div>
                    <p className="text-slate-900 dark:text-slate-200 leading-relaxed text-xs sm:text-sm font-medium">
                      &quot;I see on your resume that you built a real-time collaborative editor with WebSockets. How did you handle network disconnects and state synchronization?&quot;
                    </p>
                  </div>

                  <div className="bg-sky-50 dark:bg-sky-950/40 rounded-xl p-4 border border-sky-200 dark:border-sky-800/30 text-sm ml-4">
                    <div className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-400 font-bold mb-1">
                      <span>Your Answer (Voice / Text)</span>
                    </div>
                    <p className="text-slate-800 dark:text-slate-300 text-xs sm:text-sm font-medium">
                      &quot;We used Operational Transformation and a heartbeat ping. If a client disconnected, we queued local operations...&quot;
                    </p>
                  </div>
                </div>

                {/* Real-time Analysis Feedback Preview */}
                <div className="bg-slate-100 dark:bg-slate-900/60 rounded-xl p-3.5 border border-slate-200 dark:border-slate-800 space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-700 dark:text-slate-400 font-bold">Real-Time Evaluation</span>
                    <span className="text-emerald-700 dark:text-emerald-400 font-extrabold">Strong Technical Depth (92%)</span>
                  </div>
                  
                  <div className="w-full bg-slate-300 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div className="bg-gradient-to-r from-sky-500 to-emerald-500 h-2 rounded-full w-[92%]"></div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 pt-1 font-semibold">
                    <span className="flex items-center gap-1"><Mic className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" /> Natural Cadence</span>
                    <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Resume Verified</span>
                  </div>
                </div>

                {/* Modality Icons Bar */}
                <div className="flex items-center justify-around pt-4 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-400 font-bold">
                  <span className="flex items-center gap-1">🎙️ Voice Mode</span>
                  <span className="text-slate-300 dark:text-slate-600">•</span>
                  <span className="flex items-center gap-1">🤖 3D Avatar</span>
                  <span className="text-slate-300 dark:text-slate-600">•</span>
                  <span className="flex items-center gap-1">💬 Text Mode</span>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
