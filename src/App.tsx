import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { DigitalTwinSection } from './components/DigitalTwinSection';
import { PredictionDashboard } from './components/PredictionDashboard';
import { SmartRecommendationsSection } from './components/SmartRecommendationsSection';
import { FeaturesSection } from './components/FeaturesSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { LeadCaptureSection } from './components/LeadCaptureSection';
import { AIChatAssistant } from './components/AIChatAssistant';
import { AuthModal } from './components/AuthModal';
import { ApiKeyGuideModal } from './components/ApiKeyGuideModal';
import { AuthLandingView } from './components/AuthLandingView';
import { AchievementsSection } from './components/AchievementsSection';
import { Footer } from './components/Footer';
import { StudentProfile, PredictionData } from './types';
import { User, LogOut, Sparkles, Activity } from 'lucide-react';

export default function App() {
  const [currentProfile, setCurrentProfile] = useState<StudentProfile | null>(null);
  const [predictionData, setPredictionData] = useState<PredictionData | null>(null);
  const [predictionSource, setPredictionSource] = useState<string>('');
  const [isLoadingPrediction, setIsLoadingPrediction] = useState(false);
  const [isRegeneratingRecs, setIsRegeneratingRecs] = useState(false);

  // Auth & User States
  const [userEmail, setUserEmail] = useState<string | null>(() => {
    return localStorage.getItem('lifepilot_user_email');
  });
  const [userName, setUserName] = useState<string | null>(() => {
    return localStorage.getItem('lifepilot_user_name') || 'Student User';
  });

  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signin');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isApiKeyGuideOpen, setIsApiKeyGuideOpen] = useState(false);

  // Sync auth state with localStorage
  useEffect(() => {
    if (userEmail) {
      localStorage.setItem('lifepilot_user_email', userEmail);
    } else {
      localStorage.removeItem('lifepilot_user_email');
    }
  }, [userEmail]);

  useEffect(() => {
    if (userName) {
      localStorage.setItem('lifepilot_user_name', userName);
    } else {
      localStorage.removeItem('lifepilot_user_name');
    }
  }, [userName]);

  // Preset Student Twin Profiles
  const sampleProfiles: Array<{ label: string; profile: StudentProfile }> = [
    {
      label: 'Pre-Med Heavy Load',
      profile: {
        name: 'Jordan Rivera',
        major: 'Pre-Med / Neuroscience',
        academicLevel: 'Junior',
        studyHoursPerDay: 6.5,
        sleepHoursPerNight: 5.5,
        currentGpa: 3.42,
        extracurricularHoursPerWeek: 16,
        stressLevel: 8,
        socialHoursPerWeek: 6,
        targetGpa: 3.9,
      },
    },
    {
      label: 'CS & AI Sophomore',
      profile: {
        name: 'Alex Chen',
        major: 'Computer Science & AI',
        academicLevel: 'Sophomore',
        studyHoursPerDay: 4.5,
        sleepHoursPerNight: 7.0,
        currentGpa: 3.35,
        extracurricularHoursPerWeek: 10,
        stressLevel: 6,
        socialHoursPerWeek: 12,
        targetGpa: 3.8,
      },
    },
    {
      label: 'High School AP Senior',
      profile: {
        name: 'Maya Lin',
        major: 'AP Scholar / High School',
        academicLevel: 'High School',
        studyHoursPerDay: 5.0,
        sleepHoursPerNight: 6.0,
        currentGpa: 3.65,
        extracurricularHoursPerWeek: 14,
        stressLevel: 7,
        socialHoursPerWeek: 8,
        targetGpa: 3.95,
      },
    },
    {
      label: 'Engineering Overachiever',
      profile: {
        name: 'Liam Vance',
        major: 'Mechanical Engineering',
        academicLevel: 'Senior',
        studyHoursPerDay: 7.0,
        sleepHoursPerNight: 5.0,
        currentGpa: 3.20,
        extracurricularHoursPerWeek: 18,
        stressLevel: 9,
        socialHoursPerWeek: 5,
        targetGpa: 3.7,
      },
    },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handlePredict = async (profile: StudentProfile) => {
    setCurrentProfile(profile);
    setIsLoadingPrediction(true);

    try {
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });

      const resData = await response.json();

      if (resData.success && resData.data) {
        setPredictionData(resData.data);
        setPredictionSource(resData.source || 'gemini-ai');
      }
    } catch (err) {
      console.error('Prediction error:', err);
    } finally {
      setIsLoadingPrediction(false);
      setTimeout(() => scrollToSection('prediction-results'), 100);
    }
  };

  const handleRegenerateRecs = async () => {
    if (!currentProfile) return;
    setIsRegeneratingRecs(true);

    try {
      const response = await fetch('/api/recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile: currentProfile }),
      });

      const resData = await response.json();

      if (resData.success && resData.recommendations && predictionData) {
        setPredictionData({
          ...predictionData,
          recommendations: resData.recommendations,
        });
      }
    } catch (err) {
      console.error('Regenerate recommendations error:', err);
    } finally {
      setIsRegeneratingRecs(false);
    }
  };

  const handleExploreDemo = () => {
    handlePredict(sampleProfiles[0].profile);
  };

  const handleOpenAuth = (mode: 'signin' | 'signup') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleLoginSuccess = (email: string, name?: string) => {
    setUserEmail(email);
    if (name) {
      setUserName(name);
    } else {
      setUserName(email.split('@')[0] || 'Student User');
    }
  };

  const handleSignOut = () => {
    setUserEmail(null);
    setUserName(null);
    localStorage.removeItem('lifepilot_user_email');
    localStorage.removeItem('lifepilot_user_name');
  };

  // IF NOT AUTHENTICATED: Show Gateway / Authentication Page
  if (!userEmail) {
    return (
      <>
        <AuthLandingView
          onLoginSuccess={handleLoginSuccess}
          onOpenApiKeyGuide={() => setIsApiKeyGuideOpen(true)}
        />
        <ApiKeyGuideModal
          isOpen={isApiKeyGuideOpen}
          onClose={() => setIsApiKeyGuideOpen(false)}
        />
      </>
    );
  }

  // IF AUTHENTICATED: Full Application Dashboard
  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 font-sans selection:bg-cyan-500 selection:text-white relative overflow-x-hidden">
      {/* Top Student Session Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-cyan-950 border-b border-blue-500/20 text-xs text-slate-300 py-1.5 px-4 flex items-center justify-between z-50 relative">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-white">Active Student Twin Session:</span>
            <span className="text-cyan-300 font-medium">{userName || userEmail}</span>
            <span className="hidden sm:inline text-slate-500">({userEmail})</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsApiKeyGuideOpen(true)}
              className="text-[11px] text-slate-400 hover:text-cyan-300 transition-colors hidden sm:block"
            >
              API Key Config
            </button>
            <button
              onClick={handleSignOut}
              className="text-[11px] text-slate-300 hover:text-rose-400 flex items-center gap-1 font-semibold transition-colors"
              id="app-signout-top-btn"
            >
              <LogOut className="w-3 h-3" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Header */}
      <Navbar
        onOpenAuth={handleOpenAuth}
        onScrollTo={scrollToSection}
        userEmail={userEmail}
        onSignOut={handleSignOut}
        onOpenApiKeyGuide={() => setIsApiKeyGuideOpen(true)}
      />

      {/* Hero Section */}
      <HeroSection
        onStartSimulation={() => scrollToSection('digital-twin')}
        onExploreDemo={handleExploreDemo}
      />

      {/* Digital Twin Onboarding Form */}
      <DigitalTwinSection
        onPredict={handlePredict}
        predictionData={predictionData}
        isLoading={isLoadingPrediction}
        onReset={() => setPredictionData(null)}
        sampleProfiles={sampleProfiles}
      />

      {/* My Achievements Section */}
      <AchievementsSection
        profile={currentProfile}
        predictionData={predictionData}
      />

      {/* Prediction Results Dashboard */}
      {predictionData && (
        <>
          <PredictionDashboard
            data={predictionData}
            source={predictionSource}
            onJumpToRecommendations={() => scrollToSection('recommendations')}
          />

          <SmartRecommendationsSection
            recommendations={predictionData.recommendations}
            profile={currentProfile || undefined}
            onRegenerate={handleRegenerateRecs}
            isRegenerating={isRegeneratingRecs}
          />
        </>
      )}

      {/* Features Section */}
      <FeaturesSection />

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* Student Testimonials Carousel */}
      <TestimonialsSection />

      {/* Lead Capture Section */}
      <LeadCaptureSection />

      {/* Floating AI Chat Assistant */}
      <AIChatAssistant studentProfile={currentProfile} />

      {/* Footer */}
      <Footer
        onScrollTo={scrollToSection}
        onOpenApiKeyGuide={() => setIsApiKeyGuideOpen(true)}
      />

      {/* Modals */}
      <AuthModal
        isOpen={isAuthModalOpen}
        initialMode={authModalMode}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(email) => handleLoginSuccess(email)}
      />

      <ApiKeyGuideModal
        isOpen={isApiKeyGuideOpen}
        onClose={() => setIsApiKeyGuideOpen(false)}
      />
    </div>
  );
}
