import { useState } from "react";
import { Target } from "lucide-react";

interface DailyIntentionProps {
  userName: string;
  onComplete: (intention: string) => void;
}

export function DailyIntention({ userName, onComplete }: DailyIntentionProps) {
  const [intention, setIntention] = useState("");

  const handleSubmit = () => {
    if (intention.trim()) {
      onComplete(intention);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex-1 overflow-y-auto px-4">
        <div className="max-w-2xl mx-auto py-6">
          {/* Question */}
          <div className="mb-8 text-center">
            <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full" style={{ background: 'rgba(139, 92, 246, 0.15)' }}>
              <Target className="w-8 h-8" style={{ color: '#8B5CF6' }} />
            </div>
            <h2 
              className="text-3xl mb-3"
              style={{ 
                fontFamily: 'Lora, serif',
                fontWeight: 500,
                color: '#15113C',
                lineHeight: 1.3
              }}
            >
              What do you wish to accomplish today?
            </h2>
            <p 
              className="text-base"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                color: '#6B7280'
              }}
            >
              Set your intention for the day ahead, {userName}
            </p>
          </div>

          {/* Large Text Input */}
          <div className="mb-6">
            <textarea
              value={intention}
              onChange={(e) => setIntention(e.target.value)}
              placeholder="I want to focus on..."
              rows={8}
              className="w-full px-6 py-5 rounded-3xl border-2 focus:outline-none resize-none transition-colors"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '16px',
                color: '#15113C',
                background: 'white',
                borderColor: intention.trim() ? '#C4B5FD' : '#E5E7EB',
                lineHeight: 1.6
              }}
            />
            <p 
              className="text-xs mt-2 px-2"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                color: '#9CA3AF'
              }}
            >
              {intention.length} / 500 characters
            </p>
          </div>

          {/* Quick Suggestions */}
          <div className="pb-24">
            <p 
              className="text-xs mb-3 px-2"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                color: '#6B7280',
                fontWeight: 500
              }}
            >
              Need inspiration?
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "Practice self-compassion",
                "Set healthy boundaries",
                "Connect with loved ones",
                "Prioritize rest",
                "Express gratitude"
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setIntention(suggestion)}
                  className="px-4 py-2 rounded-full text-sm transition-all"
                  style={{
                    background: 'white',
                    border: '2px solid #DDD6FE',
                    color: '#7C3AED',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 500
                  }}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Submit Button */}
      <div 
        className="flex-shrink-0 px-4 py-4"
        style={{
          background: 'linear-gradient(180deg, rgba(250, 245, 255, 0.8) 0%, rgba(250, 245, 255, 1) 100%)',
          borderTop: '1px solid rgba(229, 231, 235, 0.3)'
        }}
      >
        <div className="max-w-2xl mx-auto">
          <button
            onClick={handleSubmit}
            disabled={!intention.trim()}
            className="w-full py-4 rounded-full transition-all disabled:opacity-40"
            style={{
              background: intention.trim() ? 'linear-gradient(135deg, #A78BFA 0%, #8B5CF6 100%)' : '#E5E7EB',
              color: 'white',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: '16px',
              border: intention.trim() ? 'none' : '2px solid #D1D5DB'
            }}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}