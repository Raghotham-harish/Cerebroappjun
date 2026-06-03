interface WaveAnimationProps {
  isActive: boolean;
  variant?: "bars" | "circular";
  size?: number;
}

export function WaveAnimation({ isActive, variant = "bars", size = 80 }: WaveAnimationProps) {
  if (!isActive) return null;

  if (variant === "circular") {
    return (
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full border-2 border-purple-300/40"
            style={{
              width: size + i * 40,
              height: size + i * 40,
              animation: `ripple 2s ease-out infinite`,
              animationDelay: `${i * 0.6}s`,
            }}
          />
        ))}
        <style>{`
          @keyframes ripple {
            0% {
              transform: scale(0.8);
              opacity: 1;
            }
            100% {
              transform: scale(1.4);
              opacity: 0;
            }
          }
        `}</style>
      </div>
    );
  }

  // Bars variant
  return (
    <div className="flex items-end gap-2 h-16">
      <style>{`
        @keyframes wave {
          0%, 100% { height: 30%; }
          50% { height: 100%; }
        }
      `}</style>
      {[...Array(7)].map((_, i) => (
        <div
          key={i}
          className="w-2 bg-gradient-to-t from-purple-400 via-indigo-400 to-purple-300 rounded-full"
          style={{
            animation: `wave 1.2s ease-in-out infinite`,
            animationDelay: `${i * 0.15}s`,
            height: '40%',
          }}
        />
      ))}
    </div>
  );
}
