import React from 'react';
import { motion } from 'motion/react';
import { Sliders, Brain, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Input Your Daily Habits',
      description: 'Enter study hours, sleep duration, current GPA, stress rating, and extracurriculars.',
      icon: Sliders,
    },
    {
      step: '02',
      title: 'AI Builds Your Twin',
      description: 'Our neural engine constructs a simulated model reflecting your cognitive and stress patterns.',
      icon: Brain,
    },
    {
      step: '03',
      title: 'View 6-Month Trajectory',
      description: 'Explore predicted GPA curves, burnout risk percentages, and readiness radar benchmarks.',
      icon: TrendingUp,
    },
    {
      step: '04',
      title: 'Execute Smart Tips',
      description: 'Receive AI-generated micro-interventions to optimize study focus and protect mental health.',
      icon: CheckCircle,
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-slate-900/60 relative border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
            <span>4-Step Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How LifePilot AI Works
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Simple, science-backed predictive workflow designed to help students predict better and live better.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((stepItem, idx) => {
            const IconComp = stepItem.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative flex flex-col justify-between group hover:border-blue-500/50 transition-colors shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-cyan-400 font-mono">
                      {stepItem.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                      <IconComp className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2">
                    {stepItem.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {stepItem.description}
                  </p>
                </div>

                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-slate-600">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
