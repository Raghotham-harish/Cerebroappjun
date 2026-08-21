import { useState } from "react";
import { ArrowLeft, Check, Mic, MicOff, Eye, Hand, Volume2, Wind, Droplets, Leaf, RefreshCw, ChevronRight } from "lucide-react";

interface CrisisGroundingScreenProps {
  onDone: () => void;
}

interface Step {
  count: number | null;
  sense: string;
  prompt: string;
  Icon: React.ElementType;
}

const techniques = [
  {
    id: "54321",
    name: "5-4-3-2-1",
    subtitle: "Sensory grounding",
    description: "Anchor yourself in the present using your five senses.",
    steps: [
      { count: 5, sense: "SEE",   prompt: "Name 5 things you can see right now. Look around slowly.", Icon: Eye },
      { count: 4, sense: "TOUCH", prompt: "Name 4 things you can physically feel — textures, temperature, surfaces.", Icon: Hand },
      { count: 3, sense: "HEAR",  prompt: "Name 3 sounds you can hear right now, near or far.", Icon: Volume2 },
      { count: 2, sense: "SMELL", prompt: "Name 2 things you can smell. If nothing, think of a comforting scent.", Icon: Wind },
      { count: 1, sense: "TASTE", prompt: "Name 1 thing you can taste — or take a sip of water.", Icon: Droplets },
    ] as Step[],
  },
  {
    id: "tapping",
    name: "Tapping (EFT)",
    subtitle: "Emotional stress release",
    description: "Tap specific meridian points while acknowledging what you feel.",
    steps: [
      { count: null, sense: "SETUP",       prompt: "Tap the side of your hand (karate chop point) and say:\n\"Even though I feel this way right now, I deeply and completely accept myself.\" Repeat 3 times.", Icon: Hand },
      { count: null, sense: "EYEBROW",     prompt: "Tap just above and inside the eyebrow. Say:\n\"This feeling I have.\"", Icon: Hand },
      { count: null, sense: "SIDE OF EYE", prompt: "Tap the outside corner of the eye. Say:\n\"All this stress.\"", Icon: Hand },
      { count: null, sense: "UNDER EYE",   prompt: "Tap below the pupil on the bone. Say:\n\"I acknowledge what I'm feeling.\"", Icon: Hand },
      { count: null, sense: "COLLARBONE",  prompt: "Tap below the collarbone, both sides. Say:\n\"I choose to release this now.\"", Icon: Hand },
    ] as Step[],
  },
  {
    id: "cold-breath",
    name: "Cold Breath",
    subtitle: "Vagal nerve reset",
    description: "Activate the vagal brake to shift from fight-or-flight to calm.",
    steps: [
      { count: null, sense: "PREPARE", prompt: "If possible, splash cold water on your face or wrists for 30 seconds. Otherwise, proceed.", Icon: Droplets },
      { count: null, sense: "INHALE",  prompt: "Breathe in slowly through your nose for 4 counts. Feel your chest expand.", Icon: Wind },
      { count: null, sense: "EXHALE",  prompt: "Breathe out through pursed lips (like blowing on hot soup) for 8 counts. Make it long.", Icon: Wind },
      { count: null, sense: "REPEAT",  prompt: "Repeat the long exhale breath 5 more times. Each exhale sends a signal to your nervous system: you are safe.", Icon: RefreshCw },
      { count: null, sense: "GROUND",  prompt: "Press your feet firmly into the floor. Feel the support beneath you. You are here. You are safe.", Icon: Leaf },
    ] as Step[],
  },
];

const PURPLE = "#8B5CF6";
const PAGE_BG = "linear-gradient(180deg, #EDE9FE 0%, #F5F3FF 100%)";
const DONE_BG = "linear-gradient(135deg, #EDE9FE 0%, #C4B5FD 100%)";

const EFT_POINTS: Record<string, { x: number; y: number; label: string }> = {
  "SETUP":       { x: 182, y: 260, label: "Side of Hand" },
  "EYEBROW":     { x: 65,  y: 52,  label: "Eyebrow" },
  "SIDE OF EYE": { x: 152, y: 68,  label: "Side of Eye" },
  "UNDER EYE":   { x: 122, y: 84,  label: "Under Eye" },
  "COLLARBONE":  { x: 78,  y: 178, label: "Collarbone" },
};

const SENSORY_PANELS: Record<string, { gradient: string; Icon: React.ElementType }> = {
  "SEE":   { gradient: "linear-gradient(135deg, #312E81 0%, #4C1D95 100%)", Icon: Eye },
  "TOUCH": { gradient: "linear-gradient(135deg, #064E3B 0%, #065F46 100%)", Icon: Hand },
  "HEAR":  { gradient: "linear-gradient(135deg, #1E3A5F 0%, #1D4ED8 100%)", Icon: Volume2 },
  "SMELL": { gradient: "linear-gradient(135deg, #78350F 0%, #B45309 100%)", Icon: Wind },
  "TASTE": { gradient: "linear-gradient(135deg, #7F1D1D 0%, #991B1B 100%)", Icon: Droplets },
};

const BREATH_PHASES: Record<string, { background: string; label: string }> = {
  "PREPARE": { background: "#EEF2FF",                                                        label: "Prepare" },
  "INHALE":  { background: "linear-gradient(135deg, #EDE9FE 0%, #C4B5FD 100%)",             label: "Inhale" },
  "EXHALE":  { background: "linear-gradient(135deg, #F0FDF4 0%, #D1FAE5 100%)",             label: "Exhale" },
  "REPEAT":  { background: "linear-gradient(135deg, #F0FDF4 0%, #D1FAE5 100%)",             label: "Repeat" },
  "GROUND":  { background: "linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)",             label: "Ground" },
};

function speakText(text: string) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  utt.rate = 0.9; utt.pitch = 1;
  const preferred = window.speechSynthesis.getVoices().find(v => v.name.includes("Samantha") || v.name.includes("Karen") || v.name.includes("Google US English Female"));
  if (preferred) utt.voice = preferred;
  window.speechSynthesis.speak(utt);
}

function EFTDiagram({ activeSense }: { activeSense: string }) {
  const activePoint = EFT_POINTS[activeSense];

  return (
    <svg
      viewBox="0 0 200 290"
      style={{ width: "100%", maxWidth: 220, margin: "0 auto", display: "block" }}
      aria-label="EFT tapping diagram"
    >
      <style>{`
        @keyframes eftPulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.1; }
        }
        .eft-pulse-ring {
          animation: eftPulse 1.5s ease-in-out infinite;
        }
      `}</style>

      {/* Head */}
      <ellipse cx="100" cy="78" rx="52" ry="60" fill="#F5F3FF" stroke="#C4B5FD" strokeWidth="2"/>

      {/* Eyebrows */}
      <path d="M63 55 Q78 49 93 53" fill="none" stroke="#6D28D9" strokeWidth="2" strokeLinecap="round"/>
      <path d="M107 53 Q122 49 137 55" fill="none" stroke="#6D28D9" strokeWidth="2" strokeLinecap="round"/>

      {/* Left eye */}
      <ellipse cx="78" cy="68" rx="10" ry="6" fill="white" stroke="#A78BFA" strokeWidth="1.5"/>
      {/* Right eye */}
      <ellipse cx="122" cy="68" rx="10" ry="6" fill="white" stroke="#A78BFA" strokeWidth="1.5"/>
      {/* Eye pupils */}
      <circle cx="80" cy="68" r="3.5" fill="#4C1D95"/>
      <circle cx="124" cy="68" r="3.5" fill="#4C1D95"/>

      {/* Nose hint */}
      <path d="M100 79 L96 93 Q100 96 104 93 Z" fill="none" stroke="#C4B5FD" strokeWidth="1.5"/>

      {/* Mouth */}
      <path d="M85 106 Q100 114 115 106" fill="none" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round"/>

      {/* Neck */}
      <rect x="88" y="136" width="24" height="24" rx="5" fill="#F5F3FF" stroke="#C4B5FD" strokeWidth="1.5"/>

      {/* Torso */}
      <path d="M52 158 C52 232 75 262 100 264 C125 262 148 232 148 158 L133 153 Q100 162 67 153 Z" fill="#F5F3FF" stroke="#C4B5FD" strokeWidth="2"/>

      {/* Left shoulder */}
      <path d="M52 158 L30 168 L20 204 L42 208 L54 176 Z" fill="#F5F3FF" stroke="#C4B5FD" strokeWidth="1.5"/>
      {/* Right shoulder */}
      <path d="M148 158 L170 168 L180 204 L158 208 L146 176 Z" fill="#F5F3FF" stroke="#C4B5FD" strokeWidth="1.5"/>

      {/* Left arm */}
      <path d="M31 204 L16 252" stroke="#DDD6FE" strokeWidth="14" strokeLinecap="round"/>

      {/* Right arm line */}
      <path d="M169 204 L172 249" stroke="#DDD6FE" strokeWidth="14" strokeLinecap="round"/>
      {/* Right hand */}
      <ellipse cx="172" cy="260" rx="14" ry="11" fill="#F5F3FF" stroke="#C4B5FD" strokeWidth="1.5"/>

      {/* Tapping points — non-active */}
      {Object.entries(EFT_POINTS).map(([key, point], i) => {
        const isActive = key === activeSense;
        if (isActive) return null;
        return (
          <g key={key}>
            <circle cx={point.x} cy={point.y} r={7} fill="white" stroke="#C4B5FD" strokeWidth="2"/>
            <text
              x={point.x}
              y={point.y + 4}
              textAnchor="middle"
              fontSize="7"
              fontFamily="Inter, sans-serif"
              fontWeight="600"
              fill="#A78BFA"
            >
              {i + 1}
            </text>
          </g>
        );
      })}

      {/* Active tapping point */}
      {activePoint && (
        <g>
          {/* Outer pulsing ring */}
          <circle
            cx={activePoint.x}
            cy={activePoint.y}
            r={16}
            fill="rgba(139,92,246,0.2)"
            className="eft-pulse-ring"
          />
          {/* Inner filled dot */}
          <circle cx={activePoint.x} cy={activePoint.y} r={9} fill="#8B5CF6" stroke="white" strokeWidth="2"/>
          {/* Center highlight */}
          <circle cx={activePoint.x} cy={activePoint.y} r={4} fill="white"/>
        </g>
      )}
    </svg>
  );
}

export function CrisisGroundingScreen({ onDone }: CrisisGroundingScreenProps) {
  const [selected, setSelected] = useState<typeof techniques[0] | null>(null);
  const [stepIdx, setStepIdx] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [voiceOn, setVoiceOn] = useState(false);

  const toggleVoice = () => {
    if (voiceOn) { window.speechSynthesis?.cancel(); setVoiceOn(false); }
    else { setVoiceOn(true); if (selected) speakText(selected.steps[stepIdx].prompt); }
  };

  const handleNext = () => {
    if (selected && stepIdx < selected.steps.length - 1) {
      const next = stepIdx + 1;
      setStepIdx(next);
      if (voiceOn) speakText(selected.steps[next].prompt);
    } else {
      window.speechSynthesis?.cancel();
      setCompleted(true);
    }
  };

  const handleSelect = (t: typeof techniques[0]) => {
    setSelected(t); setStepIdx(0); setCompleted(false);
    if (voiceOn) speakText(t.steps[0].prompt);
  };

  // Completed screen
  if (completed && selected) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{ background: DONE_BG }}>
        <div className="w-20 h-20 rounded-full flex items-center justify-center mb-5" style={{ background: PURPLE }}>
          <Leaf className="w-10 h-10" style={{ color: "white", strokeWidth: 1.5 }} />
        </div>
        <div className="w-12 h-12 rounded-full flex items-center justify-center mb-6" style={{ background: "rgba(255,255,255,0.6)" }}>
          <Check className="w-6 h-6" style={{ color: PURPLE }} />
        </div>
        <h2 className="text-2xl mb-3 text-center" style={{ fontFamily: "Lora, serif", fontWeight: 500, color: "#15113C" }}>You're grounded</h2>
        <p className="text-sm mb-10 text-center max-w-xs" style={{ fontFamily: "Inter, sans-serif", color: "#4C1D95", lineHeight: 1.6 }}>
          You moved through it. That takes courage. Take a moment to breathe.
        </p>
        <button onClick={() => { setSelected(null); setStepIdx(0); setCompleted(false); }} className="cb-btn-ghost mb-3">
          Try another technique
        </button>
        <button onClick={onDone} className="cb-btn-primary">Done</button>
      </div>
    );
  }

  // EFT Tapping session
  if (selected?.id === "tapping") {
    const step = selected.steps[stepIdx];
    const pointData = EFT_POINTS[step.sense];
    return (
      <div className="min-h-screen flex flex-col" style={{ background: PAGE_BG, padding: "16px" }}>
        {/* Header */}
        <div className="flex items-center justify-between pt-10 pb-4">
          <button
            onClick={() => { setSelected(null); setStepIdx(0); window.speechSynthesis?.cancel(); }}
            className="cb-btn-icon"
          >
            <ArrowLeft className="w-5 h-5" style={{ color: "#15113C" }} />
          </button>
          <div className="flex-1 mx-3">
            <h1 className="text-xl" style={{ fontFamily: "Lora, serif", fontWeight: 500, color: "#15113C" }}>{selected.name}</h1>
            <p className="text-xs" style={{ fontFamily: "Inter, sans-serif", color: "#9CA3AF" }}>Step {stepIdx + 1} of {selected.steps.length}</p>
          </div>
          <button
            onClick={toggleVoice}
            className="cb-btn-icon"
            style={{ background: voiceOn ? "#EDE9FE" : "rgba(255,255,255,0.7)", border: voiceOn ? "1.5px solid #C4B5FD" : "1.5px solid rgba(0,0,0,0.08)" }}
          >
            {voiceOn ? <Mic className="w-5 h-5" style={{ color: PURPLE }} /> : <MicOff className="w-5 h-5" style={{ color: "#9CA3AF" }} />}
          </button>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 rounded-full mb-5" style={{ background: "#E5E7EB" }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${((stepIdx + 1) / selected.steps.length) * 100}%`, background: PURPLE }}
          />
        </div>

        {/* EFT Diagram */}
        <div style={{ marginBottom: 12 }}>
          <EFTDiagram activeSense={step.sense} />
        </div>

        {/* Active point label chip */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 700,
              fontSize: 13,
              color: PURPLE,
              background: "rgba(139,92,246,0.12)",
              borderRadius: 99,
              padding: "4px 14px",
              letterSpacing: "0.04em",
            }}
          >
            {pointData ? pointData.label.toUpperCase() : step.sense}
          </span>
        </div>

        {/* Instruction card */}
        <div
          style={{
            background: "rgba(255,255,255,0.92)",
            border: "1.5px solid rgba(139,92,246,0.15)",
            borderRadius: 24,
            boxShadow: "0 4px 24px rgba(139,92,246,0.08)",
            padding: "20px 20px",
            marginBottom: 16,
          }}
        >
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              color: "#15113C",
              lineHeight: 1.75,
              whiteSpace: "pre-line",
              fontSize: 15,
              margin: 0,
            }}
          >
            {step.prompt}
          </p>
        </div>

        {/* Continue button */}
        <button onClick={handleNext} className="cb-btn-primary mt-auto mb-4">
          {stepIdx < selected.steps.length - 1 ? "Continue" : "I'm grounded"}
        </button>
      </div>
    );
  }

  // 5-4-3-2-1 sensory session
  if (selected?.id === "54321") {
    const step = selected.steps[stepIdx];
    const panel = SENSORY_PANELS[step.sense];
    const PanelIcon = panel?.Icon ?? Eye;
    return (
      <div className="min-h-screen flex flex-col" style={{ background: PAGE_BG, padding: "16px" }}>
        {/* Header */}
        <div className="flex items-center justify-between pt-10 pb-4">
          <button
            onClick={() => { setSelected(null); setStepIdx(0); window.speechSynthesis?.cancel(); }}
            className="cb-btn-icon"
          >
            <ArrowLeft className="w-5 h-5" style={{ color: "#15113C" }} />
          </button>
          <div className="flex-1 mx-3">
            <h1 className="text-xl" style={{ fontFamily: "Lora, serif", fontWeight: 500, color: "#15113C" }}>{selected.name}</h1>
            <p className="text-xs" style={{ fontFamily: "Inter, sans-serif", color: "#9CA3AF" }}>Step {stepIdx + 1} of {selected.steps.length}</p>
          </div>
          <button
            onClick={toggleVoice}
            className="cb-btn-icon"
            style={{ background: voiceOn ? "#EDE9FE" : "rgba(255,255,255,0.7)", border: voiceOn ? "1.5px solid #C4B5FD" : "1.5px solid rgba(0,0,0,0.08)" }}
          >
            {voiceOn ? <Mic className="w-5 h-5" style={{ color: PURPLE }} /> : <MicOff className="w-5 h-5" style={{ color: "#9CA3AF" }} />}
          </button>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 rounded-full mb-5" style={{ background: "#E5E7EB" }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${((stepIdx + 1) / selected.steps.length) * 100}%`, background: PURPLE }}
          />
        </div>

        {/* Large sensory panel */}
        <div
          style={{
            width: "100%",
            height: 200,
            borderRadius: 20,
            background: panel?.gradient ?? PURPLE,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 18,
            flexShrink: 0,
          }}
        >
          <PanelIcon style={{ width: 80, height: 80, color: "white", strokeWidth: 1 }} />
        </div>

        {/* Count badge + sense label */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          {step.count != null && (
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 800,
                fontSize: 36,
                color: PURPLE,
                lineHeight: 1,
              }}
            >
              {step.count}
            </span>
          )}
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 700,
              fontSize: 13,
              color: PURPLE,
              background: "rgba(139,92,246,0.12)",
              borderRadius: 99,
              padding: "4px 14px",
              letterSpacing: "0.06em",
            }}
          >
            {step.sense}
          </span>
        </div>

        {/* Instruction */}
        <div
          style={{
            background: "rgba(255,255,255,0.92)",
            border: "1.5px solid rgba(139,92,246,0.15)",
            borderRadius: 24,
            boxShadow: "0 4px 24px rgba(139,92,246,0.08)",
            padding: "18px 20px",
            marginBottom: 12,
          }}
        >
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              color: "#15113C",
              lineHeight: 1.75,
              fontSize: 15,
              margin: 0,
            }}
          >
            {step.prompt}
          </p>
        </div>

        {/* Notes textarea */}
        <textarea
          value={notes[stepIdx] || ""}
          onChange={(e) => setNotes((n) => ({ ...n, [stepIdx]: e.target.value }))}
          placeholder={`List ${step.count ?? ""} things you ${step.sense.toLowerCase()}…`}
          rows={3}
          className="w-full px-4 py-3 rounded-2xl text-sm resize-none focus:outline-none"
          style={{
            fontFamily: "Inter, sans-serif",
            color: "#15113C",
            background: "white",
            border: "1.5px solid rgba(139,92,246,0.2)",
            marginBottom: 16,
          }}
        />

        <button onClick={handleNext} className="cb-btn-primary mb-4">
          {stepIdx < selected.steps.length - 1 ? "Continue" : "I'm grounded"}
        </button>
      </div>
    );
  }

  // Cold Breath session
  if (selected?.id === "cold-breath") {
    const step = selected.steps[stepIdx];
    const phase = BREATH_PHASES[step.sense] ?? BREATH_PHASES["PREPARE"];
    return (
      <div className="min-h-screen flex flex-col" style={{ background: PAGE_BG, padding: "16px" }}>
        {/* Header */}
        <div className="flex items-center justify-between pt-10 pb-4">
          <button
            onClick={() => { setSelected(null); setStepIdx(0); window.speechSynthesis?.cancel(); }}
            className="cb-btn-icon"
          >
            <ArrowLeft className="w-5 h-5" style={{ color: "#15113C" }} />
          </button>
          <div className="flex-1 mx-3">
            <h1 className="text-xl" style={{ fontFamily: "Lora, serif", fontWeight: 500, color: "#15113C" }}>{selected.name}</h1>
            <p className="text-xs" style={{ fontFamily: "Inter, sans-serif", color: "#9CA3AF" }}>Step {stepIdx + 1} of {selected.steps.length}</p>
          </div>
          <button
            onClick={toggleVoice}
            className="cb-btn-icon"
            style={{ background: voiceOn ? "#EDE9FE" : "rgba(255,255,255,0.7)", border: voiceOn ? "1.5px solid #C4B5FD" : "1.5px solid rgba(0,0,0,0.08)" }}
          >
            {voiceOn ? <Mic className="w-5 h-5" style={{ color: PURPLE }} /> : <MicOff className="w-5 h-5" style={{ color: "#9CA3AF" }} />}
          </button>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 rounded-full mb-8" style={{ background: "#E5E7EB" }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${((stepIdx + 1) / selected.steps.length) * 100}%`, background: PURPLE }}
          />
        </div>

        {/* Phase label */}
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 700,
            fontSize: 12,
            color: "#9CA3AF",
            letterSpacing: "0.1em",
            textAlign: "center",
            marginBottom: 16,
            textTransform: "uppercase",
          }}
        >
          {phase.label}
        </p>

        {/* Ambient breath shape */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
          <div
            style={{
              width: 200,
              height: 200,
              borderRadius: "50%",
              background: phase.background,
              transition: "background 0.6s ease",
              boxShadow: "0 8px 40px rgba(139,92,246,0.15)",
            }}
          />
        </div>

        {/* Instruction card */}
        <div
          style={{
            background: "rgba(255,255,255,0.92)",
            border: "1.5px solid rgba(139,92,246,0.15)",
            borderRadius: 24,
            boxShadow: "0 4px 24px rgba(139,92,246,0.08)",
            padding: "20px 20px",
            marginBottom: 20,
          }}
        >
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              color: "#15113C",
              lineHeight: 1.75,
              fontSize: 15,
              margin: 0,
            }}
          >
            {step.prompt}
          </p>
        </div>

        <button onClick={handleNext} className="cb-btn-primary mt-auto mb-4">
          {stepIdx < selected.steps.length - 1 ? "Continue" : "I'm grounded"}
        </button>
      </div>
    );
  }

  // Selection screen
  return (
    <div className="min-h-screen" style={{ background: PAGE_BG, padding: "16px", paddingBottom: "40px" }}>
      <div className="flex items-center gap-3 pt-10 pb-6">
        <button onClick={onDone} className="cb-btn-icon">
          <ArrowLeft className="w-5 h-5" style={{ color: "#15113C" }} />
        </button>
        <div>
          <h1 className="text-2xl" style={{ fontFamily: "Lora, serif", fontWeight: 500, color: "#15113C" }}>Micro Grounding</h1>
          <p className="text-xs" style={{ fontFamily: "Inter, sans-serif", color: "#9CA3AF" }}>Choose a technique to anchor yourself</p>
        </div>
      </div>
      <div className="space-y-3">
        {techniques.map((t) => (
          <button
            key={t.id}
            onClick={() => handleSelect(t)}
            className="w-full p-5 rounded-3xl text-left cb-ripple-dark"
            style={{ background: "rgba(255,255,255,0.9)", border: "1.5px solid rgba(139,92,246,0.12)", boxShadow: "0 2px 12px rgba(139,92,246,0.06)" }}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-base mb-0.5" style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, color: "#15113C" }}>{t.name}</h3>
                <p className="text-xs mb-2" style={{ fontFamily: "Inter, sans-serif", color: PURPLE, fontWeight: 600 }}>{t.subtitle}</p>
                <p className="text-xs" style={{ fontFamily: "Inter, sans-serif", color: "#6B7280" }}>{t.description}</p>
              </div>
              <ChevronRight className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: PURPLE }} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
