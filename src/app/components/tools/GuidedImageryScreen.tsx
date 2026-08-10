import { useState } from "react";
import { ArrowLeft, Check, Mic, MicOff, Trees, Waves, Mountain, Flower, ChevronRight } from "lucide-react";

function speakText(text: string) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  utt.rate = 0.85; utt.pitch = 1;
  const preferred = window.speechSynthesis.getVoices().find(v => v.name.includes("Samantha") || v.name.includes("Karen") || v.name.includes("Google US English Female"));
  if (preferred) utt.voice = preferred;
  window.speechSynthesis.speak(utt);
}

interface GuidedImageryScreenProps {
  onDone: () => void;
}

const landscapes = [
  { id: "forest",   name: "Forest Sanctuary", Icon: Trees },
  { id: "ocean",    name: "Ocean Shore",      Icon: Waves },
  { id: "mountain", name: "Mountain Peak",    Icon: Mountain },
  { id: "meadow",   name: "Sunlit Meadow",    Icon: Flower },
];

const scripts: Record<string, string[]> = {
  forest: [
    "Close your eyes and take three slow, deep breaths. Let your body soften into stillness.",
    "You are standing at the edge of an ancient forest. The air smells of pine and damp earth. Morning light filters through a canopy of leaves.",
    "You walk slowly along a moss-covered path. Birdsong echoes gently around you. Each step feels grounded, safe.",
    "You find a clearing with a large, warm stone. You sit. The forest hums quietly around you. Nothing is required of you here.",
    "You are held by the forest. You breathe. You belong. Stay here as long as you need.",
  ],
  ocean: [
    "Close your eyes. Take three slow breaths. Let the sounds of the world fade.",
    "You are standing on a quiet beach at sunrise. The sand is cool beneath your feet. The horizon is a soft blush of pink and gold.",
    "You walk to the water's edge. Gentle waves arrive and retreat. Each wave carries something away — a worry, a tension, a thought.",
    "You sit and watch the ocean breathe. You breathe with it. In… and out. Vast, patient, endless.",
    "The ocean holds no judgment. It simply is. And so are you, in this moment. Completely enough.",
  ],
  mountain: [
    "Close your eyes. Take three steady breaths. Feel the ground beneath you.",
    "You are at the base of a great mountain. The sky above is clear and blue. The air is crisp, clean, still.",
    "You begin to climb. Each step is slow and deliberate. You don't rush — the mountain is patient.",
    "You reach a high ridge. You can see far in every direction — valleys, rivers, clouds below. From here, your concerns look small.",
    "You are strong enough. You have climbed before. The view from stillness is always wider.",
  ],
  meadow: [
    "Close your eyes. Breathe in warmth. Breathe out whatever is tight.",
    "You are lying in a meadow of wildflowers. The sun is gentle on your skin. Bees hum nearby.",
    "The flowers sway in a soft breeze. Lavender, chamomile, clover. Everything blooms in its own time.",
    "You feel the earth supporting you completely. You don't have to hold anything up. You can just receive.",
    "The meadow is where you return to yourself. Unhurried. Unguarded. Fully alive.",
  ],
};

const PURPLE = "#8B5CF6";
const PAGE_BG = "linear-gradient(180deg, #EDE9FE 0%, #F5F3FF 100%)";
const DONE_BG = "linear-gradient(135deg, #EDE9FE 0%, #C4B5FD 100%)";

export function GuidedImageryScreen({ onDone }: GuidedImageryScreenProps) {
  const [landscape, setLandscape] = useState<string | null>(null);
  const [stepIdx, setStepIdx] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [voiceOn, setVoiceOn] = useState(false);

  const land = landscapes.find((l) => l.id === landscape);
  const script = landscape ? scripts[landscape] : [];

  const toggleVoice = () => {
    if (voiceOn) { window.speechSynthesis?.cancel(); setVoiceOn(false); }
    else { setVoiceOn(true); if (landscape) speakText(scripts[landscape][stepIdx]); }
  };

  const handleNext = () => {
    if (stepIdx < script.length - 1) {
      const next = stepIdx + 1;
      setStepIdx(next);
      if (voiceOn && landscape) speakText(scripts[landscape][next]);
    } else {
      window.speechSynthesis?.cancel();
      setCompleted(true);
    }
  };

  const handleSelectLandscape = (id: string) => {
    setLandscape(id); setStepIdx(0); setCompleted(false);
    if (voiceOn) speakText(scripts[id][0]);
  };

  if (completed && land) {
    const LandIcon = land.Icon;
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{ background: DONE_BG }}>
        <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6" style={{ background: PURPLE }}>
          <LandIcon className="w-10 h-10" style={{ color: "white", strokeWidth: 1.5 }} />
        </div>
        <h2 className="text-2xl mb-3 text-center" style={{ fontFamily: "Lora, serif", fontWeight: 500, color: "#15113C" }}>Journey complete</h2>
        <p className="text-sm mb-10 text-center max-w-xs" style={{ fontFamily: "Inter, sans-serif", color: "#4C1D95", lineHeight: 1.6 }}>
          Carry this feeling with you. The {land.name.toLowerCase()} is always within reach.
        </p>
        <button onClick={onDone} className="cb-btn-primary max-w-xs">Done</button>
      </div>
    );
  }

  if (landscape && land) {
    const LandIcon = land.Icon;
    return (
      <div className="min-h-screen flex flex-col" style={{ background: PAGE_BG, padding: "16px" }}>
        <div className="flex items-center justify-between pt-10 pb-4">
          <button onClick={() => { setLandscape(null); setStepIdx(0); window.speechSynthesis?.cancel(); }} className="cb-btn-icon">
            <ArrowLeft className="w-5 h-5" style={{ color: "#15113C" }} />
          </button>
          <div className="flex-1 mx-3">
            <h1 className="text-xl" style={{ fontFamily: "Lora, serif", fontWeight: 500, color: "#15113C" }}>{land.name}</h1>
            <p className="text-xs" style={{ fontFamily: "Inter, sans-serif", color: "#9CA3AF" }}>Scene {stepIdx + 1} of {script.length}</p>
          </div>
          <button onClick={toggleVoice} className="cb-btn-icon" style={{ background: voiceOn ? "#EDE9FE" : "rgba(255,255,255,0.7)", border: voiceOn ? "1.5px solid #C4B5FD" : "1.5px solid rgba(0,0,0,0.08)" }}>
            {voiceOn ? <Mic className="w-5 h-5" style={{ color: PURPLE }} /> : <MicOff className="w-5 h-5" style={{ color: "#9CA3AF" }} />}
          </button>
        </div>
        <div className="h-1.5 rounded-full mb-6" style={{ background: "#E5E7EB" }}>
          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${((stepIdx + 1) / script.length) * 100}%`, background: PURPLE }} />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-2">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mb-8" style={{ background: "#EDE9FE" }}>
            <LandIcon className="w-10 h-10" style={{ color: PURPLE, strokeWidth: 1.5 }} />
          </div>
          <div className="w-full p-6 rounded-3xl text-center" style={{ background: "rgba(255,255,255,0.8)", border: "1.5px solid rgba(139,92,246,0.15)" }}>
            <p className="text-base leading-relaxed" style={{ fontFamily: "Lora, serif", color: "#15113C", fontStyle: "italic", lineHeight: 1.8 }}>
              {script[stepIdx]}
            </p>
          </div>
        </div>
        <div className="mt-6 mb-4">
          <button onClick={handleNext} className="cb-btn-primary">
            {stepIdx < script.length - 1 ? "Continue" : "Complete journey"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: PAGE_BG, padding: "16px", paddingBottom: "40px" }}>
      <div className="flex items-center gap-3 pt-8 pb-6">
        <button onClick={onDone} className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.7)", border: "1.5px solid rgba(0,0,0,0.08)" }}>
          <ArrowLeft className="w-5 h-5" style={{ color: "#15113C" }} />
        </button>
        <div>
          <h1 className="text-2xl" style={{ fontFamily: "Lora, serif", fontWeight: 500, color: "#15113C" }}>Guided Imagery</h1>
          <p className="text-xs" style={{ fontFamily: "Inter, sans-serif", color: "#9CA3AF" }}>Choose your inner landscape</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {landscapes.map((l) => {
          const LandIcon = l.Icon;
          return (
            <button
              key={l.id}
              onClick={() => handleSelectLandscape(l.id)}
              className="p-5 rounded-3xl flex flex-col items-center justify-center gap-3 cb-ripple-dark"
              style={{ background: "rgba(255,255,255,0.88)", border: "1.5px solid rgba(139,92,246,0.15)", minHeight: 140 }}
            >
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: "#EDE9FE" }}>
                <LandIcon className="w-6 h-6" style={{ color: PURPLE, strokeWidth: 1.5 }} />
              </div>
              <span className="text-sm text-center" style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, color: "#15113C" }}>{l.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
