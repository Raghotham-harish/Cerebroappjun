import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Intent {
  id: string;
  text: string;
  category: 'daily' | 'personal' | 'spiritual' | 'creative';
  completed: boolean;
  progress: number;
  pointsEarned: number;
  createdAt: string;
  activities: Activity[];
}

interface Activity {
  id: string;
  type: 'chat' | 'journal' | 'tool' | 'voice';
  description: string;
  points: number;
  timestamp: string;
}

interface PillarProgress {
  daily: number;
  personal: number;
  spiritual: number;
  creative: number;
}

interface PointsContextType {
  totalPoints: number;
  currentStreak: number;
  intents: Intent[];
  pillarProgress: PillarProgress;
  streakMultiplier: number;
  addIntent: (intent: Omit<Intent, 'id' | 'completed' | 'progress' | 'pointsEarned' | 'createdAt' | 'activities'>) => void;
  addActivity: (intentId: string, activity: Omit<Activity, 'id' | 'timestamp' | 'points'>) => void;
  completeIntent: (intentId: string) => void;
  updateStreak: () => void;
  detectIntentFromText: (text: string) => { detected: boolean; intentId?: string; category?: string };
}

const PointsContext = createContext<PointsContextType | undefined>(undefined);

export function PointsProvider({ children }: { children: ReactNode }) {
  const [totalPoints, setTotalPoints] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [intents, setIntents] = useState<Intent[]>([]);
  const [lastActivityDate, setLastActivityDate] = useState<string>(new Date().toISOString().split('T')[0]);

  // Calculate streak multiplier
  const streakMultiplier = currentStreak >= 5 ? 2 : 1;

  // Calculate pillar progress (0-100%)
  const pillarProgress: PillarProgress = {
    daily: calculatePillarProgress('daily'),
    personal: calculatePillarProgress('personal'),
    spiritual: calculatePillarProgress('spiritual'),
    creative: calculatePillarProgress('creative')
  };

  function calculatePillarProgress(category: 'daily' | 'personal' | 'spiritual' | 'creative'): number {
    const categoryIntents = intents.filter(i => i.category === category);
    if (categoryIntents.length === 0) return 0;

    const totalProgress = categoryIntents.reduce((sum, intent) => sum + intent.progress, 0);
    return Math.min(100, Math.round(totalProgress / categoryIntents.length));
  }

  function addIntent(intentData: Omit<Intent, 'id' | 'completed' | 'progress' | 'pointsEarned' | 'createdAt' | 'activities'>) {
    const newIntent: Intent = {
      ...intentData,
      id: Date.now().toString(),
      completed: false,
      progress: 0,
      pointsEarned: 0,
      createdAt: new Date().toISOString(),
      activities: []
    };

    setIntents(prev => [...prev, newIntent]);
  }

  function addActivity(intentId: string, activityData: Omit<Activity, 'id' | 'timestamp' | 'points'>) {
    const basePoints = 5;
    const pointsAwarded = basePoints * streakMultiplier;

    const newActivity: Activity = {
      ...activityData,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      points: pointsAwarded
    };

    setIntents(prev => prev.map(intent => {
      if (intent.id === intentId) {
        const updatedActivities = [...intent.activities, newActivity];
        const newPointsEarned = intent.pointsEarned + pointsAwarded;
        const newProgress = Math.min(100, Math.round((updatedActivities.length / 5) * 100)); // 5 activities = 100%

        return {
          ...intent,
          activities: updatedActivities,
          pointsEarned: newPointsEarned,
          progress: newProgress
        };
      }
      return intent;
    }));

    setTotalPoints(prev => prev + pointsAwarded);

    // Update streak
    const today = new Date().toISOString().split('T')[0];
    if (today !== lastActivityDate) {
      setLastActivityDate(today);
    }
  }

  function completeIntent(intentId: string) {
    setIntents(prev => prev.map(intent => {
      if (intent.id === intentId && !intent.completed && intent.activities.length >= 3) {
        // Award 150+ bonus for completing intent with consistency
        const bonusPoints = 150;
        setTotalPoints(prevPoints => prevPoints + bonusPoints);

        return {
          ...intent,
          completed: true,
          progress: 100,
          pointsEarned: intent.pointsEarned + bonusPoints
        };
      }
      return intent;
    }));
  }

  function updateStreak() {
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    if (lastActivityDate === yesterday) {
      setCurrentStreak(prev => prev + 1);
    } else if (lastActivityDate !== today) {
      setCurrentStreak(0);
    }

    setLastActivityDate(today);
  }

  // Intent detection from text (AI-powered keyword matching)
  function detectIntentFromText(text: string): { detected: boolean; intentId?: string; category?: string } {
    const lowerText = text.toLowerCase();

    // Find matching intent based on keywords
    const keywords: Record<string, string[]> = {
      'productivity': ['productive', 'focus', 'work', 'task', 'deadline', 'efficient', 'organize'],
      'meditation': ['meditat', 'mindful', 'breath', 'calm', 'present', 'awareness'],
      'confidence': ['confident', 'believe', 'self-worth', 'assertive', 'courage'],
      'creativity': ['creative', 'imagine', 'art', 'design', 'innovate', 'idea'],
      'peace': ['peace', 'tranquil', 'serene', 'harmony', 'balance'],
      'habit': ['habit', 'routine', 'daily', 'regular', 'practice', 'consistency'],
      'anxiety': ['anxious', 'anxiety', 'worry', 'stress', 'nervous', 'overwhelm'],
      'sleep': ['sleep', 'rest', 'tired', 'insomnia', 'wake', 'dream']
    };

    for (const intent of intents) {
      const intentLower = intent.text.toLowerCase();

      // Check if text contains intent keywords
      for (const [keyword, synonyms] of Object.entries(keywords)) {
        if (intentLower.includes(keyword)) {
          const matched = synonyms.some(syn => lowerText.includes(syn));
          if (matched) {
            return {
              detected: true,
              intentId: intent.id,
              category: intent.category
            };
          }
        }
      }

      // Direct match with intent text
      if (lowerText.includes(intentLower) || intentLower.includes(lowerText.substring(0, 15))) {
        return {
          detected: true,
          intentId: intent.id,
          category: intent.category
        };
      }
    }

    return { detected: false };
  }

  // Load from localStorage on mount
  useEffect(() => {
    const savedPoints = localStorage.getItem('cerebro_points');
    const savedStreak = localStorage.getItem('cerebro_streak');
    const savedIntents = localStorage.getItem('cerebro_intents');
    const savedLastDate = localStorage.getItem('cerebro_last_activity');

    if (savedPoints) setTotalPoints(parseInt(savedPoints));
    if (savedStreak) setCurrentStreak(parseInt(savedStreak));
    if (savedIntents) setIntents(JSON.parse(savedIntents));
    if (savedLastDate) setLastActivityDate(savedLastDate);
  }, []);

  // Save to localStorage on changes
  useEffect(() => {
    localStorage.setItem('cerebro_points', totalPoints.toString());
    localStorage.setItem('cerebro_streak', currentStreak.toString());
    localStorage.setItem('cerebro_intents', JSON.stringify(intents));
    localStorage.setItem('cerebro_last_activity', lastActivityDate);
  }, [totalPoints, currentStreak, intents, lastActivityDate]);

  const value: PointsContextType = {
    totalPoints,
    currentStreak,
    intents,
    pillarProgress,
    streakMultiplier,
    addIntent,
    addActivity,
    completeIntent,
    updateStreak,
    detectIntentFromText
  };

  return (
    <PointsContext.Provider value={value}>
      {children}
    </PointsContext.Provider>
  );
}

export function usePoints() {
  const context = useContext(PointsContext);
  if (context === undefined) {
    throw new Error('usePoints must be used within a PointsProvider');
  }
  return context;
}
