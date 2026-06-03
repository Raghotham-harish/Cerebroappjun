import { useState } from "react";
import { Heart, RefreshCw } from "lucide-react";

interface GratitudeExerciseProps {
  onComplete: () => void;
  onSwitch: () => void;
}

const gratitudePrompts = [
  "What made you smile today?",
  "Who brought joy to your life recently?",
  "What's something simple you're grateful for?",
  "What comfort do you appreciate right now?",
  "What strength within you are you thankful for?"
];

export function GratitudeExercise({ onComplete, onSwitch }: GratitudeExerciseProps) {
  const [currentPrompt] = useState(gratitudePrompts[Math.floor(Math.random() * gratitudePrompts.length)]);
  const [gratitudeText, setGratitudeText] = useState("");

  const handleComplete = () => {
    if (gratitudeText.trim()) {
      onComplete();
    }
  };

  return (
    <div 
      className="fixed inset-0 flex flex-col items-center justify-center px-6"
      style={{ 
        background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
        zIndex: 1000
      }}
    >
      {/* Heart Icon */}
      <div 
        className="w-20 h-20 rounded-full flex items-center justify-center mb-8"
        style={{ 
          background: '#F59E0B',
          boxShadow: '0 8px 24px rgba(245, 158, 11, 0.3)'
        }}
      >
        <Heart className="w-10 h-10" style={{ color: 'white' }} fill="white" />
      </div>

      {/* Title */}
      <h3 
        className="text-2xl mb-4 text-center"
        style={{ 
          fontFamily: 'Lora, serif',
          fontWeight: 500,
          color: '#15113C'
        }}
      >
        Gratitude Moment
      </h3>

      {/* Prompt */}
      <p 
        className="text-base mb-8 text-center max-w-md"
        style={{ 
          fontFamily: 'Inter, sans-serif',
          color: '#78350F',
          fontStyle: 'italic'
        }}
      >
        {currentPrompt}
      </p>

      {/* Text Area */}
      <textarea
        value={gratitudeText}
        onChange={(e) => setGratitudeText(e.target.value)}
        placeholder="Write your thoughts here..."
        className="w-full max-w-md px-5 py-4 rounded-3xl text-sm border-2 focus:outline-none transition-colors resize-none mb-8"
        rows={5}
        style={{ 
          fontFamily: 'Inter, sans-serif', 
          color: '#15113C',
          background: 'white',
          borderColor: gratitudeText.trim() ? '#F59E0B' : '#FDE68A'
        }}
      />

      {/* Action Buttons */}
      <div className="flex gap-3 w-full max-w-md mb-4">
        <button
          onClick={onSwitch}
          className="flex-1 py-4 rounded-full flex items-center justify-center gap-2"
          style={{
            background: 'white',
            border: '2px solid #FDE68A',
            fontFamily: 'Inter, sans-serif',
            color: '#78350F',
            fontSize: '14px',
            fontWeight: 500
          }}
        >
          <RefreshCw className="w-4 h-4" />
          Switch
        </button>
        <button
          onClick={handleComplete}
          disabled={!gratitudeText.trim()}
          className="flex-1 py-4 rounded-full transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ 
            background: gratitudeText.trim() ? 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)' : '#E5E7EB',
            color: 'white',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            fontSize: '14px',
            border: gratitudeText.trim() ? 'none' : '2px solid #D1D5DB'
          }}
        >
          Complete
        </button>
      </div>
    </div>
  );
}