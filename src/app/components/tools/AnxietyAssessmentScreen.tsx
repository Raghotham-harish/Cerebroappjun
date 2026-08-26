import { useState } from "react";
import { Brain, ArrowLeft, Check } from "lucide-react";
import { AssessmentActionItems, AssessmentSeverity } from "../AssessmentActionItems";

interface AnxietyAssessmentScreenProps {
  onDone: () => void;
  onStartTool?: (toolId: string) => void;
  onOpenChatWithPrompt?: (prompt: string) => void;
}

type View = "intro" | "question" | "result";

interface Question {
  text: string;
  reverse: boolean;
}

const QUESTIONS: Question[] = [
  { text: "If I do not have enough time to do everything, I do not worry about it.", reverse: true },
  { text: "My worries overwhelm me.", reverse: false },
  { text: "I do not tend to worry about things.", reverse: true },
  { text: "Many situations make me worry.", reverse: false },
  { text: "I know I should not worry about things, but I just cannot help it.", reverse: false },
  { text: "When I am under pressure I worry a lot.", reverse: false },
  { text: "I am always worrying about something.", reverse: false },
  { text: "I find it easy to dismiss worrisome thoughts.", reverse: true },
  { text: "As soon as I finish one task, I start to worry about everything else I have to do.", reverse: false },
  { text: "I never worry about anything.", reverse: true },
  { text: "When there is nothing more I can do about a concern, I do not worry about it any more.", reverse: true },
  { text: "I have been a worrier all my life.", reverse: false },
  { text: "I notice that I have been worrying about things.", reverse: false },
  { text: "Once I start worrying, I cannot stop.", reverse: false },
  { text: "I worry all the time.", reverse: false },
  { text: "I worry about projects until they are all done.", reverse: false },
];

type Section = { label: string; range: [number, number] };

const SECTIONS: Section[] = [
  { label: "Generalized", range: [0, 3] },
  { label: "Controllability", range: [4, 10] },
  { label: "Pervasiveness", range: [11, 15] },
];

function getSectionLabel(qIndex: number): string {
  for (const s of SECTIONS) {
    if (qIndex >= s.range[0] && qIndex <= s.range[1]) return s.label;
  }
  return "";
}

type Band = { label: string; color: string; bg: string; insight: string; action: string };

function getBand(score: number): Band {
  if (score <= 34) {
    return {
      label: "Minimal",
      color: "#059669",
      bg: "#D1FAE5",
      insight: "Worry plays a small role in your daily life. You tend to manage concerns without them becoming consuming.",
      action: "Keep strengthening your natural resilience with regular moments of rest and reflection.",
    };
  }
  if (score <= 49) {
    return {
      label: "Moderate",
      color: "#D97706",
      bg: "#FEF3C7",
      insight: "You experience noticeable worry that can be managed with tools. Some situations likely trigger repetitive thinking patterns.",
      action: "Explore structured worry time — scheduling 15 minutes a day to examine concerns can reduce their background presence.",
    };
  }
  if (score <= 59) {
    return {
      label: "Elevated",
      color: "#EA580C",
      bg: "#FEE2E2",
      insight: "Worry is significantly affecting your daily experience. You may find it difficult to let concerns go or to fully relax.",
      action: "Cognitive defusion techniques and breathing practices can interrupt worry loops — consider exploring these regularly.",
    };
  }
  return {
    label: "High",
    color: "#DC2626",
    bg: "#FEE2E2",
    insight: "Worry is strongly present and may be interfering with multiple areas of your life. This level of worry deserves dedicated attention.",
    action: "Consider speaking with a mental health professional. Effective, evidence-based treatments for worry and anxiety are available.",
  };
}

function computeScore(answers: number[]): number {
  return QUESTIONS.reduce((sum, q, i) => {
    const raw = answers[i];
    if (raw === 0) return sum + 3; // midpoint imputation for skipped (scale 1-5, midpoint=3)
    const scored = q.reverse ? 6 - raw : raw;
    return sum + scored;
  }, 0);
}

const PAGE_BG = "linear-gradient(180deg, #EDE9FE 0%, #F5F3FF 100%)";
const DONE_BG = "linear-gradient(135deg, #EDE9FE 0%, #C4B5FD 100%)";
const PURPLE = "#8B5CF6";
const ICON_COLOR = "#15113C";
const BLUE_ACCENT = "#3B82F6";
const BLUE_LIGHT = "#DBEAFE";
const BLUE_TINT = "#EFF6FF";

const SCALE_LABELS_5 = [
  "Not at all like me",
  "Slightly like me",
  "Somewhat like me",
  "Mostly like me",
  "Very much like me",
];

export function AnxietyAssessmentScreen({ onDone, onStartTool, onOpenChatWithPrompt }: AnxietyAssessmentScreenProps) {
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
            style={{ background: BLUE_LIGHT }}
          >
            <Brain className="w-7 h-7" style={{ color: ICON_COLOR, strokeWidth: 1.75 }} />
          </div>
        </div>

        {/* Heading */}
        <h1
          className="text-center mb-1"
          style={{ fontFamily: "Lora, serif", fontSize: 26, fontWeight: 600, color: "#15113C" }}
        >
          Worry &amp; Anxiety Check-in
        </h1>
        <p
          className="text-center mb-6"
          style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#6B7280" }}
        >
          PSWQ &middot; 16 questions &middot; 5 min
        </p>

        {/* Body */}
        <p
          className="text-center mb-10 leading-relaxed max-w-xs mx-auto"
          style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#4B5563" }}
        >
          The Penn State Worry Questionnaire measures the tendency to worry — how frequent,
          uncontrollable, and excessive worrying feels.
        </p>

        {/* Scale preview */}
        <div className="mb-12">
          <div className="flex justify-center gap-3 mb-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <div
                key={n}
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  background: BLUE_LIGHT,
                  fontFamily: "Inter, sans-serif",
                  fontSize: 14,
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
              Not at all like me
            </span>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "#9CA3AF" }}>
              Very much like me
            </span>
          </div>
        </div>

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
    const section = getSectionLabel(currentQ);

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
          className="w-full rounded-full mb-4 overflow-hidden"
          style={{ height: 6, background: "#E5E7EB" }}
        >
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{ width: `${progress}%`, background: PURPLE }}
          />
        </div>

        {/* Section chip */}
        {section && (
          <div className="flex justify-center mb-6">
            <span
              className="px-3 py-1 rounded-full"
              style={{
                background: BLUE_LIGHT,
                fontFamily: "Inter, sans-serif",
                fontSize: 11,
                fontWeight: 600,
                color: "#1D4ED8",
                letterSpacing: "0.04em",
              }}
            >
              {section}
            </span>
          </div>
        )}

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

        {/* 5-point scale */}
        <div className="flex gap-2 justify-center mb-3">
          {[1, 2, 3, 4, 5].map((val) => {
            const isSelected = selected === val;
            return (
              <button
                key={val}
                onClick={() => handleSelect(val)}
                className="active:scale-95 transition-transform flex-1"
                style={{
                  height: 48,
                  borderRadius: 10,
                  border: `2px solid ${isSelected ? BLUE_ACCENT : "#E5E7EB"}`,
                  background: isSelected ? BLUE_TINT : "#FFFFFF",
                  fontFamily: "Inter, sans-serif",
                  fontSize: 14,
                  fontWeight: 700,
                  color: isSelected ? "#1D4ED8" : "#6B7280",
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
            Not at all like me
          </span>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "#9CA3AF" }}>
            Very much like me
          </span>
        </div>

        {/* Selected label */}
        {selected > 0 && (
          <p
            className="text-center mb-4"
            style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: BLUE_ACCENT }}
          >
            {SCALE_LABELS_5[selected - 1]}
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
    band.label === "Minimal" ? "positive" :
    band.label === "Moderate" ? "mild" :
    band.label === "Elevated" ? "moderate" : "high";

  return (
    <div className="min-h-screen flex flex-col px-5 pt-14 pb-10" style={{ background: DONE_BG }}>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <button onClick={onDone} className="w-11 h-11 rounded-2xl flex items-center justify-center"
          style={{ background: "rgba(255,255,255,0.88)", border: "1.5px solid rgba(139,92,246,0.15)" }} aria-label="Close">
          <ArrowLeft className="w-5 h-5" style={{ color: "#15113C", strokeWidth: 1.75 }} />
        </button>
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: "#9CA3AF" }}>
          Worry &amp; Anxiety Check-in Complete
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
        assessmentId="anxiety-assess"
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
