import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Award,
  Moon,
  Zap,
  Smile,
  GraduationCap,
  Scale,
  Shield,
  Rocket,
  Bot,
  Lock,
  CheckCircle2,
  Sparkles,
  Trophy,
  Star,
  Info,
  ChevronRight,
  Flame,
  Crown,
} from 'lucide-react';
import { StudentProfile, PredictionData, AchievementBadge } from '../types';

interface AchievementsSectionProps {
  profile: StudentProfile | null;
  predictionData: PredictionData | null;
}

export const AchievementsSection: React.FC<AchievementsSectionProps> = ({
  profile,
  predictionData,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [selectedBadge, setSelectedBadge] = useState<AchievementBadge | null>(null);

  // Helper defaults if profile is null
  const p = profile || {
    studyHoursPerDay: 0,
    sleepHoursPerNight: 0,
    currentGpa: 0,
    targetGpa: 0,
    stressLevel: 10,
    extracurricularHoursPerWeek: 0,
    socialHoursPerWeek: 0,
  };

  // Compute Badges Dynamically
  const badgesList: AchievementBadge[] = [
    {
      id: 'consistent-sleeper',
      title: 'Consistent Sleeper',
      category: 'Sleep & Recovery',
      description: 'Sustains 7.5+ hours of nightly sleep to maximize memory consolidation and cognitive recall.',
      criteria: 'Sleep ≥ 7.5 hours / night',
      iconName: 'Moon',
      unlocked: p.sleepHoursPerNight >= 7.5,
      progressPercent: Math.min(100, Math.round((p.sleepHoursPerNight / 7.5) * 100)),
      xpPoints: 250,
      unlockedAt: p.sleepHoursPerNight >= 7.5 ? 'Active Profile' : undefined,
    },
    {
      id: 'academic-marathoner',
      title: 'Academic Marathoner',
      category: 'Academic',
      description: 'Logs 6.0+ hours of dedicated study per day for uninterrupted deep focus.',
      criteria: 'Study ≥ 6.0 hours / day',
      iconName: 'Zap',
      unlocked: p.studyHoursPerDay >= 6.0,
      progressPercent: Math.min(100, Math.round((p.studyHoursPerDay / 6.0) * 100)),
      xpPoints: 300,
      unlockedAt: p.studyHoursPerDay >= 6.0 ? 'Active Profile' : undefined,
    },
    {
      id: 'zen-master',
      title: 'Zen Master',
      category: 'Wellbeing',
      description: 'Maintains stress levels at or below 4/10 despite challenging coursework.',
      criteria: 'Stress ≤ 4 / 10',
      iconName: 'Smile',
      unlocked: p.stressLevel <= 4 && p.stressLevel > 0,
      progressPercent: p.stressLevel === 0 ? 0 : Math.min(100, Math.round(((10 - p.stressLevel) / 6) * 100)),
      xpPoints: 200,
      unlockedAt: p.stressLevel <= 4 && p.stressLevel > 0 ? 'Active Profile' : undefined,
    },
    {
      id: 'honor-roll-bound',
      title: 'Honor Roll Bound',
      category: 'Academic',
      description: 'Maintains a current GPA ≥ 3.50 or targets a 3.80+ cumulative semester GPA.',
      criteria: 'Current GPA ≥ 3.5 or Target GPA ≥ 3.8',
      iconName: 'GraduationCap',
      unlocked: p.currentGpa >= 3.5 || p.targetGpa >= 3.8,
      progressPercent: Math.min(100, Math.round((Math.max(p.currentGpa, p.targetGpa) / 3.8) * 100)),
      xpPoints: 350,
      unlockedAt: p.currentGpa >= 3.5 || p.targetGpa >= 3.8 ? 'Active Profile' : undefined,
    },
    {
      id: 'well-rounded-scholar',
      title: 'Well-Rounded Scholar',
      category: 'Balance',
      description: 'Balances 10+ hours/week of extracurriculars with 8+ hours of social recovery time.',
      criteria: 'Extracurriculars ≥ 10h & Social ≥ 8h / week',
      iconName: 'Scale',
      unlocked: p.extracurricularHoursPerWeek >= 10 && p.socialHoursPerWeek >= 8,
      progressPercent: Math.min(
        100,
        Math.round(
          ((Math.min(p.extracurricularHoursPerWeek, 10) / 10) * 0.5 +
            (Math.min(p.socialHoursPerWeek, 8) / 8) * 0.5) *
            100
        )
      ),
      xpPoints: 250,
      unlockedAt: p.extracurricularHoursPerWeek >= 10 && p.socialHoursPerWeek >= 8 ? 'Active Profile' : undefined,
    },
    {
      id: 'burnout-defender',
      title: 'Burnout Defender',
      category: 'Wellbeing',
      description: 'Proactively safeguards mental health with 7+ hours sleep and low-moderate stress.',
      criteria: 'Sleep ≥ 7.0h & Stress ≤ 5',
      iconName: 'Shield',
      unlocked: p.sleepHoursPerNight >= 7.0 && p.stressLevel <= 5 && p.stressLevel > 0,
      progressPercent: Math.min(
        100,
        Math.round(
          ((Math.min(p.sleepHoursPerNight, 7) / 7) * 0.5 +
            (Math.max(0, 10 - p.stressLevel) / 5) * 0.5) *
            100
        )
      ),
      xpPoints: 300,
      unlockedAt: p.sleepHoursPerNight >= 7.0 && p.stressLevel <= 5 && p.stressLevel > 0 ? 'Active Profile' : undefined,
    },
    {
      id: 'gpa-trajectory-rocket',
      title: 'GPA Trajectory Rocket',
      category: 'Academic',
      description: 'Simulation projects a +0.30 or higher GPA increase over the next 6 months.',
      criteria: 'Projected GPA Delta ≥ +0.30',
      iconName: 'Rocket',
      unlocked: Boolean(predictionData && predictionData.gpaDelta >= 0.3),
      progressPercent: predictionData
        ? Math.min(100, Math.max(0, Math.round((predictionData.gpaDelta / 0.3) * 100)))
        : 0,
      xpPoints: 400,
      unlockedAt: predictionData && predictionData.gpaDelta >= 0.3 ? 'Simulation Unlocked' : undefined,
    },
    {
      id: 'digital-twin-pioneer',
      title: 'Digital Twin Pioneer',
      category: 'Balance',
      description: 'Executed an AI-powered Digital Twin simulation to forecast student performance.',
      criteria: 'Run 1+ Digital Twin Prediction',
      iconName: 'Bot',
      unlocked: Boolean(predictionData),
      progressPercent: predictionData ? 100 : 0,
      xpPoints: 150,
      unlockedAt: predictionData ? 'Simulation Complete' : undefined,
    },
  ];

  // Filtering
  const filteredBadges = badgesList.filter((badge) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Unlocked') return badge.unlocked;
    return badge.category === activeFilter;
  });

  const unlockedCount = badgesList.filter((b) => b.unlocked).length;
  const totalBadges = badgesList.length;
  const totalXpEarned = badgesList.reduce((acc, b) => (b.unlocked ? acc + b.xpPoints : acc), 0);
  const overallProgressPercent = Math.round((unlockedCount / totalBadges) * 100);

  // Student Rank calculation
  const getStudentRank = (xp: number) => {
    if (xp >= 1500) return { title: 'Grandmaster Twin', color: 'from-amber-400 to-yellow-500', tier: 'Tier IV' };
    if (xp >= 1000) return { title: 'Elite Scholar', color: 'from-cyan-400 to-blue-500', tier: 'Tier III' };
    if (xp >= 500) return { title: 'Focused Achiever', color: 'from-blue-400 to-indigo-500', tier: 'Tier II' };
    return { title: 'Novice Pioneer', color: 'from-slate-400 to-slate-500', tier: 'Tier I' };
  };

  const studentRank = getStudentRank(totalXpEarned);

  // Icon Resolver
  const renderBadgeIcon = (iconName: string, unlocked: boolean) => {
    const iconClass = `w-6 h-6 ${unlocked ? 'text-cyan-300' : 'text-slate-500'}`;
    switch (iconName) {
      case 'Moon':
        return <Moon className={iconClass} />;
      case 'Zap':
        return <Zap className={iconClass} />;
      case 'Smile':
        return <Smile className={iconClass} />;
      case 'GraduationCap':
        return <GraduationCap className={iconClass} />;
      case 'Scale':
        return <Scale className={iconClass} />;
      case 'Shield':
        return <Shield className={iconClass} />;
      case 'Rocket':
        return <Rocket className={iconClass} />;
      case 'Bot':
      default:
        return <Bot className={iconClass} />;
    }
  };

  return (
    <section id="achievements" className="py-20 md:py-28 bg-[#0B1120] relative border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header Banner */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>Student Milestones & Badges</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <span>My Achievements</span>
              <span className="bg-blue-500/20 text-cyan-300 border border-blue-500/30 text-xs font-mono px-3.5 py-1 rounded-full font-bold">
                {unlockedCount} / {totalBadges} Unlocked
              </span>
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Earn academic and wellness badges automatically based on your daily routine inputs and Digital Twin prediction milestones.
            </p>
          </div>

          {/* XP & Progress Card */}
          <div className="bg-[#0B1120] border border-slate-800 rounded-2xl p-5 shrink-0 flex flex-col gap-3 min-w-[280px] shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider font-mono">
                Student Honor Rank:
              </span>
              <span className="text-xs font-bold text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-0.5 rounded-full font-mono">
                {studentRank.tier}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-white font-bold">{studentRank.title}</span>
              <span className="text-amber-400 font-extrabold font-mono text-sm flex items-center gap-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                {totalXpEarned.toLocaleString()} XP
              </span>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between text-[11px] font-semibold text-slate-400 font-mono">
                <span>Overall Completion</span>
                <span className="text-cyan-300">{overallProgressPercent}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-teal-400 rounded-full transition-all duration-500"
                  style={{ width: `${overallProgressPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-800/80">
          {['All', 'Unlocked', 'Sleep & Recovery', 'Academic', 'Wellbeing', 'Balance'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeFilter === filter
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md shadow-blue-500/25 font-bold'
                  : 'bg-slate-900/90 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
              }`}
              id={`filter-badge-${filter.toLowerCase().replace(/ /g, '-')}`}
            >
              {filter}
              {filter === 'Unlocked' && ` (${unlockedCount})`}
            </button>
          ))}
        </div>

        {/* Badge Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredBadges.map((badge) => (
            <motion.div
              key={badge.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedBadge(badge)}
              className={`rounded-2xl p-5 border relative cursor-pointer transition-all duration-300 flex flex-col justify-between group ${
                badge.unlocked
                  ? 'bg-slate-900/95 border-cyan-500/40 hover:border-cyan-400 shadow-xl shadow-cyan-950/20 hover:shadow-cyan-500/10'
                  : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700 opacity-75 hover:opacity-95'
              }`}
            >
              {/* Status Badge Tag */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold bg-[#0B1120] px-2.5 py-1 rounded-lg border border-slate-800">
                  {badge.category}
                </span>

                {badge.unlocked ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Unlocked
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 bg-[#0B1120] border border-slate-800 px-2.5 py-0.5 rounded-full">
                    <Lock className="w-3 h-3" />
                    Locked
                  </span>
                )}
              </div>

              {/* Icon & Title */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center p-0.5 transition-transform group-hover:scale-105 ${
                      badge.unlocked
                        ? 'bg-gradient-to-br from-cyan-400 to-blue-600 shadow-lg shadow-cyan-500/20'
                        : 'bg-slate-800 border border-slate-700'
                    }`}
                  >
                    <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                      {renderBadgeIcon(badge.iconName, badge.unlocked)}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {badge.title}
                    </h3>
                    <p className="text-[11px] text-amber-400 font-mono font-medium">
                      +{badge.xpPoints} XP
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                  {badge.description}
                </p>
              </div>

              {/* Progress & Criteria Footer */}
              <div className="mt-5 pt-3.5 border-t border-slate-800/80 space-y-2">
                <div className="flex justify-between items-center text-[10px] text-slate-400 font-medium font-mono">
                  <span className="truncate max-w-[170px]">Req: {badge.criteria}</span>
                  <span className={badge.unlocked ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
                    {badge.progressPercent}%
                  </span>
                </div>

                <div className="w-full h-1.5 bg-[#0B1120] rounded-full overflow-hidden border border-slate-800">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      badge.unlocked
                        ? 'bg-gradient-to-r from-emerald-400 to-cyan-400'
                        : 'bg-slate-700'
                    }`}
                    style={{ width: `${badge.progressPercent}%` }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal for Badge Details */}
        <AnimatePresence>
          {selectedBadge && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative space-y-5"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center p-0.5 ${
                        selectedBadge.unlocked
                          ? 'bg-gradient-to-br from-cyan-400 to-blue-600 shadow-xl shadow-cyan-500/20'
                          : 'bg-slate-800 border border-slate-700'
                      }`}
                    >
                      <div className="w-full h-full bg-[#0B1120] rounded-[14px] flex items-center justify-center">
                        {renderBadgeIcon(selectedBadge.iconName, selectedBadge.unlocked)}
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono uppercase text-cyan-400 font-semibold bg-[#0B1120] px-2 py-0.5 rounded border border-slate-800">
                        {selectedBadge.category}
                      </span>
                      <h3 className="text-lg font-bold text-white mt-1">
                        {selectedBadge.title}
                      </h3>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedBadge(null)}
                    className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-3 text-xs text-slate-300">
                  <p className="leading-relaxed bg-[#0B1120] p-4 rounded-xl border border-slate-800">
                    {selectedBadge.description}
                  </p>

                  <div className="space-y-2 pt-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">Unlock Requirement:</span>
                      <span className="font-mono text-cyan-300 font-semibold">{selectedBadge.criteria}</span>
                    </div>

                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">Honor Points Reward:</span>
                      <span className="font-mono text-amber-400 font-bold">+{selectedBadge.xpPoints} XP</span>
                    </div>

                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">Status:</span>
                      {selectedBadge.unlocked ? (
                        <span className="text-emerald-400 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Unlocked ({selectedBadge.unlockedAt || 'Active'})
                        </span>
                      ) : (
                        <span className="text-slate-500 font-semibold flex items-center gap-1">
                          <Lock className="w-3.5 h-3.5" />
                          Locked ({selectedBadge.progressPercent}% Completed)
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedBadge(null)}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold py-3 rounded-xl text-xs border border-slate-700 transition-colors cursor-pointer"
                >
                  Close Badge Details
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

