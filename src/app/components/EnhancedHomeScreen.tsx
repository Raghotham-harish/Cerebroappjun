import { Wind, BookOpen, Heart, CheckSquare, Calendar, BookHeart, ArrowRight, Flame, Zap, MessageCircle, Frown, Smile, CloudRain, Sparkles, Users, Shield, TrendingUp, AlertCircle } from "lucide-react";
import { AnimatedLogo } from "./AnimatedLogo";

interface EnhancedHomeScreenProps {
  userName: string;
  oracleName: string;
}

export function EnhancedHomeScreen({ userName, oracleName }: EnhancedHomeScreenProps) {
  const practices = [
    { name: "Breathe", time: "5 min", gradient: "linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%)", icon: Wind },
    { name: "Reflect", time: "10 min", gradient: "linear-gradient(135deg, #EDE9FE 0%, #DDD6FE 100%)", icon: BookOpen },
    { name: "Journal", time: "Timed", gradient: "linear-gradient(135deg, #FECACA 0%, #FCA5A5 100%)", icon: BookHeart },
    { name: "Well-check", time: "1 min", gradient: "linear-gradient(135deg, #FED7AA 0%, #FDBA74 100%)", icon: CheckSquare },
    { name: "Body-scan", time: "12 min", gradient: "linear-gradient(135deg, #A7F3D0 0%, #6EE7B7 100%)", icon: Heart },
    { name: "Gratitude", time: "5-10 min", gradient: "linear-gradient(135deg, #FBCFE8 0%, #F9A8D4 100%)", icon: Calendar }
  ];

  const microActivities = [
    { name: "Morning Anchor", desc: "Daily · Values", xp: "+30 XP", gradient: "linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)", icon: Sparkles },
    { name: "Breath Reset", desc: "4 min · Triggered", xp: "+40 XP", gradient: "linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%)", icon: Wind },
    { name: "Inner Observer", desc: "7 min · Awareness", xp: "+45 XP", gradient: "linear-gradient(135deg, #EDE9FE 0%, #DDD6FE 100%)", icon: Users }
  ];

  const moodIcons = [Frown, Smile, CloudRain, Heart, Sparkles]; // Icons for ANXIOUS, CALM, SAD, SETTLED, OPEN

  return (
    <div 
      className="min-h-screen pb-32"
      style={{ 
        background: 'linear-gradient(180deg, #FAF9F7 0%, #FFFFFF 100%)',
        padding: '16px',
        paddingBottom: '128px'
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between pt-8 pb-6 px-2">
        <div className="flex items-center gap-3">
          <AnimatedLogo size={40} animate={false} />
          <div>
            <p 
              className="text-xs mb-0.5"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                color: '#9CA3AF'
              }}
            >
              {oracleName} · MARCH 8
            </p>
            <h1 
              className="text-2xl"
              style={{ 
                fontFamily: 'Lora, serif',
                fontWeight: 500,
                color: '#15113C',
                lineHeight: 1.3
              }}
            >
              Good morning,<br />{userName}
            </h1>
          </div>
        </div>
      </div>

      {/* Streak + XP */}
      <div className="px-2 pb-6">
        <div className="flex items-center gap-2 mb-3">
          <div 
            className="w-5 h-5 flex items-center justify-center"
            style={{ color: '#F59E0B' }}
          >
            <Flame className="w-5 h-5" />
          </div>
          <span 
            className="text-sm"
            style={{ 
              fontFamily: 'Inter, sans-serif',
              color: '#71717A' // Improved from #A1A1AA for better contrast
            }}
          >
            14-day streak
          </span>
        </div>

        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div 
              className="w-6 h-6 rounded-full flex items-center justify-center"
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
                color: '#71717A', // Improved from #A1A1AA for better contrast
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
              color: '#15113C', // Changed from white for visibility
              fontWeight: 600
            }}
          >
            340/500
          </span>
        </div>

        <div 
          className="h-2.5 rounded-full"
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
      </div>

      {/* CereBro Notice */}
      <div 
        className="p-4 rounded-3xl mb-4"
        style={{
          background: 'rgba(251, 223, 199, 0.95)',
          border: '2px solid #F4D1C7'
        }}
      >
        <div className="flex items-start gap-3">
          <div 
            className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ background: '#F4A261' }}
          >
            <Heart className="w-5 h-5" style={{ color: 'white' }} />
          </div>
          <div className="flex-1">
            <p 
              className="text-sm mb-2"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                color: '#15113C',
                fontWeight: 600,
                lineHeight: 1.4
              }}
            >
              CereBro has noticed something
            </p>
            <p 
              className="text-xs mb-3"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                color: '#6B7280',
                lineHeight: 1.5
              }}
            >
              Anxiety elevated for 5 days. A grounding session is ready, or connect with a synthesis coach
            </p>
            <div className="flex items-center gap-2">
              <button 
                className="px-4 py-2 rounded-full text-xs flex-1 flex items-center justify-center gap-1.5"
                style={{
                  background: '#F59E0B',
                  color: 'white',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600
                }}
              >
                <Wind className="w-3.5 h-3.5" />
                Breathe Now
              </button>
              <button 
                className="px-4 py-2 rounded-full text-xs flex-1 flex items-center justify-center gap-1.5"
                style={{
                  background: 'white',
                  border: '2px solid #F4D1C7',
                  color: '#F59E0B',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600
                }}
              >
                <MessageCircle className="w-3.5 h-3.5" />
                Synthesis Coach
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* How Are You Right Now */}
      <div 
        className="p-5 rounded-3xl mb-4"
        style={{
          background: 'white',
          border: '2px solid #F3F4F6'
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
            HOW ARE YOU RIGHT NOW?
          </p>
          <button 
            className="text-xs flex items-center gap-1"
            style={{ 
              fontFamily: 'Inter, sans-serif',
              color: '#6366F1',
              fontWeight: 500
            }}
          >
            History <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <p 
          className="text-sm mb-4 italic"
          style={{ 
            fontFamily: 'Lora, serif',
            color: '#6B7280'
          }}
        >
          What's alive in you right now?
        </p>

        <div className="grid grid-cols-5 gap-2">
          {["ANXIOUS", "CALM", "SAD", "SETTLED", "OPEN"].map((mood, i) => {
            const MoodIcon = moodIcons[i];
            return (
              <button
                key={mood}
                className="p-3 rounded-2xl flex flex-col items-center"
                style={{
                  background: i === 3 ? '#EDE9FE' : '#FAFAFA',
                  border: i === 3 ? '2px solid #8B5CF6' : '2px solid #F3F4F6'
                }}
              >
                <div 
                  className="w-8 h-8 rounded-xl mb-2 flex items-center justify-center"
                  style={{ background: i === 3 ? '#8B5CF6' : '#E5E7EB' }}
                >
                  <MoodIcon 
                    className="w-4 h-4" 
                    style={{ color: i === 3 ? 'white' : '#71717A' }} 
                  />
                </div>
                <span 
                  className="text-xs text-center"
                  style={{ 
                    fontFamily: 'Inter, sans-serif',
                    color: i === 3 ? '#8B5CF6' : '#71717A', // Changed from #9CA3AF for better contrast
                    fontWeight: 600,
                    fontSize: '9px'
                  }}
                >
                  {mood}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Emotion Trends */}
      <div 
        className="p-5 rounded-3xl mb-4"
        style={{
          background: 'white',
          border: '2px solid #F3F4F6'
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
            EMOTION TRENDS · 7D
          </p>
          <button 
            className="text-xs"
            style={{ 
              fontFamily: 'Inter, sans-serif',
              color: '#6366F1',
              fontWeight: 500
            }}
          >
            Full report →
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            { name: "Anxiety", change: "↓23%", color: "#F59E0B", positive: true, icon: AlertCircle },
            { name: "Calm", change: "↑18%", color: "#06B6D4", positive: true, icon: Smile },
            { name: "Energy", change: "↑22%", color: "#FBBF24", positive: true, icon: Zap },
            { name: "Resilience", change: "↑19%", color: "#10B981", positive: true, icon: Shield }
          ].map((emotion) => (
            <div
              key={emotion.name}
              className="p-3 rounded-2xl"
              style={{
                background: '#FAFAFA',
                border: '2px solid #F3F4F6'
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-6 h-6 rounded-lg flex items-center justify-center" 
                    style={{ background: emotion.color }}
                  >
                    <emotion.icon className="w-3.5 h-3.5" style={{ color: 'white', strokeWidth: 2.5 }} />
                  </div>
                  <span 
                    className="text-sm"
                    style={{ 
                      fontFamily: 'Inter, sans-serif',
                      color: '#15113C',
                      fontWeight: 600
                    }}
                  >
                    {emotion.name}
                  </span>
                </div>
                <span 
                  className="text-xs"
                  style={{ 
                    fontFamily: 'Inter, sans-serif',
                    color: emotion.positive ? '#10B981' : '#EF4444',
                    fontWeight: 600
                  }}
                >
                  {emotion.change}
                </span>
              </div>
              
              {/* Mini trend line */}
              <div className="h-8">
                <svg width="100%" height="32" className="w-full">
                  <polyline
                    points={emotion.positive ? "0,28 25,24 50,20 75,16 100,12" : "0,12 25,16 50,20 75,24 100,28"}
                    fill="none"
                    stroke={emotion.color}
                    strokeWidth="2"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Today's Practices */}
      <div className="mb-4">
        <p 
          className="text-xs mb-3 px-2"
          style={{ 
            fontFamily: 'Inter, sans-serif',
            color: '#71717A', // Changed from #9CA3AF for better visibility
            letterSpacing: '0.05em',
            fontWeight: 600
          }}
        >
          TODAY'S PRACTICES
        </p>

        <div className="grid grid-cols-3 gap-3">
          {practices.map((practice) => (
            <button
              key={practice.name}
              className="p-4 rounded-3xl flex flex-col items-start"
              style={{
                background: practice.gradient,
                border: 'none',
                minHeight: '100px'
              }}
            >
              <div 
                className="w-8 h-8 rounded-xl mb-auto flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.5)' }}
              >
                <practice.icon className="w-4 h-4" style={{ color: '#15113C', strokeWidth: 2.5 }} />
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
                  {practice.name}
                </p>
                <p 
                  className="text-xs"
                  style={{ 
                    fontFamily: 'Inter, sans-serif',
                    color: '#6B7280'
                  }}
                >
                  {practice.time}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Triggered Micro Activities */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3 px-2">
          <p 
            className="text-xs"
            style={{ 
              fontFamily: 'Inter, sans-serif',
              color: '#71717A', // Changed from #9CA3AF for better visibility
              letterSpacing: '0.05em',
              fontWeight: 600
            }}
          >
            TRIGGERED MICRO ACTIVITIES
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

        <div className="grid grid-cols-3 gap-3">
          {microActivities.map((activity) => (
            <div
              key={activity.name}
              className="p-4 rounded-3xl"
              style={{
                background: activity.gradient,
                border: 'none'
              }}
            >
              <div 
                className="w-8 h-8 rounded-xl mb-3 flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.5)' }}
              >
                <activity.icon className="w-4 h-4" style={{ color: '#15113C', strokeWidth: 2.5 }} />
              </div>
              <p 
                className="text-sm mb-1"
                style={{ 
                  fontFamily: 'Inter, sans-serif',
                  color: '#15113C',
                  fontWeight: 600
                }}
              >
                {activity.name}
              </p>
              <p 
                className="text-xs mb-2"
                style={{ 
                  fontFamily: 'Inter, sans-serif',
                  color: '#6B7280'
                }}
              >
                {activity.desc}
              </p>
              <p 
                className="text-xs"
                style={{ 
                  fontFamily: 'Inter, sans-serif',
                  color: '#15113C',
                  fontWeight: 600
                }}
              >
                {activity.xp}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Act of Will */}
      <div 
        className="p-5 rounded-3xl"
        style={{
          background: 'white',
          border: '2px solid #F3F4F6'
        }}
      >
        <div className="flex items-center justify-between mb-3">
          <p 
            className="text-xs"
            style={{ 
              fontFamily: 'Inter, sans-serif',
              color: '#9CA3AF',
              letterSpacing: '0.05em'
            }}
          >
            ACT OF WILL · STAGE 3
          </p>
          <button 
            className="text-xs"
            style={{ 
              fontFamily: 'Inter, sans-serif',
              color: '#6366F1',
              fontWeight: 500
            }}
          >
            See all →
          </button>
        </div>

        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 
              className="text-lg mb-2"
              style={{ 
                fontFamily: 'Lora, serif',
                fontWeight: 500,
                color: '#15113C'
              }}
            >
              Choice & Decision
            </h3>
            <p 
              className="text-sm mb-3"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                color: '#6B7280',
                lineHeight: 1.5
              }}
            >
              Exploring your power to choose
            </p>
            <div className="flex flex-wrap gap-2">
              {["Purpose", "Deliberate", "Choice", "Will", "Decide"].map((tag, i) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs"
                  style={{
                    background: i < 2 ? '#EDE9FE' : '#F3F4F6',
                    color: i < 2 ? '#8B5CF6' : '#9CA3AF',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 500
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <span 
            className="px-3 py-1.5 rounded-full text-xs ml-3"
            style={{
              background: '#DBEAFE',
              color: '#3B82F6',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600
            }}
          >
            IN PROGRESS
          </span>
        </div>
      </div>
    </div>
  );
}