import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Brain,
  Sliders,
  Clock,
  Moon,
  GraduationCap,
  Sparkles,
  Zap,
  CheckCircle,
  Activity,
  Award,
  AlertTriangle,
  RotateCcw,
  BookOpen,
  Users,
  Target,
  Flame,
  BatteryCharging,
} from 'lucide-react';
import { StudentProfile, PredictionData } from '../types';

interface DigitalTwinSectionProps {
  onPredict: (profile: StudentProfile) => Promise<void>;
  predictionData: PredictionData | null;
  isLoading: boolean;
  onReset: () => void;
  sampleProfiles: Array<{ label: string; profile: StudentProfile }>;
}

export const DigitalTwinSection: React.FC<DigitalTwinSectionProps> = ({
  onPredict,
  predictionData,
  isLoading,
  onReset,
  sampleProfiles,
}) => {
  const [profile, setProfile] = useState<StudentProfile>({
    name: 'Alex Chen',
    major: 'Computer Science & AI',
    academicLevel: 'Junior',
    studyHoursPerDay: 4.5,
    sleepHoursPerNight: 6.5,
    currentGpa: 3.35,
    extracurricularHoursPerWeek: 12,
    stressLevel: 7,
    socialHoursPerWeek: 10,
    targetGpa: 3.8,
  });

  const [loadingStep, setLoadingStep] = useState(0);

  const loadingMessages = [
    'Calibrating Twin Neural Parameters...',
    'Analyzing Study-Sleep Circadian Vectors...',
    'Running 6-Month Academic Trajectory Simulation...',
    'Synthesizing Burnout Prevention Recommendations...',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Cycle loading message indicators
    const interval = setInterval(() => {
      setLoadingStep((prev) => (prev + 1) % loadingMessages.length);
    }, 600);

    await onPredict(profile);
    clearInterval(interval);
  };

  const handleApplyPreset = (presetProfile: StudentProfile) => {
    setProfile(presetProfile);
  };

  // Derived contextual helper feedback
  const getSleepFeedback = (hours: number) => {
    if (hours < 5.5) return { label: 'High Cognitive Fatigue Risk', color: 'text-rose-400 bg-rose-500/10 border-rose-500/30' };
    if (hours < 7.0) return { label: 'Sub-Optimal Sleep Zone', color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' };
    if (hours <= 9.0) return { label: 'Optimal Neuro-Plasticity Zone', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' };
    return { label: 'Extended Rest Cycle', color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30' };
  };

  const getStudyFeedback = (hours: number) => {
    if (hours < 2.5) return { label: 'Light Retention Pace', color: 'text-slate-400 bg-slate-800 border-slate-700' };
    if (hours <= 6.0) return { label: 'Balanced Mastery Zone', color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30' };
    return { label: 'High-Intensity Marathon Pace', color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' };
  };

  const sleepStatus = getSleepFeedback(profile.sleepHoursPerNight);
  const studyStatus = getStudyFeedback(profile.studyHoursPerDay);

  return (
    <section id="digital-twin" className="py-20 md:py-28 bg-[#0D1527] border-y border-slate-800/80 relative">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.08),rgba(255,255,255,0))] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold tracking-wide shadow-sm">
            <Brain className="w-3.5 h-3.5" />
            <span>Neural Twin Calibration Deck</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Configure Your Student Digital Twin
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Input your current study habits, sleep patterns, and stress metrics. Our predictive AI simulates your future academic trajectory and wellbeing trends.
          </p>
        </div>

        {/* Quick Sample Presets */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
          <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider font-mono mr-1">
            Load Preset Twin:
          </span>
          {sampleProfiles.map((sample, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleApplyPreset(sample.profile)}
              className="text-xs font-semibold bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white px-3.5 py-2 rounded-xl border border-slate-800 hover:border-cyan-500/40 transition-all duration-200 flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>{sample.label}</span>
            </button>
          ))}
        </div>

        {/* Form Container */}
        <div className="max-w-4xl mx-auto bg-slate-900/95 border border-slate-800 rounded-3xl p-6 sm:p-9 shadow-2xl shadow-blue-950/60 relative backdrop-blur-2xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Student Info Row */}
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider font-mono mb-3">
                <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                <span>1. Academic Profile</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-6 border-b border-slate-800/80">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Student Name
                  </label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    placeholder="e.g. Maya Lin"
                    className="w-full bg-[#0B1120] border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Major / Discipline
                  </label>
                  <input
                    type="text"
                    value={profile.major}
                    onChange={(e) => setProfile({ ...profile, major: e.target.value })}
                    placeholder="e.g. Pre-Med / Biology"
                    className="w-full bg-[#0B1120] border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Academic Standing
                  </label>
                  <select
                    value={profile.academicLevel}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        academicLevel: e.target.value as StudentProfile['academicLevel'],
                      })
                    }
                    className="w-full bg-[#0B1120] border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                  >
                    <option value="High School">High School Senior</option>
                    <option value="Freshman">Freshman</option>
                    <option value="Sophomore">Sophomore</option>
                    <option value="Junior">Junior</option>
                    <option value="Senior">Senior</option>
                    <option value="Graduate">Graduate Student</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Sliders Grid */}
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider font-mono mb-4">
                <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                <span>2. Lifestyle & Study Rhythm Vectors</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Study Hours */}
                <div className="bg-[#0B1120] p-5 rounded-2xl border border-slate-800/90 space-y-3.5 hover:border-slate-700 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                        <Clock className="w-4 h-4 text-blue-400" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-200 block">
                          Daily Study Hours
                        </span>
                        <span className="text-[10px] text-slate-400">Lectures, homework & prep</span>
                      </div>
                    </div>
                    <span className="text-sm font-extrabold text-cyan-300 font-mono bg-blue-500/10 px-2.5 py-1 rounded-lg border border-blue-500/30">
                      {profile.studyHoursPerDay} hrs/day
                    </span>
                  </div>

                  <input
                    type="range"
                    min="0.5"
                    max="12"
                    step="0.5"
                    value={profile.studyHoursPerDay}
                    onChange={(e) =>
                      setProfile({ ...profile, studyHoursPerDay: parseFloat(e.target.value) })
                    }
                    className="w-full accent-cyan-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
                  />

                  <div className="flex items-center justify-between">
                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded border ${studyStatus.color}`}>
                      {studyStatus.label}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">0.5h — 12h</span>
                  </div>
                </div>

                {/* Sleep Hours */}
                <div className="bg-[#0B1120] p-5 rounded-2xl border border-slate-800/90 space-y-3.5 hover:border-slate-700 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                        <Moon className="w-4 h-4 text-indigo-400" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-200 block">
                          Nightly Sleep Duration
                        </span>
                        <span className="text-[10px] text-slate-400">Uninterrupted circadian rest</span>
                      </div>
                    </div>
                    <span
                      className={`text-sm font-extrabold font-mono px-2.5 py-1 rounded-lg border ${
                        profile.sleepHoursPerNight < 6
                          ? 'text-rose-400 bg-rose-500/10 border-rose-500/30'
                          : 'text-indigo-300 bg-indigo-500/10 border-indigo-500/30'
                      }`}
                    >
                      {profile.sleepHoursPerNight} hrs/night
                    </span>
                  </div>

                  <input
                    type="range"
                    min="3"
                    max="11"
                    step="0.5"
                    value={profile.sleepHoursPerNight}
                    onChange={(e) =>
                      setProfile({ ...profile, sleepHoursPerNight: parseFloat(e.target.value) })
                    }
                    className="w-full accent-indigo-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
                  />

                  <div className="flex items-center justify-between">
                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded border ${sleepStatus.color}`}>
                      {sleepStatus.label}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">3h — 11h</span>
                  </div>
                </div>

                {/* Current GPA & Target GPA */}
                <div className="bg-[#0B1120] p-5 rounded-2xl border border-slate-800/90 space-y-4 hover:border-slate-700 transition-colors">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                      <GraduationCap className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-200 block">GPA Benchmarks</span>
                      <span className="text-[10px] text-slate-400">Academic baseline & target</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3.5">
                    <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                        Current GPA (0.0 - 4.0)
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="4"
                        step="0.05"
                        value={profile.currentGpa}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            currentGpa: Math.min(4, Math.max(0, parseFloat(e.target.value) || 0)),
                          })
                        }
                        className="w-full bg-[#0B1120] border border-slate-700 rounded-lg px-3 py-1.5 text-sm font-extrabold text-cyan-300 font-mono focus:border-cyan-400 focus:outline-none"
                      />
                    </div>

                    <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                        Target GPA Goal
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="4"
                        step="0.05"
                        value={profile.targetGpa}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            targetGpa: Math.min(4, Math.max(0, parseFloat(e.target.value) || 0)),
                          })
                        }
                        className="w-full bg-[#0B1120] border border-slate-700 rounded-lg px-3 py-1.5 text-sm font-extrabold text-emerald-400 font-mono focus:border-emerald-400 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Stress Level (1-10) */}
                <div className="bg-[#0B1120] p-5 rounded-2xl border border-slate-800/90 space-y-3.5 hover:border-slate-700 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
                        <Activity className="w-4 h-4 text-rose-400" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-200 block">
                          Perceived Stress Load
                        </span>
                        <span className="text-[10px] text-slate-400">Exams, deadlines & fatigue</span>
                      </div>
                    </div>
                    <span
                      className={`text-sm font-extrabold font-mono px-2.5 py-1 rounded-lg border ${
                        profile.stressLevel >= 8
                          ? 'text-rose-400 bg-rose-500/10 border-rose-500/30'
                          : profile.stressLevel >= 5
                          ? 'text-amber-400 bg-amber-500/10 border-amber-500/30'
                          : 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
                      }`}
                    >
                      Level {profile.stressLevel} / 10
                    </span>
                  </div>

                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value={profile.stressLevel}
                    onChange={(e) =>
                      setProfile({ ...profile, stressLevel: parseInt(e.target.value) })
                    }
                    className="w-full accent-rose-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                  />

                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">
                      {profile.stressLevel <= 3 ? '🟢 Low / Mindful' : profile.stressLevel <= 7 ? '🟡 Moderate Pressure' : '🔴 High Burnout Alert'}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">1 (Zen) — 10 (Critical)</span>
                  </div>
                </div>

                {/* Extracurriculars */}
                <div className="bg-[#0B1120] p-5 rounded-2xl border border-slate-800/90 space-y-3.5 hover:border-slate-700 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                        <Award className="w-4 h-4 text-amber-400" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-200 block">
                          Extracurriculars & Clubs
                        </span>
                        <span className="text-[10px] text-slate-400">Athletics, research & leadership</span>
                      </div>
                    </div>
                    <span className="text-sm font-extrabold text-amber-300 font-mono bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/30">
                      {profile.extracurricularHoursPerWeek} hrs/wk
                    </span>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="35"
                    step="1"
                    value={profile.extracurricularHoursPerWeek}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        extracurricularHoursPerWeek: parseInt(e.target.value),
                      })
                    }
                    className="w-full accent-amber-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
                  />

                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>0h (None)</span>
                    <span>15h (Active)</span>
                    <span>35h (Intense)</span>
                  </div>
                </div>

                {/* Social & Work Hours */}
                <div className="bg-[#0B1120] p-5 rounded-2xl border border-slate-800/90 space-y-3.5 hover:border-slate-700 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
                        <Users className="w-4 h-4 text-teal-400" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-200 block">
                          Work & Social Commitments
                        </span>
                        <span className="text-[10px] text-slate-400">Jobs, family & peer connections</span>
                      </div>
                    </div>
                    <span className="text-sm font-extrabold text-teal-300 font-mono bg-teal-500/10 px-2.5 py-1 rounded-lg border border-teal-500/30">
                      {profile.socialHoursPerWeek} hrs/wk
                    </span>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="35"
                    step="1"
                    value={profile.socialHoursPerWeek}
                    onChange={(e) =>
                      setProfile({ ...profile, socialHoursPerWeek: parseInt(e.target.value) })
                    }
                    className="w-full accent-teal-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
                  />

                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>0h (Isolated)</span>
                    <span>12h (Balanced)</span>
                    <span>35h (Demanding)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Action Controls */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800/80">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Powered by server-side Gemini 3.6 Flash reasoning</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                {predictionData && (
                  <button
                    type="button"
                    onClick={onReset}
                    className="flex-1 sm:flex-none text-xs font-semibold text-slate-300 hover:text-white px-4 py-3.5 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Clear Simulation</span>
                  </button>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 sm:flex-none relative group bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-[length:200%_auto] hover:bg-right transition-all duration-300 text-white font-bold px-8 py-3.5 rounded-xl shadow-xl shadow-blue-500/25 hover:shadow-cyan-500/35 flex items-center justify-center gap-2.5 disabled:opacity-70 text-sm cursor-pointer"
                  id="submit-prediction-btn"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>{loadingMessages[loadingStep]}</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 fill-cyan-200 text-cyan-200" />
                      <span>Predict My Academic Future</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

