import { useState, useEffect, useRef } from "react";
import { Target, Mic, MicOff, Volume2 } from "lucide-react";

interface DailyIntentionProps {
  userName: string;
  userIntents?: string[];          // from DailyIntentCapture selections
  onComplete: (intention: string) => void;
}

// Comprehensive suggestion pool across all 4 pillars
const SUGGESTION_POOL = [
  // Daily Ritual
  "Be more productive today",
  "Build a better morning routine",
  "Improve my sleep quality",
  "Practice meditation",
  "Manage stress better",
  "Learn to pause before reacting",
  "Practise emotional regulation",
  // Personal Development
  "Build confidence in myself",
  "Make a better decision today",
  "Develop self-awareness",
  "Work on my shadows",
  "Set healthy boundaries",
  "Overcome anxiety",
  "Develop a growth mindset",
  "Strengthen my willpower",
  // Spiritual
  "Find more inner peace",
  "Experience more love today",
  "Heal from a personal loss",
  "Gain deeper self insights",
  "Deepen my spiritual practice",
  "Practise gratitude",
  "Connect with nature",
  "Be more mindfully present",
  // Creative
  "Boost my imagination",
  "Think more creatively",
  "Improve my focus",
  "Express myself artistically",
  "Develop my intuition",
  "Enter a flow state",
  "Write something creative",
];

function getRandomSuggestions(pool: string[], count = 5): string[] {
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// Voice guide: speak text using TTS
function speak(text: string) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.rate = 0.9; u.pitch = 1.05; u.volume = 1;
  const voices = window.speechSynthesis.getVoices();
  const preferred = voices.find(v => v.name.includes('Samantha') || v.name.includes('Google US English') || v.name.includes('Female'));
  if (preferred) u.voice = preferred;
  window.speechSynthesis.speak(u);
}

// Progressive form steps
const STEPS = [
  { id: 'what',  question: 'What do you wish to accomplish today?',    placeholder: 'I want to focus on…',               hint: 'Tap a suggestion or write your own' },
  { id: 'how',   question: 'How will you do it?',                      placeholder: 'I will do this by…',                hint: 'One concrete action step' },
  { id: 'when',  question: 'When today will you make time for this?',  placeholder: 'I will start at… / This morning…',  hint: 'Morning, afternoon, or a specific time' },
  { id: 'why',   question: 'Why does this matter to you?',             placeholder: 'This is important because…',        hint: 'Connect it to something meaningful' },
];

export function DailyIntention({ userName, userIntents = [], onComplete }: DailyIntentionProps) {
  const [stepIdx, setStepIdx]   = useState(0);
  const [answers, setAnswers]   = useState(['', '', '', '']);
  const [listening, setListening] = useState(false);
  const [suggestions]           = useState(() =>
    getRandomSuggestions(userIntents.length >= 3 ? userIntents : SUGGESTION_POOL)
  );
  const recognitionRef = useRef<any>(null);

  const step    = STEPS[stepIdx];
  const current = answers[stepIdx];
  const isLast  = stepIdx === STEPS.length - 1;

  // Speak the question when step changes
  useEffect(() => {
    const timer = setTimeout(() => speak(step.question), 400);
    return () => clearTimeout(timer);
  }, [stepIdx]);

  const setAnswer = (val: string) => {
    const updated = [...answers];
    updated[stepIdx] = val;
    setAnswers(updated);
  };

  const handleChipClick = (s: string) => {
    setAnswer(s);
  };

  const handleNext = () => {
    if (!current.trim()) return;
    if (isLast) {
      const full = [
        `What: ${answers[0]}`,
        `How: ${answers[1]}`,
        `When: ${answers[2]}`,
        `Why: ${answers[3]}`,
      ].filter((_, i) => answers[i].trim()).join('\n');
      onComplete(full || answers[0]);
    } else {
      setStepIdx(i => i + 1);
    }
  };

  const handleSkip = () => {
    if (isLast) {
      onComplete(answers[0] || 'Set my daily intention');
    } else {
      setStepIdx(i => i + 1);
    }
  };

  // Voice input
  const startListening = () => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) return;
    const rec = new SR();
    rec.lang = 'en-US';
    rec.interimResults = false;
    rec.onstart = () => setListening(true);
    rec.onresult = (e: any) => {
      const t = e.results[0][0].transcript;
      setAnswer(t);
      setListening(false);
    };
    rec.onerror = () => setListening(false);
    rec.onend   = () => setListening(false);
    rec.start();
    recognitionRef.current = rec;
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setListening(false);
  };

  const progress = ((stepIdx + 1) / STEPS.length) * 100;

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex-1 overflow-y-auto px-4">
        <div className="max-w-2xl mx-auto py-6">

          {/* Icon */}
          <div className="mb-4 flex justify-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full" style={{ background: 'rgba(139,92,246,0.12)' }}>
              <Target className="w-7 h-7" style={{ color: '#8B5CF6' }} />
            </div>
          </div>

          {/* Progress */}
          <div className="h-1.5 rounded-full mb-6" style={{ background: '#E5E7EB' }}>
            <div className="h-full rounded-full transition-all duration-500" style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #A78BFA, #8B5CF6)' }} />
          </div>

          {/* Step indicator */}
          <p className="text-center text-xs mb-2" style={{ fontFamily: 'Inter, sans-serif', color: '#9CA3AF', letterSpacing: '0.06em', fontWeight: 600 }}>
            STEP {stepIdx + 1} OF {STEPS.length}
          </p>

          {/* Question */}
          <div className="mb-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <h2
                className="text-2xl"
                style={{ fontFamily: 'Lora, serif', fontWeight: 500, color: '#15113C', lineHeight: 1.3 }}
              >
                {step.question}
              </h2>
              <button
                onClick={() => speak(step.question)}
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(139,92,246,0.1)' }}
                title="Read aloud"
              >
                <Volume2 className="w-4 h-4" style={{ color: '#8B5CF6' }} />
              </button>
            </div>
            <p className="text-sm" style={{ fontFamily: 'Inter, sans-serif', color: '#6B7280' }}>
              {step.id === 'what' ? `Set your intention, ${userName}` : step.hint}
            </p>
          </div>

          {/* Previously answered — compact recap */}
          {stepIdx > 0 && answers[0] && (
            <div className="mb-4 px-4 py-3 rounded-2xl" style={{ background: 'rgba(139,92,246,0.06)', border: '1.5px solid rgba(139,92,246,0.15)' }}>
              {STEPS.slice(0, stepIdx).map((s, i) => answers[i] && (
                <p key={s.id} className="text-xs leading-relaxed" style={{ fontFamily: 'Inter, sans-serif', color: '#6D28D9' }}>
                  <strong style={{ textTransform: 'capitalize' }}>{s.id}:</strong> {answers[i]}
                </p>
              ))}
            </div>
          )}

          {/* Text input + voice button */}
          <div className="mb-4 relative">
            <textarea
              value={current}
              onChange={e => setAnswer(e.target.value)}
              placeholder={step.placeholder}
              rows={4}
              className="w-full px-5 py-4 rounded-3xl border-2 focus:outline-none resize-none transition-colors pr-14"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '16px',
                color: '#15113C',
                background: 'white',
                borderColor: current.trim() ? '#C4B5FD' : '#E5E7EB',
                lineHeight: 1.6,
              }}
            />
            {/* Mic button */}
            <button
              onMouseDown={startListening}
              onMouseUp={stopListening}
              onTouchStart={startListening}
              onTouchEnd={stopListening}
              className="absolute bottom-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-all"
              style={{ background: listening ? '#8B5CF6' : 'rgba(139,92,246,0.1)', border: listening ? 'none' : '1.5px solid rgba(139,92,246,0.25)' }}
              title="Hold to speak"
            >
              {listening
                ? <MicOff className="w-4 h-4" style={{ color: 'white' }} />
                : <Mic className="w-4 h-4" style={{ color: '#8B5CF6' }} />
              }
            </button>
            {listening && (
              <p className="text-xs mt-1 px-2 text-center" style={{ fontFamily: 'Inter, sans-serif', color: '#8B5CF6', fontWeight: 600 }}>
                Listening… release when done
              </p>
            )}
            {!listening && (
              <p className="text-xs mt-1 px-2" style={{ fontFamily: 'Inter, sans-serif', color: '#9CA3AF' }}>
                {current.length} / 300 characters
              </p>
            )}
          </div>

          {/* Suggestion chips — only on step 1 */}
          {stepIdx === 0 && (
            <div className="mb-6">
              <p className="text-xs mb-3 px-1" style={{ fontFamily: 'Inter, sans-serif', color: '#6B7280', fontWeight: 500 }}>
                Need inspiration? Tap to fill →
              </p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map(s => (
                  <button
                    key={s}
                    onClick={() => handleChipClick(s)}
                    className="px-4 py-2 rounded-full text-sm transition-all active:scale-95"
                    style={{
                      background: current === s ? '#8B5CF6' : 'white',
                      border: `2px solid ${current === s ? '#8B5CF6' : '#DDD6FE'}`,
                      color: current === s ? 'white' : '#7C3AED',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 500,
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Helpful micro-prompts for steps 2+ */}
          {stepIdx === 1 && (
            <div className="mb-4 p-3 rounded-2xl" style={{ background: '#EDE9FE', border: '1.5px solid #C4B5FD' }}>
              <p className="text-xs" style={{ fontFamily: 'Inter, sans-serif', color: '#4C1D95', lineHeight: 1.6 }}>
                Be specific — "I will meditate for 10 minutes at 8am" is more actionable than "I will meditate."
              </p>
            </div>
          )}
          {stepIdx === 2 && (
            <div className="flex gap-2 mb-4 flex-wrap">
              {['This morning', 'After lunch', 'This evening', 'Right now'].map(t => (
                <button
                  key={t}
                  onClick={() => setAnswer(t)}
                  className="px-3 py-1.5 rounded-full text-xs"
                  style={{ background: current === t ? '#8B5CF6' : 'white', border: `1.5px solid ${current === t ? '#8B5CF6' : '#DDD6FE'}`, color: current === t ? 'white' : '#7C3AED', fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                >
                  {t}
                </button>
              ))}
            </div>
          )}
          {stepIdx === 3 && (
            <div className="mb-4 p-3 rounded-2xl" style={{ background: '#EDE9FE', border: '1.5px solid #C4B5FD' }}>
              <p className="text-xs" style={{ fontFamily: 'Inter, sans-serif', color: '#4C1D95', lineHeight: 1.6 }}>
                Connecting your intention to a deeper meaning makes it 3× more likely to happen.
              </p>
            </div>
          )}

          <div className="pb-24" />
        </div>
      </div>

      {/* Sticky buttons */}
      <div
        className="flex-shrink-0 px-4 py-4"
        style={{ background: 'linear-gradient(180deg, rgba(250,245,255,0.8) 0%, rgba(250,245,255,1) 100%)', borderTop: '1px solid rgba(229,231,235,0.3)' }}
      >
        <div className="max-w-2xl mx-auto flex gap-3">
          <button
            onClick={handleSkip}
            className="px-5 py-4 rounded-full"
            style={{ background: 'white', border: '2px solid #E5E7EB', color: '#9CA3AF', fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '15px' }}
          >
            Skip
          </button>
          <button
            onClick={handleNext}
            disabled={!current.trim()}
            className="flex-1 py-4 rounded-full transition-all disabled:opacity-40"
            style={{
              background: current.trim() ? 'linear-gradient(135deg, #A78BFA 0%, #8B5CF6 100%)' : '#E5E7EB',
              color: 'white',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: '16px',
              border: current.trim() ? 'none' : '2px solid #D1D5DB',
            }}
          >
            {isLast ? 'Set my intention' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  );
}
