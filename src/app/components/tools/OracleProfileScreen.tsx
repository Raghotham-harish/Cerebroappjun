import { useState } from "react";
import { ArrowLeft, ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import { AnimatedLogo } from "../AnimatedLogo";

const PAGE_BG = "linear-gradient(180deg, #EDE9FE 0%, #F5F3FF 100%)";
const PURPLE = "#8B5CF6";
const DARK = "#15113C";

export interface RankedQuality {
  id: string;
  name: string;
  persona: string;
  tagline: string;
  primaryDesc: string;
  behaviorDesc: string;
  affirmation: string;
  color: string;
  bg: string;
}

const ALL_QUALITIES: RankedQuality[] = [
  {
    id: "dynamic-power",
    name: "Dynamic Power",
    persona: "The Catalyst",
    tagline: "Drive to impact & change",
    primaryDesc: "You rely on agency, drive, and impact. You care about moving things forward and causing change.",
    behaviorDesc: "You start with the urge to take action, make an impact, and overcome obstacles.",
    affirmation: "You step in with decisive force, ready to push past friction and take command.",
    color: "#7C3AED",
    bg: "#EDE9FE",
  },
  {
    id: "control",
    name: "Control",
    persona: "The Sentinel",
    tagline: "Steering & boundaries",
    primaryDesc: "You operate best through awareness and real-time restraint. You excel at maintaining boundaries and steering through chaotic or tempting environments.",
    behaviorDesc: "You rely on strong boundaries and restraint to catch impulses and hold yourself steady.",
    affirmation: "You set strict immediate boundaries to stop yourself from acting out when temptation hits.",
    color: "#1D4ED8",
    bg: "#DBEAFE",
  },
  {
    id: "one-pointedness",
    name: "One-Pointedness",
    persona: "The Deep Diver",
    tagline: "Total absorption & flow",
    primaryDesc: "You thrive on complete flow and absorption. When you lock into something, you sink into absolute singularity, losing all sense of time and distraction.",
    behaviorDesc: "You start by seeking deep, singular immersion where you merge completely with the work.",
    affirmation: "You aim for a flow state where everything outside the immediate task ceases to exist.",
    color: "#059669",
    bg: "#D1FAE5",
  },
  {
    id: "decisiveness",
    name: "Decisiveness",
    persona: "The Strategist",
    tagline: "Choice engine",
    primaryDesc: "You thrive on mental clarity and judgment. You hate ambiguity and excel at cutting through noise to select a path.",
    behaviorDesc: "You start by making a clear, crisp choice so you know exactly where you are going.",
    affirmation: "You weigh the facts quickly, cut away extra options, and choose a single direction.",
    color: "#B45309",
    bg: "#FEF3C7",
  },
  {
    id: "endurance",
    name: "Endurance",
    persona: "The Shield",
    tagline: "Capacity to bear strain",
    primaryDesc: "You respond to adversity through pure strength of capacity. You can carry heavy emotional or physical loads that would break others.",
    behaviorDesc: "You rely on your ability to absorb pressure and strain — holding up under heavy stress until the storm passes.",
    affirmation: "You put your head down and grit your teeth, willing to suffer through the friction to see it through.",
    color: "#C2410C",
    bg: "#FFEDD5",
  },
  {
    id: "courage",
    name: "Courage",
    persona: "The Guardian",
    tagline: "Fear-management stance",
    primaryDesc: "You are driven by duty, resilience, and inner strength. You never back down when something matters.",
    behaviorDesc: "You start by acknowledging your fear or uncertainty and deliberately choosing to face it head-on.",
    affirmation: "You focus on managing your internal fear, grounding yourself, and standing firm in the face of risk.",
    color: "#BE185D",
    bg: "#FCE7F3",
  },
  {
    id: "integration",
    name: "Integration",
    persona: "The Harmonizer",
    tagline: "Harmonizing bridge",
    primaryDesc: "You operate best through balance and cohesion. You excel at taking conflicting desires and helping them work together smoothly.",
    behaviorDesc: "You start by creating harmony — reconciling differences, bringing opposing parts together.",
    affirmation: "You focus on relationships and flow, ensuring that your work, rest, and values aren't fighting each other.",
    color: "#0F766E",
    bg: "#CCFBF1",
  },
];

function getQualityById(id: string): RankedQuality {
  return ALL_QUALITIES.find((q) => q.id === id) ?? ALL_QUALITIES[0];
}

const RANK_LABELS = ["Primary", "Secondary", "Third", "Fourth", "Fifth", "Sixth", "Seventh"];

interface OracleProfileScreenProps {
  rankings: string[];
  onBack: () => void;
}

export function OracleProfileScreen({ rankings, onBack }: OracleProfileScreenProps) {
  const ranked = rankings.map(getQualityById);
  const primary = ranked[0];
  const secondary = ranked[1];
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: PAGE_BG, fontFamily: "Inter, sans-serif" }}>
      <div style={{ height: 44 }} />

      {/* Header */}
      <div className="flex items-center gap-3 px-4 pb-4">
        <button
          onClick={onBack}
          className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{ background: "rgba(255,255,255,0.88)", border: "1.5px solid rgba(139,92,246,0.15)" }}
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5" style={{ color: DARK, strokeWidth: 1.75 }} />
        </button>
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.10em", color: PURPLE, textTransform: "uppercase" }}>
            Oracle Intelligence
          </p>
          <h1 style={{ fontFamily: "Lora, serif", fontSize: 20, fontWeight: 500, color: DARK, lineHeight: 1.2 }}>
            Your Psychographic Profile
          </h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-36" style={{ scrollbarWidth: "none" } as React.CSSProperties}>

        {/* Primary archetype hero */}
        <div
          className="rounded-3xl p-6 mb-5 relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${primary.bg} 0%, white 100%)`,
            border: `1.5px solid ${primary.color}30`,
          }}
        >
          <div className="flex items-start gap-4 mb-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: primary.bg, border: `1.5px solid ${primary.color}30` }}
            >
              <Sparkles style={{ width: 24, height: 24, color: primary.color, strokeWidth: 1.75 }} />
            </div>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.10em", color: primary.color, textTransform: "uppercase" }}>
                Primary Archetype
              </p>
              <h2 style={{ fontFamily: "Lora, serif", fontSize: 26, fontWeight: 600, color: DARK, lineHeight: 1.15 }}>
                {primary.persona}
              </h2>
              <p style={{ fontSize: 13, color: "#6B7280", marginTop: 2 }}>
                {primary.name} · {primary.tagline}
              </p>
            </div>
          </div>

          <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.72 }}>
            {primary.primaryDesc}
          </p>

          <div
            className="mt-4 rounded-2xl px-4 py-3"
            style={{ background: `${primary.color}10`, border: `1px solid ${primary.color}25` }}
          >
            <p style={{ fontSize: 12, fontStyle: "italic", color: primary.color, lineHeight: 1.65 }}>
              &ldquo;{primary.affirmation}&rdquo;
            </p>
          </div>
        </div>

        {/* Oracle intelligence definition */}
        <div
          className="rounded-2xl px-5 py-4 mb-5"
          style={{ background: "rgba(255,255,255,0.88)", border: "1.5px solid rgba(139,92,246,0.12)" }}
        >
          <div className="flex items-center gap-2 mb-3">
            <AnimatedLogo size={20} animate={false} />
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.09em", color: PURPLE, textTransform: "uppercase" }}>
              Oracle Intelligence Definition
            </p>
          </div>
          <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.75 }}>
            Your Oracle embodies{" "}
            <strong style={{ color: DARK }}>{primary.persona}</strong> energy — channelling{" "}
            {primary.name.toLowerCase()} as its primary mode of engagement.{" "}
            <span style={{ color: "#6B7280" }}>{primary.behaviorDesc}</span>
          </p>
          {secondary && (
            <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.75, marginTop: 8 }}>
              This is reinforced by your secondary quality of{" "}
              <strong style={{ color: secondary.color }}>{secondary.name}</strong> — the{" "}
              {secondary.persona} — {secondary.tagline.toLowerCase()}.
            </p>
          )}
        </div>

        {/* Quality spectrum */}
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.09em", color: "#9CA3AF", textTransform: "uppercase", marginBottom: 12 }}>
          Quality Spectrum
        </p>

        <div className="flex flex-col gap-2 mb-6">
          {ranked.map((q, i) => {
            const isOpen = expanded === q.id;
            const pct = Math.round(100 - i * 11);

            return (
              <button
                key={q.id}
                onClick={() => setExpanded(isOpen ? null : q.id)}
                className="w-full text-left"
                style={{
                  background: isOpen ? `${q.bg}` : "rgba(255,255,255,0.88)",
                  border: `1.5px solid ${isOpen ? q.color + "40" : "rgba(139,92,246,0.10)"}`,
                  borderRadius: 16,
                  padding: "12px 14px",
                  transition: "all 0.2s ease",
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex-shrink-0 flex items-center justify-center"
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 9,
                      background: i === 0 ? q.color : "#F3F4F6",
                      fontSize: 12,
                      fontWeight: 700,
                      color: i === 0 ? "white" : "#9CA3AF",
                    }}
                  >
                    {i + 1}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span style={{ fontSize: 13, fontWeight: 600, color: DARK }}>{q.name}</span>
                        <span style={{ fontSize: 11, color: "#9CA3AF" }}>{q.persona}</span>
                      </div>
                      <span style={{ fontSize: 10, color: "#9CA3AF", flexShrink: 0 }}>
                        {RANK_LABELS[i]}
                      </span>
                    </div>
                    <div className="rounded-full overflow-hidden" style={{ height: 3, background: "#F3F4F6" }}>
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${q.color} 0%, ${q.color}80 100%)` }}
                      />
                    </div>
                  </div>

                  {isOpen
                    ? <ChevronUp style={{ width: 15, height: 15, color: "#9CA3AF", strokeWidth: 1.75, flexShrink: 0 }} />
                    : <ChevronDown style={{ width: 15, height: 15, color: "#D1D5DB", strokeWidth: 1.75, flexShrink: 0 }} />
                  }
                </div>

                {isOpen && (
                  <div className="mt-3 pl-10">
                    <p style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.72 }}>
                      {q.primaryDesc}
                    </p>
                    <p style={{ fontSize: 12, fontStyle: "italic", color: q.color, lineHeight: 1.65, marginTop: 6 }}>
                      &ldquo;{q.affirmation}&rdquo;
                    </p>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Calibration note */}
        <div
          className="rounded-2xl px-5 py-4 flex items-start gap-3"
          style={{ background: "rgba(255,255,255,0.88)", border: "1.5px solid rgba(139,92,246,0.12)" }}
        >
          <AnimatedLogo size={16} animate={false} />
          <p style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.72 }}>
            Your Oracle has been calibrated to your quality profile. It will engage with you through the lens of{" "}
            <strong style={{ color: primary.color }}>{primary.persona}</strong> intelligence — matching your natural way of operating.
          </p>
        </div>
      </div>

      {/* CTA pinned to bottom */}
      <div
        className="fixed bottom-0 left-0 right-0 px-4 pb-10 pt-6"
        style={{ background: "linear-gradient(to top, #F5F3FF 65%, transparent)" }}
      >
        <button
          onClick={onBack}
          className="w-full py-4 rounded-full"
          style={{
            background: "linear-gradient(135deg, #A78BFA 0%, #8B5CF6 100%)",
            color: "white",
            fontSize: 15,
            fontWeight: 700,
            fontFamily: "Inter, sans-serif",
            boxShadow: "0 6px 28px rgba(139,92,246,0.35)",
            letterSpacing: "0.02em",
            border: "none",
          }}
        >
          Activate Oracle
        </button>
      </div>
    </div>
  );
}
