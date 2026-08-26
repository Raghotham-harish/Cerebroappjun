import { useState } from "react";
import { Brain, ArrowLeft, Check } from "lucide-react";
import { AssessmentActionItems, AssessmentSeverity } from "../AssessmentActionItems";

interface GAD7ScreenProps {
  onDone: () => void;
  onStartTool?: (toolId: string) => void;
  onOpenChatWithPrompt?: (prompt: string) => void;
}

type View = "intro" | "question" | "result";

const QUESTIONS = [
  "Feeling nervous, anxious, or on edge",
  "Not being able to stop or control worrying",
  "Worrying too much about different things",
  "Trouble relaxing",
  "Being so restless that it is hard to sit still",
  "Becoming easily annoyed or irritable",
  "Feeling afraid, as if something awful might happen",
];

const OPTIONS = [
  { label: "Not at all", sub: "0 days", value: 0 },
  { label: "Several days", sub: "1–6 days", value: 1 },
  { label: "More than half the days", sub: "7–11 days", value: 2 },
  { label: "Nearly every day", sub: "12–14 days", value: 3 },
];

type Band = { label: string; color: string; bg: string; insight: string; action: string };

function getBand(score: number): Band {
  if (score <= 4) return {
    label: "Minimal Anxiety",
    color: "#059669", bg: "#D1FAE5",
    insight: "Anxiety is minimal in your daily life right now. You are managing worry without it becoming overwhelming.",
    action: "Keep up your current wellbeing practices — rest, movement, and connection are your best allies.",
  };
  if (score <= 9) return {
    label: "Mild Anxiety",
    color: "#D97706", bg: "#FEF3C7",
    insight: "Some anxiety is present and may be affecting certain areas. This is manageable with the right tools.",
    action: "Try a structured worry window — 10–15 minutes a day to examine and release concerns.",
  };
  if (score <= 14) return {
    label: "Moderate Anxiety",
    color: "#EA580C", bg: "#FEE2E2",
    insight: "Anxiety is notably affecting your daily experience. It may be interfering with work, rest, or relationships.",
    action: "Breathing practices and grounding techniques can help. Consider speaking with a healthcare professional.",
  };
  return {
    label: "Severe Anxiety",
    color: "#DC2626", bg: "#FEE2E2",
    insight: "Anxiety is strongly present and likely interfering with multiple areas of your life. This deserves dedicated attention.",
    action: "Please reach out to a licensed mental health professional. Effective treatments are available and do work.",
  };
}

const PAGE_BG = "linear-gradient(180deg, #EDE9FE 0%, #F5F3FF 100%)";
const DONE_BG = "linear-gradient(135deg, #EDE9FE 0%, #C4B5FD 100%)";
const PURPLE = "#8B5CF6";
const ICON_COLOR = "#15113C";
const BLUE_LIGHT = "#DBEAFE";
const BLUE_ACCENT = "#3B82F6";
const BLUE_TINT = "#EFF6FF";

export function GAD7Screen({ onDone, onStartTool, onOpenChatWithPrompt }: GAD7ScreenProps) {
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
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: BLUE_LIGHT }}>
            <Brain className="w-7 h-7" style={{ color: ICON_COLOR, strokeWidth: 1.75 }} />
          </div>
        </div>

        <h1 className="text-center mb-1" style={{ fontFamily: "Lora, serif", fontSize: 26, fontWeight: 600, color: "#15113C" }}>
          Anxiety Check-in
        </h1>
        <p className="text-center mb-6" style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#6B7280" }}>
          GAD-7 &middot; 7 questions &middot; 2 min
        </p>

        <p className="text-center mb-8 leading-relaxed max-w-xs mx-auto" style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#4B5563" }}>
          Over the last two weeks, how often have you been bothered by the following problems?
        </p>

        {/* Scale preview */}
        <div className="flex flex-col gap-2 mb-10 max-w-xs mx-auto w-full">
          {OPTIONS.map((opt) => (
            <div
              key={opt.value}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl"
              style={{ background: "rgba(255,255,255,0.7)" }}
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: BLUE_LIGHT, fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 700, color: ICON_COLOR }}
              >
                {opt.value}
              </div>
              <div>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: "#15113C" }}>{opt.label}</span>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "#9CA3AF", marginLeft: 6 }}>— {opt.sub}</span>
              </div>
            </div>
          ))}
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
          <span className="px-3 py-1 rounded-full" style={{ background: BLUE_LIGHT, fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 700, color: "#1D4ED8", letterSpacing: "0.05em" }}>
            GAD-7
          </span>
        </div>

        <p className="text-center mb-1" style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#9CA3AF" }}>
          Over the last two weeks, how often have you been bothered by:
        </p>

        <div className="rounded-3xl px-6 py-8 mb-6" style={{ background: "rgba(255,255,255,0.85)" }}>
          <p style={{ fontFamily: "Lora, serif", fontSize: 18, fontStyle: "italic", color: "#15113C", lineHeight: 1.6 }}>
            {QUESTIONS[currentQ]}
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
                  border: `2px solid ${isSel ? BLUE_ACCENT : "#E5E7EB"}`,
                  background: isSel ? BLUE_TINT : "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  cursor: "pointer",
                }}
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: isSel ? BLUE_ACCENT : "#F3F4F6", fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 700, color: isSel ? "white" : "#6B7280" }}
                >
                  {opt.value}
                </div>
                <div>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: isSel ? "#1D4ED8" : "#374151" }}>{opt.label}</span>
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

  const score = answers.reduce((sum, a) => sum + (a >= 0 ? a : 0), 0);
  const band = getBand(score);
  const severity: AssessmentSeverity =
    score <= 4 ? "positive" :
    score <= 9 ? "mild" :
    score <= 14 ? "moderate" : "high";

  return (
    <div className="min-h-screen flex flex-col px-5 pt-14 pb-10" style={{ background: DONE_BG }}>
      {/* Back button */}
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={onDone}
          className="w-11 h-11 rounded-2xl flex items-center justify-center"
          style={{ background: "rgba(255,255,255,0.88)", border: "1.5px solid rgba(139,92,246,0.15)" }}
          aria-label="Close"
        >
          <ArrowLeft className="w-5 h-5" style={{ color: "#15113C", strokeWidth: 1.75 }} />
        </button>
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: "#9CA3AF" }}>
          GAD-7 Complete
        </span>
        <div style={{ width: 44 }} />
      </div>

      {/* Completion icon */}
      <div className="flex flex-col items-center mb-8">
        <div
          style={{ width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg, #A78BFA 0%, #8B5CF6 100%)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 24px rgba(139,92,246,0.3)", marginBottom: 16 }}
        >
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
        assessmentId="gad7"
        severity={severity}
        severityLabel={band.label}
        severityColor={band.color}
        severityBg={band.bg}
        onStartTool={(id) => { onDone(); setTimeout(() => onStartTool?.(id), 100); }}
        onOpenChat={(prompt) => onOpenChatWithPrompt?.(prompt)}
      />

      {/* Done button */}
      <button
        onClick={onDone}
        className="mt-6 w-full py-4 rounded-full"
        style={{ background: "#8B5CF6", color: "white", fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 15, border: "none", cursor: "pointer" }}
      >
        Done
      </button>
    </div>
  );
}
