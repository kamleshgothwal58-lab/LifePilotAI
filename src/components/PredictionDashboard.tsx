import React from 'react';
import { motion } from 'motion/react';
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Brain,
  Award,
  Sparkles,
  ShieldCheck,
  Zap,
  Activity,
  CheckCircle2,
  Clock,
  BarChart3,
  Flame,
  ArrowUpRight,
  ShieldAlert,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Legend,
} from 'recharts';
import { PredictionData } from '../types';

interface PredictionDashboardProps {
  data: PredictionData;
  source?: string;
  onJumpToRecommendations: () => void;
}

export const PredictionDashboard: React.FC<PredictionDashboardProps> = ({
  data,
  source,
  onJumpToRecommendations,
}) => {
  const isGpaPositive = data.gpaDelta >= 0;

  // Custom Recharts Tooltip Styling
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900/95 border border-slate-700/80 p-3.5 rounded-xl shadow-2xl backdrop-blur-md text-xs space-y-1.5 min-w-[140px]">
          <p className="font-bold text-white border-b border-slate-800 pb-1 font-mono">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={`item-${index}`} className="flex items-center justify-between gap-3 text-[11px]">
              <span className="text-slate-400">{entry.name}:</span>
              <span style={{ color: entry.color }} className="font-mono font-bold">
                {entry.value}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-16 md:py-24 bg-[#080D1A] border-b border-slate-800 relative overflow-hidden"
      id="prediction-results"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
        {/* Results Banner Header */}
        <div className="bg-gradient-to-r from-slate-900 via-[#0B1120] to-slate-900 border border-blue-500/30 rounded-3xl p-6 sm:p-8 md:p-10 backdrop-blur-xl relative overflow-hidden shadow-2xl">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative z-10">
            <div className="space-y-3 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-500/15 text-cyan-300 border border-blue-500/30 text-xs font-semibold">
                  <Brain className="w-3.5 h-3.5 text-cyan-400" />
                  Digital Twin Simulation Results
                </span>
                {source && (
                  <span className="text-[11px] text-slate-400 font-mono bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
                    Engine: {source}
                  </span>
                )}
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
                {data.summaryHeadline}
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
                {data.detailedAnalysis}
              </p>
            </div>

            <button
              onClick={onJumpToRecommendations}
              className="bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 hover:from-blue-500 hover:to-cyan-400 text-white font-bold px-6 py-3.5 rounded-xl text-xs sm:text-sm shadow-xl shadow-blue-500/25 flex items-center gap-2.5 shrink-0 transition-all transform hover:scale-[1.02] cursor-pointer"
              id="view-ai-recommendations-btn"
            >
              <Sparkles className="w-4 h-4 text-cyan-100" />
              <span>View Actionable Tips ({data.recommendations.length})</span>
              <ArrowUpRight className="w-4 h-4 text-cyan-200" />
            </button>
          </div>
        </div>

        {/* Top Key Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* 1. 6-Month Projected GPA */}
          <div className="bg-[#0B1120]/90 border border-slate-800 hover:border-slate-700/80 rounded-2xl p-6 space-y-3 relative shadow-lg backdrop-blur-sm transition-all duration-300">
            <div className="flex items-center justify-between text-xs text-slate-400 font-semibold font-mono uppercase tracking-wider">
              <span>6-Mo GPA Forecast</span>
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                <Award className="w-4 h-4 text-blue-400" />
              </div>
            </div>
            <div className="flex items-baseline gap-2.5">
              <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
                {data.predictedGpa6Months.toFixed(2)}
              </span>
              <span
                className={`text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 font-mono ${
                  isGpaPositive
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                    : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                }`}
              >
                {isGpaPositive ? (
                  <TrendingUp className="w-3.5 h-3.5" />
                ) : (
                  <TrendingDown className="w-3.5 h-3.5" />
                )}
                {isGpaPositive ? `+${data.gpaDelta}` : `${data.gpaDelta}`}
              </span>
            </div>
            <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-800/80 font-mono">
              Baseline: <span className="text-slate-300 font-semibold">{data.currentGpa.toFixed(2)} GPA</span>
            </div>
          </div>

          {/* 2. Burnout Risk Index */}
          <div className="bg-[#0B1120]/90 border border-slate-800 hover:border-slate-700/80 rounded-2xl p-6 space-y-3 relative shadow-lg backdrop-blur-sm transition-all duration-300">
            <div className="flex items-center justify-between text-xs text-slate-400 font-semibold font-mono uppercase tracking-wider">
              <span>Burnout Risk Index</span>
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                <Flame className="w-4 h-4 text-amber-400" />
              </div>
            </div>
            <div className="flex items-baseline gap-2.5">
              <span
                className={`text-3xl sm:text-4xl font-extrabold font-mono tracking-tight ${
                  data.burnoutRisk === 'Low'
                    ? 'text-emerald-400'
                    : data.burnoutRisk === 'Moderate'
                    ? 'text-amber-400'
                    : 'text-rose-400'
                }`}
              >
                {data.burnoutPercentage}%
              </span>
              <span
                className={`text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider font-mono ${
                  data.burnoutRisk === 'Low'
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                    : data.burnoutRisk === 'Moderate'
                    ? 'bg-amber-500/15 text-amber-400 border border-amber-500/20'
                    : 'bg-rose-500/15 text-rose-400 border border-rose-500/20'
                }`}
              >
                {data.burnoutRisk}
              </span>
            </div>
            <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-800/80">
              Evaluated via sleep & stress density
            </div>
          </div>

          {/* 3. Academic Readiness Score */}
          <div className="bg-[#0B1120]/90 border border-slate-800 hover:border-slate-700/80 rounded-2xl p-6 space-y-3 relative shadow-lg backdrop-blur-sm transition-all duration-300">
            <div className="flex items-center justify-between text-xs text-slate-400 font-semibold font-mono uppercase tracking-wider">
              <span>Academic Readiness</span>
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                <Activity className="w-4 h-4 text-cyan-400" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-extrabold text-cyan-300 font-mono tracking-tight">
                {data.academicReadinessScore}
              </span>
              <span className="text-xs font-mono text-slate-400">/ 100</span>
            </div>
            <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
              <div
                style={{ width: `${data.academicReadinessScore}%` }}
                className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full rounded-full transition-all duration-500"
              />
            </div>
          </div>

          {/* 4. Baseline Stress Index */}
          <div className="bg-[#0B1120]/90 border border-slate-800 hover:border-slate-700/80 rounded-2xl p-6 space-y-3 relative shadow-lg backdrop-blur-sm transition-all duration-300">
            <div className="flex items-center justify-between text-xs text-slate-400 font-semibold font-mono uppercase tracking-wider">
              <span>Stress Index Rating</span>
              <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-extrabold text-rose-300 font-mono tracking-tight">
                {data.stressIndexScore}
              </span>
              <span className="text-xs font-mono text-slate-400">/ 10</span>
              <span className="text-xs text-slate-400 font-mono ml-auto">
                {data.stressIndexScore >= 7 ? 'High Load' : 'Manageable'}
              </span>
            </div>
            <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-800/80">
              Self-reported baseline strain
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* 6-Month Trajectory Area Chart (LG: 7 Cols) */}
          <div className="lg:col-span-7 bg-[#0B1120]/90 border border-slate-800 rounded-3xl p-6 sm:p-7 space-y-5 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-cyan-400" />
                  6-Month Projected GPA & Trajectory
                </h3>
                <p className="text-xs text-slate-400">
                  Simulated monthly progression based on your Digital Twin parameters
                </p>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono">
                <span className="flex items-center gap-1.5 text-cyan-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 inline-block" /> Projected
                </span>
                <span className="flex items-center gap-1.5 text-slate-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-500 inline-block" /> Baseline
                </span>
              </div>
            </div>

            <div className="h-64 sm:h-72 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.gpaTrajectory}>
                  <defs>
                    <linearGradient id="gpaGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#38BDF8" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                  <XAxis dataKey="month" stroke="#64748B" fontSize={11} tickLine={false} />
                  <YAxis domain={[2.0, 4.0]} stroke="#64748B" fontSize={11} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="projectedGpa"
                    name="Projected GPA"
                    stroke="#38BDF8"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#gpaGradient)"
                  />
                  <Area
                    type="monotone"
                    dataKey="baselineGpa"
                    name="Baseline GPA"
                    stroke="#64748B"
                    strokeWidth={2}
                    strokeDasharray="4 4"
                    fill="none"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Wellness & Capacity Radar Chart (LG: 5 Cols) */}
          <div className="lg:col-span-5 bg-[#0B1120]/90 border border-slate-800 rounded-3xl p-6 sm:p-7 space-y-5 shadow-xl">
            <div className="border-b border-slate-800/80 pb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                Wellness & Capacity Radar
              </h3>
              <p className="text-xs text-slate-400">
                Balance score across key lifestyle vectors vs optimal benchmark
              </p>
            </div>

            <div className="h-64 sm:h-72 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={data.wellnessRadar}>
                  <PolarGrid stroke="#1E293B" />
                  <PolarAngleAxis dataKey="category" stroke="#94A3B8" fontSize={10} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#334155" fontSize={9} />
                  <Radar
                    name="Current Twin"
                    dataKey="value"
                    stroke="#06B6D4"
                    fill="#06B6D4"
                    fillOpacity={0.45}
                  />
                  <Radar
                    name="Optimal Target"
                    dataKey="optimal"
                    stroke="#3B82F6"
                    fill="#3B82F6"
                    fillOpacity={0.15}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Strengths & Critical Warnings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Key Strengths */}
          <div className="bg-gradient-to-br from-emerald-950/20 via-[#0B1120] to-slate-900 border border-emerald-500/30 rounded-3xl p-6 space-y-4 shadow-xl">
            <h4 className="text-sm font-bold text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Core Positive Twin Drivers</span>
            </h4>
            <ul className="space-y-3">
              {data.keyStrengths.map((strength, idx) => (
                <li key={idx} className="text-xs text-emerald-100/90 flex items-start gap-2.5 leading-relaxed bg-emerald-950/20 p-3 rounded-xl border border-emerald-500/20">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 mt-1 shrink-0 shadow-sm shadow-emerald-400" />
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Risk Warnings */}
          <div className="bg-gradient-to-br from-rose-950/20 via-[#0B1120] to-slate-900 border border-rose-500/30 rounded-3xl p-6 space-y-4 shadow-xl">
            <h4 className="text-sm font-bold text-rose-300 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              <span>Identified Friction & Burnout Risks</span>
            </h4>
            <ul className="space-y-3">
              {data.keyRisks.map((risk, idx) => (
                <li key={idx} className="text-xs text-rose-100/90 flex items-start gap-2.5 leading-relaxed bg-rose-950/20 p-3 rounded-xl border border-rose-500/20">
                  <span className="w-2 h-2 rounded-full bg-rose-400 mt-1 shrink-0 shadow-sm shadow-rose-400" />
                  <span>{risk}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

