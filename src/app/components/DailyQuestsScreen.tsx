import { Wind, BookHeart, Eye, ArrowRight } from "lucide-react";

export function DailyQuestsScreen() {
  const streakDays = [
    { completed: true },
    { completed: true },
    { completed: true },
    { completed: true },
    { completed: true },
    { completed: true },
    { completed: false }
  ];

  const achievements = [
    { name: "First Breath", unlocked: true },
    { name: "7-day Streak", unlocked: true },
    { name: "Soul Seeker", unlocked: false },
    { name: "Stage 3", unlocked: false }
  ];

  const drivers = [
    { code: "CD1", name: "Epic Meaning", score: 85, color: "#F59E0B" },
    { code: "CD2", name: "Accomplishment", score: 72, color: "#EF4444" },
    { code: "CD3", name: "Creativity", score: 60, color: "#8B5CF6" },
    { code: "CD5", name: "Social Influence", score: 56, color: "#10B981" },
    { code: "CD7", name: "Unpredictability", score: 48, color: "#06B6D4" },
    { code: "CD8", name: "Loss & Avoidance", score: 65, color: "#EC4899" }
  ];

  return (
    <div 
      className="min-h-screen pb-24"
      style={{ 
        background: 'linear-gradient(180deg, #FAF9F7 0%, #FFFFFF 100%)',
        padding: '16px'
      }}
    >
      {/* Header */}
      <div className="pt-8 pb-6 px-2">
        <p 
          className="text-xs mb-2"
          style={{ 
            fontFamily: 'Inter, sans-serif',
            color: '#A1A1AA',
            letterSpacing: '0.05em'
          }}
        >
          YOUR WELLBEING GAME
        </p>
        <h1 
          className="text-3xl mb-3"
          style={{ 
            fontFamily: 'Lora, serif',
            fontWeight: 500,
            color: '#15113C'
          }}
        >
          Daily Quests
        </h1>

        {/* XP Progress */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: '#FBBF24' }}
            >
              <span 
                className="text-xs"
                style={{ 
                  fontFamily: 'Inter, sans-serif',
                  color: '#15113C',
                  fontWeight: 700
                }}
              >
                W
              </span>
            </div>
            <span 
              className="text-xs"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                color: '#A1A1AA',
                letterSpacing: '0.05em'
              }}
            >
              WELLBEING XP
            </span>
          </div>
          <span 
            className="text-sm"
            style={{ 
              fontFamily: 'Inter, sans-serif',
              color: '#15113C',
              fontWeight: 600
            }}
          >
            340/500
          </span>
        </div>

        {/* Progress Bar */}
        <div 
          className="h-3 rounded-full mb-6"
          style={{ background: 'rgba(251, 191, 36, 0.2)' }}
        >
          <div 
            className="h-full rounded-full"
            style={{ 
              width: '68%',
              background: '#FBBF24'
            }}
          />
        </div>

        {/* Today's XP */}
        <div className="text-right">
          <p 
            className="text-xs mb-1"
            style={{ 
              fontFamily: 'Inter, sans-serif',
              color: '#A1A1AA'
            }}
          >
            TODAY'S XP
          </p>
          <p 
            className="text-2xl"
            style={{ 
              fontFamily: 'Lora, serif',
              fontWeight: 500,
              color: '#FBBF24'
            }}
          >
            +65 <span style={{ color: '#71717A', fontSize: '16px' }}>/150</span>
          </p>
        </div>
      </div>

      {/* Triggered Alert */}
      <div 
        className="p-4 rounded-3xl mb-4"
        style={{
          background: 'rgba(251, 191, 36, 0.1)',
          border: '2px solid #FBBF24'
        }}
      >
        <p 
          className="text-xs mb-2 flex items-center gap-2"
          style={{ 
            fontFamily: 'Inter, sans-serif',
            color: '#EF4444',
            fontWeight: 600,
            letterSpacing: '0.05em'
          }}
        >
          <div className="w-2 h-2 rounded-full" style={{ background: '#EF4444' }} />
          TRIGGERED · HIGH ANXIETY DETECTED
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{ background: '#10B981' }}
            >
              <Wind className="w-6 h-6" style={{ color: 'white' }} />
            </div>
            <div>
              <p 
                className="text-sm mb-1"
                style={{ 
                  fontFamily: 'Inter, sans-serif',
                  color: '#15113C',
                  fontWeight: 600
                }}
              >
                Breath Reset
              </p>
              <p 
                className="text-xs"
                style={{ 
                  fontFamily: 'Inter, sans-serif',
                  color: '#6B7280'
                }}
              >
                4-7-8 technique · 4 min · +20 XP
              </p>
            </div>
          </div>

          <button 
            className="px-4 py-2 rounded-full text-sm"
            style={{
              background: '#06B6D4',
              color: 'white',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600
            }}
          >
            Start
          </button>
        </div>
      </div>

      {/* Active Quests */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3 px-2">
          <p 
            className="text-xs"
            style={{ 
              fontFamily: 'Inter, sans-serif',
              color: '#9CA3AF',
              letterSpacing: '0.05em'
            }}
          >
            ACTIVE QUESTS
          </p>
          <button 
            className="text-xs flex items-center gap-1"
            style={{ 
              fontFamily: 'Inter, sans-serif',
              color: '#6366F1',
              fontWeight: 500
            }}
          >
            All <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="space-y-3">
          {[
            { name: "Morning Anchor", desc: "Start day from your values", xp: 30, progress: "2/3", icon: BookHeart, color: "#F59E0B" },
            { name: "Inner Observer", desc: "Disidentification · 7 min", xp: 45, progress: "0/5", icon: Eye, color: "#8B5CF6" }
          ].map((quest) => (
            <div
              key={quest.name}
              className="p-4 rounded-3xl flex items-center justify-between"
              style={{
                background: 'white',
                border: '2px solid #F3F4F6'
              }}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{ background: `${quest.color}15` }}
                >
                  <quest.icon className="w-6 h-6" style={{ color: quest.color }} />
                </div>
                <div>
                  <p 
                    className="text-sm mb-1"
                    style={{ 
                      fontFamily: 'Inter, sans-serif',
                      color: '#15113C',
                      fontWeight: 600
                    }}
                  >
                    {quest.name}
                  </p>
                  <p 
                    className="text-xs"
                    style={{ 
                      fontFamily: 'Inter, sans-serif',
                      color: '#6B7280'
                    }}
                  >
                    {quest.desc}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p 
                  className="text-xs mb-1"
                  style={{ 
                    fontFamily: 'Inter, sans-serif',
                    color: '#FBBF24',
                    fontWeight: 600
                  }}
                >
                  +{quest.xp}
                </p>
                <p 
                  className="text-xs"
                  style={{ 
                    fontFamily: 'Inter, sans-serif',
                    color: '#9CA3AF'
                  }}
                >
                  {quest.progress}
                </p>
              </div>
            </div>
          ))}

          {/* Locked Quest */}
          <div 
            className="p-4 rounded-3xl text-center"
            style={{
              background: '#FAFAFA',
              border: '2px dashed #E5E7EB'
            }}
          >
            <div 
              className="w-10 h-10 rounded-xl mx-auto mb-2"
              style={{ background: '#F3F4F6' }}
            />
            <p 
              className="text-xs"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                color: '#9CA3AF',
                fontWeight: 500
              }}
            >
              2 more quests today
            </p>
            <p 
              className="text-xs mt-1"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                color: '#9CA3AF'
              }}
            >
              Unlock Will Journal at 12pm · +65 XP
            </p>
          </div>
        </div>
      </div>

      {/* Consistency Streak */}
      <div 
        className="p-5 rounded-3xl mb-4"
        style={{
          background: 'linear-gradient(135deg, #FED7AA 0%, #FDBA74 100%)',
          border: '2px solid #FB923C'
        }}
      >
        <p 
          className="text-xs mb-4"
          style={{ 
            fontFamily: 'Inter, sans-serif',
            color: '#92400E',
            letterSpacing: '0.05em',
            fontWeight: 500
          }}
        >
          CONSISTENCY STREAK
        </p>

        <div className="flex items-center justify-between">
          <p 
            className="text-2xl"
            style={{ 
              fontFamily: 'Lora, serif',
              fontWeight: 600,
              color: '#15113C'
            }}
          >
            14 days <span className="text-base" style={{ color: '#EF4444' }}>🔥</span>
          </p>

          <p 
            className="text-xs px-3 py-1.5 rounded-full"
            style={{ 
              fontFamily: 'Inter, sans-serif',
              color: '#EF4444',
              background: 'rgba(254, 226, 226, 0.9)',
              fontWeight: 600
            }}
          >
            Don't break it!
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 mt-4">
          {streakDays.map((day, i) => (
            <div
              key={i}
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: day.completed ? '#FBBF24' : 'rgba(255,255,255,0.4)',
                border: day.completed ? 'none' : '2px solid rgba(251, 191, 36, 0.3)'
              }}
            >
              {day.completed && (
                <span 
                  className="text-xs"
                  style={{ 
                    fontFamily: 'Inter, sans-serif',
                    color: '#15113C',
                    fontWeight: 700
                  }}
                >
                  ✓
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="mb-4">
        <p 
          className="text-xs mb-3 px-2"
          style={{ 
            fontFamily: 'Inter, sans-serif',
            color: '#9CA3AF',
            letterSpacing: '0.05em'
          }}
        >
          ACHIEVEMENTS
        </p>

        <div className="grid grid-cols-2 gap-3">
          {achievements.map((achievement) => (
            <div
              key={achievement.name}
              className="p-4 rounded-2xl flex items-center gap-2"
              style={{
                background: achievement.unlocked ? 'white' : '#FAFAFA',
                border: `2px solid ${achievement.unlocked ? '#FBBF24' : '#E5E7EB'}`
              }}
            >
              <div 
                className="w-5 h-5 rounded flex items-center justify-center"
                style={{ border: `2px solid ${achievement.unlocked ? '#FBBF24' : '#E5E7EB'}` }}
              >
                {achievement.unlocked && (
                  <div className="w-2 h-2 rounded-sm" style={{ background: '#FBBF24' }} />
                )}
              </div>
              <p 
                className="text-sm flex-1"
                style={{ 
                  fontFamily: 'Inter, sans-serif',
                  color: achievement.unlocked ? '#15113C' : '#9CA3AF',
                  fontWeight: 600
                }}
              >
                {achievement.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Octalysis Core Drivers */}
      <div 
        className="p-5 rounded-3xl"
        style={{
          background: 'white',
          border: '2px solid #F3F4F6'
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
          OCTALYSIS CORE DRIVERS
        </p>

        <div className="grid grid-cols-2 gap-3">
          {drivers.map((driver) => (
            <div
              key={driver.code}
              className="p-3 rounded-2xl"
              style={{
                background: '#FAFAFA',
                border: '2px solid #F3F4F6'
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ border: '2px solid #E5E7EB' }} />
                  <span 
                    className="text-xs"
                    style={{ 
                      fontFamily: 'Inter, sans-serif',
                      color: '#9CA3AF',
                      fontWeight: 600
                    }}
                  >
                    {driver.code}
                  </span>
                </div>
                <span 
                  className="text-sm"
                  style={{ 
                    fontFamily: 'Inter, sans-serif',
                    color: driver.color,
                    fontWeight: 600
                  }}
                >
                  {driver.score}
                </span>
              </div>

              <p 
                className="text-xs mb-2"
                style={{ 
                  fontFamily: 'Inter, sans-serif',
                  color: '#6B7280'
                }}
              >
                {driver.name}
              </p>

              {/* Progress Bar */}
              <div 
                className="h-1.5 rounded-full"
                style={{ background: '#F3F4F6' }}
              >
                <div 
                  className="h-full rounded-full"
                  style={{ 
                    width: `${driver.score}%`,
                    background: driver.color
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