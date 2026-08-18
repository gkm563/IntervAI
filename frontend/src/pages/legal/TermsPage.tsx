import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, ArrowLeft, Shield, Scale, FileText, CheckCircle2 } from 'lucide-react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';

export const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#070F22] text-slate-100 font-sans flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-8">
        {/* Header Breadcrumb */}
        <div className="space-y-3">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-400 hover:text-sky-300 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100 dark:bg-sky-500/15 text-sky-800 dark:text-sky-300 text-xs font-bold border border-sky-300 dark:border-sky-500/30 shadow-sm">
            <Scale className="w-3.5 h-3.5" />
            <span>Legal Agreement</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
            Terms of Service
          </h1>
          <p className="text-xs text-slate-400">
            Last Updated: August 18, 2026 • Effective Immediately
          </p>
        </div>

        {/* Terms Content Body */}
        <div className="glass-card rounded-2xl p-6 sm:p-10 border border-slate-700/80 space-y-8 text-xs sm:text-sm text-slate-300 leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-sky-400" />
              1. Acceptance of Terms
            </h2>
            <p>
              Welcome to <strong>IntervAI</strong> (&quot;Platform&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), architected and maintained by <strong>Gautam Kumar Maurya</strong> in affiliation with <strong>United Institute of Technology (UIT)</strong>. By creating an account, accessing, or using our AI-powered mock interview coaching platform, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Platform.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              2. Description of Services & AI Simulations
            </h2>
            <p>
              IntervAI provides artificial intelligence-assisted interview preparation tools, including:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
              <li>Real-time speech-to-text (STT) and text-to-speech (TTS) voice simulation.</li>
              <li>Procedural 3D Avatar video interview simulations with viseme lip synchronization.</li>
              <li>STAR methodology scoring, technical depth analysis, and candidate placement readiness metrics.</li>
              <li>Resume project parsing and customized question generation.</li>
            </ul>
            <div className="p-4 rounded-xl bg-sky-950/40 border border-sky-500/30 text-xs text-sky-200">
              <strong>Disclaimer:</strong> IntervAI mock interview evaluations and scores are algorithmic simulations designed for educational and practice purposes only. Scores do not guarantee actual job offers or employment outcomes with third-party employers.
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-sky-400" />
              3. User Accounts & Email Verification
            </h2>
            <p>
              To access simulation features, candidates must register with a valid email address and verify ownership via our One-Time Password (OTP) verification system dispatched via Google SMTP. You are responsible for safeguarding your password and account credentials.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Scale className="w-4 h-4 text-amber-400" />
              4. User Conduct & Acceptable Use
            </h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
              <li>Attempt to reverse-engineer, decompile, or disrupt our backend infrastructure or AI models.</li>
              <li>Upload malicious files, viruses, or unlawful resume content.</li>
              <li>Use automated bots or scrapers to extract question banks or user data without explicit written consent.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-sky-400" />
              5. Intellectual Property
            </h2>
            <p>
              All software, algorithms, 3D avatar shaders, user interface designs, and branding of IntervAI are the intellectual property of Gautam Kumar Maurya and its contributors. All open-source modules are licensed under standard repository licenses.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Shield className="w-4 h-4 text-rose-400" />
              6. Contact & Support
            </h2>
            <p>
              For legal inquiries, terms clarification, or platform support, please contact the development team at:
            </p>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 space-y-1">
              <div><strong>Lead Operator:</strong> Gautam Kumar Maurya (gkm563)</div>
              <div><strong>Email:</strong> <a href="mailto:maurgk212104@gmail.com" className="text-sky-400 hover:underline">maurgk212104@gmail.com</a></div>
              <div><strong>Institution:</strong> United Institute of Technology (UIT), Prayagraj</div>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
};
