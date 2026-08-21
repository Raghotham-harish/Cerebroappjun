import { useState, useEffect } from "react";
import { ArrowLeft, Pause, Play, Check, Mic, MicOff, SkipForward } from "lucide-react";

function speakText(text: string) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  utt.rate = 0.85; utt.pitch = 1;
  const preferred = window.speechSynthesis.getVoices().find(
    v => v.name.includes("Samantha") || v.name.includes("Karen") || v.name.includes("Google US English Female")
  );
  if (preferred) utt.voice = preferred;
  window.speechSynthesis.speak(utt);
}

interface BodyScanScreenProps {
  onDone: () => void;
}

const zones = [
  { id: "head",  zoneKey: "crown",   label: "Crown & Head",      instruction: "Bring gentle attention to the top of your head. Notice any tension, tingling, or sensation — without trying to change it." },
  { id: "face",  zoneKey: "face",    label: "Face & Jaw",        instruction: "Soften your forehead, your eyes, your cheeks. Let your jaw be heavy. Notice if you're holding tension here." },
  { id: "neck",  zoneKey: "throat",  label: "Neck & Shoulders",  instruction: "Notice the weight of your head on your neck. Let your shoulders drop. Release what you've been carrying." },
  { id: "chest", zoneKey: "chest",   label: "Chest & Heart",     instruction: "Place your awareness at the center of your chest. Notice your heartbeat. Each breath opens this space a little more." },
  { id: "belly", zoneKey: "abdomen", label: "Belly & Core",      instruction: "Feel the rise and fall of your belly. This is your center. Let it soften. You are held." },
  { id: "hips",  zoneKey: "hips",    label: "Hips & Lower Back", instruction: "Feel the contact between your body and the surface beneath you. Let your hips be heavy. Fully supported." },
  { id: "legs",  zoneKey: "legs",    label: "Legs & Knees",      instruction: "Scan down through your thighs, knees, calves. Notice any buzzing, warmth, or stillness. Just observe." },
  { id: "feet",  zoneKey: "feet",    label: "Feet & Toes",       instruction: "Arrive at your feet. Notice the tips of your toes. You are fully present in your body — grounded, awake, alive." },
];

const ZONE_HIGHLIGHTS: Record<string, { d?: string; cx?: number; cy?: number; rx?: number; ry?: number; type: "ellipse" | "path" }> = {
  crown:   { type: "ellipse", cx: 60, cy: 18,  rx: 18, ry: 12 },
  face:    { type: "ellipse", cx: 60, cy: 32,  rx: 16, ry: 14 },
  throat:  { type: "ellipse", cx: 60, cy: 58,  rx: 10, ry: 8  },
  chest:   { type: "ellipse", cx: 60, cy: 95,  rx: 28, ry: 20 },
  abdomen: { type: "ellipse", cx: 60, cy: 140, rx: 26, ry: 22 },
  hips:    { type: "ellipse", cx: 60, cy: 195, rx: 30, ry: 16 },
  legs:    { type: "ellipse", cx: 60, cy: 250, rx: 28, ry: 30 },
  feet:    { type: "ellipse", cx: 60, cy: 292, rx: 20, ry: 10 },
};

const PURPLE = "#8B5CF6";
const BODY_FILL = "#EDE9FE";
const BODY_STROKE = "#C4B5FD";
const PAGE_BG = "linear-gradient(180deg, #EDE9FE 0%, #F5F3FF 100%)";
const DONE_BG = "linear-gradient(135deg, #EDE9FE 0%, #C4B5FD 100%)";

const PULSE_STYLE = `
@keyframes bodyZonePulse {
  0%, 100% { opacity: 0.35; }
  50%       { opacity: 0.6;  }
}
`;

function BodySilhouette({ activeZoneKey }: { activeZoneKey: string }) {
  const highlight = ZONE_HIGHLIGHTS[activeZoneKey];
  const body = { fill: BODY_FILL, stroke: BODY_STROKE, strokeWidth: 1.5 };
  const pulseStyle: React.CSSProperties = { animation: "bodyZonePulse 2s ease-in-out infinite" };

  return (
    <svg viewBox="0 0 120 320" width="120" height="320" xmlns="http://www.w3.org/2000/svg">
      <style>{PULSE_STYLE}</style>

      {/* Head */}
      <ellipse cx="60" cy="28" rx="22" ry="26" {...body} />
      {/* Neck */}
      <rect x="53" y="52" width="14" height="16" rx="4" {...body} />
      {/* Torso */}
      <path d="M28 68 L92 68 L96 180 L24 180 Z" {...body} />
      {/* Left upper arm */}
      <path d="M28 68 L8 160 L14 162 L33 72 Z" {...body} />
      {/* Right upper arm */}
      <path d="M92 68 L112 160 L106 162 L87 72 Z" {...body} />
      {/* Left forearm/hand */}
      <path d="M8 160 L6 200 L18 200 L14 162 Z" {...body} />
      {/* Right forearm/hand */}
      <path d="M112 160 L114 200 L102 200 L106 162 Z" {...body} />
      {/* Hips */}
      <path d="M24 180 L96 180 L100 220 L20 220 Z" {...body} />
      {/* Left leg */}
      <path d="M20 220 L18 290 L42 290 L46 220 Z" {...body} />
      {/* Right leg */}
      <path d="M74 220 L78 290 L102 290 L100 220 Z" {...body} />

      {/* Active zone highlight overlay */}
      {highlight && highlight.type === "ellipse" && (
        <ellipse
          cx={highlight.cx}
          cy={highlight.cy}
          rx={highlight.rx}
          ry={highlight.ry}
          fill="rgba(139,92,246,0.35)"
          stroke={PURPLE}
          strokeWidth={2}
          style={pulseStyle}
        />
      )}
      {highlight && highlight.type === "path" && (
        <path
          d={highlight.d}
          fill="rgba(139,92,246,0.35)"
          stroke={PURPLE}
          strokeWidth={2}
          style={pulseStyle}
        />
      )}
    </svg>
  );
}

export function BodyScanScreen({ onDone }: BodyScanScreenProps) {
  const [started, setStarted] = useState(false);
  const [zoneIdx, setZoneIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(12);
  const [voiceOn, setVoiceOn] = useState(false);

  const toggleVoice = () => {
    if (voiceOn) {
      window.speechSynthesis?.cancel();
      setVoiceOn(false);
    } else {
      setVoiceOn(true);
      if (started) speakText(zones[zoneIdx].instruction);
    }
  };

  useEffect(() => {
    if (!started || paused) return;
    const t = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (zoneIdx < zones.length - 1) {
            const next = zoneIdx + 1;
            setZoneIdx(next);
            if (voiceOn) speakText(zones[next].instruction);
            return 12;
          } else {
            setCompleted(true);
            window.speechSynthesis?.cancel();
            return 0;
          }
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [started, paused, zoneIdx, voiceOn]);

  const advance = () => {
    if (zoneIdx < zones.length - 1) {
      const next = zoneIdx + 1;
      setZoneIdx(next);
      setTimeLeft(12);
      if (voiceOn) speakText(zones[next].instruction);
    } else {
      setCompleted(true);
      window.speechSynthesis?.cancel();
    }
  };

  const handleStart = () => {
    setStarted(true);
    if (voiceOn) speakText(zones[0].instruction);
  };

  /* ── Completion screen ─────────────────────────────────────────── */
  if (completed) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-6"
        style={{ background: DONE_BG }}
      >
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
          style={{ background: PURPLE }}
        >
          <Check className="w-10 h-10" style={{ color: "white", strokeWidth: 1.75 }} />
        </div>
        <h2
          className="text-2xl mb-3 text-center"
          style={{ fontFamily: "Lora, serif", fontWeight: 500, color: "#15113C" }}
        >
          Body scan complete
        </h2>
        <p
          className="text-sm mb-10 text-center max-w-xs"
          style={{ fontFamily: "Inter, sans-serif", color: "#4C1D95", lineHeight: 1.6 }}
        >
          You've returned to your body. Carry this awareness into your day.
        </p>
        <button onClick={onDone} className="cb-btn-primary max-w-xs">
          Done
        </button>
      </div>
    );
  }

  /* ── Intro screen ─────────────────────────────────────────────── */
  if (!started) {
    return (
      <div
        className="min-h-screen flex flex-col"
        style={{ background: PAGE_BG, padding: "16px" }}
      >
        <div className="flex items-center gap-3 pt-8 pb-6">
          <button
            onClick={onDone}
            className="w-11 h-11 rounded-full flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.7)", border: "1.5px solid rgba(0,0,0,0.08)" }}
          >
            <ArrowLeft className="w-5 h-5" style={{ color: "#15113C" }} />
          </button>
          <div>
            <h1
              className="text-2xl"
              style={{ fontFamily: "Lora, serif", fontWeight: 500, color: "#15113C" }}
            >
              Body Scan
            </h1>
            <p
              className="text-xs"
              style={{ fontFamily: "Inter, sans-serif", color: "#9CA3AF" }}
            >
              ~3 minutes · grounding & awareness
            </p>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center gap-6 px-4">
          <div style={{ maxWidth: 140, margin: "0 auto" }}>
            <BodySilhouette activeZoneKey="crown" />
          </div>
          <div
            className="p-6 rounded-3xl text-center"
            style={{
              background: "rgba(255,255,255,0.8)",
              border: "1.5px solid rgba(139,92,246,0.15)",
            }}
          >
            <p
              className="text-base mb-2"
              style={{ fontFamily: "Lora, serif", color: "#15113C", lineHeight: 1.7 }}
            >
              Find a comfortable position — seated or lying down.
            </p>
            <p
              className="text-sm"
              style={{ fontFamily: "Inter, sans-serif", color: "#6B7280", lineHeight: 1.6 }}
            >
              We'll move slowly through 8 zones of your body, spending 12 seconds with each.
              You can tap to advance manually at any time.
            </p>
          </div>
        </div>

        <button onClick={handleStart} className="cb-btn-primary mx-4 mb-8">
          Begin body scan
        </button>
      </div>
    );
  }

  /* ── Active scan screen ───────────────────────────────────────── */
  const zone = zones[zoneIdx];
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: PAGE_BG, padding: "16px" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between pt-8 pb-3">
        <button onClick={onDone} className="cb-btn-icon">
          <ArrowLeft className="w-5 h-5" style={{ color: "#15113C" }} />
        </button>

        <div className="flex flex-col items-center">
          <p
            className="text-base"
            style={{ fontFamily: "Lora, serif", fontWeight: 500, color: "#15113C" }}
          >
            Body Scan
          </p>
          <span
            className="text-xs font-semibold px-3 py-0.5 rounded-full mt-1"
            style={{
              background: "#EDE9FE",
              color: PURPLE,
              fontFamily: "Inter, sans-serif",
              letterSpacing: "0.12em",
            }}
          >
            {zone.zoneKey.toUpperCase()}
          </span>
        </div>

        <button
          onClick={toggleVoice}
          className="cb-btn-icon"
          style={{
            background: voiceOn ? "#EDE9FE" : "rgba(255,255,255,0.7)",
            border: voiceOn ? "1.5px solid #C4B5FD" : "1.5px solid rgba(0,0,0,0.08)",
          }}
        >
          {voiceOn ? (
            <Mic className="w-4 h-4" style={{ color: PURPLE }} />
          ) : (
            <MicOff className="w-4 h-4" style={{ color: "#9CA3AF" }} />
          )}
        </button>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 rounded-full mb-4" style={{ background: "#E5E7EB" }}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${((zoneIdx + 1) / zones.length) * 100}%`,
            background: PURPLE,
          }}
        />
      </div>

      {/* Body silhouette */}
      <div style={{ maxWidth: 140, margin: "0 auto" }}>
        <BodySilhouette activeZoneKey={zone.zoneKey} />
      </div>

      {/* Countdown badge */}
      <div className="flex items-center justify-center mt-3 mb-4">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{
            background: PURPLE,
            boxShadow: "0 0 0 5px rgba(139,92,246,0.15)",
          }}
        >
          <span
            className="text-lg font-bold"
            style={{ color: "white", fontFamily: "Inter, sans-serif" }}
          >
            {timeLeft}
          </span>
        </div>
      </div>

      {/* Instruction card */}
      <div
        className="w-full p-5 rounded-3xl text-center"
        style={{
          background: "rgba(255,255,255,0.8)",
          border: "1.5px solid rgba(139,92,246,0.15)",
          backdropFilter: "blur(8px)",
        }}
      >
        <h2
          className="text-lg mb-2"
          style={{ fontFamily: "Lora, serif", fontWeight: 500, color: "#15113C" }}
        >
          {zone.label}
        </h2>
        <p
          className="text-sm"
          style={{ fontFamily: "Inter, sans-serif", color: "#6B7280", lineHeight: 1.7 }}
        >
          {zone.instruction}
        </p>
      </div>

      {/* Controls */}
      <div className="mt-5 flex flex-col items-center gap-3 mb-4">
        <button
          onClick={() => setPaused((p) => !p)}
          className="w-full rounded-full py-3 flex items-center justify-center gap-2"
          style={{
            background: PURPLE,
            color: "white",
            fontFamily: "Inter, sans-serif",
            fontWeight: 500,
            fontSize: 15,
            border: "none",
          }}
        >
          {paused ? (
            <>
              <Play className="w-4 h-4" />
              Resume
            </>
          ) : (
            <>
              <Pause className="w-4 h-4" />
              Pause
            </>
          )}
        </button>

        <button
          onClick={advance}
          className="flex items-center gap-1 text-sm"
          style={{
            color: "#9CA3AF",
            fontFamily: "Inter, sans-serif",
            background: "none",
            border: "none",
            cursor: "pointer",
            minHeight: 44,
          }}
        >
          <SkipForward className="w-4 h-4" />
          Skip zone
        </button>
      </div>
    </div>
  );
}
