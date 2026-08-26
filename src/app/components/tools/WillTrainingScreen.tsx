// @cerebro-design-system: unified purple theme
import { useState } from "react";
import { ArrowLeft, Check, Mic, MicOff, ChevronRight, GripVertical, ChevronUp, ChevronDown, User } from "lucide-react";
import { OracleProfileScreen } from "./OracleProfileScreen";

function speakText(text: string) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  utt.rate = 0.9; utt.pitch = 1;
  const preferred = window.speechSynthesis.getVoices().find(v => v.name.includes("Samantha") || v.name.includes("Karen") || v.name.includes("Google US English Female"));
  if (preferred) utt.voice = preferred;
  window.speechSynthesis.speak(utt);
}

const PURPLE = "#8B5CF6";
const PAGE_BG = "linear-gradient(180deg, #EDE9FE 0%, #F5F3FF 100%)";

interface WillTrainingScreenProps {
  onDone: () => void;
}

const exercises = [
  {
    id: "purposeful-pause",
    name: "Purposeful Pause",
    duration: "2 min",
    description: "Before any action in the next hour, pause for 3 seconds and choose consciously rather than react automatically.",
    steps: [
      "Set an intention: \"For the next hour, I will pause before every action.\"",
      "Each time you're about to do something — speak, check your phone, eat — stop for 3 seconds.",
      "Silently ask: \"Is this what I choose to do, or am I just reacting?\"",
      "Then proceed with full awareness of your choice.",
      "Notice how deliberate choice feels different from automatic reaction.",
    ],
  },
  {
    id: "small-hard-thing",
    name: "The Small Hard Thing",
    duration: "5 min",
    description: "Choose one small, slightly uncomfortable task and complete it entirely, using your will as the driving force.",
    steps: [
      "Identify one small task you've been avoiding. Write it below.",
      "Set a timer for 5 minutes.",
      "Begin with these words: \"I choose to do this now.\"",
      "Complete the task without distraction.",
      "When done, place your hand on your chest and say: \"I did what I said I would do.\"",
    ],
  },
  {
    id: "inner-image",
    name: "The Inner Image",
    duration: "3 min",
    description: "Visualize yourself as a person of strong, loving will — and act from that image.",
    steps: [
      "Sit quietly. Close your eyes and breathe slowly.",
      "Imagine a version of yourself who acts from clarity and intention, not fear or habit.",
      "See how they stand, speak, and move through the day.",
      "Now open your eyes and carry that image into your next hour.",
      "When you face a choice today, ask: \"What would my wisest self choose?\"",
    ],
  },
  {
    id: "body-will",
    name: "Body Will",
    duration: "4 min",
    description: "Use your body as the instrument of will by maintaining a posture of dignity for 4 minutes.",
    steps: [
      "Sit or stand with your spine upright, shoulders soft, head tall.",
      "Take three slow breaths.",
      "Hold this posture for 4 full minutes without collapse.",
      "If you notice yourself slouching, gently return. No judgment.",
      "Notice: the body and will strengthen each other.",
    ],
  },
];

interface Quality {
  id: string;
  name: string;
  persona: string;
  tagline: string;
  color: string;
  dot: string;
}

const DEFAULT_QUALITIES: Quality[] = [
  { id: "dynamic-power",   name: "Dynamic Power",   persona: "The Catalyst",    tagline: "Drive to impact & change",   color: "#7C3AED", dot: "#A78BFA" },
  { id: "control",         name: "Control",          persona: "The Sentinel",    tagline: "Steering & boundaries",      color: "#1D4ED8", dot: "#60A5FA" },
  { id: "one-pointedness", name: "One-Pointedness",  persona: "The Deep Diver",  tagline: "Total absorption & flow",    color: "#059669", dot: "#34D399" },
  { id: "decisiveness",    name: "Decisiveness",     persona: "The Strategist",  tagline: "Choice engine",              color: "#B45309", dot: "#FBBF24" },
  { id: "endurance",       name: "Endurance",        persona: "The Shield",      tagline: "Capacity to bear strain",    color: "#C2410C", dot: "#F97316" },
  { id: "courage",         name: "Courage",          persona: "The Guardian",    tagline: "Fear-management stance",     color: "#BE185D", dot: "#F472B6" },
  { id: "integration",     name: "Integration",      persona: "The Harmonizer",  tagline: "Harmonizing bridge",         color: "#0F766E", dot: "#2DD4BF" },
];

function moveItem<T>(arr: T[], from: number, to: number): T[] {
  const copy = [...arr];
  const [item] = copy.splice(from, 1);
  copy.splice(to, 0, item);
  return copy;
}

/* ── Quality ranking UI ─────────────────────────────────────────────── */
function QualityRankingScreen({
  onConfirm,
  onSkip,
}: {
  onConfirm: (rankings: string[]) => void;
  onSkip: () => void;
}) {
  const [qualities, setQualities] = useState<Quality[]>(DEFAULT_QUALITIES);

  const move = (idx: number, dir: -1 | 1) => {
    const next = idx + dir;
    if (next < 0 || next >= qualities.length) return;
    setQualities(moveItem(qualities, idx, next));
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: PAGE_BG, fontFamily: "Inter, sans-serif" }}>
      <div style={{ height: 44 }} />

      <div className="px-4 pb-4">
        <h1 style={{ fontFamily: "Lora, serif", fontSize: 22, fontWeight: 500, color: "#15113C", lineHeight: 1.25 }}>
          Rank Your Qualities of Will
        </h1>
        <p style={{ fontSize: 13, color: "#6B7280", marginTop: 6, lineHeight: 1.6 }}>
          Order these qualities from most to least like you. Your #1 defines your Oracle's primary intelligence.
        </p>
      </div>

      {/* Instructions chip */}
      <div className="mx-4 mb-4">
        <div
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl"
          style={{ background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.15)" }}
        >
          <GripVertical style={{ width: 14, height: 14, color: PURPLE, strokeWidth: 1.75 }} />
          <span style={{ fontSize: 12, color: "#7C3AED" }}>Use the arrows to reorder · #1 is your strongest quality</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-36" style={{ scrollbarWidth: "none" } as React.CSSProperties}>
        <div className="flex flex-col gap-2">
          {qualities.map((q, i) => (
            <div
              key={q.id}
              className="flex items-center gap-3"
              style={{
                background: "rgba(255,255,255,0.88)",
                border: `1.5px solid ${i === 0 ? q.color + "40" : "rgba(139,92,246,0.10)"}`,
                borderRadius: 18,
                padding: "12px 14px",
              }}
            >
              {/* Rank number */}
              <div
                className="flex-shrink-0 flex items-center justify-center"
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 10,
                  background: i === 0 ? q.color : "#F3F4F6",
                  fontSize: 13,
                  fontWeight: 700,
                  color: i === 0 ? "white" : "#9CA3AF",
                }}
              >
                {i + 1}
              </div>

              {/* Dot */}
              <div
                className="flex-shrink-0 rounded-full"
                style={{ width: 8, height: 8, background: q.dot }}
              />

              {/* Name & persona */}
              <div className="flex-1 min-w-0">
                <p style={{ fontSize: 14, fontWeight: 600, color: "#15113C" }}>{q.name}</p>
                <p style={{ fontSize: 11, color: "#9CA3AF" }}>{q.persona} · {q.tagline}</p>
              </div>

              {/* Up / Down controls */}
              <div className="flex flex-col gap-0.5">
                <button
                  onClick={() => move(i, -1)}
                  disabled={i === 0}
                  className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{
                    background: i === 0 ? "transparent" : "#F3F4F6",
                    opacity: i === 0 ? 0.25 : 1,
                    border: "none",
                    cursor: i === 0 ? "default" : "pointer",
                  }}
                  aria-label="Move up"
                >
                  <ChevronUp style={{ width: 15, height: 15, color: "#6B7280", strokeWidth: 1.75 }} />
                </button>
                <button
                  onClick={() => move(i, 1)}
                  disabled={i === qualities.length - 1}
                  className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{
                    background: i === qualities.length - 1 ? "transparent" : "#F3F4F6",
                    opacity: i === qualities.length - 1 ? 0.25 : 1,
                    border: "none",
                    cursor: i === qualities.length - 1 ? "default" : "pointer",
                  }}
                  aria-label="Move down"
                >
                  <ChevronDown style={{ width: 15, height: 15, color: "#6B7280", strokeWidth: 1.75 }} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Primary summary chip */}
        <div
          className="mt-4 rounded-2xl px-4 py-3 flex items-center gap-3"
          style={{ background: `${qualities[0].dot}18`, border: `1px solid ${qualities[0].dot}40` }}
        >
          <div className="rounded-full flex-shrink-0" style={{ width: 10, height: 10, background: qualities[0].dot }} />
          <p style={{ fontSize: 12, color: "#4B5563", lineHeight: 1.55 }}>
            Primary quality: <strong style={{ color: qualities[0].color }}>{qualities[0].name}</strong> — {qualities[0].persona}
          </p>
        </div>
      </div>

      {/* Fixed CTAs */}
      <div
        className="fixed bottom-0 left-0 right-0 px-4 pb-10 pt-4 flex flex-col gap-3"
        style={{ background: "linear-gradient(to top, #F5F3FF 60%, transparent)" }}
      >
        <button
          onClick={() => onConfirm(qualities.map((q) => q.id))}
          className="w-full py-4 rounded-full"
          style={{
            background: "linear-gradient(135deg, #A78BFA 0%, #8B5CF6 100%)",
            color: "white",
            fontSize: 15,
            fontWeight: 700,
            fontFamily: "Inter, sans-serif",
            boxShadow: "0 4px 20px rgba(139,92,246,0.35)",
            letterSpacing: "0.02em",
          }}
        >
          Generate Oracle Profile
        </button>
        <button
          onClick={onSkip}
          style={{ fontSize: 13, color: "#9CA3AF", background: "none", border: "none", cursor: "pointer", minHeight: 44 }}
        >
          Skip for now
        </button>
      </div>
    </div>
  );
}

/* ── Main component ─────────────────────────────────────────────────── */
type Phase = "select" | "exercise" | "ranking" | "done";

export function WillTrainingScreen({ onDone }: WillTrainingScreenProps) {
  const [phase, setPhase] = useState<Phase>("select");
  const [selected, setSelected] = useState<typeof exercises[0] | null>(null);
  const [stepIdx, setStepIdx] = useState(0);
  const [note, setNote] = useState("");
  const [voiceOn, setVoiceOn] = useState(false);
  const [rankings, setRankings] = useState<string[]>([]);
  const [showOracle, setShowOracle] = useState(false);

  const toggleVoice = () => {
    if (voiceOn) { window.speechSynthesis?.cancel(); setVoiceOn(false); }
    else { setVoiceOn(true); if (selected) speakText(selected.steps[stepIdx]); }
  };

  const handleNext = () => {
    if (selected && stepIdx < selected.steps.length - 1) {
      const next = stepIdx + 1;
      setStepIdx(next);
      if (voiceOn) speakText(selected.steps[next]);
    } else {
      window.speechSynthesis?.cancel();
      setPhase("ranking");
    }
  };

  const handleSelect = (ex: typeof exercises[0]) => {
    setSelected(ex);
    setStepIdx(0);
    setPhase("exercise");
    if (voiceOn) speakText(ex.steps[0]);
  };

  const handleRankingConfirm = (ranked: string[]) => {
    setRankings(ranked);
    setPhase("done");
  };

  const handleRankingSkip = () => {
    setPhase("done");
  };

  /* ── Oracle Profile ───────────────────────────────────────────────── */
  if (showOracle) {
    return (
      <OracleProfileScreen
        rankings={rankings.length > 0 ? rankings : DEFAULT_QUALITIES.map((q) => q.id)}
        onBack={() => { setShowOracle(false); onDone(); }}
      />
    );
  }

  /* ── Done screen ─────────────────────────────────────────────────── */
  if (phase === "done") {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-6"
        style={{ background: "linear-gradient(135deg, #EDE9FE 0%, #C4B5FD 100%)" }}
      >
        <div className="w-24 h-24 rounded-full flex items-center justify-center mb-6" style={{ background: PURPLE }}>
          <Check className="w-12 h-12" style={{ color: "white", strokeWidth: 1.75 }} />
        </div>
        <h2 className="text-2xl mb-2 text-center" style={{ fontFamily: "Lora, serif", fontWeight: 500, color: "#15113C" }}>
          Act of Will complete
        </h2>
        <p className="text-sm mb-10 text-center max-w-xs" style={{ fontFamily: "Inter, sans-serif", color: "#4C1D95", lineHeight: 1.6 }}>
          Every conscious choice strengthens the will. You've exercised yours today.
        </p>

        {rankings.length > 0 && (
          <button
            onClick={() => setShowOracle(true)}
            className="w-full max-w-xs py-4 rounded-full mb-4 flex items-center justify-center gap-2"
            style={{
              background: "linear-gradient(135deg, #A78BFA 0%, #8B5CF6 100%)",
              color: "white",
              fontSize: 15,
              fontWeight: 700,
              fontFamily: "Inter, sans-serif",
              boxShadow: "0 4px 20px rgba(139,92,246,0.35)",
              letterSpacing: "0.02em",
              border: "none",
            }}
          >
            <User style={{ width: 18, height: 18, strokeWidth: 1.75 }} />
            Oracle Profile
          </button>
        )}

        <button
          onClick={onDone}
          className="w-full max-w-xs py-4 rounded-full"
          style={{
            background: "rgba(255,255,255,0.50)",
            color: "#4C1D95",
            fontSize: 15,
            fontWeight: 600,
            fontFamily: "Inter, sans-serif",
            border: "1.5px solid rgba(139,92,246,0.20)",
          }}
        >
          Done
        </button>
      </div>
    );
  }

  /* ── Ranking phase ───────────────────────────────────────────────── */
  if (phase === "ranking") {
    return (
      <QualityRankingScreen
        onConfirm={handleRankingConfirm}
        onSkip={handleRankingSkip}
      />
    );
  }

  /* ── Exercise phase ──────────────────────────────────────────────── */
  if (phase === "exercise" && selected) {
    const step = selected.steps[stepIdx];
    return (
      <div className="min-h-screen flex flex-col" style={{ background: PAGE_BG, padding: "16px" }}>
        <div className="flex items-center justify-between pt-8 pb-4">
          <button
            onClick={() => { setSelected(null); setStepIdx(0); setPhase("select"); window.speechSynthesis?.cancel(); }}
            className="w-11 h-11 rounded-2xl flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.88)", border: "1.5px solid rgba(139,92,246,0.15)" }}
          >
            <ArrowLeft className="w-5 h-5" style={{ color: "#15113C", strokeWidth: 1.75 }} />
          </button>
          <div className="flex-1 mx-3">
            <h1 className="text-xl" style={{ fontFamily: "Lora, serif", fontWeight: 500, color: "#15113C" }}>
              {selected.name}
            </h1>
            <p className="text-xs" style={{ fontFamily: "Inter, sans-serif", color: "#9CA3AF" }}>
              Step {stepIdx + 1} of {selected.steps.length}
            </p>
          </div>
          <button
            onClick={toggleVoice}
            className="w-11 h-11 rounded-2xl flex items-center justify-center"
            style={{ background: voiceOn ? "#EDE9FE" : "rgba(255,255,255,0.88)", border: voiceOn ? "1.5px solid #C4B5FD" : "1.5px solid rgba(139,92,246,0.15)" }}
          >
            {voiceOn ? <Mic className="w-5 h-5" style={{ color: PURPLE, strokeWidth: 1.75 }} /> : <MicOff className="w-5 h-5" style={{ color: "#9CA3AF", strokeWidth: 1.75 }} />}
          </button>
        </div>

        <div className="h-1.5 rounded-full mb-6" style={{ background: "#E5E7EB" }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${((stepIdx + 1) / selected.steps.length) * 100}%`, background: PURPLE }}
          />
        </div>

        <div className="flex-1 p-6 rounded-3xl mb-4" style={{ background: "rgba(255,255,255,0.88)", border: "1.5px solid rgba(139,92,246,0.15)" }}>
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center mb-4"
            style={{ background: PURPLE, color: "white", fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "16px" }}
          >
            {stepIdx + 1}
          </div>
          <p className="text-base mb-6" style={{ fontFamily: "Inter, sans-serif", color: "#15113C", lineHeight: 1.7 }}>
            {step}
          </p>
          {stepIdx === 1 && selected.id === "small-hard-thing" && (
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Name the task you'll do…"
              rows={3}
              className="w-full px-4 py-3 rounded-2xl text-sm resize-none focus:outline-none"
              style={{ fontFamily: "Inter, sans-serif", color: "#15113C", background: "white", border: "1.5px solid rgba(139,92,246,0.2)" }}
            />
          )}
        </div>

        <button onClick={handleNext} className="cb-btn-primary">
          {stepIdx < selected.steps.length - 1 ? "Next step" : "Complete exercise"}
        </button>
      </div>
    );
  }

  /* ── Select screen ───────────────────────────────────────────────── */
  return (
    <div className="min-h-screen" style={{ background: PAGE_BG, padding: "16px", paddingBottom: "40px" }}>
      <div className="flex items-center gap-3 pt-8 pb-6">
        <button
          onClick={onDone}
          className="w-11 h-11 rounded-2xl flex items-center justify-center"
          style={{ background: "rgba(255,255,255,0.88)", border: "1.5px solid rgba(139,92,246,0.15)" }}
        >
          <ArrowLeft className="w-5 h-5" style={{ color: "#15113C", strokeWidth: 1.75 }} />
        </button>
        <div>
          <h1 className="text-2xl" style={{ fontFamily: "Lora, serif", fontWeight: 500, color: "#15113C" }}>Will Training</h1>
          <p className="text-xs" style={{ fontFamily: "Inter, sans-serif", color: "#9CA3AF" }}>Acts of Will — choose your exercise</p>
        </div>
      </div>

      <div className="space-y-3">
        {exercises.map((ex) => (
          <button
            key={ex.id}
            onClick={() => handleSelect(ex)}
            className="w-full p-5 rounded-3xl text-left active:scale-95 transition-all"
            style={{ background: "rgba(255,255,255,0.88)", border: "1.5px solid rgba(139,92,246,0.15)" }}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <h3 className="text-base mb-1" style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, color: "#15113C" }}>
                  {ex.name}
                </h3>
                <p className="text-xs mb-2" style={{ fontFamily: "Inter, sans-serif", color: "#6B7280", lineHeight: 1.5 }}>
                  {ex.description}
                </p>
              </div>
              <span className="px-2 py-1 rounded-lg text-xs flex-shrink-0" style={{ background: "#EDE9FE", color: PURPLE, fontFamily: "Inter, sans-serif", fontWeight: 600 }}>
                {ex.duration}
              </span>
            </div>
            <span className="flex items-center gap-1" style={{ color: PURPLE, fontSize: "14px", fontFamily: "Inter, sans-serif", fontWeight: 600 }}>
              Start <ChevronRight className="w-4 h-4" style={{ strokeWidth: 1.75 }} />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
