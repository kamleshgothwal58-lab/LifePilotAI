import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  Zap,
  CheckCircle,
  Clock,
  RotateCcw,
  BookOpen,
  Moon,
  Brain,
  Award,
  ChevronRight,
  Bookmark,
  Check,
  Flame,
  ArrowUpRight,
} from 'lucide-react';
import { RecommendationItem, StudentProfile } from '../types';

interface SmartRecommendationsProps {
  recommendations: RecommendationItem[];
  profile?: StudentProfile;
  onRegenerate: () => Promise<void>;
  isRegenerating: boolean;
}

export const SmartRecommendationsSection: React.FC<SmartRecommendationsProps> = ({
  recommendations,
  profile,
  onRegenerate,
  isRegenerating,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [appliedTips, setAppliedTips] = useState<Record<string, boolean>>({});

  const categories = ['All', 'Academic', 'Sleep & Recovery', 'Mental Health', 'Time Management'];

  const filteredRecs =
    selectedCategory === 'All'
      ? recommendations
      : recommendations.filter((r) => r.category === selectedCategory);

  const toggleApplyTip = (id: string) => {
    setAppliedTips((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="recommendations" className="py-20 md:py-28 bg-[#0F172A] relative border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-cyan-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Tailored Course Corrections</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Smart AI Recommendations
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Actionable micro-interventions computed by your Digital Twin to boost GPA and lower burnout probability.
            </p>
          </div>

          <button
            onClick={onRegenerate}
            disabled={isRegenerating}
            className="self-start md:self-auto bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold px-5 py-3 rounded-xl text-xs sm:text-sm flex items-center gap-2.5 shadow-lg shadow-blue-600/20 transition-all disabled:opacity-50 cursor-pointer"
            id="regenerate-recommendations-btn"
          >
            <RotateCcw className={`w-4 h-4 text-cyan-100 ${isRegenerating ? 'animate-spin' : ''}`} />
            <span>{isRegenerating ? 'Generating New AI Tips...' : 'Refine & Regenerate Tips'}</span>
          </button>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-800/80">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs font-semibold px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md shadow-blue-600/25 font-bold'
                  : 'bg-slate-900/90 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Recommendations Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredRecs.map((item, idx) => {
            const isApplied = appliedTips[item.id];

            return (
              <motion.div
                key={item.id || idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.08 }}
                className={`rounded-3xl p-6 sm:p-7 border transition-all duration-300 relative bg-[#0B1120] backdrop-blur-xl flex flex-col justify-between ${
                  isApplied
                    ? 'border-emerald-500/50 shadow-xl shadow-emerald-950/20 bg-emerald-950/10'
                    : 'border-slate-800 hover:border-slate-700/90 shadow-xl shadow-slate-950/40 hover:shadow-cyan-950/20'
                }`}
              >
                <div>
                  {/* Card Header Badges */}
                  <div className="flex items-center justify-between gap-2 pb-4 border-b border-slate-800/80">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-lg bg-blue-500/10 text-cyan-300 border border-blue-500/20">
                        {item.category}
                      </span>
                      <span
                        className={`text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-md uppercase tracking-wider ${
                          item.impact === 'High Impact' || item.impact === 'Essential'
                            ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                            : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                        }`}
                      >
                        {item.impact}
                      </span>
                    </div>

                    <span className="text-[11px] text-slate-400 font-mono bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
                      {item.effort}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="py-5 space-y-3">
                    <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {item.actionText}
                    </p>
                  </div>
                </div>

                {/* Impact Indicators */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800/80 mt-2">
                  <div className="flex items-center gap-2 text-xs font-mono">
                    {item.estimatedGpaGain && (
                      <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                        {item.estimatedGpaGain}
                      </span>
                    )}
                    {item.stressReduction && (
                      <span className="text-cyan-300 font-bold bg-cyan-500/10 px-2.5 py-1 rounded-lg border border-cyan-500/20">
                        {item.stressReduction}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => toggleApplyTip(item.id)}
                    className={`text-xs font-semibold px-4 py-2 rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
                      isApplied
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 font-bold'
                        : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-cyan-500/40'
                    }`}
                  >
                    {isApplied ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Applied to Twin</span>
                      </>
                    ) : (
                      <>
                        <Bookmark className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Apply Tip</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

