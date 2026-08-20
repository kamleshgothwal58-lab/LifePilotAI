import React, { useState, useEffect } from 'react';
import { Sparkles, Activity, Menu, X, ArrowRight, User, ShieldCheck, Terminal, Bot } from 'lucide-react';

interface NavbarProps {
  onOpenAuth: (mode: 'signin' | 'signup') => void;
  onScrollTo: (id: string) => void;
  userEmail?: string | null;
  onSignOut?: () => void;
  onOpenApiKeyGuide?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAuth,
  onScrollTo,
  userEmail,
  onSignOut,
  onOpenApiKeyGuide,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Simple active section detection
      const sections = ['hero', 'digital-twin', 'achievements', 'features', 'how-it-works', 'recommendations'];
      const scrollPosition = window.scrollY + 120;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'hero' },
    { name: 'Digital Twin', id: 'digital-twin' },
    { name: 'Achievements', id: 'achievements' },
    { name: 'Features', id: 'features' },
    { name: 'How It Works', id: 'how-it-works' },
    { name: 'Recommendations', id: 'recommendations' },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    onScrollTo(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0B1120]/90 backdrop-blur-xl border-b border-slate-800/80 shadow-xl shadow-blue-950/20 py-3'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-3 text-left group focus:outline-none cursor-pointer"
            id="brand-logo-btn"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-cyan-400 to-indigo-600 p-[1.5px] shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-all duration-300">
              <div className="w-full h-full bg-[#0F172A] rounded-[10px] flex items-center justify-center">
                <Activity className="w-5 h-5 text-cyan-400 group-hover:text-white transition-colors animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                  LifePilot<span className="text-cyan-400">.AI</span>
                </span>
                <span className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider font-mono">
                  v2.4
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
                Predict Better. Live Better.
              </p>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/80 p-1.5 rounded-full border border-slate-800 backdrop-blur-md shadow-inner shadow-black/40">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-xs font-semibold px-4 py-2 rounded-full transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md shadow-blue-600/30 font-bold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`}
                  id={`nav-link-${link.id}`}
                >
                  {link.name}
                </button>
              );
            })}
          </nav>

          {/* Desktop Auth & API Key Guide */}
          <div className="hidden sm:flex items-center gap-3">
            {onOpenApiKeyGuide && (
              <button
                onClick={onOpenApiKeyGuide}
                className="text-xs font-semibold text-slate-400 hover:text-cyan-300 flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-800/90 bg-slate-900/60 hover:bg-slate-800/80 hover:border-slate-700 transition-all cursor-pointer"
                title="API Key Configuration Guide"
                id="api-key-guide-btn"
              >
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span className="hidden md:inline">API Setup</span>
              </button>
            )}

            {userEmail ? (
              <div className="flex items-center gap-2.5 bg-slate-900/90 border border-slate-800 rounded-xl p-1.5 pr-3 shadow-md">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 text-white flex items-center justify-center font-bold text-xs shadow-inner">
                  {userEmail[0].toUpperCase()}
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[11px] font-semibold text-slate-200 truncate max-w-[120px]">
                    {userEmail.split('@')[0]}
                  </span>
                  <span className="text-[9px] text-slate-500 font-mono">Student Twin</span>
                </div>
                <button
                  onClick={onSignOut}
                  className="text-[11px] font-semibold text-slate-400 hover:text-rose-400 ml-1.5 transition-colors p-1 rounded hover:bg-rose-500/10 cursor-pointer"
                  id="signout-btn"
                  title="Sign out of student session"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenAuth('signin')}
                  className="text-xs font-bold text-slate-300 hover:text-white px-4 py-2.5 rounded-xl transition-colors hover:bg-slate-800/80 border border-transparent hover:border-slate-700 cursor-pointer"
                  id="signin-btn"
                >
                  Sign In
                </button>
                <button
                  onClick={() => onOpenAuth('signup')}
                  className="relative group bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-[length:200%_auto] hover:bg-right transition-all duration-300 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-cyan-500/30 flex items-center gap-1.5 cursor-pointer"
                  id="signup-btn"
                >
                  <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
                  <span>Get Started</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 text-slate-300 hover:text-white rounded-xl bg-slate-900 border border-slate-800 focus:outline-none cursor-pointer"
              aria-label="Toggle menu"
              id="mobile-menu-toggle-btn"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0F172A]/98 backdrop-blur-2xl border-b border-slate-800 px-4 pt-3 pb-6 mt-2 space-y-3 animate-in slide-in-from-top-2 duration-200 shadow-2xl">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-left text-sm font-semibold px-3.5 py-2.5 rounded-xl transition-colors ${
                    isActive
                      ? 'bg-blue-600/20 text-cyan-300 border border-blue-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {link.name}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-800/80 flex flex-col gap-2">
            {userEmail ? (
              <div className="flex items-center justify-between bg-slate-900/90 border border-slate-800 p-3 rounded-xl">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-600/30 text-cyan-400 flex items-center justify-center font-bold text-xs">
                    {userEmail[0].toUpperCase()}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">{userEmail}</span>
                    <span className="text-[10px] text-slate-400">Authenticated Student</span>
                  </div>
                </div>
                <button
                  onClick={onSignOut}
                  className="text-xs font-bold text-rose-400 hover:text-rose-300 px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('signin');
                  }}
                  className="w-full text-center text-xs font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 py-3 rounded-xl border border-slate-700"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('signup');
                  }}
                  className="w-full text-center text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-500 py-3 rounded-xl shadow-md shadow-blue-500/20"
                >
                  Sign Up
                </button>
              </div>
            )}

            {onOpenApiKeyGuide && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenApiKeyGuide();
                }}
                className="w-full text-center text-xs text-slate-400 hover:text-cyan-300 py-2.5 border border-dashed border-slate-800 rounded-xl flex items-center justify-center gap-2 mt-1 bg-slate-900/40"
              >
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>API Key Setup & Architecture Guide</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

