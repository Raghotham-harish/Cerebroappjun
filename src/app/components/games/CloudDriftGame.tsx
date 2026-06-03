import { useState, useEffect, useRef } from "react";
import { X, Cloud, Heart } from "lucide-react";

interface CloudDriftGameProps {
  onClose: () => void;
  onComplete: (score: number) => void;
}

interface CloudObject {
  id: number;
  x: number;
  y: number;
  type: "cloud" | "star" | "bird";
}

export function CloudDriftGame({ onClose, onComplete }: CloudDriftGameProps) {
  const [playerY, setPlayerY] = useState(50);
  const [clouds, setClouds] = useState<CloudObject[]>([]);
  const [starsCollected, setStarsCollected] = useState(0);
  const [distance, setDistance] = useState(0);
  const [breathCount, setBreathCount] = useState(0);
  const [isFloating, setIsFloating] = useState(false);

  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);
  const cloudTimerRef = useRef<NodeJS.Timeout | null>(null);
  const nextCloudId = useRef(0);

  const GRAVITY = 0.3;
  const FLOAT_STRENGTH = -2;
  const CLOUD_SPEED = 1.5;

  useEffect(() => {
    let velocity = 0;

    gameLoopRef.current = setInterval(() => {
      setPlayerY(prevY => {
        velocity += GRAVITY;
        if (isFloating) {
          velocity = FLOAT_STRENGTH;
        }

        const newY = Math.max(10, Math.min(90, prevY + velocity));
        return newY;
      });

      setClouds(prev =>
        prev
          .map(cloud => ({ ...cloud, x: cloud.x - CLOUD_SPEED }))
          .filter(cloud => cloud.x > -20)
      );

      setDistance(prev => prev + 1);
    }, 50);

    cloudTimerRef.current = setInterval(() => {
      const randomY = 20 + Math.random() * 60;
      const typeRandom = Math.random();
      const type: "cloud" | "star" | "bird" = typeRandom < 0.6 ? "cloud" : typeRandom < 0.85 ? "star" : "bird";

      setClouds(prev => [
        ...prev,
        {
          id: nextCloudId.current++,
          x: 110,
          y: randomY,
          type
        }
      ]);
    }, 2000);

    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
      if (cloudTimerRef.current) clearInterval(cloudTimerRef.current);
    };
  }, [isFloating]);

  useEffect(() => {
    clouds.forEach(cloud => {
      if (cloud.type === "star" && cloud.x > 45 && cloud.x < 55 && Math.abs(cloud.y - playerY) < 8) {
        setStarsCollected(prev => prev + 1);
        setClouds(prev => prev.filter(c => c.id !== cloud.id));
      }
    });
  }, [clouds, playerY]);

  const handleFloat = () => {
    setIsFloating(true);
    setBreathCount(prev => prev + 1);

    setTimeout(() => setIsFloating(false), 200);
  };

  const formatDistance = (dist: number) => {
    return Math.floor(dist / 20);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ background: 'linear-gradient(180deg, #FCE7F3 0%, #FBCFE8 50%, #F9A8D4 100%)' }}>
      <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: 'rgba(229, 231, 235, 0.5)', background: 'rgba(255,255,255,0.3)' }}>
        <button onClick={onClose} className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.9)', border: '2px solid #E5E7EB' }}>
          <X className="w-5 h-5" style={{ color: '#6B7280' }} />
        </button>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <span style={{ fontSize: '16px' }}>⭐</span>
            <span className="text-sm" style={{ fontFamily: 'Inter, sans-serif', color: '#9D174D', fontWeight: 600 }}>
              {starsCollected}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Cloud className="w-4 h-4" style={{ color: '#EC4899' }} />
            <span className="text-sm" style={{ fontFamily: 'Inter, sans-serif', color: '#9D174D', fontWeight: 600 }}>
              {formatDistance(distance)}
            </span>
          </div>
        </div>
      </div>

      <div
        className="flex-1 relative overflow-hidden"
        onClick={handleFloat}
        onTouchStart={handleFloat}
        style={{ cursor: 'pointer' }}
      >
        {clouds.map(cloud => (
          <div
            key={cloud.id}
            className="absolute transition-all"
            style={{
              left: `${cloud.x}%`,
              top: `${cloud.y}%`,
              fontSize: cloud.type === "cloud" ? "40px" : cloud.type === "star" ? "24px" : "28px",
              transform: 'translate(-50%, -50%)'
            }}
          >
            {cloud.type === "cloud" && "☁️"}
            {cloud.type === "star" && "⭐"}
            {cloud.type === "bird" && "🕊️"}
          </div>
        ))}

        <div
          className="absolute transition-all duration-100"
          style={{
            left: '50%',
            top: `${playerY}%`,
            fontSize: '48px',
            transform: `translate(-50%, -50%) ${isFloating ? 'scale(1.1)' : 'scale(1)'}`,
            filter: isFloating ? 'drop-shadow(0 0 20px rgba(236, 72, 153, 0.6))' : 'none'
          }}
        >
          🎈
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 p-4 text-center"
          style={{ background: 'linear-gradient(to top, rgba(252, 231, 243, 0.8), transparent)' }}
        >
          <p className="text-xs mb-2" style={{ fontFamily: 'Inter, sans-serif', color: '#9D174D', fontWeight: 500 }}>
            Tap to float gently. Collect stars. Breathe deeply.
          </p>

          <div className="flex items-center justify-center gap-2">
            <Heart className="w-4 h-4" style={{ color: '#EC4899' }} />
            <span className="text-xs" style={{ fontFamily: 'Inter, sans-serif', color: '#9D174D', fontWeight: 600 }}>
              {breathCount} breaths
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
