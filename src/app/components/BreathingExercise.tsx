import { useState, useEffect } from "react";
import { RefreshCw } from "lucide-react";

interface BreathingExerciseProps {
  onComplete: () => void;
  onSwitch: () => void;
}

export function BreathingExercise({ onComplete, onSwitch }: BreathingExerciseProps) {
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale' | 'rest'>('inhale');
  const [count, setCount] = useState(4);
  const [round, setRound] = useState(1);
  const totalRounds = 3;

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev > 1) return prev - 1;
        
        // Move to next phase
        if (phase === 'inhale') {
          setPhase('hold');
          return 4;
        } else if (phase === 'hold') {
          setPhase('exhale');
          return 4;
        } else if (phase === 'exhale') {
          setPhase('rest');
          return 2;
        } else {
          // Rest phase done, move to next round
          if (round < totalRounds) {
            setRound(round + 1);
            setPhase('inhale');
            return 4;
          } else {
            // Exercise complete
            clearInterval(timer);
            setTimeout(() => onComplete(), 500);
            return 0;
          }
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [phase, round, onComplete]);

  const getPhaseText = () => {
    switch (phase) {
      case 'inhale': return 'Breathe In';
      case 'hold': return 'Hold';
      case 'exhale': return 'Breathe Out';
      case 'rest': return 'Rest';
    }
  };

  const getPhaseColor = () => {
    switch (phase) {
      case 'inhale': return '#10B981';
      case 'hold': return '#06B6D4';
      case 'exhale': return '#8B5CF6';
      case 'rest': return '#F59E0B';
    }
  };

  const getCircleScale = () => {
    switch (phase) {
      case 'inhale': return 1.5;
      case 'hold': return 1.5;
      case 'exhale': return 0.8;
      case 'rest': return 1;
    }
  };

  return (
    <div 
      className="fixed inset-0 flex flex-col items-center justify-center"
      style={{ 
        background: 'linear-gradient(135deg, #F0FDF4 0%, #ECFDF5 100%)',
        zIndex: 1000
      }}
    >
      {/* Round Counter */}
      <div className="absolute top-8">
        <p 
          className="text-sm"
          style={{ 
            fontFamily: 'Inter, sans-serif',
            color: '#6B7280'
          }}
        >
          Round {round} of {totalRounds}
        </p>
      </div>

      {/* Breathing Circle */}
      <div className="relative flex items-center justify-center mb-12">
        <div 
          className="rounded-full transition-all duration-1000 ease-in-out flex items-center justify-center"
          style={{
            width: '200px',
            height: '200px',
            background: getPhaseColor(),
            transform: `scale(${getCircleScale()})`,
            opacity: 0.9
          }}
        >
          <div className="text-center">
            <p 
              className="text-5xl mb-2"
              style={{ 
                fontFamily: 'Lora, serif',
                fontWeight: 600,
                color: 'white'
              }}
            >
              {count}
            </p>
            <p 
              className="text-lg"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                color: 'white',
                fontWeight: 500
              }}
            >
              {getPhaseText()}
            </p>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="text-center px-6">
        <p 
          className="text-base mb-2"
          style={{ 
            fontFamily: 'Lora, serif',
            color: '#15113C'
          }}
        >
          Follow the circle's rhythm
        </p>
        <p 
          className="text-sm"
          style={{ 
            fontFamily: 'Inter, sans-serif',
            color: '#6B7280'
          }}
        >
          Let your breath guide you to calm
        </p>
      </div>

      {/* Action Buttons */}
      <div className="absolute bottom-8 flex gap-3">
        <button
          onClick={onSwitch}
          className="px-6 py-3 rounded-full flex items-center gap-2"
          style={{
            background: 'white',
            border: '2px solid #D1FAE5',
            fontFamily: 'Inter, sans-serif',
            color: '#047857',
            fontSize: '14px',
            fontWeight: 500
          }}
        >
          <RefreshCw className="w-4 h-4" />
          Switch Activity
        </button>
        <button
          onClick={onComplete}
          className="px-6 py-3 rounded-full"
          style={{
            background: 'linear-gradient(135deg, #34D399 0%, #10B981 100%)',
            fontFamily: 'Inter, sans-serif',
            color: 'white',
            fontSize: '14px',
            fontWeight: 600,
            border: 'none'
          }}
        >
          Complete
        </button>
      </div>
    </div>
  );
}