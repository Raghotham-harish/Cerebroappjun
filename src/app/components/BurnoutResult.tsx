import { useEffect } from "react";
import { useBurnout } from "../contexts/BurnoutContext";
import { AlertCircle, CheckCircle, TrendingUp, Calendar } from "lucide-react";

interface BurnoutResultProps {
  onContinue: () => void;
  onViewAnalytics: () => void;
  onBookCoach: () => void;
}

export function BurnoutResult({ onContinue, onViewAnalytics, onBookCoach }: BurnoutResultProps) {
  const { getLatestAssessment } = useBurnout();
  const assessment = getLatestAssessment();

  // Auto-navigate for low risk after 3 seconds
  useEffect(() => {
    if (assessment?.overallRisk === 'low') {
      const timer = setTimeout(() => {
        onContinue();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [assessment, onContinue]);

  if (!assessment) {
    return null;
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return '#EF4444';
      case 'moderate': return '#F59E0B';
      default: return '#10B981';
    }
  };

  const getRiskLabel = (risk: string) => {
    switch (risk) {
      case 'high': return 'High Burnout Risk';
      case 'moderate': return 'Moderate Risk';
      default: return 'Low Risk';
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'high': return AlertCircle;
      case 'moderate': return TrendingUp;
      default: return CheckCircle;
    }
  };

  const getRecommendations = (risk: string) => {
    if (risk === 'high') {
      return [
        'Consider speaking with a mental health professional',
        'Take immediate steps to reduce workload where possible',
        'Practice daily stress management techniques',
        'Discuss workload concerns with your manager',
        'Schedule regular breaks throughout your day'
      ];
    } else if (risk === 'moderate') {
      return [
        'Monitor your stress levels regularly',
        'Establish healthy work-life boundaries',
        'Practice mindfulness or meditation',
        'Ensure adequate sleep and rest',
        'Connect with supportive colleagues or friends'
      ];
    } else {
      return [
        'Continue your current wellness practices',
        'Stay mindful of early warning signs',
        'Maintain work-life balance',
        'Support colleagues who may be struggling'
      ];
    }
  };

  const getSectionLabel = (section: string, score: number) => {
    if (section === 'A') {
      if (score <= 17) return 'Low';
      if (score <= 29) return 'Moderate';
      return 'High';
    } else if (section === 'B') {
      if (score <= 5) return 'Low';
      if (score <= 11) return 'Moderate';
      return 'High';
    } else {
      if (score >= 40) return 'Good';
      if (score >= 34) return 'Moderate';
      return 'At Risk';
    }
  };

  const Icon = getRiskIcon(assessment.overallRisk);
  const recommendations = getRecommendations(assessment.overallRisk);
  const riskColor = getRiskColor(assessment.overallRisk);

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex-1 overflow-y-auto px-4">
        <div className="max-w-2xl mx-auto py-4">
          {/* Result Header */}
          <div className="text-center mb-4">
            <h2
              className="text-2xl mb-2"
              style={{
                fontFamily: 'Lora, serif',
                fontWeight: 500,
                color: '#15113C'
              }}
            >
              Assessment Complete
            </h2>
            <p
              className="text-sm"
              style={{
                fontFamily: 'Inter, sans-serif',
                color: '#6B7280'
              }}
            >
              Here's your burnout assessment result
            </p>
          </div>

          {/* Overall Risk Card */}
          <div
            className="p-4 rounded-3xl mb-3 text-center"
            style={{
              background: 'white',
              border: `2px solid ${riskColor}`
            }}
          >
            <div
              className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center"
              style={{ background: `${riskColor}20` }}
            >
              <Icon className="w-8 h-8" style={{ color: riskColor }} />
            </div>
            <p
              className="text-xl mb-1"
              style={{
                fontFamily: 'Lora, serif',
                fontWeight: 600,
                color: riskColor
              }}
            >
              {getRiskLabel(assessment.overallRisk)}
            </p>
            <p
              className="text-xs"
              style={{
                fontFamily: 'Inter, sans-serif',
                color: '#9CA3AF'
              }}
            >
              Based on your responses
            </p>
          </div>

          {/* Section Scores */}
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
              Detailed Scores
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
                    <span
                      className="text-xs"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        color: '#15113C',
                        fontWeight: 600
                      }}
                    >
                      {assessment.sectionA}/42
                    </span>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        background: assessment.sectionA >= 30 ? '#FEE2E2' : assessment.sectionA >= 18 ? '#FEF3C7' : '#D1FAE5',
                        color: assessment.sectionA >= 30 ? '#DC2626' : assessment.sectionA >= 18 ? '#D97706' : '#059669',
                        fontWeight: 600
                      }}
                    >
                      {getSectionLabel('A', assessment.sectionA)}
                    </span>
                  </div>
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
                    <span
                      className="text-xs"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        color: '#15113C',
                        fontWeight: 600
                      }}
                    >
                      {assessment.sectionB}/42
                    </span>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        background: assessment.sectionB >= 12 ? '#FEE2E2' : assessment.sectionB >= 6 ? '#FEF3C7' : '#D1FAE5',
                        color: assessment.sectionB >= 12 ? '#DC2626' : assessment.sectionB >= 6 ? '#D97706' : '#059669',
                        fontWeight: 600
                      }}
                    >
                      {getSectionLabel('B', assessment.sectionB)}
                    </span>
                  </div>
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
                    <span
                      className="text-xs"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        color: '#15113C',
                        fontWeight: 600
                      }}
                    >
                      {assessment.sectionC}/48
                    </span>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        background: assessment.sectionC <= 33 ? '#FEE2E2' : assessment.sectionC <= 39 ? '#FEF3C7' : '#D1FAE5',
                        color: assessment.sectionC <= 33 ? '#DC2626' : assessment.sectionC <= 39 ? '#D97706' : '#059669',
                        fontWeight: 600
                      }}
                    >
                      {getSectionLabel('C', assessment.sectionC)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recommendations */}
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
              Recommendations
            </h3>

            <ul className="space-y-2">
              {recommendations.map((rec, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-xs"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    color: '#6B7280'
                  }}
                >
                  <span
                    className="w-1 h-1 rounded-full flex-shrink-0 mt-1.5"
                    style={{ background: '#8B5CF6' }}
                  />
                  {rec}
                </li>
              ))}
            </ul>
          </div>

          {/* High Risk - Coach Booking */}
          {assessment.overallRisk === 'high' && (
            <div
              className="p-4 rounded-3xl mb-3"
              style={{
                background: 'white',
                border: '2px solid #8B5CF6'
              }}
            >
              <div className="flex items-start gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: '#EDE9FE' }}
                >
                  <Calendar className="w-5 h-5" style={{ color: '#8B5CF6' }} />
                </div>
                <div className="flex-1">
                  <h3
                    className="text-sm mb-1"
                    style={{
                      fontFamily: 'Lora, serif',
                      fontWeight: 500,
                      color: '#15113C'
                    }}
                  >
                    Professional Support Available
                  </h3>
                  <p
                    className="text-xs"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      color: '#6B7280'
                    }}
                  >
                    Connect with a certified coach or therapist for personalized support
                  </p>
                </div>
              </div>

              <button
                onClick={onBookCoach}
                className="w-full py-2 rounded-2xl"
                style={{
                  background: 'linear-gradient(135deg, #A78BFA 0%, #8B5CF6 100%)',
                  color: 'white',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  fontSize: '14px'
                }}
              >
                Book a Session
              </button>
            </div>
          )}

          {/* View Analytics Button */}
          <button
            onClick={onViewAnalytics}
            className="w-full py-2 rounded-2xl mb-3"
            style={{
              background: 'transparent',
              border: '2px solid #8B5CF6',
              color: '#8B5CF6',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: '14px'
            }}
          >
            View Detailed Analytics
          </button>

          <div className="pb-4" />
        </div>
      </div>

      {/* Continue Button (only show for moderate/low risk or after delay for high) */}
      {(assessment.overallRisk !== 'high' || assessment.overallRisk === 'low') && (
        <div
          className="flex-shrink-0 px-4 py-3"
          style={{
            background: 'linear-gradient(180deg, rgba(250, 245, 255, 0.8) 0%, rgba(250, 245, 255, 1) 100%)',
            borderTop: '1px solid rgba(229, 231, 235, 0.3)'
          }}
        >
          <div className="max-w-2xl mx-auto">
            <button
              onClick={onContinue}
              className="w-full py-3 rounded-full"
              style={{
                background: 'linear-gradient(135deg, #A78BFA 0%, #8B5CF6 100%)',
                color: 'white',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: '15px'
              }}
            >
              {assessment.overallRisk === 'low' ? 'Returning to chat...' : 'Continue'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
