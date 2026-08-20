import React from 'react';
import { Activity, Github, Twitter, Linkedin, Disc as Discord, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onScrollTo: (id: string) => void;
  onOpenApiKeyGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollTo, onOpenApiKeyGuide }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-slate-900 rounded-[6px] flex items-center justify-center">
                  <Activity className="w-4 h-4 text-blue-400" />
                </div>
              </div>
              <span className="font-bold text-lg text-white">
                LifePilot<span className="text-blue-400">.AI</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Predict Better. Live Better. AI-powered Digital Twin technology helping university and high school students forecast academic success and protect mental wellbeing.
            </p>
            <div className="flex items-center gap-3 pt-2 text-slate-400">
              <a href="#" className="hover:text-cyan-400 transition-colors" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-cyan-400 transition-colors" aria-label="Discord">
                <Discord className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-cyan-400 transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-cyan-400 transition-colors" aria-label="GitHub">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button onClick={() => onScrollTo('hero')} className="hover:text-cyan-300 transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('digital-twin')} className="hover:text-cyan-300 transition-colors">
                  Digital Twin Simulator
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('achievements')} className="hover:text-cyan-300 transition-colors">
                  My Achievements
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('features')} className="hover:text-cyan-300 transition-colors">
                  Platform Features
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('how-it-works')} className="hover:text-cyan-300 transition-colors">
                  How It Works
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('recommendations')} className="hover:text-cyan-300 transition-colors">
                  Smart AI Recommendations
                </button>
              </li>
            </ul>
          </div>

          {/* Developer & API Config */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">AI Integration</h4>
            <p className="text-xs text-slate-400">
              Powered by server-side Gemini 3.6 Flash LLM and full-stack Express architecture.
            </p>
            <button
              onClick={onOpenApiKeyGuide}
              className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-blue-300 border border-slate-700/80 px-3 py-2 rounded-xl text-xs font-medium transition-colors"
              id="footer-api-guide-btn"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>.env API Configuration Guide</span>
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-3">
          <div>
            © {new Date().getFullYear()} LifePilot AI Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-slate-300 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-slate-300 transition-colors">
              Student Honor Code
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
