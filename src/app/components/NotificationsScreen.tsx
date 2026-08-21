import { useState } from "react";
import { ArrowLeft, Layers, Award, Wind, Target, MessageCircle, Bell, CheckCheck, X } from "lucide-react";

interface NotificationsScreenProps {
  onBack: () => void;
}

interface Notification {
  id: string;
  category: "ZER" | "ACHIEVEMENT" | "TOOL" | "DAILY" | "COACH" | "APP";
  title: string;
  body: string;
  time: string;
  read: boolean;
  actionLabel?: string;
  icon: React.ElementType;
  iconBg: string;
}

const CATEGORY_META: Record<string, { chipBg: string; chipText: string; label: string }> = {
  ZER:         { chipBg: "#FECDD3", chipText: "#9F1239", label: "ZER" },
  ACHIEVEMENT: { chipBg: "#FDE68A", chipText: "#78350F", label: "Achievement" },
  TOOL:        { chipBg: "#99F6E4", chipText: "#134E4A", label: "Tool" },
  DAILY:       { chipBg: "#BFDBFE", chipText: "#1E3A5F", label: "Daily" },
  COACH:       { chipBg: "#C7D2FE", chipText: "#312E81", label: "Coach" },
  APP:         { chipBg: "#E9D5FF", chipText: "#581C87", label: "App" },
};

const INITIAL_NOTIFICATIONS: Notification[] = [
  // UNREAD
  {
    id: "n1",
    category: "ZER",
    title: "Rise & Check In",
    body: "Good morning. Take a moment to notice your zone. How are you feeling as you start your day?",
    time: "8:03 AM",
    read: false,
    actionLabel: "Open ZER check-in",
    icon: Layers,
    iconBg: "#FFE4E6",
  },
  {
    id: "n2",
    category: "ACHIEVEMENT",
    title: "7-Day Streak",
    body: "You have checked in every day this week. Your consistency is building real emotional awareness.",
    time: "7:30 AM",
    read: false,
    actionLabel: "View achievement",
    icon: Award,
    iconBg: "#FEF3C7",
  },
  {
    id: "n3",
    category: "TOOL",
    title: "Session saved",
    body: "Your Breath Loops session (Box breathing, 5 cycles) has been saved to your history.",
    time: "Yesterday, 9:12 PM",
    read: false,
    icon: Wind,
    iconBg: "#CCFBF1",
  },
  // READ
  {
    id: "n4",
    category: "ZER",
    title: "Morning Mood Check",
    body: "Rise and reflect. A quick ZER check-in helps you understand where you are starting from today.",
    time: "Yesterday, 8:00 AM",
    read: true,
    icon: Layers,
    iconBg: "#FFE4E6",
  },
  {
    id: "n5",
    category: "DAILY",
    title: "Set Your Daily Intention",
    body: "You have not set your intention for today yet. A clear intention keeps you anchored through any zone.",
    time: "Yesterday, 7:45 AM",
    read: true,
    actionLabel: "Set intention",
    icon: Target,
    iconBg: "#DCFCE7",
  },
  {
    id: "n6",
    category: "COACH",
    title: "Message from your coach",
    body: "Your weekly check-in summary is ready. You spent 3 days in the regulated zone - solid progress.",
    time: "Aug 8, 3:30 PM",
    read: true,
    actionLabel: "Read summary",
    icon: MessageCircle,
    iconBg: "#E0E7FF",
  },
  {
    id: "n7",
    category: "APP",
    title: "New tools available",
    body: "Somatic practices and CBT exercises have been added to your toolkit. Explore what is new.",
    time: "Aug 7, 10:00 AM",
    read: true,
    icon: Bell,
    iconBg: "#F3E8FF",
  },
];

// Notification card
function NotifCard({
  notif,
  onRead,
  onDelete,
}: {
  notif: Notification;
  onRead: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const meta = CATEGORY_META[notif.category];
  const Icon = notif.icon;

  return (
    <div
      className="relative flex gap-3 p-4 rounded-2xl transition-all duration-200 cursor-pointer"
      style={{
        background: notif.read ? "rgba(255,255,255,0.72)" : "rgba(255,255,255,0.96)",
        border: notif.read
          ? "1.5px solid rgba(139,92,246,0.08)"
          : "1.5px solid rgba(139,92,246,0.18)",
        borderLeft: notif.read ? undefined : "3.5px solid #8B5CF6",
        boxShadow: notif.read
          ? "0 1px 4px rgba(0,0,0,0.04)"
          : "0 2px 12px rgba(139,92,246,0.1)",
      }}
      onClick={() => { if (!notif.read) onRead(notif.id); }}
    >
      {/* Icon holder */}
      <div
        className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
        style={{ background: notif.iconBg, opacity: notif.read ? 0.7 : 1 }}
      >
        <Icon className="w-5 h-5" style={{ color: "#15113C", strokeWidth: 1.75 }} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 pr-1">
        <div className="flex items-start justify-between gap-2 mb-0.5">
          <h4
            className="text-sm leading-snug"
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: notif.read ? 500 : 700,
              color: notif.read ? "#6B7280" : "#15113C",
            }}
          >
            {notif.title}
          </h4>
          <span
            className="text-xs flex-shrink-0 mt-px"
            style={{ fontFamily: "Inter, sans-serif", color: "#9CA3AF" }}
          >
            {notif.time}
          </span>
        </div>

        <p
          className="text-xs leading-relaxed mb-2"
          style={{
            fontFamily: "Inter, sans-serif",
            color: notif.read ? "#9CA3AF" : "#6B7280",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {notif.body}
        </p>

        <div className="flex items-center gap-2">
          <span
            className="rounded-md px-2 py-0.5"
            style={{
              background: meta.chipBg,
              color: meta.chipText,
              fontFamily: "Inter, sans-serif",
              fontWeight: 700,
              fontSize: "10px",
              letterSpacing: "0.06em",
              opacity: notif.read ? 0.65 : 1,
            }}
          >
            {meta.label}
          </span>

          {notif.actionLabel && !notif.read && (
            <span
              className="text-xs"
              style={{ fontFamily: "Inter, sans-serif", color: "#8B5CF6", fontWeight: 600 }}
            >
              {notif.actionLabel} &rarr;
            </span>
          )}
        </div>
      </div>

      {/* Right indicator */}
      {!notif.read ? (
        <div
          className="w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1"
          style={{ background: "#8B5CF6", boxShadow: "0 0 0 3px rgba(139,92,246,0.18)" }}
        />
      ) : (
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(notif.id); }}
          className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-colors -mr-2"
          style={{ background: "rgba(0,0,0,0.04)" }}
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" style={{ color: "#9CA3AF", strokeWidth: 1.75 }} />
        </button>
      )}
    </div>
  );
}

// Section label
function SectionLabel({ label, count }: { label: string; count: number }) {
  return (
    <div className="flex items-center gap-2 px-1 mb-3">
      <span
        style={{
          fontFamily: "Inter, sans-serif",
          fontWeight: 700,
          fontSize: "10px",
          letterSpacing: "0.08em",
          color: "#9CA3AF",
        }}
      >
        {label.toUpperCase()}
      </span>
      {count > 0 && (
        <div
          className="flex items-center justify-center rounded-full"
          style={{
            width: 18,
            height: 18,
            background: "#8B5CF6",
            fontFamily: "Inter",
            fontWeight: 700,
            fontSize: "10px",
            color: "white",
          }}
        >
          {count}
        </div>
      )}
    </div>
  );
}

// Main screen
export function NotificationsScreen({ onBack }: NotificationsScreenProps) {
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS);

  const unread = notifications.filter((n) => !n.read);
  const read   = notifications.filter((n) =>  n.read);

  const markRead = (id: string) =>
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  const dismiss = (id: string) =>
    setNotifications((prev) => prev.filter((n) => n.id !== id));

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
      <div className="flex items-center gap-3 pt-10 pb-2">
        <button onClick={onBack} className="cb-btn-icon">
          <ArrowLeft className="w-5 h-5" style={{ color: "#15113C", strokeWidth: 1.75 }} />
        </button>
        <h1
          className="flex-1 text-2xl"
          style={{ fontFamily: "Lora, serif", fontWeight: 500, color: "#15113C" }}
        >
          Notifications
        </h1>
        {/* Bell with live badge */}
        <div className="relative">
          <div
            className="w-11 h-11 rounded-2xl flex items-center justify-center"
            style={{
              background: "rgba(255,255,255,0.7)",
              border: "1.5px solid rgba(0,0,0,0.08)",
            }}
          >
            <Bell className="w-5 h-5" style={{ color: "#15113C", strokeWidth: 1.75 }} />
          </div>
          {unread.length > 0 && (
            <div
              className="absolute -top-1 -right-1 flex items-center justify-center rounded-full px-1"
              style={{
                minWidth: 18,
                height: 18,
                background: "#8B5CF6",
                fontFamily: "Inter",
                fontWeight: 700,
                fontSize: "10px",
                color: "white",
              }}
            >
              {unread.length}
            </div>
          )}
        </div>
      </div>

      {/* Mark all read */}
      {unread.length > 0 && (
        <div className="flex justify-end mb-5 px-1">
          <button
            onClick={markAllRead}
            className="flex items-center gap-1.5"
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 600,
              fontSize: "13px",
              color: "#8B5CF6",
            }}
          >
            <CheckCheck className="w-4 h-4" style={{ strokeWidth: 1.75 }} />
            Mark all as read
          </button>
        </div>
      )}

      {/* Empty state */}
      {notifications.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
            style={{ background: "rgba(255,255,255,0.7)" }}
          >
            <Bell className="w-7 h-7" style={{ color: "#D1D5DB", strokeWidth: 1.5 }} />
          </div>
          <p
            className="text-base"
            style={{ fontFamily: "Lora, serif", color: "#6B7280" }}
          >
            All caught up
          </p>
          <p
            className="text-xs mt-1"
            style={{ fontFamily: "Inter, sans-serif", color: "#9CA3AF" }}
          >
            No notifications right now
          </p>
        </div>
      )}

      {/* Unread section */}
      {unread.length > 0 && (
        <div className="mb-6">
          <SectionLabel label="New" count={unread.length} />
          <div className="flex flex-col gap-2.5">
            {unread.map((n) => (
              <NotifCard key={n.id} notif={n} onRead={markRead} onDelete={dismiss} />
            ))}
          </div>
        </div>
      )}

      {/* Read section */}
      {read.length > 0 && (
        <div>
          <SectionLabel label="Earlier" count={0} />
          <div className="flex flex-col gap-2.5">
            {read.map((n) => (
              <NotifCard key={n.id} notif={n} onRead={markRead} onDelete={dismiss} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
