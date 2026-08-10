import { useState, useEffect } from "react";
import { ArrowLeft, Check, Play, Pause, Mic, MicOff, Brain, Smile, Heart, Wind, Circle, Leaf, ChevronsDown, Footprints } from "lucide-react";

function speakText(text: string) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  utt.rate = 0.85; utt.pitch = 1;
  const preferred = window.speechSynthesis.getVoices().find(v => v.name.includes("Samantha") || v.name.includes("Karen") || v.name.includes("Google US English Female"));
  if (preferred) utt.voice = preferred;
  window.speechSynthesis.speak(utt);
}

interface BodyScanScreenProps {
  onDone: () => void;
}

const zones = [
  { id: "head",  label: "Crown & Head",     instruction: "Bring gentle attention to the top of your head. Notice any tension, tingling, or sensation — without trying to change it.", Icon: Brain,       y: 5 },
  { id: "face",  label: "Face & Jaw",       instruction: "Soften your forehead, your eyes, your cheeks. Let your jaw be heavy. Notice if you're holding tension here.",              Icon: Smile,       y: 15 },
  { id: "neck",  label: "Neck & Shoulders", instruction: "Notice the weight of your head on your neck. Let your shoulders drop. Release what you've been carrying.",                  Icon: Wind,        y: 25 },
  { id: "chest", label: "Chest & Heart",    instruction: "Place your awareness at the center of your chest. Notice your heartbeat. Each breath opens this space a little more.",       Icon: Heart,       y: 38 },
  { id: "belly", label: "Belly & Core",     instruction: "Feel the rise and fall of your belly. This is your center. Let it soften. You are held.",                                   Icon: Circle,      y: 52 },
  { id: "hips",  label: "Hips & Lower Back",instruction: "Feel the contact between your body and the surface beneath you. Let your hips be heavy. Fully supported.",                  Icon: Leaf,        y: 63 },
  { id: "legs",  label: "Legs & Knees",     instruction: "Scan down through your thighs, knees, calves. Notice any buzzing, warmth, or stillness. Just observe.",                    Icon: ChevronsDown,y: 76 },
  { id: "feet",  label: "Feet & Toes",      instruction: "Arrive at your feet. Notice the tips of your toes. You are fully present in your body — grounded, awake, alive.",           Icon: Footprints,  y: 90 },
];

const PURPLE = "#8B5CF6";
const PAGE_BG = "linear-gradient(180deg, #EDE9FE 0%, #F5F3FF 100%)";
const DONE_BG = "linear-gradient(135deg, #EDE9FE 0%, #C4B5FD 100%)";

export function BodyScanScreen({ onDone }: BodyScanScreenProps) {
  const [started, setStarted] = useState(false);
  const [zoneIdx, setZoneIdx] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [countdown, setCountdown] = useState(12);
  const [voiceOn, setVoiceOn] = useState(false);

  const toggleVoice = () => {
    if (voiceOn) { window.speechSynthesis?.cancel(); setVoiceOn(false); }
    else { setVoiceOn(true); if (started) speakText(zones[zoneIdx].instruction); }
  };

  useEffect(() => {
    if (!started || !autoPlay) return;
    const t = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          if (zoneIdx < zones.length - 1) {
            const next = zoneIdx + 1;
            setZoneIdx(next);
            if (voiceOn) speakText(zones[next].instruction);
            return 12;
          } else { setCompleted(true); window.speechSynthesis?.cancel(); return 0; }
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [started, autoPlay, zoneIdx, voiceOn]);

  const advance = () => {
    if (zoneIdx < zones.length - 1) {
      const next = zoneIdx + 1;
      setZoneIdx(next); setCountdown(12);
      if (voiceOn) speakText(zones[next].instruction);
    } else { setCompleted(true); window.speechSynthesis?.cancel(); }
  };

  const handleStart = () => {
    setStarted(true);
    if (voiceOn) speakText(zones[0].instruction);
  };

  if (completed) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{ background: DONE_BG }}>
        <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6" style={{ background: PURPLE }}>
          <Leaf className="w-10 h-10" style={{ color: "white", strokeWidth: 1.5 }} />
        </div>
        <h2 className="text-2xl mb-3 text-center" style={{ fontFamily: "Lora, serif", fontWeight: 500, color: "#15113C" }}>Body scan complete</h2>
        <p className="text-sm mb-10 text-center max-w-xs" style={{ fontFamily: "Inter, sans-serif", color: "#4C1D95", lineHeight: 1.6 }}>
          You've returned to your body. Carry this awareness into your day.
        </p>
        <button onClick={onDone} className="cb-btn-primary max-w-xs">Done</button>
      </div>
    );
  }

  if (!started) {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: PAGE_BG, padding: "16px" }}>
        <div className="flex items-center gap-3 pt-8 pb-6">
          <button onClick={onDone} className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.7)", border: "1.5px solid rgba(0,0,0,0.08)" }}>
            <ArrowLeft className="w-5 h-5" style={{ color: "#15113C" }} />
          </button>
          <div>
            <h1 className="text-2xl" style={{ fontFamily: "Lora, serif", fontWeight: 500, color: "#15113C" }}>Body Scan</h1>
            <p className="text-xs" style={{ fontFamily: "Inter, sans-serif", color: "#9CA3AF" }}>~3 minutes · grounding & awareness</p>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center gap-6 px-4">
          <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "#EDE9FE" }}>
            <Brain className="w-8 h-8" style={{ color: PURPLE, strokeWidth: 1.5 }} />
          </div>
          <div className="p-6 rounded-3xl text-center" style={{ background: "rgba(255,255,255,0.8)", border: "1.5px solid rgba(139,92,246,0.15)" }}>
            <p className="text-base mb-2" style={{ fontFamily: "Lora, serif", color: "#15113C", lineHeight: 1.7 }}>
              Find a comfortable position — seated or lying down.
            </p>
            <p className="text-sm" style={{ fontFamily: "Inter, sans-serif", color: "#6B7280", lineHeight: 1.6 }}>
              We'll move slowly through 8 zones of your body, spending 12 seconds with each. You can tap to advance manually at any time.
            </p>
          </div>
        </div>
        <button onClick={handleStart} className="cb-btn-primary mx-4 mb-8">
          Begin body scan
        </button>
      </div>
    );
  }

  const zone = zones[zoneIdx];
  return (
    <div className="min-h-screen flex flex-col" style={{ background: PAGE_BG, padding: "16px" }}>
      <div className="flex items-center justify-between pt-8 pb-4">
        <button onClick={onDone} className="cb-btn-icon">
          <ArrowLeft className="w-5 h-5" style={{ color: "#15113C" }} />
        </button>
        <p className="text-sm" style={{ fontFamily: "Inter, sans-serif", color: "#6B7280" }}>{zoneIdx + 1} / {zones.length}</p>
        <div className="flex items-center gap-2">
          <button onClick={toggleVoice} className="cb-btn-icon" style={{ background: voiceOn ? "#EDE9FE" : "rgba(255,255,255,0.7)", border: voiceOn ? "1.5px solid #C4B5FD" : "1.5px solid rgba(0,0,0,0.08)" }}>
            {voiceOn ? <Mic className="w-4 h-4" style={{ color: PURPLE }} /> : <MicOff className="w-4 h-4" style={{ color: "#9CA3AF" }} />}
          </button>
          <button onClick={() => setAutoPlay((p) => !p)} className="cb-btn-icon">
            {autoPlay ? <Pause className="w-4 h-4" style={{ color: "#15113C" }} /> : <Play className="w-4 h-4" style={{ color: "#15113C" }} />}
          </button>
        </div>
      </div>

      <div className="h-1.5 rounded-full mb-6" style={{ background: "#E5E7EB" }}>
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${((zoneIdx + 1) / zones.length) * 100}%`, background: PURPLE }} />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-6">
        <div className="relative flex items-center justify-center" style={{ width: 100, height: 220 }}>
          <div className="absolute inset-0 rounded-full" style={{ background: "rgba(139,92,246,0.08)" }} />
          <div style={{ position: "absolute", top: `${zone.y}%`, transform: "translateY(-50%)" }}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "#EDE9FE" }}>
              <zone.Icon className="w-5 h-5" style={{ color: PURPLE, strokeWidth: 2 }} />
            </div>
          </div>
        </div>
        <div className="w-full p-6 rounded-3xl text-center" style={{ background: "rgba(255,255,255,0.8)", border: "1.5px solid rgba(139,92,246,0.15)" }}>
          <h2 className="text-xl mb-3" style={{ fontFamily: "Lora, serif", fontWeight: 500, color: "#15113C" }}>{zone.label}</h2>
          <p className="text-sm" style={{ fontFamily: "Inter, sans-serif", color: "#6B7280", lineHeight: 1.7 }}>{zone.instruction}</p>
          {autoPlay && (
            <div className="mt-4 flex items-center justify-center gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: PURPLE }}>
                <span className="text-xs" style={{ color: "white", fontFamily: "Inter, sans-serif", fontWeight: 700 }}>{countdown}</span>
              </div>
              <span className="text-xs" style={{ fontFamily: "Inter, sans-serif", color: "#9CA3AF" }}>next zone</span>
            </div>
          )}
        </div>
      </div>

      <button onClick={advance} className="cb-btn-primary mb-6">
        {zoneIdx < zones.length - 1 ? "Next zone →" : "Complete scan"}
      </button>
    </div>
  );
}
