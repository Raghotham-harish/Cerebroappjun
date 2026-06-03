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
      {/* Subtle Background Decoration */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute blur-[100px] left-[10%] rounded-full size-[300px] top-[20%]" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, rgba(139,92,246,0) 70%)' }} />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handleBack}
            className="flex items-center gap-2"
            style={{ background: 'transparent' }}
          >
            <ArrowLeft className="w-5 h-5" style={{ color: '#6B7280' }} />
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 500, color: '#6B7280' }}>
              Back
            </span>
          </button>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#6B7280', fontWeight: 500 }}>
            {currentStep + 1} of {CATEGORIES.length}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="bg-[rgba(139,92,246,0.2)] rounded-full h-[4px] mb-8 overflow-hidden">
          <div
            className="h-full transition-all duration-500"
            style={{
              width: `${progress}%`,
              background: '#8B5CF6'
            }}
          />
        </div>

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{
              background: 'rgba(139, 92, 246, 0.15)',
              border: '2px solid rgba(139, 92, 246, 0.3)'
            }}
          >
            <Sparkles className="w-7 h-7" style={{ color: '#8B5CF6' }} />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-center mb-2" style={{ fontFamily: 'Lora, serif', fontSize: '22px', fontWeight: 600, color: '#15113C' }}>
          {currentCategory.title}
        </h1>

        {/* Subtitle */}
        <p className="text-center mb-10" style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#6B7280' }}>
          {currentCategory.subtitle}
        </p>

        {/* Options */}
        <div className="flex-1 flex flex-col gap-3 overflow-y-auto pb-4">
          {currentCategory.options.map((option, index) => (
            <button
              key={option.label}
              onClick={() => handleSelect(option.label)}
              className="h-[70px] rounded-2xl transition-all active:scale-98"
              style={{
                background: index === 0
                  ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(147, 51, 234, 0.05) 100%)'
                  : index === 1
                  ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.05) 100%)'
                  : index === 2
                  ? 'linear-gradient(135deg, rgba(236, 72, 153, 0.1) 0%, rgba(219, 39, 119, 0.05) 100%)'
                  : 'linear-gradient(135deg, rgba(251, 146, 60, 0.1) 0%, rgba(234, 88, 12, 0.05) 100%)',
                border: '1px solid rgba(139, 92, 246, 0.2)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
              }}
            >
              <div className="flex items-center justify-center h-full">
                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '18px',
                    fontWeight: 500,
                    color: '#15113C'
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
