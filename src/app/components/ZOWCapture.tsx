import { useState, useRef } from "react";

interface ZOWCaptureProps {
  userName: string;
  onComplete: (zowLevel: number) => void;
}

interface TapPoint {
  x: number;
  y: number;
  score: number;
  color: string;
}

export function ZOWCapture({ userName, onComplete }: ZOWCaptureProps) {
  const [tapPoint, setTapPoint] = useState<TapPoint | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const getScoreFromPosition = (y: number, canvasHeight: number): number => {
    // Divide canvas vertically into 7 zones (1-7), bottom to top
    // Invert so bottom = 1, top = 7
    const scoreFloat = ((canvasHeight - y) / canvasHeight) * 7;
    return Math.max(1, Math.min(7, Math.ceil(scoreFloat)));
  };

  const getColorForScore = (score: number): string => {
    if (score >= 6) return '#10B981'; // Excellent/High
    if (score >= 4) return '#34D399'; // Good
    if (score >= 3) return '#FBBF24'; // Moderate
    if (score >= 2) return '#FB923C'; // Low
    return '#F87171'; // Very Low
  };

  const getCurrentTimePosition = (): number => {
    // Get current time and calculate position (0-100%)
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const totalMinutes = hours * 60 + minutes;

    // Map 0-1440 minutes (24 hours) to 0-100%
    return (totalMinutes / 1440) * 100;
  };

  const handleCanvasTap = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    let clientX: number;
    let clientY: number;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const score = getScoreFromPosition(y, rect.height);
    const color = getColorForScore(score);

    setTapPoint({
      x: getCurrentTimePosition(), // Auto-map to current time (horizontal position)
      y: ((rect.height - y) / rect.height) * 100, // Convert to percentage (wellness score position, inverted)
      score,
      color
    });
  };

  const handleSubmit = () => {
    if (tapPoint) {
      onComplete(tapPoint.score);
    }
  };

  const getZoneLabel = (score: number): string => {
    if (score >= 6) return 'Zone of Wellbeing';
    if (score >= 3) return 'Zone of Well Being';
    return 'Zone of Ill Being';
  };

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex-1 overflow-y-auto px-4">
        <div className="max-w-2xl mx-auto py-4">
          {/* Question */}
          <div className="mb-4 text-center">
            <h2
              className="text-xl mb-1"
              style={{
                fontFamily: 'Lora, serif',
                fontWeight: 500,
                color: '#15113C'
              }}
            >
              Welcome back, {userName}
            </h2>
            <p
              className="text-sm mb-1"
              style={{
                fontFamily: 'Inter, sans-serif',
                color: '#6B7280'
              }}
            >
              How are you feeling today?
            </p>
            <p
              className="text-xs"
              style={{
                fontFamily: 'Inter, sans-serif',
                color: '#9CA3AF',
                fontStyle: 'italic'
              }}
            >
              Tap on the canvas at{' '}
              <span style={{ color: '#8B5CF6', fontWeight: 600 }}>
                {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
              </span>
            </p>
          </div>

          {/* Interactive Canvas */}
          <div className="mb-3">
            {/* TODAY label */}
            <div className="mb-2 ml-14">
              <span
                className="text-xs"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  color: '#6B7280',
                  fontWeight: 600,
                  letterSpacing: '0.1em'
                }}
              >
                TODAY
              </span>
            </div>

            <div className="flex items-start">
              {/* Wellness Labels on Left (outside canvas) */}
              <div className="flex flex-col justify-between mr-2" style={{ height: '300px', paddingTop: '8px', paddingBottom: '8px' }}>
                <span className="text-xs text-right" style={{ fontFamily: 'Inter, sans-serif', color: '#6B7280', fontWeight: 600, width: '45px' }}>
                  HIGH
                </span>
                <span className="text-xs text-right" style={{ fontFamily: 'Inter, sans-serif', color: '#6B7280', fontWeight: 600, width: '45px' }}>
                  (6-7)
                </span>
                <span className="text-xs text-right" style={{ fontFamily: 'Inter, sans-serif', color: '#6B7280', fontWeight: 600, width: '45px' }}>
                  MOD
                </span>
                <span className="text-xs text-right" style={{ fontFamily: 'Inter, sans-serif', color: '#6B7280', fontWeight: 600, width: '45px' }}>
                  (3-5)
                </span>
                <span className="text-xs text-right" style={{ fontFamily: 'Inter, sans-serif', color: '#6B7280', fontWeight: 600, width: '45px' }}>
                  LOW
                </span>
                <span className="text-xs text-right" style={{ fontFamily: 'Inter, sans-serif', color: '#6B7280', fontWeight: 600, width: '45px' }}>
                  (1-2)
                </span>
              </div>

              <div className="flex-1">
                {/* Canvas */}
                <div
                  ref={canvasRef}
                  onClick={handleCanvasTap}
                  onTouchStart={handleCanvasTap}
                  className="relative rounded-3xl cursor-pointer border-2 overflow-hidden"
                  style={{
                    height: '300px',
                    background: 'linear-gradient(to top, #FEE2E2 0%, #FEF3C7 33%, #D1FAE5 66%, #D1FAE5 100%)',
                    borderColor: '#E5E7EB'
                  }}
                >
                  {/* Subtle Grid Lines */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.4 }}>
                    {/* Horizontal wellness zone dividers */}
                    <line x1="0" y1="33.33%" x2="100%" y2="33.33%" stroke="#9CA3AF" strokeWidth="1" strokeDasharray="4,4" />
                    <line x1="0" y1="66.66%" x2="100%" y2="66.66%" stroke="#9CA3AF" strokeWidth="1" strokeDasharray="4,4" />

                    {/* Vertical time grids */}
                    <line x1="25%" y1="0" x2="25%" y2="100%" stroke="#8B5CF6" strokeWidth="1" strokeDasharray="3,3" />
                    <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#8B5CF6" strokeWidth="1" strokeDasharray="3,3" />
                    <line x1="75%" y1="0" x2="75%" y2="100%" stroke="#8B5CF6" strokeWidth="1" strokeDasharray="3,3" />
                  </svg>

                  {/* Current Time Indicator Line */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 pointer-events-none"
                    style={{
                      left: `${getCurrentTimePosition()}%`,
                      background: 'linear-gradient(to bottom, transparent 0%, #8B5CF6 50%, transparent 100%)',
                      opacity: 0.4
                    }}
                  />

                  {/* Tap Point */}
                  {tapPoint && (
                    <div
                      className="absolute w-6 h-6 rounded-full border-4 border-white shadow-lg transition-all duration-300 animate-pulse"
                      style={{
                        left: `${tapPoint.x}%`,
                        top: `${100 - tapPoint.y}%`,
                        transform: 'translate(-50%, -50%)',
                        background: tapPoint.color
                      }}
                    />
                  )}
                </div>

                {/* Time Labels on Bottom */}
                <div className="flex items-center justify-between mt-2">
                  <span
                    className="text-xs text-center flex-1"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      color: '#8B5CF6',
                      fontWeight: 600
                    }}
                  >
                    00:00
                  </span>
                  <span
                    className="text-xs text-center flex-1"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      color: '#8B5CF6',
                      fontWeight: 600
                    }}
                  >
                    06:00
                  </span>
                  <span
                    className="text-xs text-center flex-1"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      color: '#8B5CF6',
                      fontWeight: 600
                    }}
                  >
                    12:00
                  </span>
                  <span
                    className="text-xs text-center flex-1"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      color: '#8B5CF6',
                      fontWeight: 600
                    }}
                  >
                    18:00
                  </span>
                  <span
                    className="text-xs text-center flex-1"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      color: '#6B7280',
                      fontWeight: 600
                    }}
                  >
                    24:00
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Selected Score Display */}
          {tapPoint && (
            <div
              className="p-3 rounded-3xl mb-3"
              style={{
                background: 'white',
                border: '2px solid #E5E7EB'
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: tapPoint.color }}
                >
                  <span
                    className="text-2xl"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 700,
                      color: 'white'
                    }}
                  >
                    {tapPoint.score}
                  </span>
                </div>
                <div className="flex-1">
                  <p
                    className="text-xs mb-0.5"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      color: '#9CA3AF'
                    }}
                  >
                    Your Wellness Score
                  </p>
                  <p
                    className="text-sm mb-0.5"
                    style={{
                      fontFamily: 'Lora, serif',
                      fontWeight: 500,
                      color: '#15113C'
                    }}
                  >
                    {getZoneLabel(tapPoint.score)}
                  </p>
                  <p
                    className="text-xs"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      color: '#8B5CF6',
                      fontWeight: 600
                    }}
                  >
                    {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="pb-4" />
        </div>
      </div>

      {/* Sticky Continue Button */}
      <div
        className="flex-shrink-0 px-4 py-3"
        style={{
          background: 'linear-gradient(180deg, rgba(250, 245, 255, 0.8) 0%, rgba(250, 245, 255, 1) 100%)',
          borderTop: '1px solid rgba(229, 231, 235, 0.3)'
        }}
      >
        <div className="max-w-2xl mx-auto">
          <button
            onClick={handleSubmit}
            disabled={!tapPoint}
            className="w-full py-3 rounded-full transition-all disabled:opacity-40"
            style={{
              background: tapPoint
                ? 'linear-gradient(135deg, #A78BFA 0%, #8B5CF6 100%)'
                : '#E5E7EB',
              color: 'white',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: '15px',
              border: tapPoint ? 'none' : '2px solid #D1D5DB'
            }}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}