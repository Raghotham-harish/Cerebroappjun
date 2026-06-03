import { useEffect, useState } from "react";
import { motion } from "motion/react";

interface VoiceOrbProps {
  isListening: boolean;
  isSpeaking: boolean;
  size?: number;
}

export function VoiceOrb({ isListening, isSpeaking, size = 200 }: VoiceOrbProps) {
  const [pulseScale, setPulseScale] = useState(1);

  useEffect(() => {
    if (isListening || isSpeaking) {
      const interval = setInterval(() => {
        setPulseScale(prev => (prev === 1 ? 1.1 : 1));
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isListening, isSpeaking]);

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      {/* Outer glow rings */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(196, 181, 253, 0.3) 0%, rgba(233, 213, 255, 0.15) 40%, transparent 70%)",
        }}
        animate={{
          scale: isListening ? [1, 1.2, 1] : 1,
          opacity: isListening ? [0.4, 0.7, 0.4] : 0.3,
        }}
        transition={{
          duration: 2,
          repeat: isListening ? Infinity : 0,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(216, 180, 254, 0.25) 0%, rgba(233, 213, 255, 0.1) 50%, transparent 70%)",
        }}
        animate={{
          scale: isListening ? [1.1, 1.3, 1.1] : 1.05,
          opacity: isListening ? [0.3, 0.6, 0.3] : 0.2,
        }}
        transition={{
          duration: 2.5,
          repeat: isListening ? Infinity : 0,
          ease: "easeInOut",
          delay: 0.3,
        }}
      />

      {/* Main orb with glass effect */}
      <motion.div
        className="relative rounded-full"
        style={{
          width: size * 0.65,
          height: size * 0.65,
          background: "linear-gradient(135deg, #E9D5FF 0%, #DDD6FE 30%, #E0E7FF 60%, #DBEAFE 100%)",
          boxShadow: "0 8px 32px rgba(196, 181, 253, 0.3), inset 0 2px 12px rgba(255, 255, 255, 0.4)",
        }}
        animate={{
          scale: isSpeaking ? pulseScale : 1,
        }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
      >
        {/* Inner white glow/highlight */}
        <div
          className="absolute top-[20%] left-[25%] w-[35%] h-[35%] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.3) 50%, transparent 70%)",
            filter: "blur(8px)",
          }}
        />
        
        {/* Bottom subtle shadow */}
        <div
          className="absolute bottom-[15%] left-[20%] right-[20%] h-[20%] rounded-full"
          style={{
            background: "radial-gradient(ellipse, rgba(124, 58, 237, 0.15) 0%, transparent 70%)",
            filter: "blur(6px)",
          }}
        />
        
        {/* Listening indicator waves */}
        {isListening && (
          <div className="absolute inset-0 flex items-center justify-center gap-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="w-1 bg-purple-400/60 rounded-full"
                style={{
                  height: 12,
                }}
                animate={{
                  height: [12, 24, 12],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.1,
                }}
              />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}