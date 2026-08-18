import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Hero } from '../components/landing/Hero';
import { ProblemAgitation } from '../components/landing/ProblemAgitation';
import { HowItWorks } from '../components/landing/HowItWorks';
import { LiveDemoPreview } from '../components/landing/LiveDemoPreview';
import { FeatureGrid } from '../components/landing/FeatureGrid';
import { InterviewModes } from '../components/landing/InterviewModes';
import { SampleReportPreview } from '../components/landing/SampleReportPreview';
import { SocialProof } from '../components/landing/SocialProof';
import { Pricing } from '../components/landing/Pricing';
import { FAQ } from '../components/landing/FAQ';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#070F22]">
      <Navbar />

      <main className="flex-1">
        <Hero />
        <ProblemAgitation />
        <HowItWorks />
        <LiveDemoPreview />
        <FeatureGrid />
        <InterviewModes />
        <SampleReportPreview />
        <SocialProof />
        <Pricing />
        <FAQ />

        {/* Final CTA Section */}
        <section className="py-20 lg:py-28 bg-gradient-to-b from-[#0B1B3A] to-[#070F22] border-t border-slate-800 relative overflow-hidden text-center">
          <div className="mesh-glow bg-sky-500/20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
              Ready to walk into your next interview with complete confidence?
            </h2>
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto">
              Join thousands of students and engineers preparing with resume-tailored AI mock interviews today.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/register"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-sky-500 via-sky-600 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 shadow-xl shadow-sky-500/30 transition-all hover:scale-[1.02]"
              >
                <Sparkles className="w-5 h-5" />
                Start Free Mock Interview Now
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <p className="text-xs text-slate-500 pt-2 font-medium">
              Free student starter plan • No credit card required • Set up in 2 minutes
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
