import { useState, useEffect, useRef } from "react";
import { ArrowLeft, Check, Wind, Mic, MicOff, ChevronRight } from "lucide-react";

function speakText(text: string) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  utt.rate = 0.9; utt.pitch = 1;
  const preferred = window.speechSynthesis.getVoices().find(v => v.name.includes("Samantha") || v.name.includes("Karen") || v.name.includes("Google US English Female"));
  if (preferred) utt.voice = preferred;
  window.speechSynthesis.speak(utt);
}

interface BreathLoopsScreenProps {
  onDone: () => void;
}

type Pattern = {
  id: string;
  name: string;
  subtitle: string;
  phases: { label: string; duration: number }[];
  chipBg: string;
};

const patterns: Pattern[] = [
  {
    id: "478",
    name: "4-7-8",
    subtitle: "Calming & sleep-inducing",
    phases: [
      { label: "Inhale", duration: 4 },
      { label: "Hold", duration: 7 },
      { label: "Exhale", duration: 8 },
    ],
    chipBg: "#BFDBFE",
  },
  {
    id: "box",
    name: "Box Breathing",
    subtitle: "Focus & stress relief",
    phases: [
      { label: "Inhale", duration: 4 },
      { label: "Hold", duration: 4 },
      { label: "Exhale", duration: 4 },
      { label: "Hold", duration: 4 },
    ],
    chipBg: "#BBF7D0",
  },
  {
    id: "coherence",
    name: "Coherence",
    subtitle: "Heart-rate balance",
    phases: [
      { label: "Inhale", duration: 5 },
      { label: "Exhale", duration: 5 },
    ],
    chipBg: "#C4B5FD",
  },
];

const PURPLE = "#8B5CF6";
const PAGE_BG = "linear-gradient(180deg, #EDE9FE 0%, #F5F3FF 100%)";
const DONE_BG = "linear-gradient(135deg, #EDE9FE 0%, #C4B5FD 100%)";

export function BreathLoopsScreen({ onDone }: BreathLoopsScreenProps) {
  const [selected, setSelected] = useState<Pattern | null>(null);
  const [running, setRunning] = useState(false);
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [count, setCount] = useState(0);
  const [round, setRound] = useState(1);
  const [completed, setCompleted] = useState(false);
  const [voiceOn, setVoiceOn] = useState(false);
  const totalRounds = 4;
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const toggleVoice = () => {
    if (voiceOn) { window.speechSynthesis?.cancel(); setVoiceOn(false); }
    else { setVoiceOn(true); if (selected) speakText(selected.phases[phaseIdx].label); }
  };

  useEffect(() => {
    if (!running || !selected) return;
    const phase = selected.phases[phaseIdx];
    setCount(phase.duration);
    if (voiceOn) speakText(phase.label);
    intervalRef.current = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          const nextIdx = (phaseIdx + 1) % selected.phases.length;
          if (nextIdx === 0) {
            if (round >= totalRounds) { setRunning(false); setCompleted(true); window.speechSynthesis?.cancel(); return 0; }
            setRound((r) => r + 1);
          }
          setPhaseIdx(nextIdx);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current!);
  }, [running, phaseIdx, selected, round, voiceOn]);

  const startSession = (p: Pattern) => {
    setSelected(p); setPhaseIdx(0); setRound(1); setCompleted(false); setRunning(true);
  };
  const stop = () => { clearInterval(intervalRef.current!); setRunning(false); setSelected(null); window.speechSynthesis?.cancel(); };

  const phase = selected?.phases[phaseIdx];
  const progress = phase ? (phase.duration - count) / phase.duration : 0;
  const scale = phase?.label === "Inhale" ? 1 + progress * 0.3 : phase?.label === "Exhale" ? 1.3 - progress * 0.3 : 1.15;

  if (completed && selected) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{ background: DONE_BG }}>
        <div className="w-24 h-24 rounded-full flex items-center justify-center mb-6" style={{ background: PURPLE }}>
          <Check className="w-12 h-12" style={{ color: "white" }} />
        </div>
        <h2 className="text-2xl mb-2 text-center" style={{ fontFamily: "Lora, serif", fontWeight: 500, color: "#15113C" }}>Session Complete</h2>
        <p className="text-sm mb-10 text-center" style={{ fontFamily: "Inter, sans-serif", color: "#6B7280" }}>
          {totalRounds} rounds of {selected.name} breathing
        </p>
        <button onClick={onDone} className="cb-btn-primary" style={{ maxWidth: "240px" }}>
          Done
        </button>
      </div>
    );
  }

  if (running && selected) {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: PAGE_BG, padding: "16px" }}>
        <div className="flex items-center justify-between pt-8 pb-4">
          <button onClick={stop} className="cb-btn-icon">
            <ArrowLeft className="w-5 h-5" style={{ color: "#15113C" }} />
          </button>
          <p className="text-sm" style={{ fontFamily: "Inter, sans-serif", color: "#6B7280" }}>Round {round}/{totalRounds}</p>
          <button onClick={toggleVoice} className="cb-btn-icon" style={{ background: voiceOn ? "#EDE9FE" : "rgba(255,255,255,0.7)", border: voiceOn ? "1.5px solid #C4B5FD" : "1.5px solid rgba(0,0,0,0.08)" }}>
            {voiceOn ? <Mic className="w-4 h-4" style={{ color: PURPLE }} /> : <MicOff className="w-4 h-4" style={{ color: "#9CA3AF" }} />}
          </button>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="relative flex items-center justify-center mb-10" style={{ width: 220, height: 220 }}>
            <div className="absolute rounded-full transition-all" style={{ width: 160 * scale, height: 160 * scale, background: "rgba(139,92,246,0.12)", transition: "width 0.8s ease, height 0.8s ease" }} />
            <div className="absolute rounded-full transition-all" style={{ width: 120 * scale, height: 120 * scale, background: "rgba(139,92,246,0.22)", transition: "width 0.8s ease, height 0.8s ease" }} />
            <div className="w-20 h-20 rounded-full flex flex-col items-center justify-center" style={{ background: PURPLE, zIndex: 10 }}>
              <span className="text-2xl" style={{ color: "white", fontFamily: "Inter, sans-serif", fontWeight: 700 }}>{count}</span>
            </div>
          </div>
          <h2 className="text-3xl mb-2" style={{ fontFamily: "Lora, serif", fontWeight: 500, color: "#15113C" }}>{phase?.label}</h2>
          <p className="text-sm" style={{ fontFamily: "Inter, sans-serif", color: "#6B7280" }}>{selected.name}</p>
        </div>
        <button onClick={stop} className="cb-btn-ghost mx-6 mb-8">
          Stop session
        </button>
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
          <h1 className="text-2xl" style={{ fontFamily: "Lora, serif", fontWeight: 500, color: "#15113C" }}>Breath Loops</h1>
          <p className="text-xs" style={{ fontFamily: "Inter, sans-serif", color: "#9CA3AF" }}>Choose a breathing pattern</p>
        </div>
      </div>
      <div className="space-y-4 mt-2">
        {patterns.map((p) => (
          <button
            key={p.id}
            onClick={() => startSession(p)}
            className="w-full p-5 rounded-3xl flex items-center gap-4 text-left transition-all active:scale-95"
            style={{ background: "rgba(255,255,255,0.8)", border: "1.5px solid rgba(139,92,246,0.15)" }}
          >
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: PURPLE }}>
              <Wind className="w-7 h-7" style={{ color: "white" }} />
            </div>
            <div className="flex-1">
              <h3 className="text-base mb-0.5" style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, color: "#15113C" }}>{p.name}</h3>
              <p className="text-xs mb-2" style={{ fontFamily: "Inter, sans-serif", color: "#6B7280" }}>{p.subtitle}</p>
              <div className="flex gap-2 flex-wrap">
                {p.phases.map((ph, i) => (
                  <span key={i} className="px-2 py-0.5 rounded-md text-xs" style={{ background: p.chipBg, color: "#15113C", fontWeight: 600 }}>
                    {ph.label} {ph.duration}s
                  </span>
                ))}
              </div>
            </div>
            <ChevronRight className="w-5 h-5" style={{ color: PURPLE }} />
          </button>
        ))}
      </div>
    </div>
  );
}
