import { useState } from "react";
import { Wind, Scan, Anchor, BookHeart, Sparkles, MessageCircle, Target, CheckCircle2, ArrowRight } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type AssessmentSeverity = "positive" | "mild" | "moderate" | "high";

type ToolAction = {
  type: "tool";
  toolId: string;
  label: string;
  description: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
};

type ChatAction = {
  type: "chat";
  prompt: string;
  label: string;
  description: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
};

type IntentAction = {
  type: "intent";
  intentText: string;
  label: string;
  description: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
};

type ActionItem = ToolAction | ChatAction | IntentAction;

// ─── Action library ──────────────────────────────────────────────────────────

const ACTIONS = {
  tools: {
    breath: (desc: string): ToolAction => ({ type: "tool", toolId: "breath", label: "Breath Loop", description: desc, icon: Wind, iconBg: "#CFFAFE", iconColor: "#0891B2" }),
    bodyscan: (desc: string): ToolAction => ({ type: "tool", toolId: "bodyscan", label: "Body Scan", description: desc, icon: Scan, iconBg: "#D1FAE5", iconColor: "#059669" }),
    grounding: (desc: string): ToolAction => ({ type: "tool", toolId: "grounding", label: "Grounding Exercise", description: desc, icon: Anchor, iconBg: "#F3E8FF", iconColor: "#7C3AED" }),
    gratitude: (desc: string): ToolAction => ({ type: "tool", toolId: "gratitude", label: "Gratitude Journal", description: desc, icon: BookHeart, iconBg: "#FEF3C7", iconColor: "#B45309" }),
    affirmations: (desc: string): ToolAction => ({ type: "tool", toolId: "affirmations", label: "Affirmations", description: desc, icon: Sparkles, iconBg: "#EDE9FE", iconColor: "#7C3AED" }),
  },
  chat: (prompt: string, label: string, desc: string): ChatAction => ({
    type: "chat", prompt, label, description: desc,
    icon: MessageCircle, iconBg: "#EDE9FE", iconColor: "#7C3AED",
  }),
  intent: (text: string, label: string, desc: string): IntentAction => ({
    type: "intent", intentText: text, label, description: desc,
    icon: Target, iconBg: "#D1FAE5", iconColor: "#059669",
  }),
};

// ─── Recommendation mapping ───────────────────────────────────────────────────

type SeverityMap = Record<AssessmentSeverity, [ActionItem, ActionItem, ActionItem]>;

const RECOMMENDATIONS: Record<string, SeverityMap> = {
  gad7: {
    positive: [
      ACTIONS.tools.breath("Keep your calm baseline with a short breathing practice."),
      ACTIONS.chat("My anxiety check came back minimal. I want to talk about what's been helping me stay grounded.", "Reflect with Oracle", "Explore what's supporting your wellbeing"),
      ACTIONS.intent("Do a 5-minute mindfulness check-in every morning", "Daily mindfulness", "Log an intention to stay attuned to your state"),
    ],
    mild: [
      ACTIONS.tools.breath("A short 4-7-8 breath cycle to ease mild anxiety in the moment."),
      ACTIONS.chat("My anxiety assessment shows mild anxiety. I'd like to explore what might be triggering it.", "Explore triggers", "A guided conversation about your anxiety patterns"),
      ACTIONS.intent("Take a 10-minute walk outside each day without my phone", "Daily movement break", "Physical movement is one of the fastest anxiety regulators"),
    ],
    moderate: [
      ACTIONS.tools.bodyscan("A body scan grounds you in the present and releases held tension."),
      ACTIONS.chat("My anxiety is showing as moderate. I want to understand what's driving this and find some strategies.", "Talk it through", "Unpack your anxiety patterns with Oracle"),
      ACTIONS.intent("Create a 15-minute worry window each day — then consciously close it", "Contain the worry", "A structured worry window stops anxiety from bleeding into your day"),
    ],
    high: [
      ACTIONS.tools.grounding("The 5-4-3-2-1 technique anchors you in the present when anxiety feels intense."),
      ACTIONS.chat("My GAD-7 shows severe anxiety. I need support right now — can we talk?", "Get support now", "A compassionate space to process what you're going through"),
      ACTIONS.intent("Reach out to a support person or therapist this week", "Seek support", "You don't have to carry this alone — connection is the first step"),
    ],
  },
  dass: {
    positive: [
      ACTIONS.tools.gratitude("Gratitude journalling maintains a positive emotional baseline."),
      ACTIONS.chat("My DASS came back in the healthy range. I want to reflect on what's working.", "Reflect on what's working", "Reinforce the habits that are keeping you well"),
      ACTIONS.intent("Write three things I'm grateful for before bed each night", "Evening gratitude ritual", "Gratitude before sleep improves mood and sleep quality"),
    ],
    mild: [
      ACTIONS.tools.breath("A short breathing cycle gently shifts your nervous system out of mild stress."),
      ACTIONS.chat("My DASS results show mild depression and stress. Can we talk about what's been weighing on me?", "Process what's weighing on you", "Gentle exploration of what's contributing to your state"),
      ACTIONS.intent("Spend 20 minutes outside in natural light every day", "Daily light exposure", "Natural light is one of the most effective mood regulators"),
    ],
    moderate: [
      ACTIONS.tools.bodyscan("A body scan helps you notice where stress is held and begins to release it."),
      ACTIONS.chat("My DASS shows moderate levels across depression, anxiety, and stress. I want to understand the pattern.", "Understand the pattern", "Explore what's underneath the scores with Oracle"),
      ACTIONS.intent("Protect one hour of 'off' time each evening with no screens", "Evening wind-down", "Recovery needs a clear signal that the day is done"),
    ],
    high: [
      ACTIONS.tools.grounding("Grounding is a fast-acting tool when emotional intensity feels overwhelming."),
      ACTIONS.chat("My DASS scores are severe. I really need to talk — I'm struggling.", "I need to talk", "A safe, non-judgmental space for you right now"),
      ACTIONS.intent("Book an appointment with a mental health professional this week", "Professional support", "These scores suggest professional guidance would help — you deserve it"),
    ],
  },
  "burnout-bat": {
    positive: [
      ACTIONS.tools.affirmations("Affirmations reinforce a healthy identity outside of work productivity."),
      ACTIONS.chat("My burnout assessment is in the healthy range. I want to talk about maintaining this.", "Maintain the balance", "Explore what's protecting your energy"),
      ACTIONS.intent("Take a full digital detox for one evening per week", "Weekly digital detox", "Recovery requires genuine disconnection from work"),
    ],
    mild: [
      ACTIONS.tools.breath("A short breathing loop activates your parasympathetic system — the antidote to overwork."),
      ACTIONS.chat("My BAT shows early signs of burnout. Can we talk about what's draining my energy?", "Explore energy drains", "Identify what's depleting you before it compounds"),
      ACTIONS.intent("End work at a fixed time every day — no exceptions for one week", "Hard stop time", "Boundaries with work are non-negotiable for recovery"),
    ],
    moderate: [
      ACTIONS.tools.bodyscan("Burnout lives in the body. A body scan begins the process of reconnection and recovery."),
      ACTIONS.chat("I'm showing moderate burnout. I want to understand the dimensions driving this and find a path back.", "Map your recovery", "A structured exploration of your burnout profile"),
      ACTIONS.intent("Plan one restorative activity this weekend that has nothing to do with productivity", "Restorative weekend block", "Burnout recovery requires deliberate non-doing"),
    ],
    high: [
      ACTIONS.tools.grounding("When burnout is severe, grounding exercises help you reconnect with what matters most."),
      ACTIONS.chat("My burnout scores are in the severe range. I need to talk about this — it's affecting everything.", "This needs attention", "Burnout at this level needs a real plan — let's build one together"),
      ACTIONS.intent("Have an honest conversation with my manager about workload this week", "Workload conversation", "Structural change is necessary — this begins with speaking up"),
    ],
  },
  siboq: {
    positive: [
      ACTIONS.tools.breath("Maintain your energy with a short daily breathing practice."),
      ACTIONS.chat("My fatigue check is minimal. I want to talk about what's keeping my energy up.", "Share what's working", "Reinforce your positive habits with Oracle"),
      ACTIONS.intent("Keep one energising activity in my week that I do purely for enjoyment", "Joy-based activity", "Energy maintenance requires activities that fill, not drain"),
    ],
    mild: [
      ACTIONS.tools.bodyscan("A quick body scan helps identify where fatigue is accumulating."),
      ACTIONS.chat("I'm noticing some fatigue. Can we talk about what might be draining my energy?", "Explore the fatigue", "Identify early patterns before they become burnout"),
      ACTIONS.intent("Go to bed 30 minutes earlier each night this week", "Sleep investment", "Fatigue signals a sleep debt — paying it back starts tonight"),
    ],
    moderate: [
      ACTIONS.tools.breath("Box breathing (4-4-4-4) can restore alertness when fatigue feels heavy."),
      ACTIONS.chat("My burnout quick check shows significant fatigue. I want to understand what's driving it.", "Dig into the cause", "Fatigue has a root cause — let's find yours"),
      ACTIONS.intent("Remove one non-essential commitment from my schedule this week", "Reduce commitments", "Recovery requires creating space, not just adding rest"),
    ],
    high: [
      ACTIONS.tools.grounding("When exhaustion is high, grounding techniques help you reconnect with the present moment."),
      ACTIONS.chat("I'm scoring high on fatigue — it's affecting my daily life. I need support.", "I need help with this", "Severe fatigue deserves real attention and a plan"),
      ACTIONS.intent("Take at least one full rest day this week with no obligations", "Rest day", "Your body is signalling it needs complete recovery time"),
    ],
  },
  rbst: {
    positive: [
      ACTIONS.tools.affirmations("Affirmations reinforce the strengths keeping burnout at bay."),
      ACTIONS.chat("My burnout screener is low risk. What can we do to keep it that way?", "Protect the status quo", "Build a proactive plan to stay resilient"),
      ACTIONS.intent("Schedule a monthly wellbeing check-in with myself", "Monthly self-audit", "Prevention is the best burnout strategy"),
    ],
    mild: [
      ACTIONS.tools.breath("A breathing cycle breaks the stress-tension cycle before it compounds."),
      ACTIONS.chat("My burnout risk is showing some early signals. Can we talk about what's building up?", "Catch it early", "Address early signals before they escalate"),
      ACTIONS.intent("Identify the one work task that drains me most and find one way to reduce it", "Reduce one drain", "Small changes to your workload have outsized effects"),
    ],
    moderate: [
      ACTIONS.tools.bodyscan("Moderate burnout risk often means stress is already held in the body. A scan surfaces this."),
      ACTIONS.chat("My burnout risk is moderate. I want to map where it's coming from and what to change.", "Map the risk factors", "Turn your RBST results into a real action plan"),
      ACTIONS.intent("Spend 15 minutes journalling about what I'd change about my workload if I could", "Workload reflection", "Clarity about what needs to change is the first step to changing it"),
    ],
    high: [
      ACTIONS.tools.grounding("High burnout risk needs immediate decompression. Grounding is a fast-acting reset."),
      ACTIONS.chat("My RBST shows high burnout risk. I need to talk honestly about this — it can't continue.", "This needs action", "High burnout risk is a serious signal — let's create a real plan"),
      ACTIONS.intent("Block two full hours this week for recovery with no work allowed", "Mandatory recovery time", "You cannot work your way out of burnout — rest is the work now"),
    ],
  },
  ace: {
    positive: [
      ACTIONS.tools.affirmations("Affirmations support building a safe, nurturing self-narrative."),
      ACTIONS.chat("I completed the ACE assessment. My score is low. I'd like to reflect on my resilience journey.", "Reflect on resilience", "Explore the strengths you've built"),
      ACTIONS.intent("Write a letter to my younger self about what I've learned", "Self-compassion letter", "Acknowledging your journey builds the foundation for continued growth"),
    ],
    mild: [
      ACTIONS.tools.breath("Breathing practices signal safety to a nervous system shaped by past stress."),
      ACTIONS.chat("I completed the ACE assessment and want to talk about some of the experiences it surfaced.", "Talk about what surfaced", "A compassionate space to process your reflections"),
      ACTIONS.intent("Notice one moment each day where I feel genuinely safe and at ease", "Safety anchoring", "Building awareness of safety counterbalances stored stress"),
    ],
    moderate: [
      ACTIONS.tools.bodyscan("The body holds the imprint of past experiences. A body scan begins somatic healing."),
      ACTIONS.chat("My ACE score is moderate. I want to talk about how my past might be shaping my present.", "Understand the impact", "Connecting past experiences to present patterns, gently"),
      ACTIONS.intent("Reach out to one trusted person this week and share something real", "Connection practice", "Safe connection is one of the most powerful antidotes to early adversity"),
    ],
    high: [
      ACTIONS.tools.grounding("Grounding anchors you in the present when past experiences surface strongly."),
      ACTIONS.chat("My ACE score is high. I want to talk about this carefully — some of this is heavy.", "Take this gently", "A warm, non-judgmental conversation at whatever pace feels right"),
      ACTIONS.intent("Find a trauma-informed therapist or support group and make first contact this month", "Professional support", "Your experiences deserve proper support — taking this step is an act of courage"),
    ],
  },
  grat: {
    positive: [
      ACTIONS.tools.gratitude("Keep your gratitude practice alive with a short daily journal entry."),
      ACTIONS.chat("My gratitude scale is high. I want to talk about how to keep cultivating this.", "Deepen gratitude", "Explore how to make gratitude a lasting part of your life"),
      ACTIONS.intent("Share a specific expression of gratitude with someone today", "Active gratitude", "Gratitude expressed outward amplifies its effect on you"),
    ],
    mild: [
      ACTIONS.tools.gratitude("Start a gratitude journal — even three entries a day shifts perspective over time."),
      ACTIONS.chat("My gratitude is on the lower side. Can we talk about what's making it harder to feel appreciative?", "Explore what blocks gratitude", "Understand what's getting in the way"),
      ACTIONS.intent("Write three specific things I'm grateful for every morning before checking my phone", "Morning gratitude practice", "Starting the day with gratitude rewires morning orientation"),
    ],
    moderate: [
      ACTIONS.tools.affirmations("Affirmations help build the positive self-narrative that supports gratitude."),
      ACTIONS.chat("My gratitude levels are moderate. I want to explore what's drawing my attention toward the negative.", "Challenge negativity bias", "Gratitude requires actively working against negativity bias"),
      ACTIONS.intent("Spend 5 minutes each evening recalling one moment I genuinely enjoyed today", "Evening savouring", "Savouring positive experiences deepens their emotional impact"),
    ],
    high: [
      ACTIONS.tools.breath("Breathing creates calm space for gratitude to emerge naturally."),
      ACTIONS.chat("My gratitude is really low right now. I want to talk honestly about why life feels difficult to appreciate.", "Talk about what's hard", "Sometimes gratitude is hard because real things are hard — let's talk"),
      ACTIONS.intent("Do one kind act for someone else today — without any agenda", "Compassion in action", "Giving shifts perspective in ways that thinking about gratitude cannot"),
    ],
  },
  "gratitude-assess": {
    positive: [
      ACTIONS.tools.gratitude("A short journal entry keeps your gratitude practice active."),
      ACTIONS.chat("My gratitude questionnaire is high. Let's talk about sustaining this over time.", "Sustain the practice", "Build a routine that keeps gratitude accessible"),
      ACTIONS.intent("Tell one person today exactly why I appreciate them", "Gratitude expressed", "Expressed gratitude strengthens both the giver and receiver"),
    ],
    mild: [
      ACTIONS.tools.gratitude("Begin a gratitude journal — three things daily, specific over general."),
      ACTIONS.chat("My GQ-6 is on the low side. I want to understand what's making gratitude harder right now.", "Understand the block", "Explore what's making appreciation difficult"),
      ACTIONS.intent("Notice five things I usually take for granted — and pause to appreciate each one today", "Appreciation audit", "What we take for granted often holds the most gratitude potential"),
    ],
    moderate: [
      ACTIONS.tools.affirmations("Affirmations build the positive self-regard that makes gratitude easier."),
      ACTIONS.chat("My gratitude assessment is moderate. Can we talk about shifting my attentional focus?", "Shift attention", "Explore how attention shapes emotional state with Oracle"),
      ACTIONS.intent("End each day with one sentence: 'Today I am grateful for…'", "Daily gratitude close", "Simple rituals create lasting habit grooves"),
    ],
    high: [
      ACTIONS.tools.breath("Stillness creates space for appreciation to emerge. Begin with breath."),
      ACTIONS.chat("My gratitude is really low. Life feels heavy right now — I want to talk about it.", "Talk about what's heavy", "When gratitude is hard, something real is usually blocking it"),
      ACTIONS.intent("Tomorrow morning, write down three things — however small — that didn't go wrong today", "Tiny gratitudes", "Negative bias makes small goods invisible — a list makes them real"),
    ],
  },
  "anxiety-assess": {
    positive: [
      ACTIONS.tools.breath("Maintain your calm with a short daily breathing practice."),
      ACTIONS.chat("My anxiety check-in is minimal. I want to talk about what's contributing to my resilience.", "Explore your resilience", "Understand what's keeping worry at bay"),
      ACTIONS.intent("Build a 10-minute morning stillness ritual before the day begins", "Morning stillness", "Starting from calm makes the whole day more regulated"),
    ],
    mild: [
      ACTIONS.tools.breath("A slow exhale-focused breathing cycle directly activates your calm response."),
      ACTIONS.chat("My PSWQ shows some tendency to worry. Can we talk about what I'm most worried about?", "Name the worry", "Naming worry specifically reduces its power"),
      ACTIONS.intent("Catch three worry thoughts today and write a single counter-perspective for each", "Worry reframe", "Structured reframing interrupts the worry loop"),
    ],
    moderate: [
      ACTIONS.tools.bodyscan("Worry lives in the mind — a body scan brings you back into your body and breaks the cycle."),
      ACTIONS.chat("My worry tendency is moderate. I'd like to work on what feeds it and what helps.", "Work on worry patterns", "Explore your worry profile and practical tools with Oracle"),
      ACTIONS.intent("Schedule a 20-minute 'worry window' each day and keep worry contained to that time", "Worry window", "Scheduling worry sounds odd but is one of the most evidence-based interventions"),
    ],
    high: [
      ACTIONS.tools.grounding("High worry needs a pattern interruption. The 5-4-3-2-1 technique brings you back to now."),
      ACTIONS.chat("My anxiety score is high — worry is taking up a lot of space. I need to talk about this.", "I need help with worry", "Severe worry is exhausting — let's find you real relief"),
      ACTIONS.intent("Contact a CBT therapist or counsellor this week — worry this persistent responds well to professional support", "Professional CBT support", "Cognitive behavioural therapy has the strongest evidence base for persistent worry"),
    ],
  },
  "trauma-assess": {
    positive: [
      ACTIONS.tools.affirmations("Affirmations support the positive self-narrative that trauma can erode."),
      ACTIONS.chat("My trauma screen came back minimal. I'd like to reflect on what supports my sense of safety.", "Reflect on safety", "Explore what grounds and protects you"),
      ACTIONS.intent("Spend five minutes each day in a place or activity where I feel completely safe", "Safety practice", "Regularly accessing safety signals builds nervous system resilience"),
    ],
    mild: [
      ACTIONS.tools.breath("A long, slow exhale is one of the fastest ways to signal safety to a nervous system on alert."),
      ACTIONS.chat("My trauma screen showed some symptoms. I want to talk about these experiences carefully.", "Process gently", "A slow, compassionate conversation at your pace"),
      ACTIONS.intent("Identify one person I trust enough to talk to about difficult experiences", "Name a trusted person", "Having a named safe person is protective for trauma survivors"),
    ],
    moderate: [
      ACTIONS.tools.grounding("Grounding techniques are foundational for trauma recovery — they return you to the present."),
      ACTIONS.chat("My TSQ score is moderate. I want to talk about how past experiences are affecting me now.", "Connect past to present", "Understand how your experiences shape your current responses"),
      ACTIONS.intent("Find a trauma-informed practitioner in my area and research their approach this week", "Research support options", "Trauma responds well to specialised support — knowing your options is empowering"),
    ],
    high: [
      ACTIONS.tools.grounding("Grounding is essential when trauma symptoms are high. 5-4-3-2-1 brings you back to now."),
      ACTIONS.chat("My trauma symptoms are significant. I want to talk carefully — this is hard to hold alone.", "You don't have to hold this alone", "A warm, unhurried space for what's been difficult to carry"),
      ACTIONS.intent("Book an appointment with a trauma-informed therapist this week — not next month, this week", "Trauma-informed therapy", "Trauma at this level deserves specialised professional support — please act on this"),
    ],
  },
};

// Default fallback for assessments not explicitly mapped
const DEFAULT_RECOMMENDATIONS: SeverityMap = {
  positive: [
    ACTIONS.tools.breath("Maintain your wellbeing with a short daily breathing practice."),
    ACTIONS.chat("My assessment result is positive. I want to talk about what's contributing to this.", "Reflect with Oracle", "Explore what's keeping you well"),
    ACTIONS.intent("Do one restorative activity today that has nothing to do with productivity", "Restorative activity", "Recovery and play are as important as work"),
  ],
  mild: [
    ACTIONS.tools.bodyscan("A body scan surfaces how stress is held and begins to release it."),
    ACTIONS.chat("My assessment shows some areas to work on. Can we explore what's behind this?", "Explore with Oracle", "Understand the pattern with Oracle"),
    ACTIONS.intent("Set aside 20 minutes today to do something I genuinely enjoy", "Joy block", "Wellbeing requires deliberate positive experience"),
  ],
  moderate: [
    ACTIONS.tools.breath("Breathing is the fastest on-ramp to a regulated nervous system."),
    ACTIONS.chat("My assessment is showing moderate levels. I want to understand what's driving this and make a plan.", "Make a plan", "Turn your results into a real action plan"),
    ACTIONS.intent("Protect two evenings this week for pure rest — no obligations, no screens", "Recovery evenings", "Moderate stress needs deliberate recovery to prevent escalation"),
  ],
  high: [
    ACTIONS.tools.grounding("When stress is high, grounding brings you back to the present moment quickly."),
    ACTIONS.chat("My assessment scores are high. I'm struggling and I want to talk about it.", "Talk to Oracle", "You don't have to navigate this alone"),
    ACTIONS.intent("Identify one structural change you can make this week to reduce load", "One structural change", "High scores require systemic change, not just coping strategies"),
  ],
};

function getRecommendations(assessmentId: string, severity: AssessmentSeverity): [ActionItem, ActionItem, ActionItem] {
  const map = RECOMMENDATIONS[assessmentId] ?? DEFAULT_RECOMMENDATIONS;
  return map[severity] as [ActionItem, ActionItem, ActionItem];
}

// ─── Action card ──────────────────────────────────────────────────────────────

function ActionCard({
  item,
  onStartTool,
  onOpenChat,
  onLogIntent,
}: {
  item: ActionItem;
  onStartTool: (id: string) => void;
  onOpenChat: (prompt: string) => void;
  onLogIntent: (text: string) => void;
}) {
  const [intentLogged, setIntentLogged] = useState(false);
  const Icon = item.icon;

  const handleAction = () => {
    if (item.type === "tool") onStartTool(item.toolId);
    else if (item.type === "chat") onOpenChat(item.prompt);
    else {
      setIntentLogged(true);
      onLogIntent(item.intentText);
    }
  };

  const ctaLabel =
    item.type === "tool" ? "Start practice" :
    item.type === "chat" ? "Open chat" :
    intentLogged ? "Logged ✓" : "Log this intention";

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.88)",
        border: "1.5px solid rgba(139,92,246,0.10)",
        borderRadius: 20,
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      {/* Header row */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
        <div
          style={{
            width: 40, height: 40, borderRadius: 12, flexShrink: 0,
            background: item.iconBg,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <Icon style={{ width: 18, height: 18, color: item.iconColor, strokeWidth: 1.75 }} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Type pill */}
          <span
            style={{
              display: "inline-block",
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase" as const,
              color: item.type === "tool" ? "#0891B2" : item.type === "chat" ? "#7C3AED" : "#059669",
              background: item.type === "tool" ? "#CFFAFE" : item.type === "chat" ? "#EDE9FE" : "#D1FAE5",
              borderRadius: 6,
              padding: "2px 6px",
              marginBottom: 4,
            }}
          >
            {item.type === "tool" ? "Practice" : item.type === "chat" ? "Oracle Chat" : "Goal Intent"}
          </span>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 600, color: "#15113C", lineHeight: 1.3 }}>
            {item.label}
          </p>
        </div>
      </div>

      {/* Description */}
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#6B7280", lineHeight: 1.55 }}>
        {item.description}
      </p>

      {/* Intent text preview */}
      {item.type === "intent" && (
        <div
          style={{
            background: "#F9FAFB",
            border: "1px solid #F3F4F6",
            borderRadius: 12,
            padding: "10px 14px",
          }}
        >
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#374151", fontStyle: "italic", lineHeight: 1.5 }}>
            "{item.intentText}"
          </p>
        </div>
      )}

      {/* CTA */}
      <button
        onClick={handleAction}
        disabled={intentLogged}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          width: "100%",
          padding: "12px 16px",
          borderRadius: 9999,
          border: "none",
          cursor: intentLogged ? "default" : "pointer",
          fontFamily: "Inter, sans-serif",
          fontSize: 13,
          fontWeight: 600,
          background: intentLogged
            ? "#D1FAE5"
            : item.type === "tool" ? "#8B5CF6"
            : item.type === "chat" ? "#8B5CF6"
            : "#8B5CF6",
          color: intentLogged ? "#059669" : "white",
          transition: "transform 0.1s ease, opacity 0.15s ease",
        }}
      >
        {intentLogged ? (
          <>
            <CheckCircle2 style={{ width: 15, height: 15, strokeWidth: 1.75 }} />
            {ctaLabel}
          </>
        ) : (
          <>
            {ctaLabel}
            <ArrowRight style={{ width: 15, height: 15, strokeWidth: 1.75 }} />
          </>
        )}
      </button>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

interface AssessmentActionItemsProps {
  assessmentId: string;
  severity: AssessmentSeverity;
  severityLabel: string;
  severityColor: string;
  severityBg: string;
  onStartTool: (toolId: string) => void;
  onOpenChat: (prompt: string) => void;
  onLogIntent?: (text: string) => void;
}

export function AssessmentActionItems({
  assessmentId,
  severity,
  severityLabel,
  severityColor,
  severityBg,
  onStartTool,
  onOpenChat,
  onLogIntent = () => {},
}: AssessmentActionItemsProps) {
  const [tool, chat, intent] = getRecommendations(assessmentId, severity);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {/* Severity label */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 4 }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "8px 20px",
            borderRadius: 9999,
            background: severityBg,
          }}
        >
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 15, fontWeight: 700, color: severityColor }}>
            {severityLabel}
          </span>
        </div>
      </div>

      {/* Section header */}
      <p
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: 11,
          fontWeight: 700,
          color: "#9CA3AF",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          textAlign: "center",
          marginBottom: 4,
        }}
      >
        Your action plan
      </p>

      {/* 3 action cards */}
      <ActionCard item={tool} onStartTool={onStartTool} onOpenChat={onOpenChat} onLogIntent={onLogIntent} />
      <ActionCard item={chat} onStartTool={onStartTool} onOpenChat={onOpenChat} onLogIntent={onLogIntent} />
      <ActionCard item={intent} onStartTool={onStartTool} onOpenChat={onOpenChat} onLogIntent={onLogIntent} />
    </div>
  );
}
