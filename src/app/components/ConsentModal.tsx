import { useState, useRef, useEffect } from "react";
import { ShieldAlert, Lock, ChevronDown, ShieldCheck, AlertTriangle, Heart, FileText, Eye, Trash2, Globe } from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────
interface ConsentModalProps {
  variant: "disclaimer" | "privacy";
  onAccept: () => void;
}

// ── Content blocks ────────────────────────────────────────────────────────────
const DISCLAIMER_SECTIONS = [
  {
    icon: Heart,
    iconBg: "#FFE4E6",
    iconColor: "#BE185D",
    title: "A wellness tool, not a clinical service",
    body: "CereBro is a personal wellness and self-development platform. It is not a medical service, a clinical application, or a licensed mental health practice. Nothing within this app constitutes a clinical assessment, medical diagnosis, or professional therapy of any kind.",
  },
  {
    icon: FileText,
    iconBg: "#EDE9FE",
    iconColor: "#7C3AED",
    title: "Expert-designed, not medically prescribed",
    body: "All tools, exercises, assessments, and guided methodologies available in CereBro have been developed in consultation with qualified wellness professionals, psychologists, and somatic practitioners. They are educational and experiential in nature. They are not medically prescribed interventions and carry no legal, clinical, or regulatory medical status.",
  },
  {
    icon: AlertTriangle,
    iconBg: "#FEF3C7",
    iconColor: "#B45309",
    title: "Not a substitute for professional care",
    body: "If you are experiencing a mental health crisis, severe emotional distress, thoughts of self-harm, or any condition that requires professional attention, please seek help from a licensed therapist, psychologist, or medical professional. CereBro is designed to complement — not replace — professional mental health support.",
  },
  {
    icon: ShieldAlert,
    iconBg: "#DCFCE7",
    iconColor: "#15803D",
    title: "In case of emergency",
    body: "If you or someone you know is in immediate danger, please contact your local emergency services (e.g. 911 in the US, 999 in the UK, 112 in Europe) or a crisis line such as the National Suicide Prevention Lifeline at 988. CereBro is not an emergency response service.",
  },
  {
    icon: Eye,
    iconBg: "#DBEAFE",
    iconColor: "#1D4ED8",
    title: "No clinical relationship",
    body: "Using CereBro does not create a therapist-client, doctor-patient, or any other regulated professional relationship. Your Oracle is an AI-guided experience assistant, not a licensed clinician. Responses generated within the app are not professional advice and should not be treated as such.",
  },
  {
    icon: ShieldCheck,
    iconBg: "#F3E8FF",
    iconColor: "#7C3AED",
    title: "Your autonomy and responsibility",
    body: "By using CereBro, you acknowledge that all participation in tools, assessments, and exercises is entirely voluntary and at your own discretion. You retain full autonomy over your choices and take responsibility for how you apply any insights or practices discovered through the app.",
  },
];

const PRIVACY_SECTIONS = [
  {
    icon: Lock,
    iconBg: "#EDE9FE",
    iconColor: "#7C3AED",
    title: "End-to-end encryption",
    body: "All data you enter — including your conversations, check-ins, journal entries, and assessment results — is encrypted using industry-standard AES-256 encryption. Your information is protected both in transit and at rest.",
  },
  {
    icon: Eye,
    iconBg: "#DCFCE7",
    iconColor: "#15803D",
    title: "Fully anonymous by design",
    body: "Any aggregated usage data used to improve CereBro is fully anonymized before it is ever analyzed. It cannot be traced back to you as an individual. We do not build personal profiles for advertising or profiling purposes.",
  },
  {
    icon: FileText,
    iconBg: "#FEF3C7",
    iconColor: "#B45309",
    title: "Minimum necessary data",
    body: "We only collect what we absolutely need to provide your personalized experience: your name, basic demographic context, and your in-app activity. We do not collect device data beyond crash reporting, and we never sell your data to third parties for any reason.",
  },
  {
    icon: Trash2,
    iconBg: "#CFFAFE",
    iconColor: "#0E7490",
    title: "Your data, your control",
    body: "You can request a complete export or permanent deletion of all your data at any time from your Profile settings. Once deleted, your data is purged from all our systems within 30 days. No traces, no archives, no exceptions.",
  },
  {
    icon: Globe,
    iconBg: "#DBEAFE",
    iconColor: "#1D4ED8",
    title: "Compliance and standards",
    body: "CereBro is designed in compliance with GDPR (EU), CCPA (California), PIPEDA (Canada), and applicable international data protection frameworks. We conduct regular independent security audits and are committed to transparent data practices.",
  },
];

// ── Scroll hint arrow ─────────────────────────────────────────────────────────
function ScrollHint({ visible }: { visible: boolean }) {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 flex flex-col items-center pb-3 pt-8 pointer-events-none transition-opacity duration-500"
      style={{
        opacity: visible ? 1 : 0,
        background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.98))",
      }}
    >
      <ChevronDown className="w-5 h-5 animate-bounce" style={{ color: "#A78BFA", strokeWidth: 1.75 }} />
      <span
        className="text-xs mt-0.5"
        style={{ fontFamily: "Inter, sans-serif", color: "#A78BFA", fontWeight: 500 }}
      >
        Scroll to continue
      </span>
    </div>
  );
}

// ── Section block ─────────────────────────────────────────────────────────────
function Section({
  icon: Icon,
  iconBg,
  iconColor,
  title,
  body,
}: {
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  title: string;
  body: string;
}) {
  return (
    <div className="flex gap-3 mb-6">
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
        style={{ background: iconBg }}
      >
        <Icon className="w-4 h-4" style={{ color: iconColor, strokeWidth: 1.75 }} />
      </div>
      <div>
        <p
          className="text-sm mb-1"
          style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, color: "#15113C" }}
        >
          {title}
        </p>
        <p
          className="text-xs leading-relaxed"
          style={{ fontFamily: "Inter, sans-serif", color: "#6B7280", lineHeight: 1.65 }}
        >
          {body}
        </p>
      </div>
    </div>
  );
}

// ── Main modal ────────────────────────────────────────────────────────────────
export function ConsentModal({ variant, onAccept }: ConsentModalProps) {
  const [canProceed, setCanProceed] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(true);
  const [visible, setVisible] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const isDisclaimer = variant === "disclaimer";
  const sections = isDisclaimer ? DISCLAIMER_SECTIONS : PRIVACY_SECTIONS;

  const unlock = () => {
    setCanProceed(true);
    setShowScrollHint(false);
  };

  // Entrance animation
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  // After animation settles, set up IntersectionObserver on the bottom sentinel.
  // This fires whenever the bottom element enters the scroll container's viewport —
  // far more reliable than manual scrollTop + clientHeight arithmetic.
  useEffect(() => {
    // Wait for the slide-in animation to complete before measuring
    const setupTimer = setTimeout(() => {
      const scrollEl = scrollRef.current;
      const bottomEl = bottomRef.current;
      if (!scrollEl || !bottomEl) return;

      // Content fits without scrolling → unlock immediately
      if (scrollEl.scrollHeight <= scrollEl.clientHeight + 8) {
        unlock();
        return;
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            unlock();
            observer.disconnect();
          }
        },
        {
          root: scrollEl,
          threshold: 0.5,
        }
      );

      observer.observe(bottomEl);
      // eslint-disable-next-line consistent-return
      return () => observer.disconnect();
    }, 350); // slightly longer than the 60ms trigger + 300ms CSS transition

    return () => clearTimeout(setupTimer);
  }, []); // run once — after mount, timer handles the delay

  // Fallback: onScroll handler with generous tolerance
  const handleScroll = () => {
    if (canProceed) return;
    const el = scrollRef.current;
    if (!el) return;
    const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 48;
    if (atBottom) unlock();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center"
      style={{ background: "rgba(10,5,30,0.65)", backdropFilter: "blur(6px)" }}
    >
      {/* Modal card */}
      <div
        className="w-full max-w-md flex flex-col transition-all duration-500"
        style={{
          background: "white",
          borderRadius: "28px 28px 0 0",
          height: "92vh",
          maxHeight: "92vh",
          overflow: "hidden",
          transform: visible ? "translateY(0)" : "translateY(100%)",
          opacity: visible ? 1 : 0,
        }}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
          <div className="w-10 h-1 rounded-full" style={{ background: "#E5E7EB" }} />
        </div>

        {/* Header */}
        <div
          className="mx-4 mt-2 mb-4 rounded-2xl px-5 py-5 flex items-start gap-4 flex-shrink-0"
          style={{
            background: isDisclaimer
              ? "linear-gradient(135deg, #FFF7ED 0%, #FFFBEB 100%)"
              : "linear-gradient(135deg, #EDE9FE 0%, #F5F3FF 100%)",
            border: isDisclaimer ? "1.5px solid #FED7AA" : "1.5px solid #DDD6FE",
          }}
        >
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ background: isDisclaimer ? "#FEF3C7" : "#EDE9FE" }}
          >
            {isDisclaimer
              ? <ShieldAlert className="w-6 h-6" style={{ color: "#B45309", strokeWidth: 1.75 }} />
              : <Lock className="w-6 h-6" style={{ color: "#7C3AED", strokeWidth: 1.75 }} />
            }
          </div>
          <div className="flex-1">
            <p
              className="text-xs mb-0.5"
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 700,
                letterSpacing: "0.07em",
                color: isDisclaimer ? "#B45309" : "#7C3AED",
              }}
            >
              {isDisclaimer ? "PLEASE READ" : "YOUR PRIVACY"}
            </p>
            <h2
              className="text-xl leading-snug"
              style={{ fontFamily: "Lora, serif", fontWeight: 500, color: "#15113C" }}
            >
              {isDisclaimer ? "Before You Begin" : "Your Privacy, Our Promise"}
            </h2>
            <p
              className="text-xs mt-1"
              style={{ fontFamily: "Inter, sans-serif", color: "#9CA3AF" }}
            >
              {isDisclaimer
                ? "Scroll through to read our wellness disclaimer"
                : "Scroll through to understand how we protect your data"}
            </p>
          </div>
        </div>

        {/* Scrollable region — outer div is relative (for ScrollHint), inner flex col gives scroll div a real height */}
        <div className="relative flex-1 min-h-0 mx-4 flex flex-col">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex-1 min-h-0 overflow-y-auto pr-1"
            style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" } as React.CSSProperties}
          >
            <div className="pt-1 pb-8">
              {sections.map((s, i) => (
                <Section key={i} {...s} />
              ))}

              {/* Fine print — bottom sentinel for IntersectionObserver */}
              <div
                ref={bottomRef}
                className="rounded-2xl p-4 mb-4"
                style={{ background: "#F9FAFB", border: "1px solid #F3F4F6" }}
              >
                <p
                  className="text-xs leading-relaxed text-center"
                  style={{ fontFamily: "Inter, sans-serif", color: "#9CA3AF" }}
                >
                  {isDisclaimer
                    ? "By tapping \"I Understand\" you confirm that you have read, understood, and agree to these terms. This acknowledgement is required to use CereBro."
                    : "By tapping \"I Accept\" you confirm that you have read and understood our data practices. You may withdraw consent and delete your data at any time."}
                </p>
              </div>
            </div>
          </div>

          <ScrollHint visible={showScrollHint && !canProceed} />
        </div>

        {/* Fixed accept button */}
        <div className="px-4 pt-3 pb-8 flex-shrink-0">
          {!canProceed && (
            <p
              className="text-center text-xs mb-2"
              style={{ fontFamily: "Inter, sans-serif", color: "#C4B5FD" }}
            >
              Read all the way through to continue
            </p>
          )}
          <button
            onClick={canProceed ? onAccept : undefined}
            disabled={!canProceed}
            className="w-full py-4 rounded-full text-sm font-semibold transition-all duration-300"
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 700,
              fontSize: "15px",
              background: canProceed
                ? "linear-gradient(135deg, #A78BFA 0%, #8B5CF6 100%)"
                : "#F3F4F6",
              color: canProceed ? "white" : "#D1D5DB",
              cursor: canProceed ? "pointer" : "not-allowed",
              boxShadow: canProceed ? "0 4px 20px rgba(139,92,246,0.35)" : "none",
              letterSpacing: "0.02em",
            }}
          >
            {isDisclaimer ? "I Understand" : "I Accept & Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}
