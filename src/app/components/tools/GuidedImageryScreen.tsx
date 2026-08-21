import { useState } from "react";
import { ArrowLeft, Check, Mic, MicOff } from "lucide-react";

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
  {
    id: "forest",
    name: "Forest Sanctuary",
    photo: "https://images.unsplash.com/photo-1544039161-b0c20826c6f6?w=800&h=1200&fit=crop&auto=format",
    thumb: "https://images.unsplash.com/photo-1544039161-b0c20826c6f6?w=400&h=240&fit=crop&auto=format",
  },
  {
    id: "ocean",
    name: "Ocean Shore",
    photo: "https://images.unsplash.com/photo-1618413002870-00a51e1c2bb6?w=800&h=1200&fit=crop&auto=format",
    thumb: "https://images.unsplash.com/photo-1618413002870-00a51e1c2bb6?w=400&h=240&fit=crop&auto=format",
  },
  {
    id: "mountain",
    name: "Mountain Peak",
    photo: "https://images.unsplash.com/photo-1589887305888-6254d60b5308?w=800&h=1200&fit=crop&auto=format",
    thumb: "https://images.unsplash.com/photo-1589887305888-6254d60b5308?w=400&h=240&fit=crop&auto=format",
  },
  {
    id: "meadow",
    name: "Sunlit Meadow",
    photo: "https://images.unsplash.com/photo-1782332576168-159393638224?w=800&h=1200&fit=crop&auto=format",
    thumb: "https://images.unsplash.com/photo-1782332576168-159393638224?w=400&h=240&fit=crop&auto=format",
  },
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

export function GuidedImageryScreen({ onDone }: GuidedImageryScreenProps) {
  const [landscape, setLandscape] = useState<string | null>(null);
  const [stepIdx, setStepIdx] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [voiceOn, setVoiceOn] = useState(false);

  const land = landscapes.find((l) => l.id === landscape);
  const script = landscape ? scripts[landscape] : [];

  const toggleVoice = () => {
    if (voiceOn) {
      window.speechSynthesis?.cancel();
      setVoiceOn(false);
    } else {
      setVoiceOn(true);
      if (landscape) speakText(scripts[landscape][stepIdx]);
    }
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
    setLandscape(id);
    setStepIdx(0);
    setCompleted(false);
    if (voiceOn) speakText(scripts[id][0]);
  };

  // --- Completion screen ---
  if (completed && land) {
    return (
      <div
        style={{
          minHeight: "100vh",
          position: "relative",
          backgroundImage: `url(${land.photo})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
        }}
      >
        {/* Full overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(10,5,25,0.6)",
          }}
        />

        {/* Central content */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            maxWidth: 320,
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.15)",
              border: "2px solid rgba(255,255,255,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 24,
            }}
          >
            <Check style={{ width: 36, height: 36, color: "white", strokeWidth: 1.75 }} />
          </div>

          <h2
            style={{
              fontFamily: "Lora, serif",
              fontWeight: 500,
              fontSize: "1.6rem",
              color: "white",
              marginBottom: 12,
              lineHeight: 1.3,
            }}
          >
            Journey complete
          </h2>

          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "0.9rem",
              color: "rgba(255,255,255,0.75)",
              lineHeight: 1.65,
              marginBottom: 40,
            }}
          >
            Carry this feeling with you. The {land.name.toLowerCase()} is always within reach.
          </p>

          <button
            onClick={onDone}
            style={{
              width: "100%",
              padding: "14px 0",
              borderRadius: 999,
              background: "white",
              border: "none",
              color: "#0A0519",
              fontFamily: "Inter, sans-serif",
              fontWeight: 700,
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  // --- Session screen ---
  if (landscape && land) {
    const progress = ((stepIdx + 1) / script.length) * 100;

    return (
      <div
        style={{
          minHeight: "100vh",
          position: "relative",
          backgroundImage: `url(${land.photo})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dual gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(10,5,25,0.55) 0%, rgba(10,5,25,0.05) 45%, rgba(10,5,25,0.6) 75%, rgba(10,5,25,0.9) 100%)",
          }}
        />

        {/* Header */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 10,
            padding: "52px 16px 12px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 14,
            }}
          >
            {/* Back button */}
            <button
              onClick={() => {
                setLandscape(null);
                setStepIdx(0);
                window.speechSynthesis?.cancel();
              }}
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "rgba(0,0,0,0.35)",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                flexShrink: 0,
              }}
            >
              <ArrowLeft style={{ width: 20, height: 20, color: "white" }} />
            </button>

            {/* Title + scene counter */}
            <div style={{ flex: 1, marginLeft: 12, marginRight: 12 }}>
              <div
                style={{
                  fontFamily: "Lora, serif",
                  fontWeight: 500,
                  fontSize: "1.15rem",
                  color: "white",
                  lineHeight: 1.2,
                }}
              >
                {land.name}
              </div>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.75rem",
                  color: "rgba(255,255,255,0.7)",
                  marginTop: 2,
                }}
              >
                Scene {stepIdx + 1} of {script.length}
              </div>
            </div>

            {/* Voice toggle */}
            <button
              onClick={toggleVoice}
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "rgba(0,0,0,0.35)",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                flexShrink: 0,
              }}
            >
              {voiceOn
                ? <Mic style={{ width: 20, height: 20, color: "white" }} />
                : <MicOff style={{ width: 20, height: 20, color: "white" }} />}
            </button>
          </div>

          {/* Progress bar */}
          <div
            style={{
              height: 3,
              borderRadius: 999,
              background: "rgba(255,255,255,0.3)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                borderRadius: 999,
                background: "white",
                width: `${progress}%`,
                transition: "width 0.5s ease",
              }}
            />
          </div>
        </div>

        {/* Lower portion */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 10,
            padding: 16,
            paddingBottom: 36,
          }}
        >
          {/* Frosted glass text card */}
          <div
            style={{
              background: "rgba(255,255,255,0.12)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 24,
              padding: 24,
              marginBottom: 16,
            }}
          >
            <p
              style={{
                fontFamily: "Lora, serif",
                fontStyle: "italic",
                fontSize: "1rem",
                color: "white",
                lineHeight: 1.85,
                margin: 0,
              }}
            >
              {script[stepIdx]}
            </p>
          </div>

          {/* Continue button */}
          <button
            onClick={handleNext}
            style={{
              width: "100%",
              padding: "14px 0",
              borderRadius: 999,
              background: "rgba(255,255,255,0.22)",
              border: "1.5px solid rgba(255,255,255,0.35)",
              color: "white",
              fontFamily: "Inter, sans-serif",
              fontWeight: 700,
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            {stepIdx < script.length - 1 ? "Continue" : "Complete journey"}
          </button>
        </div>
      </div>
    );
  }

  // --- Selection screen ---
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #EDE9FE 0%, #F5F3FF 100%)",
        padding: "16px",
        paddingBottom: 40,
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 40, paddingBottom: 24 }}>
        <button
          onClick={onDone}
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.7)",
            border: "1.5px solid rgba(0,0,0,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          <ArrowLeft style={{ width: 20, height: 20, color: "#15113C" }} />
        </button>
        <div>
          <h1
            style={{
              fontFamily: "Lora, serif",
              fontWeight: 500,
              fontSize: "1.5rem",
              color: "#15113C",
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            Guided Imagery
          </h1>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "0.78rem",
              color: "#9CA3AF",
              margin: "4px 0 0",
            }}
          >
            Choose your landscape
          </p>
        </div>
      </div>

      {/* 2x2 grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12,
        }}
      >
        {landscapes.map((l) => (
          <button
            key={l.id}
            onClick={() => handleSelectLandscape(l.id)}
            style={{
              position: "relative",
              minHeight: 160,
              borderRadius: 20,
              overflow: "hidden",
              border: "none",
              cursor: "pointer",
              padding: 0,
              backgroundImage: `url(${l.thumb})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Dark gradient overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(10,5,25,0.8) 0%, rgba(10,5,25,0.1) 60%, transparent 100%)",
              }}
            />

            {/* Landscape name — bottom left */}
            <div
              style={{
                position: "absolute",
                bottom: 12,
                left: 14,
                fontFamily: "Lora, serif",
                fontWeight: 500,
                fontSize: "0.95rem",
                color: "white",
                textAlign: "left",
                lineHeight: 1.2,
              }}
            >
              {l.name}
            </div>

            {/* Arrow — bottom right */}
            <div
              style={{
                position: "absolute",
                bottom: 12,
                right: 14,
                fontFamily: "Inter, sans-serif",
                fontSize: "1rem",
                color: "white",
                lineHeight: 1,
              }}
            >
              →
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
