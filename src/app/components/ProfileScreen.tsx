import { User, Settings, Bell, Shield, HelpCircle, LogOut, ChevronRight } from "lucide-react";
import { AnimatedLogo } from "./AnimatedLogo";

interface ProfileScreenProps {
  userName: string;
  oracleName: string;
}

export function ProfileScreen({ userName, oracleName }: ProfileScreenProps) {
  const menuItems = [
    { icon: User,       label: "Account Settings",   iconBg: "#EDE9FE" },
    { icon: Bell,       label: "Notifications",      iconBg: "#CFFAFE" },
    { icon: Shield,     label: "Privacy & Security", iconBg: "#DCFCE7" },
    { icon: Settings,   label: "App Preferences",    iconBg: "#FEF3C7" },
    { icon: HelpCircle, label: "Help & Support",     iconBg: "#DBEAFE" },
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
          Profile
        </h1>
        <p 
          className="text-sm"
          style={{ 
            fontFamily: 'Inter, sans-serif',
            color: '#9CA3AF'
          }}
        >
          Manage your account and preferences
        </p>
      </div>

      {/* Profile Card */}
      <div 
        className="p-6 rounded-3xl mb-6"
        style={{
          background: 'linear-gradient(135deg, #EDE9FE 0%, #DDD6FE 100%)',
          border: '2px solid #C4B5FD'
        }}
      >
        <div className="flex items-center gap-4 mb-4">
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #A78BFA 0%, #8B5CF6 100%)' }}
          >
            <User className="w-8 h-8" style={{ color: 'white' }} />
          </div>
          <div className="flex-1">
            <h2 
              className="text-xl mb-0.5"
              style={{ 
                fontFamily: 'Lora, serif',
                fontWeight: 500,
                color: '#15113C'
              }}
            >
              {userName}
            </h2>
            <p 
              className="text-sm"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                color: '#6B21A8'
              }}
            >
              Guided by {oracleName}
            </p>
          </div>
        </div>
        
        {/* Stats */}
        <div className="flex gap-4 pt-4 border-t" style={{ borderColor: '#C4B5FD' }}>
          <div className="flex-1 text-center">
            <p 
              className="text-2xl mb-0.5"
              style={{ 
                fontFamily: 'Lora, serif',
                fontWeight: 500,
                color: '#5B21B6'
              }}
            >
              42
            </p>
            <p 
              className="text-xs"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                color: '#6B21A8'
              }}
            >
              SESSIONS
            </p>
          </div>
          <div className="flex-1 text-center">
            <p 
              className="text-2xl mb-0.5"
              style={{ 
                fontFamily: 'Lora, serif',
                fontWeight: 500,
                color: '#5B21B6'
              }}
            >
              14
            </p>
            <p 
              className="text-xs"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                color: '#6B21A8'
              }}
            >
              DAY STREAK
            </p>
          </div>
          <div className="flex-1 text-center">
            <p 
              className="text-2xl mb-0.5"
              style={{ 
                fontFamily: 'Lora, serif',
                fontWeight: 500,
                color: '#5B21B6'
              }}
            >
              8
            </p>
            <p 
              className="text-xs"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                color: '#6B21A8'
              }}
            >
              INSIGHTS
            </p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="space-y-3">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className="w-full p-4 rounded-2xl flex items-center gap-3 transition-all"
            style={{
              background: 'white',
              border: '2px solid #F3F4F6'
            }}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: item.iconBg }}
            >
              <item.icon className="w-5 h-5" style={{ color: '#15113C' }} />
            </div>
            <span 
              className="flex-1 text-left text-sm"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                color: '#15113C',
                fontWeight: 500
              }}
            >
              {item.label}
            </span>
            <ChevronRight className="w-5 h-5" style={{ color: '#9CA3AF' }} />
          </button>
        ))}
      </div>

      {/* Logout Button */}
      <button
        className="w-full mt-6 p-4 rounded-2xl flex items-center justify-center gap-2"
        style={{
          background: 'rgba(255,255,255,0.8)',
          border: '1.5px solid rgba(220,38,38,0.2)'
        }}
      >
        <LogOut className="w-5 h-5" style={{ color: '#DC2626' }} />
        <span 
          className="text-sm"
          style={{ 
            fontFamily: 'Inter, sans-serif',
            color: '#DC2626',
            fontWeight: 600
          }}
        >
          Log Out
        </span>
      </button>

      {/* Version */}
      <p 
        className="text-center mt-8 text-xs"
        style={{ 
          fontFamily: 'Inter, sans-serif',
          color: '#D1D5DB'
        }}
      >
        CereBro v1.0.0 · Built with ♥︎
      </p>
    </div>
  );
}