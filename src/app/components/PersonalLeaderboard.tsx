import { useState } from "react";
import { AnimatedLogo } from "./AnimatedLogo";
import { Sun, User, Sparkles, Heart } from "lucide-react";

interface Intent {
  category: 'daily' | 'personal' | 'spiritual' | 'creative';
  intent: string;
  progress: number;
}

interface PersonalLeaderboardProps {
  userName: string;
  intents: Intent[];
  onGetStarted: () => void;
}

export function PersonalLeaderboard({ userName, intents, onGetStarted }: PersonalLeaderboardProps) {
  const [selectedPillar, setSelectedPillar] = useState<string | null>(null);

  // Calculate progress for each pillar (0-100%)
  const getPillarProgress = (category: 'daily' | 'personal' | 'spiritual' | 'creative') => {
    const categoryIntents = intents.filter(i => i.category === category);
    if (categoryIntents.length === 0) {
      // Return dummy data for showcase if no real data exists
      const dummyProgress: Record<string, number> = {
        'daily': 65,
        'personal': 45,
        'spiritual': 30,
        'creative': 50
      };
      return dummyProgress[category] || 0;
    }
    const avgProgress = categoryIntents.reduce((sum, i) => sum + i.progress, 0) / categoryIntents.length;
    return Math.round(avgProgress);
  };

  const pillars = [
    {
      id: 'daily',
      title: 'Daily Ritual',
      subtitle: 'Regulate Your Day',
      color: '#F59E0B',
      bgColor: '#FEF3C7',
      icon: Sun,
      items: [
        'Build Habits',
        'Meditation Practice',
        'Learn to Pause',
        'Improve Sleep',
        'Emotional Regulation'
      ],
      progress: getPillarProgress('daily')
    },
    {
      id: 'personal',
      title: 'Personal Development',
      subtitle: 'Strengthen Your Self',
      color: '#3B82F6',
      bgColor: '#DBEAFE',
      icon: User,
      items: [
        'Develop Will',
        'Build Confidence',
        'Self-Awareness',
        'Better Decisions',
        'Shadow Work'
      ],
      progress: getPillarProgress('personal')
    },
    {
      id: 'spiritual',
      title: 'Spiritual Development',
      subtitle: 'Connect to Your Center',
      color: '#10B981',
      bgColor: '#D1FAE5',
      icon: Heart,
      items: [
        'Inner Peace',
        'Experience Love',
        'Reduce Anxiety',
        'Deep Insight',
        'Spiritual Practice'
      ],
      progress: getPillarProgress('spiritual')
    },
    {
      id: 'creative',
      title: 'Creative Development',
      subtitle: 'Energize Your Mind',
      color: '#8B5CF6',
      bgColor: '#EDE9FE',
      icon: Sparkles,
      items: [
        'Ignite Imagination',
        'Develop Intuition',
        'Creative Thinking',
        'Focus & Flow',
        'Artistic Expression'
      ],
      progress: getPillarProgress('creative')
    }
  ];

  return (
    <div
      className="h-screen flex flex-col overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #FAF5FF 0%, #EDE9FE 50%, #EBF8FF 100%)'
      }}
    >
      {/* Logo Header */}
      <div className="pt-8 pb-4 flex justify-center px-4">
        <AnimatedLogo size={48} animate={false} />
      </div>

      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 overflow-y-auto px-4">
          <div className="max-w-2xl mx-auto py-6">
            {/* Header */}
            <div className="mb-8 text-center">
              <h2
                className="text-3xl mb-2"
                style={{
                  fontFamily: 'Lora, serif',
                  fontWeight: 500,
                  color: '#15113C'
                }}
              >
                Personal Leaderboard
              </h2>
              <p
                className="text-base"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  color: '#6B7280'
                }}
              >
                Track your progress across 4 pillars of growth
              </p>
            </div>

            {/* Maturity Spiral Graph */}
            <div className="mb-8 flex justify-center p-4">
              <svg width="320" height="320" viewBox="0 0 320 320">
                {/* Center circle */}
                <circle
                  cx="160"
                  cy="160"
                  r="80"
                  fill="white"
                  stroke="#E5E7EB"
                  strokeWidth="2"
                />

                {/* Pillar circles */}
                {pillars.map((pillar, index) => {
                  // Position circles in a square formation around center
                  const positions = [
                    { x: 160, y: 50 },  // Top (Daily - Orange)
                    { x: 270, y: 160 }, // Right (Personal - Blue)
                    { x: 160, y: 270 }, // Bottom (Spiritual - Green)
                    { x: 50, y: 160 }   // Left (Creative - Purple)
                  ];
                  const pos = positions[index];

                  // Calculate circle circumference for progress
                  const radius = 35;
                  const circumference = 2 * Math.PI * radius;
                  const progressOffset = circumference - (circumference * pillar.progress) / 100;

                  return (
                    <g key={pillar.id}>
                      {/* Background ring */}
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r={radius}
                        fill="none"
                        stroke="#E5E7EB"
                        strokeWidth="6"
                      />
                      {/* Progress ring */}
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r={radius}
                        fill="none"
                        stroke={pillar.color}
                        strokeWidth="6"
                        strokeDasharray={circumference}
                        strokeDashoffset={progressOffset}
                        strokeLinecap="round"
                        transform={`rotate(-90 ${pos.x} ${pos.y})`}
                      />
                      {/* Inner filled circle */}
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r={radius - 10}
                        fill={pillar.color}
                        opacity="0.9"
                      />
                      {/* Center highlight */}
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r={radius - 18}
                        fill="white"
                        opacity="0.4"
                      />
                    </g>
                  );
                })}

                {/* Center text */}
                <text
                  x="160"
                  y="153"
                  textAnchor="middle"
                  fontSize="16"
                  fill="#15113C"
                  fontFamily="Lora, serif"
                  fontWeight="600"
                >
                  Psychological
                </text>
                <text
                  x="160"
                  y="172"
                  textAnchor="middle"
                  fontSize="16"
                  fill="#15113C"
                  fontFamily="Lora, serif"
                  fontWeight="600"
                >
                  Maturity
                </text>
              </svg>
            </div>

            {/* Four Pillars Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {pillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.id}
                    className="p-6 rounded-3xl transition-all cursor-pointer"
                    style={{
                      background: selectedPillar === pillar.id
                        ? pillar.bgColor
                        : 'white',
                      border: `2px solid ${selectedPillar === pillar.id ? pillar.color : '#E5E7EB'}`
                    }}
                    onClick={() => setSelectedPillar(selectedPillar === pillar.id ? null : pillar.id)}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: pillar.bgColor }}
                      >
                        <Icon className="w-5 h-5" style={{ color: pillar.color }} />
                      </div>
                      <div className="flex-1">
                        <h3
                          className="text-base mb-1"
                          style={{
                            fontFamily: 'Lora, serif',
                            fontWeight: 600,
                            color: pillar.color
                          }}
                        >
                          {pillar.title}
                        </h3>
                        <p
                          className="text-sm"
                          style={{
                            fontFamily: 'Inter, sans-serif',
                            color: '#6B7280'
                          }}
                        >
                          {pillar.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <span
                          className="text-xs"
                          style={{
                            fontFamily: 'Inter, sans-serif',
                            color: '#9CA3AF'
                          }}
                        >
                          Progress
                        </span>
                        <span
                          className="text-xs"
                          style={{
                            fontFamily: 'Inter, sans-serif',
                            color: pillar.color,
                            fontWeight: 600
                          }}
                        >
                          {pillar.progress}%
                        </span>
                      </div>
                      <div className="h-2 rounded-full" style={{ background: '#F3F4F6' }}>
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${pillar.progress}%`,
                            background: pillar.color
                          }}
                        />
                      </div>
                    </div>

                    {/* Items list */}
                    <ul className="space-y-1">
                      {pillar.items.map((item, idx) => (
                        <li
                          key={idx}
                          className="text-sm flex items-center gap-2"
                          style={{
                            fontFamily: 'Inter, sans-serif',
                            color: '#6B7280'
                          }}
                        >
                          <span
                            className="w-1 h-1 rounded-full flex-shrink-0"
                            style={{ background: pillar.color }}
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

            <div className="pb-24" />
          </div>
        </div>

        {/* Sticky Get Started Button */}
        <div
          className="flex-shrink-0 px-4 py-4"
          style={{
            background: 'linear-gradient(180deg, rgba(250, 245, 255, 0.8) 0%, rgba(250, 245, 255, 1) 100%)',
            borderTop: '1px solid rgba(229, 231, 235, 0.3)'
          }}
        >
          <div className="max-w-2xl mx-auto">
            <button
              onClick={onGetStarted}
              className="w-full py-4 rounded-full"
              style={{
                background: 'linear-gradient(135deg, #A78BFA 0%, #8B5CF6 100%)',
                color: 'white',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: '16px'
              }}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
