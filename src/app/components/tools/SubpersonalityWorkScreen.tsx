import { useState } from "react";
import { ArrowLeft, Check, Users } from "lucide-react";

interface SubpersonalityWorkScreenProps {
  onDone: () => void;
}

const steps = [
  {
    title: "Who's speaking right now?",
    instruction: "Notice a feeling, inner voice, or impulse present right now. It might be the Critic, the Pleaser, the Achiever, the Child, the Controller. Don't judge it — just notice.",
    placeholder: "Describe what you're feeling or hearing inside… e.g. \"There's a part of me that feels like I'm not doing enough\"",
  },
  {
    title: "Give the part a name",
    instruction: "What would you call this inner part? Give it a simple name or title — not a diagnosis, just a description. This makes it easier to have a relationship with it.",
    placeholder: "e.g. The Inner Critic, The Scared Kid, The Achiever, The Protector…",
  },
  {
    title: "What does it want?",
    instruction: "Every subpersonality has a positive intention, even if its methods are unhelpful. Ask it: \"What do you want for me?\" Then listen.",
    placeholder: "e.g. \"It wants me to be safe.\" or \"It wants me to be loved and accepted.\"",
  },
  {
    title: "Acknowledge it",
    instruction: "Write a short message to this part from your Higher Self — the calm, wise, compassionate center of you. Thank it. Let it know it's seen.",
    placeholder: "e.g. \"I see you, Inner Critic. I know you're trying to protect me. I hear you. But I'm okay.\"",
  },
  {
    title: "Invite integration",
    instruction: "Imagine this part of you sitting quietly beside you, not in control, but no longer fighting. You hold the wheel. It is welcome to ride along.",
    placeholder: "How does it feel to hold this part with compassion instead of resistance?",
  },
];

export function SubpersonalityWorkScreen({ onDone }: SubpersonalityWorkScreenProps) {
  const [stepIdx, setStepIdx] = useState(0);
  const [inputs, setInputs] = useState<string[]>(["", "", "", "", ""]);
  const [completed, setCompleted] = useState(false);

  const handleNext = () => {
    if (stepIdx < steps.length - 1) setStepIdx((i) => i + 1);
    else setCompleted(true);
  };

  if (completed) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{ background: "linear-gradient(135deg, #EDE9FE 0%, #C4B5FD 100%)" }}>
        <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6" style={{ background: "#8B5CF6" }}>
          <Users className="w-10 h-10" style={{ color: "white", strokeWidth: 1.5 }} />
        </div>
        <h2 className="text-2xl mb-3 text-center" style={{ fontFamily: "Lora, serif", fontWeight: 500, color: "#15113C" }}>
          Inner work complete
        </h2>
        <p className="text-sm mb-10 text-center max-w-xs" style={{ fontFamily: "Inter, sans-serif", color: "#4C1D95", lineHeight: 1.6 }}>
          Meeting our inner parts with compassion is how we become whole.
        </p>
        <button onClick={onDone} className="cb-btn-primary" style={{ maxWidth: "240px" }}>
          Done
        </button>
      </div>
    );
  }

  const step = steps[stepIdx];
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "linear-gradient(180deg, #EDE9FE 0%, #F9F8FF 100%)", padding: "16px" }}>
      <div className="flex items-center gap-3 pt-8 pb-4">
        <button onClick={() => stepIdx > 0 ? setStepIdx((i) => i - 1) : onDone()} className="cb-btn-icon">
          <ArrowLeft className="w-5 h-5" style={{ color: "#15113C" }} />
        </button>
        <div>
          <h1 className="text-xl" style={{ fontFamily: "Lora, serif", fontWeight: 500, color: "#15113C" }}>Subpersonality Work</h1>
          <p className="text-xs" style={{ fontFamily: "Inter, sans-serif", color: "#9CA3AF" }}>Step {stepIdx + 1} of {steps.length}</p>
        </div>
      </div>

      <div className="h-1.5 rounded-full mb-6" style={{ background: "#E5E7EB" }}>
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${((stepIdx + 1) / steps.length) * 100}%`, background: "#8B5CF6" }} />
      </div>

      <div className="flex-1 p-6 rounded-3xl mb-4" style={{ background: "rgba(255,255,255,0.75)", border: "1.5px solid rgba(139,92,246,0.15)" }}>
        <div className="inline-block px-3 py-1 rounded-full mb-4" style={{ background: "#8B5CF6", color: "white", fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "11px" }}>
          STEP {stepIdx + 1}
        </div>
        <h2 className="text-xl mb-3" style={{ fontFamily: "Lora, serif", fontWeight: 500, color: "#15113C" }}>{step.title}</h2>
        <p className="text-sm mb-5" style={{ fontFamily: "Inter, sans-serif", color: "#6B7280", lineHeight: 1.7 }}>{step.instruction}</p>
        <textarea
          value={inputs[stepIdx]}
          onChange={(e) => { const u = [...inputs]; u[stepIdx] = e.target.value; setInputs(u); }}
          placeholder={step.placeholder}
          rows={5}
          className="w-full px-4 py-3 rounded-2xl text-sm resize-none focus:outline-none"
          style={{ fontFamily: "Inter, sans-serif", color: "#15113C", background: "white", border: "1.5px solid rgba(139,92,246,0.2)" }}
        />
      </div>

      <button onClick={handleNext} className="cb-btn-primary">
        {stepIdx < steps.length - 1 ? "Continue" : "Complete session"}
      </button>
    </div>
  );
}
