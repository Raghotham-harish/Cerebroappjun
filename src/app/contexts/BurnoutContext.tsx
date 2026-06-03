import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface BurnoutResponse {
  questionId: number;
  value: number;
  timestamp: string;
}

interface BurnoutAssessment {
  id: string;
  date: string;
  sectionA: number; // Emotional Exhaustion
  sectionB: number; // Apathy/Cynicism
  sectionC: number; // Personal Achievement
  overallRisk: 'low' | 'moderate' | 'high';
  responses: BurnoutResponse[];
}

interface BurnoutContextType {
  currentResponses: BurnoutResponse[];
  assessmentHistory: BurnoutAssessment[];
  currentQuestionIndex: number;
  addResponse: (questionId: number, value: number) => void;
  completeAssessment: () => BurnoutAssessment;
  resetAssessment: () => void;
  setQuestionIndex: (index: number) => void;
  getLatestAssessment: () => BurnoutAssessment | null;
}

const BurnoutContext = createContext<BurnoutContextType | undefined>(undefined);

export function BurnoutProvider({ children }: { children: ReactNode }) {
  const [currentResponses, setCurrentResponses] = useState<BurnoutResponse[]>([]);
  const [assessmentHistory, setAssessmentHistory] = useState<BurnoutAssessment[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Calculate scores for each section
  const calculateScores = (responses: BurnoutResponse[]) => {
    // Section A: Questions 1-7 (Emotional Exhaustion)
    const sectionA = responses
      .filter(r => r.questionId >= 1 && r.questionId <= 7)
      .reduce((sum, r) => sum + r.value, 0);

    // Section B: Questions 8-14 (Apathy/Cynicism)
    const sectionB = responses
      .filter(r => r.questionId >= 8 && r.questionId <= 14)
      .reduce((sum, r) => sum + r.value, 0);

    // Section C: Questions 15-22 (Personal Achievement)
    const sectionC = responses
      .filter(r => r.questionId >= 15 && r.questionId <= 22)
      .reduce((sum, r) => sum + r.value, 0);

    return { sectionA, sectionB, sectionC };
  };

  // Determine overall risk level
  const calculateRisk = (sectionA: number, sectionB: number, sectionC: number): 'low' | 'moderate' | 'high' => {
    const exhaustionHigh = sectionA >= 30;
    const apathyHigh = sectionB >= 12;
    const achievementLow = sectionC <= 33;

    // High risk: High exhaustion + High apathy + Low achievement
    if (exhaustionHigh && apathyHigh && achievementLow) {
      return 'high';
    }

    // Moderate risk: Any concerning combination
    if ((exhaustionHigh && apathyHigh) ||
        (exhaustionHigh && achievementLow) ||
        (apathyHigh && achievementLow)) {
      return 'moderate';
    }

    return 'low';
  };

  const addResponse = (questionId: number, value: number) => {
    const newResponse: BurnoutResponse = {
      questionId,
      value,
      timestamp: new Date().toISOString()
    };

    setCurrentResponses(prev => {
      // Replace if question already answered, otherwise add
      const filtered = prev.filter(r => r.questionId !== questionId);
      return [...filtered, newResponse];
    });
  };

  const completeAssessment = (): BurnoutAssessment => {
    const scores = calculateScores(currentResponses);
    const risk = calculateRisk(scores.sectionA, scores.sectionB, scores.sectionC);

    const assessment: BurnoutAssessment = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      sectionA: scores.sectionA,
      sectionB: scores.sectionB,
      sectionC: scores.sectionC,
      overallRisk: risk,
      responses: currentResponses
    };

    setAssessmentHistory(prev => [...prev, assessment]);
    setCurrentResponses([]);
    setCurrentQuestionIndex(0);

    return assessment;
  };

  const resetAssessment = () => {
    setCurrentResponses([]);
    setCurrentQuestionIndex(0);
  };

  const getLatestAssessment = (): BurnoutAssessment | null => {
    if (assessmentHistory.length === 0) return null;
    return assessmentHistory[assessmentHistory.length - 1];
  };

  const setQuestionIndex = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('cerebro_burnout_history');
    if (saved) {
      setAssessmentHistory(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage on changes
  useEffect(() => {
    localStorage.setItem('cerebro_burnout_history', JSON.stringify(assessmentHistory));
  }, [assessmentHistory]);

  const value: BurnoutContextType = {
    currentResponses,
    assessmentHistory,
    currentQuestionIndex,
    addResponse,
    completeAssessment,
    resetAssessment,
    setQuestionIndex,
    getLatestAssessment
  };

  return (
    <BurnoutContext.Provider value={value}>
      {children}
    </BurnoutContext.Provider>
  );
}

export function useBurnout() {
  const context = useContext(BurnoutContext);
  if (context === undefined) {
    throw new Error('useBurnout must be used within a BurnoutProvider');
  }
  return context;
}
