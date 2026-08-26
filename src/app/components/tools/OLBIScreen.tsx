import { useState } from "react";
import { ArrowLeft, Flame, Check } from "lucide-react";
import { AssessmentActionItems, AssessmentSeverity } from "../AssessmentActionItems";

// ── Design tokens ────────────────────────────────────────────────────────────
const PAGE_BG = "linear-gradient(180deg, #EDE9FE 0%, #F5F3FF 100%)";
const DONE_BG = "linear-gradient(135deg, #EDE9FE 0%, #C4B5FD 100%)";
const PURPLE = "#8B5CF6";
const ICON_COLOR = "#15113C";
const ORANGE_LIGHT = "#FFEDD5";
const ORANGE_ACCENT = "#EA580C";

// ── Questions ─────────────────────────────────────────────────────────────────
type Subscale = "E" | "D";

interface OLBIQuestion {
  text: string;
  subscale: Subscale;
  reverse: boolean;
}

const QUESTIONS: OLBIQuestion[] = [
  // Exhaustion
  { text: "There are days when I feel tired before I arrive at work.", subscale: "E", reverse: false },
  { text: "After work, I tend to need more time to relax.", subscale: "E", reverse: false },
  { text: "During my work, I often feel emotionally drained.", subscale: "E", reverse: false },
  { text: "After working, I have enough energy for my leisure activities.", subscale: "E", reverse: true },
  { text: "Usually, I can manage my workload well.", subscale: "E", reverse: true },
  { text: "When I work, I feel mentally exhausted.", subscale: "E", reverse: false },
  // Disengagement
  { text: "I often think about quitting my job.", subscale: "D", reverse: false },
  { text: "I feel more and more indifferent to my work.", subscale: "D", reverse: false },
  { text: "I feel increasingly less involved in my job.", subscale: "D", reverse: false },
  { text: "I find my work to be meaningful.", subscale: "D", reverse: true },
  { text: "I feel connected to my work.", subscale: "D", reverse: true },
  { text: "I feel alienated from my work.", subscale: "D", reverse: false },
];

const TOTAL = QUESTIONS.length;

// Scale options: displayed label → raw value (1-4)
interface ScaleOption {
  label: string;
  value: number;
}

const SCALE_OPTIONS: ScaleOption[] = [
  { label: "Strongly Agree", value: 4 },
  { label: "Agree", value: 3 },
  { label: "Disagree", value: 2 },
  { label: "Strongly Disagree", value: 1 },
];

// ── Scoring ───────────────────────────────────────────────────────────────────
function scoredValue(raw: number, reverse: boolean): number {
  return reverse ? 5 - raw : raw;
}

function computeSubscaleAverage(answers: (number | null)[], subscale: Subscale): number {
  const items = QUESTIONS.map((q, i) => ({ q, i })).filter(({ q }) => q.subscale === subscale);
  const total = items.reduce((sum, { q, i }) => {
    const raw = answers[i] ?? 2.5;
    // For non-integer midpoint, we skip reverse (midpoint = midpoint regardless of direction)
    const scored = answers[i] !== null ? scoredValue(raw, q.reverse) : 2.5;
    return sum + scored;
  }, 0);
  return total / items.length;
}

interface SubBand {
  label: string;
  color: string;
  bg: string;
}

function getSubBand(avg: number): SubBand {
  if (avg <= 2.0) return { label: "Low", color: "#059669", bg: "#D1FAE5" };
  if (avg <= 3.0) return { label: "Moderate", color: "#D97706", bg: "#FEF3C7" };
  return { label: "High", color: "#DC2626", bg: "#FEE2E2" };
}

interface OverallBand {
  label: string;
  color: string;
  bg: string;
  insight: string;
  action: string;
}

function getOverallBand(avg: number): OverallBand {
  if (avg <= 2.0) {
    return {
      label: "Resilient",
      color: "#059669",
      bg: "#D1FAE5",
      insight: "Your burnout indicators are low. You show good balance between work demands and recovery.",
      action: "Continue your recovery rituals and protect your time boundaries proactively.",
    };
  }
  if (avg <= 3.0) {
    return {
      label: "Fatigued",
      color: "#D97706",
      bg: "#FEF3C7",
      insight: "Signs of depletion are emerging. Prioritizing recovery and meaningful activities can help restore balance.",
      action: "Identify one area where you can reduce pressure or add a recovery activity this week.",
    };
  }
  return {
    label: "Burnout",
    color: "#DC2626",
    bg: "#FEE2E2",
    insight: "Significant burnout signals are present. Taking deliberate steps toward rest and professional support is important.",
    action: "Please speak with a healthcare professional. Burnout is a recognized condition with effective treatments.",
  };
}

// ── Props ─────────────────────────────────────────────────────────────────────
interface OLBIScreenProps {
  onDone: () => void;
  onStartTool?: (toolId: string) => void;
  onOpenChatWithPrompt?: (prompt: string) => void;
}

type ScreenView = "intro" | "question" | "result";

// ── Component ─────────────────────────────────────────────────────────────────
export function OLBIScreen({ onDone, onStartTool, onOpenChatWithPrompt }: OLBIScreenProps) {
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
              background: ORANGE_LIGHT,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Flame className="w-8 h-8" style={{ color: ICON_COLOR, strokeWidth: 1.75 }} />
          </div>
        </div>

        {/* Title */}
        <h1
          style={{
            fontFamily: "Lora, serif",
            fontSize: 24,
            fontWeight: 700,
            color: "#15113C",
            textAlign: "center",
            marginTop: 20,
            marginBottom: 4,
          }}
        >
          Oldenburg Burnout Inventory
        </h1>
        <p style={{ fontSize: 13, color: "#6B7280", textAlign: "center", marginBottom: 16 }}>
          OLBI · 12 questions · 4 min
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
          Measures two core burnout dimensions through both positively and negatively worded items.
        </p>

        {/* Dimension chips */}
        <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 28 }}>
          <span
            style={{
              padding: "5px 12px",
              borderRadius: 20,
              background: "#FFEDD5",
              color: "#C2410C",
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            Exhaustion
          </span>
          <span
            style={{
              padding: "5px 12px",
              borderRadius: 20,
              background: "#FEF3C7",
              color: "#92400E",
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            Disengagement
          </span>
        </div>

        {/* Scale preview */}
        <div style={{ marginBottom: 32 }}>
          <p style={{ fontSize: 12, color: "#6B7280", textAlign: "center", marginBottom: 10 }}>
            4-point agreement scale
          </p>
          <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap" }}>
            {SCALE_OPTIONS.map((opt) => (
              <span
                key={opt.value}
                style={{
                  padding: "4px 10px",
                  borderRadius: 8,
                  background: "rgba(255,255,255,0.7)",
                  color: "#6B7280",
                  fontSize: 11,
                  fontWeight: 500,
                  border: "1px solid rgba(0,0,0,0.06)",
                }}
              >
                {opt.label}
              </span>
            ))}
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
    const q = QUESTIONS[currentQ];
    const isExhaustion = q.subscale === "E";

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
            marginBottom: 12,
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

        {/* Subscale label */}
        <div style={{ marginBottom: 16 }}>
          <span
            style={{
              padding: "3px 10px",
              borderRadius: 10,
              background: isExhaustion ? "#FFEDD5" : "#FEF3C7",
              color: isExhaustion ? "#C2410C" : "#92400E",
              fontSize: 11,
              fontWeight: 600,
            }}
          >
            {isExhaustion ? "Exhaustion" : "Disengagement"}
          </span>
        </div>

        {/* Question card */}
        <div
          style={{
            borderRadius: 24,
            padding: "24px",
            background: "rgba(255,255,255,0.85)",
            marginBottom: 20,
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
            {q.text}
          </p>
        </div>

        {/* Scale buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 8 }}>
          {SCALE_OPTIONS.map((opt) => {
            const isSelected = selected === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => handleSelect(opt.value)}
                style={{
                  width: "100%",
                  padding: "14px 18px",
                  borderRadius: 14,
                  border: `1.5px solid ${isSelected ? ORANGE_ACCENT : "#E5E7EB"}`,
                  background: isSelected ? "#FFF7ED" : "rgba(255,255,255,0.85)",
                  color: isSelected ? "#C2410C" : "#374151",
                  fontSize: 14,
                  fontWeight: isSelected ? 600 : 400,
                  textAlign: "left",
                  cursor: "pointer",
                  fontFamily: "Inter, sans-serif",
                  transition: "all 0.15s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span>{opt.label}</span>
                <span
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    border: `1.5px solid ${isSelected ? ORANGE_ACCENT : "#D1D5DB"}`,
                    background: isSelected ? ORANGE_ACCENT : "transparent",
                    flexShrink: 0,
                  }}
                />
              </button>
            );
          })}
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
  const exhaustionAvg = computeSubscaleAverage(answers, "E");
  const disengagementAvg = computeSubscaleAverage(answers, "D");
  const overallAvg = (exhaustionAvg + disengagementAvg) / 2;
  const overall = getOverallBand(overallAvg);
  const severity: AssessmentSeverity =
    overall.label === "Resilient" ? "positive" :
    overall.label === "Fatigued" ? "mild" : "high";

  return (
    <div className="min-h-screen flex flex-col px-5 pt-14 pb-10" style={{ background: DONE_BG }}>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <button onClick={onDone} className="w-11 h-11 rounded-2xl flex items-center justify-center"
          style={{ background: "rgba(255,255,255,0.88)", border: "1.5px solid rgba(139,92,246,0.15)" }} aria-label="Close">
          <ArrowLeft className="w-5 h-5" style={{ color: "#15113C", strokeWidth: 1.75 }} />
        </button>
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: "#9CA3AF" }}>
          Oldenburg Burnout Inventory Complete
        </span>
        <div style={{ width: 44 }} />
      </div>

      {/* Check circle */}
      <div className="flex flex-col items-center mb-8">
        <div style={{ width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg, #A78BFA 0%, #8B5CF6 100%)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 24px rgba(139,92,246,0.3)", marginBottom: 16 }}>
          <Check className="w-9 h-9" style={{ color: "white", strokeWidth: 1.75 }} />
        </div>
        <h2 style={{ fontFamily: "Lora, serif", fontSize: 22, fontWeight: 500, color: "#15113C", textAlign: "center", marginBottom: 6 }}>
          Assessment complete
        </h2>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#6B7280", textAlign: "center", maxWidth: 280 }}>
          {overall.insight}
        </p>
      </div>

      {/* Action items */}
      <AssessmentActionItems
        assessmentId="olbi"
        severity={severity}
        severityLabel={overall.label}
        severityColor={overall.color}
        severityBg={overall.bg}
        onStartTool={(id) => { onDone(); setTimeout(() => onStartTool?.(id), 100); }}
        onOpenChat={(prompt) => onOpenChatWithPrompt?.(prompt)}
      />

      {/* Done button */}
      <button onClick={onDone} className="mt-6 w-full py-4 rounded-full"
        style={{ background: "#8B5CF6", color: "white", fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 15, border: "none", cursor: "pointer" }}>
        Done
      </button>
    </div>
  );
}
