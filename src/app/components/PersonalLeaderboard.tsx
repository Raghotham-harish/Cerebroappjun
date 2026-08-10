import { useState } from "react";
import { AnimatedLogo } from "./AnimatedLogo";
import { Sun, User, Sparkles, Heart, ChevronRight, ArrowRight } from "lucide-react";

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
  const [expandedPillar, setExpandedPillar] = useState<string | null>(null);

  const getPillarProgress = (category: 'daily' | 'personal' | 'spiritual' | 'creative') => {
    const categoryIntents = intents.filter(i => i.category === category);
    if (categoryIntents.length === 0) {
      const dummy: Record<string, number> = { daily: 65, personal: 45, spiritual: 30, creative: 50 };
      return dummy[category] || 0;
    }
    return Math.round(categoryIntents.reduce((sum, i) => sum + i.progress, 0) / categoryIntents.length);
  };

  const pillars = [
    {
      id: 'daily',
      title: 'Daily Ritual',
      subtitle: 'Regulate Your Day',
      color: '#F59E0B',
      bgColor: '#FEF3C7',
      borderColor: '#FCD34D',
      icon: Sun,
      items: ['Build Habits', 'Meditation Practice', 'Learn to Pause', 'Improve Sleep', 'Emotional Regulation'],
      progress: getPillarProgress('daily'),
    },
    {
      id: 'personal',
      title: 'Personal Development',
      subtitle: 'Strengthen Your Self',
      color: '#3B82F6',
      bgColor: '#DBEAFE',
      borderColor: '#93C5FD',
      icon: User,
      items: ['Develop Will', 'Build Confidence', 'Self-Awareness', 'Better Decisions', 'Shadow Work'],
      progress: getPillarProgress('personal'),
    },
    {
      id: 'spiritual',
      title: 'Spiritual Development',
      subtitle: 'Connect to Your Center',
      color: '#10B981',
      bgColor: '#D1FAE5',
      borderColor: '#6EE7B7',
      icon: Heart,
      items: ['Inner Peace', 'Experience Love', 'Grieve & Heal', 'Deep Insight', 'Spiritual Practice'],
      progress: getPillarProgress('spiritual'),
    },
    {
      id: 'creative',
      title: 'Creative Development',
      subtitle: 'Energize Your Mind',
      color: '#8B5CF6',
      bgColor: '#EDE9FE',
      borderColor: '#C4B5FD',
      icon: Sparkles,
      items: ['Ignite Imagination', 'Develop Intuition', 'Creative Thinking', 'Focus & Flow', 'Artistic Expression'],
      progress: getPillarProgress('creative'),
    },
  ];

  // inner corner rounding for the quadrant closest to center
  const innerCornerStyle = [
    { borderBottomRightRadius: '6px' },
    { borderBottomLeftRadius: '6px' },
    { borderTopRightRadius: '6px' },
    { borderTopLeftRadius: '6px' },
  ];

  return (
    <div
      className="h-screen flex flex-col overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #FAF5FF 0%, #EDE9FE 50%, #EBF8FF 100%)' }}
    >
      {/* Logo */}
      <div className="pt-8 pb-2 flex justify-center px-4">
        <AnimatedLogo size={44} animate={false} />
      </div>

      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 overflow-y-auto px-4">
          <div className="max-w-2xl mx-auto py-4">

            {/* Header */}
            <div className="mb-6 text-center">
              <h2
                className="text-2xl mb-2"
                style={{ fontFamily: 'Lora, serif', fontWeight: 500, color: '#15113C' }}
              >
                Your Personal Leaderboard
              </h2>
              <p
                className="text-sm mb-1"
                style={{ fontFamily: 'Inter, sans-serif', color: '#6B7280', lineHeight: 1.6 }}
              >
                Tap into any of the cards to see how you are progressing.
              </p>
              <p
                className="text-sm mb-4"
                style={{ fontFamily: 'Inter, sans-serif', color: '#6B7280', lineHeight: 1.6 }}
              >
                Design your own rewards and set your own milestones for success.
              </p>
              {/* Will Steps pill */}
              <button
                onClick={onGetStarted}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full"
                style={{ background: 'linear-gradient(135deg, #A78BFA 0%, #8B5CF6 100%)' }}
              >
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 600, color: 'white' }}>
                  We call them Will Steps — Try it now
                </span>
                <ArrowRight className="w-3.5 h-3.5" style={{ color: 'white' }} />
              </button>
            </div>

            {/* ── 2×2 infographic grid with center circle ── */}
            <div className="relative mb-6">
              <div className="grid grid-cols-2 gap-3">
                {pillars.map((pillar, idx) => {
                  const Icon = pillar.icon;
                  const isExpanded = expandedPillar === pillar.id;

                  return (
                    <button
                      key={pillar.id}
                      onClick={() => setExpandedPillar(isExpanded ? null : pillar.id)}
                      className="p-4 rounded-3xl text-left transition-all duration-300"
                      style={{
                        background: isExpanded ? pillar.bgColor : 'white',
                        border: `2px solid ${isExpanded ? pillar.color : pillar.borderColor}`,
                        ...innerCornerStyle[idx],
                        boxShadow: isExpanded ? `0 4px 20px ${pillar.color}22` : '0 2px 8px rgba(0,0,0,0.05)',
                      }}
                    >
                      {/* Icon + title */}
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ background: pillar.bgColor }}
                        >
                          <Icon className="w-4 h-4" style={{ color: pillar.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p style={{ fontFamily: 'Lora, serif', fontWeight: 600, fontSize: '12px', color: pillar.color, lineHeight: 1.3 }}>
                            {pillar.title}
                          </p>
                          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', color: '#9CA3AF' }}>
                            {pillar.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* Progress bar */}
                      <div className="mb-2">
                        <div className="flex justify-between mb-1">
                          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', color: '#9CA3AF' }}>Progress</span>
                          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 600, color: pillar.color }}>{pillar.progress}%</span>
                        </div>
                        <div className="h-1.5 rounded-full" style={{ background: '#F3F4F6' }}>
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{ width: `${pillar.progress}%`, background: pillar.color }}
                          />
                        </div>
                      </div>

                      {/* Expanded items */}
                      {isExpanded && (
                        <ul className="space-y-1 mb-3">
                          {pillar.items.map((item, i) => (
                            <li key={i} className="flex items-center gap-1.5" style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: '#6B7280' }}>
                              <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: pillar.color }} />
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* CTA */}
                      <div className="flex items-center gap-1 mt-1">
                        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 600, color: pillar.color }}>
                          {isExpanded ? 'Show less' : 'Tap to get deeper insights'}
                        </span>
                        <ChevronRight
                          className="w-3 h-3 transition-transform duration-300"
                          style={{ color: pillar.color, transform: isExpanded ? 'rotate(90deg)' : 'rotate(0)' }}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Center connector circle — no text, just coloured arcs */}
              <div
                className="absolute pointer-events-none"
                style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10 }}
              >
                <div
                  className="flex items-center justify-center rounded-full"
                  style={{
                    width: 60,
                    height: 60,
                    background: 'white',
                    boxShadow: '0 4px 16px rgba(139,92,246,0.18)',
                    border: '2px solid rgba(167,139,250,0.35)',
                  }}
                >
                  <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
                    <circle cx="18" cy="18" r="13" stroke="#F3F4F6" strokeWidth="3" fill="none" />
                    <path d="M18 5 A13 13 0 0 1 31 18" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" fill="none" />
                    <path d="M31 18 A13 13 0 0 1 18 31" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" fill="none" />
                    <path d="M18 31 A13 13 0 0 1 5 18" stroke="#10B981" strokeWidth="3" strokeLinecap="round" fill="none" />
                    <path d="M5 18 A13 13 0 0 1 18 5" stroke="#8B5CF6" strokeWidth="3" strokeLinecap="round" fill="none" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Overall mini bar chart */}
            <div
              className="p-4 rounded-2xl flex items-center justify-between"
              style={{ background: 'white', border: '1.5px solid #E5E7EB' }}
            >
              <div>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: '#9CA3AF' }}>Overall growth</p>
                <p style={{ fontFamily: 'Lora, serif', fontSize: '20px', fontWeight: 600, color: '#15113C' }}>
                  {Math.round(pillars.reduce((s, p) => s + p.progress, 0) / pillars.length)}%
                </p>
              </div>
              <div className="flex items-end gap-2">
                {pillars.map(p => (
                  <div key={p.id} className="flex flex-col items-center gap-1">
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '9px', color: p.color, fontWeight: 600 }}>
                      {p.progress}%
                    </span>
                    <div
                      className="w-3 rounded-full"
                      style={{ height: `${Math.max(8, (p.progress / 100) * 36)}px`, background: p.color }}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="pb-24" />
          </div>
        </div>

        {/* Sticky Get Started */}
        <div
          className="flex-shrink-0 px-4 py-4"
          style={{
            background: 'linear-gradient(180deg, rgba(250,245,255,0.8) 0%, rgba(250,245,255,1) 100%)',
            borderTop: '1px solid rgba(229,231,235,0.3)',
          }}
        >
          <div className="max-w-2xl mx-auto">
            <button
              onClick={onGetStarted}
              className="w-full py-4 rounded-full flex items-center justify-center gap-2"
              style={{
                background: 'linear-gradient(135deg, #A78BFA 0%, #8B5CF6 100%)',
                color: 'white',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: '16px',
              }}
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
