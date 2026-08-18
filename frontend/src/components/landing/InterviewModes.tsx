import React, { useState } from 'react';
import { Mic, Video, MessageSquare, CheckCircle2, Zap } from 'lucide-react';

export const InterviewModes: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'text' | 'voice' | 'video'>('voice');

  const modes = {
    voice: {
      title: 'Voice-First Conversational Mode',
      subtitle: 'Natural speech-to-speech interaction without video distraction',
      desc: 'Speak naturally into your microphone. The AI analyzes your verbal response, detects hesitation/filler words, and responds via low-latency speech synthesis.',
      benefits: [
        'Real-time STT streaming & instant voice response',
        'Cadence, pacing, and filler word analysis (um, ah, like)',
        'Low network bandwidth requirement (~50 kbps)',
        'Great for practicing on headphones anywhere',
      ],
      tag: 'Most Popular',
    },
    video: {
      title: '3D Human-like Avatar Video Mode',
      subtitle: 'Full visual immersion with realistic facial expressions and lip-sync',
      desc: 'Practice maintaining visual focus with a responsive 3D interviewer avatar with real-time phoneme lip-synchronization and adaptive conversational presence.',
      benefits: [
        'Ready Player Me 3D character with real-time lip-sync',
        'Simulates real video interview eye-contact and focus',
        'Blended natural head nodding and listening states',
        'WebGL accelerated with 2D fallback for lighter devices',
      ],
      tag: 'Ultra Realistic',
    },
    text: {
      title: 'Text-Only Quick Practice Mode',
      subtitle: 'Instant interview drills without microphone or quiet room requirements',
      desc: 'Practice in libraries, noisy commutes, or low-bandwidth connections. Type your answers and receive the exact same rigorous evaluation and follow-ups.',
      benefits: [
        'Zero hardware barrier — no mic or webcam required',
        'Works smoothly on 2G/3G mobile networks',
        'Allows thoughtful answer formulation and code snippet drafting',
        'Ideal for rapid-fire technical concept revision',
      ],
      tag: 'Zero Bandwidth Barrier',
    },
  };

  const current = modes[activeTab];

  return (
    <section id="modes" className="py-20 lg:py-28 bg-[#070F22] border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <h2 className="text-xs uppercase font-bold tracking-widest text-sky-400">Flexibility</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
            Choose the interview mode that fits your reality
          </p>
          <p className="text-slate-400 text-base">
            Every candidate has different access to quiet rooms and high-speed internet. IntervAI adapts to you.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-xl bg-slate-900 border border-slate-800">
            <button
              onClick={() => setActiveTab('voice')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'voice'
                  ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Mic className="w-4 h-4" />
              Voice Mode
            </button>
            <button
              onClick={() => setActiveTab('video')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'video'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Video className="w-4 h-4" />
              3D Avatar Mode
            </button>
            <button
              onClick={() => setActiveTab('text')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'text'
                  ? 'bg-teal-600 text-white shadow-md shadow-teal-600/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              Text Mode
            </button>
          </div>
        </div>

        {/* Tab Detail Showcase */}
        <div className="max-w-4xl mx-auto glass-card rounded-2xl p-8 sm:p-10 border border-slate-700/80 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 text-xs font-semibold mb-2 border border-sky-500/20">
                <Zap className="w-3 h-3" />
                <span>{current.tag}</span>
              </div>
              <h3 className="text-2xl font-bold text-white">{current.title}</h3>
              <p className="text-sm text-slate-400">{current.subtitle}</p>
            </div>
          </div>

          <p className="text-slate-300 text-base leading-relaxed mb-6">
            {current.desc}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {current.benefits.map((benefit, i) => (
              <div key={i} className="flex items-start gap-3 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-slate-200">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
