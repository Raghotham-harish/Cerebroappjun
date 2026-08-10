import { useState } from "react";
import { ArrowLeft, Check, Plus, X, Mic, MicOff, Sparkles, PenLine } from "lucide-react";

function speakText(text: string) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  utt.rate = 0.85; utt.pitch = 1;
  const preferred = window.speechSynthesis.getVoices().find(v => v.name.includes("Samantha") || v.name.includes("Karen") || v.name.includes("Google US English Female"));
  if (preferred) utt.voice = preferred;
  window.speechSynthesis.speak(utt);
}

interface AffirmationsScreenProps {
  onDone: () => void;
}

// semantic tag colours only (chip-level, not page backgrounds)
const presets = [
  { category: "Strength",   chipBg: "#BBF7D0", affirmations: ["I am capable of handling what comes my way.", "I grow stronger with every challenge I face.", "I trust in my own resilience."] },
  { category: "Calm",       chipBg: "#BFDBFE", affirmations: ["I am allowed to take up space and move slowly.", "Peace is available to me in this moment.", "I breathe, and in breathing, I return to myself."] },
  { category: "Self-Worth", chipBg: "#FBCFE8", affirmations: ["I am worthy of love — not because of what I do, but because I exist.", "My value does not depend on my productivity.", "I am enough, exactly as I am."] },
  { category: "Clarity",    chipBg: "#C4B5FD", affirmations: ["My mind is clear and open to new possibilities.", "I trust the process, even when I can't see the full picture.", "I move forward with courage and intention."] },
];

const PURPLE = "#8B5CF6";
const PAGE_BG = "linear-gradient(180deg, #EDE9FE 0%, #F5F3FF 100%)";
const DONE_BG = "linear-gradient(135deg, #EDE9FE 0%, #C4B5FD 100%)";

export function AffirmationsScreen({ onDone }: AffirmationsScreenProps) {
  const [view, setView] = useState<"home" | "browse" | "practice" | "builder">("home");
  const [selectedCategory, setSelectedCategory] = useState<typeof presets[0] | null>(null);
  const [affirmationIdx, setAffirmationIdx] = useState(0);
  const [custom, setCustom] = useState<string[]>([]);
  const [newAff, setNewAff] = useState("");
  const [done, setDone] = useState(false);
  const [voiceOn, setVoiceOn] = useState(false);

  const toggleVoice = () => {
    if (voiceOn) { window.speechSynthesis?.cancel(); setVoiceOn(false); }
    else { setVoiceOn(true); if (selectedCategory) speakText(selectedCategory.affirmations[affirmationIdx]); }
  };

  const startPractice = (cat: typeof presets[0]) => {
    setSelectedCategory(cat); setAffirmationIdx(0); setDone(false); setView("practice");
    if (voiceOn) speakText(cat.affirmations[0]);
  };

  const handlePracticeNext = () => {
    if (selectedCategory && affirmationIdx < selectedCategory.affirmations.length - 1) {
      const next = affirmationIdx + 1;
      setAffirmationIdx(next);
      if (voiceOn) speakText(selectedCategory.affirmations[next]);
    } else {
      window.speechSynthesis?.cancel();
      setDone(true);
    }
  };

  if (done) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{ background: DONE_BG }}>
        <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6" style={{ background: PURPLE }}>
          <Sparkles className="w-10 h-10" style={{ color: "white", strokeWidth: 1.5 }} />
        </div>
        <h2 className="text-2xl mb-3 text-center" style={{ fontFamily: "Lora, serif", fontWeight: 500, color: "#15113C" }}>Words absorbed</h2>
        <p className="text-sm mb-10 text-center max-w-xs" style={{ fontFamily: "Inter, sans-serif", color: "#4C1D95", lineHeight: 1.6 }}>
          Affirmations plant seeds. Come back tomorrow to water them.
        </p>
        <button onClick={onDone} className="cb-btn-primary" style={{ maxWidth: "240px" }}>
          Done
        </button>
      </div>
    );
  }

  if (view === "practice" && selectedCategory) {
    const aff = selectedCategory.affirmations[affirmationIdx];
    return (
      <div className="min-h-screen flex flex-col" style={{ background: PAGE_BG, padding: "16px" }}>
        <div className="flex items-center justify-between pt-8 pb-4">
          <button onClick={() => { setView("browse"); window.speechSynthesis?.cancel(); }} className="cb-btn-icon">
            <ArrowLeft className="w-5 h-5" style={{ color: "#15113C" }} />
          </button>
          <div className="flex-1 mx-3">
            <h1 className="text-xl" style={{ fontFamily: "Lora, serif", fontWeight: 500, color: "#15113C" }}>{selectedCategory.category}</h1>
            <p className="text-xs" style={{ fontFamily: "Inter, sans-serif", color: "#9CA3AF" }}>{affirmationIdx + 1} of {selectedCategory.affirmations.length}</p>
          </div>
          <button onClick={toggleVoice} className="cb-btn-icon" style={{ background: voiceOn ? "#EDE9FE" : "rgba(255,255,255,0.7)", border: voiceOn ? "1.5px solid #C4B5FD" : "1.5px solid rgba(0,0,0,0.08)" }}>
            {voiceOn ? <Mic className="w-5 h-5" style={{ color: PURPLE }} /> : <MicOff className="w-5 h-5" style={{ color: "#9CA3AF" }} />}
          </button>
        </div>
        <div className="h-1.5 rounded-full mb-8" style={{ background: "#E5E7EB" }}>
          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${((affirmationIdx + 1) / selectedCategory.affirmations.length) * 100}%`, background: PURPLE }} />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-2">
          <div className="w-full p-8 rounded-3xl text-center" style={{ background: "rgba(255,255,255,0.85)", border: "1.5px solid rgba(139,92,246,0.15)" }}>
            <p className="text-xl leading-relaxed" style={{ fontFamily: "Lora, serif", color: "#15113C", fontStyle: "italic", lineHeight: 1.8 }}>
              "{aff}"
            </p>
          </div>
          <p className="mt-6 text-sm text-center" style={{ fontFamily: "Inter, sans-serif", color: "#9CA3AF" }}>
            Read it once. Read it again. Let it land.
          </p>
        </div>
        <button onClick={handlePracticeNext} className="cb-btn-primary mb-6">
          {affirmationIdx < selectedCategory.affirmations.length - 1 ? "Next affirmation" : "Complete"}
        </button>
      </div>
    );
  }

  if (view === "browse") {
    return (
      <div className="min-h-screen" style={{ background: PAGE_BG, padding: "16px", paddingBottom: "40px" }}>
        <div className="flex items-center gap-3 pt-8 pb-6">
          <button onClick={() => setView("home")} className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.7)", border: "1.5px solid rgba(0,0,0,0.08)" }}>
            <ArrowLeft className="w-5 h-5" style={{ color: "#15113C" }} />
          </button>
          <h1 className="text-xl" style={{ fontFamily: "Lora, serif", fontWeight: 500, color: "#15113C" }}>Choose a theme</h1>
        </div>
        <div className="space-y-3">
          {presets.map((p) => (
            <button
              key={p.category}
              onClick={() => startPractice(p)}
              className="w-full p-5 rounded-3xl text-left active:scale-95 transition-all"
              style={{ background: "rgba(255,255,255,0.8)", border: "1.5px solid rgba(139,92,246,0.15)" }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-base" style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, color: "#15113C" }}>{p.category}</span>
                <span className="px-2 py-0.5 rounded-full text-xs" style={{ background: p.chipBg, color: "#15113C", fontFamily: "Inter, sans-serif", fontWeight: 600 }}>
                  {p.affirmations.length} affirmations
                </span>
              </div>
              <p className="text-xs" style={{ fontFamily: "Inter, sans-serif", color: "#6B7280", fontStyle: "italic" }}>
                "{p.affirmations[0]}"
              </p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (view === "builder") {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: PAGE_BG, padding: "16px", paddingBottom: "40px" }}>
        <div className="flex items-center gap-3 pt-8 pb-6">
          <button onClick={() => setView("home")} className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.7)", border: "1.5px solid rgba(0,0,0,0.08)" }}>
            <ArrowLeft className="w-5 h-5" style={{ color: "#15113C" }} />
          </button>
          <div>
            <h1 className="text-xl" style={{ fontFamily: "Lora, serif", fontWeight: 500, color: "#15113C" }}>My Affirmations</h1>
            <p className="text-xs" style={{ fontFamily: "Inter, sans-serif", color: "#9CA3AF" }}>Write your own</p>
          </div>
        </div>
        <div className="flex gap-2 mb-4">
          <input
            value={newAff}
            onChange={(e) => setNewAff(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && newAff.trim()) { setCustom((p) => [...p, newAff.trim()]); setNewAff(""); } }}
            placeholder="I am… / I have… / I trust…"
            className="flex-1 px-4 py-3 rounded-2xl text-sm focus:outline-none"
            style={{ fontFamily: "Inter, sans-serif", color: "#15113C", background: "white", border: "1.5px solid rgba(139,92,246,0.2)" }}
          />
          <button onClick={() => { if (newAff.trim()) { setCustom((p) => [...p, newAff.trim()]); setNewAff(""); } }} className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: PURPLE }}>
            <Plus className="w-5 h-5" style={{ color: "white" }} />
          </button>
        </div>
        <div className="space-y-2 flex-1">
          {custom.map((a, i) => (
            <div key={i} className="flex items-start gap-3 px-4 py-3 rounded-2xl" style={{ background: "rgba(255,255,255,0.8)", border: "1.5px solid rgba(139,92,246,0.15)" }}>
              <p className="flex-1 text-sm" style={{ fontFamily: "Inter, sans-serif", color: "#15113C", fontStyle: "italic" }}>"{a}"</p>
              <button onClick={() => setCustom((p) => p.filter((_, idx) => idx !== i))} className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#F3F4F6" }}>
                <X className="w-3 h-3" style={{ color: "#6B7280" }} />
              </button>
            </div>
          ))}
          {custom.length === 0 && (
            <div className="py-10 text-center">
              <p className="text-sm" style={{ fontFamily: "Inter, sans-serif", color: "#9CA3AF" }}>Your affirmations will appear here</p>
            </div>
          )}
        </div>
        {custom.length > 0 && (
          <button onClick={onDone} className="cb-btn-primary mt-4">
            Save & done
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: PAGE_BG, padding: "16px", paddingBottom: "40px" }}>
      <div className="flex items-center gap-3 pt-8 pb-8">
        <button onClick={onDone} className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.7)", border: "1.5px solid rgba(0,0,0,0.08)" }}>
          <ArrowLeft className="w-5 h-5" style={{ color: "#15113C" }} />
        </button>
        <div>
          <h1 className="text-2xl" style={{ fontFamily: "Lora, serif", fontWeight: 500, color: "#15113C" }}>Affirmations</h1>
          <p className="text-xs" style={{ fontFamily: "Inter, sans-serif", color: "#9CA3AF" }}>Words that reshape the mind</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => setView("browse")}
          className="p-6 rounded-3xl flex flex-col items-center gap-3 cb-ripple-dark"
          style={{ background: "rgba(255,255,255,0.88)", border: "1.5px solid rgba(139,92,246,0.15)", minHeight: 150 }}
        >
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: "#EDE9FE" }}>
            <Sparkles className="w-6 h-6" style={{ color: PURPLE, strokeWidth: 1.5 }} />
          </div>
          <span className="text-sm text-center" style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, color: "#15113C" }}>Browse themes</span>
          <span className="text-xs text-center" style={{ fontFamily: "Inter, sans-serif", color: "#6D28D9" }}>Strength, Calm, Self-Worth & more</span>
        </button>
        <button
          onClick={() => setView("builder")}
          className="p-6 rounded-3xl flex flex-col items-center gap-3 cb-ripple-dark"
          style={{ background: "rgba(255,255,255,0.88)", border: "1.5px solid rgba(139,92,246,0.15)", minHeight: 150 }}
        >
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: "#EDE9FE" }}>
            <PenLine className="w-6 h-6" style={{ color: PURPLE, strokeWidth: 1.5 }} />
          </div>
          <span className="text-sm text-center" style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, color: "#15113C" }}>Build my own</span>
          <span className="text-xs text-center" style={{ fontFamily: "Inter, sans-serif", color: "#6D28D9" }}>Write personalized affirmations</span>
        </button>
      </div>
    </div>
  );
}
