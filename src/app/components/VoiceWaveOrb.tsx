interface VoiceWaveOrbProps {
  isListening: boolean;
  size?: number;
  showMicIcon?: boolean;
}

export function VoiceWaveOrb({ isListening, size = 280, showMicIcon = false }: VoiceWaveOrbProps) {
  // Show mic icon only when explicitly requested (first screen)
  if (!isListening && showMicIcon) {
    return (
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox="0 0 400 400"
          className="absolute"
        >
          {/* Concentric circles - static/dashed */}
          <circle
            cx="200"
            cy="200"
            r="180"
            fill="none"
            stroke="#E0E7FF"
            strokeWidth="1"
            strokeDasharray="8 4"
            opacity="0.4"
          />
          <circle
            cx="200"
            cy="200"
            r="140"
            fill="none"
            stroke="#DDD6FE"
            strokeWidth="1"
            strokeDasharray="6 3"
            opacity="0.5"
          />
          <circle
            cx="200"
            cy="200"
            r="100"
            fill="none"
            stroke="#C7D2FE"
            strokeWidth="1"
            strokeDasharray="4 2"
            opacity="0.6"
          />
          
          {/* Center gradient circle */}
          <circle
            cx="200"
            cy="200"
            r="70"
            fill="url(#idleGradient)"
            opacity="0.9"
          />

          <defs>
            <radialGradient id="idleGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#E0E7FF" />
              <stop offset="100%" stopColor="#C7D2FE" />
            </radialGradient>
          </defs>
        </svg>

        {/* Mic Icon */}
        <div className="absolute flex items-center justify-center">
          <svg width={size * 0.15} height={size * 0.15} viewBox="0 0 24 24" fill="none">
            <path
              d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"
              fill="#6366F1"
            />
            <path
              d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"
              fill="#6366F1"
            />
          </svg>
        </div>
      </div>
    );
  }

  // Active listening state - Show flowing waves
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      {/* Outer flowing blob layers */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 400 400"
        className="absolute"
        style={{ filter: 'blur(1px)' }}
      >
        {/* Outermost flowing blob */}
        <path
          fill="url(#gradient1)"
          style={{ opacity: isListening ? 0.3 : 0.15 }}
        >
          <animate
            attributeName="d"
            dur="8s"
            repeatCount="indefinite"
            values="
              M200,50 Q280,70 320,150 Q360,230 300,300 Q240,370 150,330 Q60,290 50,200 Q40,110 120,80 Q160,60 200,50 Z;
              M200,40 Q290,80 330,160 Q370,240 290,310 Q230,380 140,340 Q50,300 45,195 Q35,100 125,75 Q165,50 200,40 Z;
              M200,50 Q280,70 320,150 Q360,230 300,300 Q240,370 150,330 Q60,290 50,200 Q40,110 120,80 Q160,60 200,50 Z
            "
          />
        </path>
        
        {/* Second layer */}
        <path
          fill="url(#gradient2)"
          style={{ opacity: isListening ? 0.4 : 0.2 }}
        >
          <animate
            attributeName="d"
            dur="7s"
            repeatCount="indefinite"
            values="
              M200,80 Q260,95 290,160 Q320,225 275,280 Q230,335 165,305 Q100,275 85,205 Q70,135 135,100 Q167,83 200,80 Z;
              M200,75 Q270,100 295,165 Q325,230 270,285 Q225,340 160,310 Q95,280 80,200 Q65,130 130,95 Q165,78 200,75 Z;
              M200,80 Q260,95 290,160 Q320,225 275,280 Q230,335 165,305 Q100,275 85,205 Q70,135 135,100 Q167,83 200,80 Z
            "
          />
        </path>
        
        {/* Third layer */}
        <path
          fill="url(#gradient3)"
          style={{ opacity: isListening ? 0.5 : 0.25 }}
        >
          <animate
            attributeName="d"
            dur="6s"
            repeatCount="indefinite"
            values="
              M200,110 Q245,120 270,170 Q295,220 260,265 Q225,310 175,285 Q125,260 115,205 Q105,150 150,125 Q175,112 200,110 Z;
              M200,105 Q250,125 275,175 Q300,225 255,270 Q220,315 170,290 Q120,265 110,200 Q100,145 145,120 Q172,107 200,105 Z;
              M200,110 Q245,120 270,170 Q295,220 260,265 Q225,310 175,285 Q125,260 115,205 Q105,150 150,125 Q175,112 200,110 Z
            "
          />
        </path>
        
        {/* Fourth layer */}
        <path
          fill="url(#gradient4)"
          style={{ opacity: isListening ? 0.6 : 0.3 }}
        >
          <animate
            attributeName="d"
            dur="5s"
            repeatCount="indefinite"
            values="
              M200,135 Q235,143 255,180 Q275,217 250,250 Q225,283 185,265 Q145,247 138,205 Q131,163 165,148 Q182,138 200,135 Z;
              M200,130 Q240,148 260,185 Q280,222 245,255 Q220,288 180,270 Q140,252 133,200 Q126,158 160,143 Q178,133 200,130 Z;
              M200,135 Q235,143 255,180 Q275,217 250,250 Q225,283 185,265 Q145,247 138,205 Q131,163 165,148 Q182,138 200,135 Z
            "
          />
        </path>
        
        {/* Center blob */}
        <path
          fill="url(#gradient5)"
          style={{ opacity: isListening ? 0.8 : 0.4 }}
        >
          <animate
            attributeName="d"
            dur="4s"
            repeatCount="indefinite"
            values="
              M200,160 Q225,165 240,190 Q255,215 238,235 Q221,255 195,245 Q169,235 163,207 Q157,179 180,170 Q190,162 200,160 Z;
              M200,155 Q230,170 245,195 Q260,220 233,240 Q216,260 190,250 Q164,240 158,202 Q152,174 175,165 Q187,157 200,155 Z;
              M200,160 Q225,165 240,190 Q255,215 238,235 Q221,255 195,245 Q169,235 163,207 Q157,179 180,170 Q190,162 200,160 Z
            "
          />
        </path>
        
        {/* Center dot */}
        <circle
          cx="200"
          cy="200"
          fill={isListening ? "#FFFFFF" : "#E0E7FF"}
        >
          {isListening && (
            <>
              <animate
                attributeName="r"
                dur="2s"
                repeatCount="indefinite"
                values="8;12;8"
              />
              <animate
                attributeName="opacity"
                dur="2s"
                repeatCount="indefinite"
                values="1;0.8;1"
              />
            </>
          )}
          {!isListening && <animate attributeName="r" dur="0s" values="6" />}
        </circle>

        {/* Gradient definitions - change colors when listening */}
        <defs>
          <radialGradient id="gradient1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={isListening ? "#DDD6FE" : "#F3F4F6"}>
              {isListening && (
                <animate
                  attributeName="stop-color"
                  values="#DDD6FE;#F0ABFC;#DDD6FE"
                  dur="4s"
                  repeatCount="indefinite"
                />
              )}
            </stop>
            <stop offset="100%" stopColor={isListening ? "#F0ABFC" : "#FAFAFA"}>
              {isListening && (
                <animate
                  attributeName="stop-color"
                  values="#F0ABFC;#DDD6FE;#F0ABFC"
                  dur="4s"
                  repeatCount="indefinite"
                />
              )}
            </stop>
          </radialGradient>
          
          <radialGradient id="gradient2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={isListening ? "#E9D5FF" : "#F3F4F6"}>
              {isListening && (
                <animate
                  attributeName="stop-color"
                  values="#E9D5FF;#FBCFE8;#E9D5FF"
                  dur="3.5s"
                  repeatCount="indefinite"
                />
              )}
            </stop>
            <stop offset="100%" stopColor={isListening ? "#FBCFE8" : "#F9FAFB"}>
              {isListening && (
                <animate
                  attributeName="stop-color"
                  values="#FBCFE8;#E9D5FF;#FBCFE8"
                  dur="3.5s"
                  repeatCount="indefinite"
                />
              )}
            </stop>
          </radialGradient>
          
          <radialGradient id="gradient3" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={isListening ? "#DDD6FE" : "#F3F4F6"}>
              {isListening && (
                <animate
                  attributeName="stop-color"
                  values="#DDD6FE;#E9D5FF;#DDD6FE"
                  dur="3s"
                  repeatCount="indefinite"
                />
              )}
            </stop>
            <stop offset="100%" stopColor={isListening ? "#E9D5FF" : "#F9FAFB"}>
              {isListening && (
                <animate
                  attributeName="stop-color"
                  values="#E9D5FF;#DDD6FE;#E9D5FF"
                  dur="3s"
                  repeatCount="indefinite"
                />
              )}
            </stop>
          </radialGradient>
          
          <radialGradient id="gradient4" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={isListening ? "#C4B5FD" : "#E5E7EB"}>
              {isListening && (
                <animate
                  attributeName="stop-color"
                  values="#C4B5FD;#DDD6FE;#C4B5FD"
                  dur="2.5s"
                  repeatCount="indefinite"
                />
              )}
            </stop>
            <stop offset="100%" stopColor={isListening ? "#DDD6FE" : "#F3F4F6"}>
              {isListening && (
                <animate
                  attributeName="stop-color"
                  values="#DDD6FE;#C4B5FD;#DDD6FE"
                  dur="2.5s"
                  repeatCount="indefinite"
                />
              )}
            </stop>
          </radialGradient>
          
          <radialGradient id="gradient5" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={isListening ? "#A78BFA" : "#C4B5FD"}>
              {isListening && (
                <animate
                  attributeName="stop-color"
                  values="#A78BFA;#C4B5FD;#A78BFA"
                  dur="2s"
                  repeatCount="indefinite"
                />
              )}
            </stop>
            <stop offset="100%" stopColor={isListening ? "#C4B5FD" : "#DDD6FE"}>
              {isListening && (
                <animate
                  attributeName="stop-color"
                  values="#C4B5FD;#A78BFA;#C4B5FD"
                  dur="2s"
                  repeatCount="indefinite"
                />
              )}
            </stop>
          </radialGradient>
        </defs>
      </svg>

      {/* Flowing outline strokes */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 400 400"
        className="absolute"
      >
        <path
          fill="none"
          stroke={isListening ? "#E9D5FF" : "#F3F4F6"}
          strokeWidth="2"
          opacity={isListening ? 0.4 : 0.2}
          strokeDasharray="10 5"
        >
          <animate
            attributeName="d"
            dur="8s"
            repeatCount="indefinite"
            values="
              M200,50 Q280,70 320,150 Q360,230 300,300 Q240,370 150,330 Q60,290 50,200 Q40,110 120,80 Q160,60 200,50 Z;
              M200,40 Q290,80 330,160 Q370,240 290,310 Q230,380 140,340 Q50,300 45,195 Q35,100 125,75 Q165,50 200,40 Z;
              M200,50 Q280,70 320,150 Q360,230 300,300 Q240,370 150,330 Q60,290 50,200 Q40,110 120,80 Q160,60 200,50 Z
            "
          />
          {isListening && (
            <animate
              attributeName="stroke-dashoffset"
              dur="4s"
              repeatCount="indefinite"
              values="0;20;0"
            />
          )}
        </path>
        <path
          fill="none"
          stroke={isListening ? "#FBCFE8" : "#F9FAFB"}
          strokeWidth="2"
          opacity={isListening ? 0.5 : 0.25}
          strokeDasharray="8 4"
        >
          <animate
            attributeName="d"
            dur="7s"
            repeatCount="indefinite"
            values="
              M200,80 Q260,95 290,160 Q320,225 275,280 Q230,335 165,305 Q100,275 85,205 Q70,135 135,100 Q167,83 200,80 Z;
              M200,75 Q270,100 295,165 Q325,230 270,285 Q225,340 160,310 Q95,280 80,200 Q65,130 130,95 Q165,78 200,75 Z;
              M200,80 Q260,95 290,160 Q320,225 275,280 Q230,335 165,305 Q100,275 85,205 Q70,135 135,100 Q167,83 200,80 Z
            "
          />
          {isListening && (
            <animate
              attributeName="stroke-dashoffset"
              dur="3.5s"
              repeatCount="indefinite"
              values="0;-20;0"
            />
          )}
        </path>
        <path
          fill="none"
          stroke={isListening ? "#DDD6FE" : "#E5E7EB"}
          strokeWidth="2"
          opacity={isListening ? 0.6 : 0.3}
          strokeDasharray="6 3"
        >
          <animate
            attributeName="d"
            dur="6s"
            repeatCount="indefinite"
            values="
              M200,110 Q245,120 270,170 Q295,220 260,265 Q225,310 175,285 Q125,260 115,205 Q105,150 150,125 Q175,112 200,110 Z;
              M200,105 Q250,125 275,175 Q300,225 255,270 Q220,315 170,290 Q120,265 110,200 Q100,145 145,120 Q172,107 200,105 Z;
              M200,110 Q245,120 270,170 Q295,220 260,265 Q225,310 175,285 Q125,260 115,205 Q105,150 150,125 Q175,112 200,110 Z
            "
          />
          {isListening && (
            <animate
              attributeName="stroke-dashoffset"
              dur="3s"
              repeatCount="indefinite"
              values="0;15;0"
            />
          )}
        </path>
      </svg>
    </div>
  );
}