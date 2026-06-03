import { useState, useRef, useEffect } from "react";
import { Mic, Volume2, VolumeX, ArrowUp, Heart, BookOpen, Wind, Award } from "lucide-react";
import { VoiceWaveOrb } from "./VoiceWaveOrb";
import { BottomNav } from "./BottomNav";
import { AnimatedLogo } from "./AnimatedLogo";
import { InsightsScreen } from "./InsightsScreen";
import { ToolsScreen } from "./ToolsScreen";
import { EnhancedHomeScreen } from "./EnhancedHomeScreen";
import { ProfileScreen } from "./ProfileScreen";
import { BreathingExercise } from "./BreathingExercise";
import { GratitudeExercise } from "./GratitudeExercise";
import { InsightReelScreen } from "./InsightReelScreen";
import { ZOWScreen } from "./ZOWScreen";
import { BurnoutAnalytics } from "./BurnoutAnalytics";
import { GamesHub } from "./GamesHub";
import { ColorTapGame } from "./games/ColorTapGame";
import { BreathingRhythmGame } from "./games/BreathingRhythmGame";
import { SoundHunterGame } from "./games/SoundHunterGame";
import { FreezeSwitchGame } from "./games/FreezeSwitchGame";
import { DistractionDodgeGame } from "./games/DistractionDodgeGame";
import { PatternRecallGame } from "./games/PatternRecallGame";
import { ObjectTrayGame } from "./games/ObjectTrayGame";
import { StoryBuilderGame } from "./games/StoryBuilderGame";
import { PathMemoryGame } from "./games/PathMemoryGame";
import { EmotionMatchGame } from "./games/EmotionMatchGame";
import { StormBalanceGame } from "./games/StormBalanceGame";
import { ThoughtSortGame } from "./games/ThoughtSortGame";
import { GrowthGardenGame } from "./games/GrowthGardenGame";
import { EmotionCompassGame } from "./games/EmotionCompassGame";
import { RuleSwitchGame } from "./games/RuleSwitchGame";
import { ShapeShiftPuzzleGame } from "./games/ShapeShiftPuzzleGame";
import { MultiTaskRelayGame } from "./games/MultiTaskRelayGame";
import { ZenSandGame } from "./games/ZenSandGame";
import { CloudDriftGame } from "./games/CloudDriftGame";
import { usePoints } from "../contexts/PointsContext";

interface ConversationalChatProps {
  oracleName: string;
  userName: string;
  onClose: () => void;
}

type MessageType = 
  | { type: 'oracle'; text: string }
  | { type: 'user'; text: string; hasAudio?: boolean }
  | { type: 'action-card'; activity: 'breathing' | 'gratitude' | 'journaling'; title: string; description: string; completed?: boolean }
  | { type: 'insight-card'; title: string; description: string; highlight: string }
  | { type: 'did-you-know'; fact: string; imageUrl?: string; videoUrl?: string }
  | { type: 'zow-prompt'; }
  | { type: 'personalized-question'; text: string }
  | { type: 'assessment-card'; title: string; description: string }
  | { type: 'acknowledgement'; text: string; emotion: string };

export function ConversationalChat({ oracleName, userName }: ConversationalChatProps) {
  const [isListening, setIsListening] = useState(false); // Start as false, user clicks to start
  const [textValue, setTextValue] = useState('');
  const [messages, setMessages] = useState<MessageType[]>([
    { type: 'oracle', text: `Hey ${userName}, what do you wish to share?` }
  ]);
  const [activeTab, setActiveTab] = useState<"activities" | "chat" | "insights" | "tools" | "profile">("chat");
  const [micEnabled, setMicEnabled] = useState(true);
  const [speakerEnabled, setSpeakerEnabled] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [activeActivity, setActiveActivity] = useState<'breathing' | 'gratitude' | 'zow' | null>(null);
  const [showingInsightReel, setShowingInsightReel] = useState<{
    type: 'insight' | 'did-you-know';
    title?: string;
    description?: string;
    highlight?: string;
    fact?: string;
    backgroundMedia?: string;
  } | null>(null);
  const [pointsNotification, setPointsNotification] = useState<{ points: number; category: string } | null>(null);
  const [showBurnoutAnalytics, setShowBurnoutAnalytics] = useState(false);
  const [showGamesHub, setShowGamesHub] = useState(false);
  const [activeGame, setActiveGame] = useState<string | null>(null);

  // Points tracking context
  const { detectIntentFromText, addActivity, streakMultiplier } = usePoints();
  const [pendingPersonalizedQuestion, setPendingPersonalizedQuestion] = useState<string | null>(null);
  const [hasTriggeredDemo, setHasTriggeredDemo] = useState(false); // Track if demo has run
  const [showQuickReplies, setShowQuickReplies] = useState(true); // Show quick reply chips initially
  const [awaitingJobDurationAnswer, setAwaitingJobDurationAnswer] = useState(false); // Track if we're waiting for job duration answer
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Text-to-speech function
  const speak = (text: string) => {
    if (!speakerEnabled || !('speechSynthesis' in window)) return;
    
    window.speechSynthesis.cancel(); // Cancel any ongoing speech
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    utterance.volume = 1;
    
    // Try to use a pleasant female voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => 
      v.name.includes('Samantha') || 
      v.name.includes('Karen') ||
      v.name.includes('Google US English Female')
    );
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    
    window.speechSynthesis.speak(utterance);
  };

  // Read new messages aloud
  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      
      if (lastMessage.type === 'oracle') {
        speak(lastMessage.text);
      } else if (lastMessage.type === 'action-card') {
        speak(lastMessage.title);
      } else if (lastMessage.type === 'personalized-question') {
        speak(lastMessage.text);
      } else if (lastMessage.type === 'insight-card') {
        speak(lastMessage.title);
      } else if (lastMessage.type === 'acknowledgement') {
        speak(lastMessage.text);
      }
    }
  }, [messages, speakerEnabled]);

  const handleMicClick = () => {
    if (!micEnabled) return;
    
    if (isListening) {
      // Stop listening
      setIsListening(false);
    } else {
      // Start listening
      setIsListening(true);
      
      // Simulate voice input after 2.5 seconds
      setTimeout(() => {
        setIsListening(false);
        handleUserMessage("I had a challenging day today...", true);
      }, 2500);
    }
  };

  const handleUserMessage = (text: string, hasAudio: boolean = false) => {
    setMessages(prev => [...prev, { type: 'user', text, hasAudio }]);

    // SAMPLE INTENT DETECTION - Detect if message relates to user's daily intentions
    const detection = detectIntentFromText(text);
    if (detection.detected && detection.intentId) {
      // Award points for talking about their intent
      addActivity(detection.intentId, {
        type: 'chat',
        description: `Discussed "${text.substring(0, 50)}..."`
      });

      // Show points notification
      const pointsEarned = 5 * streakMultiplier;
      setPointsNotification({
        points: pointsEarned,
        category: detection.category || 'general'
      });

      // Hide notification after 3 seconds
      setTimeout(() => {
        setPointsNotification(null);
      }, 3000);
    }

    // Check if this is answer to job duration question
    if (awaitingJobDurationAnswer) {
      setAwaitingJobDurationAnswer(false);
      
      // Oracle acknowledges answer
      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          setMessages(prev => [...prev, 
            { type: 'oracle', text: "That's great! Now let me help you track your wellness journey." }
          ]);
          
          // Show ZOW prompt after acknowledgement
          setTimeout(() => {
            setMessages(prev => [...prev, { type: 'zow-prompt' }]);
          }, 1000);
        }, 1500);
      }, 500);
      return;
    }
    
    // Oracle responds with empathy
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        
        // Empathetic acknowledgement
        setMessages(prev => [...prev, 
          { type: 'oracle', text: "I hear you, and I'm here with you. Challenging days can feel heavy. Let's take a moment together to center yourself." }
        ]);
        
        // Show action card after a brief pause
        setTimeout(() => {
          setMessages(prev => [...prev, 
            { 
              type: 'action-card', 
              activity: 'breathing',
              title: 'Take 3 Deep Breaths',
              description: 'A quick breathing exercise to help you find calm'
            }
          ]);
        }, 1000);
      }, 2000);
    }, 500);
  };

  const handleActivityComplete = (activity: string) => {
    setActiveActivity(null);
    setIsListening(true); // Re-enable voice listening when returning to chat
    
    // Mark the action card as completed
    setMessages(prev => prev.map(msg => 
      msg.type === 'action-card' && msg.activity === activity
        ? { ...msg, completed: true }
        : msg
    ));
    
    // Show insight reel first
    setTimeout(() => {
      setShowingInsightReel({
        type: 'insight',
        title: 'Your Personalized Insight',
        description: 'I noticed your breath was shallow at first, then deepened. This tells me your body was holding tension. You just gave yourself permission to release it.',
        highlight: 'Self-compassion in action'
      });
    }, 500);
  };

  const handleInsightReelComplete = () => {
    const currentReel = showingInsightReel;
    setShowingInsightReel(null);
    
    // If we just showed the insight, now show did-you-know
    if (currentReel?.type === 'insight') {
      setTimeout(() => {
        setShowingInsightReel({
          type: 'did-you-know',
          fact: 'Deep breathing activates your parasympathetic nervous system, which naturally calms your stress response. Even 3 breaths can shift your state.'
        });
      }, 500);
    } else if (currentReel?.type === 'did-you-know') {
      // After did-you-know, add personalized question to chat and trigger auto response
      setTimeout(() => {
        setMessages(prev => [...prev,
          { type: 'personalized-question', text: "By the way, I'd love to know more about you. What do you do for work?" }
        ]);
        
        // Start listening animation after question appears (1 second after question)
        setTimeout(() => {
          setIsListening(true);
          
          // Simulate voice capture after 2.5 seconds of listening
          setTimeout(() => {
            setIsListening(false);
            setMessages(prev => [...prev, 
              { type: 'user', text: "I'm a product designer at a tech startup", hasAudio: true }
            ]);
            
            // Oracle responds to user's answer
            setTimeout(() => {
              setIsTyping(true);
              
              setTimeout(() => {
                setIsTyping(false);
                setMessages(prev => [...prev,
                  { type: 'oracle', text: "That's wonderful! Product design requires so much creativity and problem-solving. How long have you been in this role?" }
                ]);
                setAwaitingJobDurationAnswer(true); // Set flag to wait for user's answer
              }, 2000);
            }, 500);
          }, 2500);
        }, 1000);
      }, 500);
    }
  };

  const handleTextSubmit = () => {
    if (textValue.trim()) {
      handleUserMessage(textValue.trim(), false);
      setTextValue('');
    }
  };

  const renderChatView = () => (
    <div 
      className="min-h-screen relative overflow-hidden flex flex-col"
      style={{ background: 'transparent' }}
    >
      {/* Top Bar - Sticky */}
      <div 
        className="sticky top-0 z-20 flex items-center justify-between px-4 py-3 border-b"
        style={{ 
          background: 'linear-gradient(135deg, rgba(250, 245, 255, 0.95) 0%, rgba(252, 231, 243, 0.9) 50%, rgba(235, 248, 255, 0.95) 100%)',
          backdropFilter: 'blur(10px)',
          borderColor: 'rgba(229, 231, 235, 0.5)'
        }}
      >
        {/* Oracle Name & Status */}
        <div className="flex items-center gap-2">
          <AnimatedLogo size={28} animate={isListening} />
          <div>
            <h3 
              className="text-sm"
              style={{ 
                fontFamily: 'Lora, serif',
                fontWeight: 500,
                color: '#15113C'
              }}
            >
              {oracleName}
            </h3>
            <p 
              className="text-xs"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                color: isListening ? '#10B981' : '#6B7280'
              }}
            >
              {isListening ? 'Listening' : 'Ready'}
            </p>
          </div>
        </div>

        {/* Mic/Speaker Controls */}
        <div className="flex gap-2">
          <button
            onClick={() => setSpeakerEnabled(!speakerEnabled)}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
            style={{
              background: speakerEnabled ? 'rgba(255,255,255,0.9)' : 'rgba(243,244,246,0.8)',
              border: `2px solid ${speakerEnabled ? '#C4B5FD' : 'rgba(229,231,235,0.8)'}`
            }}
          >
            {speakerEnabled ? (
              <Volume2 className="w-4 h-4" style={{ color: '#8B5CF6' }} />
            ) : (
              <VolumeX className="w-4 h-4" style={{ color: '#9CA3AF' }} />
            )}
          </button>
          <button
            onClick={() => setMicEnabled(!micEnabled)}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
            style={{
              background: micEnabled ? 'rgba(255,255,255,0.9)' : 'rgba(243,244,246,0.8)',
              border: `2px solid ${micEnabled ? '#C4B5FD' : 'rgba(229,231,235,0.8)'}`
            }}
          >
            <Mic 
              className="w-4 h-4" 
              style={{ color: micEnabled ? '#8B5CF6' : '#9CA3AF' }}
            />
          </button>
        </div>
      </div>

      {/* Points Notification Toast */}
      {pointsNotification && (
        <div
          className="absolute top-20 left-1/2 transform -translate-x-1/2 z-50 animate-bounce"
          style={{
            animation: 'slideDown 0.3s ease-out'
          }}
        >
          <div
            className="px-6 py-3 rounded-full flex items-center gap-3 shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #A78BFA 0%, #8B5CF6 100%)',
              border: '2px solid white'
            }}
          >
            <Award className="w-5 h-5" style={{ color: 'white' }} />
            <span
              className="text-base"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 700,
                color: 'white'
              }}
            >
              +{pointsNotification.points} points!
            </span>
            {streakMultiplier > 1 && (
              <span
                className="text-xs px-2 py-1 rounded-full"
                style={{
                  background: 'rgba(255,255,255,0.3)',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  color: 'white'
                }}
              >
                {streakMultiplier}x streak
              </span>
            )}
          </div>
        </div>
      )}

      {/* Messages Area */}
      <div
        className="flex-1 overflow-y-auto px-4 pt-4"
        style={{
          background: '#FAFAFA',
          paddingBottom: 'calc(200px + 5rem)' // Space for sticky bottom card
        }}
      >
        <div className="space-y-4 max-w-2xl mx-auto">
          {messages.map((msg, i) => (
            <div key={i}>
              {msg.type === 'oracle' && (
                <div className="text-center py-6 px-4">
                  <h2 
                    className="text-xl mb-2 max-w-md mx-auto"
                    style={{ 
                      fontFamily: 'Lora, serif',
                      fontWeight: 500,
                      color: '#15113C',
                      lineHeight: 1.4
                    }}
                  >
                    {msg.text}
                  </h2>

                  {/* Quick Reply Chips - only show after first oracle message */}
                  {i === 0 && showQuickReplies && (
                    <div className="mt-4 space-y-2 max-w-md mx-auto px-2">
                      {[
                        "I'm feeling stressed about work",
                        "I had a difficult conversation today",
                        "I want to work on my mindfulness",
                        "I'm struggling with self-doubt",
                        "I need help processing emotions"
                      ].map((reply, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setShowQuickReplies(false);
                            handleUserMessage(reply, false);
                          }}
                          className="w-full px-5 py-3.5 rounded-2xl text-left transition-all hover:shadow-sm"
                          style={{
                            background: 'white',
                            border: '2px solid #E5E7EB',
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '14px',
                            color: '#15113C'
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <div 
                              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                              style={{ background: '#C4B5FD' }}
                            />
                            {reply}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {msg.type === 'user' && (
                <div className="flex gap-2 justify-end">
                  <div 
                    className="px-4 py-3 rounded-3xl max-w-sm"
                    style={{
                      background: 'linear-gradient(135deg, #C4B5FD 0%, #A78BFA 100%)',
                      color: 'white'
                    }}
                  >
                    <p 
                      className="text-sm leading-relaxed"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {msg.text}
                    </p>
                  </div>
                </div>
              )}

              {msg.type === 'action-card' && (
                msg.completed ? (
                  // Completed state - shown as user response card with muted gradient
                  <div className="flex gap-2 justify-end">
                    <div 
                      className="px-5 py-4 rounded-3xl max-w-sm"
                      style={{ 
                        background: 'linear-gradient(135deg, #EBF8FF 0%, #DBEAFE 100%)',
                        border: '2px solid #93C5FD'
                      }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Wind className="w-5 h-5" style={{ color: '#1E40AF' }} />
                        <p 
                          className="text-sm"
                          style={{ 
                            fontFamily: 'Lora, serif',
                            fontWeight: 500,
                            color: '#1E40AF'
                          }}
                        >
                          {msg.title}
                        </p>
                      </div>
                      <div 
                        className="inline-block px-3 py-1.5 rounded-full"
                        style={{
                          background: '#3B82F6',
                          color: 'white',
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '11px',
                          fontWeight: 600,
                          letterSpacing: '0.05em'
                        }}
                      >
                        ✓ COMPLETED
                      </div>
                    </div>
                  </div>
                ) : (
                  // Pending state - muted gradient action card
                  <div 
                    className="p-5 rounded-3xl"
                    style={{ 
                      background: 'linear-gradient(135deg, #EBF8FF 0%, #DBEAFE 100%)',
                      border: '2px solid #BFDBFE'
                    }}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ background: '#3B82F6' }}
                      >
                        <Wind className="w-5 h-5" style={{ color: 'white' }} />
                      </div>
                      <div className="flex-1">
                        <h4 
                          className="text-base mb-1"
                          style={{ 
                            fontFamily: 'Lora, serif',
                            fontWeight: 500,
                            color: '#1E40AF'
                          }}
                        >
                          {msg.title}
                        </h4>
                        <p 
                          className="text-sm"
                          style={{ 
                            fontFamily: 'Inter, sans-serif',
                            color: '#1E3A8A'
                          }}
                        >
                          {msg.description}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveActivity(msg.activity)}
                      className="w-full py-3 rounded-full"
                      style={{ 
                        background: '#3B82F6',
                        color: 'white',
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 600,
                        fontSize: '14px'
                      }}
                    >
                      Start Exercise
                    </button>
                  </div>
                )
              )}

              {msg.type === 'insight-card' && (
                <div 
                  className="p-5 rounded-3xl"
                  style={{
                    background: 'linear-gradient(135deg, #EDE9FE 0%, #E0E7FF 100%)',
                    border: '2px solid #C4B5FD'
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ background: '#8B5CF6' }}
                    >
                      <span className="text-white text-lg">✨</span>
                    </div>
                    <div className="flex-1">
                      <h4 
                        className="text-base mb-2"
                        style={{ 
                          fontFamily: 'Lora, serif',
                          fontWeight: 500,
                          color: '#5B21B6'
                        }}
                      >
                        {msg.title}
                      </h4>
                      <p 
                        className="text-sm mb-2 leading-relaxed"
                        style={{ 
                          fontFamily: 'Inter, sans-serif',
                          color: '#6B21A8'
                        }}
                      >
                        {msg.description}
                      </p>
                      <div 
                        className="inline-block px-3 py-1.5 rounded-full"
                        style={{
                          background: 'rgba(139, 92, 246, 0.2)',
                          color: '#5B21B6',
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '12px',
                          fontWeight: 600
                        }}
                      >
                        {msg.highlight}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {msg.type === 'did-you-know' && (
                <div 
                  className="p-4 rounded-3xl"
                  style={{
                    background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
                    border: '2px solid #FCD34D'
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: '#F59E0B' }}
                    >
                      <span className="text-white text-sm">💡</span>
                    </div>
                    <div className="flex-1">
                      <p 
                        className="text-xs mb-1"
                        style={{ 
                          fontFamily: 'Inter, sans-serif',
                          color: '#92400E',
                          fontWeight: 600,
                          letterSpacing: '0.05em'
                        }}
                      >
                        DID YOU KNOW?
                      </p>
                      <p 
                        className="text-sm leading-relaxed"
                        style={{ 
                          fontFamily: 'Inter, sans-serif',
                          color: '#78350F'
                        }}
                      >
                        {msg.fact}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {msg.type === 'personalized-question' && (
                <div className="text-center py-6 px-4">
                  <h2 
                    className="text-2xl mb-2 max-w-md mx-auto"
                    style={{ 
                      fontFamily: 'Lora, serif',
                      fontWeight: 500,
                      color: '#15113C',
                      lineHeight: 1.4
                    }}
                  >
                    {msg.text}
                  </h2>
                  <p 
                    className="text-xs"
                    style={{ 
                      fontFamily: 'Inter, sans-serif',
                      color: '#9CA3AF',
                      letterSpacing: '0.05em'
                    }}
                  >
                    TAP THE MIC OR TYPE YOUR ANSWER
                  </p>
                </div>
              )}

              {msg.type === 'assessment-card' && (
                <div 
                  className="p-5 rounded-3xl"
                  style={{
                    background: 'linear-gradient(135deg, #F8FAFC 0%, #E0E7FF 100%)',
                    border: '2px solid #C4B5FD'
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ background: '#8B5CF6' }}
                    >
                      <BookOpen className="w-5 h-5" style={{ color: 'white' }} />
                    </div>
                    <div className="flex-1">
                      <h4 
                        className="text-base mb-2"
                        style={{ 
                          fontFamily: 'Lora, serif',
                          fontWeight: 500,
                          color: '#5B21B6'
                        }}
                      >
                        {msg.title}
                      </h4>
                      <p 
                        className="text-sm leading-relaxed"
                        style={{ 
                          fontFamily: 'Inter, sans-serif',
                          color: '#6B21A8'
                        }}
                      >
                        {msg.description}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {msg.type === 'acknowledgement' && (
                <div 
                  className="p-5 rounded-3xl"
                  style={{
                    background: 'linear-gradient(135deg, #F8FAFC 0%, #E0E7FF 100%)',
                    border: '2px solid #C4B5FD'
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ background: '#8B5CF6' }}
                    >
                      <Heart className="w-5 h-5" style={{ color: 'white' }} />
                    </div>
                    <div className="flex-1">
                      <p 
                        className="text-sm leading-relaxed"
                        style={{ 
                          fontFamily: 'Inter, sans-serif',
                          color: '#6B21A8'
                        }}
                      >
                        {msg.text}
                      </p>
                      <div 
                        className="inline-block px-3 py-1.5 rounded-full"
                        style={{
                          background: 'rgba(139, 92, 246, 0.2)',
                          color: '#5B21B6',
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '12px',
                          fontWeight: 600
                        }}
                      >
                        {msg.emotion}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {msg.type === 'zow-prompt' && (
                <div 
                  className="p-5 rounded-3xl"
                  style={{ 
                    background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)', 
                    border: '2px solid #FBBF24'
                  }}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ background: '#F59E0B' }}
                    >
                      <Heart className="w-5 h-5" style={{ color: 'white' }} />
                    </div>
                    <div className="flex-1">
                      <h4 
                        className="text-base mb-1"
                        style={{ 
                          fontFamily: 'Lora, serif',
                          fontWeight: 500,
                          color: '#78350F'
                        }}
                      >
                        Check Your Wellness Zone
                      </h4>
                      <p 
                        className="text-sm"
                        style={{ 
                          fontFamily: 'Inter, sans-serif',
                          color: '#92400E'
                        }}
                      >
                        ZOW helps track your emotional baseline and progress over time. This important check-in only takes 1 minute.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveActivity('zow')}
                    className="w-full py-3 rounded-full"
                    style={{ 
                      background: '#F59E0B',
                      color: 'white',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 600,
                      fontSize: '14px'
                    }}
                  >
                    Complete ZOW Check-in
                  </button>
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-2">
              <div 
                className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #DDD6FE 0%, #C4B5FD 100%)' }}
              >
                <AnimatedLogo size={14} animate={false} />
              </div>
              <div 
                className="px-4 py-3 rounded-3xl"
                style={{ background: 'white', border: '2px solid #F3F4F6' }}
              >
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#9CA3AF' }} />
                  <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#9CA3AF', animationDelay: '150ms' }} />
                  <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#9CA3AF', animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Sticky Bottom Card - Voice Listening + Text Input */}
      {!activeActivity && !showingInsightReel && (
        <div 
          className="fixed bottom-20 left-0 right-0 z-10 px-4 py-3 border-t"
          style={{ 
            background: 'linear-gradient(135deg, rgba(250, 245, 255, 0.95) 0%, rgba(252, 231, 243, 0.9) 50%, rgba(235, 248, 255, 0.95) 100%)',
            backdropFilter: 'blur(10px)',
            borderColor: 'rgba(229, 231, 235, 0.5)'
          }}
        >
          <div className="max-w-2xl mx-auto">
            {/* Voice Wave or Mic Button */}
            <div className="flex items-center justify-center mb-3">
              {isListening ? (
                <VoiceWaveOrb isListening={true} size={126} />
              ) : (
                <button
                  onClick={handleMicClick}
                  disabled={!micEnabled}
                  className="transition-all disabled:opacity-40"
                >
                  <div 
                    className="w-18 h-18 rounded-full flex items-center justify-center"
                    style={{
                      width: '72px',
                      height: '72px',
                      background: micEnabled ? 'linear-gradient(135deg, #A78BFA 0%, #8B5CF6 100%)' : '#E5E7EB',
                      border: micEnabled ? 'none' : '2px solid #D1D5DB'
                    }}
                  >
                    <Mic 
                      className="w-7 h-7" 
                      style={{ color: micEnabled ? 'white' : '#9CA3AF' }}
                    />
                  </div>
                </button>
              )}
            </div>

            {/* Text Input */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={textValue}
                onChange={(e) => setTextValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && textValue.trim()) {
                    handleTextSubmit();
                  }
                }}
                placeholder="Type your message..."
                className="flex-1 px-5 py-3.5 rounded-full text-sm border-2 focus:outline-none transition-colors"
                style={{ 
                  fontFamily: 'Inter, sans-serif', 
                  color: '#15113C',
                  background: 'white',
                  borderColor: textValue.trim() ? '#C4B5FD' : '#E5E7EB'
                }}
              />
              <button
                onClick={handleTextSubmit}
                disabled={!textValue.trim()}
                className="w-12 h-12 rounded-full transition-all disabled:opacity-40 flex items-center justify-center"
                style={{ 
                  background: textValue.trim() ? 'linear-gradient(135deg, #A78BFA 0%, #8B5CF6 100%)' : '#F3F4F6',
                  border: textValue.trim() ? 'none' : '2px solid #D1D5DB'
                }}
              >
                <ArrowUp 
                  className="w-5 h-5" 
                  style={{ color: textValue.trim() ? 'white' : '#9CA3AF' }}
                />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );

  // Render breathing exercise overlay
  if (activeActivity === 'breathing') {
    return (
      <BreathingExercise 
        onComplete={() => handleActivityComplete('breathing')}
        onSwitch={() => setActiveActivity('gratitude')}
      />
    );
  }

  // Render gratitude exercise overlay
  if (activeActivity === 'gratitude') {
    return (
      <GratitudeExercise 
        onComplete={() => handleActivityComplete('gratitude')}
        onSwitch={() => setActiveActivity('breathing')}
      />
    );
  }

  // Render ZOW screen
  if (activeActivity === 'zow') {
    return (
      <ZOWScreen 
        userName={userName}
        onComplete={() => setActiveActivity(null)}
      />
    );
  }

  // Render insight reel screen
  if (showingInsightReel) {
    return (
      <InsightReelScreen 
        type={showingInsightReel.type}
        title={showingInsightReel.title}
        description={showingInsightReel.description}
        highlight={showingInsightReel.highlight}
        fact={showingInsightReel.fact}
        backgroundMedia={showingInsightReel.backgroundMedia}
        onComplete={handleInsightReelComplete}
      />
    );
  }

  // Render based on active tab
  if (activeTab === "activities") {
    return (
      <>
        <EnhancedHomeScreen userName={userName} oracleName={oracleName} />
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </>
    );
  }
  
  if (activeTab === "insights") {
    // If burnout analytics is being shown, render that instead
    if (showBurnoutAnalytics) {
      return (
        <div className="min-h-screen flex flex-col">
          {/* Header with back button */}
          <div
            className="sticky top-0 z-20 flex items-center gap-3 px-4 py-3 border-b"
            style={{
              background: 'linear-gradient(135deg, rgba(250, 245, 255, 0.95) 0%, rgba(252, 231, 243, 0.9) 50%, rgba(235, 248, 255, 0.95) 100%)',
              backdropFilter: 'blur(10px)',
              borderColor: 'rgba(229, 231, 235, 0.5)'
            }}
          >
            <button
              onClick={() => setShowBurnoutAnalytics(false)}
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{
                background: 'rgba(255,255,255,0.9)',
                border: '2px solid #E5E7EB'
              }}
            >
              <ArrowUp className="w-4 h-4 transform rotate-[-90deg]" style={{ color: '#6B7280' }} />
            </button>
            <h3
              className="text-base"
              style={{
                fontFamily: 'Lora, serif',
                fontWeight: 500,
                color: '#15113C'
              }}
            >
              Burnout Analytics
            </h3>
          </div>
          <BurnoutAnalytics />
          <BottomNav activeTab={activeTab} onTabChange={(tab) => {
            setShowBurnoutAnalytics(false);
            setActiveTab(tab);
          }} />
        </div>
      );
    }

    return (
      <>
        <InsightsScreen onViewBurnoutAnalytics={() => setShowBurnoutAnalytics(true)} />
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </>
    );
  }
  
  if (activeTab === "tools") {
    // If showing games hub
    if (showGamesHub) {
      // If playing a specific game
      if (activeGame === "color-tap") {
        return <ColorTapGame onClose={() => setActiveGame(null)} onComplete={(score) => setActiveGame(null)} />;
      }
      if (activeGame === "breathing-rhythm") {
        return <BreathingRhythmGame onClose={() => setActiveGame(null)} onComplete={(breathCount) => setActiveGame(null)} />;
      }
      if (activeGame === "sound-hunter") {
        return <SoundHunterGame onClose={() => setActiveGame(null)} onComplete={(score) => setActiveGame(null)} />;
      }
      if (activeGame === "freeze-switch") {
        return <FreezeSwitchGame onClose={() => setActiveGame(null)} onComplete={(score) => setActiveGame(null)} />;
      }
      if (activeGame === "distraction-dodge") {
        return <DistractionDodgeGame onClose={() => setActiveGame(null)} onComplete={(score) => setActiveGame(null)} />;
      }
      if (activeGame === "pattern-recall") {
        return <PatternRecallGame onClose={() => setActiveGame(null)} onComplete={(score) => setActiveGame(null)} />;
      }
      if (activeGame === "object-tray") {
        return <ObjectTrayGame onClose={() => setActiveGame(null)} onComplete={(score) => setActiveGame(null)} />;
      }
      if (activeGame === "story-builder") {
        return <StoryBuilderGame onClose={() => setActiveGame(null)} onComplete={(score) => setActiveGame(null)} />;
      }
      if (activeGame === "path-memory") {
        return <PathMemoryGame onClose={() => setActiveGame(null)} onComplete={(score) => setActiveGame(null)} />;
      }
      if (activeGame === "emotion-match") {
        return <EmotionMatchGame onClose={() => setActiveGame(null)} onComplete={(score) => setActiveGame(null)} />;
      }
      if (activeGame === "storm-balance") {
        return <StormBalanceGame onClose={() => setActiveGame(null)} onComplete={(score) => setActiveGame(null)} />;
      }
      if (activeGame === "thought-sort") {
        return <ThoughtSortGame onClose={() => setActiveGame(null)} onComplete={(score) => setActiveGame(null)} />;
      }
      if (activeGame === "growth-garden") {
        return <GrowthGardenGame onClose={() => setActiveGame(null)} onComplete={(score) => setActiveGame(null)} />;
      }
      if (activeGame === "emotion-compass") {
        return <EmotionCompassGame onClose={() => setActiveGame(null)} onComplete={(score) => setActiveGame(null)} />;
      }
      if (activeGame === "rule-switch") {
        return <RuleSwitchGame onClose={() => setActiveGame(null)} onComplete={(score) => setActiveGame(null)} />;
      }
      if (activeGame === "shape-shift-puzzle") {
        return <ShapeShiftPuzzleGame onClose={() => setActiveGame(null)} onComplete={(score) => setActiveGame(null)} />;
      }
      if (activeGame === "multi-task-relay") {
        return <MultiTaskRelayGame onClose={() => setActiveGame(null)} onComplete={(score) => setActiveGame(null)} />;
      }
      if (activeGame === "zen-sand") {
        return <ZenSandGame onClose={() => setActiveGame(null)} onComplete={(score) => setActiveGame(null)} />;
      }
      if (activeGame === "cloud-drift") {
        return <CloudDriftGame onClose={() => setActiveGame(null)} onComplete={(score) => setActiveGame(null)} />;
      }

      // Show games hub
      return (
        <div className="min-h-screen flex flex-col">
          {/* Header with back button */}
          <div
            className="sticky top-0 z-20 flex items-center gap-3 px-4 py-3 border-b"
            style={{
              background: 'linear-gradient(135deg, rgba(250, 245, 255, 0.95) 0%, rgba(252, 231, 243, 0.9) 50%, rgba(235, 248, 255, 0.95) 100%)',
              backdropFilter: 'blur(10px)',
              borderColor: 'rgba(229, 231, 235, 0.5)'
            }}
          >
            <button
              onClick={() => setShowGamesHub(false)}
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{
                background: 'rgba(255,255,255,0.9)',
                border: '2px solid #E5E7EB'
              }}
            >
              <ArrowUp className="w-4 h-4 transform rotate-[-90deg]" style={{ color: '#6B7280' }} />
            </button>
            <h3
              className="text-base"
              style={{
                fontFamily: 'Lora, serif',
                fontWeight: 500,
                color: '#15113C'
              }}
            >
              Mindful Games
            </h3>
          </div>
          <GamesHub onSelectGame={(gameId) => setActiveGame(gameId)} />
          <BottomNav activeTab={activeTab} onTabChange={(tab) => {
            setShowGamesHub(false);
            setActiveTab(tab);
          }} />
        </div>
      );
    }

    return (
      <>
        <ToolsScreen onNavigateToGames={() => setShowGamesHub(true)} />
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </>
    );
  }
  
  if (activeTab === "profile") {
    return (
      <>
        <ProfileScreen userName={userName} oracleName={oracleName} />
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </>
    );
  }
  
  return renderChatView();
}