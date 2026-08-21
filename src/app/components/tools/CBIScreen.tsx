import { useState } from "react";
import { ArrowLeft, Activity, Check } from "lucide-react";

// ── Design tokens ────────────────────────────────────────────────────────────
const PAGE_BG = "linear-gradient(180deg, #EDE9FE 0%, #F5F3FF 100%)";
const DONE_BG = "linear-gradient(135deg, #EDE9FE 0%, #C4B5FD 100%)";
const PURPLE = "#8B5CF6";
const ICON_COLOR = "#15113C";
const ROSE_LIGHT = "#FFE4E6";
const ROSE_ACCENT = "#E11D48";

// ── Questions ─────────────────────────────────────────────────────────────────
type Subscale = "PB" | "WB" | "CB";

interface CBIQuestion {
  text: string;
  subscale: Subscale;
  reverse: boolean;
}

const QUESTIONS: CBIQuestion[] = [
  // Personal Burnout (6)
  { text: "How often do you feel tired?", subscale: "PB", reverse: false },
  { text: "How often are you physically exhausted?", subscale: "PB", reverse: false },
  { text: "How often are you emotionally exhausted?", subscale: "PB", reverse: false },
  { text: "How often do you think: \"I can't take it anymore\"?", subscale: "PB", reverse: false },
  { text: "How often do you feel worn out?", subscale: "PB", reverse: false },
  { text: "How often do you feel weak and susceptible to illness?", subscale: "PB", reverse: false },
  // Work-Related Burnout (7)
  { text: "Do you feel worn out at the end of the working day?", subscale: "WB", reverse: false },
  { text: "Are you exhausted in the morning at the thought of another day at work?", subscale: "WB", reverse: false },
  { text: "Do you feel that every working hour is tiring?", subscale: "WB", reverse: false },
  { text: "Do you have enough energy for family and friends during leisure time?", subscale: "WB", reverse: true },
  { text: "Is your work emotionally exhausting?", subscale: "WB", reverse: false },
  { text: "Does your work frustrate you?", subscale: "WB", reverse: false },
  { text: "Do you feel burnt out because of your work?", subscale: "WB", reverse: false },
  // Client-Related Burnout (5)
  { text: "Do you find it hard to work with clients?", subscale: "CB", reverse: false },
  { text: "Does it drain your energy to work with clients?", subscale: "CB", reverse: false },
  { text: "Do you find it frustrating to work with clients?", subscale: "CB", reverse: false },
  { text: "Do you feel burnt out because of your work with clients?", subscale: "CB", reverse: false },
  { text: "Do you feel that you give more than you get back when you work with clients?", subscale: "CB", reverse: false },
];

const TOTAL = QUESTIONS.length;

// Scale: label → raw value (0/25/50/75/100)
interface ScaleOption {
  label: string;
  value: number;
}

const SCALE_OPTIONS: ScaleOption[] = [
  { label: "Always", value: 100 },
  { label: "Often", value: 75 },
  { label: "Sometimes", value: 50 },
  { label: "Seldom", value: 25 },
  { label: "Never / Almost Never", value: 0 },
];

// ── Scoring ───────────────────────────────────────────────────────────────────
function scoredValue(raw: number, reverse: boolean): number {
  return reverse ? 100 - raw : raw;
}

function computeSubscaleAverage(answers: (number | null)[], subscale: Subscale): number {
  const items = QUESTIONS.map((q, i) => ({ q, i })).filter(({ q }) => q.subscale === subscale);
  const total = items.reduce((sum, { q, i }) => {
    const raw = answers[i];
    const scored = raw !== null ? scoredValue(raw, q.reverse) : 50;
    return sum + scored;
  }, 0);
  return total / items.length;
}

interface Band {
  label: string;
  color: string;
  bg: string;
  insight: string;
  action: string;
}

function getBand(avg: number): Band {
  if (avg < 50) {
    return {
      label: "Low Burnout",
      color: "#059669",
      bg: "#D1FAE5",
      insight: "Your burnout indicators across all domains are manageable. Continue nurturing your recovery practices.",
      action: "Protect what's working — guard your rest time and meaningful activities.",
    };
  }
  if (avg < 75) {
    return {
      label: "Moderate Burnout",
      color: "#D97706",
      bg: "#FEF3C7",
      insight: "Burnout is building across one or more areas. Intentional recovery time and boundary-setting can help significantly.",
      action: "Identify the highest-scoring domain and take one concrete action to reduce that burden this week.",
    };
  }
  return {
    label: "High Burnout",
    color: "#DC2626",
    bg: "#FEE2E2",
    insight: "Significant burnout is present across multiple domains. Please prioritize rest and consider professional support.",
    action: "Please speak with a healthcare professional. High burnout in multiple domains responds well to treatment.",
  };
}

interface SubBand {
  label: string;
  color: string;
  bg: string;
}

function getSubBand(avg: number): SubBand {
  if (avg < 50) return { label: "Low", color: "#059669", bg: "#D1FAE5" };
  if (avg < 75) return { label: "Moderate", color: "#D97706", bg: "#FEF3C7" };
  return { label: "High", color: "#DC2626", bg: "#FEE2E2" };
}

// ── Props ─────────────────────────────────────────────────────────────────────
interface CBIScreenProps {
  onDone: () => void;
}

type ScreenView = "intro" | "question" | "result";

// ── Component ─────────────────────────────────────────────────────────────────
export function CBIScreen({ onDone }: CBIScreenProps) {
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
              background: ROSE_LIGHT,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Activity className="w-8 h-8" style={{ color: ICON_COLOR, strokeWidth: 1.75 }} />
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
          Copenhagen Burnout Inventory
        </h1>
        <p style={{ fontSize: 13, color: "#6B7280", textAlign: "center", marginBottom: 16 }}>
          CBI · 18 questions · 6 min
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
          Measures burnout across personal wellbeing, work context, and client relationships.
        </p>

        {/* Dimension chips */}
        <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 28 }}>
          <span
            style={{
              padding: "5px 12px",
              borderRadius: 20,
              background: ROSE_LIGHT,
              color: "#9F1239",
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            Personal
          </span>
          <span
            style={{
              padding: "5px 12px",
              borderRadius: 20,
              background: "#FFE4E6",
              color: "#BE123C",
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            Work
          </span>
          <span
            style={{
              padding: "5px 12px",
              borderRadius: 20,
              background: "#FFF1F2",
              color: "#BE123C",
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            Client
          </span>
        </div>

        {/* Scale preview */}
        <div style={{ marginBottom: 32 }}>
          <p style={{ fontSize: 12, color: "#6B7280", textAlign: "center", marginBottom: 10 }}>
            Frequency scale
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

    const subscaleLabel =
      q.subscale === "PB" ? "Personal Burnout" : q.subscale === "WB" ? "Work Burnout" : "Client Burnout";
    const subscaleBg =
      q.subscale === "PB" ? ROSE_LIGHT : q.subscale === "WB" ? "#FFE4E6" : "#FFF1F2";
    const subscaleColor = "#9F1239";

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
              background: subscaleBg,
              color: subscaleColor,
              fontSize: 11,
              fontWeight: 600,
            }}
          >
            {subscaleLabel}
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
                  border: `1.5px solid ${isSelected ? ROSE_ACCENT : "#E5E7EB"}`,
                  background: isSelected ? "#FFF1F2" : "rgba(255,255,255,0.85)",
                  color: isSelected ? "#BE123C" : "#374151",
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
                    border: `1.5px solid ${isSelected ? ROSE_ACCENT : "#D1D5DB"}`,
                    background: isSelected ? ROSE_ACCENT : "transparent",
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
  const pbAvg = computeSubscaleAverage(answers, "PB");
  const wbAvg = computeSubscaleAverage(answers, "WB");
  const cbAvg = computeSubscaleAverage(answers, "CB");
  const overallAvg = (pbAvg + wbAvg + cbAvg) / 3;

  const pbBand = getSubBand(pbAvg);
  const wbBand = getSubBand(wbAvg);
  const cbBand = getSubBand(cbAvg);
  const overall = getBand(overallAvg);

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
        Copenhagen Burnout Inventory
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
          <span style={{ fontSize: 30, fontWeight: 800, color: "white", fontFamily: "Lora, serif" }}>
            {Math.round(overallAvg)}
          </span>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.8)" }}>/ 100</span>
        </div>
      </div>

      {/* Overall band chip */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
        <span
          style={{
            padding: "6px 16px",
            borderRadius: 20,
            background: overall.bg,
            color: overall.color,
            fontSize: 13,
            fontWeight: 700,
          }}
        >
          {overall.label}
        </span>
      </div>

      {/* Overall insight */}
      <p
        style={{
          fontSize: 14,
          color: "#4B5563",
          textAlign: "center",
          lineHeight: 1.6,
          maxWidth: 320,
          margin: "0 auto 24px",
        }}
      >
        {overall.insight}
      </p>

      {/* Subscale breakdown */}
      <div
        style={{
          borderRadius: 20,
          background: "rgba(255,255,255,0.85)",
          padding: "20px",
          marginBottom: 20,
        }}
      >
        <p style={{ fontSize: 13, fontWeight: 700, color: "#15113C", marginBottom: 16 }}>
          Subscale Breakdown
        </p>

        {/* Personal Burnout */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
            <span style={{ fontSize: 12, color: "#6B7280", fontWeight: 600 }}>Personal Burnout</span>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 12, color: "#9F1239", fontWeight: 700 }}>
                {Math.round(pbAvg)}
              </span>
              <span
                style={{
                  padding: "2px 8px",
                  borderRadius: 10,
                  background: pbBand.bg,
                  color: pbBand.color,
                  fontSize: 10,
                  fontWeight: 700,
                }}
              >
                {pbBand.label}
              </span>
            </div>
          </div>
          <div style={{ height: 6, borderRadius: 3, background: "#E5E7EB", overflow: "hidden" }}>
            <div
              style={{
                height: "100%",
                width: `${pbAvg}%`,
                background: ROSE_ACCENT,
                borderRadius: 3,
              }}
            />
          </div>
        </div>

        {/* Work Burnout */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
            <span style={{ fontSize: 12, color: "#6B7280", fontWeight: 600 }}>Work Burnout</span>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 12, color: "#9F1239", fontWeight: 700 }}>
                {Math.round(wbAvg)}
              </span>
              <span
                style={{
                  padding: "2px 8px",
                  borderRadius: 10,
                  background: wbBand.bg,
                  color: wbBand.color,
                  fontSize: 10,
                  fontWeight: 700,
                }}
              >
                {wbBand.label}
              </span>
            </div>
          </div>
          <div style={{ height: 6, borderRadius: 3, background: "#E5E7EB", overflow: "hidden" }}>
            <div
              style={{
                height: "100%",
                width: `${wbAvg}%`,
                background: ROSE_ACCENT,
                borderRadius: 3,
              }}
            />
          </div>
        </div>

        {/* Client Burnout */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
            <span style={{ fontSize: 12, color: "#6B7280", fontWeight: 600 }}>Client Burnout</span>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 12, color: "#9F1239", fontWeight: 700 }}>
                {Math.round(cbAvg)}
              </span>
              <span
                style={{
                  padding: "2px 8px",
                  borderRadius: 10,
                  background: cbBand.bg,
                  color: cbBand.color,
                  fontSize: 10,
                  fontWeight: 700,
                }}
              >
                {cbBand.label}
              </span>
            </div>
          </div>
          <div style={{ height: 6, borderRadius: 3, background: "#E5E7EB", overflow: "hidden" }}>
            <div
              style={{
                height: "100%",
                width: `${cbAvg}%`,
                background: ROSE_ACCENT,
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
            background: ROSE_LIGHT,
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
            {overall.action}
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
