import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { FeelingsWheel, SelectedEmotion } from "./FeelingsWheel";

interface ZOWCaptureProps {
  userName: string;
  onComplete: (zerLevel: number, trigger?: string) => void;
}

interface TapPoint {
  x: number;
  y: number;
  score: number;
  color: string;
}

// ── ZER colour scale ──────────────────────────────────────────────────────────
export function getZERColor(score: number): string {
  if (score === 7) return '#F97316';
  if (score === 6) return '#F59E0B';
  if (score >= 3)  return '#10B981';
  if (score === 2) return '#FBBF24';
  return '#F97316';
}

export function getZERZone(_score: number): string {
  return 'Zone of Emotional Regulation';
}

export function getZERArousal(score: number): string {
  if (score >= 6) return 'Hyper arousal';
  if (score >= 3) return 'Regulates';
  return 'Hypo arousal';
}

function isOutOfZone(score: number): boolean {
  return score <= 2 || score >= 6;
}

// ── Carousel emotion words per zone ──────────────────────────────────────────
const ZONE_WORDS: Record<string, { words: string[]; description: string; color: string }> = {
  hyper: {
    color: '#F97316',
    words: ['Anxious', 'Activated', 'Alert', 'Overwhelmed', 'Reactive', 'Tense', 'Wired'],
    description: 'High energy state — your nervous system is elevated. Use grounding or breath to regulate.',
  },
  regulates: {
    color: '#10B981',
    words: ['Calm', 'Grounded', 'Present', 'Centered', 'Settled', 'Clear', 'Balanced'],
    description: 'You are in the window of tolerance — able to think, feel and respond with clarity.',
  },
  hypo: {
    color: '#F97316',
    words: ['Numb', 'Withdrawn', 'Flat', 'Exhausted', 'Disconnected', 'Heavy', 'Foggy'],
    description: 'Low energy state — your system may be under-activated. Gentle movement or connection can help.',
  },
};

function getZoneKey(score: number): string {
  if (score >= 6) return 'hyper';
  if (score >= 3) return 'regulates';
  return 'hypo';
}

function WordCarousel({ score }: { score: number }) {
  const [idx, setIdx] = useState(0);
  const zone = ZONE_WORDS[getZoneKey(score)];
  return (
    <div className="mt-3 p-3 rounded-2xl" style={{ background: `${zone.color}11`, border: `1.5px solid ${zone.color}33` }}>
      <div className="flex items-center gap-2 mb-2">
        <button
          onClick={() => setIdx((i) => (i - 1 + zone.words.length) % zone.words.length)}
          className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: `${zone.color}22` }}
        >
          <ChevronLeft className="w-3 h-3" style={{ color: zone.color }} />
        </button>
        <div className="flex gap-2 flex-1 overflow-hidden justify-center">
          {[-1, 0, 1].map((offset) => {
            const wordIdx = (idx + offset + zone.words.length) % zone.words.length;
            const isCenter = offset === 0;
            return (
              <span
                key={offset}
                className="px-3 py-1 rounded-full text-xs transition-all flex-shrink-0"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: isCenter ? 700 : 400,
                  fontSize: isCenter ? '13px' : '11px',
                  background: isCenter ? zone.color : `${zone.color}22`,
                  color: isCenter ? 'white' : zone.color,
                  opacity: isCenter ? 1 : 0.6,
                }}
              >
                {zone.words[wordIdx]}
              </span>
            );
          })}
        </div>
        <button
          onClick={() => setIdx((i) => (i + 1) % zone.words.length)}
          className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: `${zone.color}22` }}
        >
          <ChevronRight className="w-3 h-3" style={{ color: zone.color }} />
        </button>
      </div>
      <p className="text-xs text-center leading-relaxed" style={{ fontFamily: 'Inter, sans-serif', color: '#6B7280', fontStyle: 'italic' }}>
        {zone.description}
      </p>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export function ZOWCapture({ userName, onComplete }: ZOWCaptureProps) {
  const [tapPoint, setTapPoint]           = useState<TapPoint | null>(null);
  const [showWheelPrompt, setShowWheelPrompt] = useState(false);
  const [showWheel, setShowWheel]         = useState(false);
  const [namedEmotion, setNamedEmotion]   = useState<SelectedEmotion | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const getScoreFromPosition = (y: number, h: number) =>
    Math.max(1, Math.min(7, Math.ceil(((h - y) / h) * 7)));

  const getCurrentTimePosition = () => {
    const now = new Date();
    return ((now.getHours() * 60 + now.getMinutes()) / 1440) * 100;
  };

  const handleCanvasTap = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const y = clientY - rect.top;
    const score = getScoreFromPosition(y, rect.height);
    setTapPoint({ x: getCurrentTimePosition(), y: ((rect.height - y) / rect.height) * 100, score, color: getZERColor(score) });
    setNamedEmotion(null);
    setShowWheelPrompt(false);
    setShowWheel(false);
  };

  const handleSubmit = () => {
    if (!tapPoint) return;
    if (isOutOfZone(tapPoint.score) && !showWheelPrompt && !namedEmotion) {
      setShowWheelPrompt(true);
      return;
    }
    const trigger = namedEmotion
      ? `${namedEmotion.core} — ${namedEmotion.secondary}${namedEmotion.tertiary ? ` (${namedEmotion.tertiary})` : ''}`
      : undefined;
    onComplete(tapPoint.score, trigger);
  };

  const handleEmotionSelected = (emotion: SelectedEmotion) => {
    setNamedEmotion(emotion);
    setShowWheel(false);
    setShowWheelPrompt(false);
  };

  const triggerLabel = namedEmotion
    ? `${namedEmotion.core} — ${namedEmotion.secondary}${namedEmotion.tertiary ? ` · ${namedEmotion.tertiary}` : ''}`
    : null;

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex-1 overflow-y-auto px-4">
        <div className="max-w-2xl mx-auto py-4">

          {/* Question */}
          <div className="mb-4 text-center">
            <h2 className="text-xl mb-1" style={{ fontFamily: 'Lora, serif', fontWeight: 500, color: '#15113C' }}>
              Welcome back, {userName}
            </h2>
            <p className="text-sm mb-1" style={{ fontFamily: 'Inter, sans-serif', color: '#6B7280' }}>
              How are you feeling today?
            </p>
            <p className="text-xs" style={{ fontFamily: 'Inter, sans-serif', color: '#9CA3AF', fontStyle: 'italic' }}>
              Tap on the canvas at{' '}
              <span style={{ color: '#8B5CF6', fontWeight: 600 }}>
                {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
              </span>
            </p>
          </div>

          {/* Canvas */}
          <div className="mb-3">
            <div className="mb-2 ml-14">
              <span className="text-xs" style={{ fontFamily: 'Inter, sans-serif', color: '#6B7280', fontWeight: 600, letterSpacing: '0.1em' }}>TODAY</span>
            </div>
            <div className="flex items-start">
              {/* Y-axis */}
              <div className="flex flex-col justify-between mr-2" style={{ height: '300px', paddingTop: '8px', paddingBottom: '8px' }}>
                {[
                  { label: 'Hyper', sub: '(6-7)', color: '#F97316' },
                  { label: '',      sub: '',       color: 'transparent' },
                  { label: 'Reg.',  sub: '(3-5)', color: '#10B981' },
                  { label: '',      sub: '',       color: 'transparent' },
                  { label: 'Hypo',  sub: '(1-2)', color: '#F97316' },
                  { label: '',      sub: '',       color: 'transparent' },
                ].map((item, i) => (
                  <span key={i} className="text-right leading-tight" style={{ fontFamily: 'Inter, sans-serif', fontSize: '9px', fontWeight: 600, width: '42px', color: item.color }}>
                    {item.label}
                    {item.sub && <span style={{ display: 'block', fontSize: '8px', fontWeight: 400, color: '#9CA3AF' }}>{item.sub}</span>}
                  </span>
                ))}
              </div>

              <div className="flex-1">
                <div
                  ref={canvasRef}
                  onClick={handleCanvasTap}
                  onTouchStart={handleCanvasTap}
                  className="relative rounded-3xl cursor-pointer border-2 overflow-hidden"
                  style={{ height: '300px', background: 'linear-gradient(to top, #FED7AA 0%, #FEF3C7 20%, #D1FAE5 40%, #D1FAE5 65%, #FEF3C7 82%, #FED7AA 100%)', borderColor: '#E5E7EB' }}
                >
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.4 }}>
                    <line x1="0" y1="28.5%" x2="100%" y2="28.5%" stroke="#9CA3AF" strokeWidth="1" strokeDasharray="4,4" />
                    <line x1="0" y1="71.5%" x2="100%" y2="71.5%" stroke="#9CA3AF" strokeWidth="1" strokeDasharray="4,4" />
                    <line x1="25%" y1="0" x2="25%" y2="100%" stroke="#8B5CF6" strokeWidth="1" strokeDasharray="3,3" />
                    <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#8B5CF6" strokeWidth="1" strokeDasharray="3,3" />
                    <line x1="75%" y1="0" x2="75%" y2="100%" stroke="#8B5CF6" strokeWidth="1" strokeDasharray="3,3" />
                  </svg>
                  <div className="absolute top-0 bottom-0 w-0.5 pointer-events-none" style={{ left: `${getCurrentTimePosition()}%`, background: 'linear-gradient(to bottom, transparent 0%, #8B5CF6 50%, transparent 100%)', opacity: 0.4 }} />
                  {tapPoint && (
                    <div
                      className="absolute w-6 h-6 rounded-full border-4 border-white shadow-lg animate-pulse"
                      style={{ left: `${tapPoint.x}%`, top: `${100 - tapPoint.y}%`, transform: 'translate(-50%, -50%)', background: tapPoint.color }}
                    />
                  )}
                </div>
                <div className="flex items-center justify-between mt-2">
                  {['00:00', '06:00', '12:00', '18:00', '24:00'].map((t) => (
                    <span key={t} className="text-xs text-center flex-1" style={{ fontFamily: 'Inter, sans-serif', color: '#8B5CF6', fontWeight: 600 }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Score card */}
          {tapPoint && (
            <div className="p-3 rounded-3xl mb-3" style={{ background: 'white', border: '2px solid #E5E7EB' }}>
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: tapPoint.color }}>
                  <span className="text-2xl" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, color: 'white' }}>{tapPoint.score}</span>
                </div>
                <div className="flex-1">
                  <p className="text-xs mb-0.5" style={{ fontFamily: 'Inter, sans-serif', color: '#9CA3AF' }}>Your ZER Score</p>
                  <p className="text-sm mb-0.5" style={{ fontFamily: 'Lora, serif', fontWeight: 500, color: '#15113C' }}>{getZERZone(tapPoint.score)}</p>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full text-xs" style={{ background: `${tapPoint.color}22`, color: tapPoint.color, fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                      {getZERArousal(tapPoint.score)}
                    </span>
                    <p className="text-xs" style={{ fontFamily: 'Inter, sans-serif', color: '#8B5CF6', fontWeight: 600 }}>
                      {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
                    </p>
                  </div>
                </div>
              </div>
              <WordCarousel score={tapPoint.score} />

              {/* Named emotion chip */}
              {namedEmotion && (
                <div className="mt-3 flex items-center gap-2 px-3 py-2 rounded-2xl" style={{ background: '#EDE9FE', border: '1.5px solid #C4B5FD' }}>
                  <span className="text-xs flex-1" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#6D28D9' }}>
                    🏷️ {triggerLabel}
                  </span>
                  <button onClick={() => setNamedEmotion(null)}>
                    <X className="w-3 h-3" style={{ color: '#8B5CF6' }} />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Out-of-zone prompt */}
          {tapPoint && isOutOfZone(tapPoint.score) && showWheelPrompt && !showWheel && !namedEmotion && (
            <div className="p-4 rounded-3xl mb-3" style={{ background: 'linear-gradient(135deg, #EDE9FE 0%, #DDD6FE 100%)', border: '1.5px solid #C4B5FD' }}>
              <p className="text-sm mb-1" style={{ fontFamily: 'Lora, serif', fontWeight: 500, color: '#15113C' }}>
                You're outside your regulation zone
              </p>
              <p className="text-xs mb-3" style={{ fontFamily: 'Inter, sans-serif', color: '#4C1D95', lineHeight: 1.6 }}>
                Would you like to share what's causing this? Naming your emotion helps you move through it.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowWheel(true)}
                  className="flex-1 py-2.5 rounded-2xl text-sm"
                  style={{ background: '#F59E0B', color: 'white', fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                >
                  Name what I feel
                </button>
                <button
                  onClick={() => { setShowWheelPrompt(false); onComplete(tapPoint.score); }}
                  className="flex-1 py-2.5 rounded-2xl text-sm"
                  style={{ background: 'rgba(255,255,255,0.7)', color: '#92400E', fontFamily: 'Inter, sans-serif', fontWeight: 500, border: '1.5px solid #FBBF24' }}
                >
                  Continue anyway
                </button>
              </div>
            </div>
          )}

          {/* Feelings wheel */}
          {showWheel && (
            <div className="mb-3">
              <FeelingsWheel
                onSelect={handleEmotionSelected}
                onSkip={() => { setShowWheel(false); setShowWheelPrompt(false); onComplete(tapPoint!.score); }}
              />
            </div>
          )}

          <div className="pb-4" />
        </div>
      </div>

      {/* Continue */}
      {!showWheel && (
        <div
          className="flex-shrink-0 px-4 py-3"
          style={{ background: 'linear-gradient(180deg, rgba(250,245,255,0.8) 0%, rgba(250,245,255,1) 100%)', borderTop: '1px solid rgba(229,231,235,0.3)' }}
        >
          <div className="max-w-2xl mx-auto">
            <button
              onClick={handleSubmit}
              disabled={!tapPoint}
              className="w-full py-3 rounded-full transition-all disabled:opacity-40"
              style={{
                background: tapPoint ? 'linear-gradient(135deg, #A78BFA 0%, #8B5CF6 100%)' : '#E5E7EB',
                color: 'white',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: '15px',
                border: tapPoint ? 'none' : '2px solid #D1D5DB',
              }}
            >
              {tapPoint && isOutOfZone(tapPoint.score) && !showWheelPrompt && !namedEmotion
                ? 'Continue'
                : namedEmotion ? 'Save & continue' : 'Continue'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
