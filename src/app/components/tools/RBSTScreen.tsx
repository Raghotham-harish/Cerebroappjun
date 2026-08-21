import { useState } from "react";
import { Zap, ArrowLeft, Check } from "lucide-react";

interface RBSTScreenProps {
  onDone: () => void;
}

type View = "intro" | "question" | "result";

const QUESTIONS = [
  {
    text: "How often do you feel emotionally drained from your work?",
    reversed: false,
  },
  {
    text: "How often do you feel physically exhausted at the end of a workday?",
    reversed: false,
  },
  {
    text: "How often do you feel energized and enthusiastic about your work?",
    reversed: true,
  },
  {
    text: "How often do you feel like you have nothing more to give at work?",
    reversed: false,
  },
];

const OPTIONS = [
  { label: "Never", sub: "This never happens", value: 0 },
  { label: "Yearly", sub: "Once or twice a year", value: 1 },
  { label: "Monthly", sub: "A few times a month", value: 2 },
  { label: "Weekly", sub: "Several times a week", value: 3 },
  { label: "Daily", sub: "Almost every day", value: 4 },
];

function computeScore(answers: number[]): number {
  return answers.reduce((sum, val, i) => {
    if (val < 0) return sum;
    const raw = QUESTIONS[i].reversed ? 4 - val : val;
    return sum + raw;
  }, 0);
}

function getBand(score: number) {
  if (score <= 4) return {
    label: "Low Risk",
    color: "#059669",
    bg: "#D1FAE5",
    insight: "Your burnout indicators are in a healthy range. You are managing your occupational energy well.",
    action: "Keep protecting what is working — sustainable boundaries, rest, and meaningful work are key.",
  };
  if (score <= 9) return {
    label: "Moderate Risk",
    color: "#D97706",
    bg: "#FEF3C7",
    insight: "Some burnout warning signs are present. These are worth attending to before they deepen.",
    action: "Identify one area where you can reduce demand or increase recovery time this week.",
  };
  return {
    label: "Burnout Likely",
    color: "#DC2626",
    bg: "#FEE2E2",
    insight: "Your responses indicate significant burnout risk. These patterns can have real effects on your health and performance.",
    action: "Please speak with a healthcare professional or occupational health advisor. Burnout is a recognized condition with effective treatments.",
  };
}

const PAGE_BG = "linear-gradient(180deg, #EDE9FE 0%, #F5F3FF 100%)";
const DONE_BG = "linear-gradient(135deg, #EDE9FE 0%, #C4B5FD 100%)";
const PURPLE = "#8B5CF6";
const ICON_COLOR = "#15113C";
const ORANGE_LIGHT = "#FFEDD5";
const ORANGE_ACCENT = "#F97316";
const ORANGE_TINT = "#FFF7ED";

export function RBSTScreen({ onDone }: RBSTScreenProps) {
  const [view, setView] = useState<View>("intro");
  const [answers, setAnswers] = useState<number[]>(new Array(QUESTIONS.length).fill(-1));
  const [currentQ, setCurrentQ] = useState(0);

  if (view === "intro") {
    return (
      <div className="min-h-screen flex flex-col px-6 pt-14 pb-10" style={{ background: PAGE_BG }}>
        <button
          className="self-start w-11 h-11 rounded-full flex items-center justify-center mb-8 active:scale-95 transition-transform"
          style={{ background: "rgba(255,255,255,0.7)", border: "1.5px solid rgba(0,0,0,0.07)" }}
          onClick={onDone}
        >
          <ArrowLeft className="w-5 h-5" style={{ color: ICON_COLOR, strokeWidth: 1.75 }} />
        </button>

        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: ORANGE_LIGHT }}>
            <Zap className="w-7 h-7" style={{ color: ICON_COLOR, strokeWidth: 1.75 }} />
          </div>
        </div>

        <h1 className="text-center mb-1" style={{ fontFamily: "Lora, serif", fontSize: 26, fontWeight: 600, color: "#15113C" }}>
          Burnout Screen
        </h1>
        <p className="text-center mb-6" style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#6B7280" }}>
          RBST &middot; 4 questions &middot; 1 min
        </p>

        <p className="text-center mb-8 leading-relaxed max-w-xs mx-auto" style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#4B5563" }}>
          The Rapid Burnout Screening Tool asks four questions about your occupational energy and emotional reserves to quickly flag burnout risk.
        </p>

        {/* Frequency scale preview */}
        <div className="rounded-2xl px-5 py-4 mb-10" style={{ background: "rgba(255,255,255,0.7)" }}>
          <p className="mb-3" style={{ fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.07em" }}>Frequency Scale</p>
          <div className="flex gap-2 flex-wrap">
            {OPTIONS.map((opt) => (
              <span
                key={opt.value}
                className="px-2.5 py-1 rounded-full"
                style={{ background: ORANGE_LIGHT, fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 600, color: "#C2410C" }}
              >
                {opt.label}
              </span>
            ))}
          </div>
        </div>

        <button
          className="cb-btn-primary active:scale-95 transition-transform w-full"
          style={{ background: PURPLE, borderColor: PURPLE }}
          onClick={() => { setAnswers(new Array(QUESTIONS.length).fill(-1)); setCurrentQ(0); setView("question"); }}
        >
          Begin Assessment
        </button>
      </div>
    );
  }

  if (view === "question") {
    const q = QUESTIONS[currentQ];
    const selected = answers[currentQ];
    const isLast = currentQ === QUESTIONS.length - 1;
    const progress = (currentQ / QUESTIONS.length) * 100;

    const handleSelect = (val: number) => {
      const next = [...answers]; next[currentQ] = val; setAnswers(next);
    };
    const handleNext = () => {
      if (selected < 0) return;
      if (isLast) setView("result"); else setCurrentQ((q) => q + 1);
    };
    const handleSkip = () => {
      if (isLast) setView("result"); else setCurrentQ((q) => q + 1);
    };
    const handleBack = () => {
      if (currentQ === 0) setView("intro"); else setCurrentQ((q) => q - 1);
    };

    return (
      <div className="min-h-screen flex flex-col px-6 pt-8 pb-10" style={{ background: PAGE_BG }}>
        <div className="flex items-center justify-between mb-5">
          <button
            className="w-11 h-11 rounded-full flex items-center justify-center active:scale-95 transition-transform"
            style={{ background: "rgba(255,255,255,0.7)", border: "1.5px solid rgba(0,0,0,0.07)" }}
            onClick={handleBack}
          >
            <ArrowLeft className="w-5 h-5" style={{ color: ICON_COLOR, strokeWidth: 1.75 }} />
          </button>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 600, color: "#15113C" }}>
            Q{currentQ + 1} of {QUESTIONS.length}
          </span>
          <button onClick={onDone} style={{ fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 600, color: "#9CA3AF", background: "none", border: "none", cursor: "pointer" }}>
            Save &amp; Exit
          </button>
        </div>

        <div className="w-full rounded-full mb-4 overflow-hidden" style={{ height: 6, background: "#E5E7EB" }}>
          <div className="h-full rounded-full transition-all duration-300" style={{ width: `${progress}%`, background: PURPLE }} />
        </div>

        <div className="flex justify-center mb-6">
          <span className="px-3 py-1 rounded-full" style={{ background: ORANGE_LIGHT, fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 700, color: "#C2410C", letterSpacing: "0.05em" }}>
            {q.reversed ? "Energy Indicator" : "Burnout Indicator"}
          </span>
        </div>

        <div className="rounded-3xl px-6 py-8 mb-5" style={{ background: "rgba(255,255,255,0.85)" }}>
          <p style={{ fontFamily: "Lora, serif", fontSize: 18, fontStyle: "italic", color: "#15113C", lineHeight: 1.65 }}>
            {q.text}
          </p>
        </div>

        <div className="flex flex-col gap-2 mb-5">
          {OPTIONS.map((opt) => {
            const isSel = selected === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => handleSelect(opt.value)}
                className="active:scale-95 transition-transform w-full text-left px-4"
                style={{
                  height: 52,
                  borderRadius: 12,
                  border: `2px solid ${isSel ? ORANGE_ACCENT : "#E5E7EB"}`,
                  background: isSel ? ORANGE_TINT : "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  cursor: "pointer",
                }}
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: isSel ? ORANGE_ACCENT : "#F3F4F6", fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 700, color: isSel ? "white" : "#6B7280" }}
                >
                  {opt.value}
                </div>
                <div>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: isSel ? "#C2410C" : "#374151" }}>{opt.label}</span>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "#9CA3AF", marginLeft: 6 }}>— {opt.sub}</span>
                </div>
              </button>
            );
          })}
        </div>

        <button
          className="cb-btn-primary active:scale-95 transition-transform w-full mb-3"
          style={{ background: selected >= 0 ? PURPLE : "#E5E7EB", borderColor: selected >= 0 ? PURPLE : "#E5E7EB", color: selected >= 0 ? "#ffffff" : "#9CA3AF", cursor: selected >= 0 ? "pointer" : "default" }}
          disabled={selected < 0}
          onClick={handleNext}
        >
          {isLast ? "Complete" : "Next"}
        </button>

        <button onClick={handleSkip} style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#9CA3AF", background: "none", border: "none", cursor: "pointer", padding: "8px", textAlign: "center", width: "100%" }}>
          Skip this question
        </button>
      </div>
    );
  }

  const score = computeScore(answers);
  const band = getBand(score);

  return (
    <div className="min-h-screen flex flex-col items-center px-6 pt-14 pb-10" style={{ background: DONE_BG }}>
      <div
        className="flex items-center justify-center mb-6"
        style={{ width: 120, height: 120, borderRadius: "50%", background: "linear-gradient(135deg, #A78BFA 0%, #7C3AED 100%)", boxShadow: "0 8px 32px rgba(139,92,246,0.35)" }}
      >
        <div className="text-center">
          <span style={{ fontFamily: "Lora, serif", fontSize: 42, fontWeight: 700, color: "#ffffff", display: "block", lineHeight: 1 }}>{score}</span>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "rgba(255,255,255,0.75)", display: "block" }}>out of 16</span>
        </div>
      </div>

      <div className="px-4 py-1 rounded-full mb-4" style={{ background: band.bg }}>
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 700, color: band.color, letterSpacing: "0.04em" }}>{band.label}</span>
      </div>

      <h2 className="mb-3 text-center" style={{ fontFamily: "Lora, serif", fontSize: 22, fontWeight: 600, color: "#15113C" }}>
        {band.label}
      </h2>
      <p className="text-center mb-6 max-w-xs leading-relaxed" style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#4B5563" }}>
        {band.insight}
      </p>

      {/* Band reference */}
      <div className="w-full max-w-sm rounded-2xl px-5 py-4 mb-5" style={{ background: "rgba(255,255,255,0.75)" }}>
        <p className="mb-3" style={{ fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.07em" }}>Score Ranges</p>
        {[{ range: "0–4", label: "Low Risk", color: "#059669" }, { range: "5–9", label: "Moderate Risk", color: "#D97706" }, { range: "10–16", label: "Burnout Likely", color: "#DC2626" }].map((b) => (
          <div key={b.label} className="flex items-center justify-between mb-2">
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#374151" }}>{b.label}</span>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: b.color, fontWeight: 600 }}>{b.range}</span>
          </div>
        ))}
        <div className="flex items-center justify-between mt-3 pt-3" style={{ borderTop: "1px solid #F3F4F6" }}>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 700, color: "#15113C" }}>Your score</span>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 700, color: band.color }}>{score} / 16</span>
        </div>
      </div>

      <div className="w-full max-w-sm rounded-2xl px-5 py-4 mb-8" style={{ background: "rgba(255,255,255,0.7)" }}>
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: ORANGE_LIGHT }}>
            <Check className="w-5 h-5" style={{ color: ICON_COLOR, strokeWidth: 1.75 }} />
          </div>
          <div>
            <p className="mb-1" style={{ fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 700, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.06em" }}>Suggested Next Step</p>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#15113C", lineHeight: 1.5 }}>{band.action}</p>
          </div>
        </div>
      </div>

      <button className="cb-btn-primary active:scale-95 transition-transform w-full max-w-sm" style={{ background: PURPLE, borderColor: PURPLE }} onClick={onDone}>
        Done
      </button>
    </div>
  );
}
