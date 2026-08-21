import { useState } from "react";
import { ArrowLeft, Heart, Check } from "lucide-react";

// ── Design tokens ────────────────────────────────────────────────────────────
const PAGE_BG = "linear-gradient(180deg, #EDE9FE 0%, #F5F3FF 100%)";
const DONE_BG = "linear-gradient(135deg, #EDE9FE 0%, #C4B5FD 100%)";
const PURPLE = "#8B5CF6";
const ICON_COLOR = "#15113C";
const AMBER_LIGHT = "#FDE68A";
const AMBER_ACCENT = "#F59E0B";
const AMBER_TINT = "#FFFBEB";

// ── Questions ─────────────────────────────────────────────────────────────────
interface Question {
  text: string;
  reverse: boolean;
}

const QUESTIONS: Question[] = [
  { text: "I couldn't have gotten where I am today without the help of many people.", reverse: false },
  { text: "Life has been good to me.", reverse: false },
  { text: "There never seems to be enough to go around and I never seem to get my share.", reverse: true },
  { text: "Oftentimes I have been overwhelmed at the beauty of nature.", reverse: false },
  { text: "Although I think it's important to feel good about your accomplishments, I think that it's also important to remember how others have contributed to my accomplishments.", reverse: false },
  { text: "I really don't think that I've gotten all the good things that I deserve in life.", reverse: true },
  { text: "Every Fall I really enjoy watching the leaves change colors.", reverse: false },
  { text: "Although I'm basically in control of my life, I can't help but think about all those who have supported me and helped me along the way.", reverse: false },
  { text: "I think that it's important to \"Stop and smell the roses.\"", reverse: false },
  { text: "More bad things have happened to me in my life than I deserve.", reverse: true },
  { text: "Because of what I've gone through in my life, I really feel like the world owes me something.", reverse: true },
  { text: "I think that it's important to pause often to \"count my blessings.\"", reverse: false },
  { text: "I think it's important to enjoy the simple things in life.", reverse: false },
  { text: "I feel deeply appreciative for the things others have done for me in my life.", reverse: false },
  { text: "For some reason I don't seem to get the advantages that others get.", reverse: true },
  { text: "I think it's important to appreciate each day that you are alive.", reverse: false },
];

const TOTAL = QUESTIONS.length;

// Factor indices (0-based)
// LOSD: items 2,3,6,10,11,15 → indices 1,2,5,9,10,14
// SA:   items 4,7,9,12,13,16 → indices 3,6,8,11,12,15
// AO:   items 1,5,8,14       → indices 0,4,7,13
const LOSD_INDICES = [1, 2, 5, 9, 10, 14];
const SA_INDICES = [3, 6, 8, 11, 12, 15];
const AO_INDICES = [0, 4, 7, 13];

// ── Scoring ───────────────────────────────────────────────────────────────────
function scoredValue(raw: number, reverse: boolean): number {
  return reverse ? 10 - raw : raw;
}

function computeScore(answers: (number | null)[]): number {
  return answers.reduce<number>((sum, ans, i) => {
    const raw = ans ?? 5;
    return sum + scoredValue(raw, QUESTIONS[i].reverse);
  }, 0);
}

function computeFactorScore(answers: (number | null)[], indices: number[]): number {
  return indices.reduce((sum, i) => {
    const raw = answers[i] ?? 5;
    return sum + scoredValue(raw, QUESTIONS[i].reverse);
  }, 0);
}

interface Band {
  label: string;
  color: string;
  bg: string;
  insight: string;
  action: string;
}

function getBand(total: number): Band {
  if (total <= 64) {
    return {
      label: "Emerging",
      color: "#D97706",
      bg: "#FEF3C7",
      insight: "Your awareness of gratitude is growing. Small daily moments of noticing what's good can deepen this over time.",
      action: "Start with one thing each day that you genuinely appreciate — no matter how small.",
    };
  }
  if (total <= 96) {
    return {
      label: "Growing",
      color: "#059669",
      bg: "#D1FAE5",
      insight: "You have a meaningful gratitude foundation. Continue building on this through expression and reflection.",
      action: "Try writing a gratitude letter to someone who has positively shaped your life.",
    };
  }
  return {
    label: "Flourishing",
    color: "#7C3AED",
    bg: "#EDE9FE",
    insight: "You experience gratitude richly across people, beauty, and simple pleasures. This is a significant wellbeing strength.",
    action: "Share this abundance — expressing gratitude openly amplifies its benefits for everyone around you.",
  };
}

// ── Props ─────────────────────────────────────────────────────────────────────
interface GRATScreenProps {
  onDone: () => void;
}

type ScreenView = "intro" | "question" | "result";

// ── Component ─────────────────────────────────────────────────────────────────
export function GRATScreen({ onDone }: GRATScreenProps) {
  const [view, setView] = useState<ScreenView>("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(TOTAL).fill(null));

  const selected = answers[currentQ];

  function handleBegin() {
    setView("question");
    setCurrentQ(0);
  }

  function handleBack() {
    if (currentQ === 0) {
      setView("intro");
    } else {
      setCurrentQ((q) => q - 1);
    }
  }

  function handleSelect(val: number) {
    setAnswers((prev) => {
      const next = [...prev];
      next[currentQ] = val;
      return next;
    });
  }

  function handleNext() {
    if (selected === null) return;
    if (currentQ === TOTAL - 1) {
      setView("result");
    } else {
      setCurrentQ((q) => q + 1);
    }
  }

  function handleSkip() {
    setAnswers((prev) => {
      const next = [...prev];
      next[currentQ] = null;
      return next;
    });
    if (currentQ === TOTAL - 1) {
      setView("result");
    } else {
      setCurrentQ((q) => q + 1);
    }
  }

  // ── Intro ──────────────────────────────────────────────────────────────────
  if (view === "intro") {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: PAGE_BG,
          display: "flex",
          flexDirection: "column",
          padding: "24px 20px 40px",
          fontFamily: "Inter, sans-serif",
        }}
      >
        {/* Back */}
        <button
          onClick={onDone}
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.7)",
            border: "1.5px solid rgba(0,0,0,0.07)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          <ArrowLeft className="w-5 h-5" style={{ color: ICON_COLOR, strokeWidth: 1.75 }} />
        </button>

        {/* Icon */}
        <div style={{ marginTop: 32, display: "flex", justifyContent: "center" }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 20,
              background: AMBER_LIGHT,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Heart className="w-8 h-8" style={{ color: ICON_COLOR, strokeWidth: 1.75 }} />
          </div>
        </div>

        {/* Title */}
        <h1
          style={{
            fontFamily: "Lora, serif",
            fontSize: 26,
            fontWeight: 700,
            color: "#15113C",
            textAlign: "center",
            marginTop: 20,
            marginBottom: 4,
          }}
        >
          Gratitude &amp; Appreciation
        </h1>
        <p style={{ fontSize: 13, color: "#6B7280", textAlign: "center", marginBottom: 16 }}>
          GRAT-Short · 16 questions · 5 min
        </p>

        {/* Body */}
        <p
          style={{
            fontSize: 15,
            color: "#4B5563",
            textAlign: "center",
            lineHeight: 1.6,
            maxWidth: 340,
            margin: "0 auto 24px",
          }}
        >
          Measures gratitude across three dimensions: appreciation for others, simple pleasures, and freedom from resentment.
        </p>

        {/* Factor chips */}
        <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 28 }}>
          <span
            style={{
              padding: "5px 12px",
              borderRadius: 20,
              background: AMBER_TINT,
              color: "#92400E",
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            LOSD
          </span>
          <span
            style={{
              padding: "5px 12px",
              borderRadius: 20,
              background: "#D1FAE5",
              color: "#059669",
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            Simple Appreciation
          </span>
          <span
            style={{
              padding: "5px 12px",
              borderRadius: 20,
              background: "#EDE9FE",
              color: "#7C3AED",
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            Appreciation for Others
          </span>
        </div>

        {/* Scale preview */}
        <div style={{ marginBottom: 32 }}>
          <p style={{ fontSize: 12, color: "#6B7280", textAlign: "center", marginBottom: 10 }}>
            9-point scale
          </p>
          <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
            {Array.from({ length: 9 }, (_, i) => (
              <div
                key={i}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: AMBER_LIGHT,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#92400E",
                }}
              >
                {i + 1}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, paddingLeft: 4, paddingRight: 4 }}>
            <span style={{ fontSize: 10, color: "#9CA3AF" }}>Strongly Disagree</span>
            <span style={{ fontSize: 10, color: "#9CA3AF" }}>Strongly Agree</span>
          </div>
        </div>

        {/* Begin */}
        <button
          onClick={handleBegin}
          style={{
            width: "100%",
            padding: "16px",
            borderRadius: 16,
            background: PURPLE,
            color: "white",
            fontSize: 16,
            fontWeight: 700,
            border: "none",
            cursor: "pointer",
            fontFamily: "Inter, sans-serif",
          }}
        >
          Begin Assessment
        </button>
      </div>
    );
  }

  // ── Question ───────────────────────────────────────────────────────────────
  if (view === "question") {
    const progress = (currentQ + 1) / TOTAL;
    const isLast = currentQ === TOTAL - 1;
    const canNext = selected !== null;

    return (
      <div
        style={{
          minHeight: "100vh",
          background: PAGE_BG,
          display: "flex",
          flexDirection: "column",
          padding: "24px 20px 40px",
          fontFamily: "Inter, sans-serif",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <button
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.7)",
              border: "1.5px solid rgba(0,0,0,0.07)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            onClick={handleBack}
          >
            <ArrowLeft className="w-5 h-5" style={{ color: ICON_COLOR, strokeWidth: 1.75 }} />
          </button>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 600, color: "#15113C" }}>
            Q{currentQ + 1} of {TOTAL}
          </span>
          <button
            onClick={onDone}
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 12,
              fontWeight: 600,
              color: "#9CA3AF",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            Save &amp; Exit
          </button>
        </div>

        {/* Progress bar */}
        <div
          style={{
            height: 6,
            borderRadius: 3,
            background: "#E5E7EB",
            marginBottom: 28,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progress * 100}%`,
              background: PURPLE,
              borderRadius: 3,
              transition: "width 0.3s ease",
            }}
          />
        </div>

        {/* Question card */}
        <div
          style={{
            borderRadius: 24,
            padding: "24px",
            background: "rgba(255,255,255,0.85)",
            marginBottom: 24,
          }}
        >
          <p
            style={{
              fontFamily: "Lora, serif",
              fontStyle: "italic",
              fontSize: 17,
              color: "#15113C",
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            {QUESTIONS[currentQ].text}
          </p>
        </div>

        {/* 9-point scale */}
        <div style={{ marginBottom: 8 }}>
          <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
            {Array.from({ length: 9 }, (_, i) => {
              const val = i + 1;
              const isSelected = selected === val;
              return (
                <button
                  key={val}
                  onClick={() => handleSelect(val)}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    border: `1.5px solid ${isSelected ? AMBER_ACCENT : "#E5E7EB"}`,
                    background: isSelected ? AMBER_TINT : "white",
                    color: isSelected ? "#92400E" : "#6B7280",
                    fontWeight: isSelected ? 700 : 400,
                    fontSize: 13,
                    cursor: "pointer",
                    fontFamily: "Inter, sans-serif",
                    flexShrink: 0,
                    transition: "all 0.15s ease",
                  }}
                >
                  {val}
                </button>
              );
            })}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
            <span style={{ fontSize: 10, color: "#9CA3AF" }}>Strongly Disagree</span>
            <span style={{ fontSize: 10, color: "#9CA3AF" }}>Strongly Agree</span>
          </div>
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Next / Complete */}
        <button
          onClick={handleNext}
          disabled={!canNext}
          style={{
            width: "100%",
            padding: "16px",
            borderRadius: 16,
            background: canNext ? PURPLE : "#E5E7EB",
            color: canNext ? "white" : "#9CA3AF",
            fontSize: 16,
            fontWeight: 700,
            border: "none",
            cursor: canNext ? "pointer" : "default",
            fontFamily: "Inter, sans-serif",
            transition: "all 0.15s ease",
          }}
        >
          {isLast ? "Complete Assessment" : "Next Question"}
        </button>

        {/* Skip */}
        <button
          onClick={handleSkip}
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 13,
            color: "#9CA3AF",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "8px",
            textAlign: "center",
            width: "100%",
          }}
        >
          Skip this question
        </button>
      </div>
    );
  }

  // ── Result ─────────────────────────────────────────────────────────────────
  const totalScore = computeScore(answers);
  const band = getBand(totalScore);

  const losdScore = computeFactorScore(answers, LOSD_INDICES);
  const saScore = computeFactorScore(answers, SA_INDICES);
  const aoScore = computeFactorScore(answers, AO_INDICES);

  const losdMax = 6 * 9;
  const saMax = 6 * 9;
  const aoMax = 4 * 9;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: DONE_BG,
        display: "flex",
        flexDirection: "column",
        padding: "24px 20px 40px",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* Header */}
      <h2
        style={{
          fontFamily: "Lora, serif",
          fontSize: 22,
          fontWeight: 700,
          color: "#15113C",
          textAlign: "center",
          marginBottom: 4,
        }}
      >
        Your Results
      </h2>
      <p style={{ fontSize: 13, color: "#6B7280", textAlign: "center", marginBottom: 28 }}>
        GRAT-Short Assessment
      </p>

      {/* Score ring */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #A78BFA 0%, #7C3AED 100%)",
            boxShadow: "0 8px 24px rgba(124,58,237,0.35)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ fontSize: 32, fontWeight: 800, color: "white", fontFamily: "Lora, serif" }}>
            {totalScore}
          </span>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.8)" }}>of 144</span>
        </div>
      </div>

      {/* Band chip */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
        <span
          style={{
            padding: "6px 16px",
            borderRadius: 20,
            background: band.bg,
            color: band.color,
            fontSize: 13,
            fontWeight: 700,
          }}
        >
          {band.label}
        </span>
      </div>

      {/* Insight */}
      <p
        style={{
          fontSize: 14,
          color: "#4B5563",
          textAlign: "center",
          lineHeight: 1.6,
          maxWidth: 320,
          margin: "0 auto 28px",
        }}
      >
        {band.insight}
      </p>

      {/* Factor breakdown */}
      <div
        style={{
          borderRadius: 20,
          background: "rgba(255,255,255,0.85)",
          padding: "20px",
          marginBottom: 20,
        }}
      >
        <p style={{ fontSize: 13, fontWeight: 700, color: "#15113C", marginBottom: 16 }}>Factor Breakdown</p>

        {/* LOSD */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 12, color: "#6B7280", fontWeight: 600 }}>
              Lack of Sense of Deprivation
            </span>
            <span style={{ fontSize: 12, color: "#92400E", fontWeight: 700 }}>
              {losdScore}/{losdMax}
            </span>
          </div>
          <div style={{ height: 6, borderRadius: 3, background: "#E5E7EB", overflow: "hidden" }}>
            <div
              style={{
                height: "100%",
                width: `${(losdScore / losdMax) * 100}%`,
                background: AMBER_ACCENT,
                borderRadius: 3,
              }}
            />
          </div>
        </div>

        {/* SA */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 12, color: "#6B7280", fontWeight: 600 }}>Simple Appreciation</span>
            <span style={{ fontSize: 12, color: "#059669", fontWeight: 700 }}>
              {saScore}/{saMax}
            </span>
          </div>
          <div style={{ height: 6, borderRadius: 3, background: "#E5E7EB", overflow: "hidden" }}>
            <div
              style={{
                height: "100%",
                width: `${(saScore / saMax) * 100}%`,
                background: "#059669",
                borderRadius: 3,
              }}
            />
          </div>
        </div>

        {/* AO */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 12, color: "#6B7280", fontWeight: 600 }}>Appreciation for Others</span>
            <span style={{ fontSize: 12, color: "#7C3AED", fontWeight: 700 }}>
              {aoScore}/{aoMax}
            </span>
          </div>
          <div style={{ height: 6, borderRadius: 3, background: "#E5E7EB", overflow: "hidden" }}>
            <div
              style={{
                height: "100%",
                width: `${(aoScore / aoMax) * 100}%`,
                background: "#7C3AED",
                borderRadius: 3,
              }}
            />
          </div>
        </div>
      </div>

      {/* Suggested action */}
      <div
        style={{
          borderRadius: 20,
          background: "rgba(255,255,255,0.85)",
          padding: "20px",
          display: "flex",
          gap: 14,
          alignItems: "flex-start",
          marginBottom: 28,
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            background: AMBER_LIGHT,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Check className="w-5 h-5" style={{ color: ICON_COLOR, strokeWidth: 1.75 }} />
        </div>
        <div>
          <p style={{ fontSize: 12, fontWeight: 700, color: "#15113C", marginBottom: 4 }}>
            Suggested Next Step
          </p>
          <p style={{ fontSize: 13, color: "#4B5563", lineHeight: 1.6, margin: 0 }}>
            {band.action}
          </p>
        </div>
      </div>

      {/* Done */}
      <button
        onClick={onDone}
        style={{
          width: "100%",
          padding: "16px",
          borderRadius: 16,
          background: PURPLE,
          color: "white",
          fontSize: 16,
          fontWeight: 700,
          border: "none",
          cursor: "pointer",
          fontFamily: "Inter, sans-serif",
        }}
      >
        Done
      </button>
    </div>
  );
}
