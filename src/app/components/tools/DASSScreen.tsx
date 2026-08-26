import { useState } from "react";
import { ChevronLeft, Brain, Wind, Zap, Check } from "lucide-react";
import { AssessmentActionItems, AssessmentSeverity } from "../AssessmentActionItems";

// ─── Design tokens ────────────────────────────────────────────────────────────
const PAGE_BG = "linear-gradient(180deg, #EDE9FE 0%, #F5F3FF 100%)";
const DONE_BG = "linear-gradient(135deg, #EDE9FE 0%, #C4B5FD 100%)";
const PURPLE = "#8B5CF6";
const ICON_COLOR = "#15113C";

// ─── Questions ────────────────────────────────────────────────────────────────
type Subscale = "D" | "A" | "S";

interface Question {
  id: number;
  text: string;
  subscale: Subscale;
}

const QUESTIONS: Question[] = [
  { id: 1,  text: "I found myself getting upset by quite trivial things", subscale: "S" },
  { id: 2,  text: "I was aware of dryness of my mouth", subscale: "A" },
  { id: 3,  text: "I couldn't seem to experience any positive feeling at all", subscale: "D" },
  { id: 4,  text: "I experienced breathing difficulty in the absence of physical exertion", subscale: "A" },
  { id: 5,  text: "I just couldn't seem to get going", subscale: "D" },
  { id: 6,  text: "I tended to over-react to situations", subscale: "S" },
  { id: 7,  text: "I had a feeling of shakiness", subscale: "A" },
  { id: 8,  text: "I found it difficult to relax", subscale: "S" },
  { id: 9,  text: "I found myself in situations that made me so anxious I was most relieved when they ended", subscale: "A" },
  { id: 10, text: "I felt that I had nothing to look forward to", subscale: "D" },
  { id: 11, text: "I found myself getting upset rather easily", subscale: "S" },
  { id: 12, text: "I felt that I was using a lot of nervous energy", subscale: "S" },
  { id: 13, text: "I felt sad and depressed", subscale: "D" },
  { id: 14, text: "I found myself getting impatient when delayed in any way", subscale: "S" },
  { id: 15, text: "I had a feeling of faintness", subscale: "A" },
  { id: 16, text: "I felt that I had lost interest in just about everything", subscale: "D" },
  { id: 17, text: "I felt I wasn't worth much as a person", subscale: "D" },
  { id: 18, text: "I felt that I was rather touchy", subscale: "S" },
  { id: 19, text: "I perspired noticeably in the absence of high temperatures or physical exertion", subscale: "A" },
  { id: 20, text: "I felt scared without any good reason", subscale: "A" },
  { id: 21, text: "I felt that life wasn't worthwhile", subscale: "D" },
  { id: 22, text: "I found it hard to wind down", subscale: "S" },
  { id: 23, text: "I had difficulty in swallowing", subscale: "A" },
  { id: 24, text: "I couldn't seem to get any enjoyment out of the things I did", subscale: "D" },
  { id: 25, text: "I was aware of the action of my heart in the absence of physical exertion", subscale: "A" },
  { id: 26, text: "I felt down-hearted and blue", subscale: "D" },
  { id: 27, text: "I found that I was very irritable", subscale: "S" },
  { id: 28, text: "I felt I was close to panic", subscale: "A" },
  { id: 29, text: "I found it hard to calm down after something upset me", subscale: "S" },
  { id: 30, text: "I feared that I would be thrown by some trivial but unfamiliar task", subscale: "A" },
  { id: 31, text: "I was unable to become enthusiastic about anything", subscale: "D" },
  { id: 32, text: "I found it difficult to tolerate interruptions to what I was doing", subscale: "S" },
  { id: 33, text: "I was in a state of nervous tension", subscale: "S" },
  { id: 34, text: "I felt I was pretty worthless", subscale: "D" },
  { id: 35, text: "I was intolerant of anything that kept me from getting on with what I was doing", subscale: "S" },
  { id: 36, text: "I felt terrified", subscale: "A" },
  { id: 37, text: "I could see nothing in the future to be hopeful about", subscale: "D" },
  { id: 38, text: "I felt that life was meaningless", subscale: "D" },
  { id: 39, text: "I found myself getting agitated", subscale: "S" },
  { id: 40, text: "I was worried about situations in which I might panic and make a fool of myself", subscale: "A" },
  { id: 41, text: "I experienced trembling", subscale: "A" },
  { id: 42, text: "I found it difficult to work up the initiative to do things", subscale: "D" },
];

const SCALE_OPTIONS = [
  { value: 0, label: "Did not apply at all" },
  { value: 1, label: "Applied sometimes" },
  { value: 2, label: "Applied often" },
  { value: 3, label: "Applied most of the time" },
];

// ─── Subscale config ──────────────────────────────────────────────────────────
interface SubscaleConfig {
  label: string;
  color: string;
  holderBg: string;
  tint: string;
  textColor: string;
  selBorder: string;
  gradStart: string;
  gradEnd: string;
}

const SUBSCALE_CONFIG: Record<Subscale, SubscaleConfig> = {
  D: {
    label: "Depression",
    color: "#8B5CF6",
    holderBg: "#E0E7FF",
    tint: "#EEF2FF",
    textColor: "#3730A3",
    selBorder: "#8B5CF6",
    gradStart: "#818CF8",
    gradEnd: "#4338CA",
  },
  A: {
    label: "Anxiety",
    color: "#3B82F6",
    holderBg: "#DBEAFE",
    tint: "#EFF6FF",
    textColor: "#1D4ED8",
    selBorder: "#3B82F6",
    gradStart: "#60A5FA",
    gradEnd: "#1D4ED8",
  },
  S: {
    label: "Stress",
    color: "#F59E0B",
    holderBg: "#FDE68A",
    tint: "#FFFBEB",
    textColor: "#92400E",
    selBorder: "#F59E0B",
    gradStart: "#FCD34D",
    gradEnd: "#D97706",
  },
};

// ─── Scoring bands ────────────────────────────────────────────────────────────
interface Band {
  label: string;
  min: number;
  max: number;
  color: string;
  bg: string;
}

const BANDS: Record<Subscale, Band[]> = {
  D: [
    { label: "Normal",           min: 0,  max: 9,        color: "#059669", bg: "#D1FAE5" },
    { label: "Mild",             min: 10, max: 13,       color: "#D97706", bg: "#FEF3C7" },
    { label: "Moderate",         min: 14, max: 20,       color: "#EA580C", bg: "#FEE2E2" },
    { label: "Severe",           min: 21, max: 27,       color: "#DC2626", bg: "#FEE2E2" },
    { label: "Extremely Severe", min: 28, max: Infinity, color: "#7C3AED", bg: "#EDE9FE" },
  ],
  A: [
    { label: "Normal",           min: 0,  max: 7,        color: "#059669", bg: "#D1FAE5" },
    { label: "Mild",             min: 8,  max: 9,        color: "#D97706", bg: "#FEF3C7" },
    { label: "Moderate",         min: 10, max: 14,       color: "#EA580C", bg: "#FEE2E2" },
    { label: "Severe",           min: 15, max: 19,       color: "#DC2626", bg: "#FEE2E2" },
    { label: "Extremely Severe", min: 20, max: Infinity, color: "#7C3AED", bg: "#EDE9FE" },
  ],
  S: [
    { label: "Normal",           min: 0,  max: 14,       color: "#059669", bg: "#D1FAE5" },
    { label: "Mild",             min: 15, max: 18,       color: "#D97706", bg: "#FEF3C7" },
    { label: "Moderate",         min: 19, max: 25,       color: "#EA580C", bg: "#FEE2E2" },
    { label: "Severe",           min: 26, max: 33,       color: "#DC2626", bg: "#FEE2E2" },
    { label: "Extremely Severe", min: 34, max: Infinity, color: "#7C3AED", bg: "#EDE9FE" },
  ],
};

function getBand(subscale: Subscale, score: number): Band {
  return BANDS[subscale].find(b => score >= b.min && score <= b.max) ?? BANDS[subscale][0];
}

// ─── Score ring SVG ───────────────────────────────────────────────────────────
function ScoreRing({
  score,
  maxScore,
  subscale,
  size = 80,
}: {
  score: number;
  maxScore: number;
  subscale: Subscale;
  size?: number;
}) {
  const cfg = SUBSCALE_CONFIG[subscale];
  const strokeW = 7;
  const r = (size - strokeW * 2) / 2;
  const circ = 2 * Math.PI * r;
  const pct = maxScore > 0 ? Math.min(score / maxScore, 1) : 0;
  const filled = pct * circ;
  const gradId = `dass-ring-${subscale}`;

  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ display: "block" }}>
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={cfg.gradStart} />
            <stop offset="100%" stopColor={cfg.gradEnd} />
          </linearGradient>
        </defs>
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="rgba(0,0,0,0.07)"
          strokeWidth={strokeW}
        />
        {/* Fill */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth={strokeW}
          strokeDasharray={`${filled} ${circ - filled}`}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: size < 80 ? 15 : 18,
            fontWeight: 700,
            color: ICON_COLOR,
            lineHeight: 1,
          }}
        >
          {score}
        </span>
      </div>
    </div>
  );
}

// ─── Back button ──────────────────────────────────────────────────────────────
function BackButton({ onPress }: { onPress: () => void }) {
  return (
    <button
      onClick={onPress}
      style={{
        width: 44,
        height: 44,
        borderRadius: "50%",
        background: "rgba(255,255,255,0.7)",
        border: "1.5px solid rgba(0,0,0,0.07)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        flexShrink: 0,
        padding: 0,
      }}
    >
      <ChevronLeft size={20} color={ICON_COLOR} strokeWidth={1.75} />
    </button>
  );
}

// ─── Insight helper ───────────────────────────────────────────────────────────
function buildInsight(
  dBand: Band,
  aBand: Band,
  sBand: Band,
  dScore: number,
  aScore: number,
  sScore: number,
): string {
  const all = [dBand.label, aBand.label, sBand.label];
  const severe = all.filter(l => l === "Severe" || l === "Extremely Severe").length;
  const elevated = all.filter(l => l === "Moderate" || l === "Mild").length;
  const normal = all.filter(l => l === "Normal").length;

  if (normal === 3) {
    return "Your scores across all three dimensions fall within the normal range. You appear to be managing emotional and physiological stress well right now.";
  }
  if (severe >= 2) {
    return "Your results indicate significant distress across multiple dimensions. This level of difficulty warrants professional support — a mental health professional can offer tailored strategies and guidance.";
  }
  if (severe === 1) {
    const worst = dBand.label === sBand.label && dBand.label === "Severely Severe"
      ? "depression"
      : dScore >= aScore && dScore >= sScore
      ? "depression"
      : aScore >= sScore
      ? "anxiety"
      : "stress";
    return `You are experiencing notable difficulty particularly around ${worst}. The other dimensions show a lighter load. Targeted strategies for your primary concern, alongside general self-care, can make a meaningful difference.`;
  }
  if (elevated >= 2) {
    return "Moderate strain is present across multiple areas. This pattern often reflects cumulative stress that benefits from consistent self-regulation practices — such as paced breathing, sleep hygiene, and social connection.";
  }
  return "Your results show some areas of strain alongside areas of resilience. Addressing the elevated dimension with focused attention — while maintaining your existing strengths — can help restore overall balance.";
}

// ─── Main component ───────────────────────────────────────────────────────────
export function DASSScreen({ onDone, onStartTool, onOpenChatWithPrompt }: { onDone: () => void; onStartTool?: (toolId: string) => void; onOpenChatWithPrompt?: (prompt: string) => void }) {
  type View = "intro" | "question" | "result";

  const [view, setView]         = useState<View>("intro");
  const [currentQ, setCurrentQ] = useState(0);
  // -1 = unanswered, 0-3 = answered
  const [answers, setAnswers]   = useState<number[]>(Array(42).fill(-1));
  const [selected, setSelected] = useState<number | null>(null);

  // ── Scoring ──────────────────────────────────────────────────────────────
  function computeScores() {
    let d = 0, a = 0, s = 0;
    QUESTIONS.forEach((q, i) => {
      const val = answers[i] < 0 ? 0 : answers[i];
      if (q.subscale === "D") d += val;
      else if (q.subscale === "A") a += val;
      else s += val;
    });
    return { d, a, s };
  }

  // ── Navigation ────────────────────────────────────────────────────────────
  function handleBegin() {
    setCurrentQ(0);
    setSelected(answers[0] >= 0 ? answers[0] : null);
    setView("question");
  }

  function handleBack() {
    if (view === "intro") {
      onDone();
    } else if (view === "question") {
      if (currentQ === 0) {
        setView("intro");
      } else {
        const prev = currentQ - 1;
        setCurrentQ(prev);
        setSelected(answers[prev] >= 0 ? answers[prev] : null);
      }
    } else {
      // result → go back to last question
      setCurrentQ(41);
      setSelected(answers[41] >= 0 ? answers[41] : null);
      setView("question");
    }
  }

  function handleSelect(val: number) {
    setSelected(val);
  }

  function handleNext() {
    if (selected === null) return;
    const updated = [...answers];
    updated[currentQ] = selected;
    setAnswers(updated);

    if (currentQ < 41) {
      const next = currentQ + 1;
      setCurrentQ(next);
      setSelected(updated[next] >= 0 ? updated[next] : null);
    } else {
      setView("result");
    }
  }

  function handleSkip() {
    const updated = [...answers];
    // keep -1 (treated as 0 in scoring)
    if (updated[currentQ] < 0) updated[currentQ] = -1;
    setAnswers(updated);

    if (currentQ < 41) {
      const next = currentQ + 1;
      setCurrentQ(next);
      setSelected(updated[next] >= 0 ? updated[next] : null);
    } else {
      setView("result");
    }
  }

  // ── Derived ───────────────────────────────────────────────────────────────
  const progress = (currentQ + 1) / 42;
  const q = QUESTIONS[currentQ];
  const qCfg = q ? SUBSCALE_CONFIG[q.subscale] : SUBSCALE_CONFIG.D;

  const { d: dScore, a: aScore, s: sScore } = computeScores();
  const dBand = getBand("D", dScore);
  const aBand = getBand("A", aScore);
  const sBand = getBand("S", sScore);

  // ── INTRO VIEW ─────────────────────────────────────────────────────────────
  if (view === "intro") {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: PAGE_BG,
          display: "flex",
          flexDirection: "column",
          fontFamily: "Inter, sans-serif",
        }}
      >
        {/* Header row */}
        <div
          style={{
            padding: "16px 20px 0",
            display: "flex",
            alignItems: "center",
          }}
        >
          <BackButton onPress={onDone} />
        </div>

        {/* Scrollable content */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "24px 20px 40px",
            display: "flex",
            flexDirection: "column",
            gap: 24,
            maxWidth: 420,
            width: "100%",
            margin: "0 auto",
          }}
        >
          {/* Icon holder with 3 subscale chips */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: 20,
                background: "rgba(255,255,255,0.85)",
                border: "1.5px solid rgba(0,0,0,0.07)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 16px rgba(139,92,246,0.12)",
              }}
            >
              <Brain size={32} color={ICON_COLOR} strokeWidth={1.75} />
            </div>

            {/* 3 subscale chips */}
            <div style={{ display: "flex", gap: 8 }}>
              {(["D", "A", "S"] as Subscale[]).map(sub => {
                const cfg = SUBSCALE_CONFIG[sub];
                return (
                  <div
                    key={sub}
                    style={{
                      background: cfg.holderBg,
                      borderRadius: 20,
                      padding: "5px 12px",
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                    }}
                  >
                    {sub === "D" && <Brain size={12} color={cfg.color} strokeWidth={1.75} />}
                    {sub === "A" && <Wind size={12} color={cfg.color} strokeWidth={1.75} />}
                    {sub === "S" && <Zap size={12} color={cfg.color} strokeWidth={1.75} />}
                    <span style={{ fontSize: 12, fontWeight: 600, color: cfg.textColor }}>
                      {cfg.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Title & subtitle */}
          <div style={{ textAlign: "center" }}>
            <h1
              style={{
                fontFamily: "Lora, Georgia, serif",
                fontSize: 28,
                fontWeight: 700,
                color: ICON_COLOR,
                margin: 0,
                marginBottom: 8,
              }}
            >
              DASS-42
            </h1>
            <p style={{ fontSize: 14, color: "#6B7280", margin: 0, fontWeight: 500 }}>
              3 subscales · 42 questions · 12 min
            </p>
          </div>

          {/* Body copy */}
          <div
            style={{
              background: "rgba(255,255,255,0.7)",
              borderRadius: 20,
              padding: "16px 18px",
              border: "1.5px solid rgba(0,0,0,0.06)",
            }}
          >
            <p style={{ fontSize: 14, color: "#4B5563", margin: 0, lineHeight: 1.7 }}>
              The Depression Anxiety Stress Scales assess three distinct but related states of negative emotion.
              Think about how each statement applied to you{" "}
              <strong style={{ color: ICON_COLOR }}>over the past week</strong>, and rate it on a 0–3 scale.
            </p>
          </div>

          {/* Scale preview */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <p
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "#6B7280",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                margin: 0,
              }}
            >
              Response scale
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {SCALE_OPTIONS.map(opt => (
                <div
                  key={opt.value}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    background: "rgba(255,255,255,0.7)",
                    borderRadius: 12,
                    padding: "10px 14px",
                    border: "1.5px solid rgba(0,0,0,0.06)",
                  }}
                >
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: "rgba(139,92,246,0.08)",
                      border: `1.5px solid rgba(139,92,246,0.25)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <span style={{ fontSize: 13, fontWeight: 700, color: PURPLE }}>{opt.value}</span>
                  </div>
                  <span style={{ fontSize: 13, color: "#4B5563" }}>{opt.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Begin button */}
          <button
            onClick={handleBegin}
            style={{
              background: PURPLE,
              color: "#fff",
              border: "none",
              borderRadius: 9999,
              padding: "15px 24px",
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
              width: "100%",
              fontFamily: "Inter, sans-serif",
              boxShadow: "0 4px 16px rgba(139,92,246,0.30)",
            }}
          >
            Begin Assessment
          </button>
        </div>
      </div>
    );
  }

  // ── QUESTION VIEW ──────────────────────────────────────────────────────────
  if (view === "question") {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: PAGE_BG,
          display: "flex",
          flexDirection: "column",
          fontFamily: "Inter, sans-serif",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <BackButton onPress={handleBack} />

          <span style={{ fontSize: 13, fontWeight: 600, color: ICON_COLOR }}>
            Q{currentQ + 1} of 42
          </span>

          <button
            onClick={onDone}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: 12,
              fontWeight: 600,
              color: "#9CA3AF",
              fontFamily: "Inter, sans-serif",
              padding: "4px 0",
            }}
          >
            Save &amp; Exit
          </button>
        </div>

        {/* Progress bar */}
        <div style={{ padding: "0 20px 16px" }}>
          <div
            style={{
              height: 4,
              borderRadius: 2,
              background: "rgba(0,0,0,0.08)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${progress * 100}%`,
                background: PURPLE,
                borderRadius: 2,
                transition: "width 0.3s ease",
              }}
            />
          </div>
        </div>

        {/* Scrollable content */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "0 20px 32px",
            display: "flex",
            flexDirection: "column",
            gap: 16,
            maxWidth: 420,
            width: "100%",
            margin: "0 auto",
          }}
        >
          {/* Subscale chip */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              style={{
                background: qCfg.holderBg,
                borderRadius: 20,
                padding: "5px 14px",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              {q.subscale === "D" && <Brain size={13} color={qCfg.color} strokeWidth={1.75} />}
              {q.subscale === "A" && <Wind size={13} color={qCfg.color} strokeWidth={1.75} />}
              {q.subscale === "S" && <Zap size={13} color={qCfg.color} strokeWidth={1.75} />}
              <span style={{ fontSize: 12, fontWeight: 600, color: qCfg.textColor }}>
                {qCfg.label}
              </span>
            </div>
          </div>

          {/* Question card */}
          <div
            style={{
              background: "rgba(255,255,255,0.85)",
              borderRadius: 24,
              padding: "24px 20px",
              border: "1.5px solid rgba(0,0,0,0.06)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
            }}
          >
            <p
              style={{
                fontFamily: "Lora, Georgia, serif",
                fontStyle: "italic",
                fontSize: 17,
                color: ICON_COLOR,
                margin: 0,
                lineHeight: 1.65,
                textAlign: "center",
              }}
            >
              {q.text}
            </p>
          </div>

          {/* Option buttons */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {SCALE_OPTIONS.map(opt => {
              const isSel = selected === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => handleSelect(opt.value)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    background: isSel ? qCfg.tint : "rgba(255,255,255,0.85)",
                    border: isSel
                      ? `1.8px solid ${qCfg.selBorder}`
                      : "1.5px solid rgba(0,0,0,0.08)",
                    borderRadius: 14,
                    padding: "12px 16px",
                    cursor: "pointer",
                    width: "100%",
                    textAlign: "left",
                    fontFamily: "Inter, sans-serif",
                    transition: "all 0.15s ease",
                  }}
                >
                  {/* Number badge */}
                  <div
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      background: isSel ? qCfg.color : "rgba(0,0,0,0.06)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      transition: "background 0.15s ease",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: isSel ? "#fff" : "#6B7280",
                      }}
                    >
                      {opt.value}
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: isSel ? 600 : 400,
                      color: isSel ? qCfg.textColor : "#4B5563",
                      flex: 1,
                    }}
                  >
                    {opt.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Next button */}
          <button
            onClick={handleNext}
            disabled={selected === null}
            style={{
              background: selected !== null ? PURPLE : "#E5E7EB",
              color: selected !== null ? "#fff" : "#9CA3AF",
              border: "none",
              borderRadius: 9999,
              padding: "15px 24px",
              fontSize: 15,
              fontWeight: 600,
              cursor: selected !== null ? "pointer" : "not-allowed",
              width: "100%",
              fontFamily: "Inter, sans-serif",
              transition: "all 0.15s ease",
              boxShadow: selected !== null ? "0 4px 14px rgba(139,92,246,0.28)" : "none",
            }}
          >
            {currentQ < 41 ? "Next" : "See Results"}
          </button>

          {/* Skip */}
          <button
            onClick={handleSkip}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: 13,
              color: "#9CA3AF",
              fontFamily: "Inter, sans-serif",
              padding: "2px 0",
              textAlign: "center",
            }}
          >
            Skip this question
          </button>
        </div>
      </div>
    );
  }

  // ── RESULT VIEW ────────────────────────────────────────────────────────────
  const maxRaw = Math.max(dScore * 2, aScore * 2, sScore);
  const severity: AssessmentSeverity =
    maxRaw <= 9 ? "positive" :
    maxRaw <= 13 ? "mild" :
    maxRaw <= 20 ? "moderate" : "high";

  const dominantBand = dScore >= aScore && dScore >= sScore ? dBand
    : aScore >= sScore ? aBand : sBand;

  return (
    <div className="min-h-screen flex flex-col px-5 pt-14 pb-10" style={{ background: DONE_BG }}>
      <div className="flex justify-between items-center mb-8">
        <button onClick={onDone} className="w-11 h-11 rounded-2xl flex items-center justify-center"
          style={{ background: "rgba(255,255,255,0.88)", border: "1.5px solid rgba(139,92,246,0.15)" }} aria-label="Close">
          <ChevronLeft className="w-5 h-5" style={{ color: "#15113C", strokeWidth: 1.75 }} />
        </button>
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: "#9CA3AF" }}>DASS-21 Complete</span>
        <div style={{ width: 44 }} />
      </div>

      <div className="flex flex-col items-center mb-8">
        <div style={{ width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg, #A78BFA 0%, #8B5CF6 100%)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 24px rgba(139,92,246,0.3)", marginBottom: 16 }}>
          <Check className="w-9 h-9" style={{ color: "white", strokeWidth: 1.75 }} />
        </div>
        <h2 style={{ fontFamily: "Lora, serif", fontSize: 22, fontWeight: 500, color: "#15113C", textAlign: "center", marginBottom: 6 }}>
          Assessment complete
        </h2>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#6B7280", textAlign: "center", maxWidth: 280 }}>
          {buildInsight(dBand, aBand, sBand, dScore, aScore, sScore)}
        </p>
      </div>

      <AssessmentActionItems
        assessmentId="dass"
        severity={severity}
        severityLabel={dominantBand.label}
        severityColor={dominantBand.color}
        severityBg={dominantBand.bg}
        onStartTool={(id) => { onDone(); setTimeout(() => onStartTool?.(id), 100); }}
        onOpenChat={(prompt) => onOpenChatWithPrompt?.(prompt)}
      />

      <button onClick={onDone} className="mt-6 w-full py-4 rounded-full"
        style={{ background: "#8B5CF6", color: "white", fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 15, border: "none", cursor: "pointer" }}>
        Done
      </button>
    </div>
  );
}
