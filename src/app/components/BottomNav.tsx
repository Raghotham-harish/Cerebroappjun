import { MessageCircle, Sparkles, User, Zap, Grid3x3 } from "lucide-react";
import { AnimatedLogo } from "./AnimatedLogo";

interface BottomNavProps {
  activeTab: "activities" | "chat" | "insights" | "tools" | "profile";
  onTabChange: (tab: "activities" | "chat" | "insights" | "tools" | "profile") => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around px-4 pb-6 pt-4 border-t"
      style={{
        background: 'white',
        borderColor: '#E5E7EB'
      }}
    >
      {/* Activities */}
      <button
        onClick={() => onTabChange("activities")}
        className="flex flex-col items-center gap-1 transition-all"
      >
        <Grid3x3 
          className="w-6 h-6 transition-colors" 
          style={{ 
            color: activeTab === "activities" ? '#6366F1' : '#9CA3AF',
            strokeWidth: activeTab === "activities" ? 2.5 : 2
          }} 
        />
        <span 
          className="text-xs transition-colors"
          style={{ 
            fontFamily: 'Inter, sans-serif',
            color: activeTab === "activities" ? '#6366F1' : '#9CA3AF',
            fontWeight: activeTab === "activities" ? 600 : 400,
            fontSize: '10px'
          }}
        >
          ACTIVITIES
        </span>
      </button>

      {/* Insights */}
      <button
        onClick={() => onTabChange("insights")}
        className="flex flex-col items-center gap-1 transition-all"
      >
        <Sparkles 
          className="w-6 h-6 transition-colors" 
          style={{ 
            color: activeTab === "insights" ? '#6366F1' : '#9CA3AF',
            strokeWidth: activeTab === "insights" ? 2.5 : 2
          }} 
        />
        <span 
          className="text-xs transition-colors"
          style={{ 
            fontFamily: 'Inter, sans-serif',
            color: activeTab === "insights" ? '#6366F1' : '#9CA3AF',
            fontWeight: activeTab === "insights" ? 600 : 400,
            fontSize: '10px'
          }}
        >
          INSIGHTS
        </span>
      </button>

      {/* Chat - Animated Logo (Center) */}
      <button
        onClick={() => onTabChange("chat")}
        className="flex flex-col items-center gap-1 transition-all"
      >
        <div 
          className="transition-all"
          style={{
            opacity: activeTab === "chat" ? 1 : 0.5,
            transform: activeTab === "chat" ? 'scale(1.1)' : 'scale(1)'
          }}
        >
          <AnimatedLogo size={36} animate={activeTab === "chat"} />
        </div>
        <span 
          className="text-xs transition-colors"
          style={{ 
            fontFamily: 'Inter, sans-serif',
            color: activeTab === "chat" ? '#6366F1' : '#9CA3AF',
            fontWeight: activeTab === "chat" ? 600 : 400,
            fontSize: '10px'
          }}
        >
          VOICE
        </span>
      </button>

      {/* Tools */}
      <button
        onClick={() => onTabChange("tools")}
        className="flex flex-col items-center gap-1 transition-all"
      >
        <Zap 
          className="w-6 h-6 transition-colors" 
          style={{ 
            color: activeTab === "tools" ? '#6366F1' : '#9CA3AF',
            strokeWidth: activeTab === "tools" ? 2.5 : 2,
            fill: activeTab === "tools" ? '#6366F1' : 'none'
          }} 
        />
        <span 
          className="text-xs transition-colors"
          style={{ 
            fontFamily: 'Inter, sans-serif',
            color: activeTab === "tools" ? '#6366F1' : '#9CA3AF',
            fontWeight: activeTab === "tools" ? 600 : 400,
            fontSize: '10px'
          }}
        >
          TOOLS
        </span>
      </button>

      {/* Profile */}
      <button
        onClick={() => onTabChange("profile")}
        className="flex flex-col items-center gap-1 transition-all"
      >
        <User 
          className="w-6 h-6 transition-colors" 
          style={{ 
            color: activeTab === "profile" ? '#6366F1' : '#9CA3AF',
            strokeWidth: activeTab === "profile" ? 2.5 : 2
          }} 
        />
        <span 
          className="text-xs transition-colors"
          style={{ 
            fontFamily: 'Inter, sans-serif',
            color: activeTab === "profile" ? '#6366F1' : '#9CA3AF',
            fontWeight: activeTab === "profile" ? 600 : 400,
            fontSize: '10px'
          }}
        >
          PROFILE
        </span>
      </button>
    </div>
  );
}