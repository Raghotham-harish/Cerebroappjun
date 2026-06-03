import { Heart, Wind, Brain, Eye, BookHeart, Target, Calendar, Users, Scan, BarChart3, MessageCircle, Phone, Moon, Plus, Gamepad2 } from "lucide-react";
import { AnimatedLogo } from "./AnimatedLogo";

interface Tool {
  id: string;
  name: string;
  description: string;
  tag: string;
  tagColor: string;
  bgColor: string;
  icon: React.ElementType;
  available: boolean;
}

interface ToolsScreenProps {
  onNavigateToGames?: () => void;
}

export function ToolsScreen({ onNavigateToGames }: ToolsScreenProps = {}) {
  const tools: Tool[] = [
    {
      id: "crisis",
      name: "Crisis support",
      description: "Grounding tools available anytime",
      tag: "",
      tagColor: "",
      bgColor: "#F4D1C7",
      icon: Heart,
      available: true
    },
    {
      id: "breath",
      name: "Breath Loops",
      description: "4-7-8 · Box · Coherence breathing",
      tag: "BODY",
      tagColor: "#3B82F6",
      bgColor: "#E0F2FE",
      icon: Wind,
      available: true
    },
    {
      id: "disidentification",
      name: "Disidentification",
      description: "I have thoughts, I am not thoughts",
      tag: "SELF",
      tagColor: "#8B5CF6",
      bgColor: "#EDE9FE",
      icon: Brain,
      available: true
    },
    {
      id: "imagery",
      name: "Guided Imagery",
      description: "Visualization & inner landscape",
      tag: "PSYCHE",
      tagColor: "#EC4899",
      bgColor: "#FCE7F3",
      icon: Eye,
      available: true
    },
    {
      id: "gratitude",
      name: "Gratitude Journal",
      description: "Daily anchoring practice",
      tag: "DAILY",
      tagColor: "#F59E0B",
      bgColor: "#FEF3C7",
      icon: BookHeart,
      available: true
    },
    {
      id: "will",
      name: "Will Training",
      description: "Act of Will daily exercises",
      tag: "AGENCY",
      tagColor: "#10B981",
      bgColor: "#D1FAE5",
      icon: Target,
      available: true
    },
    {
      id: "ritual",
      name: "Ritual Builder",
      description: "Morning · Evening · Create rituals",
      tag: "HABIT",
      tagColor: "#F59E0B",
      bgColor: "#FED7AA",
      icon: Calendar,
      available: true
    },
    {
      id: "subpersonality",
      name: "Subpersonality Work",
      description: "Meet & integrate inner parts",
      tag: "PARTS",
      tagColor: "#A78BFA",
      bgColor: "#EDE9FE",
      icon: Users,
      available: true
    },
    {
      id: "bodyscan",
      name: "Body Scan",
      description: "Grounding through body awareness",
      tag: "SOMATIC",
      tagColor: "#06B6D4",
      bgColor: "#CFFAFE",
      icon: Scan,
      available: true
    },
    {
      id: "moodmeter",
      name: "Mood Meter",
      description: "Log & understand emotions",
      tag: "TRACK",
      tagColor: "#EF4444",
      bgColor: "#FEE2E2",
      icon: BarChart3,
      available: true
    },
    {
      id: "affirmations",
      name: "Affirmations",
      description: "Personalized affirmation builder",
      tag: "WILL",
      tagColor: "#F59E0B",
      bgColor: "#FEF3C7",
      icon: MessageCircle,
      available: true
    },
    {
      id: "grounding",
      name: "Crisis Grounding",
      description: "5-4-3-2-1 Tapping · Cold breath",
      tag: "SOS",
      tagColor: "#10B981",
      bgColor: "#D1FAE5",
      icon: Phone,
      available: true
    },
    {
      id: "sleep",
      name: "Sleep Ritual",
      description: "Wind-down & Sleep preparation",
      tag: "REST",
      tagColor: "#8B5CF6",
      bgColor: "#EDE9FE",
      icon: Moon,
      available: true
    }
  ];

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
      <div className="pt-8 pb-6 px-2">
        <h1 
          className="text-3xl mb-1"
          style={{ 
            fontFamily: 'Lora, serif',
            fontWeight: 500,
            color: '#15113C'
          }}
        >
          Tools
        </h1>
        <p 
          className="text-sm"
          style={{ 
            fontFamily: 'Inter, sans-serif',
            color: '#9CA3AF'
          }}
        >
          Your psychosynthesis toolkit
        </p>
      </div>

      {/* Crisis Support - Full Width */}
      <div className="mb-4">
        <div
          className="p-5 rounded-3xl flex items-center justify-between"
          style={{
            background: tools[0].bgColor,
            border: '2px solid #E5D4CE'
          }}
        >
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(255,255,255,0.5)' }}
            >
              <Heart className="w-6 h-6" style={{ color: '#B45641', strokeWidth: 2 }} />
            </div>
            <div>
              <h3
                className="text-base mb-0.5"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  color: '#15113C'
                }}
              >
                {tools[0].name}
              </h3>
              <p
                className="text-xs"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  color: '#6B7280'
                }}
              >
                {tools[0].description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mindful Games - Full Width */}
      <div className="mb-4">
        <button
          onClick={onNavigateToGames}
          className="w-full p-5 rounded-3xl flex items-center justify-between transition-all"
          style={{
            background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
            border: '2px solid #FBBF24'
          }}
        >
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(255,255,255,0.6)' }}
            >
              <Gamepad2 className="w-6 h-6" style={{ color: '#D97706', strokeWidth: 2 }} />
            </div>
            <div className="text-left">
              <h3
                className="text-base mb-0.5"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  color: '#15113C'
                }}
              >
                Mindful Games
              </h3>
              <p
                className="text-xs"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  color: '#92400E'
                }}
              >
                19 games to build focus, memory & emotional strength
              </p>
            </div>
          </div>
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(255,255,255,0.6)' }}
          >
            <span style={{ color: '#D97706', fontSize: '18px' }}>→</span>
          </div>
        </button>
      </div>

      {/* Tool Grid */}
      <div className="grid grid-cols-2 gap-3">
        {tools.slice(1).map((tool) => (
          <div
            key={tool.id}
            className="p-4 rounded-3xl relative"
            style={{
              background: tool.bgColor,
              border: '2px solid rgba(0,0,0,0.05)',
              minHeight: '140px',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Tag */}
            {tool.tag && (
              <div 
                className="absolute top-3 right-3 px-2 py-1 rounded-md text-xs"
                style={{
                  background: 'rgba(255,255,255,0.8)',
                  color: tool.tagColor,
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  fontSize: '10px',
                  letterSpacing: '0.05em'
                }}
              >
                {tool.tag}
              </div>
            )}

            {/* Icon */}
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
              style={{ background: 'rgba(255,255,255,0.5)' }}
            >
              <tool.icon className="w-5 h-5" style={{ color: '#15113C', strokeWidth: 2 }} />
            </div>

            {/* Content */}
            <div className="flex-1">
              <h3 
                className="text-sm mb-1"
                style={{ 
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  color: '#15113C',
                  lineHeight: 1.3
                }}
              >
                {tool.name}
              </h3>
              <p 
                className="text-xs"
                style={{ 
                  fontFamily: 'Inter, sans-serif',
                  color: '#6B7280',
                  lineHeight: 1.4
                }}
              >
                {tool.description}
              </p>
            </div>
          </div>
        ))}

        {/* More Coming */}
        <div
          className="p-4 rounded-3xl col-span-2 flex flex-col items-center justify-center"
          style={{
            background: 'white',
            border: '2px dashed #E5E7EB',
            minHeight: '100px'
          }}
        >
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center mb-2"
            style={{ background: '#F3F4F6' }}
          >
            <Plus className="w-5 h-5" style={{ color: '#9CA3AF' }} />
          </div>
          <p 
            className="text-sm mb-0.5"
            style={{ 
              fontFamily: 'Inter, sans-serif',
              color: '#6B7280',
              fontWeight: 500
            }}
          >
            More tools coming
          </p>
          <p 
            className="text-xs"
            style={{ 
              fontFamily: 'Inter, sans-serif',
              color: '#9CA3AF'
            }}
          >
            CBT exercises, Somatic practices, and more
          </p>
        </div>
      </div>
    </div>
  );
}