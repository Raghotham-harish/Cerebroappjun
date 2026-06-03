interface ZOWEntry {
  date: string;
  level: number;
  color: string;
}

interface ZOWLeaderboardProps {
  currentZOW: number;
  onContinue: () => void;
  onViewHistory: () => void;
}

export function ZOWLeaderboard({ currentZOW, onContinue, onViewHistory }: ZOWLeaderboardProps) {
  // Mock 7-day history
  const history: ZOWEntry[] = [
    { date: '10', level: 4, color: '#34D399' },
    { date: '11', level: 3, color: '#FBBF24' },
    { date: '12', level: 4, color: '#34D399' },
    { date: '13', level: 5, color: '#10B981' },
    { date: '14', level: 3, color: '#FBBF24' },
    { date: '15', level: 4, color: '#34D399' },
    { date: '16', level: currentZOW, color: getZOWColor(currentZOW) }
  ];

  const average = (history.reduce((sum, entry) => sum + entry.level, 0) / history.length).toFixed(1);

  // Mock cohort data (anonymous)
  const myRank = 847;
  const totalUsers = 12450;
  const percentile = Math.round((1 - myRank / totalUsers) * 100);

  // ZOW distribution (anonymous aggregated data)
  const zowDistribution = [
    { level: 5, label: 'Excellent', count: 1240, percentage: 10, color: '#10B981' },
    { level: 4, label: 'Good', count: 3735, percentage: 30, color: '#34D399' },
    { level: 3, label: 'Moderate', count: 4980, percentage: 40, color: '#FBBF24' },
    { level: 2, label: 'Low', count: 1868, percentage: 15, color: '#FB923C' },
    { level: 1, label: 'Very Low', count: 627, percentage: 5, color: '#F87171' }
  ];

  // Trend data
  const weeklyTrends = {
    improved: 42, // percentage
    stayed: 38,
    declined: 20
  };

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex-1 overflow-y-auto px-4">
        <div className="max-w-2xl mx-auto py-4">
          {/* Header */}
          <div className="mb-3 text-center">
            <h2
              className="text-2xl mb-1"
              style={{
                fontFamily: 'Lora, serif',
                fontWeight: 500,
                color: '#15113C'
              }}
            >
              Your Zone of Wellbeing
            </h2>
            <p
              className="text-sm mb-2"
              style={{
                fontFamily: 'Inter, sans-serif',
                color: '#9CA3AF'
              }}
            >
              7-day journey
            </p>

            {/* Disclaimer */}
            <div
              className="px-3 py-2 rounded-2xl max-w-lg mx-auto"
              style={{
                background: 'rgba(196, 181, 253, 0.15)',
                border: '1px solid #C4B5FD'
              }}
            >
              <p
                className="text-xs leading-snug"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  color: '#6B21A8',
                  fontStyle: 'italic'
                }}
              >
                💡 Track your emotional baseline and wellness progress over time
              </p>
            </div>
          </div>

          {/* Today Status Card */}
          <div
            className="p-4 rounded-3xl mb-3"
            style={{
              background: 'linear-gradient(135deg, #EDE9FE 0%, #E0E7FF 100%)',
              border: '2px solid #C4B5FD'
            }}
          >
            <div className="flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: getZOWColor(currentZOW) }}
              >
                <span
                  className="text-3xl"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 700,
                    color: 'white'
                  }}
                >
                  {currentZOW}
                </span>
              </div>
              <div className="flex-1">
                <p
                  className="text-xs mb-0.5"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    color: '#8B5CF6',
                    letterSpacing: '0.05em',
                    fontWeight: 600
                  }}
                >
                  TODAY'S ZOW
                </p>
                <p
                  className="text-base mb-0.5"
                  style={{
                    fontFamily: 'Lora, serif',
                    fontWeight: 500,
                    color: '#15113C'
                  }}
                >
                  {getZOWLabel(currentZOW)}
                </p>
                <p
                  className="text-xs"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    color: '#9CA3AF'
                  }}
                >
                  Zone of Wellbeing
                </p>
              </div>
            </div>
          </div>

          {/* Snake Flow History Graph */}
          <div
            className="p-4 rounded-3xl mb-3"
            style={{
              background: 'white',
              border: '2px solid #E5E7EB'
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3
                  className="text-base mb-0.5"
                  style={{
                    fontFamily: 'Lora, serif',
                    fontWeight: 500,
                    color: '#15113C'
                  }}
                >
                  Your Wellness Journey
                </h3>
                <p
                  className="text-xs"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    color: '#9CA3AF'
                  }}
                >
                  14-day wellness flow
                </p>
              </div>
              <div className="text-right">
                <p
                  className="text-xs mb-0.5"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    color: '#9CA3AF'
                  }}
                >
                  Average
                </p>
                <p
                  className="text-2xl"
                  style={{
                    fontFamily: 'Lora, serif',
                    fontWeight: 600,
                    color: '#8B5CF6'
                  }}
                >
                  {average}
                </p>
              </div>
            </div>

            {/* Snake Flow SVG */}
            <div className="relative">
              <svg
                viewBox="0 0 600 300"
                className="w-full"
                style={{ maxHeight: '250px' }}
              >
                {/* Background horizontal wellness zones - LOW at bottom, HIGH at top */}
                <rect x={40} y={190} width={560} height={90} fill="#FEE2E2" opacity="0.3" />
                <rect x={40} y={100} width={560} height={90} fill="#FEF3C7" opacity="0.3" />
                <rect x={40} y={20} width={560} height={80} fill="#D1FAE5" opacity="0.3" />

                {/* Horizontal wellness zone dividers */}
                <line x1={40} y1={190} x2={600} y2={190} stroke="#9CA3AF" strokeWidth="1" strokeDasharray="4,4" opacity="0.3" />
                <line x1={40} y1={100} x2={600} y2={100} stroke="#9CA3AF" strokeWidth="1" strokeDasharray="4,4" opacity="0.3" />

                {/* Vertical time grid lines */}
                {[150, 280, 410, 540].map((x, i) => (
                  <line key={i} x1={x} y1={20} x2={x} y2={280} stroke="#D1D5DB" strokeWidth="0.5" strokeDasharray="2,2" opacity="0.3" />
                ))}

                {/* Y-axis wellness labels on left */}
                <text x={15} y={235} textAnchor="middle" fontSize="8" fill="#6B7280" fontFamily="Inter, sans-serif" transform={`rotate(-90, 15, 235)`}>
                  LOW
                </text>
                <text x={15} y={145} textAnchor="middle" fontSize="8" fill="#6B7280" fontFamily="Inter, sans-serif" transform={`rotate(-90, 15, 145)`}>
                  MOD
                </text>
                <text x={15} y={60} textAnchor="middle" fontSize="8" fill="#6B7280" fontFamily="Inter, sans-serif" transform={`rotate(-90, 15, 60)`}>
                  HIGH
                </text>

                {/* X-axis time labels at bottom */}
                <text x={95} y={293} textAnchor="middle" fontSize="8" fill="#8B5CF6" fontFamily="Inter, sans-serif" fontWeight="600">
                  D1
                </text>
                <text x={225} y={293} textAnchor="middle" fontSize="8" fill="#8B5CF6" fontFamily="Inter, sans-serif" fontWeight="600">
                  D4
                </text>
                <text x={355} y={293} textAnchor="middle" fontSize="8" fill="#8B5CF6" fontFamily="Inter, sans-serif" fontWeight="600">
                  D7
                </text>
                <text x={485} y={293} textAnchor="middle" fontSize="8" fill="#8B5CF6" fontFamily="Inter, sans-serif" fontWeight="600">
                  D10
                </text>
                <text x={560} y={293} textAnchor="middle" fontSize="8" fill="#8B5CF6" fontFamily="Inter, sans-serif" fontWeight="600">
                  D14
                </text>

                {/* Generate snake path */}
                {(() => {
                  // Multiple check-ins per day showing realistic variation
                  const historyEntries = [
                    // Today - 3 check-ins
                    { score: 6, triggers: [], time: 'morning' },
                    { score: 5, triggers: [], time: 'afternoon' },
                    { score: 4, triggers: [], time: 'evening' },

                    // Yesterday - 4 check-ins
                    { score: 3, triggers: [], time: 'morning' },
                    { score: 4, triggers: [], time: 'midday' },
                    { score: 3, triggers: ['work stress'], time: 'afternoon' },
                    { score: 2, triggers: [], time: 'evening' },

                    // Day 3 - 3 check-ins
                    { score: 3, triggers: [], time: 'morning' },
                    { score: 4, triggers: [], time: 'afternoon' },
                    { score: 5, triggers: [], time: 'evening' },

                    // Day 4 - 2 check-ins
                    { score: 6, triggers: [], time: 'morning' },
                    { score: 5, triggers: [], time: 'evening' },

                    // Day 5 - 4 check-ins
                    { score: 4, triggers: [], time: 'morning' },
                    { score: 3, triggers: [], time: 'midday' },
                    { score: 2, triggers: ['poor sleep'], time: 'afternoon' },
                    { score: 3, triggers: [], time: 'evening' },

                    // Day 6 - 3 check-ins
                    { score: 4, triggers: [], time: 'morning' },
                    { score: 5, triggers: [], time: 'afternoon' },
                    { score: 6, triggers: [], time: 'evening' },

                    // Day 7 - 2 check-ins
                    { score: 5, triggers: [], time: 'morning' },
                    { score: 4, triggers: [], time: 'evening' },
                  ];

                  const positions = historyEntries.map((entry, index) => {
                    // Swap axes: time on X (horizontal), wellness on Y (vertical)
                    const x = 40 + (index / (historyEntries.length - 1)) * 520;
                    const y = 270 - ((entry.score - 1) / 6) * 240; // Invert Y so low is bottom, high is top
                    return { x, y, entry };
                  });

                  // Generate smooth path
                  let snakePath = positions.length > 0 ? `M ${positions[0].x} ${positions[0].y}` : '';
                  for (let i = 1; i < positions.length; i++) {
                    const prev = positions[i - 1];
                    const curr = positions[i];
                    const midY = (prev.y + curr.y) / 2;
                    snakePath += ` Q ${prev.x} ${midY}, ${curr.x} ${curr.y}`;
                  }

                  return (
                    <>
                      {/* Connecting path */}
                      <path d={snakePath} fill="none" stroke="#A78BFA" strokeWidth="2" opacity="0.5" />

                      {/* Dots */}
                      {positions.map((pos, index) => (
                        <g key={index}>
                          <circle
                            cx={pos.x}
                            cy={pos.y}
                            r={6}
                            fill={getZOWColor(pos.entry.score)}
                            stroke="white"
                            strokeWidth="2"
                          />
                          {pos.entry.triggers && pos.entry.triggers.length > 0 && (
                            <circle
                              cx={pos.x}
                              cy={pos.y}
                              r={10}
                              fill="none"
                              stroke="#EF4444"
                              strokeWidth="2"
                            />
                          )}
                        </g>
                      ))}
                    </>
                  );
                })()}
              </svg>
            </div>

            {/* View All History Button */}
            <div className="border-t mt-3 pt-3" style={{ borderColor: '#E5E7EB' }}>
              <button
                onClick={onViewHistory}
                className="w-full py-2 rounded-2xl transition-all text-xs"
                style={{
                  background: 'transparent',
                  border: '2px solid #8B5CF6',
                  color: '#8B5CF6',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600
                }}
              >
                View All Details
              </button>
            </div>
          </div>

          {/* Zone Time Distribution */}
          <div
            className="p-4 rounded-3xl mb-3"
            style={{
              background: 'white',
              border: '2px solid #E5E7EB'
            }}
          >
            <h3
              className="text-sm mb-3"
              style={{
                fontFamily: 'Lora, serif',
                fontWeight: 500,
                color: '#15113C'
              }}
            >
              Zone Distribution
            </h3>

            <div className="space-y-2">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ background: '#10B981' }} />
                    <span className="text-sm" style={{ fontFamily: 'Inter, sans-serif', color: '#15113C' }}>
                      Wellbeing (High 6-7)
                    </span>
                  </div>
                  <span className="text-sm" style={{ fontFamily: 'Inter, sans-serif', color: '#15113C', fontWeight: 600 }}>
                    43%
                  </span>
                </div>
                <div className="h-2 rounded-full" style={{ background: '#F3F4F6' }}>
                  <div className="h-full rounded-full transition-all" style={{ width: '43%', background: '#10B981' }} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ background: '#FBBF24' }} />
                    <span className="text-sm" style={{ fontFamily: 'Inter, sans-serif', color: '#15113C' }}>
                      Well Being (Moderate 3-5)
                    </span>
                  </div>
                  <span className="text-sm" style={{ fontFamily: 'Inter, sans-serif', color: '#15113C', fontWeight: 600 }}>
                    42%
                  </span>
                </div>
                <div className="h-2 rounded-full" style={{ background: '#F3F4F6' }}>
                  <div className="h-full rounded-full transition-all" style={{ width: '42%', background: '#FBBF24' }} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ background: '#F87171' }} />
                    <span className="text-sm" style={{ fontFamily: 'Inter, sans-serif', color: '#15113C' }}>
                      Ill Being (Low 1-2)
                    </span>
                  </div>
                  <span className="text-sm" style={{ fontFamily: 'Inter, sans-serif', color: '#15113C', fontWeight: 600 }}>
                    15%
                  </span>
                </div>
                <div className="h-2 rounded-full" style={{ background: '#F3F4F6' }}>
                  <div className="h-full rounded-full transition-all" style={{ width: '15%', background: '#F87171' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Triggers Identified */}
          <div
            className="p-4 rounded-3xl mb-3"
            style={{
              background: 'white',
              border: '2px solid #E5E7EB'
            }}
          >
            <h3
              className="text-sm mb-2"
              style={{
                fontFamily: 'Lora, serif',
                fontWeight: 500,
                color: '#15113C'
              }}
            >
              Recent Triggers
            </h3>

            <div className="space-y-2">
              <div
                className="p-2 rounded-2xl"
                style={{
                  background: 'rgba(254, 226, 226, 0.5)',
                  border: '1px solid #FCA5A5'
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs" style={{ fontFamily: 'Inter, sans-serif', color: '#15113C', fontWeight: 600 }}>
                    Work stress
                  </span>
                  <span className="text-xs" style={{ fontFamily: 'Inter, sans-serif', color: '#9CA3AF' }}>
                    Apr 25, 16:45
                  </span>
                </div>
              </div>

              <div
                className="p-2 rounded-2xl"
                style={{
                  background: 'rgba(254, 226, 226, 0.5)',
                  border: '1px solid #FCA5A5'
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs" style={{ fontFamily: 'Inter, sans-serif', color: '#15113C', fontWeight: 600 }}>
                    Poor sleep
                  </span>
                  <span className="text-xs" style={{ fontFamily: 'Inter, sans-serif', color: '#9CA3AF' }}>
                    Apr 17, 10:20
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Community Leaderboard - Anonymous */}
          <div
            className="p-4 rounded-3xl mb-3"
            style={{
              background: 'white',
              border: '2px solid #E5E7EB'
            }}
          >
            <h3
              className="text-sm mb-3"
              style={{
                fontFamily: 'Lora, serif',
                fontWeight: 500,
                color: '#15113C'
              }}
            >
              Community Insights
            </h3>

            {/* My Position Card */}
            <div
              className="p-3 rounded-2xl mb-3"
              style={{
                background: 'linear-gradient(135deg, #EDE9FE 0%, #E0E7FF 100%)',
                border: '2px solid #C4B5FD'
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p
                    className="text-xs mb-0.5"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      color: '#6B7280'
                    }}
                  >
                    Your Position
                  </p>
                  <p
                    className="text-2xl"
                    style={{
                      fontFamily: 'Lora, serif',
                      fontWeight: 600,
                      color: '#15113C'
                    }}
                  >
                    #{myRank.toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p
                    className="text-xs mb-0.5"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      color: '#6B7280'
                    }}
                  >
                    Top
                  </p>
                  <p
                    className="text-2xl"
                    style={{
                      fontFamily: 'Lora, serif',
                      fontWeight: 600,
                      color: '#8B5CF6'
                    }}
                  >
                    {percentile}%
                  </p>
                </div>
              </div>
              <p
                className="text-xs text-center"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  color: '#9CA3AF'
                }}
              >
                Out of {totalUsers.toLocaleString()} active users
              </p>
            </div>

            {/* Weekly Community Trends */}
            <div className="mb-3">
              <p 
                className="text-sm mb-3"
                style={{ 
                  fontFamily: 'Inter, sans-serif',
                  color: '#6B7280',
                  fontWeight: 500
                }}
              >
                This Week's Trends
              </p>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ background: '#10B981' }} />
                    <span 
                      className="text-sm"
                      style={{ 
                        fontFamily: 'Inter, sans-serif',
                        color: '#15113C'
                      }}
                    >
                      Improved ZOW
                    </span>
                  </div>
                  <span 
                    className="text-sm"
                    style={{ 
                      fontFamily: 'Inter, sans-serif',
                      color: '#10B981',
                      fontWeight: 600
                    }}
                  >
                    {weeklyTrends.improved}%
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ background: '#FBBF24' }} />
                    <span 
                      className="text-sm"
                      style={{ 
                        fontFamily: 'Inter, sans-serif',
                        color: '#15113C'
                      }}
                    >
                      Stayed Same
                    </span>
                  </div>
                  <span 
                    className="text-sm"
                    style={{ 
                      fontFamily: 'Inter, sans-serif',
                      color: '#FBBF24',
                      fontWeight: 600
                    }}
                  >
                    {weeklyTrends.stayed}%
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ background: '#F87171' }} />
                    <span 
                      className="text-sm"
                      style={{ 
                        fontFamily: 'Inter, sans-serif',
                        color: '#15113C'
                      }}
                    >
                      Declined
                    </span>
                  </div>
                  <span 
                    className="text-sm"
                    style={{ 
                      fontFamily: 'Inter, sans-serif',
                      color: '#F87171',
                      fontWeight: 600
                    }}
                  >
                    {weeklyTrends.declined}%
                  </span>
                </div>
              </div>
            </div>

            {/* ZOW Distribution */}
            <div>
              <p 
                className="text-sm mb-3"
                style={{ 
                  fontFamily: 'Inter, sans-serif',
                  color: '#6B7280',
                  fontWeight: 500
                }}
              >
                Current Distribution
              </p>

              <div className="space-y-3">
                {zowDistribution.map((item) => (
                  <div key={item.level}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-6 h-6 rounded-full flex items-center justify-center"
                          style={{ background: item.color }}
                        >
                          <span 
                            className="text-xs"
                            style={{ 
                              fontFamily: 'Inter, sans-serif',
                              fontWeight: 700,
                              color: 'white'
                            }}
                          >
                            {item.level}
                          </span>
                        </div>
                        <span 
                          className="text-sm"
                          style={{ 
                            fontFamily: 'Inter, sans-serif',
                            color: '#15113C'
                          }}
                        >
                          {item.label}
                        </span>
                      </div>
                      <span 
                        className="text-sm"
                        style={{ 
                          fontFamily: 'Inter, sans-serif',
                          color: '#6B7280',
                          fontWeight: 600
                        }}
                      >
                        {item.percentage}%
                      </span>
                    </div>
                    <div 
                      className="h-2 rounded-full"
                      style={{ background: '#F3F4F6' }}
                    >
                      <div 
                        className="h-full rounded-full transition-all"
                        style={{ 
                          width: `${item.percentage}%`,
                          background: item.color
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p 
              className="text-xs mt-4 text-center"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                color: '#9CA3AF',
                fontStyle: 'italic'
              }}
            >
              All data is anonymized to protect privacy
            </p>
          </div>
        </div>
      </div>

      {/* Sticky Continue Button */}
      <div
        className="flex-shrink-0 px-4 py-3"
        style={{
          background: 'linear-gradient(180deg, rgba(250, 245, 255, 0.8) 0%, rgba(250, 245, 255, 1) 100%)',
          borderTop: '1px solid rgba(229, 231, 235, 0.3)'
        }}
      >
        <div className="max-w-2xl mx-auto">
          <button
            onClick={onContinue}
            className="w-full py-3 rounded-full"
            style={{
              background: 'linear-gradient(135deg, #A78BFA 0%, #8B5CF6 100%)',
              color: 'white',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: '15px'
            }}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

function getZOWColor(level: number): string {
  switch(level) {
    case 5: return '#10B981';
    case 4: return '#34D399';
    case 3: return '#FBBF24';
    case 2: return '#FB923C';
    case 1: return '#F87171';
    default: return '#E5E7EB';
  }
}

function getZOWLabel(level: number): string {
  switch(level) {
    case 5: return 'Excellent';
    case 4: return 'Good';
    case 3: return 'Moderate';
    case 2: return 'Low';
    case 1: return 'Very Low';
    default: return 'Unknown';
  }
}