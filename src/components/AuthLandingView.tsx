import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Activity,
  Lock,
  Mail,
  User,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Brain,
  Zap,
  ArrowRight,
  GraduationCap,
  CheckCircle2,
} from 'lucide-react';

interface AuthLandingViewProps {
  onLoginSuccess: (email: string, name?: string) => void;
  onOpenApiKeyGuide?: () => void;
}

export const AuthLandingView: React.FC<AuthLandingViewProps> = ({
  onLoginSuccess,
  onOpenApiKeyGuide,
}) => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [academicLevel, setAcademicLevel] = useState('Undergraduate');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorMsg('Please enter a valid student email address.');
      return;
    }

    setErrorMsg('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const displayName = name || email.split('@')[0] || 'Student User';
      onLoginSuccess(email, displayName);
    }, 500);
  };

  const handleQuickDemo = (demoEmail: string, demoName: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(demoEmail, demoName);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 flex flex-col justify-between relative overflow-hidden font-sans selection:bg-cyan-500 selection:text-white">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-blue-600/10 via-cyan-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 p-0.5 shadow-lg shadow-blue-500/20">
            <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
              <Activity className="w-5 h-5 text-blue-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg tracking-tight text-white">
                LifePilot<span className="text-blue-400">.AI</span>
              </span>
              <span className="bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Twin App
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
              Predictive Academic Intelligence & Wellbeing Gateway
            </p>
          </div>
        </div>

        {onOpenApiKeyGuide && (
          <button
            onClick={onOpenApiKeyGuide}
            className="text-xs font-medium text-slate-400 hover:text-blue-300 flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-800 bg-slate-900/60 hover:border-slate-700 transition-colors"
            id="auth-landing-api-guide-btn"
          >
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span className="hidden sm:inline">API Setup Guide</span>
          </button>
        )}
      </header>

      {/* Main Container */}
      <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex-1 flex flex-col lg:flex-row items-center justify-center gap-12 z-10">
        {/* Left Column: App Teaser & Value Prop */}
        <div className="flex-1 space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-cyan-300 text-xs font-semibold shadow-sm">
            <Lock className="w-3.5 h-3.5" />
            <span>Secure Student Authentication Required</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Predict Your GPA & Burnout Before It Happens
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0">
            Sign in or create your student account to unlock your personalized Digital Twin simulation engine, 6-month predictive trajectories, and streaming Gemini AI mentor.
          </p>

          {/* Feature Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-left">
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10 text-cyan-400 shrink-0">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">6-Month Forecast</h4>
                <p className="text-[11px] text-slate-400">Simulate future GPA curves & exam readiness.</p>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
                <Brain className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Burnout Index</h4>
                <p className="text-[11px] text-slate-400">Detect sleep debt & fatigue risks 3 weeks early.</p>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Smart Recommendations</h4>
                <p className="text-[11px] text-slate-400">AI micro-interventions for optimal study rhythm.</p>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 shrink-0">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">24/7 AI Mentor</h4>
                <p className="text-[11px] text-slate-400">Streaming academic coaching & active recall drills.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Auth Card */}
        <div className="w-full max-w-md shrink-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative"
          >
            {/* Mode Switcher */}
            <div className="flex bg-slate-950 p-1 rounded-xl mb-6 border border-slate-800">
              <button
                type="button"
                onClick={() => setMode('signin')}
                className={`flex-1 text-xs font-semibold py-2.5 rounded-lg transition-colors ${
                  mode === 'signin'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
                id="auth-mode-signin-btn"
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setMode('signup')}
                className={`flex-1 text-xs font-semibold py-2.5 rounded-lg transition-colors ${
                  mode === 'signup'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
                id="auth-mode-signup-btn"
              >
                Create Account
              </button>
            </div>

            {/* Auth Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Alex Chen"
                      className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-10 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Student Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@university.edu"
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-10 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-10 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Academic Track
                  </label>
                  <select
                    value={academicLevel}
                    onChange={(e) => setAcademicLevel(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                  >
                    <option value="Undergraduate">Undergraduate Student</option>
                    <option value="Pre-Med / STEM">Pre-Med / STEM Major</option>
                    <option value="High School Senior">High School Senior / AP</option>
                    <option value="Graduate Student">Graduate Student</option>
                  </select>
                </div>
              )}

              {errorMsg && (
                <p className="text-xs text-rose-400 font-medium text-center">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold py-3 rounded-xl text-xs sm:text-sm shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all mt-2"
                id="landing-auth-submit-btn"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-cyan-200" />
                    <span>{mode === 'signin' ? 'Sign In to Dashboard' : 'Create Student Twin Account'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Quick Demo Login Divider */}
            <div className="mt-6 pt-5 border-t border-slate-800 space-y-3">
              <div className="text-center text-[11px] text-slate-400 font-medium uppercase tracking-wider">
                Or Enter Instantly via Demo Student
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickDemo('alex.chen@berkeley.edu', 'Alex Chen')}
                  className="bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-800 hover:border-slate-700 text-[11px] font-semibold py-2.5 px-2 rounded-xl transition-colors text-center truncate flex items-center justify-center gap-1.5"
                  id="demo-login-cs-btn"
                >
                  <GraduationCap className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="truncate">CS Student Twin</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickDemo('jordan.rivera@jhu.edu', 'Jordan Rivera')}
                  className="bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-800 hover:border-slate-700 text-[11px] font-semibold py-2.5 px-2 rounded-xl transition-colors text-center truncate flex items-center justify-center gap-1.5"
                  id="demo-login-premed-btn"
                >
                  <Activity className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span className="truncate">Pre-Med Twin</span>
                </button>
              </div>
            </div>

            {/* Privacy notice */}
            <div className="mt-4 text-center text-[10px] text-slate-500 flex items-center justify-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span>Encrypted student simulation engine. Privacy protected.</span>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 border-t border-slate-900 text-center text-xs text-slate-500 z-10">
        © {new Date().getFullYear()} LifePilot AI Inc. All rights reserved.
      </footer>
    </div>
  );
};
