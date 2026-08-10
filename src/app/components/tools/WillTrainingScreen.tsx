// @cerebro-design-system: unified purple theme
import { useState } from "react";
import { ArrowLeft, Check, Mic, MicOff, ChevronRight } from "lucide-react";

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
const DONE_BG = "linear-gradient(135deg, #EDE9FE 0%, #C4B5FD 100%)";

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

export function WillTrainingScreen({ onDone }: WillTrainingScreenProps) {
  const [selected, setSelected] = useState<typeof exercises[0] | null>(null);
  const [stepIdx, setStepIdx] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [note, setNote] = useState("");
  const [voiceOn, setVoiceOn] = useState(false);

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
      setCompleted(true);
    }
  };

  const handleSelect = (ex: typeof exercises[0]) => {
    setSelected(ex); setStepIdx(0); setCompleted(false);
    if (voiceOn) speakText(ex.steps[0]);
  };

  if (completed && selected) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-6"
        style={{ background: "linear-gradient(135deg, #EDE9FE 0%, #C4B5FD 100%)" }}
      >
        <div className="w-24 h-24 rounded-full flex items-center justify-center mb-6" style={{ background: "#8B5CF6" }}>
          <Check className="w-12 h-12" style={{ color: "white" }} />
        </div>
        <h2 className="text-2xl mb-2 text-center" style={{ fontFamily: "Lora, serif", fontWeight: 500, color: "#15113C" }}>
          Act of Will complete
        </h2>
        <p className="text-sm mb-8 text-center max-w-xs" style={{ fontFamily: "Inter, sans-serif", color: "#4C1D95", lineHeight: 1.6 }}>
          Every conscious choice strengthens the will. You've exercised yours today.
        </p>
        <button onClick={onDone} className="cb-btn-primary" style={{ maxWidth: "240px" }}>
          Done
        </button>
      </div>
    );
  }

  if (selected) {
    const step = selected.steps[stepIdx];
    return (
      <div className="min-h-screen flex flex-col" style={{ background: "linear-gradient(180deg, #EDE9FE 0%, #F5F3FF 100%)", padding: "16px" }}>
        <div className="flex items-center justify-between pt-8 pb-4">
          <button
            onClick={() => { setSelected(null); setStepIdx(0); window.speechSynthesis?.cancel(); }}
            className="cb-btn-icon"
          >
            <ArrowLeft className="w-5 h-5" style={{ color: "#15113C" }} />
          </button>
          <div className="flex-1 mx-3">
            <h1 className="text-xl" style={{ fontFamily: "Lora, serif", fontWeight: 500, color: "#15113C" }}>
              {selected.name}
            </h1>
            <p className="text-xs" style={{ fontFamily: "Inter, sans-serif", color: "#9CA3AF" }}>
              Step {stepIdx + 1} of {selected.steps.length}
            </p>
          </div>
          <button onClick={toggleVoice} className="cb-btn-icon" style={{ background: voiceOn ? "#EDE9FE" : "rgba(255,255,255,0.7)", border: voiceOn ? "1.5px solid #C4B5FD" : "1.5px solid rgba(0,0,0,0.08)" }}>
            {voiceOn ? <Mic className="w-5 h-5" style={{ color: PURPLE }} /> : <MicOff className="w-5 h-5" style={{ color: "#9CA3AF" }} />}
          </button>
        </div>

        <div className="h-1.5 rounded-full mb-6" style={{ background: "#E5E7EB" }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${((stepIdx + 1) / selected.steps.length) * 100}%`, background: "#8B5CF6" }}
          />
        </div>

        <div className="flex-1 p-6 rounded-3xl mb-4" style={{ background: "rgba(255,255,255,0.8)", border: "1.5px solid rgba(139,92,246,0.15)" }}>
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center mb-4"
            style={{ background: "#8B5CF6", color: "white", fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "16px" }}
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

        <button
          onClick={handleNext}
          className="cb-btn-primary"
        >
          {stepIdx < selected.steps.length - 1 ? "Next step" : "Complete exercise"}
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(180deg, #EDE9FE 0%, #F5F3FF 100%)", padding: "16px", paddingBottom: "40px" }}>
      <div className="flex items-center gap-3 pt-8 pb-6">
        <button onClick={onDone} className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.7)", border: "1.5px solid rgba(0,0,0,0.08)" }}>
          <ArrowLeft className="w-5 h-5" style={{ color: "#15113C" }} />
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
            style={{ background: "rgba(255,255,255,0.8)", border: "1.5px solid rgba(139,92,246,0.15)" }}
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
              <span className="px-2 py-1 rounded-lg text-xs flex-shrink-0" style={{ background: "#EDE9FE", color: "#8B5CF6", fontFamily: "Inter, sans-serif", fontWeight: 600 }}>
                {ex.duration}
              </span>
            </div>
            <span className="flex items-center gap-1" style={{ color: "#8B5CF6", fontSize: "14px", fontFamily: "Inter, sans-serif", fontWeight: 600 }}>Start <ChevronRight className="w-4 h-4" /></span>
          </button>
        ))}
      </div>
    </div>
  );
}
