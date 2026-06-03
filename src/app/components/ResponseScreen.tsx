import { useState } from "react";
import { ArrowLeft, Home, MessageCircle, Brain, User } from "lucide-react";

interface ResponseScreenProps {
  onBack: () => void;
  response?: string;
}

export function ResponseScreen({ onBack, response = "Your thoughts have been processed" }: ResponseScreenProps) {
  const [activeTab, setActiveTab] = useState('insights');

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Flowing wave background */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 400 800"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Top flowing waves */}
        <path
          fill="url(#bgGradient1)"
          opacity="0.6"
        >
          <animate
            attributeName="d"
            dur="12s"
            repeatCount="indefinite"
            values="
              M0,0 Q100,80 200,70 Q300,60 400,100 L400,0 L0,0 Z;
              M0,0 Q100,100 200,90 Q300,80 400,120 L400,0 L0,0 Z;
              M0,0 Q100,80 200,70 Q300,60 400,100 L400,0 L0,0 Z
            "
          />
        </path>
        
        <path
          fill="url(#bgGradient2)"
          opacity="0.5"
        >
          <animate
            attributeName="d"
            dur="10s"
            repeatCount="indefinite"
            values="
              M0,50 Q100,120 200,110 Q300,100 400,140 L400,0 L0,0 Z;
              M0,60 Q100,140 200,130 Q300,120 400,160 L400,0 L0,0 Z;
              M0,50 Q100,120 200,110 Q300,100 400,140 L400,0 L0,0 Z
            "
          />
        </path>

        <path
          fill="url(#bgGradient3)"
          opacity="0.4"
        >
          <animate
            attributeName="d"
            dur="14s"
            repeatCount="indefinite"
            values="
              M0,100 Q100,160 200,150 Q300,140 400,180 L400,0 L0,0 Z;
              M0,110 Q100,180 200,170 Q300,160 400,200 L400,0 L0,0 Z;
              M0,100 Q100,160 200,150 Q300,140 400,180 L400,0 L0,0 Z
            "
          />
        </path>

        {/* Bottom flowing waves */}
        <path
          fill="url(#bgGradient4)"
          opacity="0.3"
        >
          <animate
            attributeName="d"
            dur="11s"
            repeatCount="indefinite"
            values="
              M0,800 Q100,720 200,730 Q300,740 400,700 L400,800 L0,800 Z;
              M0,800 Q100,700 200,710 Q300,720 400,680 L400,800 L0,800 Z;
              M0,800 Q100,720 200,730 Q300,740 400,700 L400,800 L0,800 Z
            "
          />
        </path>

        <defs>
          <linearGradient id="bgGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FED7E2" />
            <stop offset="100%" stopColor="#FCE7F3" />
          </linearGradient>
          <linearGradient id="bgGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E9D5FF" />
            <stop offset="100%" stopColor="#DDD6FE" />
          </linearGradient>
          <linearGradient id="bgGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DBEAFE" />
            <stop offset="100%" stopColor="#E0E7FF" />
          </linearGradient>
          <linearGradient id="bgGradient4" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FED7AA" />
            <stop offset="100%" stopColor="#FECACA" />
          </linearGradient>
        </defs>
      </svg>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between p-6">
        <button
          onClick={onBack}
          className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5" style={{ color: '#15113C' }} />
        </button>
        <h2 className="text-lg" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#15113C' }}>
          Welcome back!
        </h2>
        <div className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center">
          <User className="w-5 h-5" style={{ color: '#15113C' }} />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center px-6 pt-8">
        {/* Category */}
        <p className="text-sm text-gray-600 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
          Good feelings and vibes
        </p>

        {/* Main Title */}
        <h1 className="text-4xl mb-12 text-center" style={{ fontFamily: 'Lora, serif', fontWeight: 500, color: '#15113C' }}>
          Mental Clarity
        </h1>

        {/* Stats Cards */}
        <div className="w-full max-w-md space-y-4 mb-8">
          {/* Time Stats */}
          <div className="flex gap-4">
            <div className="flex-1 bg-white/60 backdrop-blur-sm rounded-3xl p-6 border border-purple-100">
              <p className="text-3xl mb-1" style={{ fontFamily: 'Lora, serif', fontWeight: 500, color: '#15113C' }}>
                2:30<span className="text-lg">am</span>
              </p>
              <p className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                Sleep
              </p>
            </div>
            <div className="flex-1 bg-white/60 backdrop-blur-sm rounded-3xl p-6 border border-blue-100">
              <p className="text-3xl mb-1" style={{ fontFamily: 'Lora, serif', fontWeight: 500, color: '#15113C' }}>
                23:45<span className="text-lg">pm</span>
              </p>
              <p className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                Work done
              </p>
            </div>
          </div>

          {/* Wave Chart Visualization */}
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 border border-purple-100">
            <div className="flex items-end justify-between h-32 gap-1">
              {[40, 70, 90, 60, 45, 80, 95, 70, 50, 85, 75, 90, 65, 80].map((height, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-lg"
                  style={{
                    background: i % 3 === 0 ? '#DBEAFE' : i % 3 === 1 ? '#DDD6FE' : '#E9D5FF',
                    height: `${height}%`,
                    transition: 'height 0.3s ease',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Achievement Stats */}
          <div className="flex gap-4">
            <div className="flex-1 bg-white/60 backdrop-blur-sm rounded-3xl p-6 border border-pink-100">
              <p className="text-3xl mb-1" style={{ fontFamily: 'Lora, serif', fontWeight: 500, color: '#15113C' }}>
                +28%
              </p>
              <p className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                Better than yesterday
              </p>
            </div>
            <div className="flex-1 bg-white/60 backdrop-blur-sm rounded-3xl p-6 border border-orange-100">
              <p className="text-3xl mb-1" style={{ fontFamily: 'Lora, serif', fontWeight: 500, color: '#15113C' }}>
                246<span className="text-lg">n/m</span>
              </p>
              <p className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                Great work
              </p>
            </div>
          </div>

          {/* Response Text */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 border border-purple-100">
            <p className="text-base leading-relaxed" style={{ fontFamily: 'Inter, sans-serif', color: '#15113C' }}>
              {response}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="relative z-10 px-6 pb-8">
        <div className="bg-white/80 backdrop-blur-md rounded-full px-8 py-4 flex items-center justify-around border border-purple-100">
          <button className="flex flex-col items-center gap-1">
            <Home className="w-5 h-5 text-gray-400" />
          </button>
          <button className="flex flex-col items-center gap-1">
            <MessageCircle className="w-5 h-5 text-gray-400" />
          </button>
          <button className="flex flex-col items-center gap-1">
            <Brain className="w-6 h-6 text-indigo-600" />
          </button>
          <button className="flex flex-col items-center gap-1">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-gray-400">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
            </svg>
          </button>
          <button className="flex flex-col items-center gap-1">
            <User className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
}
