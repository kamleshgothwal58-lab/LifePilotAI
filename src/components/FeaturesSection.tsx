import React from 'react';
import { motion } from 'motion/react';
import {
  Brain,
  TrendingUp,
  ShieldAlert,
  Clock,
  Sparkles,
  Zap,
  CheckCircle2,
  Activity,
  Layers,
  LineChart,
  Bot,
} from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: LineChart,
      title: '6-Month GPA & Trajectory Forecast',
      description:
        'Neural predictive model projects exam scores, cumulative GPA changes, and subject-level readiness across your upcoming semester.',
      color: 'from-blue-500 to-cyan-400',
    },
    {
      icon: ShieldAlert,
      title: 'Burnout & Fatigue Early Warning',
      description:
        'Calculates sleep debt and stress accumulation to flag mid-semester exhaustion risks before your grades take a hit.',
      color: 'from-amber-500 to-rose-400',
    },
    {
      icon: Clock,
      title: 'Circadian Study-Life Optimizer',
      description:
        'Simulates your optimal cognitive focus windows, recommending exact Pomodoro schedules matched to your natural energy peaks.',
      color: 'from-teal-400 to-emerald-500',
    },
    {
      icon: Bot,
      title: '24/7 AI Academic Mentor',
      description:
        'Streaming conversational coach offering tailored advice on active recall, spaced repetition, exam anxiety, and time management.',
      color: 'from-indigo-400 to-blue-500',
    },
    {
      icon: Activity,
      title: 'Multivariate Goal Simulator',
      description:
        'Tweak study hours, sleep targets, or club duties in real-time to observe instant simulated impacts on your academic future.',
      color: 'from-cyan-400 to-blue-600',
    },
    {
      icon: Layers,
      title: 'Smart Recommendation Engine',
      description:
        'Dynamically synthesizes 3–5 high-yield micro-interventions every week to keep you operating at peak efficiency.',
      color: 'from-emerald-400 to-cyan-500',
    },
  ];

  return (
    <section id="features" className="py-24 bg-slate-950 relative border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-cyan-300 text-xs font-semibold">
            <Zap className="w-3.5 h-3.5" />
            <span>Digital Twin Intelligence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Engineered for Academic Mastery & Wellbeing
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            LifePilot AI continuously analyzes student behavioral inputs to turn daily routines into predictive strategic advantage.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, idx) => {
            const IconComponent = feat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="bg-slate-900/80 border border-slate-800 hover:border-slate-700/80 rounded-2xl p-6 hover:bg-slate-900 transition-all duration-300 shadow-xl shadow-blue-950/20 group relative"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feat.color} p-0.5 mb-5 shadow-lg shadow-blue-500/10 group-hover:scale-110 transition-transform duration-300`}
                >
                  <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-white group-hover:text-cyan-300 transition-colors" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {feat.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {feat.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
