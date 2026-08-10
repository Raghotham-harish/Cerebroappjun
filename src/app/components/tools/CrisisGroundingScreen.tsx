import { useState } from "react";
import { ArrowLeft, Check, Mic, MicOff, Eye, Hand, Volume2, Wind, Droplets, Fingerprint, Circle, Heart, RefreshCw, Leaf, ChevronRight } from "lucide-react";

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
      { count: null, sense: "EYEBROW",     prompt: "Tap just above and inside the eyebrow. Say:\n\"This feeling I have.\"", Icon: Fingerprint },
      { count: null, sense: "SIDE OF EYE", prompt: "Tap the outside corner of the eye. Say:\n\"All this stress.\"", Icon: Eye },
      { count: null, sense: "UNDER EYE",   prompt: "Tap below the pupil on the bone. Say:\n\"I acknowledge what I'm feeling.\"", Icon: Circle },
      { count: null, sense: "COLLARBONE",  prompt: "Tap below the collarbone, both sides. Say:\n\"I choose to release this now.\"", Icon: Heart },
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
const PAGE_BG = "linear-gradient(180deg, #EDE9FE 0%, #FFFFFF 100%)";
const DONE_BG = "linear-gradient(135deg, #EDE9FE 0%, #C4B5FD 100%)";

function speakText(text: string) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  utt.rate = 0.9; utt.pitch = 1;
  const preferred = window.speechSynthesis.getVoices().find(v => v.name.includes("Samantha") || v.name.includes("Karen") || v.name.includes("Google US English Female"));
  if (preferred) utt.voice = preferred;
  window.speechSynthesis.speak(utt);
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

  if (selected) {
    const step = selected.steps[stepIdx];
    const StepIcon = step.Icon;
    return (
      <div className="min-h-screen flex flex-col" style={{ background: PAGE_BG, padding: "16px" }}>
        <div className="flex items-center justify-between pt-10 pb-4">
          <button onClick={() => { setSelected(null); setStepIdx(0); window.speechSynthesis?.cancel(); }} className="cb-btn-icon">
            <ArrowLeft className="w-5 h-5" style={{ color: "#15113C" }} />
          </button>
          <div className="flex-1 mx-3">
            <h1 className="text-xl" style={{ fontFamily: "Lora, serif", fontWeight: 500, color: "#15113C" }}>{selected.name}</h1>
            <p className="text-xs" style={{ fontFamily: "Inter, sans-serif", color: "#9CA3AF" }}>Step {stepIdx + 1} of {selected.steps.length}</p>
          </div>
          <button onClick={toggleVoice} className="cb-btn-icon" style={{ background: voiceOn ? "#EDE9FE" : "rgba(255,255,255,0.7)", border: voiceOn ? "1.5px solid #C4B5FD" : "1.5px solid rgba(0,0,0,0.08)" }}>
            {voiceOn ? <Mic className="w-5 h-5" style={{ color: PURPLE }} /> : <MicOff className="w-5 h-5" style={{ color: "#9CA3AF" }} />}
          </button>
        </div>

        <div className="h-1.5 rounded-full mb-6" style={{ background: "#E5E7EB" }}>
          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${((stepIdx + 1) / selected.steps.length) * 100}%`, background: PURPLE }} />
        </div>

        <div className="flex-1 flex flex-col gap-4">
          <div className="p-6 rounded-3xl" style={{ background: "rgba(255,255,255,0.9)", border: "1.5px solid rgba(139,92,246,0.15)", boxShadow: "0 4px 24px rgba(139,92,246,0.08)" }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: "#EDE9FE" }}>
                <StepIcon className="w-6 h-6" style={{ color: PURPLE, strokeWidth: 2 }} />
              </div>
              <div className="flex items-center gap-2">
                {step.count != null && (
                  <span className="text-3xl" style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, color: PURPLE }}>{step.count}</span>
                )}
                <span className="px-2 py-0.5 rounded-full text-xs" style={{ background: "rgba(139,92,246,0.12)", color: PURPLE, fontFamily: "Inter, sans-serif", fontWeight: 600 }}>
                  {step.sense}
                </span>
              </div>
            </div>
            <p className="text-base" style={{ fontFamily: "Inter, sans-serif", color: "#15113C", lineHeight: 1.75, whiteSpace: "pre-line" }}>{step.prompt}</p>
          </div>
          {selected.id === "54321" && (
            <textarea
              value={notes[stepIdx] || ""}
              onChange={(e) => setNotes((n) => ({ ...n, [stepIdx]: e.target.value }))}
              placeholder={`List ${step.count ?? ""} things you ${step.sense.toLowerCase()}…`}
              rows={3}
              className="w-full px-4 py-3 rounded-2xl text-sm resize-none focus:outline-none"
              style={{ fontFamily: "Inter, sans-serif", color: "#15113C", background: "white", border: "1.5px solid rgba(139,92,246,0.2)" }}
            />
          )}
        </div>

        <button onClick={handleNext} className="cb-btn-primary mt-4 mb-4">
          {stepIdx < selected.steps.length - 1 ? "Continue" : "I'm grounded"}
        </button>
      </div>
    );
  }

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
