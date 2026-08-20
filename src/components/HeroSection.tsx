import React from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  TrendingUp,
  Brain,
  ShieldAlert,
  ArrowRight,
  Play,
  CheckCircle2,
  Zap,
  Activity,
  BarChart3,
  Moon,
  Clock,
  Award,
} from 'lucide-react';

interface HeroSectionProps {
  onStartSimulation: () => void;
  onExploreDemo: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartSimulation,
  onExploreDemo,
}) => {
  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Dark Navy & Glowing Electric Blue Radial Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[650px] bg-gradient-to-b from-blue-900/15 via-cyan-950/10 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-20 left-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-40 right-10 w-[420px] h-[420px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 space-y-7 text-center lg:text-left"
          >
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/90 border border-blue-500/30 text-cyan-300 text-xs font-semibold tracking-wide shadow-lg shadow-blue-950/40">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
              </span>
              <span className="font-medium text-slate-200">Next-Gen Predictive AI for Students</span>
              <span className="text-slate-600">•</span>
              <span className="text-cyan-300 flex items-center gap-1 font-mono font-bold text-[11px]">
                <Zap className="w-3 h-3 text-cyan-400 fill-cyan-400" /> Live Twin Engine
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08]">
              Meet Your Future <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-300 bg-clip-text text-transparent">
                Before It Happens
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              A Digital Twin that predicts how today's choices shape your academic success and wellbeing.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onStartSimulation}
                className="w-full sm:w-auto relative group bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-[length:200%_auto] hover:bg-right transition-all duration-300 text-white font-bold px-8 py-4 rounded-xl shadow-xl shadow-blue-500/25 hover:shadow-cyan-500/35 flex items-center justify-center gap-2.5 text-sm sm:text-base cursor-pointer"
                id="hero-create-twin-btn"
              >
                <Sparkles className="w-5 h-5 text-cyan-200" />
                <span>Simulate Your Digital Twin</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreDemo}
                className="w-full sm:w-auto bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold px-7 py-4 rounded-xl border border-slate-800 hover:border-slate-700 transition-all duration-200 flex items-center justify-center gap-2.5 text-sm sm:text-base shadow-md cursor-pointer"
                id="hero-explore-demo-btn"
              >
                <Play className="w-4 h-4 text-cyan-400 fill-cyan-400/30" />
                <span>Load Sample Twin</span>
              </button>
            </div>

            {/* Micro Social Proof Tickers */}
            <div className="pt-8 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-left">
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-1.5 font-mono">
                  <span>94.2%</span>
                  <TrendingUp className="w-4 h-4 text-emerald-400 inline" />
                </div>
                <div className="text-xs text-slate-400 font-medium">Prediction Accuracy</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono">
                  12,400+
                </div>
                <div className="text-xs text-slate-400 font-medium">Student Twins Created</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-extrabold text-cyan-300 tracking-tight font-mono">
                  +0.38 GPA
                </div>
                <div className="text-xs text-slate-400 font-medium">Average Improvement</div>
              </div>
            </div>
          </motion.div>

          {/* Right Visual Interactive Mockup Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-7 shadow-2xl shadow-blue-950/60 backdrop-blur-2xl">
              {/* Subtle Ambient Radial Glow */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-3xl blur opacity-50 -z-10" />

              {/* Mock Twin Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center text-cyan-400 shadow-md">
                    <Brain className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white flex items-center gap-2">
                      <span>Live Twin Simulation</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    </div>
                    <div className="text-xs text-slate-400">Pre-Med / STEM • Junior Track</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] text-slate-400 font-medium">6-Mo Projection</div>
                  <div className="text-base font-extrabold text-emerald-400 font-mono">3.84 GPA (+0.42)</div>
                </div>
              </div>

              {/* Trajectory Mini Visual */}
              <div className="py-4 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                    <BarChart3 className="w-4 h-4 text-cyan-400" /> Projected Success Curve
                  </span>
                  <span className="text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full font-mono text-[11px] font-bold">
                    Low Burnout Risk (18%)
                  </span>
                </div>

                <div className="h-28 bg-[#0B1120] rounded-2xl border border-slate-800/80 p-3.5 flex items-end justify-between gap-2.5">
                  {[
                    { month: 'M1', gpa: '3.42', height: '42%' },
                    { month: 'M2', gpa: '3.55', height: '56%' },
                    { month: 'M3', gpa: '3.68', height: '70%' },
                    { month: 'M4', gpa: '3.75', height: '80%' },
                    { month: 'M5', gpa: '3.81', height: '90%' },
                    { month: 'M6', gpa: '3.84', height: '98%' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                      <span className="text-[10px] text-cyan-300 font-mono font-bold">{item.gpa}</span>
                      <div
                        style={{ height: item.height }}
                        className="w-full bg-gradient-to-t from-blue-600 via-cyan-500 to-teal-400 rounded-t-lg opacity-85 group-hover:opacity-100 transition-all duration-200 shadow-sm"
                      />
                      <span className="text-[10px] text-slate-500 font-medium">{item.month}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Daily Habit Impact Snapshot */}
              <div className="space-y-2 pt-1">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                  Calibrated Lifestyle Vectors
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-blue-400" /> Study:
                    </span>
                    <span className="text-white font-bold font-mono">6.5 hrs/day</span>
                  </div>
                  <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Moon className="w-3.5 h-3.5 text-indigo-400" /> Sleep:
                    </span>
                    <span className="text-emerald-400 font-bold font-mono">7.5 hrs/night</span>
                  </div>
                  <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-rose-400" /> Stress:
                    </span>
                    <span className="text-cyan-300 font-bold font-mono">4/10 (Zen)</span>
                  </div>
                  <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-amber-400" /> Target:
                    </span>
                    <span className="text-amber-400 font-bold font-mono">3.90 GPA</span>
                  </div>
                </div>
              </div>

              {/* Dynamic AI Tip Floating Banner */}
              <div className="mt-4 p-3.5 bg-gradient-to-r from-blue-950/80 to-cyan-950/80 border border-blue-500/30 rounded-2xl flex items-start gap-3 shadow-md">
                <Sparkles className="w-4 h-4 text-cyan-300 mt-0.5 shrink-0" />
                <p className="text-xs text-slate-200 leading-relaxed">
                  <strong className="text-white font-semibold">AI Recommendation:</strong> Shifting 25-minute active recall blocks to early morning boosts exam retention by 22%.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

