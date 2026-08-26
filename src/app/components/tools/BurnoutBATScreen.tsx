import { useState } from "react";
import { Flame, ArrowLeft, Check } from "lucide-react";
import { AssessmentActionItems, AssessmentSeverity } from "../AssessmentActionItems";

interface BurnoutBATScreenProps {
  onDone: () => void;
  onStartTool?: (toolId: string) => void;
  onOpenChatWithPrompt?: (prompt: string) => void;
}

type View = "intro" | "question" | "result";

interface DimensionDef {
  name: string;
  chipBg: string;
  chipText: string;
  selBorder: string;
  selTint: string;
  items: string[];
}

const DIMENSIONS: DimensionDef[] = [
  {
    name: "Exhaustion",
    chipBg: "#FFEDD5",
    chipText: "#C2410C",
    selBorder: "#EA580C",
    selTint: "#FFF7ED",
    items: [
      "I feel mentally exhausted.",
      "Everything I do requires a great deal of effort.",
      "At the end of the day, I find it hard to recover my energy.",
      "I feel physically exhausted.",
      "When I get up in the morning, I lack the energy to start a new day.",
      "I want to be active, but somehow I am unable to manage.",
      "When I exert myself, I quickly get tired.",
      "At the end of my day, I feel mentally exhausted and drained.",
    ],
  },
  {
    name: "Mental Distance",
    chipBg: "#FEF3C7",
    chipText: "#92400E",
    selBorder: "#D97706",
    selTint: "#FFFBEB",
    items: [
      "I struggle to find any enthusiasm for what I do.",
      "I feel a strong aversion towards my responsibilities.",
      "I feel indifferent about what I do.",
      "I am cynical about what my efforts mean to others.",
    ],
  },
  {
    name: "Cognitive Impairment",
    chipBg: "#DBEAFE",
    chipText: "#1E40AF",
    selBorder: "#2563EB",
    selTint: "#EFF6FF",
    items: [
      "I have trouble staying focused.",
      "I struggle to think clearly.",
      "I am forgetful and distracted.",
      "I have trouble concentrating.",
      "I make mistakes because I have my mind on other things.",
    ],
  },
  {
    name: "Emotional Impairment",
    chipBg: "#FFE4E6",
    chipText: "#9F1239",
    selBorder: "#E11D48",
    selTint: "#FFF1F2",
    items: [
      "I feel unable to control my emotions.",
      "I do not recognize myself in the way I react emotionally.",
      "I become irritable when things do not go my way.",
      "I get upset or sad without knowing why.",
      "I may overreact unintentionally.",
    ],
  },
];

interface FlatQuestion {
  text: string;
  dimIndex: number;
  globalIndex: number;
}

const FLAT_QUESTIONS: FlatQuestion[] = DIMENSIONS.flatMap((dim, di) =>
  dim.items.map((text) => ({ text, dimIndex: di, globalIndex: 0 }))
).map((q, i) => ({ ...q, globalIndex: i }));

const TOTAL = FLAT_QUESTIONS.length;

const OPTION_LABELS = ["Never", "Rarely", "Sometimes", "Often", "Always"];

interface Band {
  label: string;
  insight: string;
  color: string;
  bg: string;
  action: string;
}

function getBand(score: number): Band {
  if (score <= 44)
    return {
      label: "Resilient",
      insight: "Low burnout indicators. Your reserves appear healthy and engaged.",
      color: "#059669",
      bg: "#D1FAE5",
      action: "Maintain your recovery rituals and protect your boundaries proactively.",
    };
  if (score <= 66)
    return {
      label: "Fatigued",
      insight: "Some depletion is present. Recovery practices may help significantly.",
      color: "#D97706",
      bg: "#FEF3C7",
      action: "Prioritize sleep, nature time, and at least one full rest day each week.",
    };
  if (score <= 88)
    return {
      label: "At Risk",
      insight: "Elevated burnout signals detected. Rest and boundary-setting are important now.",
      color: "#EA580C",
      bg: "#FEE2E2",
      action: "Reduce workload where possible and consider speaking with a trusted person or professional.",
    };
  return {
    label: "Burnout",
    insight: "Strong burnout pattern present. Please prioritize rest and seek qualified support.",
    color: "#DC2626",
    bg: "#FEE2E2",
    action: "Please speak with a mental health professional. Burnout is treatable with the right support.",
  };
}

function dimAverage(answers: number[], dimIndex: number): number {
  const qs = FLAT_QUESTIONS.filter((q) => q.dimIndex === dimIndex);
  if (qs.length === 0) return 0;
  const sum = qs.reduce((s, q) => {
    const a = answers[q.globalIndex];
    return s + (a > 0 ? a : 3); // midpoint for skipped (scale 1-5)
  }, 0);
  return sum / qs.length;
}

function computeTotal(answers: number[]): number {
  return answers.reduce((sum, a) => sum + (a > 0 ? a : 3), 0);
}

const PAGE_BG = "linear-gradient(180deg, #EDE9FE 0%, #F5F3FF 100%)";
const DONE_BG = "linear-gradient(135deg, #EDE9FE 0%, #C4B5FD 100%)";
const PURPLE = "#8B5CF6";
const ICON_COLOR = "#15113C";
const ORANGE_LIGHT = "#FFEDD5";

export function BurnoutBATScreen({ onDone, onStartTool, onOpenChatWithPrompt }: BurnoutBATScreenProps) {
  const [view, setView] = useState<View>("intro");
  const [answers, setAnswers] = useState<number[]>(new Array(TOTAL).fill(0));
  const [currentQ, setCurrentQ] = useState(0);

  /* ── INTRO ── */
  if (view === "intro") {
    return (
      <div className="min-h-screen flex flex-col px-6 pt-14 pb-10" style={{ background: PAGE_BG }}>
        {/* Back */}
        <button
          className="self-start w-11 h-11 rounded-full flex items-center justify-center mb-8 active:scale-95 transition-transform"
          style={{ background: "rgba(255,255,255,0.7)", border: "1.5px solid rgba(0,0,0,0.07)" }}
          onClick={onDone}
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5" style={{ color: ICON_COLOR, strokeWidth: 1.75 }} />
        </button>

        {/* Icon holder */}
        <div className="flex justify-center mb-6">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{ background: ORANGE_LIGHT }}
          >
            <Flame className="w-7 h-7" style={{ color: ICON_COLOR, strokeWidth: 1.75 }} />
          </div>
        </div>

        {/* Title */}
        <h1
          className="text-center mb-1"
          style={{ fontFamily: "Lora, serif", fontSize: 26, fontWeight: 600, color: "#15113C" }}
        >
          Burnout Assessment
        </h1>
        <p
          className="text-center mb-6"
          style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#6B7280" }}
        >
          BAT &middot; {TOTAL} questions &middot; 7 min
        </p>

        {/* Body */}
        <p
          className="text-center mb-8 leading-relaxed max-w-xs mx-auto"
          style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#4B5563" }}
        >
          The Burnout Assessment Tool (BAT) measures four core dimensions: exhaustion,
          mental distance, cognitive impairment, and emotional impairment.
        </p>

        {/* Dimension chips */}
        <div className="grid grid-cols-2 gap-2 mb-10">
          {DIMENSIONS.map((dim) => (
            <div
              key={dim.name}
              className="px-3 py-2 rounded-xl"
              style={{ background: dim.chipBg }}
            >
              <span
                style={{ fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 600, color: dim.chipText }}
              >
                {dim.name}
              </span>
              <p
                style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: dim.chipText, opacity: 0.7, marginTop: 2 }}
              >
                {dim.items.length} items
              </p>
            </div>
          ))}
        </div>

        <button
          className="cb-btn-primary active:scale-95 transition-transform w-full"
          style={{ background: PURPLE, borderColor: PURPLE }}
          onClick={() => {
            setAnswers(new Array(TOTAL).fill(0));
            setCurrentQ(0);
            setView("question");
          }}
        >
          Begin Assessment
        </button>
      </div>
    );
  }

  /* ── QUESTION ── */
  if (view === "question") {
    const fq = FLAT_QUESTIONS[currentQ];
    const dim = DIMENSIONS[fq.dimIndex];
    const selected = answers[currentQ];
    const isLast = currentQ === TOTAL - 1;
    const progress = (currentQ / TOTAL) * 100;

    const handleSelect = (val: number) => {
      const next = [...answers];
      next[currentQ] = val;
      setAnswers(next);
    };

    const handleNext = () => {
      if (selected === 0) return;
      if (isLast) setView("result");
      else setCurrentQ((q) => q + 1);
    };

    const handleSkip = () => {
      if (isLast) setView("result");
      else setCurrentQ((q) => q + 1);
    };

    const handleBack = () => {
      if (currentQ === 0) setView("intro");
      else setCurrentQ((q) => q - 1);
    };

    return (
      <div className="min-h-screen flex flex-col px-6 pt-8 pb-10" style={{ background: PAGE_BG }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <button
            className="w-11 h-11 rounded-full flex items-center justify-center active:scale-95 transition-transform"
            style={{ background: "rgba(255,255,255,0.7)", border: "1.5px solid rgba(0,0,0,0.07)" }}
            onClick={handleBack}
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" style={{ color: ICON_COLOR, strokeWidth: 1.75 }} />
          </button>
          <span
            style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 600, color: "#15113C" }}
          >
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
              padding: "4px 0",
            }}
          >
            Save &amp; Exit
          </button>
        </div>

        {/* Progress bar */}
        <div
          className="w-full rounded-full mb-4 overflow-hidden"
          style={{ height: 6, background: "#E5E7EB" }}
        >
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{ width: `${progress}%`, background: PURPLE }}
          />
        </div>

        {/* Dimension chip */}
        <div className="flex justify-center mb-6">
          <span
            className="px-3 py-1 rounded-full"
            style={{
              background: dim.chipBg,
              fontFamily: "Inter, sans-serif",
              fontSize: 11,
              fontWeight: 600,
              color: dim.chipText,
              letterSpacing: "0.04em",
            }}
          >
            {dim.name}
          </span>
        </div>

        {/* Question card */}
        <div className="rounded-3xl px-6 py-8 mb-5" style={{ background: "rgba(255,255,255,0.85)" }}>
          <p
            style={{
              fontFamily: "Lora, serif",
              fontSize: 18,
              fontStyle: "italic",
              color: "#15113C",
              lineHeight: 1.6,
            }}
          >
            {fq.text}
          </p>
        </div>

        {/* 1-5 option buttons (vertical) */}
        <div className="flex flex-col gap-2 mb-5">
          {OPTION_LABELS.map((label, idx) => {
            const val = idx + 1;
            const isSelected = selected === val;
            return (
              <button
                key={val}
                onClick={() => handleSelect(val)}
                className="active:scale-95 transition-transform w-full text-left px-4"
                style={{
                  height: 48,
                  borderRadius: 12,
                  border: `2px solid ${isSelected ? dim.selBorder : "#E5E7EB"}`,
                  background: isSelected ? dim.selTint : "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  cursor: "pointer",
                }}
              >
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 13,
                    fontWeight: 700,
                    color: isSelected ? dim.chipText : "#9CA3AF",
                    minWidth: 16,
                  }}
                >
                  {val}
                </span>
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 13,
                    fontWeight: isSelected ? 600 : 400,
                    color: isSelected ? dim.chipText : "#374151",
                  }}
                >
                  {label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Next button */}
        <button
          className="cb-btn-primary active:scale-95 transition-transform w-full mb-3"
          style={{
            background: selected > 0 ? PURPLE : "#E5E7EB",
            borderColor: selected > 0 ? PURPLE : "#E5E7EB",
            color: selected > 0 ? "#ffffff" : "#9CA3AF",
            cursor: selected > 0 ? "pointer" : "default",
          }}
          disabled={selected === 0}
          onClick={handleNext}
        >
          {isLast ? "Complete" : "Next"}
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

  /* ── RESULT ── */
  const total = computeTotal(answers);
  const band = getBand(total);
  const severity: AssessmentSeverity =
    band.label === "Resilient" ? "positive" :
    band.label === "Fatigued" ? "mild" :
    band.label === "At Risk" ? "moderate" : "high";

  return (
    <div className="min-h-screen flex flex-col px-5 pt-14 pb-10" style={{ background: DONE_BG }}>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <button onClick={onDone} className="w-11 h-11 rounded-2xl flex items-center justify-center"
          style={{ background: "rgba(255,255,255,0.88)", border: "1.5px solid rgba(139,92,246,0.15)" }} aria-label="Close">
          <ArrowLeft className="w-5 h-5" style={{ color: "#15113C", strokeWidth: 1.75 }} />
        </button>
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: "#9CA3AF" }}>
          Burnout Assessment Complete
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
          {band.insight}
        </p>
      </div>

      {/* Action items */}
      <AssessmentActionItems
        assessmentId="burnout-bat"
        severity={severity}
        severityLabel={band.label}
        severityColor={band.color}
        severityBg={band.bg}
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
