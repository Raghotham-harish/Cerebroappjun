import { useBurnout } from "../contexts/BurnoutContext";
import { TrendingUp, TrendingDown, Minus, AlertCircle, CheckCircle } from "lucide-react";

export function BurnoutAnalytics() {
  const { assessmentHistory } = useBurnout();

  if (assessmentHistory.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
          style={{ background: '#EDE9FE' }}
        >
          <AlertCircle className="w-10 h-10" style={{ color: '#8B5CF6' }} />
        </div>
        <h3
          className="text-xl mb-2 text-center"
          style={{
            fontFamily: 'Lora, serif',
            fontWeight: 500,
            color: '#15113C'
          }}
        >
          No Assessment Data
        </h3>
        <p
          className="text-sm text-center"
          style={{
            fontFamily: 'Inter, sans-serif',
            color: '#6B7280'
          }}
        >
          Complete your first burnout assessment to see analytics here
        </p>
      </div>
    );
  }

  const latestAssessment = assessmentHistory[assessmentHistory.length - 1];
  const previousAssessment = assessmentHistory.length > 1 ? assessmentHistory[assessmentHistory.length - 2] : null;

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return '#EF4444';
      case 'moderate': return '#F59E0B';
      default: return '#10B981';
    }
  };

  const getRiskLabel = (risk: string) => {
    switch (risk) {
      case 'high': return 'High Risk';
      case 'moderate': return 'Moderate Risk';
      default: return 'Low Risk';
    }
  };

  const getTrendIcon = (current: number, previous: number | null, isReverse = false) => {
    if (previous === null) return Minus;

    if (isReverse) {
      // For Section C (Personal Achievement), higher is better
      if (current > previous) return TrendingUp;
      if (current < previous) return TrendingDown;
    } else {
      // For Sections A & B, lower is better
      if (current < previous) return TrendingUp;
      if (current > previous) return TrendingDown;
    }

    return Minus;
  };

  const getTrendColor = (current: number, previous: number | null, isReverse = false) => {
    if (previous === null) return '#6B7280';

    if (isReverse) {
      if (current > previous) return '#10B981';
      if (current < previous) return '#EF4444';
    } else {
      if (current < previous) return '#10B981';
      if (current > previous) return '#EF4444';
    }

    return '#6B7280';
  };

  const getRiskDistribution = () => {
    const distribution = { low: 0, moderate: 0, high: 0 };
    assessmentHistory.forEach(a => {
      distribution[a.overallRisk]++;
    });
    const total = assessmentHistory.length;
    return {
      low: Math.round((distribution.low / total) * 100),
      moderate: Math.round((distribution.moderate / total) * 100),
      high: Math.round((distribution.high / total) * 100)
    };
  };

  const distribution = getRiskDistribution();

  const sectionATrendIcon = getTrendIcon(latestAssessment.sectionA, previousAssessment?.sectionA);
  const sectionBTrendIcon = getTrendIcon(latestAssessment.sectionB, previousAssessment?.sectionB);
  const sectionCTrendIcon = getTrendIcon(latestAssessment.sectionC, previousAssessment?.sectionC, true);

  const sectionATrendColor = getTrendColor(latestAssessment.sectionA, previousAssessment?.sectionA);
  const sectionBTrendColor = getTrendColor(latestAssessment.sectionB, previousAssessment?.sectionB);
  const sectionCTrendColor = getTrendColor(latestAssessment.sectionC, previousAssessment?.sectionC, true);

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex-1 overflow-y-auto px-4">
        <div className="max-w-2xl mx-auto py-4">
          {/* Header */}
          <div className="mb-4">
            <h2
              className="text-2xl mb-1"
              style={{
                fontFamily: 'Lora, serif',
                fontWeight: 500,
                color: '#15113C'
              }}
            >
              Burnout Analytics
            </h2>
            <p
              className="text-sm"
              style={{
                fontFamily: 'Inter, sans-serif',
                color: '#6B7280'
              }}
            >
              Track your burnout risk over time
            </p>
          </div>

          {/* Current Status Card */}
          <div
            className="p-4 rounded-3xl mb-3"
            style={{
              background: 'white',
              border: `2px solid ${getRiskColor(latestAssessment.overallRisk)}`
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <p
                  className="text-xs mb-1"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    color: '#9CA3AF',
                    fontWeight: 600
                  }}
                >
                  CURRENT STATUS
                </p>
                <p
                  className="text-xl"
                  style={{
                    fontFamily: 'Lora, serif',
                    fontWeight: 600,
                    color: getRiskColor(latestAssessment.overallRisk)
                  }}
                >
                  {getRiskLabel(latestAssessment.overallRisk)}
                </p>
              </div>
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: `${getRiskColor(latestAssessment.overallRisk)}20` }}
              >
                <CheckCircle className="w-6 h-6" style={{ color: getRiskColor(latestAssessment.overallRisk) }} />
              </div>
            </div>
            <p
              className="text-xs"
              style={{
                fontFamily: 'Inter, sans-serif',
                color: '#6B7280'
              }}
            >
              Last assessed: {new Date(latestAssessment.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit'
              })}
            </p>
          </div>

          {/* Section Scores with Trends */}
          <div
            className="p-4 rounded-3xl mb-3"
            style={{
              background: 'white',
              border: '2px solid #E5E7EB'
            }}
          >
            <h3
              className="text-sm mb-3"
              style={{
                fontFamily: 'Lora, serif',
                fontWeight: 500,
                color: '#15113C'
              }}
            >
              Section Breakdown
            </h3>

            <div className="space-y-3">
              {/* Emotional Exhaustion */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span
                    className="text-xs"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      color: '#6B7280',
                      fontWeight: 500
                    }}
                  >
                    Emotional Exhaustion
                  </span>
                  <div className="flex items-center gap-2">
                    {previousAssessment && (
                      <div className="flex items-center gap-1">
                        {(() => {
                          const Icon = sectionATrendIcon;
                          return <Icon className="w-3 h-3" style={{ color: sectionATrendColor }} />;
                        })()}
                        <span
                          className="text-xs"
                          style={{
                            fontFamily: 'Inter, sans-serif',
                            color: sectionATrendColor,
                            fontWeight: 600
                          }}
                        >
                          {Math.abs(latestAssessment.sectionA - previousAssessment.sectionA)}
                        </span>
                      </div>
                    )}
                    <span
                      className="text-xs"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        color: '#15113C',
                        fontWeight: 600
                      }}
                    >
                      {latestAssessment.sectionA}/42
                    </span>
                  </div>
                </div>
                <div className="h-2 rounded-full" style={{ background: '#F3F4F6' }}>
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${(latestAssessment.sectionA / 42) * 100}%`,
                      background: latestAssessment.sectionA >= 30 ? '#EF4444' : latestAssessment.sectionA >= 18 ? '#F59E0B' : '#10B981'
                    }}
                  />
                </div>
              </div>

              {/* Apathy/Cynicism */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span
                    className="text-xs"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      color: '#6B7280',
                      fontWeight: 500
                    }}
                  >
                    Apathy / Cynicism
                  </span>
                  <div className="flex items-center gap-2">
                    {previousAssessment && (
                      <div className="flex items-center gap-1">
                        {(() => {
                          const Icon = sectionBTrendIcon;
                          return <Icon className="w-3 h-3" style={{ color: sectionBTrendColor }} />;
                        })()}
                        <span
                          className="text-xs"
                          style={{
                            fontFamily: 'Inter, sans-serif',
                            color: sectionBTrendColor,
                            fontWeight: 600
                          }}
                        >
                          {Math.abs(latestAssessment.sectionB - (previousAssessment?.sectionB || 0))}
                        </span>
                      </div>
                    )}
                    <span
                      className="text-xs"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        color: '#15113C',
                        fontWeight: 600
                      }}
                    >
                      {latestAssessment.sectionB}/42
                    </span>
                  </div>
                </div>
                <div className="h-2 rounded-full" style={{ background: '#F3F4F6' }}>
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${(latestAssessment.sectionB / 42) * 100}%`,
                      background: latestAssessment.sectionB >= 12 ? '#EF4444' : latestAssessment.sectionB >= 6 ? '#F59E0B' : '#10B981'
                    }}
                  />
                </div>
              </div>

              {/* Personal Achievement */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span
                    className="text-xs"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      color: '#6B7280',
                      fontWeight: 500
                    }}
                  >
                    Personal Achievement
                  </span>
                  <div className="flex items-center gap-2">
                    {previousAssessment && (
                      <div className="flex items-center gap-1">
                        {(() => {
                          const Icon = sectionCTrendIcon;
                          return <Icon className="w-3 h-3" style={{ color: sectionCTrendColor }} />;
                        })()}
                        <span
                          className="text-xs"
                          style={{
                            fontFamily: 'Inter, sans-serif',
                            color: sectionCTrendColor,
                            fontWeight: 600
                          }}
                        >
                          {Math.abs(latestAssessment.sectionC - (previousAssessment?.sectionC || 0))}
                        </span>
                      </div>
                    )}
                    <span
                      className="text-xs"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        color: '#15113C',
                        fontWeight: 600
                      }}
                    >
                      {latestAssessment.sectionC}/48
                    </span>
                  </div>
                </div>
                <div className="h-2 rounded-full" style={{ background: '#F3F4F6' }}>
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${(latestAssessment.sectionC / 48) * 100}%`,
                      background: latestAssessment.sectionC <= 33 ? '#EF4444' : latestAssessment.sectionC <= 39 ? '#F59E0B' : '#10B981'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Risk Distribution */}
          <div
            className="p-4 rounded-3xl mb-3"
            style={{
              background: 'linear-gradient(135deg, #FAF5FF 0%, #EDE9FE 100%)',
              border: '2px solid #C4B5FD'
            }}
          >
            <h3
              className="text-sm mb-3"
              style={{
                fontFamily: 'Lora, serif',
                fontWeight: 500,
                color: '#15113C'
              }}
            >
              Risk Distribution
            </h3>
            <p
              className="text-xs mb-3"
              style={{
                fontFamily: 'Inter, sans-serif',
                color: '#6B7280'
              }}
            >
              Based on {assessmentHistory.length} assessment{assessmentHistory.length > 1 ? 's' : ''}
            </p>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: '#10B981' }} />
                  <span
                    className="text-xs"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      color: '#15113C',
                      fontWeight: 500
                    }}
                  >
                    Low Risk
                  </span>
                </div>
                <span
                  className="text-xs"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    color: '#15113C',
                    fontWeight: 600
                  }}
                >
                  {distribution.low}%
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: '#F59E0B' }} />
                  <span
                    className="text-xs"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      color: '#15113C',
                      fontWeight: 500
                    }}
                  >
                    Moderate Risk
                  </span>
                </div>
                <span
                  className="text-xs"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    color: '#15113C',
                    fontWeight: 600
                  }}
                >
                  {distribution.moderate}%
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: '#EF4444' }} />
                  <span
                    className="text-xs"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      color: '#15113C',
                      fontWeight: 500
                    }}
                  >
                    High Risk
                  </span>
                </div>
                <span
                  className="text-xs"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    color: '#15113C',
                    fontWeight: 600
                  }}
                >
                  {distribution.high}%
                </span>
              </div>
            </div>
          </div>

          {/* Assessment History */}
          <div
            className="p-4 rounded-3xl mb-3"
            style={{
              background: 'white',
              border: '2px solid #E5E7EB'
            }}
          >
            <h3
              className="text-sm mb-3"
              style={{
                fontFamily: 'Lora, serif',
                fontWeight: 500,
                color: '#15113C'
              }}
            >
              Assessment History
            </h3>

            <div className="space-y-2">
              {[...assessmentHistory].reverse().map((assessment, index) => (
                <div
                  key={assessment.id}
                  className="p-3 rounded-2xl"
                  style={{
                    background: index === 0 ? '#F9FAFB' : 'transparent',
                    border: `1px solid ${index === 0 ? '#E5E7EB' : 'transparent'}`
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p
                        className="text-xs mb-1"
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          color: '#6B7280',
                          fontWeight: 500
                        }}
                      >
                        {new Date(assessment.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                        {index === 0 && (
                          <span
                            className="ml-2 px-2 py-0.5 rounded-full text-xs"
                            style={{
                              background: '#EDE9FE',
                              color: '#8B5CF6',
                              fontWeight: 600
                            }}
                          >
                            Latest
                          </span>
                        )}
                      </p>
                      <div className="flex items-center gap-3">
                        <span
                          className="text-xs"
                          style={{
                            fontFamily: 'Inter, sans-serif',
                            color: '#9CA3AF'
                          }}
                        >
                          A: {assessment.sectionA}
                        </span>
                        <span
                          className="text-xs"
                          style={{
                            fontFamily: 'Inter, sans-serif',
                            color: '#9CA3AF'
                          }}
                        >
                          B: {assessment.sectionB}
                        </span>
                        <span
                          className="text-xs"
                          style={{
                            fontFamily: 'Inter, sans-serif',
                            color: '#9CA3AF'
                          }}
                        >
                          C: {assessment.sectionC}
                        </span>
                      </div>
                    </div>
                    <span
                      className="text-xs px-3 py-1 rounded-full"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        background: `${getRiskColor(assessment.overallRisk)}15`,
                        color: getRiskColor(assessment.overallRisk),
                        fontWeight: 600
                      }}
                    >
                      {getRiskLabel(assessment.overallRisk)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pb-4" />
        </div>
      </div>
    </div>
  );
}
