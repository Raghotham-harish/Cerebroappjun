import { useState, useEffect } from "react";

export function BoxBreathingScreen() {
  const [currentPhase, setCurrentPhase] = useState(2); // 0: Inhale, 1: Hold, 2: Exhale, 3: Hold
  const [counter, setCounter] = useState(8);
  const [isActive, setIsActive] = useState(false);

  const phases = [
    { name: "INHALE", duration: 4, color: "#6B9B8F" },
    { name: "HOLD", duration: 7, color: "#71717A" },
    { name: "EXHALE", duration: 8, color: "#4A9B9B" },
    { name: "HOLD", duration: 4, color: "#71717A" }
  ];

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setCounter((prev) => {
        if (prev <= 1) {
          setCurrentPhase((p) => (p + 1) % 4);
          return phases[(currentPhase + 1) % 4].duration;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, currentPhase]);

  return (
    <div 
      className="min-h-screen relative overflow-hidden flex flex-col"
      style={{ 
        background: 'linear-gradient(180deg, #E0F2FE 0%, #DBEAFE 100%)',
        padding: '16px'
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between pt-8 pb-4">
        <button 
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          <div className="w-5 h-5 rounded" style={{ background: 'rgba(255,255,255,0.3)' }} />
        </button>

        <div className="text-center">
          <p 
            className="text-xs mb-1"
            style={{ 
              fontFamily: 'Inter, sans-serif',
              color: '#A1A1AA',
              letterSpacing: '0.05em'
            }}
          >
            4-7-8 BREATH
          </p>
          <h1 
            className="text-xl"
            style={{ 
              fontFamily: 'Lora, serif',
              fontWeight: 500,
              color: 'white'
            }}
          >
            Box Breathing
          </h1>
          <p 
            className="text-sm"
            style={{ 
              fontFamily: 'Inter, sans-serif',
              color: '#71717A'
            }}
          >
            Round 2 of 4
          </p>
        </div>

        <div 
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{
            background: 'rgba(251, 191, 36, 0.2)',
            border: '1px solid #FBBF24'
          }}
        >
          <span 
            className="text-xs"
            style={{ 
              fontFamily: 'Inter, sans-serif',
              color: '#FBBF24',
              fontWeight: 700
            }}
          >
            +20
          </span>
        </div>
      </div>

      {/* Progress Bars */}
      <div className="flex gap-2 mb-12">
        {[1, 2, 3, 4].map((round) => (
          <div
            key={round}
            className="flex-1 h-1 rounded-full"
            style={{
              background: round <= 2 ? '#4A9B9B' : 'rgba(255,255,255,0.1)'
            }}
          />
        ))}
      </div>

      {/* Main Breathing Circle */}
      <div className="flex-1 flex items-center justify-center">
        <div className="relative">
          {/* Outer glow ring */}
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              width: '300px',
              height: '300px',
              background: `radial-gradient(circle, ${phases[currentPhase].color}30 0%, transparent 70%)`,
              filter: 'blur(40px)',
              animation: isActive ? 'pulse 4s ease-in-out infinite' : 'none'
            }}
          />

          {/* Main circle */}
          <div 
            className="relative rounded-full flex items-center justify-center"
            style={{
              width: '280px',
              height: '280px',
              background: `radial-gradient(circle, ${phases[currentPhase].color}20 0%, transparent 70%)`,
              border: `3px solid ${phases[currentPhase].color}60`,
              transition: 'all 1s ease-in-out'
            }}
          >
            {/* Inner content */}
            <div className="text-center">
              <p 
                className="text-2xl mb-2"
                style={{ 
                  fontFamily: 'Lora, serif',
                  fontWeight: 400,
                  color: 'rgba(255,255,255,0.9)'
                }}
              >
                {phases[currentPhase].name === "EXHALE" ? "Exhale" : 
                 phases[currentPhase].name === "INHALE" ? "Inhale" : "Hold"}
              </p>
              <p 
                className="text-7xl"
                style={{ 
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 300,
                  color: phases[currentPhase].color,
                  lineHeight: 1
                }}
              >
                {counter}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Phase Indicators */}
      <div className="flex items-center justify-center gap-8 mb-12">
        {phases.map((phase, i) => (
          <div key={i} className="flex flex-col items-center">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center mb-2"
              style={{
                background: i === currentPhase ? phase.color : 'rgba(255,255,255,0.05)',
                border: i === currentPhase ? `2px solid ${phase.color}` : '2px solid rgba(255,255,255,0.1)',
                opacity: i === currentPhase ? 1 : 0.4
              }}
            >
              <span 
                className="text-2xl"
                style={{ 
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 300,
                  color: i === currentPhase ? 'white' : '#71717A'
                }}
              >
                {phase.duration}
              </span>
            </div>
            <p 
              className="text-xs"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                color: i === currentPhase ? 'white' : '#52525B',
                fontWeight: 600,
                fontSize: '10px'
              }}
            >
              {phase.name}
            </p>
          </div>
        ))}
      </div>

      {/* Quote */}
      <div 
        className="p-4 rounded-3xl mb-6"
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)'
        }}
      >
        <p 
          className="text-sm italic text-center"
          style={{ 
            fontFamily: 'Lora, serif',
            color: '#A1A1AA',
            lineHeight: 1.6
          }}
        >
          "Your heart rate is settling. Stay with each count."
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pb-6">
        <button 
          onClick={() => setIsActive(!isActive)}
          className="flex-1 py-4 rounded-full"
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '2px solid rgba(255,255,255,0.1)',
            fontFamily: 'Inter, sans-serif',
            color: 'rgba(255,255,255,0.7)',
            fontWeight: 600
          }}
        >
          {isActive ? "Pause" : "Resume"}
        </button>
        <button 
          className="flex-1 py-4 rounded-full"
          style={{
            background: '#4A9B9B',
            fontFamily: 'Inter, sans-serif',
            color: 'white',
            fontWeight: 600
          }}
        >
          Done · +20 XP
        </button>
      </div>
    </div>
  );
}