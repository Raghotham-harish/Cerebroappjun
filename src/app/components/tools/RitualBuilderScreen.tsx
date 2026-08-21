import { useState } from "react";
import { ArrowLeft, Check, Plus, X, Sun, Moon } from "lucide-react";

interface RitualBuilderScreenProps {
  onDone: () => void;
}

const morningDefaults = ["Drink a glass of water", "5 minutes of silence", "Set today's intention", "Light movement or stretch"];
const eveningDefaults = ["Reflect on 3 things that went well", "Prepare tomorrow's top task", "Screen-free wind-down (30 min)", "Gratitude moment"];

type RitualType = "morning" | "evening" | null;

const PURPLE = "#8B5CF6";
const PAGE_BG = "linear-gradient(180deg, #EDE9FE 0%, #F5F3FF 100%)";
const DONE_BG = "linear-gradient(135deg, #EDE9FE 0%, #C4B5FD 100%)";

export function RitualBuilderScreen({ onDone }: RitualBuilderScreenProps) {
  const [type, setType] = useState<RitualType>(null);
  const [steps, setSteps] = useState<string[]>([]);
  const [newStep, setNewStep] = useState("");
  const [saved, setSaved] = useState(false);

  const loadDefaults = (t: RitualType) => {
    setType(t);
    setSteps(t === "morning" ? [...morningDefaults] : [...eveningDefaults]);
    setSaved(false);
  };

  const addStep = () => {
    if (newStep.trim()) { setSteps((prev) => [...prev, newStep.trim()]); setNewStep(""); }
  };
  const removeStep = (i: number) => setSteps((prev) => prev.filter((_, idx) => idx !== i));
  const save = () => setSaved(true);

  if (saved && type) {
    const RitualIcon = type === "morning" ? Sun : Moon;
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{ background: DONE_BG }}>
        <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6" style={{ background: PURPLE }}>
          <RitualIcon className="w-10 h-10" style={{ color: "white", strokeWidth: 1.5 }} />
        </div>
        <h2 className="text-2xl mb-2 text-center" style={{ fontFamily: "Lora, serif", fontWeight: 500, color: "#15113C" }}>
          {type === "morning" ? "Morning" : "Evening"} ritual saved
        </h2>
        <p className="text-sm mb-4 text-center" style={{ fontFamily: "Inter, sans-serif", color: "#4C1D95" }}>
          {steps.length} steps — consistency builds the self
        </p>
        <div className="w-full max-w-xs space-y-2 mb-8">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-2xl" style={{ background: "rgba(255,255,255,0.7)" }}>
              <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: PURPLE }}>
                <Check className="w-3 h-3" style={{ color: "white" }} />
              </div>
              <span className="text-sm" style={{ fontFamily: "Inter, sans-serif", color: "#15113C" }}>{s}</span>
            </div>
          ))}
        </div>
        <button onClick={onDone} className="cb-btn-primary" style={{ maxWidth: "240px" }}>
          Done
        </button>
      </div>
    );
  }

  if (type) {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: PAGE_BG, padding: "16px", paddingBottom: "40px" }}>
        <div className="flex items-center gap-3 pt-8 pb-6">
          <button onClick={() => setType(null)} className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.7)", border: "1.5px solid rgba(0,0,0,0.08)" }}>
            <ArrowLeft className="w-5 h-5" style={{ color: "#15113C" }} />
          </button>
          <div>
            <h1 className="text-2xl" style={{ fontFamily: "Lora, serif", fontWeight: 500, color: "#15113C" }}>
              {type === "morning" ? "Morning" : "Evening"} Ritual
            </h1>
            <p className="text-xs" style={{ fontFamily: "Inter, sans-serif", color: "#9CA3AF" }}>Tap X to remove a step</p>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-2xl" style={{ background: "rgba(255,255,255,0.8)", border: "1.5px solid rgba(139,92,246,0.15)" }}>
              <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: PURPLE }}>
                <span className="text-xs" style={{ color: "white", fontFamily: "Inter, sans-serif", fontWeight: 700 }}>{i + 1}</span>
              </div>
              <span className="flex-1 text-sm" style={{ fontFamily: "Inter, sans-serif", color: "#15113C" }}>{s}</span>
              <button onClick={() => removeStep(i)} className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "#F3F4F6" }}>
                <X className="w-3 h-3" style={{ color: "#6B7280" }} />
              </button>
            </div>
          ))}
        </div>

        <div className="flex gap-2 mb-6">
          <input
            value={newStep}
            onChange={(e) => setNewStep(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addStep()}
            placeholder="Add a ritual step…"
            className="flex-1 px-4 py-3 rounded-2xl text-sm focus:outline-none"
            style={{ fontFamily: "Inter, sans-serif", color: "#15113C", background: "white", border: "1.5px solid rgba(139,92,246,0.2)" }}
          />
          <button onClick={addStep} className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: PURPLE }}>
            <Plus className="w-5 h-5" style={{ color: "white" }} />
          </button>
        </div>

        <button onClick={save} className="cb-btn-primary">
          Save ritual
        </button>
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
          <h1 className="text-2xl" style={{ fontFamily: "Lora, serif", fontWeight: 500, color: "#15113C" }}>Ritual Builder</h1>
          <p className="text-xs" style={{ fontFamily: "Inter, sans-serif", color: "#9CA3AF" }}>Consistency creates the self</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => loadDefaults("morning")}
          className="p-6 rounded-3xl flex flex-col items-center gap-3 active:scale-95 transition-all"
          style={{ background: "rgba(255,255,255,0.8)", border: "1.5px solid rgba(139,92,246,0.15)", minHeight: 160 }}
        >
          <Sun className="w-10 h-10" style={{ color: "#F59E0B" }} />
          <span className="text-base" style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, color: "#15113C" }}>Morning</span>
          <span className="text-xs text-center" style={{ fontFamily: "Inter, sans-serif", color: "#6B7280" }}>Start the day with intention</span>
        </button>
        <button
          onClick={() => loadDefaults("evening")}
          className="p-6 rounded-3xl flex flex-col items-center gap-3 active:scale-95 transition-all"
          style={{ background: "rgba(255,255,255,0.8)", border: "1.5px solid rgba(139,92,246,0.15)", minHeight: 160 }}
        >
          <Moon className="w-10 h-10" style={{ color: PURPLE }} />
          <span className="text-base" style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, color: "#15113C" }}>Evening</span>
          <span className="text-xs text-center" style={{ fontFamily: "Inter, sans-serif", color: "#6B7280" }}>Close the day with reflection</span>
        </button>
      </div>
    </div>
  );
}
