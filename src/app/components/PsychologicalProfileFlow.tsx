import { useState, useEffect, useRef } from "react";
import { ArrowLeft, GripVertical, Check, ChevronLeft, ChevronRight } from "lucide-react";

// Power images
import powerEnergy from "../../imports/Power-1/67345da7ca691b5a63e14ff1b625b01947b7c639.png";
import powerDynamic from "../../imports/Power-1/0b67719a638746786332aaf247841124e94190cd.png";
import powerIntensity from "../../imports/Power-1/3c2ef0765229defa9fd5f52201d6e550bbb457f3.png";

// Control images
import controlMastery from "../../imports/Control-1/5a2751b1527646da1cddb7af4dd1b5ec6996c1ac.png";
import controlControl from "../../imports/Control-1/aee9ebcec86569bb0660a1df2fe61f73a394a15b.png";
import controlDiscipline from "../../imports/Control-1/94168ebbda4738cb57ca1f9d4adbd330e212534e.png";

// Focus images
import focusConcentration from "../../imports/Focus-1/4ce481e4a97f621b8d077ccaaba4bc50abee2b18.png";
import focusOnePointedness from "../../imports/Focus-1/ba9eb9b91d893f49fe78ef73ced802c02c9c865b.png";
import focusAttention from "../../imports/Focus-1/ac184a61bb259842098e9553b08e6a36d29a4179.png";
import focusFocus from "../../imports/Focus-1/611181abc8ade358d4bc654dd7844d022359ac4b.png";

// Decisiveness images
import decisivenessDetermination from "../../imports/Decisiveness-1/e1c41a5855544153cd8718b27480444c4e930a38.png";
import decisivenessDecisiveness from "../../imports/Decisiveness-1/d7977577aec471c7cc153a79c56e826660aa46e5.png";
import decisivenessResoluteness from "../../imports/Decisiveness-1/04a0f20a491fd5205475e8d76f2147b2ddb41eda.png";
import decisivenessPromptness from "../../imports/Decisiveness-1/ad83bd115bd39e9326755743a9fe4221ddaaabe5.png";

// Endurance images
import endurancePersistence from "../../imports/Endurance-1/e0435e12cb7400d1714cbd653ce63683fdf2c58d.png";
import enduranceEndurance from "../../imports/Endurance-1/912ae70da1632f5b027d939567e44bb40c7ce8e7.png";
import endurancePatience from "../../imports/Endurance-1/4a42a47c2026a12d75748fc5cc4757da3c9e29ac.png";

// Courage images
import courageInitiative from "../../imports/Courage-1/86ff0571d5a95e9a3694f191d3120d129dd54c11.png";
import courageCourage from "../../imports/Courage-1/a7a577a3cc6b67908375ddc3f4ed7d2e69dc3c5f.png";
import courageDaring from "../../imports/Courage-1/9a5141506842dd3d4c12dd3b971db0e8da7e8932.png";

// Synthesis images
import synthesisOrganization from "../../imports/Synthesis-1/a04847c7592a19a384f8b9269fa3ce92de9477d5.png";
import synthesisIntegration from "../../imports/Synthesis-1/8c36e54b6813564ffa06778138c279c98b411078.png";
import synthesisSynthesis from "../../imports/Synthesis-1/a78b7606df10e1f99f4dcbfc8bad7f933196e6b9.png";

interface PsychologicalProfileFlowProps {
  onComplete: (profile: ProfileData) => void;
  onClose: () => void;
}

export interface ProfileData {
  power: string;
  control: string;
  focus: string;
  decisiveness: string;
  endurance: string;
  courage: string;
  synthesis: string;
}

interface Option {
  label: string;
  image: string;
  stub: string;       // short 1-line shown on card below label
  description: string; // longer text shown in popup modal
}

interface Category {
  id: keyof ProfileData;
  title: string;
  subtitle: string;
  options: Option[];
  gradient: string;
}

const SUBTITLE = "Reorder the words that describe you the most";

const CATEGORIES: Category[] = [
  {
    id: "power",
    title: "What's the quality of your will?",
    subtitle: SUBTITLE,
    gradient: "linear-gradient(114.781deg, rgb(250, 245, 255) 0%, rgb(253, 242, 248) 50%, rgb(254, 242, 242) 100%)",
    options: [
      {
        label: "Energy",
        image: powerEnergy,
        stub: "Raw life-force that drives action",
        description: "Energy is the foundational vitality that powers every act of will. It is the fire in the engine — the raw, renewable life-force that makes sustained effort possible. Without energy, even the clearest intention falls flat. To cultivate Energy is to tend to your inner flame: rest, nourishment, and purpose all feed it.",
      },
      {
        label: "Dynamic Power",
        image: powerDynamic,
        stub: "Strength mobilised with direction",
        description: "Dynamic Power is energy in motion with direction. It is the ability to mobilise your strength purposefully — not just to feel powerful, but to move, create, and impact. It transforms potential into action. Where raw energy is the fuel, Dynamic Power is the engine that channels it toward a goal.",
      },
      {
        label: "Intensity",
        image: powerIntensity,
        stub: "Total engagement, no half-measures",
        description: "Intensity is concentrated engagement — the capacity to throw yourself fully into what you are doing, without reservation. It is the quality that separates meaningful effort from going through the motions. When intensity is present, ordinary tasks become extraordinary, and small acts carry real weight.",
      },
    ],
  },
  {
    id: "control",
    title: "Choose Your Control",
    subtitle: SUBTITLE,
    gradient: "linear-gradient(114.781deg, rgb(239, 246, 255) 0%, rgb(238, 242, 255) 50%, rgb(250, 245, 255) 100%)",
    options: [
      {
        label: "Mastery",
        image: controlMastery,
        stub: "Command over self and domain",
        description: "Mastery is the fruit of disciplined practice extended over time. It is not about perfection — it is about developing deep command of yourself and your chosen domain, so that what once required effort becomes second nature. Mastery frees you from reaction and lets you act from a place of settled authority.",
      },
      {
        label: "Control",
        image: controlControl,
        stub: "Directing inner forces precisely",
        description: "Control is the ability to direct your inner forces — thoughts, impulses, emotions — consciously and deliberately. It is the rudder that allows you to steer even in strong currents. The person with true Control is not repressed; they are free, because they choose what acts through them rather than being swept along.",
      },
      {
        label: "Discipline",
        image: controlDiscipline,
        stub: "Consistent practice builds character",
        description: "Discipline is the daily, unglamorous choice to do what you committed to. It is the bridge between intention and habit — the quality that carries you forward when motivation fades. Every act of discipline deposits trust in yourself. Over time, that trust becomes a foundation nothing can shake.",
      },
    ],
  },
  {
    id: "focus",
    title: "Choose Your Focus",
    subtitle: SUBTITLE,
    gradient: "linear-gradient(114.781deg, rgb(240, 253, 250) 0%, rgb(236, 254, 255) 50%, rgb(239, 246, 255) 100%)",
    options: [
      {
        label: "Concentration",
        image: focusConcentration,
        stub: "Holding attention on what matters",
        description: "Concentration is the power to hold your mind on a chosen object — an idea, a task, a person — without wandering. It is the lens that transforms diffused light into a focused beam. Practised concentration is one of the highest expressions of will: the mind held steady by conscious choice.",
      },
      {
        label: "One-Pointedness",
        image: focusOnePointedness,
        stub: "Pure, undivided mental absorption",
        description: "One-Pointedness is the ultimate refinement of focus — total absorption in a single point of attention. When the mind becomes one-pointed, it gains extraordinary clarity and penetrating power. Ancient contemplative traditions and modern flow research agree: one-pointed attention is the doorway to peak experience.",
      },
      {
        label: "Attention",
        image: focusAttention,
        stub: "Deliberate presence in each moment",
        description: "Attention is the currency of the mind. What you attend to shapes your inner world and your results. Deliberate, disciplined attention is the foundation of all learning, connection, and growth. To give something your full attention is to give it the most valuable thing you have.",
      },
      {
        label: "Focus",
        image: focusFocus,
        stub: "Channelling energy to a single point",
        description: "Focus is the practical application of concentration across time and amid distraction. It is what allows you to finish what you start and to do it well. Focus is not just mental — it involves the whole self aligned toward a single outcome, excluding what does not serve it.",
      },
    ],
  },
  {
    id: "decisiveness",
    title: "Choose Your Decisiveness",
    subtitle: SUBTITLE,
    gradient: "linear-gradient(114.781deg, rgb(255, 247, 237) 0%, rgb(255, 251, 235) 50%, rgb(254, 252, 232) 100%)",
    options: [
      {
        label: "Determination",
        image: decisivenessDetermination,
        stub: "Unwavering commitment to direction",
        description: "Determination is the unwavering commitment to a chosen direction, maintained in the face of obstacles and doubt. It is not stubbornness — it is clarity sustained under pressure. Determination does not require certainty about the outcome; it requires certainty about the why.",
      },
      {
        label: "Decisiveness",
        image: decisivenessDecisiveness,
        stub: "Swift, clear choices without hesitation",
        description: "Decisiveness is the capacity to make clear choices swiftly, without being paralysed by uncertainty. It reflects trust in your own judgment and saves precious energy for action. The decisive person knows that a good decision acted on now beats a perfect decision made too late.",
      },
      {
        label: "Resoluteness",
        image: decisivenessResoluteness,
        stub: "Firm resolve even under pressure",
        description: "Resoluteness is the quality that holds firm when circumstances push back. It is quieter than determination but equally strong — a settled, calm insistence on what you have chosen. Where determination announces itself, resoluteness simply endures. It is the silent backbone of sustained effort.",
      },
      {
        label: "Promptness",
        image: decisivenessPromptness,
        stub: "Acting without delay when called",
        description: "Promptness is action without unnecessary delay. It reflects respect for time, for opportunity, and for your own commitments. The person who acts promptly captures what hesitation misses. Promptness is also a form of integrity — it signals that your word and your action arrive together.",
      },
    ],
  },
  {
    id: "endurance",
    title: "Choose Your Endurance",
    subtitle: SUBTITLE,
    gradient: "linear-gradient(114.781deg, rgb(240, 253, 244) 0%, rgb(236, 253, 245) 50%, rgb(240, 253, 250) 100%)",
    options: [
      {
        label: "Persistence",
        image: endurancePersistence,
        stub: "Continuing forward when others stop",
        description: "Persistence is the quality that keeps moving when progress is slow or invisible. It is not fuelled by excitement but by a deep commitment to what matters — the refusal to quit before the result arrives. Most meaningful achievements lie just past the point where persistence is most tempted to give up.",
      },
      {
        label: "Endurance",
        image: enduranceEndurance,
        stub: "Sustaining effort across time",
        description: "Endurance is sustained effort across difficulty and time. Where others tire, the person with endurance finds a second wind. It is not merely physical — psychological endurance means remaining engaged, curious, and purposeful even when the work is long and the feedback is sparse.",
      },
      {
        label: "Patience",
        image: endurancePatience,
        stub: "Trusting the process, staying steady",
        description: "Patience is active trust in the process. It is not passive waiting — it is the ability to remain steady and purposeful while results mature. Patience preserves energy that impatience wastes. It is the quality that keeps the long-game player in the game long enough to win it.",
      },
    ],
  },
  {
    id: "courage",
    title: "Choose Your Courage",
    subtitle: SUBTITLE,
    gradient: "linear-gradient(114.781deg, rgb(254, 242, 242) 0%, rgb(255, 241, 242) 50%, rgb(253, 242, 248) 100%)",
    options: [
      {
        label: "Initiative",
        image: courageInitiative,
        stub: "Taking the first step before others",
        description: "Initiative is the will to begin — to take the first step before others dare. It is the quality that turns possibility into movement, and inspiration into something real in the world. Every great change begins with someone who acted before it was safe, proven, or expected. That someone chose initiative.",
      },
      {
        label: "Courage",
        image: courageCourage,
        stub: "Acting rightly despite fear or risk",
        description: "Courage is not the absence of fear — it is choosing to act rightly in the presence of fear. It is the meeting point of will and vulnerability, where the self expands by doing what it feared. Each courageous act rewires the nervous system: what once felt impossible becomes merely difficult, then natural.",
      },
      {
        label: "Daring",
        image: courageDaring,
        stub: "Leaping into the unknown with confidence",
        description: "Daring is the willingness to take bold action — to risk, to venture beyond the familiar edge. It is the quality of the pioneer: one who does not wait for guarantees before moving forward. Daring is not recklessness; it is the informed willingness to act when the outcome is uncertain but the direction is clear.",
      },
    ],
  },
  {
    id: "synthesis",
    title: "Choose Your Synthesis",
    subtitle: SUBTITLE,
    gradient: "linear-gradient(114.781deg, rgb(245, 243, 255) 0%, rgb(250, 245, 255) 50%, rgb(253, 244, 255) 100%)",
    options: [
      {
        label: "Organization",
        image: synthesisOrganization,
        stub: "Bringing order to complexity",
        description: "Organization is the will expressing itself through structure. It is the ability to bring clarity, order, and elegance to complexity — transforming chaos into a system that serves a purpose. The organised mind does not waste energy searching for what should already be in place. It moves directly to what matters.",
      },
      {
        label: "Integration",
        image: synthesisIntegration,
        stub: "Weaving parts into a unified whole",
        description: "Integration is the capacity to weave disparate elements into a coherent whole — thoughts, experiences, parts of the self — so that nothing is wasted and everything serves the greater pattern. The integrative will does not fragment under complexity; it finds the through-line that connects everything.",
      },
      {
        label: "Synthesis",
        image: synthesisSynthesis,
        stub: "Creating something new from what exists",
        description: "Synthesis is the creative act of will — bringing together existing elements to generate something genuinely new. It is the highest expression of the organising mind meeting an inspired heart. The synthesising quality does not merely combine; it transmutes. Something that did not exist before now does, because of you.",
      },
    ],
  },
];

// ── Rank badge ────────────────────────────────────────────────────────────────
const RANK_COLORS = ["#9810FA", "#6366F1", "#A3A3A3", "#C084FC"];
function RankBadge({ rank }: { rank: number }) {
  return (
    <div
      className="absolute top-3 left-3 w-7 h-7 rounded-full flex items-center justify-center z-20 transition-all duration-300"
      style={{ background: RANK_COLORS[rank] ?? "#A3A3A3", boxShadow: "0 2px 8px rgba(0,0,0,0.25)" }}
    >
      <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "13px", color: "white" }}>
        {rank + 1}
      </span>
    </div>
  );
}

// ── Post-confirm popup ────────────────────────────────────────────────────────
function RankingResultModal({
  rankedOptions,
  categoryTitle,
  onContinue,
  onReorder,
}: {
  rankedOptions: Option[];
  categoryTitle: string;
  onContinue: () => void;
  onReorder: () => void;
}) {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = rankedOptions[activeIdx];
  const prevIdx = () => setActiveIdx((i) => Math.max(0, i - 1));
  const nextIdx = () => setActiveIdx((i) => Math.min(rankedOptions.length - 1, i + 1));

  return (
    <div className="fixed inset-0 z-[100] flex flex-col" style={{ background: "rgba(15,10,40,0.88)", backdropFilter: "blur(10px)" }}>
      {/* Hero image area */}
      <div className="relative flex-shrink-0" style={{ height: "42vh", minHeight: 220, maxHeight: 340 }}>
        <img
          src={active.image}
          alt={active.label}
          key={active.label}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ transition: "opacity 0.35s ease" }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(15,10,40,0.92) 100%)" }} />

        {/* Nav arrows */}
        {activeIdx > 0 && (
          <button
            onClick={prevIdx}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center z-10"
            style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)", backdropFilter: "blur(4px)" }}
          >
            <ChevronLeft className="w-5 h-5" style={{ color: "white" }} />
          </button>
        )}
        {activeIdx < rankedOptions.length - 1 && (
          <button
            onClick={nextIdx}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center z-10"
            style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)", backdropFilter: "blur(4px)" }}
          >
            <ChevronRight className="w-5 h-5" style={{ color: "white" }} />
          </button>
        )}

        {/* Name + rank at bottom of image */}
        <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: RANK_COLORS[activeIdx] ?? "#8B5CF6", boxShadow: "0 3px 10px rgba(0,0,0,0.4)" }}
              >
                <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "14px", color: "white" }}>
                  {activeIdx + 1}
                </span>
              </div>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.6)", letterSpacing: "0.06em" }}>
                {activeIdx === 0 ? "TOP PICK" : activeIdx === 1 ? "2ND" : activeIdx === 2 ? "3RD" : `${activeIdx + 1}TH`}
              </span>
            </div>
            <h2 style={{ fontFamily: "Lora, serif", fontSize: "26px", fontWeight: 600, color: "white", lineHeight: 1.2 }}>
              {active.label}
            </h2>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.65)", marginTop: 3 }}>
              {active.stub}
            </p>
          </div>
          {/* Dot indicators */}
          <div className="flex gap-1.5 items-center pb-1">
            {rankedOptions.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                style={{
                  width: activeIdx === i ? 20 : 6,
                  height: 6,
                  borderRadius: 3,
                  background: activeIdx === i ? "white" : "rgba(255,255,255,0.35)",
                  transition: "all 0.25s ease",
                  border: "none",
                  padding: 0,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom sheet */}
      <div className="flex-1 overflow-y-auto" style={{ background: "white", borderRadius: "24px 24px 0 0", padding: "24px 24px 40px" }}>
        {/* Category label */}
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 600, color: "#9CA3AF", letterSpacing: "0.07em", marginBottom: 14 }}>
          {categoryTitle.toUpperCase()} · YOUR RANKING
        </p>

        {/* Ranked chips - horizontal scroll */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {rankedOptions.map((opt, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full flex-shrink-0 transition-all"
              style={{
                background: activeIdx === i ? (RANK_COLORS[i] ?? "#8B5CF6") : "#F5F3FF",
                color: activeIdx === i ? "white" : "#6B7280",
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
                fontSize: "13px",
                border: activeIdx === i ? "none" : "1.5px solid #EDE9FE",
                boxShadow: activeIdx === i ? `0 4px 12px ${RANK_COLORS[i] ?? "#8B5CF6"}44` : "none",
                transform: activeIdx === i ? "scale(1.04)" : "scale(1)",
              }}
            >
              <span
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  background: activeIdx === i ? "rgba(255,255,255,0.25)" : (RANK_COLORS[i] ?? "#A3A3A3"),
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "10px",
                  fontWeight: 700,
                  color: "white",
                  flexShrink: 0,
                }}
              >
                {i + 1}
              </span>
              {opt.label}
            </button>
          ))}
        </div>

        {/* Description */}
        <div style={{ transition: "opacity 0.3s", opacity: 1 }}>
          <p
            style={{ fontFamily: "Lora, serif", fontSize: "20px", fontWeight: 500, color: "#15113C", marginBottom: 10 }}
          >
            {active.label}
          </p>
          <p
            style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", color: "#4B5563", lineHeight: 1.8 }}
          >
            {active.description}
          </p>
        </div>

        {/* Swipe hint */}
        <div
          className="flex items-center justify-center gap-2 mt-6 mb-6 py-2.5 px-4 rounded-2xl"
          style={{ background: "#F5F3FF", border: "1px solid #EDE9FE" }}
        >
          <ChevronLeft className="w-4 h-4" style={{ color: "#9810FA", opacity: activeIdx === 0 ? 0.3 : 1 }} />
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#7C3AED" }}>
            Explore your other ranked qualities
          </span>
          <ChevronRight className="w-4 h-4" style={{ color: "#9810FA", opacity: activeIdx === rankedOptions.length - 1 ? 0.3 : 1 }} />
        </div>

        <div className="flex gap-3">
          <button
            onClick={onReorder}
            className="flex-1 py-4 rounded-full flex items-center justify-center gap-2"
            style={{ background: "#F5F3FF", color: "#7C3AED", fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "15px", border: "1.5px solid #EDE9FE" }}
          >
            <GripVertical className="w-4 h-4" />
            Reorder
          </button>
          <button
            onClick={onContinue}
            className="flex-[2] py-4 rounded-full flex items-center justify-center gap-2"
            style={{ background: "#8B5CF6", color: "white", fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "15px" }}
          >
            <Check className="w-4 h-4" />
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Drag-to-rank list ─────────────────────────────────────────────────────────
function RankableList({
  options,
  onConfirm,
}: {
  options: Option[];
  onConfirm: (ranked: Option[]) => void;
}) {
  const [order, setOrder] = useState<number[]>(() => options.map((_, i) => i));
  const [hasInteracted, setHasInteracted] = useState(false);
  const [draggingPos, setDraggingPos] = useState<number | null>(null);
  const [hintAnim, setHintAnim] = useState(true);

  useEffect(() => {
    setOrder(options.map((_, i) => i));
    setHasInteracted(false);
    setDraggingPos(null);
    setHintAnim(true);
  }, [options]);

  useEffect(() => {
    const t = setTimeout(() => setHintAnim(false), 2200);
    return () => clearTimeout(t);
  }, [options]);

  const dragFrom = useRef<number | null>(null);

  const onDragStart = (pos: number) => {
    dragFrom.current = pos;
    setDraggingPos(pos);
    setHasInteracted(true);
    setHintAnim(false);
  };

  const onDragEnter = (pos: number) => {
    if (dragFrom.current === null || dragFrom.current === pos) return;
    setOrder((prev) => {
      const next = [...prev];
      [next[dragFrom.current!], next[pos]] = [next[pos], next[dragFrom.current!]];
      return next;
    });
    dragFrom.current = pos;
    setDraggingPos(pos);
  };

  const onDragEnd = () => {
    dragFrom.current = null;
    setDraggingPos(null);
  };

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const touchFromPos = useRef<number | null>(null);

  const onTouchStart = (pos: number) => {
    touchFromPos.current = pos;
    dragFrom.current = pos;
    setDraggingPos(pos);
    setHasInteracted(true);
    setHintAnim(false);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    const y = e.touches[0].clientY;
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (y >= rect.top && y <= rect.bottom && dragFrom.current !== null && dragFrom.current !== i) {
        setOrder((prev) => {
          const next = [...prev];
          [next[dragFrom.current!], next[i]] = [next[i], next[dragFrom.current!]];
          return next;
        });
        dragFrom.current = i;
        setDraggingPos(i);
      }
    });
  };

  const onTouchEnd = () => {
    touchFromPos.current = null;
    dragFrom.current = null;
    setDraggingPos(null);
  };

  const handleConfirm = () => {
    onConfirm(order.map((i) => options[i]));
  };

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Hint banner */}
      {!hasInteracted && (
        <div
          className="flex items-center gap-2 justify-center mb-4 px-4 py-2 rounded-2xl mx-auto transition-opacity duration-500"
          style={{
            background: "rgba(255,255,255,0.55)",
            border: "1px solid rgba(152, 16, 250, 0.2)",
            opacity: hintAnim ? 1 : 0.5,
          }}
        >
          <GripVertical
            className="w-4 h-4"
            style={{ color: "#9810FA", animation: hintAnim ? "nudge 0.7s ease-in-out 3" : "none" }}
          />
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#4A5565" }}>
            Hold & drag to reorder
          </span>
        </div>
      )}

      {/* Cards — scrollable */}
      <div
        className="flex flex-col gap-3 overflow-y-auto pb-2"
        style={{ maxWidth: "720px", width: "100%", margin: "0 auto", flex: "1 1 0", minHeight: 0 }}
      >
        {order.map((optIdx, pos) => {
          const option = options[optIdx];
          const isDragging = draggingPos === pos;
          return (
            <div
              key={optIdx}
              ref={(el) => { cardRefs.current[pos] = el; }}
              draggable
              onDragStart={() => onDragStart(pos)}
              onDragEnter={() => onDragEnter(pos)}
              onDragEnd={onDragEnd}
              onDragOver={(e) => e.preventDefault()}
              onTouchStart={() => onTouchStart(pos)}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              className="relative rounded-2xl overflow-hidden select-none transition-all duration-200 flex-shrink-0"
              style={{
                height: 112,
                border: isDragging ? "2px solid rgba(152,16,250,0.7)" : "2px solid rgba(255,255,255,0.6)",
                boxShadow: isDragging ? "0 12px 32px rgba(152,16,250,0.25)" : "0 4px 12px rgba(0,0,0,0.08)",
                transform: isDragging ? "scale(1.02)" : "scale(1)",
                cursor: "grab",
                opacity: isDragging ? 0.85 : 1,
              }}
            >
              {/* Background image */}
              <img alt="" className="absolute inset-0 w-full h-full object-cover" src={option.image} />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.68) 100%)" }}
              />

              <RankBadge rank={pos} />

              {/* Grip handle */}
              <div
                className="absolute top-1/2 right-3 -translate-y-1/2 flex flex-col items-center gap-0.5 z-20"
                style={{ animation: !hasInteracted && hintAnim ? "nudge 0.7s ease-in-out 3" : "none" }}
              >
                <GripVertical className="w-5 h-5" style={{ color: "rgba(255,255,255,0.75)" }} />
              </div>

              {/* Label + stub */}
              <div className="absolute bottom-0 left-0 right-10 px-4 pb-3 z-10">
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "white",
                    textShadow: "0 2px 6px rgba(0,0,0,0.35)",
                    lineHeight: 1.2,
                    marginBottom: 2,
                  }}
                >
                  {option.label}
                </p>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "11px",
                    fontWeight: 400,
                    color: "rgba(255,255,255,0.75)",
                    textShadow: "0 1px 3px rgba(0,0,0,0.4)",
                    lineHeight: 1.4,
                  }}
                >
                  {option.stub}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Confirm button — sticky */}
      <div className="flex-shrink-0 pt-3" style={{ maxWidth: "720px", width: "100%", margin: "0 auto" }}>
        <button
          onClick={handleConfirm}
          className="w-full py-4 rounded-full transition-all flex items-center justify-center gap-2"
          style={{ background: "#8B5CF6", color: "white", fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "16px" }}
        >
          <Check className="w-4 h-4" />
          Confirm ranking
        </button>
      </div>

      <style>{`
        @keyframes nudge {
          0%   { transform: translateX(0); }
          25%  { transform: translateX(-4px); }
          75%  { transform: translateX(4px); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

// ── Main flow ─────────────────────────────────────────────────────────────────
export function PsychologicalProfileFlow({ onComplete, onClose }: PsychologicalProfileFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<Partial<ProfileData>>({});
  const [pendingRanked, setPendingRanked] = useState<Option[] | null>(null);

  const currentCategory = CATEGORIES[currentStep];
  const progress = ((currentStep + 1) / CATEGORIES.length) * 100;

  const handleConfirm = (rankedOptions: Option[]) => {
    setPendingRanked(rankedOptions);
  };

  const handleContinue = () => {
    if (!pendingRanked) return;
    const newSelections = { ...selections, [currentCategory.id]: pendingRanked[0].label };
    setSelections(newSelections);
    setPendingRanked(null);
    if (currentStep < CATEGORIES.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(newSelections as ProfileData);
    }
  };

  const handleBack = () => {
    if (pendingRanked) { setPendingRanked(null); return; }
    if (currentStep > 0) setCurrentStep(currentStep - 1);
    else onClose();
  };

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex flex-col overflow-hidden"
        style={{ background: currentCategory.gradient }}
      >
        {/* Ambient blobs */}
        <div className="absolute inset-0 overflow-hidden opacity-40">
          {[
            { l: 90, t: 30, s: 420, c: "196,181,253", o: 0.3 },
            { l: 20, t: 490, s: 350, c: "251,207,232", o: 0.25 },
            { l: 40, t: 395, s: 290, c: "191,219,254", o: 0.2 },
            { l: -10, t: 345, s: 270, c: "254,215,170", o: 0.2 },
          ].map((b, i) => (
            <div
              key={i}
              className="absolute blur-[70px] rounded-full"
              style={{
                left: b.l, top: b.t, width: b.s, height: b.s,
                background: `radial-gradient(circle, rgba(${b.c},${b.o}) 0%, rgba(${b.c},0) 70%)`,
              }}
            />
          ))}
        </div>

        {/* Stars */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white/40 rounded-full"
              style={{ width: 4, height: 4, left: `${(i * 7.3) % 100}%`, top: `${(i * 13.1) % 100}%` }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <button onClick={handleBack} className="flex items-center gap-2" style={{ background: "transparent" }}>
              <ArrowLeft className="w-5 h-5" style={{ color: "#4A5565" }} />
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 500, color: "#4A5565" }}>
                Back
              </span>
            </button>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#4A5565" }}>
              {currentStep + 1} of {CATEGORIES.length}
            </span>
          </div>

          {/* Progress */}
          <div className="bg-white/40 rounded-full h-[6px] mb-8 overflow-hidden">
            <div
              className="h-full transition-all duration-500"
              style={{ width: `${progress}%`, background: "linear-gradient(to right, #ad46ff, #f6339a, #2b7fff)" }}
            />
          </div>

          {/* Star icon */}
          <div className="flex justify-center mb-5">
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.6)" }}>
              <svg className="w-6 h-6" fill="none" preserveAspectRatio="none" viewBox="0 0 23.9899 23.9899">
                <g>
                  <path d="M9.93282 15.4935C9.84358 15.1476 9.66327 14.8319 9.41065 14.5792C9.15804 14.3266 8.84235 14.1463 8.49642 14.0571L2.364 12.4757C2.25938 12.4461 2.1673 12.383 2.10173 12.2963C2.03616 12.2095 2.00068 12.1037 2.00068 11.9949C2.00068 11.8862 2.03616 11.7804 2.10173 11.6936C2.1673 11.6069 2.25938 11.5438 2.364 11.5142L8.49642 9.93182C8.84223 9.84266 9.15784 9.6625 9.41044 9.41008C9.66304 9.15765 9.84342 8.84216 9.93282 8.49642L11.5142 2.364C11.5435 2.25897 11.6065 2.16643 11.6934 2.10051C11.7803 2.03459 11.8864 1.99891 11.9954 1.99891C12.1045 1.99891 12.2106 2.03459 12.2975 2.10051C12.3844 2.16643 12.4474 2.25897 12.4767 2.364L14.0571 8.49642C14.1463 8.84235 14.3266 9.15804 14.5792 9.41066C14.8319 9.66327 15.1476 9.84358 15.4935 9.93282L21.6259 11.5132C21.7313 11.5422 21.8243 11.6051 21.8906 11.6922C21.9569 11.7792 21.9928 11.8856 21.9928 11.9949C21.9928 12.1043 21.9569 12.2107 21.8906 12.2977C21.8243 12.3848 21.7313 12.4477 21.6259 12.4767L15.4935 14.0571C15.1476 14.1463 14.8319 14.3266 14.5792 14.5792C14.3266 14.8319 14.1463 15.1476 14.0571 15.4935L12.4757 21.6259C12.4464 21.7309 12.3834 21.8235 12.2965 21.8894C12.2096 21.9553 12.1035 21.991 11.9944 21.991C11.8854 21.991 11.7793 21.9553 11.6924 21.8894C11.6055 21.8235 11.5425 21.7309 11.5132 21.6259L9.93282 15.4935Z" stroke="#9810FA" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99916" />
                  <path d="M19.9916 2.99874V6.99705" stroke="#9810FA" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99916" />
                  <path d="M21.9907 4.9979H17.9924" stroke="#9810FA" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99916" />
                  <path d="M3.99832 16.9928V18.9928" stroke="#9810FA" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99916" />
                  <path d="M4.99874 17.9924H2.99874" stroke="#9810FA" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99916" />
                </g>
              </svg>
            </div>
          </div>

          {/* Title */}
          <h1
            className="text-center mb-2"
            style={{ fontFamily: "Lora, serif", fontSize: "22px", fontWeight: 600, color: "#101828", lineHeight: 1.3 }}
          >
            {currentCategory.title}
          </h1>

          {/* Subtitle */}
          <p className="text-center mb-5" style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#4A5565" }}>
            {currentCategory.subtitle}
          </p>

          <RankableList key={currentStep} options={currentCategory.options} onConfirm={handleConfirm} />
        </div>
      </div>

      {/* Post-confirm modal */}
      {pendingRanked && (
        <RankingResultModal
          rankedOptions={pendingRanked}
          categoryTitle={currentCategory.title}
          onContinue={handleContinue}
          onReorder={() => setPendingRanked(null)}
        />
      )}
    </>
  );
}
