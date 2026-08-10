import { useState } from "react";
import {
  Heart, Wind, Brain, Eye, BookHeart, Target, Calendar, Users, Scan,
  Layers, MessageCircle, Moon, Plus, Gamepad2, ChevronRight,
  ChevronDown, Clock,
} from "lucide-react";

interface Tool {
  id: string;
  name: string;
  description: string;
  tag: string;
  icon: React.ElementType;
}

interface ToolsScreenProps {
  onNavigateToGames?: () => void;
  onSelectTool?: (toolId: string) => void;
}

const CARD_BG = "rgba(255,255,255,0.88)";
const CARD_BORDER = "1.5px solid rgba(139,92,246,0.12)";
const ICON_COLOR = "#15113C";
const CHIP_TEXT = "#15113C";

const TAG_STYLES: Record<string, { iconBg: string; chipBg: string }> = {
  BODY:    { iconBg: "#CCFBF1", chipBg: "#99F6E4" },
  SELF:    { iconBg: "#EDE9FE", chipBg: "#C4B5FD" },
  PSYCHE:  { iconBg: "#FEF3C7", chipBg: "#FDE68A" },
  DAILY:   { iconBg: "#DBEAFE", chipBg: "#BFDBFE" },
  AGENCY:  { iconBg: "#DCFCE7", chipBg: "#BBF7D0" },
  HABIT:   { iconBg: "#FCE7F3", chipBg: "#FBCFE8" },
  PARTS:   { iconBg: "#FFF7ED", chipBg: "#FED7AA" },
  SOMATIC: { iconBg: "#CFFAFE", chipBg: "#A5F3FC" },
  ZER:     { iconBg: "#FFE4E6", chipBg: "#FECDD3" },
  MIND:    { iconBg: "#E0E7FF", chipBg: "#C7D2FE" },
  SOS:     { iconBg: "#FEE2E2", chipBg: "#FCA5A5" },
  REST:    { iconBg: "#F3E8FF", chipBg: "#E9D5FF" },
};

// ── Mock history data ──────────────────────────────────────────────────────────
interface HistorySession {
  id: string;
  date: string;
  summary: string;
  duration: string;
}

interface ToolHistoryEntry {
  toolId: string;
  toolName: string;
  icon: React.ElementType;
  tag: string;
  sessions: HistorySession[];
}

const MOCK_HISTORY: ToolHistoryEntry[] = [
  {
    toolId: "breath",
    toolName: "Breath Loops",
    icon: Wind,
    tag: "BODY",
    sessions: [
      { id: "b1", date: "Today, 8:23 AM",       summary: "4-7-8 breathing · 3 cycles · Felt calmer after", duration: "4 min" },
      { id: "b2", date: "Yesterday, 9:10 PM",    summary: "Box breathing · 5 cycles · Good sleep prep",    duration: "6 min" },
      { id: "b3", date: "Aug 8, 7:45 AM",        summary: "Coherence breathing · 4 cycles",                duration: "5 min" },
      { id: "b4", date: "Aug 7, 2:30 PM",        summary: "4-7-8 breathing · 2 cycles · Work break",       duration: "3 min" },
    ],
  },
  {
    toolId: "gratitude",
    toolName: "Gratitude Journal",
    icon: BookHeart,
    tag: "DAILY",
    sessions: [
      { id: "g1", date: "Today, 7:15 AM",     summary: "3 gratitudes · Focused on relationships",  duration: "3 min" },
      { id: "g2", date: "Yesterday, 7:30 AM", summary: "3 gratitudes · Nature & small joys",        duration: "4 min" },
      { id: "g3", date: "Aug 8, 8:00 AM",     summary: "3 gratitudes · Work achievements",          duration: "3 min" },
    ],
  },
  {
    toolId: "zer",
    toolName: "Zone of Emotional Regulation",
    icon: Layers,
    tag: "ZER",
    sessions: [
      { id: "z1", date: "Aug 9, 3:15 PM",  summary: "High Unpleasant → Regulate & Release · Anxious", duration: "8 min" },
      { id: "z2", date: "Aug 7, 11:45 AM", summary: "Low Unpleasant → Restore & Connect · Tired",      duration: "7 min" },
      { id: "z3", date: "Aug 5, 4:30 PM",  summary: "High Unpleasant → Regulate & Release · Stressed", duration: "9 min" },
    ],
  },
  {
    toolId: "affirmations",
    toolName: "Affirmations",
    icon: MessageCircle,
    tag: "MIND",
    sessions: [
      { id: "a1", date: "Today, 7:00 AM",  summary: "Strength category · 5 affirmations",    duration: "3 min" },
      { id: "a2", date: "Aug 9, 7:30 AM",  summary: "Self-Worth category · 5 affirmations",  duration: "3 min" },
      { id: "a3", date: "Aug 8, 8:15 AM",  summary: "Calm category · 5 affirmations",        duration: "3 min" },
      { id: "a4", date: "Aug 7, 7:00 AM",  summary: "Clarity category · 5 affirmations",     duration: "3 min" },
    ],
  },
  {
    toolId: "crisis",
    toolName: "Micro Grounding",
    icon: Heart,
    tag: "SOS",
    sessions: [
      { id: "m1", date: "Aug 8, 2:30 PM", summary: "5-4-3-2-1 grounding · Anxiety before meeting", duration: "3 min" },
      { id: "m2", date: "Aug 6, 7:45 PM", summary: "Cold breath technique · Evening overwhelm",     duration: "2 min" },
    ],
  },
  {
    toolId: "bodyscan",
    toolName: "Body Scan",
    icon: Scan,
    tag: "SOMATIC",
    sessions: [
      { id: "s1", date: "Aug 9, 9:00 PM", summary: "Full body scan · 7 zones · Tension in shoulders", duration: "12 min" },
      { id: "s2", date: "Aug 6, 9:30 PM", summary: "Full body scan · 7 zones · Good relaxation",      duration: "11 min" },
    ],
  },
];

// ── History sub-components ────────────────────────────────────────────────────
function SessionRow({ session }: { session: HistorySession }) {
  return (
    <div
      className="flex items-start gap-3 py-3"
      style={{ borderTop: "1px solid rgba(139,92,246,0.08)" }}
    >
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
        style={{ background: "#EDE9FE" }}
      >
        <Clock className="w-3.5 h-3.5" style={{ color: ICON_COLOR }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold mb-0.5" style={{ fontFamily: "Inter, sans-serif", color: "#15113C" }}>
          {session.date}
        </p>
        <p className="text-xs leading-relaxed" style={{ fontFamily: "Inter, sans-serif", color: "#6B7280" }}>
          {session.summary}
        </p>
      </div>
      <span
        className="text-xs px-2 py-0.5 rounded-full flex-shrink-0"
        style={{ background: "#F3F4F6", color: "#9CA3AF", fontFamily: "Inter, sans-serif", fontWeight: 600 }}
      >
        {session.duration}
      </span>
    </div>
  );
}

function HistoryCard({
  entry,
  expanded,
  onToggle,
}: {
  entry: ToolHistoryEntry;
  expanded: boolean;
  onToggle: () => void;
}) {
  const tagStyle = TAG_STYLES[entry.tag] ?? TAG_STYLES.SELF;
  const lastSession = entry.sessions[0];

  return (
    <div
      className="rounded-3xl overflow-hidden"
      style={{ background: CARD_BG, border: CARD_BORDER, boxShadow: "0 2px 10px rgba(139,92,246,0.06)" }}
    >
      {/* Card header — tappable */}
      <button
        onClick={onToggle}
        className="w-full p-4 flex items-center gap-3 cb-ripple text-left"
      >
        {/* Icon */}
        <div
          className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{ background: tagStyle.iconBg }}
        >
          <entry.icon className="w-5 h-5" style={{ color: ICON_COLOR, strokeWidth: 2 }} />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <h3 className="text-sm font-semibold truncate" style={{ fontFamily: "Inter, sans-serif", color: "#15113C" }}>
              {entry.toolName}
            </h3>
            {entry.tag && (
              <span
                className="text-xs px-2 py-0.5 rounded-md flex-shrink-0"
                style={{ background: tagStyle.chipBg, color: CHIP_TEXT, fontFamily: "Inter", fontWeight: 700, fontSize: "9px", letterSpacing: "0.06em" }}
              >
                {entry.tag}
              </span>
            )}
          </div>
          <p className="text-xs" style={{ fontFamily: "Inter, sans-serif", color: "#9CA3AF" }}>
            {entry.sessions.length} session{entry.sessions.length !== 1 ? "s" : ""} · Last: {lastSession.date}
          </p>
        </div>

        {/* Chevron */}
        <ChevronDown
          className="w-4 h-4 flex-shrink-0 transition-transform duration-200"
          style={{ color: "#9CA3AF", transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      {/* Session list */}
      {expanded && (
        <div className="px-4 pb-3">
          {entry.sessions.map((s) => (
            <SessionRow key={s.id} session={s} />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
export function ToolsScreen({ onNavigateToGames, onSelectTool }: ToolsScreenProps = {}) {
  const [activeTab, setActiveTab] = useState<"tools" | "history">("tools");
  const [expandedToolId, setExpandedToolId] = useState<string | null>(null);

  const tools: Tool[] = [
    { id: "crisis",            name: "Micro Grounding",              description: "Quick grounding — available anytime",    tag: "",        icon: Heart },
    { id: "breath",            name: "Breath Loops",                 description: "4-7-8 · Box · Coherence breathing",      tag: "BODY",    icon: Wind },
    { id: "disidentification", name: "Disidentification",            description: "I have thoughts, I am not thoughts",     tag: "SELF",    icon: Brain },
    { id: "imagery",           name: "Guided Imagery",               description: "Visualization & inner landscape",        tag: "PSYCHE",  icon: Eye },
    { id: "gratitude",         name: "Gratitude Journal",            description: "Daily anchoring practice",               tag: "DAILY",   icon: BookHeart },
    { id: "will",              name: "Will Training",                description: "Acts of Will daily exercises",           tag: "AGENCY",  icon: Target },
    { id: "ritual",            name: "Ritual Builder",               description: "Morning · Evening · Create rituals",     tag: "HABIT",   icon: Calendar },
    { id: "subpersonality",    name: "Subpersonality Work",          description: "Meet & integrate inner parts",           tag: "PARTS",   icon: Users },
    { id: "bodyscan",          name: "Body Scan",                    description: "Grounding through body awareness",       tag: "SOMATIC", icon: Scan },
    { id: "zer",               name: "Zone of Emotional Regulation", description: "Locate, understand & regulate emotions", tag: "ZER",     icon: Layers },
    { id: "affirmations",      name: "Affirmations",                 description: "Personalized affirmation builder",       tag: "MIND",    icon: MessageCircle },
    { id: "sleep",             name: "Sleep Ritual",                 description: "Wind-down & sleep preparation",          tag: "REST",    icon: Moon },
  ];

  const handleToolClick = (toolId: string) => {
    if (onSelectTool) onSelectTool(toolId);
  };

  const toggleHistory = (toolId: string) => {
    setExpandedToolId((prev) => (prev === toolId ? null : toolId));
  };

  const featuredTool = tools[0];

  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(180deg, #EDE9FE 0%, #F5F3FF 100%)",
        padding: "16px",
        paddingBottom: "128px",
      }}
    >
      {/* Header */}
      <div className="pt-10 pb-4 px-2">
        <h1 className="text-3xl mb-1" style={{ fontFamily: "Lora, serif", fontWeight: 500, color: "#15113C" }}>
          Tools
        </h1>
        <p className="text-sm" style={{ fontFamily: "Inter, sans-serif", color: "#9CA3AF" }}>
          Your psychosynthesis toolkit
        </p>
      </div>

      {/* Tab switcher */}
      <div
        className="flex p-1 rounded-2xl mb-5"
        style={{ background: "rgba(255,255,255,0.6)", border: "1.5px solid rgba(139,92,246,0.12)" }}
      >
        {(["tools", "history"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 capitalize"
            style={{
              fontFamily: "Inter, sans-serif",
              background: activeTab === tab ? "#8B5CF6" : "transparent",
              color: activeTab === tab ? "white" : "#9CA3AF",
              boxShadow: activeTab === tab ? "0 2px 8px rgba(139,92,246,0.28)" : "none",
            }}
          >
            {tab === "tools" ? "Tools" : "History"}
          </button>
        ))}
      </div>

      {/* ── TOOLS TAB ── */}
      {activeTab === "tools" && (
        <>
          {/* Featured: Micro Grounding */}
          <div className="mb-3">
            <button
              onClick={() => handleToolClick(featuredTool.id)}
              className="w-full p-5 rounded-3xl flex items-center justify-between cb-ripple"
              style={{ background: CARD_BG, border: CARD_BORDER, boxShadow: "0 2px 12px rgba(139,92,246,0.08)" }}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: TAG_STYLES.SOS.iconBg }}>
                  <Heart className="w-6 h-6" style={{ color: ICON_COLOR, strokeWidth: 2 }} />
                </div>
                <div className="text-left">
                  <h3 className="text-base mb-0.5" style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, color: "#15113C" }}>
                    {featuredTool.name}
                  </h3>
                  <p className="text-xs" style={{ fontFamily: "Inter, sans-serif", color: "#6B7280" }}>
                    {featuredTool.description}
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 flex-shrink-0" style={{ color: ICON_COLOR, opacity: 0.4 }} />
            </button>
          </div>

          {/* Mindful Games */}
          <div className="mb-4">
            <button
              onClick={onNavigateToGames}
              className="w-full p-5 rounded-3xl flex items-center justify-between cb-ripple"
              style={{ background: "linear-gradient(135deg, #EDE9FE 0%, #C4B5FD 100%)", border: "1.5px solid rgba(139,92,246,0.25)", boxShadow: "0 2px 12px rgba(139,92,246,0.12)" }}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,255,255,0.6)" }}>
                  <Gamepad2 className="w-6 h-6" style={{ color: ICON_COLOR, strokeWidth: 2 }} />
                </div>
                <div className="text-left">
                  <h3 className="text-base mb-0.5" style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, color: "#15113C" }}>
                    Mindful Games
                  </h3>
                  <p className="text-xs" style={{ fontFamily: "Inter, sans-serif", color: "#5B21B6" }}>
                    19 games · focus, memory & emotional strength
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 flex-shrink-0" style={{ color: ICON_COLOR, opacity: 0.4 }} />
            </button>
          </div>

          {/* Tool grid (all except featured) */}
          <div className="grid grid-cols-2 gap-3">
            {tools.slice(1).map((tool) => (
              <button
                key={tool.id}
                onClick={() => handleToolClick(tool.id)}
                className="p-4 rounded-3xl relative text-left cb-ripple-dark"
                style={{
                  background: CARD_BG,
                  border: CARD_BORDER,
                  minHeight: "148px",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "0 1px 8px rgba(139,92,246,0.06)",
                }}
              >
                {/* Tag chip */}
                {tool.tag && (
                  <div
                    className="absolute top-3 right-3 px-2 py-0.5 rounded-md"
                    style={{
                      background: TAG_STYLES[tool.tag]?.chipBg ?? "#EDE9FE",
                      color: CHIP_TEXT,
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 700,
                      fontSize: "9px",
                      letterSpacing: "0.07em",
                    }}
                  >
                    {tool.tag}
                  </div>
                )}

                {/* Icon */}
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center mb-3"
                  style={{ background: TAG_STYLES[tool.tag]?.iconBg ?? "#F3F4F6" }}
                >
                  <tool.icon className="w-5 h-5" style={{ color: ICON_COLOR, strokeWidth: 2 }} />
                </div>

                {/* Name & description */}
                <div className="flex-1">
                  <h3 className="text-sm mb-1" style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, color: "#15113C", lineHeight: 1.3 }}>
                    {tool.name}
                  </h3>
                  <p className="text-xs" style={{ fontFamily: "Inter, sans-serif", color: "#6B7280", lineHeight: 1.4 }}>
                    {tool.description}
                  </p>
                </div>
              </button>
            ))}

            {/* More coming */}
            <div
              className="p-4 rounded-3xl col-span-2 flex flex-col items-center justify-center"
              style={{ background: "rgba(255,255,255,0.5)", border: "1.5px dashed rgba(139,92,246,0.2)", minHeight: "88px" }}
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center mb-2" style={{ background: "#EDE9FE" }}>
                <Plus className="w-4 h-4" style={{ color: ICON_COLOR }} />
              </div>
              <p className="text-sm mb-0.5" style={{ fontFamily: "Inter, sans-serif", color: "#6B7280", fontWeight: 500 }}>
                More tools coming
              </p>
              <p className="text-xs" style={{ fontFamily: "Inter, sans-serif", color: "#9CA3AF" }}>
                CBT exercises, Somatic practices, and more
              </p>
            </div>
          </div>
        </>
      )}

      {/* ── HISTORY TAB ── */}
      {activeTab === "history" && (
        <div>
          {/* Summary stat row */}
          <div className="flex gap-3 mb-5">
            <div
              className="flex-1 p-3 rounded-2xl text-center"
              style={{ background: CARD_BG, border: CARD_BORDER }}
            >
              <p className="text-2xl font-semibold mb-0.5" style={{ fontFamily: "Lora, serif", color: "#8B5CF6" }}>
                {MOCK_HISTORY.reduce((sum, e) => sum + e.sessions.length, 0)}
              </p>
              <p className="text-xs" style={{ fontFamily: "Inter, sans-serif", color: "#9CA3AF" }}>Total sessions</p>
            </div>
            <div
              className="flex-1 p-3 rounded-2xl text-center"
              style={{ background: CARD_BG, border: CARD_BORDER }}
            >
              <p className="text-2xl font-semibold mb-0.5" style={{ fontFamily: "Lora, serif", color: "#8B5CF6" }}>
                {MOCK_HISTORY.length}
              </p>
              <p className="text-xs" style={{ fontFamily: "Inter, sans-serif", color: "#9CA3AF" }}>Tools used</p>
            </div>
            <div
              className="flex-1 p-3 rounded-2xl text-center"
              style={{ background: CARD_BG, border: CARD_BORDER }}
            >
              <p className="text-2xl font-semibold mb-0.5" style={{ fontFamily: "Lora, serif", color: "#8B5CF6" }}>
                7
              </p>
              <p className="text-xs" style={{ fontFamily: "Inter, sans-serif", color: "#9CA3AF" }}>Day streak</p>
            </div>
          </div>

          <p className="text-xs mb-3 px-1 font-semibold" style={{ fontFamily: "Inter, sans-serif", color: "#9CA3AF", letterSpacing: "0.06em" }}>
            RECENT ACTIVITY
          </p>

          {/* History cards */}
          <div className="flex flex-col gap-3">
            {MOCK_HISTORY.map((entry) => (
              <HistoryCard
                key={entry.toolId}
                entry={entry}
                expanded={expandedToolId === entry.toolId}
                onToggle={() => toggleHistory(entry.toolId)}
              />
            ))}

            {/* Tools not yet used */}
            <div
              className="p-4 rounded-3xl flex flex-col items-center justify-center"
              style={{ background: "rgba(255,255,255,0.5)", border: "1.5px dashed rgba(139,92,246,0.2)", minHeight: "72px" }}
            >
              <p className="text-sm mb-0.5" style={{ fontFamily: "Inter, sans-serif", color: "#6B7280", fontWeight: 500 }}>
                6 more tools waiting
              </p>
              <p className="text-xs" style={{ fontFamily: "Inter, sans-serif", color: "#9CA3AF" }}>
                Start a session to build your history
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
