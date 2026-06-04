import { useState } from "react";
import { ArrowLeft } from "lucide-react";

// Power images
import powerEnergy from "../../imports/Power-1/67345da7ca691b5a63e14ff1b625b01947b7c639.png";
import powerDynamic from "../../imports/Power-1/0b67719a638746786332aaf247841124e94190cd.png";
import powerIntensity from "../../imports/Power-1/3c2ef0765229defa9fd5f52201d6e550bbb457f3.png";

// Control images
import controlMastery from "../../imports/Control-1/5a2751b1527646da1cddb7af4dd1b5ec6996c1ac.png";
import controlControl from "../../imports/Control-1/aee9ebcec86569bb0660a1df2fe61f73a394a15b.png";
import controlDiscipline from "../../imports/Control-1/94168ebbda4738cb57ca1f9d4adbd330e212534e.png";

// Focus images
import focusConcentration from "../../imports/Focus-1/4ce481e4a97f621b8d077ccaaba4bc50abee2b18.png";
import focusOnePointedness from "../../imports/Focus-1/ba9eb9b91d893f49fe78ef73ced802c02c9c865b.png";
import focusAttention from "../../imports/Focus-1/ac184a61bb259842098e9553b08e6a36d29a4179.png";
import focusFocus from "../../imports/Focus-1/611181abc8ade358d4bc654dd7844d022359ac4b.png";

// Decisiveness images
import decisivenessDetermination from "../../imports/Decisiveness-1/e1c41a5855544153cd8718b27480444c4e930a38.png";
import decisivenessDecisiveness from "../../imports/Decisiveness-1/d7977577aec471c7cc153a79c56e826660aa46e5.png";
import decisivenessResoluteness from "../../imports/Decisiveness-1/04a0f20a491fd5205475e8d76f2147b2ddb41eda.png";
import decisivenessPromptness from "../../imports/Decisiveness-1/ad83bd115bd39e9326755743a9fe4221ddaaabe5.png";

// Endurance images
import endurancePersistence from "../../imports/Endurance-1/e0435e12cb7400d1714cbd653ce63683fdf2c58d.png";
import enduranceEndurance from "../../imports/Endurance-1/912ae70da1632f5b027d939567e44bb40c7ce8e7.png";
import endurancePatience from "../../imports/Endurance-1/4a42a47c2026a12d75748fc5cc4757da3c9e29ac.png";

// Courage images
import courageInitiative from "../../imports/Courage-1/86ff0571d5a95e9a3694f191d3120d129dd54c11.png";
import courageCourage from "../../imports/Courage-1/a7a577a3cc6b67908375ddc3f4ed7d2e69dc3c5f.png";
import courageDaring from "../../imports/Courage-1/9a5141506842dd3d4c12dd3b971db0e8da7e8932.png";

// Synthesis images
import synthesisOrganization from "../../imports/Synthesis-1/a04847c7592a19a384f8b9269fa3ce92de9477d5.png";
import synthesisIntegration from "../../imports/Synthesis-1/8c36e54b6813564ffa06778138c279c98b411078.png";
import synthesisSynthesis from "../../imports/Synthesis-1/a78b7606df10e1f99f4dcbfc8bad7f933196e6b9.png";

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

interface Option {
  label: string;
  image: string;
}

interface Category {
  id: keyof ProfileData;
  title: string;
  subtitle: string;
  options: Option[];
  gradient: string;
}

const CATEGORIES: Category[] = [
  {
    id: "power",
    title: "Choose Your Power",
    subtitle: "Select the word that resonates with your inner strength",
    gradient: "linear-gradient(114.781deg, rgb(250, 245, 255) 0%, rgb(253, 242, 248) 50%, rgb(254, 242, 242) 100%)",
    options: [
      { label: "Energy", image: powerEnergy },
      { label: "Dynamic Power", image: powerDynamic },
      { label: "Intensity", image: powerIntensity }
    ]
  },
  {
    id: "control",
    title: "Choose Your Control",
    subtitle: "Select the word that defines your approach to discipline",
    gradient: "linear-gradient(114.781deg, rgb(239, 246, 255) 0%, rgb(238, 242, 255) 50%, rgb(250, 245, 255) 100%)",
    options: [
      { label: "Mastery", image: controlMastery },
      { label: "Control", image: controlControl },
      { label: "Discipline", image: controlDiscipline }
    ]
  },
  {
    id: "focus",
    title: "Choose Your Focus",
    subtitle: "Select the word that captures your mental clarity",
    gradient: "linear-gradient(114.781deg, rgb(240, 253, 250) 0%, rgb(236, 254, 255) 50%, rgb(239, 246, 255) 100%)",
    options: [
      { label: "Concentration", image: focusConcentration },
      { label: "One-Pointedness", image: focusOnePointedness },
      { label: "Attention", image: focusAttention },
      { label: "Focus", image: focusFocus }
    ]
  },
  {
    id: "decisiveness",
    title: "Choose Your Decisiveness",
    subtitle: "Select the word that reflects your decision-making style",
    gradient: "linear-gradient(114.781deg, rgb(255, 247, 237) 0%, rgb(255, 251, 235) 50%, rgb(254, 252, 232) 100%)",
    options: [
      { label: "Determination", image: decisivenessDetermination },
      { label: "Decisiveness", image: decisivenessDecisiveness },
      { label: "Resoluteness", image: decisivenessResoluteness },
      { label: "Promptness", image: decisivenessPromptness }
    ]
  },
  {
    id: "endurance",
    title: "Choose Your Endurance",
    subtitle: "Select the word that embodies your resilience",
    gradient: "linear-gradient(114.781deg, rgb(240, 253, 244) 0%, rgb(236, 253, 245) 50%, rgb(240, 253, 250) 100%)",
    options: [
      { label: "Persistence", image: endurancePersistence },
      { label: "Endurance", image: enduranceEndurance },
      { label: "Patience", image: endurancePatience }
    ]
  },
  {
    id: "courage",
    title: "Choose Your Courage",
    subtitle: "Select the word that defines your bravery",
    gradient: "linear-gradient(114.781deg, rgb(254, 242, 242) 0%, rgb(255, 241, 242) 50%, rgb(253, 242, 248) 100%)",
    options: [
      { label: "Initiative", image: courageInitiative },
      { label: "Courage", image: courageCourage },
      { label: "Daring", image: courageDaring }
    ]
  },
  {
    id: "synthesis",
    title: "Choose Your Synthesis",
    subtitle: "Select the word that represents your integration",
    gradient: "linear-gradient(114.781deg, rgb(245, 243, 255) 0%, rgb(250, 245, 255) 50%, rgb(253, 244, 255) 100%)",
    options: [
      { label: "Organization", image: synthesisOrganization },
      { label: "Integration", image: synthesisIntegration },
      { label: "Synthesis", image: synthesisSynthesis }
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
    }, 200);
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col overflow-hidden"
      style={{ background: currentCategory.gradient }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden opacity-40">
        <div
          className="absolute blur-[70px] left-[90px] opacity-30 rounded-full size-[420px] top-[30px]"
          style={{
            background: 'radial-gradient(circle, rgba(196,181,253,0.4) 0%, rgba(196,181,253,0) 70%)'
          }}
        />
        <div
          className="absolute blur-[70px] left-[20px] opacity-25 rounded-full size-[350px] top-[490px]"
          style={{
            background: 'radial-gradient(circle, rgba(251,207,232,0.4) 0%, rgba(251,207,232,0) 70%)'
          }}
        />
        <div
          className="absolute blur-[65px] left-[40px] opacity-20 rounded-full size-[290px] top-[395px]"
          style={{
            background: 'radial-gradient(circle, rgba(191,219,254,0.4) 0%, rgba(191,219,254,0) 70%)'
          }}
        />
        <div
          className="absolute blur-[68px] left-[-10px] opacity-20 rounded-full size-[270px] top-[345px]"
          style={{
            background: 'radial-gradient(circle, rgba(254,215,170,0.4) 0%, rgba(254,215,170,0) 70%)'
          }}
        />
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
            className="flex items-center gap-2"
            style={{ background: 'transparent' }}
          >
            <ArrowLeft className="w-5 h-5" style={{ color: '#4A5565' }} />
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                fontWeight: 500,
                color: '#4A5565'
              }}
            >
              Back
            </span>
          </button>
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              color: '#4A5565'
            }}
          >
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
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{
              background: 'rgba(255,255,255,0.6)'
            }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 23.9899 23.9899"
            >
              <g>
                <path
                  d="M9.93282 15.4935C9.84358 15.1476 9.66327 14.8319 9.41065 14.5792C9.15804 14.3266 8.84235 14.1463 8.49642 14.0571L2.364 12.4757C2.25938 12.4461 2.1673 12.383 2.10173 12.2963C2.03616 12.2095 2.00068 12.1037 2.00068 11.9949C2.00068 11.8862 2.03616 11.7804 2.10173 11.6936C2.1673 11.6069 2.25938 11.5438 2.364 11.5142L8.49642 9.93182C8.84223 9.84266 9.15784 9.6625 9.41044 9.41008C9.66304 9.15765 9.84342 8.84216 9.93282 8.49642L11.5142 2.364C11.5435 2.25897 11.6065 2.16643 11.6934 2.10051C11.7803 2.03459 11.8864 1.99891 11.9954 1.99891C12.1045 1.99891 12.2106 2.03459 12.2975 2.10051C12.3844 2.16643 12.4474 2.25897 12.4767 2.364L14.0571 8.49642C14.1463 8.84235 14.3266 9.15804 14.5792 9.41066C14.8319 9.66327 15.1476 9.84358 15.4935 9.93282L21.6259 11.5132C21.7313 11.5422 21.8243 11.6051 21.8906 11.6922C21.9569 11.7792 21.9928 11.8856 21.9928 11.9949C21.9928 12.1043 21.9569 12.2107 21.8906 12.2977C21.8243 12.3848 21.7313 12.4477 21.6259 12.4767L15.4935 14.0571C15.1476 14.1463 14.8319 14.3266 14.5792 14.5792C14.3266 14.8319 14.1463 15.1476 14.0571 15.4935L12.4757 21.6259C12.4464 21.7309 12.3834 21.8235 12.2965 21.8894C12.2096 21.9553 12.1035 21.991 11.9944 21.991C11.8854 21.991 11.7793 21.9553 11.6924 21.8894C11.6055 21.8235 11.5425 21.7309 11.5132 21.6259L9.93282 15.4935Z"
                  stroke="#9810FA"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.99916"
                />
                <path
                  d="M19.9916 2.99874V6.99705"
                  stroke="#9810FA"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.99916"
                />
                <path
                  d="M21.9907 4.9979H17.9924"
                  stroke="#9810FA"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.99916"
                />
                <path
                  d="M3.99832 16.9928V18.9928"
                  stroke="#9810FA"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.99916"
                />
                <path
                  d="M4.99874 17.9924H2.99874"
                  stroke="#9810FA"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.99916"
                />
              </g>
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1
          className="text-center mb-3"
          style={{
            fontFamily: 'Lora, serif',
            fontSize: '24px',
            fontWeight: 600,
            color: '#101828'
          }}
        >
          {currentCategory.title}
        </h1>

        {/* Subtitle */}
        <p
          className="text-center mb-8"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
            color: '#4A5565'
          }}
        >
          {currentCategory.subtitle}
        </p>

        {/* Options */}
        <div className="flex-1 flex flex-col gap-4 overflow-y-auto pb-4">
          {currentCategory.options.map((option) => (
            <button
              key={option.label}
              onClick={() => handleSelect(option.label)}
              className="relative h-[112px] rounded-2xl overflow-hidden transition-all active:scale-95"
              style={{
                border: '2px solid rgba(255, 255, 255, 0.6)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
              }}
            >
              <img
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                src={option.image}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.7) 100%)'
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className="relative z-10 drop-shadow-[0px_4px_4px_rgba(0,0,0,0.15)]"
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
