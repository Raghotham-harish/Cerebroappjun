import { useState, useEffect } from "react";
import { ArrowLeft, Check, Moon, Smartphone, Lightbulb, Thermometer, Coffee, NotebookPen } from "lucide-react";

interface SleepRitualScreenProps {
  onDone: () => void;
}

const ritualSteps = [
  { Icon: Smartphone,   title: "Put screens away",       description: "Place your phone face-down or in another room. This screen is the last one tonight.", iconBg: "#DBEAFE", iconColor: "#1D4ED8" },
  { Icon: Lightbulb,   title: "Dim the lights",          description: "Lower the light around you. Signal to your body that night is here.", iconBg: "#FEF3C7", iconColor: "#D97706" },
  { Icon: Thermometer, title: "Cool the room",           description: "Open a window or lower the thermostat. The body sleeps best cool.", iconBg: "#CFFAFE", iconColor: "#0E7490" },
  { Icon: Coffee,      title: "Warm drink (optional)",   description: "Chamomile, warm milk, or decaf tea — something warm and calm.", iconBg: "#FDE8D8", iconColor: "#C2410C" },
  { Icon: NotebookPen, title: "Brain dump",              description: "Write down anything unfinished on your mind. It's captured — you can rest.", iconBg: "#EDE9FE", iconColor: "#7C3AED" },
  { Icon: Moon,        title: "Body scan relaxation",    description: "Lie down. Starting at your toes, consciously release each part of your body upward.", iconBg: "#1E1B4B", iconColor: "#A5B4FC" },
];

const windDownBreaths = [
  { label: "Inhale", duration: 4, color: "#8B5CF6" },
  { label: "Hold", duration: 4, color: "#6D28D9" },
  { label: "Exhale", duration: 6, color: "#4C1D95" },
];

export function SleepRitualScreen({ onDone }: SleepRitualScreenProps) {
  const [view, setView] = useState<"checklist" | "breathing" | "done">("checklist");
  const [checked, setChecked] = useState<boolean[]>(ritualSteps.map(() => false));
  const [breathPhase, setBreathPhase] = useState(0);
  const [breathCount, setBreathCount] = useState(4);
  const [breathRound, setBreathRound] = useState(1);
  const totalBreathRounds = 4;
  const [breathDone, setBreathDone] = useState(false);

  useEffect(() => {
    if (view !== "breathing" || breathDone) return;
    const phase = windDownBreaths[breathPhase];
    setBreathCount(phase.duration);
    const t = setInterval(() => {
      setBreathCount((prev) => {
        if (prev <= 1) {
          const nextPhase = (breathPhase + 1) % windDownBreaths.length;
          if (nextPhase === 0) {
            if (breathRound >= totalBreathRounds) {
              setBreathDone(true);
              return 0;
            }
            setBreathRound((r) => r + 1);
          }
          setBreathPhase(nextPhase);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [view, breathPhase, breathRound, breathDone]);

  const toggle = (i: number) => setChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
  const allChecked = checked.every(Boolean);
  const checkedCount = checked.filter(Boolean).length;

  if (view === "done") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{ background: "linear-gradient(135deg, #1E1B4B 0%, #312E81 100%)" }}>
        <Moon className="w-16 h-16 mb-6" style={{ color: "#C4B5FD" }} />
        <h2 className="text-2xl mb-3 text-center" style={{ fontFamily: "Lora, serif", fontWeight: 500, color: "white" }}>Sleep well</h2>
        <p className="text-sm mb-10 text-center max-w-xs" style={{ fontFamily: "Inter, sans-serif", color: "#A5B4FC", lineHeight: 1.6 }}>
          You've prepared your body and mind for rest. Close your eyes and let go.
        </p>
        <button onClick={onDone} className="cb-btn-primary" style={{ maxWidth: "240px" }}>
          Done
        </button>
      </div>
    );
  }

  if (view === "breathing") {
    if (breathDone) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{ background: "linear-gradient(135deg, #1E1B4B 0%, #312E81 100%)" }}>
          <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6" style={{ background: "#8B5CF6" }}>
            <Moon className="w-10 h-10" style={{ color: "white", strokeWidth: 1.5 }} />
          </div>
          <h2 className="text-2xl mb-3 text-center" style={{ fontFamily: "Lora, serif", fontWeight: 500, color: "white" }}>
            Breathing complete
          </h2>
          <p className="text-sm mb-8 text-center max-w-xs" style={{ fontFamily: "Inter, sans-serif", color: "#A5B4FC", lineHeight: 1.6 }}>
            Your nervous system is calm. You are ready for sleep.
          </p>
          <button onClick={() => setView("done")} className="cb-btn-primary" style={{ maxWidth: "240px" }}>
            Sleep well →
          </button>
        </div>
      );
    }

    const phase = windDownBreaths[breathPhase];
    const progress = (phase.duration - breathCount) / phase.duration;
    const scale = phase.label === "Inhale" ? 1 + progress * 0.4 : phase.label === "Exhale" ? 1.4 - progress * 0.4 : 1.2;

    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: "linear-gradient(135deg, #1E1B4B 0%, #312E81 100%)", padding: "16px" }}>
        <div className="w-full flex justify-between mb-8">
          <button onClick={() => setView("checklist")} className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)" }}>
            <ArrowLeft className="w-5 h-5" style={{ color: "white" }} />
          </button>
          <p className="text-sm" style={{ fontFamily: "Inter, sans-serif", color: "#A5B4FC" }}>Round {breathRound}/{totalBreathRounds}</p>
          <div style={{ width: 40 }} />
        </div>
        <div className="relative flex items-center justify-center" style={{ width: 220, height: 220, marginBottom: 40 }}>
          {[0.6, 0.75, 1].map((s, i) => (
            <div
              key={i}
              className="absolute rounded-full transition-all"
              style={{
                width: 160 * scale * s,
                height: 160 * scale * s,
                background: `rgba(139, 92, 246, ${0.1 + i * 0.1})`,
                transition: "width 0.8s ease, height 0.8s ease",
              }}
            />
          ))}
          <div className="w-20 h-20 rounded-full flex flex-col items-center justify-center" style={{ background: "#8B5CF6", zIndex: 10 }}>
            <span className="text-2xl" style={{ color: "white", fontFamily: "Inter, sans-serif", fontWeight: 700 }}>{breathCount}</span>
          </div>
        </div>
        <h2 className="text-4xl mb-2" style={{ fontFamily: "Lora, serif", fontWeight: 400, color: "white" }}>{phase.label}</h2>
        <p className="text-sm" style={{ fontFamily: "Inter, sans-serif", color: "#A5B4FC" }}>4-4-6 sleep breath</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "linear-gradient(180deg, #EDE9FE 0%, #F9F8FF 100%)", padding: "16px", paddingBottom: "40px" }}>
      <div className="flex items-center gap-3 pt-8 pb-6">
        <button onClick={onDone} className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.7)", border: "1.5px solid rgba(0,0,0,0.08)" }}>
          <ArrowLeft className="w-5 h-5" style={{ color: "#15113C" }} />
        </button>
        <div>
          <h1 className="text-2xl" style={{ fontFamily: "Lora, serif", fontWeight: 500, color: "#15113C" }}>Sleep Ritual</h1>
          <p className="text-xs" style={{ fontFamily: "Inter, sans-serif", color: "#9CA3AF" }}>{checkedCount}/{ritualSteps.length} steps complete</p>
        </div>
      </div>

      {/* Progress */}
      <div className="h-1.5 rounded-full mb-6" style={{ background: "#E5E7EB" }}>
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(checkedCount / ritualSteps.length) * 100}%`, background: "#8B5CF6" }} />
      </div>

      <div className="space-y-3 flex-1">
        {ritualSteps.map((step, i) => (
          <button
            key={i}
            onClick={() => toggle(i)}
            className="w-full p-4 rounded-2xl flex items-center gap-4 text-left transition-all"
            style={{
              background: checked[i] ? "rgba(139,92,246,0.08)" : "rgba(255,255,255,0.8)",
              border: checked[i] ? "1.5px solid rgba(139,92,246,0.3)" : "1.5px solid rgba(0,0,0,0.06)",
            }}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
              style={{ background: checked[i] ? "#8B5CF6" : step.iconBg }}
            >
              {checked[i] ? (
                <Check className="w-5 h-5" style={{ color: "white" }} />
              ) : (
                <step.Icon className="w-4 h-4" style={{ color: step.iconColor, strokeWidth: 1.75 }} />
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm mb-0.5" style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, color: checked[i] ? "#8B5CF6" : "#15113C", textDecoration: checked[i] ? "line-through" : "none" }}>
                {step.title}
              </p>
              <p className="text-xs" style={{ fontFamily: "Inter, sans-serif", color: "#9CA3AF", lineHeight: 1.4 }}>{step.description}</p>
            </div>
          </button>
        ))}
      </div>

      <button
        onClick={() => setView("breathing")}
        disabled={!allChecked}
        className="cb-btn-primary mt-6"
        style={!allChecked ? { background: "#E5E7EB", color: "#9CA3AF", cursor: "not-allowed" } : undefined}
      >
        {allChecked ? "Begin sleep breathing →" : `Complete all steps to continue (${checkedCount}/${ritualSteps.length})`}
      </button>
    </div>
  );
}
