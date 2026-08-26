import { useState } from "react";
import { Heart, ArrowLeft, Check } from "lucide-react";
import { AssessmentActionItems, AssessmentSeverity } from "../AssessmentActionItems";

interface GratitudeAssessmentScreenProps {
  onDone: () => void;
  onStartTool?: (toolId: string) => void;
  onOpenChatWithPrompt?: (prompt: string) => void;
}

type View = "intro" | "question" | "result";

const QUESTIONS = [
  { text: "I have so much in life to be thankful for.", reverse: false },
  { text: "If I had to list everything that I felt grateful for, it would be a very long list.", reverse: false },
  { text: "When I look at the world, I don't see much to be grateful for.", reverse: true },
  { text: "I am grateful to a wide variety of people.", reverse: false },
  { text: "As I get older I find myself more able to appreciate the people, events, and situations that have been part of my life history.", reverse: false },
  { text: "Long amounts of time can go by before I feel grateful to something or someone.", reverse: true },
];

const SCALE_LABELS = [
  "Strongly Disagree",
  "Disagree",
  "Slightly Disagree",
  "Neutral",
  "Slightly Agree",
  "Agree",
  "Strongly Agree",
];

type Band = { label: string; color: string; bg: string; insight: string; action: string };

function getBand(score: number): Band {
  if (score <= 23) {
    return {
      label: "Emerging",
      color: "#D97706",
      bg: "#FEF3C7",
      insight:
        "Your gratitude practice is just beginning to take shape. Small, consistent moments of noticing what is good can expand your capacity for thankfulness over time.",
      action:
        "Try a brief daily habit: name one specific thing you appreciated today before going to sleep.",
    };
  }
  if (score <= 35) {
    return {
      label: "Growing",
      color: "#059669",
      bg: "#D1FAE5",
      insight:
        "You have a meaningful foundation of gratitude. Continuing to notice and express thankfulness to the people and moments around you will deepen this further.",
      action:
        "Consider writing a short gratitude letter to someone who has positively shaped your life.",
    };
  }
  return {
    label: "Flourishing",
    color: "#7C3AED",
    bg: "#EDE9FE",
    insight:
      "You experience gratitude richly and consistently. This strength supports your wellbeing, your relationships, and your resilience in difficult moments.",
    action:
      "Share your perspective — expressing gratitude openly to others amplifies its benefits for everyone.",
  };
}

function computeScore(answers: number[]): number {
  return QUESTIONS.reduce((sum, q, i) => {
    const raw = answers[i];
    if (raw === 0) return sum + 4; // midpoint imputation for skipped
    const scored = q.reverse ? 8 - raw : raw;
    return sum + scored;
  }, 0);
}

const PAGE_BG = "linear-gradient(180deg, #EDE9FE 0%, #F5F3FF 100%)";
const DONE_BG = "linear-gradient(135deg, #EDE9FE 0%, #C4B5FD 100%)";
const PURPLE = "#8B5CF6";
const ICON_COLOR = "#15113C";
const AMBER_ACCENT = "#F59E0B";
const AMBER_LIGHT = "#FDE68A";
const AMBER_TINT = "#FFFBEB";

export function GratitudeAssessmentScreen({ onDone, onStartTool, onOpenChatWithPrompt }: GratitudeAssessmentScreenProps) {
  const [view, setView] = useState<View>("intro");
  const [answers, setAnswers] = useState<number[]>(new Array(QUESTIONS.length).fill(0));
  const [currentQ, setCurrentQ] = useState(0);

  /* ── INTRO ── */
  if (view === "intro") {
    return (
      <div className="min-h-screen flex flex-col px-6 pt-14 pb-10" style={{ background: PAGE_BG }}>
        {/* Back */}
        <button
          className="self-start w-10 h-10 rounded-full flex items-center justify-center mb-8 active:scale-95 transition-transform"
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
            style={{ background: AMBER_LIGHT }}
          >
            <Heart className="w-7 h-7" style={{ color: ICON_COLOR, strokeWidth: 1.75 }} />
          </div>
        </div>

        {/* Heading */}
        <h1
          className="text-center mb-1"
          style={{ fontFamily: "Lora, serif", fontSize: 26, fontWeight: 600, color: "#15113C" }}
        >
          Gratitude Questionnaire
        </h1>
        <p
          className="text-center mb-6"
          style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#6B7280" }}
        >
          GQ-6 &middot; 6 questions &middot; 2 min
        </p>

        {/* Body */}
        <p
          className="text-center mb-10 leading-relaxed max-w-xs mx-auto"
          style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#4B5563" }}
        >
          Measure your current level of gratitude across three dimensions: recognizing, responding
          to, and experiencing thankfulness.
        </p>

        {/* Scale preview */}
        <div className="mb-12">
          <div className="flex justify-center gap-2 mb-2">
            {[1, 2, 3, 4, 5, 6, 7].map((n) => (
              <div
                key={n}
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{
                  background: AMBER_LIGHT,
                  fontFamily: "Inter, sans-serif",
                  fontSize: 12,
                  fontWeight: 600,
                  color: ICON_COLOR,
                }}
              >
                {n}
              </div>
            ))}
          </div>
          <div className="flex justify-between px-1">
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "#9CA3AF" }}>
              Strongly Disagree
            </span>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "#9CA3AF" }}>
              Strongly Agree
            </span>
          </div>
        </div>

        {/* CTA */}
        <button
          className="cb-btn-primary active:scale-95 transition-transform w-full"
          style={{ background: PURPLE, borderColor: PURPLE }}
          onClick={() => {
            setAnswers(new Array(QUESTIONS.length).fill(0));
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
    const q = QUESTIONS[currentQ];
    const selected = answers[currentQ];
    const isLast = currentQ === QUESTIONS.length - 1;
    const progress = (currentQ / QUESTIONS.length) * 100;

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
            className="w-10 h-10 rounded-full flex items-center justify-center active:scale-95 transition-transform"
            style={{ background: "rgba(255,255,255,0.7)", border: "1.5px solid rgba(0,0,0,0.07)" }}
            onClick={handleBack}
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" style={{ color: ICON_COLOR, strokeWidth: 1.75 }} />
          </button>
          <span
            style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 600, color: "#15113C" }}
          >
            Q{currentQ + 1} of {QUESTIONS.length}
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
          className="w-full rounded-full mb-6 overflow-hidden"
          style={{ height: 6, background: "#E5E7EB" }}
        >
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{ width: `${progress}%`, background: PURPLE }}
          />
        </div>

        {/* Category chip */}
        <div className="flex justify-center mb-6">
          <span
            className="px-3 py-1 rounded-full"
            style={{
              background: AMBER_LIGHT,
              fontFamily: "Inter, sans-serif",
              fontSize: 11,
              fontWeight: 700,
              color: "#92400E",
              letterSpacing: "0.05em",
            }}
          >
            GQ-6
          </span>
        </div>

        {/* Question card */}
        <div className="rounded-3xl px-6 py-8 mb-6" style={{ background: "rgba(255,255,255,0.85)" }}>
          <p
            style={{
              fontFamily: "Lora, serif",
              fontSize: 18,
              fontStyle: "italic",
              color: "#15113C",
              lineHeight: 1.6,
            }}
          >
            {q.text}
          </p>
        </div>

        {/* 7-point scale */}
        <div className="flex gap-2 justify-center mb-3">
          {[1, 2, 3, 4, 5, 6, 7].map((val) => {
            const isSelected = selected === val;
            return (
              <button
                key={val}
                onClick={() => handleSelect(val)}
                className="active:scale-95 transition-transform flex-1"
                style={{
                  height: 44,
                  borderRadius: 10,
                  border: `2px solid ${isSelected ? AMBER_ACCENT : "#E5E7EB"}`,
                  background: isSelected ? AMBER_TINT : "#FFFFFF",
                  fontFamily: "Inter, sans-serif",
                  fontSize: 14,
                  fontWeight: 700,
                  color: isSelected ? "#92400E" : "#6B7280",
                  cursor: "pointer",
                }}
              >
                {val}
              </button>
            );
          })}
        </div>

        {/* Scale labels */}
        <div className="flex justify-between mb-4 px-1">
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "#9CA3AF" }}>
            Strongly Disagree
          </span>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "#9CA3AF" }}>
            Strongly Agree
          </span>
        </div>

        {/* Selected label */}
        {selected > 0 && (
          <p
            className="text-center mb-4"
            style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: AMBER_ACCENT }}
          >
            {SCALE_LABELS[selected - 1]}
          </p>
        )}

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
  const score = computeScore(answers);
  const band = getBand(score);
  const severity: AssessmentSeverity =
    band.label === "Flourishing" ? "positive" :
    band.label === "Growing" ? "mild" : "moderate";

  return (
    <div className="min-h-screen flex flex-col px-5 pt-14 pb-10" style={{ background: DONE_BG }}>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <button onClick={onDone} className="w-11 h-11 rounded-2xl flex items-center justify-center"
          style={{ background: "rgba(255,255,255,0.88)", border: "1.5px solid rgba(139,92,246,0.15)" }} aria-label="Close">
          <ArrowLeft className="w-5 h-5" style={{ color: "#15113C", strokeWidth: 1.75 }} />
        </button>
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: "#9CA3AF" }}>
          Gratitude Questionnaire Complete
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
        assessmentId="gratitude-assess"
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
