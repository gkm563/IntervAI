import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, Github, Twitter, Linkedin, Heart, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050B18] border-t border-slate-800 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Col 1: Brand */}
          <div className="col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-400 to-indigo-600 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white font-['Plus_Jakarta_Sans',sans-serif]">
                Interv<span className="text-sky-400">AI</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              The AI-powered interview coach that understands your resume, simulates realistic pressure, and provides personalized feedback to help you land your dream job.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/gkm563/IntervAI"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                aria-label="GitHub Repository"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Product */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-xs uppercase tracking-wider">Product</h4>
            <ul className="space-y-2.5">
              <li><a href="#modes" className="hover:text-sky-400 transition-colors">Voice Interview</a></li>
              <li><a href="#modes" className="hover:text-sky-400 transition-colors">3D Avatar Video</a></li>
              <li><a href="#modes" className="hover:text-sky-400 transition-colors">Text-Only Mode</a></li>
              <li><a href="#sample-report" className="hover:text-sky-400 transition-colors">Answer Analysis</a></li>
              <li><a href="#pricing" className="hover:text-sky-400 transition-colors">Pricing Plans</a></li>
            </ul>
          </div>

          {/* Col 3: Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-xs uppercase tracking-wider">Resources</h4>
            <ul className="space-y-2.5">
              <li><a href="#how-it-works" className="hover:text-sky-400 transition-colors">How It Works</a></li>
              <li><a href="#faq" className="hover:text-sky-400 transition-colors">Student FAQ</a></li>
              <li><a href="#" className="hover:text-sky-400 transition-colors">Placement Guide</a></li>
              <li><a href="#" className="hover:text-sky-400 transition-colors">STAR Framework</a></li>
              <li><a href="https://github.com/gkm563/IntervAI" target="_blank" rel="noreferrer" className="hover:text-sky-400 transition-colors">Open Source Repo</a></li>
            </ul>
          </div>

          {/* Col 4: Legal & Localization */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-xs uppercase tracking-wider">Legal & Trust</h4>
            <ul className="space-y-2.5">
              <li><a href="#" className="hover:text-sky-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-sky-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-sky-400 transition-colors">Data Security</a></li>
              <li><a href="#" className="hover:text-sky-400 transition-colors">Cookie Settings</a></li>
            </ul>

            <div className="mt-6 flex items-center gap-2 text-xs text-slate-400 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 w-fit">
              <Globe className="w-3.5 h-3.5 text-sky-400" />
              <span>English (IN / Global)</span>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} IntervAI Platform. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for Indian & Global Students by Gautam Kumar Maurya
          </p>
        </div>
      </div>
    </footer>
  );
};
