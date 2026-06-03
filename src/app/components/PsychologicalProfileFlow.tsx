import { useState } from "react";
import { ArrowLeft, Sparkles } from "lucide-react";

interface PsychologicalProfileFlowProps {
  onComplete: (profile: ProfileData) => void;
  onClose: () => void;
}

export interface ProfileData {
  power: string;
  control: string;
  focus: string;
  decisiveness: string;
  endurance: string;
  courage: string;
  synthesis: string;
}

interface Category {
  id: keyof ProfileData;
  title: string;
  subtitle: string;
  options: Array<{
    label: string;
    image: string;
  }>;
  gradient: string;
}

const CATEGORIES: Category[] = [
  {
    id: "power",
    title: "Choose Your Power",
    subtitle: "Select the word that resonates with your inner strength",
    gradient: "linear-gradient(114.781deg, rgb(250, 245, 255) 0%, rgb(253, 242, 248) 50%, rgb(254, 242, 242) 100%)",
    options: [
      { label: "Energy", image: "power-energy.jpg" },
      { label: "Dynamic Power", image: "power-dynamic.jpg" },
      { label: "Intensity", image: "power-intensity.jpg" }
    ]
  },
  {
    id: "control",
    title: "Choose Your Control",
    subtitle: "Select the word that defines your approach to discipline",
    gradient: "linear-gradient(114.781deg, rgb(239, 246, 255) 0%, rgb(238, 242, 255) 50%, rgb(250, 245, 255) 100%)",
    options: [
      { label: "Mastery", image: "control-mastery.jpg" },
      { label: "Control", image: "control-control.jpg" },
      { label: "Discipline", image: "control-discipline.jpg" }
    ]
  },
  {
    id: "focus",
    title: "Choose Your Focus",
    subtitle: "Select the word that captures your mental clarity",
    gradient: "linear-gradient(114.781deg, rgb(240, 253, 250) 0%, rgb(236, 254, 255) 50%, rgb(239, 246, 255) 100%)",
    options: [
      { label: "Concentration", image: "focus-concentration.jpg" },
      { label: "One-Pointedness", image: "focus-onepoint.jpg" },
      { label: "Attention", image: "focus-attention.jpg" },
      { label: "Focus", image: "focus-focus.jpg" }
    ]
  },
  {
    id: "decisiveness",
    title: "Choose Your Decisiveness",
    subtitle: "Select the word that reflects your decision-making style",
    gradient: "linear-gradient(114.781deg, rgb(255, 247, 237) 0%, rgb(255, 251, 235) 50%, rgb(254, 252, 232) 100%)",
    options: [
      { label: "Determination", image: "decisiveness-determination.jpg" },
      { label: "Decisiveness", image: "decisiveness-decisiveness.jpg" },
      { label: "Resoluteness", image: "decisiveness-resoluteness.jpg" },
      { label: "Promptness", image: "decisiveness-promptness.jpg" }
    ]
  },
  {
    id: "endurance",
    title: "Choose Your Endurance",
    subtitle: "Select the word that embodies your resilience",
    gradient: "linear-gradient(114.781deg, rgb(240, 253, 244) 0%, rgb(236, 253, 245) 50%, rgb(240, 253, 250) 100%)",
    options: [
      { label: "Persistence", image: "endurance-persistence.jpg" },
      { label: "Endurance", image: "endurance-endurance.jpg" },
      { label: "Patience", image: "endurance-patience.jpg" }
    ]
  },
  {
    id: "courage",
    title: "Choose Your Courage",
    subtitle: "Select the word that defines your bravery",
    gradient: "linear-gradient(114.781deg, rgb(254, 242, 242) 0%, rgb(255, 241, 242) 50%, rgb(253, 242, 248) 100%)",
    options: [
      { label: "Initiative", image: "courage-initiative.jpg" },
      { label: "Courage", image: "courage-courage.jpg" },
      { label: "Daring", image: "courage-daring.jpg" }
    ]
  },
  {
    id: "synthesis",
    title: "Choose Your Synthesis",
    subtitle: "Select the word that represents your integration",
    gradient: "linear-gradient(114.781deg, rgb(245, 243, 255) 0%, rgb(250, 245, 255) 50%, rgb(253, 244, 255) 100%)",
    options: [
      { label: "Organization", image: "synthesis-organization.jpg" },
      { label: "Integration", image: "synthesis-integration.jpg" },
      { label: "Synthesis", image: "synthesis-synthesis.jpg" }
    ]
  }
];

export function PsychologicalProfileFlow({ onComplete, onClose }: PsychologicalProfileFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<Partial<ProfileData>>({});

  const currentCategory = CATEGORIES[currentStep];
  const progress = ((currentStep + 1) / CATEGORIES.length) * 100;

  const handleSelect = (option: string) => {
    const newSelections = {
      ...selections,
      [currentCategory.id]: option
    };

    setSelections(newSelections);

    setTimeout(() => {
      if (currentStep < CATEGORIES.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        onComplete(newSelections as ProfileData);
      }
    }, 300);
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col overflow-hidden" style={{ background: currentCategory.gradient }}>
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden opacity-40">
        <div className="absolute blur-[70px] left-[90px] opacity-30 rounded-full size-[420px] top-[30px]" style={{ background: 'radial-gradient(circle, rgba(196,181,253,0.4) 0%, rgba(196,181,253,0) 70%)' }} />
        <div className="absolute blur-[70px] left-[20px] opacity-25 rounded-full size-[350px] top-[490px]" style={{ background: 'radial-gradient(circle, rgba(251,207,232,0.4) 0%, rgba(251,207,232,0) 70%)' }} />
        <div className="absolute blur-[65px] left-[40px] opacity-20 rounded-full size-[290px] top-[395px]" style={{ background: 'radial-gradient(circle, rgba(191,219,254,0.4) 0%, rgba(191,219,254,0) 70%)' }} />
        <div className="absolute blur-[68px] left-[-10px] opacity-20 rounded-full size-[270px] top-[345px]" style={{ background: 'radial-gradient(circle, rgba(254,215,170,0.4) 0%, rgba(254,215,170,0) 70%)' }} />
      </div>

      {/* Decorative Stars */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-[rgba(255,255,255,0.4)] rounded-full size-[4px]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 px-3 py-2 rounded-lg"
            style={{ background: 'rgba(255,255,255,0.6)' }}
          >
            <ArrowLeft className="w-5 h-5" style={{ color: '#4A5565' }} />
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 500, color: '#4A5565' }}>
              Back
            </span>
          </button>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#4A5565' }}>
            {currentStep + 1} of {CATEGORIES.length}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="bg-[rgba(255,255,255,0.4)] rounded-full h-[6px] mb-8 overflow-hidden">
          <div
            className="h-full transition-all duration-500"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(to right, #ad46ff, #f6339a, #2b7fff)'
            }}
          />
        </div>

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center animate-pulse"
            style={{
              background: 'rgba(255,255,255,0.6)',
              transform: `rotate(${currentStep * 15}deg)`,
              transition: 'transform 0.5s ease'
            }}
          >
            <Sparkles className="w-6 h-6" style={{ color: '#9810FA' }} />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-center mb-3" style={{ fontFamily: 'Lora, serif', fontSize: '24px', fontWeight: 600, color: '#101828' }}>
          {currentCategory.title}
        </h1>

        {/* Subtitle */}
        <p className="text-center mb-8" style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#4A5565' }}>
          {currentCategory.subtitle}
        </p>

        {/* Options */}
        <div className="flex-1 flex flex-col gap-4 overflow-y-auto pb-4">
          {currentCategory.options.map((option, index) => (
            <button
              key={option.label}
              onClick={() => handleSelect(option.label)}
              className="relative h-[112px] rounded-2xl overflow-hidden transition-all active:scale-95"
              style={{
                background: `linear-gradient(135deg,
                  ${index === 0 ? 'rgba(147, 51, 234, 0.15)' :
                    index === 1 ? 'rgba(59, 130, 246, 0.15)' :
                    index === 2 ? 'rgba(236, 72, 153, 0.15)' :
                    'rgba(251, 146, 60, 0.15)'} 0%,
                  ${index === 0 ? 'rgba(139, 92, 246, 0.25)' :
                    index === 1 ? 'rgba(37, 99, 235, 0.25)' :
                    index === 2 ? 'rgba(219, 39, 119, 0.25)' :
                    'rgba(234, 88, 12, 0.25)'} 100%)`,
                border: '2px solid rgba(255, 255, 255, 0.6)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="absolute inset-0 opacity-80"
                  style={{
                    background: 'linear-gradient(to bottom, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.3) 100%)'
                  }}
                />
                <span
                  className="relative z-10 drop-shadow-[0px_2px_8px_rgba(0,0,0,0.3)]"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '24px',
                    fontWeight: 600,
                    color: 'white',
                    textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                  }}
                >
                  {option.label}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
