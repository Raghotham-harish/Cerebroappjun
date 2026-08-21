import { ArrowRight, Plus, TrendingUp, Heart, Target, User, AlertCircle, Smile, Zap, Shield, Activity, Bell } from "lucide-react";

interface InsightsScreenProps {
  onViewBurnoutAnalytics?: () => void;
  onOpenNotifications?: () => void;
  notifUnreadCount?: number;
}

function BellButton({ count = 0, onClick }: { count?: number; onClick?: () => void }) {
  return (
    <div className="relative">
      <button
        onClick={onClick}
        className="w-11 h-11 rounded-2xl flex items-center justify-center transition-all active:scale-90"
        style={{ background: "rgba(255,255,255,0.85)", border: "1.5px solid rgba(139,92,246,0.18)" }}
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5" style={{ color: "#15113C", strokeWidth: 1.75 }} />
      </button>
      {count > 0 && (
        <div
          className="absolute -top-1 -right-1 flex items-center justify-center rounded-full"
          style={{ minWidth: 17, height: 17, background: "#8B5CF6", fontFamily: "Inter", fontWeight: 700, fontSize: "9px", color: "white", paddingLeft: 3, paddingRight: 3 }}
        >
          {count}
        </div>
      )}
    </div>
  );
}

export function InsightsScreen({ onViewBurnoutAnalytics, onOpenNotifications, notifUnreadCount = 0 }: InsightsScreenProps = {}) {
  const emotionData = [
    { day: 'M', anxiety: 20, guilt: 15, joy: 30, calm: 35 },
    { day: 'T', anxiety: 25, guilt: 10, joy: 25, calm: 40 },
    { day: 'W', anxiety: 15, guilt: 20, joy: 35, calm: 30 },
    { day: 'Th', anxiety: 30, guilt: 15, joy: 20, calm: 35 },
    { day: 'F', anxiety: 20, guilt: 25, joy: 25, calm: 30 },
    { day: 'S', anxiety: 25, guilt: 10, joy: 40, calm: 25 },
    { day: 'Su', anxiety: 15, guilt: 15, joy: 30, calm: 40 }
  ];

  const healingStages = [
    { name: "Coping", description: "Self-care & safety", status: "complete", color: "#10B981" },
    { name: "Recognition", description: "Awakening & awareness", status: "complete", color: "#10B981" },
    { name: "Acceptance", description: "Releasing patterns", status: "current", color: "#8B5CF6" },
    { name: "Transformation", description: "Parts integration", status: "locked", color: "#E5E7EB" },
    { name: "Integration", description: "Embodying new patterns", status: "locked", color: "#E5E7EB" }
  ];

  const subpersonalities = [
    { name: "Inner Critic", color: "#EF4444", progress: 65 },
    { name: "Warrior", color: "#F59E0B", progress: 45 },
    { name: "Nurturer", color: "#10B981", progress: 80 },
    { name: "Visionary", color: "#8B5CF6", progress: 55 }
  ];

  const goals = [
    { name: "Manage workplace anxiety", description: "Track + Reframe", progress: 62, color: "#8B5CF6" },
    { name: "Rebuild morning routine", description: "Habit + Anchor", progress: 40, color: "#8B5CF6" }
  ];

  return (
    <div 
      className="min-h-screen pb-32"
      style={{ 
        background: 'linear-gradient(180deg, #EDE9FE 0%, #F5F3FF 100%)',
        padding: '16px',
        paddingBottom: '128px'
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between pt-8 pb-6 px-2">
        <div>
          <h1
            className="text-3xl mb-1"
            style={{ fontFamily: 'Lora, serif', fontWeight: 500, color: '#15113C' }}
          >
            Insights
          </h1>
          <p
            className="text-sm"
            style={{ fontFamily: 'Inter, sans-serif', color: '#9CA3AF' }}
          >
            March · Personal · Private
          </p>
        </div>
        <BellButton count={notifUnreadCount} onClick={onOpenNotifications} />
      </div>

      {/* Zone of Wellbeing */}
      <div className="mb-4">
        {/* Header Card */}
        <div 
          className="p-6 rounded-3xl mb-3 text-center"
          style={{ 
            background: 'linear-gradient(135deg, #EDE9FE 0%, #E0E7FF 100%)',
            border: '2px solid #C4B5FD'
          }}
        >
          <p 
            className="text-xs mb-1"
            style={{ 
              fontFamily: 'Inter, sans-serif',
              color: '#8B5CF6',
              letterSpacing: '0.05em',
              fontWeight: 600
            }}
          >
            ZONE OF EMOTIONAL REGULATION (ZER)
          </p>
          <p 
            className="text-sm mb-3"
            style={{ 
              fontFamily: 'Inter, sans-serif',
              color: '#6B7280'
            }}
          >
            Today
          </p>
          <div 
            className="w-20 h-20 rounded-full mx-auto mb-3 flex items-center justify-center"
            style={{ background: '#FBBF24' }}
          >
            <span 
              className="text-4xl"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                fontWeight: 700,
                color: 'white'
              }}
            >
              3
            </span>
          </div>
          <p 
            className="text-lg"
            style={{ 
              fontFamily: 'Lora, serif',
              fontWeight: 500,
              color: '#15113C'
            }}
          >
            Moderate
          </p>
        </div>

        {/* Graph Card */}
        <div 
          className="p-5 rounded-3xl"
          style={{
            background: 'rgba(255,255,255,0.88)',
            border: '1.5px solid rgba(139,92,246,0.10)'
          }}
        >
          {/* Bar Graph */}
          <div className="flex items-end justify-between gap-2 h-32 mb-4">
            {[4, 3, 4, 5, 3, 4, 3].map((value, i) => (
              <div key={i} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full rounded-lg transition-all"
                  style={{ 
                    background: value === 5 ? '#10B981' : 
                               value === 4 ? '#34D399' : 
                               value === 3 ? '#FBBF24' : 
                               value === 2 ? '#FB923C' : '#F87171',
                    height: `${(value / 5) * 128}px`,
                    minHeight: '26px'
                  }}
                />
              </div>
            ))}
          </div>
          
          {/* Date Labels */}
          <div className="flex items-center justify-between mb-6">
            {['16', '15', '14', '13', '12', '11', '10'].map((date, i) => (
              <div key={i} className="flex-1 text-center">
                <span 
                  className="text-xs"
                  style={{ 
                    fontFamily: 'Inter, sans-serif',
                    color: '#9CA3AF'
                  }}
                >
                  {date}
                </span>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t mb-4" style={{ borderColor: '#E5E7EB' }} />

          {/* Average */}
          <div className="text-center">
            <p 
              className="text-sm mb-2"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                color: '#9CA3AF'
              }}
            >
              7-Day Average
            </p>
            <p 
              className="text-3xl"
              style={{ 
                fontFamily: 'Lora, serif',
                fontWeight: 600,
                color: '#15113C'
              }}
            >
              3.7
            </p>
          </div>
        </div>
      </div>

      {/* Burnout Analytics */}
      <button
        onClick={onViewBurnoutAnalytics}
        className="w-full mb-4 text-left"
      >
        <div
          className="p-5 rounded-3xl"
          style={{
            background: 'linear-gradient(135deg, #EDE9FE 0%, #DDD6FE 100%)',
            border: '1.5px solid rgba(139,92,246,0.25)'
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: '#8B5CF6' }}
              >
                <Activity className="w-5 h-5" style={{ color: 'white' }} />
              </div>
              <div>
                <p
                  className="text-base mb-0.5"
                  style={{
                    fontFamily: 'Lora, serif',
                    fontWeight: 500,
                    color: '#15113C'
                  }}
                >
                  Burnout Analytics
                </p>
                <p
                  className="text-xs"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    color: '#6D28D9'
                  }}
                >
                  Track your burnout risk over time
                </p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5" style={{ color: '#8B5CF6' }} />
          </div>
        </div>
      </button>

      {/* Emotion Analytics */}
      <div
        className="p-5 rounded-3xl mb-4"
        style={{
          background: 'rgba(255,255,255,0.88)',
          border: '1.5px solid rgba(139,92,246,0.10)'
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <p 
            className="text-xs"
            style={{ 
              fontFamily: 'Inter, sans-serif',
              color: '#9CA3AF',
              letterSpacing: '0.05em'
            }}
          >
            EMOTION ANALYTICS · 7D
          </p>
          <button 
            className="text-xs flex items-center gap-1"
            style={{
              fontFamily: 'Inter, sans-serif',
              color: '#7C3AED',
              fontWeight: 500
            }}
          >
            Export <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Stacked Bar Chart */}
        <div className="flex items-end justify-between gap-2 h-32 mb-4">
          {emotionData.map((data, i) => (
            <div key={i} className="flex-1 flex flex-col items-center">
              <div className="w-full flex flex-col gap-0.5">
                <div 
                  className="w-full rounded-t"
                  style={{ 
                    height: `${data.anxiety * 0.8}px`,
                    background: '#F59E0B'
                  }}
                />
                <div 
                  className="w-full"
                  style={{ 
                    height: `${data.guilt * 0.8}px`,
                    background: '#EF4444'
                  }}
                />
                <div 
                  className="w-full"
                  style={{ 
                    height: `${data.joy * 0.8}px`,
                    background: '#FBBF24'
                  }}
                />
                <div 
                  className="w-full rounded-b"
                  style={{ 
                    height: `${data.calm * 0.8}px`,
                    background: '#06B6D4'
                  }}
                />
              </div>
              <p 
                className="text-xs mt-2"
                style={{ 
                  fontFamily: 'Inter, sans-serif',
                  color: '#9CA3AF'
                }}
              >
                {data.day}
              </p>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-4 flex-wrap">
          {[
            { label: 'Anxiety', color: '#F59E0B' },
            { label: 'Guilt', color: '#EF4444' },
            { label: 'Joy', color: '#FBBF24' },
            { label: 'Calm', color: '#06B6D4' }
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <div 
                className="w-2.5 h-2.5 rounded-full"
                style={{ background: item.color }}
              />
              <span 
                className="text-xs"
                style={{ 
                  fontFamily: 'Inter, sans-serif',
                  color: '#6B7280'
                }}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Emotion Trends */}
        <div className="mt-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div 
                className="w-6 h-6 rounded-lg flex items-center justify-center" 
                style={{ background: '#F59E0B' }}
              >
                <AlertCircle className="w-3.5 h-3.5" style={{ color: 'white', strokeWidth: 1.75 }} />
              </div>
              <span 
                className="text-sm"
                style={{ 
                  fontFamily: 'Inter, sans-serif',
                  color: '#15113C',
                  fontWeight: 500
                }}
              >
                Anxiety
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
              ↓23%
            </span>
          </div>
          <div className="h-10 flex items-center">
            {/* Simple trend line */}
            <svg width="100%" height="40" className="w-full">
              <polyline
                points="0,30 20,25 40,28 60,20 80,18 100,15"
                fill="none"
                stroke="#F59E0B"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>

          <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: '#F3F4F6' }}>
            <div className="flex items-center gap-2">
              <div 
                className="w-6 h-6 rounded-lg flex items-center justify-center" 
                style={{ background: '#06B6D4' }}
              >
                <Smile className="w-3.5 h-3.5" style={{ color: 'white', strokeWidth: 1.75 }} />
              </div>
              <span 
                className="text-sm"
                style={{ 
                  fontFamily: 'Inter, sans-serif',
                  color: '#15113C',
                  fontWeight: 500
                }}
              >
                Calm
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
              ↑18%
            </span>
          </div>
          <div className="h-10 flex items-center">
            <svg width="100%" height="40" className="w-full">
              <polyline
                points="0,25 20,23 40,20 60,18 80,15 100,12"
                fill="none"
                stroke="#06B6D4"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Healing Journey */}
      <div 
        className="p-5 rounded-3xl mb-4"
        style={{
          background: 'rgba(255,255,255,0.88)',
          border: '1.5px solid rgba(139,92,246,0.10)'
        }}
      >
        <p 
          className="text-xs mb-4"
          style={{ 
            fontFamily: 'Inter, sans-serif',
            color: '#9CA3AF',
            letterSpacing: '0.05em'
          }}
        >
          HEALING JOURNEY · 7 STAGES
        </p>

        <div className="space-y-3">
          {healingStages.map((stage, i) => (
            <div 
              key={i}
              className="flex items-center justify-between p-3 rounded-2xl"
              style={{
                background: stage.status === 'locked' ? '#FAFAFA' : 'white',
                border: `2px solid ${stage.status === 'current' ? stage.color : '#F3F4F6'}`
              }}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ 
                    background: stage.status === 'locked' ? '#F3F4F6' : stage.color 
                  }}
                >
                  <span 
                    className="text-xs"
                    style={{ 
                      fontFamily: 'Inter, sans-serif',
                      color: 'white',
                      fontWeight: 600
                    }}
                  >
                    {i + 1}
                  </span>
                </div>
                <div>
                  <p 
                    className="text-sm mb-0.5"
                    style={{ 
                      fontFamily: 'Inter, sans-serif',
                      color: stage.status === 'locked' ? '#9CA3AF' : '#15113C',
                      fontWeight: 600
                    }}
                  >
                    {stage.name}
                  </p>
                  <p 
                    className="text-xs"
                    style={{ 
                      fontFamily: 'Inter, sans-serif',
                      color: '#9CA3AF'
                    }}
                  >
                    {stage.description}
                  </p>
                </div>
              </div>

              {stage.status === 'current' && (
                <span 
                  className="px-2 py-1 rounded-full text-xs"
                  style={{
                    background: '#EDE9FE',
                    color: '#7C3AED',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 600
                  }}
                >
                  NOW
                </span>
              )}

              {stage.status === 'complete' && (
                <div className="w-5 h-5 rounded" style={{ border: '2px solid #10B981' }}>
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-2 h-2 rounded-sm" style={{ background: '#10B981' }} />
                  </div>
                </div>
              )}

              {stage.status === 'locked' && (
                <div className="w-5 h-5 rounded" style={{ border: '2px solid #E5E7EB' }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Subpersonality Map */}
      <div 
        className="p-5 rounded-3xl mb-4"
        style={{
          background: 'rgba(255,255,255,0.88)',
          border: '1.5px solid rgba(139,92,246,0.10)'
        }}
      >
        <p 
          className="text-xs mb-4"
          style={{ 
            fontFamily: 'Inter, sans-serif',
            color: '#9CA3AF',
            letterSpacing: '0.05em'
          }}
        >
          SUBPERSONALITY MAP
        </p>

        <div className="grid grid-cols-2 gap-3">
          {subpersonalities.map((sub) => (
            <div
              key={sub.name}
              className="p-4 rounded-2xl"
              style={{
                background: '#FAFAFA',
                border: '2px solid #F3F4F6'
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="relative w-10 h-10">
                  <svg width="40" height="40" className="transform -rotate-90">
                    <circle
                      cx="20"
                      cy="20"
                      r="16"
                      fill="none"
                      stroke="#F3F4F6"
                      strokeWidth="4"
                    />
                    <circle
                      cx="20"
                      cy="20"
                      r="16"
                      fill="none"
                      stroke={sub.color}
                      strokeWidth="4"
                      strokeDasharray={`${(sub.progress / 100) * 100} 100`}
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <p 
                  className="text-sm flex-1"
                  style={{ 
                    fontFamily: 'Inter, sans-serif',
                    color: '#15113C',
                    fontWeight: 600
                  }}
                >
                  {sub.name}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p 
          className="text-xs mt-3 px-1"
          style={{ 
            fontFamily: 'Inter, sans-serif',
            color: '#9CA3AF',
            fontStyle: 'italic'
          }}
        >
          Based on language patterns across 14 sessions
        </p>
      </div>

      {/* Goal Map */}
      <div 
        className="p-5 rounded-3xl mb-4"
        style={{
          background: 'rgba(255,255,255,0.88)',
          border: '1.5px solid rgba(139,92,246,0.10)'
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <p 
            className="text-xs"
            style={{ 
              fontFamily: 'Inter, sans-serif',
              color: '#9CA3AF',
              letterSpacing: '0.05em'
            }}
          >
            GOAL MAP
          </p>
          <button 
            className="text-xs flex items-center gap-1"
            style={{
              fontFamily: 'Inter, sans-serif',
              color: '#7C3AED',
              fontWeight: 500
            }}
          >
            + Add goal
          </button>
        </div>

        <div className="space-y-3">
          {goals.map((goal, index) => (
            <div
              key={goal.name}
              className="p-4 rounded-2xl"
              style={{
                background: '#FAFAFA',
                border: '2px solid #F3F4F6'
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-2 flex-1">
                  <div 
                    className="w-6 h-6 rounded-lg flex items-center justify-center mt-0.5" 
                    style={{ background: goal.color }}
                  >
                    <Target className="w-3.5 h-3.5" style={{ color: 'white', strokeWidth: 1.75 }} />
                  </div>
                  <div className="flex-1">
                    <p 
                      className="text-sm mb-1"
                      style={{ 
                        fontFamily: 'Inter, sans-serif',
                        color: '#15113C',
                        fontWeight: 600
                      }}
                    >
                      {goal.name}
                    </p>
                    <p 
                      className="text-xs"
                      style={{ 
                        fontFamily: 'Inter, sans-serif',
                        color: '#9CA3AF'
                      }}
                    >
                      {goal.description}
                    </p>
                  </div>
                </div>
                <span 
                  className="text-sm ml-2"
                  style={{ 
                    fontFamily: 'Inter, sans-serif',
                    color: goal.color,
                    fontWeight: 600
                  }}
                >
                  {goal.progress}%
                </span>
              </div>

              {/* Progress Bar */}
              <div 
                className="h-2 rounded-full"
                style={{ background: '#F3F4F6' }}
              >
                <div 
                  className="h-full rounded-full"
                  style={{ 
                    width: `${goal.progress}%`,
                    background: goal.color
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}