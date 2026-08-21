import { useState } from "react";
import { Flame, ArrowLeft, Check } from "lucide-react";

interface SIBOQScreenProps {
  onDone: () => void;
}

type View = "intro" | "question" | "result";

const PAGE_BG = "linear-gradient(180deg, #EDE9FE 0%, #F5F3FF 100%)";
const DONE_BG = "linear-gradient(135deg, #EDE9FE 0%, #C4B5FD 100%)";
const PURPLE = "#8B5CF6";
const ICON_COLOR = "#15113C";
const ORANGE_LIGHT = "#FFEDD5";

function getBand(score: number) {
  if (score <= 3) return {
    label: "Energized",
    color: "#059669",
    bg: "#D1FAE5",
    insight: "Your energy and occupational engagement appear healthy. Burnout indicators are low.",
    action: "Keep protecting what's working — your recovery habits and boundaries are serving you well.",
  };
  if (score <= 6) return {
    label: "Fatigued",
    color: "#D97706",
    bg: "#FEF3C7",
    insight: "You are carrying noticeable tiredness. This may be manageable but warrants attention.",
    action: "Build in a genuine recovery day this week — no tasks, no obligations. Rest is not a luxury.",
  };
  return {
    label: "Burnout Risk",
    color: "#DC2626",
    bg: "#FEE2E2",
    insight: "Your current fatigue level is significant. This level of exhaustion often signals burnout.",
    action: "Please speak with a healthcare professional. Burnout is a recognized condition with effective treatments.",
  };
}

function getScoreColor(score: number): string {
  if (score <= 3) return "#059669";
  if (score <= 6) return "#D97706";
  if (score <= 8) return "#EA580C";
  return "#DC2626";
}

export function SIBOQScreen({ onDone }: SIBOQScreenProps) {
  const [view, setView] = useState<View>("intro");
  const [selected, setSelected] = useState<number>(-1);

  if (view === "intro") {
    return (
      <div className="min-h-screen flex flex-col px-6 pt-14 pb-10" style={{ background: PAGE_BG }}>
        <button
          className="self-start w-11 h-11 rounded-full flex items-center justify-center mb-8 active:scale-95 transition-transform"
          style={{ background: "rgba(255,255,255,0.7)", border: "1.5px solid rgba(0,0,0,0.07)" }}
          onClick={onDone}
        >
          <ArrowLeft className="w-5 h-5" style={{ color: ICON_COLOR, strokeWidth: 1.75 }} />
        </button>

        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: ORANGE_LIGHT }}>
            <Flame className="w-7 h-7" style={{ color: ICON_COLOR, strokeWidth: 1.75 }} />
          </div>
        </div>

        <h1 className="text-center mb-1" style={{ fontFamily: "Lora, serif", fontSize: 26, fontWeight: 600, color: "#15113C" }}>
          Burnout Quick Check
        </h1>
        <p className="text-center mb-6" style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#6B7280" }}>
          SIBOQ &middot; 1 question &middot; Under 1 min
        </p>

        <p className="text-center mb-10 leading-relaxed max-w-xs mx-auto" style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#4B5563" }}>
          The Single Item Burnout Question is a rapid, validated screening measure. A single honest response tells you a great deal about your current occupational energy.
        </p>

        {/* Visual scale preview */}
        <div className="mb-12">
          <div className="flex justify-center gap-1.5 mb-3">
            {Array.from({ length: 11 }, (_, i) => (
              <div
                key={i}
                className="flex items-center justify-center rounded-full"
                style={{
                  width: 28,
                  height: 28,
                  background: i <= 3 ? "#D1FAE5" : i <= 6 ? "#FEF3C7" : "#FEE2E2",
                  fontFamily: "Inter, sans-serif",
                  fontSize: 11,
                  fontWeight: 700,
                  color: i <= 3 ? "#059669" : i <= 6 ? "#D97706" : "#DC2626",
                }}
              >
                {i}
              </div>
            ))}
          </div>
          <div className="flex justify-between px-1">
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "#9CA3AF" }}>Not at all tired</span>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "#9CA3AF" }}>Totally exhausted</span>
          </div>
        </div>

        <button
          className="cb-btn-primary active:scale-95 transition-transform w-full"
          style={{ background: PURPLE, borderColor: PURPLE }}
          onClick={() => { setSelected(-1); setView("question"); }}
        >
          Begin Assessment
        </button>
      </div>
    );
  }

  if (view === "question") {
    return (
      <div className="min-h-screen flex flex-col px-6 pt-8 pb-10" style={{ background: PAGE_BG }}>
        <div className="flex items-center justify-between mb-5">
          <button
            className="w-11 h-11 rounded-full flex items-center justify-center active:scale-95 transition-transform"
            style={{ background: "rgba(255,255,255,0.7)", border: "1.5px solid rgba(0,0,0,0.07)" }}
            onClick={() => setView("intro")}
          >
            <ArrowLeft className="w-5 h-5" style={{ color: ICON_COLOR, strokeWidth: 1.75 }} />
          </button>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 600, color: "#15113C" }}>
            Q1 of 1
          </span>
          <button onClick={onDone} style={{ fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 600, color: "#9CA3AF", background: "none", border: "none", cursor: "pointer" }}>
            Save &amp; Exit
          </button>
        </div>

        {/* Full progress */}
        <div className="w-full rounded-full mb-6 overflow-hidden" style={{ height: 6, background: "#E5E7EB" }}>
          <div className="h-full rounded-full transition-all duration-300" style={{ width: selected >= 0 ? "100%" : "0%", background: PURPLE }} />
        </div>

        <div className="flex justify-center mb-6">
          <span className="px-3 py-1 rounded-full" style={{ background: ORANGE_LIGHT, fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 700, color: "#C2410C", letterSpacing: "0.05em" }}>
            SIBOQ
          </span>
        </div>

        <div className="rounded-3xl px-6 py-8 mb-8" style={{ background: "rgba(255,255,255,0.85)" }}>
          <p style={{ fontFamily: "Lora, serif", fontSize: 20, fontStyle: "italic", color: "#15113C", lineHeight: 1.6, textAlign: "center" }}>
            In a scale from 0 to 10, how tired do you feel right now?
          </p>
          <p className="text-center mt-3" style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#9CA3AF" }}>
            0 = not at all &nbsp;&nbsp; 10 = completely exhausted
          </p>
        </div>

        {/* 0-10 selector */}
        <div className="grid gap-2 mb-8" style={{ gridTemplateColumns: "repeat(11, 1fr)" }}>
          {Array.from({ length: 11 }, (_, i) => {
            const isSel = selected === i;
            const col = i <= 3 ? "#059669" : i <= 6 ? "#D97706" : "#DC2626";
            const bg = i <= 3 ? "#D1FAE5" : i <= 6 ? "#FEF3C7" : "#FEE2E2";
            return (
              <button
                key={i}
                onClick={() => setSelected(i)}
                className="active:scale-95 transition-transform flex items-center justify-center rounded-full"
                style={{
                  aspectRatio: "1",
                  border: `2px solid ${isSel ? col : "#E5E7EB"}`,
                  background: isSel ? bg : "white",
                  fontFamily: "Inter, sans-serif",
                  fontSize: 13,
                  fontWeight: 700,
                  color: isSel ? col : "#6B7280",
                  cursor: "pointer",
                  padding: 0,
                  minHeight: 44,
                }}
              >
                {i}
              </button>
            );
          })}
        </div>

        {selected >= 0 && (
          <div className="text-center mb-4">
            <span
              className="inline-block px-4 py-1.5 rounded-full"
              style={{ background: selected <= 3 ? "#D1FAE5" : selected <= 6 ? "#FEF3C7" : "#FEE2E2", fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 700, color: getScoreColor(selected) }}
            >
              {selected <= 3 ? "Low fatigue" : selected <= 6 ? "Moderate fatigue" : "High fatigue"}
            </span>
          </div>
        )}

        <button
          className="cb-btn-primary active:scale-95 transition-transform w-full mb-3"
          style={{ background: selected >= 0 ? PURPLE : "#E5E7EB", borderColor: selected >= 0 ? PURPLE : "#E5E7EB", color: selected >= 0 ? "#ffffff" : "#9CA3AF", cursor: selected >= 0 ? "pointer" : "default" }}
          disabled={selected < 0}
          onClick={() => setView("result")}
        >
          Complete
        </button>
      </div>
    );
  }

  const band = getBand(selected);

  return (
    <div className="min-h-screen flex flex-col items-center px-6 pt-14 pb-10" style={{ background: DONE_BG }}>
      {/* Big score ring */}
      <div
        className="flex items-center justify-center mb-6"
        style={{ width: 140, height: 140, borderRadius: "50%", background: "linear-gradient(135deg, #A78BFA 0%, #7C3AED 100%)", boxShadow: "0 8px 32px rgba(139,92,246,0.35)" }}
      >
        <div className="text-center">
          <span style={{ fontFamily: "Lora, serif", fontSize: 52, fontWeight: 700, color: "#ffffff", display: "block", lineHeight: 1 }}>{selected}</span>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "rgba(255,255,255,0.7)", display: "block" }}>out of 10</span>
        </div>
      </div>

      <div className="px-4 py-1 rounded-full mb-4" style={{ background: band.bg }}>
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 700, color: band.color, letterSpacing: "0.04em" }}>{band.label}</span>
      </div>

      <h2 className="mb-3 text-center" style={{ fontFamily: "Lora, serif", fontSize: 22, fontWeight: 600, color: "#15113C" }}>
        {band.label}
      </h2>
      <p className="text-center mb-8 max-w-xs leading-relaxed" style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#4B5563" }}>
        {band.insight}
      </p>

      <div className="w-full max-w-sm rounded-2xl px-5 py-4 mb-10" style={{ background: "rgba(255,255,255,0.7)" }}>
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: ORANGE_LIGHT }}>
            <Check className="w-5 h-5" style={{ color: ICON_COLOR, strokeWidth: 1.75 }} />
          </div>
          <div>
            <p className="mb-1" style={{ fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 700, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.06em" }}>Suggested Next Step</p>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#15113C", lineHeight: 1.5 }}>{band.action}</p>
          </div>
        </div>
      </div>

      <button className="cb-btn-primary active:scale-95 transition-transform w-full max-w-sm" style={{ background: PURPLE, borderColor: PURPLE }} onClick={onDone}>
        Done
      </button>
    </div>
  );
}
