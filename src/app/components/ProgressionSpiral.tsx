import { AnimatedLogo } from "./AnimatedLogo";

interface PillarProgress {
  daily: number; // 0-100
  personal: number;
  spiritual: number;
  creative: number;
}

interface ProgressionSpiralProps {
  userName: string;
  progress: PillarProgress;
  totalPoints: number;
  onClose: () => void;
}

export function ProgressionSpiral({ userName, progress, totalPoints, onClose }: ProgressionSpiralProps) {
  const pillars = [
    {
      id: 'personal',
      label: 'Personal Development',
      subtitle: '(Strengthens)',
      angle: 0, // top
      color: '#3B82F6',
      progress: progress.personal
    },
    {
      id: 'daily',
      label: 'Daily Ritual',
      subtitle: '(Regulates)',
      angle: 90, // right
      color: '#F59E0B',
      progress: progress.daily
    },
    {
      id: 'creative',
      label: 'Creative Development',
      subtitle: '(Expands)',
      angle: 180, // bottom
      color: '#8B5CF6',
      progress: progress.creative
    },
    {
      id: 'spiritual',
      label: 'Spiritual Development',
      subtitle: '(Integrates)',
      angle: 270, // left
      color: '#10B981',
      progress: progress.spiritual
    }
  ];

  // Calculate overall maturity level
  const overallProgress = Math.round(
    (progress.daily + progress.personal + progress.spiritual + progress.creative) / 4
  );

  // Generate spiral path points
  const generateSpiralPoints = () => {
    const points: { x: number; y: number; pillar: string; color: string }[] = [];
    const centerX = 200;
    const centerY = 200;
    const maxRadius = 150;
    const spiralTurns = 2;

    pillars.forEach((pillar, index) => {
      const angleRad = (pillar.angle - 90) * (Math.PI / 180); // Adjust for SVG coordinate system
      const radius = maxRadius * (pillar.progress / 100);

      const x = centerX + radius * Math.cos(angleRad);
      const y = centerY + radius * Math.sin(angleRad);

      points.push({
        x,
        y,
        pillar: pillar.id,
        color: pillar.color
      });
    });

    return points;
  };

  const spiralPoints = generateSpiralPoints();

  return (
    <div
      className="h-screen flex flex-col overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #FAF5FF 0%, #EDE9FE 50%, #EBF8FF 100%)'
      }}
    >
      {/* Header */}
      <div className="flex-shrink-0 px-4 py-4 flex items-center justify-between border-b" style={{ borderColor: '#E5E7EB' }}>
        <button
          onClick={onClose}
          className="text-base"
          style={{
            fontFamily: 'Inter, sans-serif',
            color: '#8B5CF6',
            fontWeight: 600
          }}
        >
          ← Back
        </button>
        <h2
          className="text-xl"
          style={{
            fontFamily: 'Lora, serif',
            fontWeight: 500,
            color: '#15113C'
          }}
        >
          My Progress
        </h2>
        <div className="w-16" />
      </div>

      <div className="flex-1 overflow-y-auto px-4">
        <div className="max-w-2xl mx-auto py-6">
          {/* Header */}
          <div className="mb-6 text-center">
            <h3
              className="text-2xl mb-2"
              style={{
                fontFamily: 'Lora, serif',
                fontWeight: 500,
                color: '#15113C'
              }}
            >
              Psychological Maturity Progression
            </h3>
            <p
              className="text-base"
              style={{
                fontFamily: 'Inter, sans-serif',
                color: '#6B7280'
              }}
            >
              Your journey across the four pillars
            </p>
          </div>

          {/* Points Display */}
          <div
            className="p-6 rounded-3xl mb-6 text-center"
            style={{
              background: 'linear-gradient(135deg, #EDE9FE 0%, #E0E7FF 100%)',
              border: '2px solid #C4B5FD'
            }}
          >
            <p
              className="text-sm mb-2"
              style={{
                fontFamily: 'Inter, sans-serif',
                color: '#8B5CF6',
                fontWeight: 600
              }}
            >
              Total Points Earned
            </p>
            <p
              className="text-5xl mb-2"
              style={{
                fontFamily: 'Lora, serif',
                fontWeight: 700,
                color: '#15113C'
              }}
            >
              {totalPoints}
            </p>
            <p
              className="text-sm"
              style={{
                fontFamily: 'Inter, sans-serif',
                color: '#6B7280'
              }}
            >
              Overall Maturity: {overallProgress}%
            </p>
          </div>

          {/* Spiral Visualization */}
          <div
            className="p-6 rounded-3xl mb-6"
            style={{
              background: 'white',
              border: '2px solid #E5E7EB'
            }}
          >
            <svg width="400" height="400" viewBox="0 0 400 400" className="w-full">
              {/* Background circle */}
              <circle
                cx="200"
                cy="200"
                r="150"
                fill="none"
                stroke="#E5E7EB"
                strokeWidth="2"
                strokeDasharray="8,8"
              />

              {/* Pillar labels */}
              {pillars.map((pillar) => {
                const angleRad = (pillar.angle - 90) * (Math.PI / 180);
                const labelRadius = 180;
                const x = 200 + labelRadius * Math.cos(angleRad);
                const y = 200 + labelRadius * Math.sin(angleRad);

                return (
                  <g key={pillar.id}>
                    <text
                      x={x}
                      y={y - 10}
                      textAnchor="middle"
                      fontSize="14"
                      fill={pillar.color}
                      fontFamily="Lora, serif"
                      fontWeight="600"
                    >
                      {pillar.label}
                    </text>
                    <text
                      x={x}
                      y={y + 8}
                      textAnchor="middle"
                      fontSize="12"
                      fill="#6B7280"
                      fontFamily="Inter, sans-serif"
                    >
                      {pillar.subtitle}
                    </text>
                  </g>
                );
              })}

              {/* Spiral dots */}
              {spiralPoints.map((point, index) => (
                <circle
                  key={index}
                  cx={point.x}
                  cy={point.y}
                  r="20"
                  fill={point.color}
                  stroke="white"
                  strokeWidth="4"
                />
              ))}

              {/* Center circle */}
              <circle
                cx="200"
                cy="200"
                r="50"
                fill="white"
                stroke="#8B5CF6"
                strokeWidth="3"
              />
              <text
                x="200"
                y="195"
                textAnchor="middle"
                fontSize="12"
                fill="#8B5CF6"
                fontFamily="Inter, sans-serif"
                fontWeight="600"
              >
                Psychological
              </text>
              <text
                x="200"
                y="210"
                textAnchor="middle"
                fontSize="12"
                fill="#8B5CF6"
                fontFamily="Inter, sans-serif"
                fontWeight="600"
              >
                Maturity
              </text>
            </svg>
          </div>

          {/* Pillar Breakdown */}
          <div
            className="p-6 rounded-3xl"
            style={{
              background: 'white',
              border: '2px solid #E5E7EB'
            }}
          >
            <h4
              className="text-base mb-4"
              style={{
                fontFamily: 'Lora, serif',
                fontWeight: 600,
                color: '#15113C'
              }}
            >
              Pillar Breakdown
            </h4>

            <div className="space-y-4">
              {pillars.map((pillar) => (
                <div key={pillar.id}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ background: pillar.color }}
                      />
                      <span
                        className="text-sm"
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          color: '#15113C',
                          fontWeight: 600
                        }}
                      >
                        {pillar.label}
                      </span>
                    </div>
                    <span
                      className="text-sm"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        color: pillar.color,
                        fontWeight: 700
                      }}
                    >
                      {pillar.progress}%
                    </span>
                  </div>
                  <div className="h-2 rounded-full" style={{ background: '#F3F4F6' }}>
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${pillar.progress}%`,
                        background: pillar.color
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pb-6" />
        </div>
      </div>
    </div>
  );
}
