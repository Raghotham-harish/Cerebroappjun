import { useState } from "react";
import { ArrowLeft, Check } from "lucide-react";

interface DisidentificationScreenProps {
  onDone: () => void;
}

const steps = [
  {
    title: "Notice the thought",
    prompt: "What thought or feeling is present right now?",
    instruction: "Write it down exactly as it appears in your mind.",
    placeholder: "e.g. I am a failure. I'm overwhelmed. I can't do this.",
    transform: null,
  },
  {
    title: "Observe it",
    prompt: "Shift your perspective",
    instruction: "Instead of \"I am a failure\", say to yourself:\n\"I notice I am having the thought that I am a failure.\"",
    placeholder: "Rewrite your thought starting with: \"I notice I am having the thought that...\"",
    transform: "I notice I am having the thought that ",
  },
  {
    title: "Dis-identify",
    prompt: "The observer within",
    instruction: "You have thoughts — you are not your thoughts. The part of you reading this right now is the Witness. It is always calm, always present.",
    placeholder: "What do you notice when you step back and watch the thought?",
    transform: null,
  },
  {
    title: "Ground the self",
    prompt: "You are the observer",
    instruction: "Repeat silently:\n\"I have thoughts. I am not my thoughts.\"\n\"I have feelings. I am not my feelings.\"\n\"I have a body. I am not my body.\"\n\nI am the one who is aware.",
    placeholder: "How does this feel? What shifts?",
    transform: null,
  },
];

export function DisidentificationScreen({ onDone }: DisidentificationScreenProps) {
  const [stepIdx, setStepIdx] = useState(0);
  const [inputs, setInputs] = useState<string[]>(["", "", "", ""]);
  const [completed, setCompleted] = useState(false);

  const step = steps[stepIdx];

  const handleNext = () => {
    if (stepIdx < steps.length - 1) {
      setStepIdx((i) => i + 1);
    } else {
      setCompleted(true);
    }
  };

  if (completed) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-6"
        style={{ background: "linear-gradient(135deg, #EDE9FE 0%, #DDD6FE 100%)" }}
      >
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center mb-6"
          style={{ background: "#8B5CF6" }}
        >
          <Check className="w-12 h-12" style={{ color: "white" }} />
        </div>
        <h2
          className="text-2xl mb-3 text-center"
          style={{ fontFamily: "Lora, serif", fontWeight: 500, color: "#15113C" }}
        >
          Practice complete
        </h2>
        <p
          className="text-sm mb-10 text-center max-w-xs"
          style={{ fontFamily: "Inter, sans-serif", color: "#6B7280", lineHeight: 1.6 }}
        >
          You have stepped back from the stream of thoughts and touched the quiet witness within.
        </p>
        <button onClick={onDone} className="cb-btn-primary" style={{ maxWidth: "240px" }}>
          Done
        </button>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "linear-gradient(180deg, #EDE9FE 0%, #F9F8FF 100%)", padding: "16px" }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 pt-8 pb-4">
        <button
          onClick={() => stepIdx > 0 ? setStepIdx((i) => i - 1) : onDone()}
          className="cb-btn-icon"
        >
          <ArrowLeft className="w-5 h-5" style={{ color: "#15113C" }} />
        </button>
        <div>
          <h1 className="text-xl" style={{ fontFamily: "Lora, serif", fontWeight: 500, color: "#15113C" }}>
            Disidentification
          </h1>
          <p className="text-xs" style={{ fontFamily: "Inter, sans-serif", color: "#9CA3AF" }}>
            Step {stepIdx + 1} of {steps.length}
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 rounded-full mb-6" style={{ background: "#E5E7EB" }}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${((stepIdx + 1) / steps.length) * 100}%`, background: "#8B5CF6" }}
        />
      </div>

      {/* Step content */}
      <div
        className="flex-1 p-6 rounded-3xl mb-4"
        style={{ background: "rgba(255,255,255,0.7)", border: "1.5px solid rgba(139,92,246,0.15)" }}
      >
        <div
          className="inline-block px-3 py-1 rounded-full mb-4"
          style={{ background: "#8B5CF6", color: "white", fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "11px", letterSpacing: "0.05em" }}
        >
          STEP {stepIdx + 1}
        </div>
        <h2
          className="text-xl mb-2"
          style={{ fontFamily: "Lora, serif", fontWeight: 500, color: "#15113C" }}
        >
          {step.title}
        </h2>
        <p
          className="text-sm mb-4"
          style={{ fontFamily: "Inter, sans-serif", color: "#6B7280", lineHeight: 1.6, whiteSpace: "pre-line" }}
        >
          {step.instruction}
        </p>
        <textarea
          value={inputs[stepIdx]}
          onChange={(e) => {
            const updated = [...inputs];
            updated[stepIdx] = e.target.value;
            setInputs(updated);
          }}
          placeholder={step.placeholder}
          rows={4}
          className="w-full px-4 py-3 rounded-2xl text-sm resize-none focus:outline-none"
          style={{
            fontFamily: "Inter, sans-serif",
            color: "#15113C",
            background: "white",
            border: "1.5px solid rgba(139,92,246,0.2)",
          }}
        />
      </div>

      <button onClick={handleNext} className="cb-btn-primary">
        {stepIdx < steps.length - 1 ? "Continue" : "Complete practice"}
      </button>
    </div>
  );
}
