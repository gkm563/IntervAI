import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2, Mic, Video, MessageSquare, Star } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-32 overflow-hidden radial-bg">
      {/* Background glow meshes */}
      <div className="mesh-glow bg-sky-500/20 top-0 left-1/4 -translate-x-1/2"></div>
      <div className="mesh-glow bg-indigo-600/15 top-40 right-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Column: Value Proposition */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-xs font-semibold text-sky-400 shadow-inner">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>AI-Powered Real-Time Interview Simulation</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15] font-['Plus_Jakarta_Sans',sans-serif]">
              Practice interviews with an AI that{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-300">
                actually knows your resume.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Upload your resume, pick your dream role, and practice with an adaptive AI interviewer — voice, video, or text. Get deep feedback on technical depth, clarity, and communication.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/register"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-sky-500 via-sky-600 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 shadow-xl shadow-sky-500/25 hover:shadow-sky-500/35 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Sparkles className="w-5 h-5 text-sky-200" />
                Start Free Mock Interview
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>

              <a
                href="#demo"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-base font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 transition-all"
              >
                Try 60s Live Demo
              </a>
            </div>

            {/* Micro guarantees */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400 font-medium pt-1">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Takes 2 minutes to set up</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
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
              <div className="relative rounded-2xl bg-[#0B1B3A] border border-slate-700/80 shadow-2xl p-6 overflow-hidden">
                
                {/* Header with Avatar & Live State */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-sky-400 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                        🤖
                      </div>
                      <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#0B1B3A]"></span>
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-sm">Alex — Senior Tech Interviewer</h3>
                      <p className="text-xs text-slate-400">Targeting: SDE-1 / Frontend Engineer</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 bg-slate-900/80 px-2.5 py-1 rounded-full border border-slate-800 text-[11px] text-emerald-400 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                    <span>Live AI</span>
                  </div>
                </div>

                {/* Simulated Question Dialogue */}
                <div className="space-y-3 mb-5">
                  <div className="bg-slate-900/90 rounded-xl p-3.5 border border-slate-800/80 text-sm">
                    <div className="flex items-center gap-1.5 text-xs text-sky-400 font-semibold mb-1">
                      <span>Interviewer (AI)</span>
                    </div>
                    <p className="text-slate-200 leading-relaxed text-xs sm:text-sm">
                      &quot;I see on your resume that you built a real-time collaborative editor with WebSockets. How did you handle network disconnects and state synchronization?&quot;
                    </p>
                  </div>

                  <div className="bg-sky-950/40 rounded-xl p-3.5 border border-sky-800/30 text-sm ml-4">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold mb-1">
                      <span>Your Answer (Voice / Text)</span>
                    </div>
                    <p className="text-slate-300 text-xs sm:text-sm">
                      &quot;We used Operational Transformation and a heartbeat ping. If a client disconnected, we queued local operations...&quot;
                    </p>
                  </div>
                </div>

                {/* Real-time Analysis Feedback Preview */}
                <div className="bg-slate-900/60 rounded-xl p-3 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">Real-Time Evaluation</span>
                    <span className="text-emerald-400 font-bold">Strong Technical Depth (92%)</span>
                  </div>
                  
                  <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-gradient-to-r from-sky-400 to-emerald-400 h-1.5 rounded-full w-[92%]"></div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                    <span className="flex items-center gap-1"><Mic className="w-3 h-3 text-sky-400" /> Natural Cadence</span>
                    <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-400" /> Resume Verified</span>
                  </div>
                </div>

                {/* Available Modes Strip */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-around text-xs text-slate-400">
                  <span className="flex items-center gap-1 text-slate-300 font-medium">
                    <Mic className="w-3.5 h-3.5 text-sky-400" /> Voice Mode
                  </span>
                  <span className="text-slate-600">•</span>
                  <span className="flex items-center gap-1 text-slate-300 font-medium">
                    <Video className="w-3.5 h-3.5 text-indigo-400" /> 3D Avatar
                  </span>
                  <span className="text-slate-600">•</span>
                  <span className="flex items-center gap-1 text-slate-300 font-medium">
                    <MessageSquare className="w-3.5 h-3.5 text-teal-400" /> Text Mode
                  </span>
                </div>

              </div>
            </div>
          </div>

        </div>

        {/* Trust Strip */}
        <div className="mt-16 sm:mt-24 pt-8 border-t border-slate-800/80 text-center">
          <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-6">
            Engineered for Campus Placements & Global Tech Interviews
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all text-sm font-semibold text-slate-400">
            <span>Google</span>
            <span>Amazon</span>
            <span>Microsoft</span>
            <span>TCS Digital</span>
            <span>Infosys</span>
            <span>Flipkart</span>
            <span>Zomato</span>
            <span>Top Tier Startups</span>
          </div>
        </div>

      </div>
    </section>
  );
};
