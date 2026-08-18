import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, ArrowLeft, Lock, Shield, Eye, Database, CheckCircle2, UserCheck } from 'lucide-react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';

export const PrivacyPage: React.FC = () => {
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

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
            <Lock className="w-3.5 h-3.5" />
            <span>Data Privacy & Security</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-400">
            Last Updated: August 18, 2026 • Compliant with Modern DPDP Standards
          </p>
        </div>

        {/* Privacy Policy Body */}
        <div className="glass-card rounded-2xl p-6 sm:p-10 border border-slate-700/80 space-y-8 text-xs sm:text-sm text-slate-300 leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Shield className="w-4 h-4 text-sky-400" />
              1. Our Privacy Commitment
            </h2>
            <p>
              At <strong>IntervAI</strong> (created by <strong>Gautam Kumar Maurya</strong> at <strong>United Institute of Technology - UIT</strong>), we take student and candidate privacy seriously. We collect only the data necessary to provide personalized AI mock interview simulations, score candidate responses, and track your readiness trajectory.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Database className="w-4 h-4 text-emerald-400" />
              2. Information We Collect
            </h2>
            <p>We process the following categories of information:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
              <li><strong>Account Credentials:</strong> Full name, verified email address, and cryptographically hashed passwords (Argon2).</li>
              <li><strong>Career Profile & Resume Content:</strong> Target job title, target companies, extracted technical skills, and uploaded PDF resumes for question personalization.</li>
              <li><strong>Interview Simulation Data:</strong> Spoken audio transcripts (STT), written responses, turn-by-turn scores, and feedback rubrics.</li>
              <li><strong>Technical Metadata:</strong> IP address, browser user-agent, session timestamps, and error diagnostics for security auditing.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Eye className="w-4 h-4 text-indigo-400" />
              3. How Your Data is Used
            </h2>
            <p>Your data is used strictly for:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
              <li>Generating adaptive mock interview questions tailored to your skills.</li>
              <li>Evaluating response relevance, technical depth, and STAR structuring.</li>
              <li>Dispatching secure OTP verification codes and password reset links via Google Gmail SMTP.</li>
              <li>Tracking longitudinal readiness progress across practice sessions.</li>
            </ul>
            <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-300 font-semibold">
              ✅ We do NOT sell, rent, or trade your personal resume data or contact information to third-party data brokers or advertisers.
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-amber-400" />
              4. Data Security & Storage
            </h2>
            <p>
              IntervAI uses industry-standard 256-bit TLS/SSL encryption for all data in transit. Passwords are never stored in plaintext and are protected using high-iteration Argon2id hashing algorithms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-sky-400" />
              5. Your Rights & Data Deletion
            </h2>
            <p>
              You have the right to inspect, update, or permanently request deletion of your account and all associated mock interview history at any time by contacting our support team or navigating to Account Settings.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Shield className="w-4 h-4 text-rose-400" />
              6. Data Protection Officer Contact
            </h2>
            <p>
              For questions regarding this Privacy Policy or your personal data, reach out directly to:
            </p>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 space-y-1">
              <div><strong>Data Protection Officer:</strong> Gautam Kumar Maurya (gkm563)</div>
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
