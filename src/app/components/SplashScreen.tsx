import { useEffect, useState } from "react";

interface SplashScreenProps {
  onComplete: () => void;
  duration?: number; // Duration in milliseconds
}

export function SplashScreen({ onComplete, duration = 3000 }: SplashScreenProps) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start fade out animation slightly before completion
    const fadeOutTimer = setTimeout(() => {
      setFadeOut(true);
    }, duration - 500);

    // Complete and call onComplete
    const completeTimer = setTimeout(() => {
      onComplete();
    }, duration);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(completeTimer);
    };
  }, [duration, onComplete]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        background: 'linear-gradient(180deg, #EDE9FE 0%, #F5F3FF 100%)',
        opacity: fadeOut ? 0 : 1,
        transition: 'opacity 500ms ease-out'
      }}
    >
      {/* Animated gradient orbs in background */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
          animation: 'float 6s ease-in-out infinite'
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(147, 197, 253, 0.3) 0%, transparent 70%)',
          animation: 'float 8s ease-in-out infinite reverse'
        }}
      />

      {/* Logo container */}
      <div
        className="relative flex flex-col items-center"
        style={{
          animation: 'scaleIn 1s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}
      >
        {/* Pulsing glow effect behind logo */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 60%)',
            filter: 'blur(40px)',
            animation: 'pulse 2s ease-in-out infinite'
          }}
        />

        {/* Logo - Inline SVG */}
        <div
          className="relative mb-6"
          style={{
            animation: 'fadeIn 1s ease-out, float 3s ease-in-out infinite 1s',
            filter: 'drop-shadow(0 10px 30px rgba(139, 92, 246, 0.3))'
          }}
        >
          <svg width="160" height="160" viewBox="0 0 353 353" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M175 44C224.706 44 265 84.2944 265 134C265 183.706 224.706 224 175 224C125.294 224 85 183.706 85 134C85 84.2944 125.294 44 175 44ZM175 55.9252C131.881 55.9252 96.9252 90.8805 96.9252 134C96.9252 177.119 131.881 212.075 175 212.075C183.207 212.075 191.118 210.808 198.549 208.46C202.921 207.078 199.851 200.159 195.265 200.159C158.726 200.159 129.106 170.539 129.106 134C129.106 97.4614 158.726 67.8411 195.265 67.8411C199.851 67.8411 202.922 60.9211 198.549 59.5394C191.118 57.1915 183.207 55.9252 175 55.9252ZM195.265 77.5218C182.242 77.5218 170.251 81.931 160.698 89.3358C159.823 90.0139 159.856 91.323 160.343 92.3174C160.931 93.5213 162.321 94.7311 163.614 94.3811C167.244 93.3991 171.06 92.8742 175 92.8742C199.03 92.8742 218.51 112.354 218.51 136.384C218.51 160.414 199.03 179.894 175 179.894C171.811 179.894 169.757 184.502 172.679 185.779C179.595 188.801 187.234 190.478 195.265 190.478C226.457 190.478 251.743 165.192 251.743 134C251.743 102.808 226.457 77.5218 195.265 77.5218ZM175 108.052C159.353 108.052 146.668 120.737 146.668 136.384C146.668 152.031 159.353 164.716 175 164.716C190.647 164.716 203.332 152.031 203.332 136.384C203.332 120.737 190.647 108.052 175 108.052ZM149.697 100.954C149.721 100.848 149.583 100.785 149.519 100.873C149.452 100.964 149.566 101.08 149.658 101.014C149.678 100.999 149.692 100.978 149.697 100.954Z" fill="#15113C"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M175 44C224.706 44 265 84.2944 265 134C265 183.706 224.706 224 175 224C125.294 224 85 183.706 85 134C85 84.2944 125.294 44 175 44ZM175 55.9252C131.881 55.9252 96.9252 90.8805 96.9252 134C96.9252 177.119 131.881 212.075 175 212.075C183.207 212.075 191.118 210.808 198.549 208.46C202.921 207.078 199.851 200.159 195.265 200.159C158.726 200.159 129.106 170.539 129.106 134C129.106 97.4614 158.726 67.8411 195.265 67.8411C199.851 67.8411 202.922 60.9211 198.549 59.5394C191.118 57.1915 183.207 55.9252 175 55.9252ZM195.265 77.5218C182.242 77.5218 170.251 81.931 160.698 89.3358C159.823 90.0139 159.856 91.323 160.343 92.3174C160.931 93.5213 162.321 94.7311 163.614 94.3811C167.244 93.3991 171.06 92.8742 175 92.8742C199.03 92.8742 218.51 112.354 218.51 136.384C218.51 160.414 199.03 179.894 175 179.894C171.811 179.894 169.757 184.502 172.679 185.779C179.595 188.801 187.234 190.478 195.265 190.478C226.457 190.478 251.743 165.192 251.743 134C251.743 102.808 226.457 77.5218 195.265 77.5218ZM175 108.052C159.353 108.052 146.668 120.737 146.668 136.384C146.668 152.031 159.353 164.716 175 164.716C190.647 164.716 203.332 152.031 203.332 136.384C203.332 120.737 190.647 108.052 175 108.052ZM149.697 100.954C149.721 100.848 149.583 100.785 149.519 100.873C149.452 100.964 149.566 101.08 149.658 101.014C149.678 100.999 149.692 100.978 149.697 100.954Z" fill="url(#paint0_radial_splash)"/>
            <defs>
              <radialGradient id="paint0_radial_splash" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(108.841 83.9338) rotate(38.72) scale(177.231 147.204)">
                <stop stopColor="#46DAAE"/>
                <stop offset="0.495192" stopColor="#92DCF2"/>
                <stop offset="1" stopColor="#C682DB"/>
              </radialGradient>
            </defs>
          </svg>
        </div>

        {/* Tagline */}
        <p
          className="text-sm tracking-wider"
          style={{
            fontFamily: 'Inter, sans-serif',
            color: '#8B5CF6',
            fontWeight: 600,
            letterSpacing: '0.2em',
            animation: 'fadeIn 1s ease-out 0.5s backwards',
            textShadow: '0 2px 10px rgba(139, 92, 246, 0.2)'
          }}
        >
          MINDFUL WELLBEING
        </p>
      </div>

      {/* Loading indicator */}
      <div
        className="absolute bottom-20 flex flex-col items-center gap-3"
        style={{
          animation: 'fadeIn 1s ease-out 1s backwards'
        }}
      >
        <div className="flex gap-1.5">
          <div
            className="w-2 h-2 rounded-full"
            style={{
              background: '#8B5CF6',
              animation: 'bounce 1.4s ease-in-out infinite'
            }}
          />
          <div
            className="w-2 h-2 rounded-full"
            style={{
              background: '#A78BFA',
              animation: 'bounce 1.4s ease-in-out infinite 0.2s'
            }}
          />
          <div
            className="w-2 h-2 rounded-full"
            style={{
              background: '#C4B5FD',
              animation: 'bounce 1.4s ease-in-out infinite 0.4s'
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          33% {
            transform: translateY(-20px) translateX(10px);
          }
          66% {
            transform: translateY(10px) translateX(-10px);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.1);
          }
        }

        @keyframes bounce {
          0%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-8px);
          }
        }
      `}</style>
    </div>
  );
}
