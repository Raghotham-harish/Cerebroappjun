import { useState } from "react";
import { AnimatedLogo } from "./AnimatedLogo";
import { ZOWCapture } from "./ZOWCapture";
import { ZOWLeaderboard } from "./ZOWLeaderboard";
import { ZOWHistory } from "./ZOWHistory";
import { DailyIntention } from "./DailyIntention";

interface ZOWScreenProps {
  userName: string;
  onComplete: () => void;
}

export function ZOWScreen({ userName, onComplete }: ZOWScreenProps) {
  const [currentStep, setCurrentStep] = useState<'capture' | 'leaderboard' | 'history' | 'intention'>('capture');
  const [currentZOW, setCurrentZOW] = useState<number>(0);

  const handleZOWComplete = (zowLevel: number) => {
    setCurrentZOW(zowLevel);
    setCurrentStep('leaderboard');
  };

  const handleLeaderboardContinue = () => {
    setCurrentStep('intention');
  };

  const handleViewHistory = () => {
    setCurrentStep('history');
  };

  const handleBackFromHistory = () => {
    setCurrentStep('leaderboard');
  };

  const handleIntentionComplete = (intention: string) => {
    console.log('Daily intention:', intention);
    onComplete();
  };

  return (
    <div
      className="h-screen flex flex-col overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #FAF5FF 0%, #EDE9FE 50%, #EBF8FF 100%)'
      }}
    >
      {/* Logo Header - hide on history screen */}
      {currentStep !== 'history' && (
        <div className="pt-8 pb-4 flex justify-center px-4">
          <AnimatedLogo size={48} animate={false} />
        </div>
      )}

      {/* Content */}
      {currentStep === 'capture' ? (
        <ZOWCapture userName={userName} onComplete={handleZOWComplete} />
      ) : currentStep === 'leaderboard' ? (
        <ZOWLeaderboard currentZOW={currentZOW} onContinue={handleLeaderboardContinue} onViewHistory={handleViewHistory} />
      ) : currentStep === 'history' ? (
        <ZOWHistory onBack={handleBackFromHistory} />
      ) : (
        <DailyIntention userName={userName} onComplete={handleIntentionComplete} />
      )}
    </div>
  );
}