import { useState } from "react";
import { ArrowLeft, Check, RefreshCw, Mic, MicOff, Heart } from "lucide-react";

function speakText(text: string) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  utt.rate = 0.9; utt.pitch = 1;
  const preferred = window.speechSynthesis.getVoices().find(v => v.name.includes("Samantha") || v.name.includes("Karen") || v.name.includes("Google US English Female"));
  if (preferred) utt.voice = preferred;
  window.speechSynthesis.speak(utt);
}

interface GratitudeJournalScreenProps {
  onDone: () => void;
}

const promptSets = [
  ["What made you smile today, even briefly?", "Who showed up for you recently — how?", "What simple comfort are you grateful for right now?"],
  ["What strength within you are you thankful for?", "What in nature brought you peace this week?", "What ordinary moment turned out to be beautiful?"],
  ["What challenge taught you something valuable?", "Who in your life do you appreciate most today?", "What opportunity are you grateful to have?"],
];

const PURPLE = "#8B5CF6";
const PAGE_BG = "linear-gradient(180deg, #EDE9FE 0%, #F5F3FF 100%)";
const DONE_BG = "linear-gradient(135deg, #EDE9FE 0%, #C4B5FD 100%)";

export function GratitudeJournalScreen({ onDone }: GratitudeJournalScreenProps) {
  const [promptSetIdx, setPromptSetIdx] = useState(0);
  const [answers, setAnswers] = useState(["", "", ""]);
  const [submitted, setSubmitted] = useState(false);
  const [voiceOn, setVoiceOn] = useState(false);

  const prompts = promptSets[promptSetIdx];

  const toggleVoice = () => {
    if (voiceOn) { window.speechSynthesis?.cancel(); setVoiceOn(false); }
    else { setVoiceOn(true); speakText(promptSets[promptSetIdx].join(". ")); }
  };

  const handleSubmit = () => {
    if (answers.filter((a) => a.trim()).length >= 1) { window.speechSynthesis?.cancel(); setSubmitted(true); }
  };

  const shufflePrompts = () => {
    const next = (promptSetIdx + 1) % promptSets.length;
    setPromptSetIdx(next);
    setAnswers(["", "", ""]);
    if (voiceOn) speakText(promptSets[next].join(". "));
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{ background: DONE_BG }}>
        <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6" style={{ background: PURPLE }}>
          <Heart className="w-10 h-10" style={{ color: "white", strokeWidth: 1.5 }} />
        </div>
        <h2 className="text-2xl mb-3 text-center" style={{ fontFamily: "Lora, serif", fontWeight: 500, color: "#15113C" }}>
          Thank you for noticing
        </h2>
        <p className="text-sm mb-10 text-center max-w-xs" style={{ fontFamily: "Inter, sans-serif", color: "#4C1D95", lineHeight: 1.6 }}>
          Gratitude rewires the brain toward abundance. Come back tomorrow.
        </p>
        <button onClick={onDone} className="cb-btn-primary" style={{ maxWidth: "240px" }}>
          Done
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: PAGE_BG, padding: "16px", paddingBottom: "40px" }}>
      <div className="flex items-center justify-between pt-8 pb-6">
        <div className="flex items-center gap-3">
          <button onClick={onDone} className="cb-btn-icon">
            <ArrowLeft className="w-5 h-5" style={{ color: "#15113C" }} />
          </button>
          <div>
            <h1 className="text-2xl" style={{ fontFamily: "Lora, serif", fontWeight: 500, color: "#15113C" }}>Gratitude Journal</h1>
            <p className="text-xs" style={{ fontFamily: "Inter, sans-serif", color: "#9CA3AF" }}>Daily anchoring practice</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={toggleVoice} className="cb-btn-icon" style={{ background: voiceOn ? "#EDE9FE" : "rgba(255,255,255,0.7)", border: voiceOn ? "1.5px solid #C4B5FD" : "1.5px solid rgba(0,0,0,0.08)" }}>
            {voiceOn ? <Mic className="w-4 h-4" style={{ color: PURPLE }} /> : <MicOff className="w-4 h-4" style={{ color: "#9CA3AF" }} />}
          </button>
          <button onClick={shufflePrompts} className="cb-btn-icon">
            <RefreshCw className="w-4 h-4" style={{ color: "#6B7280" }} />
          </button>
        </div>
      </div>

      <div className="space-y-4 flex-1">
        {prompts.map((prompt, i) => (
          <div key={i} className="p-5 rounded-3xl" style={{ background: "rgba(255,255,255,0.8)", border: "1.5px solid rgba(139,92,246,0.15)" }}>
            <p className="text-sm mb-3" style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, color: "#4C1D95" }}>
              {i + 1}. {prompt}
            </p>
            <textarea
              value={answers[i]}
              onChange={(e) => { const u = [...answers]; u[i] = e.target.value; setAnswers(u); }}
              placeholder="Write freely…"
              rows={3}
              className="w-full px-4 py-3 rounded-2xl text-sm resize-none focus:outline-none"
              style={{ fontFamily: "Inter, sans-serif", color: "#15113C", background: "white", border: "1.5px solid rgba(139,92,246,0.2)" }}
            />
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="cb-btn-primary mt-6"
      >
        Save entry
      </button>
    </div>
  );
}
