import { useState } from "react";
import { Shield, ArrowLeft, Check } from "lucide-react";

interface TraumaAssessmentScreenProps {
  onDone: () => void;
}

type View = "intro" | "question" | "result";

interface ClusterDef {
  name: string;
  items: { text: string }[];
}

const CLUSTERS: ClusterDef[] = [
  {
    name: "Anxiety",
    items: [
      { text: "How often are you bothered by feeling anxious, nervous or on edge?" },
      { text: "How often are you bothered by not being able to stop or control worrying?" },
      { text: "How often are you bothered by worrying too much about different things?" },
      { text: "How often do you have trouble relaxing?" },
      { text: "How often are you feeling restless?" },
      { text: "How often do you feel easily annoyed or irritable?" },
      { text: "How often do you feel afraid of something awful happening?" },
    ],
  },
  {
    name: "Re-Experiencing",
    items: [
      { text: "How often are you bothered by repeated, disturbing and unwanted memories of stressful experiences?" },
      { text: "How often are you bothered by repeated disturbing dreams of stressful experiences?" },
      { text: "How often do you suddenly feel as if a past stressful experience is happening all over again?" },
      { text: "How often do you feel upset when something reminded you of a past stressful experience?" },
      { text: "How often do you feel a strong physical reaction when something reminded you of a past stressful experience? (sweating, heart rate, breathing)" },
    ],
  },
  {
    name: "Avoidance",
    items: [
      { text: "How often do you try to avoid memories, thoughts or feelings related to the past stressful experiences?" },
      { text: "How often do you avoid external reminders of stressful experiences? (people, places, activities, objects, situations)" },
    ],
  },
  {
    name: "Negative Cognitions",
    items: [
      { text: "How often do you have trouble remembering important parts of the stressful experience?" },
      { text: "How often do you feel strong negative beliefs about yourself, other people or the world? (e.g. what's wrong with me, no one can be trusted, world is dangerous)" },
      { text: "How often do you blame yourself or another for the stressful experience or what happened after it?" },
      { text: "How often do you feel strong negative feelings such as terror, rage, guilt, shame, depression, helpless, or hopeless?" },
    ],
  },
  {
    name: "Emotional Numbing",
    items: [
      { text: "How often do you feel a loss of interest in activities you used to enjoy?" },
      { text: "How often do you feel distant or cut off from other people?" },
      { text: "How often do you feel trouble expressing positive and negative feelings to people close to you?" },
    ],
  },
  {
    name: "Hyperarousal",
    items: [
      { text: "How often do you feel irritable at others or yourself, or have outbursts of anger that turn to rage?" },
      { text: "How often do you feel you take too many risks or do things that could cause you harm?" },
      { text: "How often do you feel super alert or on guard all the time?" },
      { text: "How often do you feel jumpy or easily startled?" },
      { text: "How often do you feel difficulty concentrating?" },
      { text: "How often do you feel trouble falling asleep or staying asleep?" },
    ],
  },
];

interface FlatQuestion {
  text: string;
  clusterIndex: number;
  globalIndex: number;
}

const FLAT_QUESTIONS: FlatQuestion[] = CLUSTERS.flatMap((cluster, ci) =>
  cluster.items.map((item) => ({
    text: item.text,
    clusterIndex: ci,
    globalIndex: 0,
  }))
).map((q, i) => ({ ...q, globalIndex: i }));

const TOTAL = FLAT_QUESTIONS.length;

const OPTION_LABELS = ["Never", "Rarely", "Sometimes", "Often", "Always"];
const OPTION_SUBS = [
  "Not in the past month",
  "Once or twice",
  "A few times a month",
  "At least weekly",
  "Almost daily",
];

interface Band {
  label: string;
  insight: string;
  color: string;
  bg: string;
  action: string;
}

function getBand(score: number): Band {
  if (score <= 26)
    return {
      label: "Minimal",
      insight: "Few trauma-related symptoms are present at this time.",
      color: "#059669",
      bg: "#D1FAE5",
      action: "Continue grounding practices and nurture your support network.",
    };
  if (score <= 54)
    return {
      label: "Mild",
      insight: "Some stress responses are present. Grounding and self-care practices may help.",
      color: "#D97706",
      bg: "#FEF3C7",
      action: "Explore somatic grounding tools and gentle movement as part of your daily routine.",
    };
  if (score <= 81)
    return {
      label: "Moderate",
      insight: "Noticeable trauma-related patterns are present. Consider speaking with a professional.",
      color: "#EA580C",
      bg: "#FEE2E2",
      action: "Reaching out to a trauma-informed therapist can make a meaningful difference.",
    };
  return {
    label: "Significant",
    insight: "Strong trauma indicators are present. Please reach out to a qualified professional.",
    color: "#DC2626",
    bg: "#FEE2E2",
    action: "Please prioritize professional support. Effective treatments for trauma are available.",
  };
}

function clusterScore(answers: number[], clusterIndex: number): number {
  return FLAT_QUESTIONS.filter((q) => q.clusterIndex === clusterIndex).reduce(
    (sum, q) => sum + (answers[q.globalIndex] >= 0 ? answers[q.globalIndex] : 2),
    0
  );
}

function clusterMax(clusterIndex: number): number {
  return CLUSTERS[clusterIndex].items.length * 4;
}

function computeTotal(answers: number[]): number {
  return answers.reduce((sum, a) => sum + (a >= 0 ? a : 2), 0);
}

const PAGE_BG = "linear-gradient(180deg, #EDE9FE 0%, #F5F3FF 100%)";
const DONE_BG = "linear-gradient(135deg, #EDE9FE 0%, #C4B5FD 100%)";
const PURPLE = "#8B5CF6";
const ICON_COLOR = "#15113C";
const TEAL_LIGHT = "#CFFAFE";
const TEAL_TINT = "#ECFEFF";
const TEAL_ACCENT = "#0891B2";

const CLUSTER_COLORS = [
  { bg: "#CFFAFE", text: "#0E7490" },
  { bg: "#EDE9FE", text: "#7C3AED" },
  { bg: "#D1FAE5", text: "#065F46" },
  { bg: "#FEE2E2", text: "#991B1B" },
  { bg: "#FEF3C7", text: "#92400E" },
  { bg: "#DBEAFE", text: "#1D4ED8" },
];

export function TraumaAssessmentScreen({ onDone }: TraumaAssessmentScreenProps) {
  const [view, setView] = useState<View>("intro");
  const [answers, setAnswers] = useState<number[]>(new Array(TOTAL).fill(-1));
  const [currentQ, setCurrentQ] = useState(0);

  /* ── INTRO ── */
  if (view === "intro") {
    return (
      <div className="min-h-screen flex flex-col px-6 pt-14 pb-10" style={{ background: PAGE_BG }}>
        {/* Back */}
        <button
          className="self-start w-10 h-10 rounded-full flex items-center justify-center mb-6 active:scale-95 transition-transform"
          style={{ background: "rgba(255,255,255,0.7)", border: "1.5px solid rgba(0,0,0,0.07)" }}
          onClick={onDone}
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5" style={{ color: ICON_COLOR, strokeWidth: 1.75 }} />
        </button>

        {/* Safety notice */}
        <div
          className="w-full rounded-2xl px-4 py-3 mb-6"
          style={{ background: "#FEF3C7", border: "1px solid #FDE68A" }}
        >
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 12,
              color: "#92400E",
              lineHeight: 1.55,
            }}
          >
            <span style={{ fontWeight: 700 }}>Gentle reminder: </span>
            Some questions relate to difficult experiences. You may skip any question and exit at any time.
          </p>
        </div>

        {/* Icon holder */}
        <div className="flex justify-center mb-6">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{ background: TEAL_LIGHT }}
          >
            <Shield className="w-7 h-7" style={{ color: ICON_COLOR, strokeWidth: 1.75 }} />
          </div>
        </div>

        {/* Heading */}
        <h1
          className="text-center mb-1"
          style={{ fontFamily: "Lora, serif", fontSize: 26, fontWeight: 600, color: "#15113C" }}
        >
          Trauma Symptoms Check-in
        </h1>
        <p
          className="text-center mb-6"
          style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#6B7280" }}
        >
          TSQ &middot; {TOTAL} questions &middot; 8 min
        </p>

        {/* Body */}
        <p
          className="text-center mb-8 leading-relaxed max-w-xs mx-auto"
          style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#4B5563" }}
        >
          This screen measures symptoms across six clusters: anxiety, re-experiencing, avoidance,
          negative cognitions, emotional numbing, and hyperarousal.
        </p>

        {/* Cluster chips */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {CLUSTERS.map((c, i) => (
            <span
              key={c.name}
              className="px-3 py-1 rounded-full"
              style={{
                background: CLUSTER_COLORS[i].bg,
                fontFamily: "Inter, sans-serif",
                fontSize: 11,
                fontWeight: 600,
                color: CLUSTER_COLORS[i].text,
              }}
            >
              {c.name}
            </span>
          ))}
        </div>

        <button
          className="cb-btn-primary active:scale-95 transition-transform w-full"
          style={{ background: PURPLE, borderColor: PURPLE }}
          onClick={() => {
            setAnswers(new Array(TOTAL).fill(-1));
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
    const cluster = CLUSTERS[fq.clusterIndex];
    const clusterStyle = CLUSTER_COLORS[fq.clusterIndex];
    const selected = answers[currentQ];
    const isLast = currentQ === TOTAL - 1;
    const progress = (currentQ / TOTAL) * 100;

    const handleSelect = (val: number) => {
      const next = [...answers];
      next[currentQ] = val;
      setAnswers(next);
    };

    const handleNext = () => {
      if (selected < 0) return;
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

        {/* Cluster chip */}
        <div className="flex justify-center mb-6">
          <span
            className="px-3 py-1 rounded-full"
            style={{
              background: clusterStyle.bg,
              fontFamily: "Inter, sans-serif",
              fontSize: 11,
              fontWeight: 600,
              color: clusterStyle.text,
              letterSpacing: "0.04em",
            }}
          >
            {cluster.name}
          </span>
        </div>

        {/* Question card */}
        <div className="rounded-3xl px-6 py-8 mb-5" style={{ background: "rgba(255,255,255,0.85)" }}>
          <p
            style={{
              fontFamily: "Lora, serif",
              fontSize: 17,
              fontStyle: "italic",
              color: "#15113C",
              lineHeight: 1.65,
            }}
          >
            {fq.text}
          </p>
        </div>

        {/* 0-4 option buttons (vertical) */}
        <div className="flex flex-col gap-2 mb-5">
          {OPTION_LABELS.map((label, val) => {
            const isSelected = selected === val;
            return (
              <button
                key={val}
                onClick={() => handleSelect(val)}
                className="active:scale-95 transition-transform w-full text-left px-4"
                style={{
                  height: 48,
                  borderRadius: 12,
                  border: `2px solid ${isSelected ? TEAL_ACCENT : "#E5E7EB"}`,
                  background: isSelected ? TEAL_TINT : "#FFFFFF",
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
                    color: isSelected ? TEAL_ACCENT : "#9CA3AF",
                    minWidth: 16,
                  }}
                >
                  {val}
                </span>
                <div>
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: 13,
                      fontWeight: 600,
                      color: isSelected ? "#0E7490" : "#374151",
                    }}
                  >
                    {label}
                  </span>
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: 11,
                      color: "#9CA3AF",
                      marginLeft: 6,
                    }}
                  >
                    — {OPTION_SUBS[val]}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Next button */}
        <button
          className="cb-btn-primary active:scale-95 transition-transform w-full mb-3"
          style={{
            background: selected >= 0 ? PURPLE : "#E5E7EB",
            borderColor: selected >= 0 ? PURPLE : "#E5E7EB",
            color: selected >= 0 ? "#ffffff" : "#9CA3AF",
            cursor: selected >= 0 ? "pointer" : "default",
          }}
          disabled={selected < 0}
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

  return (
    <div
      className="min-h-screen flex flex-col items-center px-6 pt-14 pb-10"
      style={{ background: DONE_BG }}
    >
      {/* Score ring */}
      <div
        className="flex items-center justify-center mb-6"
        style={{
          width: 120,
          height: 120,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #A78BFA 0%, #7C3AED 100%)",
          boxShadow: "0 8px 32px rgba(139,92,246,0.35)",
        }}
      >
        <span style={{ fontFamily: "Lora, serif", fontSize: 40, fontWeight: 700, color: "#ffffff" }}>
          {total}
        </span>
      </div>

      {/* Band chip */}
      <div className="px-4 py-1 rounded-full mb-4" style={{ background: band.bg }}>
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 13,
            fontWeight: 700,
            color: band.color,
            letterSpacing: "0.04em",
          }}
        >
          {band.label}
        </span>
      </div>

      <h2
        className="mb-3 text-center"
        style={{ fontFamily: "Lora, serif", fontSize: 22, fontWeight: 600, color: "#15113C" }}
      >
        {band.label}
      </h2>

      <p
        className="text-center mb-6 max-w-xs leading-relaxed"
        style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#4B5563" }}
      >
        {band.insight}
      </p>

      {/* Cluster breakdown bars */}
      <div className="w-full max-w-sm rounded-2xl px-5 py-4 mb-6" style={{ background: "rgba(255,255,255,0.75)" }}>
        <p
          className="mb-3"
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 11,
            fontWeight: 700,
            color: "#9CA3AF",
            textTransform: "uppercase",
            letterSpacing: "0.07em",
          }}
        >
          By Cluster
        </p>
        {CLUSTERS.map((c, i) => {
          const cs = clusterScore(answers, i);
          const cm = clusterMax(i);
          const pct = cm > 0 ? (cs / cm) * 100 : 0;
          const style = CLUSTER_COLORS[i];
          return (
            <div key={c.name} className="mb-3">
              <div className="flex justify-between mb-1">
                <span
                  style={{ fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 600, color: "#374151" }}
                >
                  {c.name}
                </span>
                <span
                  style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#9CA3AF" }}
                >
                  {cs}/{cm}
                </span>
              </div>
              <div className="w-full rounded-full overflow-hidden" style={{ height: 6, background: "#F3F4F6" }}>
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${pct}%`, background: style.text }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Suggested action */}
      <div
        className="w-full max-w-sm rounded-2xl px-5 py-4 mb-8"
        style={{ background: "rgba(255,255,255,0.7)" }}
      >
        <div className="flex items-start gap-3">
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ background: TEAL_LIGHT }}
          >
            <Check className="w-5 h-5" style={{ color: ICON_COLOR, strokeWidth: 1.75 }} />
          </div>
          <div>
            <p
              className="mb-1"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 12,
                fontWeight: 700,
                color: "#6B7280",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              Suggested Next Step
            </p>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#15113C", lineHeight: 1.5 }}>
              {band.action}
            </p>
          </div>
        </div>
      </div>

      <button
        className="cb-btn-primary active:scale-95 transition-transform w-full max-w-sm"
        style={{ background: PURPLE, borderColor: PURPLE }}
        onClick={onDone}
      >
        Done
      </button>
    </div>
  );
}
