export interface StudentProfile {
  name: string;
  major: string;
  academicLevel: 'Freshman' | 'Sophomore' | 'Junior' | 'Senior' | 'Graduate' | 'High School';
  studyHoursPerDay: number;
  sleepHoursPerNight: number;
  currentGpa: number;
  extracurricularHoursPerWeek: number;
  stressLevel: number; // 1 - 10
  socialHoursPerWeek: number;
  targetGpa: number;
}

export interface RecommendationItem {
  id: string;
  title: string;
  category: 'Academic' | 'Sleep & Recovery' | 'Mental Health' | 'Time Management';
  impact: 'High Impact' | 'Medium Impact' | 'Essential';
  effort: 'Low Effort' | 'Medium Effort' | 'High Effort';
  actionText: string;
  estimatedGpaGain?: string;
  stressReduction?: string;
}

export interface TrajectoryPoint {
  month: string;
  projectedGpa: number;
  baselineGpa: number;
  stressIndex: number;
  burnoutRiskIndex: number;
}

export interface RadarPoint {
  category: string;
  value: number;
  optimal: number;
}

export interface TimeAllocationPoint {
  activity: string;
  currentHours: number;
  recommendedHours: number;
}

export interface PredictionData {
  summaryHeadline: string;
  predictedGpa6Months: number;
  currentGpa: number;
  gpaDelta: number;
  burnoutRisk: 'Low' | 'Moderate' | 'High' | 'Severe';
  burnoutPercentage: number;
  academicReadinessScore: number; // 0 - 100
  stressIndexScore: number; // 1 - 10
  detailedAnalysis: string;
  keyStrengths: string[];
  keyRisks: string[];
  gpaTrajectory: TrajectoryPoint[];
  wellnessRadar: RadarPoint[];
  timeAllocation: TimeAllocationPoint[];
  recommendations: RecommendationItem[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  isStreaming?: boolean;
}

export interface LeadRecord {
  id: string;
  email: string;
  academicLevel?: string;
  createdAt: string;
}

export interface AchievementBadge {
  id: string;
  title: string;
  category: 'Sleep & Recovery' | 'Academic' | 'Wellbeing' | 'Balance';
  description: string;
  criteria: string;
  iconName: string;
  unlocked: boolean;
  progressPercent: number;
  xpPoints: number;
  unlockedAt?: string;
}

