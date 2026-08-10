import { useState } from "react";
import { ArrowLeft, Check } from "lucide-react";

export interface SelectedEmotion {
  core: string;
  secondary: string;
  tertiary?: string;
}

interface FeelingsWheelProps {
  onSelect: (emotion: SelectedEmotion) => void;
  onSkip: () => void;
}

// ── Feelings wheel data (Plutchik-based + clinical extensions) ────────────────
export const FEELINGS_WHEEL: Record<string, Record<string, string[]>> = {
  Happy: {
    Playful:    ['Aroused', 'Cheeky', 'Free', 'Joyful'],
    Content:    ['Peaceful', 'Fulfilled', 'Grateful', 'Serene'],
    Interested: ['Curious', 'Inquisitive', 'Fascinated', 'Engaged'],
    Proud:      ['Successful', 'Confident', 'Respected', 'Valued'],
    Powerful:   ['Courageous', 'Creative', 'Inspired', 'Energised'],
    Optimistic: ['Hopeful', 'Motivated', 'Trusting', 'Open'],
  },
  Sad: {
    Lonely:     ['Isolated', 'Abandoned', 'Disconnected', 'Invisible'],
    Vulnerable: ['Fragile', 'Exposed', 'Sensitive', 'Helpless'],
    Despair:    ['Grief', 'Powerless', 'Hopeless', 'Lost'],
    Guilty:     ['Ashamed', 'Remorseful', 'Regretful', 'Embarrassed'],
    Depressed:  ['Empty', 'Heavy', 'Flat', 'Numb'],
    Hurt:       ['Disappointed', 'Let down', 'Betrayed', 'Rejected'],
  },
  Angry: {
    Frustrated: ['Irritated', 'Annoyed', 'Agitated', 'Impatient'],
    Hostile:    ['Furious', 'Mad', 'Enraged', 'Provoked'],
    Distant:    ['Withdrawn', 'Dismissive', 'Critical', 'Cold'],
    Jealous:    ['Envious', 'Possessive', 'Resentful', 'Suspicious'],
    Disrespected: ['Ridiculed', 'Humiliated', 'Judged', 'Violated'],
  },
  Fearful: {
    Scared:     ['Helpless', 'Frightened', 'Overwhelmed', 'Shocked'],
    Anxious:    ['Worried', 'Nervous', 'Tense', 'Uneasy'],
    Insecure:   ['Inferior', 'Worthless', 'Exposed', 'Inadequate'],
    Threatened: ['Vulnerable', 'Persecuted', 'Trapped', 'Panicked'],
  },
  Surprised: {
    Startled:   ['Shocked', 'Dismayed', 'Taken aback', 'Confused'],
    Amazed:     ['Astonished', 'In awe', 'Excited', 'Energised'],
    Confused:   ['Disillusioned', 'Perplexed', 'Disoriented', 'Uncertain'],
  },
  Disgusted: {
    Disapproving: ['Judgemental', 'Embarrassed', 'Appalled', 'Revolted'],
    Awful:        ['Nauseated', 'Repelled', 'Horrified', 'Sick'],
    Loathing:     ['Detestable', 'Revulsion', 'Hate', 'Contempt'],
  },
  Bad: {
    Bored:       ['Indifferent', 'Apathetic', 'Unfulfilled', 'Restless'],
    Tired:       ['Exhausted', 'Sleepy', 'Drained', 'Depleted'],
    Stressed:    ['Overwhelmed', 'Out of control', 'Fragmented', 'Pressured'],
    Rushed:      ['Busy', 'Frantic', 'Scattered', 'Overloaded'],
  },
};

const CORE_COLORS: Record<string, { bg: string; text: string; light: string }> = {
  Happy:     { bg: '#F59E0B', text: 'white', light: '#FEF3C7' },
  Sad:       { bg: '#3B82F6', text: 'white', light: '#DBEAFE' },
  Angry:     { bg: '#EF4444', text: 'white', light: '#FEE2E2' },
  Fearful:   { bg: '#8B5CF6', text: 'white', light: '#EDE9FE' },
  Surprised: { bg: '#06B6D4', text: 'white', light: '#CFFAFE' },
  Disgusted: { bg: '#10B981', text: 'white', light: '#D1FAE5' },
  Bad:       { bg: '#6B7280', text: 'white', light: '#F3F4F6' },
};

export function FeelingsWheel({ onSelect, onSkip }: FeelingsWheelProps) {
  const [core, setCore]           = useState<string | null>(null);
  const [secondary, setSecondary] = useState<string | null>(null);
  const [tertiary, setTertiary]   = useState<string | null>(null);

  const coreList      = Object.keys(FEELINGS_WHEEL);
  const secondaryList = core ? Object.keys(FEELINGS_WHEEL[core]) : [];
  const tertiaryList  = core && secondary ? FEELINGS_WHEEL[core][secondary] : [];

  const colors = core ? CORE_COLORS[core] : null;

  const handleConfirm = () => {
    if (!core || !secondary) return;
    onSelect({ core, secondary, tertiary: tertiary ?? undefined });
  };

  return (
    <div
      className="flex flex-col gap-4"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      {/* Instruction banner */}
      <div
        className="p-4 rounded-2xl text-center"
        style={{ background: 'linear-gradient(135deg, #EDE9FE 0%, #DBEAFE 100%)', border: '1.5px solid #C4B5FD' }}
      >
        <p className="text-sm mb-1" style={{ fontFamily: 'Lora, serif', fontWeight: 500, color: '#15113C' }}>
          Use the Feelings Wheel
        </p>
        <p className="text-xs" style={{ color: '#6B7280', lineHeight: 1.6 }}>
          Find an accurate label for what you're experiencing. Naming emotions helps you feel less reactive and more in control.
        </p>
      </div>

      {/* Step 1 — Core emotion */}
      <div>
        <p className="text-xs mb-2 px-1" style={{ fontWeight: 600, color: '#9CA3AF', letterSpacing: '0.06em' }}>
          STEP 1 — What's the core feeling?
        </p>
        <div className="grid grid-cols-4 gap-2">
          {coreList.map((c) => {
            const col = CORE_COLORS[c];
            const active = core === c;
            return (
              <button
                key={c}
                onClick={() => { setCore(c); setSecondary(null); setTertiary(null); }}
                className="py-2 px-1 rounded-2xl text-center transition-all active:scale-95"
                style={{
                  background: active ? col.bg : col.light,
                  border: `2px solid ${active ? col.bg : 'transparent'}`,
                  color: active ? col.text : '#374151',
                  fontSize: '12px',
                  fontWeight: active ? 700 : 500,
                  boxShadow: active ? `0 4px 12px ${col.bg}44` : 'none',
                }}
              >
                {c}
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 2 — Secondary */}
      {core && secondaryList.length > 0 && (
        <div>
          <p className="text-xs mb-2 px-1" style={{ fontWeight: 600, color: '#9CA3AF', letterSpacing: '0.06em' }}>
            STEP 2 — More specifically…
          </p>
          <div className="grid grid-cols-3 gap-2">
            {secondaryList.map((s) => {
              const active = secondary === s;
              return (
                <button
                  key={s}
                  onClick={() => { setSecondary(s); setTertiary(null); }}
                  className="py-2 px-2 rounded-xl text-center transition-all active:scale-95"
                  style={{
                    background: active ? colors!.bg : colors!.light,
                    border: `1.5px solid ${active ? colors!.bg : 'transparent'}`,
                    color: active ? colors!.text : '#374151',
                    fontSize: '12px',
                    fontWeight: active ? 700 : 400,
                  }}
                >
                  {s}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Step 3 — Tertiary */}
      {secondary && tertiaryList.length > 0 && (
        <div>
          <p className="text-xs mb-2 px-1" style={{ fontWeight: 600, color: '#9CA3AF', letterSpacing: '0.06em' }}>
            STEP 3 — Even more precisely…
          </p>
          <div className="flex flex-wrap gap-2">
            {tertiaryList.map((t) => {
              const active = tertiary === t;
              return (
                <button
                  key={t}
                  onClick={() => setTertiary(active ? null : t)}
                  className="px-3 py-1.5 rounded-full text-xs transition-all active:scale-95"
                  style={{
                    background: active ? colors!.bg : 'white',
                    border: `1.5px solid ${active ? colors!.bg : '#E5E7EB'}`,
                    color: active ? colors!.text : '#6B7280',
                    fontWeight: active ? 600 : 400,
                  }}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex gap-3 mt-2">
        <button
          onClick={onSkip}
          className="flex-1 py-3 rounded-full"
          style={{ background: '#F3F4F6', color: '#6B7280', fontWeight: 500, fontSize: '14px' }}
        >
          Skip
        </button>
        <button
          onClick={handleConfirm}
          disabled={!core || !secondary}
          className="flex-1 py-3 rounded-full flex items-center justify-center gap-2 disabled:opacity-40"
          style={{
            background: core ? CORE_COLORS[core].bg : '#E5E7EB',
            color: 'white',
            fontWeight: 600,
            fontSize: '14px',
          }}
        >
          <Check className="w-4 h-4" />
          Name this feeling
        </button>
      </div>
    </div>
  );
}
