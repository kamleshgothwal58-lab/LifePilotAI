import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Star, Quote, Award, TrendingUp, Sparkles } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: 'Samantha Vance',
      role: 'Pre-Med / Biology Junior',
      university: 'Johns Hopkins University',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      beforeGpa: '3.32 GPA',
      afterGpa: '3.84 GPA',
      stressChange: '-35% Burnout Index',
      quote:
        'LifePilot AI warned me 3 weeks in advance that my 5-hour sleep routine during organic chemistry midterms would cause a cognitive bottleneck. Following its sleep & study recommendations raised my GPA to 3.84!',
    },
    {
      name: 'Marcus Thorne',
      role: 'Computer Science & AI Sophomore',
      university: 'UC Berkeley',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
      beforeGpa: '3.10 GPA',
      afterGpa: '3.68 GPA',
      stressChange: '-42% Stress Score',
      quote:
        'The Digital Twin model showed me that spending 18 hours/week on non-essential clubs was dragging down my algorithms coursework. The AI coach gave me a structured 50/10 focus plan that transformed my grades.',
    },
    {
      name: 'Elena Rostova',
      role: 'High School Senior & AP Scholar',
      university: 'Boston Latin School',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
      beforeGpa: '3.50 GPA',
      afterGpa: '3.95 GPA',
      stressChange: '-28% Stress Score',
      quote:
        'Balancing 5 AP classes and college applications was overwhelming. LifePilot AI calculated my exact daily capacity and helped me maintain an AP 5.0 trajectory without sacrificing sleep.',
    },
    {
      name: 'David K. Oza',
      role: 'Mechanical Engineering Senior',
      university: 'Georgia Tech',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
      beforeGpa: '2.95 GPA',
      afterGpa: '3.52 GPA',
      stressChange: '-50% Burnout Risk',
      quote:
        'I went from severe mid-semester burnout to graduating with honors. The predictive trajectory feature gave me the exact visual motivation I needed to fix my daily habits.',
    },
  ];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section className="py-24 bg-slate-950 relative border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-cyan-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Student Success Stories</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Loved by 12,000+ Student Digital Twins
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Real academic and wellbeing outcomes achieved by students using LifePilot AI predictions.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="max-w-4xl mx-auto bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-10 relative shadow-2xl backdrop-blur-xl">
          <Quote className="w-12 h-12 text-blue-500/20 absolute top-6 right-6 pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Star Rating */}
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-lg sm:text-xl text-slate-100 font-medium leading-relaxed italic">
                "{current.quote}"
              </p>

              {/* Student Metadata & Before/After Metrics */}
              <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={current.avatar}
                    alt={current.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-blue-500/50"
                  />
                  <div>
                    <h4 className="text-base font-bold text-white">{current.name}</h4>
                    <p className="text-xs text-slate-400">
                      {current.role} • {current.university}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs font-mono">
                  <div className="bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 text-slate-400">
                    Before: {current.beforeGpa}
                  </div>
                  <div className="bg-emerald-500/20 text-emerald-300 px-3 py-1.5 rounded-lg border border-emerald-500/30 font-bold flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    Now: {current.afterGpa}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-800/60">
            <div className="flex items-center gap-1.5">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all ${
                    currentIndex === idx ? 'w-8 bg-cyan-400' : 'w-2 bg-slate-700'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
                id="testimonial-prev-btn"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
                id="testimonial-next-btn"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
