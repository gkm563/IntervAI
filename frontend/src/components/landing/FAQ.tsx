import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Is my uploaded resume kept private and secure?',
      a: 'Yes, absolutely. Your resume is parsed strictly to generate your personalized interview questions and feedback. Your private resume text is never shared with third parties or used for public AI training.',
    },
    {
      q: 'Does IntervAI work for college freshers with limited experience?',
      a: 'Yes! IntervAI is specifically optimized for students and freshers. The AI will focus on your academic projects, internships, coursework, and foundational computer science / domain fundamentals.',
    },
    {
      q: 'Can I use this if I am from a Non-CS / Non-Tech branch preparing for software roles?',
      a: 'Definitely. The AI adapts to your target job role and helps bridge any gaps in explaining your projects and technical transition with clarity.',
    },
    {
      q: 'Do I need a microphone or webcam to practice?',
      a: 'No. IntervAI supports full Text-Only Mode as a first-class citizen. You can practice in libraries or low-connectivity environments by typing your responses.',
    },
    {
      q: 'How are the questions generated?',
      a: 'Our AI engine breaks down your resume bullets, cross-references your target job description and difficulty level, and dynamically formulates authentic technical, architectural, and behavioral STAR questions.',
    },
    {
      q: 'Can I practice questions tailored to specific companies like Google, Amazon, or TCS?',
      a: 'Yes. You can specify your target company, and the AI calibrates the interview format — for instance, deep algorithmic and system trade-offs for FAANG, or structured core fundamentals for campus placement mass recruiters.',
    },
    {
      q: 'Is there a free tier for students?',
      a: 'Yes, our Free Starter Tier includes unlimited text-mode mock interviews, resume project parsing, and monthly free voice/avatar simulations with comprehensive feedback reports.',
    },
    {
      q: 'How does the AI provide feedback on my communication?',
      a: 'In voice and text modes, IntervAI evaluates response structure (e.g. STAR method), filler word density, clarity of technical articulation, and provides concrete rewrite examples for weak answers.',
    },
  ];

  return (
    <section id="faq" className="py-20 lg:py-28 bg-slate-50/50 dark:bg-[#070F22] border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold border border-slate-300 dark:border-slate-700">
            <HelpCircle className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base">
            Everything you need to know about preparing with IntervAI.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="glass-card rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                >
                  <span className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                    {faq.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 bg-sky-50 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-slate-100 dark:border-slate-800/60">
                    {faq.a}
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
