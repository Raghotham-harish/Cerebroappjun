import { useState, useEffect } from "react";
import { Mic, MicOff, Volume2, VolumeX } from "lucide-react";
import { AnimatedLogo } from "./AnimatedLogo";
import { VoiceWaveOrb } from "./VoiceWaveOrb";

interface LifeSatisfactionScaleProps {
  userName: string;
  onComplete: (responses: number[]) => void;
}

const questions = [
  {
    id: 1,
    text: "In most ways, my life is close to my ideal",
    conversational: "How close would you say your life is to your ideal?"
  },
  {
    id: 2,
    text: "The conditions of my life are excellent",
    conversational: "How do you feel about the conditions of your life right now?"
  },
  {
    id: 3,
    text: "I am completely satisfied with my life",
    conversational: "How satisfied are you with your life overall?"
  },
  {
    id: 4,
    text: "So far, I have gotten the important things I want in life",
    conversational: "Have you been able to achieve the important things you wanted?"
  },
  {
    id: 5,
    text: "If I could live my life over, I would change nothing",
    conversational: "If you could live your life over, would you change anything?"
  }
];

const scaleOptions = [
  { value: 1, label: "Strongly Disagree" },
  { value: 2, label: "Disagree" },
  { value: 3, label: "Slightly Disagree" },
  { value: 4, label: "Neutral" },
  { value: 5, label: "Slightly Agree" },
  { value: 6, label: "Agree" },
  { value: 7, label: "Strongly Agree" }
];

export function LifeSatisfactionScale({ userName, onComplete }: LifeSatisfactionScaleProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<number[]>([]);
  const [selectedValue, setSelectedValue] = useState<number | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [micEnabled, setMicEnabled] = useState(true);
  const [speakerEnabled, setSpeakerEnabled] = useState(true);
  const [showIntro, setShowIntro] = useState(true);

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  useEffect(() => {
    // Speak the question when it appears
    if (!showIntro && speakerEnabled) {
      const utterance = new SpeechSynthesisUtterance(question.conversational);
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  }, [currentQuestion, showIntro, question.conversational, speakerEnabled]);

  const handleValueSelect = (value: number) => {
    setSelectedValue(value);
  };

  const handleNext = () => {
    if (selectedValue === null) return;

    const newResponses = [...responses, selectedValue];
    setResponses(newResponses);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedValue(null);
    } else {
      onComplete(newResponses);
    }
  };

  const handleSkip = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setResponses([...responses, 4]); // Default to neutral
      setSelectedValue(null);
    } else {
      onComplete([...responses, 4]);
    }
  };

  const startListening = () => {
    setIsListening(true);
    // Simulate voice capture
    setTimeout(() => {
      setIsListening(false);
      // Auto-select a random value for demo
      const randomValue = Math.floor(Math.random() * 7) + 1;
      setSelectedValue(randomValue);
    }, 2500);
  };

  if (showIntro) {
    return (
      <div 
        className="min-h-screen relative overflow-hidden flex items-center justify-center" 
        style={{ 
          background: 'linear-gradient(135deg, #FAF5FF 0%, #F5F3FF 100%)',
          padding: '16px'
        }}
      >
        <div className="relative z-10 w-full max-w-md text-center px-4">
          <div className="flex justify-center mb-8">
            <AnimatedLogo size={80} animate={true} />
          </div>

          <h1 
            className="text-4xl mb-4" 
            style={{ 
              fontFamily: 'Lora, serif', 
              fontWeight: 500, 
              lineHeight: 1.3, 
              color: '#15113C' 
            }}
          >
            Before we begin, {userName}...
          </h1>

          <p 
            className="text-lg text-gray-700 mb-8 leading-relaxed" 
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            I'd love to understand where you are in your journey. This helps me support you better.
          </p>

          <p 
            className="text-base text-gray-600 mb-12" 
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            I'll ask you a few reflective questions. Just share what feels right—there are no wrong answers.
          </p>

          <button
            onClick={() => setShowIntro(false)}
            className="w-full h-14 rounded-full transition-all"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
              fontSize: '16px',
              background: 'linear-gradient(135deg, #A78BFA 0%, #818CF8 100%)',
              color: 'white'
            }}
          >
            I'm ready
          </button>

          <button
            onClick={handleSkip}
            className="w-full mt-4 text-sm text-gray-500 hover:text-gray-700 transition-colors"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Skip for now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen relative overflow-hidden flex flex-col" 
      style={{ 
        background: 'linear-gradient(135deg, #FAF5FF 0%, #F5F3FF 100%)',
        padding: '16px'
      }}
    >
      {/* Mic & Speaker Toggles */}
      <div className="absolute top-4 right-4 z-20 flex gap-3">
        <button
          onClick={() => setSpeakerEnabled(!speakerEnabled)}
          className="w-12 h-12 rounded-full flex items-center justify-center transition-colors"
          style={{
            background: speakerEnabled ? 'rgba(237, 233, 254, 0.9)' : 'rgba(243, 244, 246, 0.9)',
            border: speakerEnabled ? '2px solid #A78BFA' : '2px solid #E5E7EB'
          }}
        >
          {speakerEnabled ? (
            <Volume2 className="w-5 h-5" style={{ color: '#6366F1' }} />
          ) : (
            <VolumeX className="w-5 h-5" style={{ color: '#9CA3AF' }} />
          )}
        </button>

        <button
          onClick={() => setMicEnabled(!micEnabled)}
          className="w-12 h-12 rounded-full flex items-center justify-center transition-colors"
          style={{
            background: micEnabled ? 'rgba(237, 233, 254, 0.9)' : 'rgba(243, 244, 246, 0.9)',
            border: micEnabled ? '2px solid #A78BFA' : '2px solid #E5E7EB'
          }}
        >
          {micEnabled ? (
            <Mic className="w-5 h-5" style={{ color: '#6366F1' }} />
          ) : (
            <MicOff className="w-5 h-5" style={{ color: '#9CA3AF' }} />
          )}
        </button>
      </div>

      {/* Progress Bar */}
      <div className="w-full mb-8">
        <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full transition-all duration-500"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #A78BFA 0%, #818CF8 100%)'
            }}
          />
        </div>
        <p 
          className="text-xs text-gray-500 mt-2 text-center" 
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          Question {currentQuestion + 1} of {questions.length}
        </p>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 max-w-2xl mx-auto w-full">
        {/* Logo */}
        <div className="mb-8">
          <AnimatedLogo size={56} animate={false} />
        </div>

        {/* Question */}
        <h2 
          className="text-3xl mb-12 text-center max-w-lg" 
          style={{ 
            fontFamily: 'Lora, serif', 
            fontWeight: 500, 
            lineHeight: 1.3, 
            color: '#15113C' 
          }}
        >
          {question.conversational}
        </h2>

        {/* Voice Orb */}
        {micEnabled && (
          <button
            onClick={startListening}
            disabled={isListening}
            className="mb-8"
          >
            <VoiceWaveOrb isListening={isListening} size={140} />
          </button>
        )}

        {isListening && (
          <p 
            className="text-base text-gray-600 mb-6" 
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            I'm listening...
          </p>
        )}

        {/* Scale Options */}
        <div className="w-full max-w-md mb-8">
          {/* Slider */}
          <div className="mb-6">
            <input
              type="range"
              min="1"
              max="7"
              step="1"
              value={selectedValue || 4}
              onChange={(e) => handleValueSelect(parseInt(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer"
              style={{
                background: selectedValue 
                  ? `linear-gradient(to right, #A78BFA 0%, #A78BFA ${((selectedValue - 1) / 6) * 100}%, #E5E7EB ${((selectedValue - 1) / 6) * 100}%, #E5E7EB 100%)`
                  : '#E5E7EB',
                outline: 'none'
              }}
            />
          </div>

          {/* Number Labels */}
          <div className="flex justify-between mb-6 px-1">
            {scaleOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleValueSelect(option.value)}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
                style={{
                  background: selectedValue === option.value 
                    ? 'linear-gradient(135deg, #A78BFA 0%, #818CF8 100%)'
                    : 'transparent',
                  border: selectedValue === option.value 
                    ? 'none' 
                    : '2px solid #E5E7EB',
                  color: selectedValue === option.value ? 'white' : '#6B7280',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: selectedValue === option.value ? 600 : 500
                }}
              >
                {option.value}
              </button>
            ))}
          </div>

          {/* Text Labels */}
          <div className="flex justify-between text-xs text-gray-500 mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
            <span>Strongly Disagree</span>
            <span className="text-gray-400">Neutral</span>
            <span>Strongly Agree</span>
          </div>

          {/* Selected Label */}
          {selectedValue !== null && (
            <div 
              className="text-center p-4 rounded-2xl"
              style={{ 
                background: 'linear-gradient(135deg, #EDE9FE 0%, #E0E7FF 100%)',
                border: '2px solid #A78BFA'
              }}
            >
              <p 
                className="text-base"
                style={{ 
                  fontFamily: 'Inter, sans-serif',
                  color: '#6366F1',
                  fontWeight: 500
                }}
              >
                {scaleOptions.find(opt => opt.value === selectedValue)?.label}
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="w-full max-w-md flex gap-3">
          <button
            onClick={handleSkip}
            className="flex-1 h-14 rounded-full border-2 transition-colors"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
              borderColor: '#E5E7EB',
              color: '#6B7280'
            }}
          >
            Skip
          </button>

          <button
            onClick={handleNext}
            disabled={selectedValue === null}
            className="flex-1 h-14 rounded-full transition-all disabled:opacity-40"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
              background: selectedValue !== null 
                ? 'linear-gradient(135deg, #A78BFA 0%, #818CF8 100%)'
                : '#F3F4F6',
              color: selectedValue !== null ? 'white' : '#9CA3AF',
              border: selectedValue !== null ? 'none' : '2px solid #D1D5DB'
            }}
          >
            {currentQuestion < questions.length - 1 ? 'Continue' : 'Complete'}
          </button>
        </div>
      </div>
    </div>
  );
}