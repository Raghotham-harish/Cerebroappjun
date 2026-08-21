import { useState } from "react";
import { Shield, ArrowLeft, Check, AlertTriangle } from "lucide-react";

interface ACEScreenProps {
  onDone: () => void;
}

type View = "intro" | "question" | "result";

const QUESTIONS = [
  {
    category: "Emotional Abuse",
    text: "Did a parent or other adult in the household often or very often swear at you, insult you, put you down, or humiliate you? Or act in a way that made you afraid that you might be physically hurt?",
  },
  {
    category: "Physical Abuse",
    text: "Did a parent or other adult in the household often or very often push, grab, slap, or throw something at you? Or ever hit you so hard that you had marks or were injured?",
  },
  {
    category: "Sexual Abuse",
    text: "Did an adult or person at least 5 years older than you ever touch or fondle you in a sexual way, or have you touch their body in a sexual way? Or attempt or actually have oral, anal, or vaginal intercourse with you?",
  },
  {
    category: "Emotional Neglect",
    text: "Did you often or very often feel that no one in your family loved you or thought you were important or special? Or that your family didn't look out for each other, feel close to each other, or support each other?",
  },
  {
    category: "Physical Neglect",
    text: "Did you often or very often feel that you didn't have enough to eat, had to wear dirty clothes, or had no one to protect you? Or that your parents were too drunk or high to take care of you or take you to the doctor if needed?",
  },
  {
    category: "Parental Separation",
    text: "Were your parents ever separated or divorced?",
  },
  {
    category: "Domestic Violence",
    text: "Was your mother, father, or stepparent often or very often pushed, grabbed, slapped, kicked, bitten, or hit? Or ever repeatedly hit or threatened with a gun or knife?",
  },
  {
    category: "Substance Abuse in Household",
    text: "Did you live with anyone who was a problem drinker or alcoholic, or who used street drugs?",
  },
  {
    category: "Mental Illness in Household",
    text: "Was a household member depressed or mentally ill, or did a household member attempt suicide?",
  },
  {
    category: "Incarceration",
    text: "Did a household member go to prison?",
  },
];

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  "Emotional Abuse":          { bg: "#FFE4E6", text: "#9F1239" },
  "Physical Abuse":           { bg: "#FEE2E2", text: "#991B1B" },
  "Sexual Abuse":             { bg: "#FFE4E6", text: "#881337" },
  "Emotional Neglect":        { bg: "#FEF3C7", text: "#92400E" },
  "Physical Neglect":         { bg: "#FFEDD5", text: "#C2410C" },
  "Parental Separation":      { bg: "#DBEAFE", text: "#1D4ED8" },
  "Domestic Violence":        { bg: "#FEE2E2", text: "#7F1D1D" },
  "Substance Abuse in Household": { bg: "#CFFAFE", text: "#0E7490" },
  "Mental Illness in Household":  { bg: "#EDE9FE", text: "#7C3AED" },
  "Incarceration":            { bg: "#E5E7EB", text: "#374151" },
};

function getBand(score: number) {
  if (score === 0) return {
    label: "None Reported",
    color: "#059669",
    bg: "#D1FAE5",
    insight: "No adverse childhood experiences were reported across the 10 categories in this questionnaire.",
    action: "Your foundation of safety in childhood is a meaningful protective factor. Continue building on your wellbeing.",
  };
  if (score <= 3) return {
    label: "Low Range",
    color: "#D97706",
    bg: "#FEF3C7",
    insight: "A small number of adverse experiences were reported. Research shows that even a few ACEs can have long-term effects that are worth attending to.",
    action: "Explore grounding and self-compassion practices. These experiences deserve acknowledgment, even if they feel manageable.",
  };
  if (score <= 6) return {
    label: "Moderate Range",
    color: "#EA580C",
    bg: "#FEE2E2",
    insight: "Multiple adverse childhood experiences were reported. Research links moderate ACE scores with increased risk of certain physical and mental health challenges.",
    action: "Speaking with a trauma-informed therapist can be deeply helpful in understanding how early experiences shape present patterns.",
  };
  return {
    label: "High Range",
    color: "#DC2626",
    bg: "#FEE2E2",
    insight: "A high number of adverse childhood experiences were reported. This score is associated with significant impacts on health and wellbeing. You are not defined by these experiences.",
    action: "Please reach out to a trauma-informed professional. Healing is possible — many people with high ACE scores live full, healthy lives with the right support.",
  };
}

const PAGE_BG = "linear-gradient(180deg, #EDE9FE 0%, #F5F3FF 100%)";
const DONE_BG = "linear-gradient(135deg, #EDE9FE 0%, #C4B5FD 100%)";
const PURPLE = "#8B5CF6";
const ICON_COLOR = "#15113C";
const TEAL_LIGHT = "#CFFAFE";

export function ACEScreen({ onDone }: ACEScreenProps) {
  const [view, setView] = useState<View>("intro");
  const [answers, setAnswers] = useState<(boolean | null)[]>(new Array(QUESTIONS.length).fill(null));
  const [currentQ, setCurrentQ] = useState(0);

  if (view === "intro") {
    return (
      <div className="min-h-screen flex flex-col px-6 pt-14 pb-10" style={{ background: PAGE_BG }}>
        <button
          className="self-start w-11 h-11 rounded-full flex items-center justify-center mb-6 active:scale-95 transition-transform"
          style={{ background: "rgba(255,255,255,0.7)", border: "1.5px solid rgba(0,0,0,0.07)" }}
          onClick={onDone}
        >
          <ArrowLeft className="w-5 h-5" style={{ color: ICON_COLOR, strokeWidth: 1.75 }} />
        </button>

        {/* Safety notice */}
        <div className="w-full rounded-2xl px-4 py-3 mb-6 flex gap-3 items-start" style={{ background: "#FEF3C7", border: "1px solid #FDE68A" }}>
          <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#D97706", strokeWidth: 1.75 }} />
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#92400E", lineHeight: 1.55 }}>
            <span style={{ fontWeight: 700 }}>A gentle note:</span> These questions ask about difficult past experiences. You may skip any question. Your answers are private and not shared with anyone.
          </p>
        </div>

        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: TEAL_LIGHT }}>
            <Shield className="w-7 h-7" style={{ color: ICON_COLOR, strokeWidth: 1.75 }} />
          </div>
        </div>

        <h1 className="text-center mb-1" style={{ fontFamily: "Lora, serif", fontSize: 26, fontWeight: 600, color: "#15113C" }}>
          Childhood Experiences
        </h1>
        <p className="text-center mb-6" style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#6B7280" }}>
          ACE &middot; 10 questions &middot; 3 min
        </p>

        <p className="text-center mb-10 leading-relaxed max-w-xs mx-auto" style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#4B5563" }}>
          The Adverse Childhood Experiences questionnaire explores experiences during your first 18 years that may be shaping your current health and wellbeing.
        </p>

        <div className="rounded-2xl px-5 py-4 mb-10" style={{ background: "rgba(255,255,255,0.7)" }}>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#374151", lineHeight: 1.6 }}>
            Each question asks about experiences that sometimes happen to children. Answer <span style={{ fontWeight: 700 }}>Yes</span> or <span style={{ fontWeight: 700 }}>No</span> based on your childhood years. Each "Yes" adds one point to your ACE score.
          </p>
        </div>

        <button
          className="cb-btn-primary active:scale-95 transition-transform w-full"
          style={{ background: PURPLE, borderColor: PURPLE }}
          onClick={() => { setAnswers(new Array(QUESTIONS.length).fill(null)); setCurrentQ(0); setView("question"); }}
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
    const catStyle = CATEGORY_COLORS[q.category] || { bg: "#E5E7EB", text: "#374151" };

    const handleAnswer = (val: boolean) => {
      const next = [...answers]; next[currentQ] = val; setAnswers(next);
    };
    const handleNext = () => {
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
          <span className="px-3 py-1 rounded-full" style={{ background: catStyle.bg, fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 600, color: catStyle.text, letterSpacing: "0.04em" }}>
            {q.category}
          </span>
        </div>

        <div className="rounded-3xl px-6 py-8 mb-8" style={{ background: "rgba(255,255,255,0.85)" }}>
          <p style={{ fontFamily: "Lora, serif", fontSize: 16, fontStyle: "italic", color: "#15113C", lineHeight: 1.7 }}>
            {q.text}
          </p>
        </div>

        {/* Yes / No buttons */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => handleAnswer(true)}
            className="active:scale-95 transition-transform flex-1 py-5 rounded-2xl"
            style={{
              background: selected === true ? "#FEE2E2" : "rgba(255,255,255,0.85)",
              border: `2px solid ${selected === true ? "#DC2626" : "#E5E7EB"}`,
              fontFamily: "Inter, sans-serif",
              fontSize: 18,
              fontWeight: 700,
              color: selected === true ? "#DC2626" : "#374151",
              cursor: "pointer",
            }}
          >
            Yes
          </button>
          <button
            onClick={() => handleAnswer(false)}
            className="active:scale-95 transition-transform flex-1 py-5 rounded-2xl"
            style={{
              background: selected === false ? "#D1FAE5" : "rgba(255,255,255,0.85)",
              border: `2px solid ${selected === false ? "#059669" : "#E5E7EB"}`,
              fontFamily: "Inter, sans-serif",
              fontSize: 18,
              fontWeight: 700,
              color: selected === false ? "#059669" : "#374151",
              cursor: "pointer",
            }}
          >
            No
          </button>
        </div>

        <button
          onClick={handleNext}
          disabled={selected === null}
          className="active:scale-95 transition-transform w-full"
          style={{
            background: selected !== null ? PURPLE : "#E5E7EB",
            color: selected !== null ? "white" : "#9CA3AF",
            border: "none",
            borderRadius: 9999,
            padding: "16px",
            fontFamily: "Inter, sans-serif",
            fontSize: 16,
            fontWeight: 700,
            cursor: selected !== null ? "pointer" : "default",
            marginBottom: 8,
          }}
        >
          {isLast ? "Complete" : "Next"}
        </button>
        <button onClick={handleSkip} style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#9CA3AF", background: "none", border: "none", cursor: "pointer", padding: "8px", textAlign: "center", width: "100%" }}>
          Skip this question
        </button>
      </div>
    );
  }

  const score = answers.filter((a) => a === true).length;
  const band = getBand(score);

  return (
    <div className="min-h-screen flex flex-col items-center px-6 pt-14 pb-10" style={{ background: DONE_BG }}>
      <div
        className="flex items-center justify-center mb-6"
        style={{ width: 120, height: 120, borderRadius: "50%", background: "linear-gradient(135deg, #A78BFA 0%, #7C3AED 100%)", boxShadow: "0 8px 32px rgba(139,92,246,0.35)" }}
      >
        <div className="text-center">
          <span style={{ fontFamily: "Lora, serif", fontSize: 44, fontWeight: 700, color: "#ffffff", display: "block", lineHeight: 1 }}>{score}</span>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "rgba(255,255,255,0.75)", display: "block" }}>ACE Score</span>
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

      {/* Reminder card */}
      <div className="w-full max-w-sm rounded-2xl px-5 py-4 mb-5" style={{ background: "rgba(255,255,255,0.7)", border: "1.5px solid rgba(139,92,246,0.15)" }}>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#4B5563", lineHeight: 1.6 }}>
          <span style={{ fontWeight: 700, color: "#15113C" }}>Important:</span> This score is a starting point for reflection, not a diagnosis. ACE scores do not determine your future. Many people heal from adverse childhood experiences with support.
        </p>
      </div>

      <div className="w-full max-w-sm rounded-2xl px-5 py-4 mb-8" style={{ background: "rgba(255,255,255,0.7)" }}>
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: TEAL_LIGHT }}>
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
