/**
 * CereBro Design System — Token Layer v1.0
 *
 * Single source of truth for all visual decisions.
 * Reference: Material Design 3 color roles, Atlassian Design System spacing,
 * WCAG 2.1 AA contrast requirements (4.5:1 for body, 3:1 for large text).
 *
 * HOW TO USE
 *   import { DS } from "@/ds/tokens";
 *   style={{ background: DS.color.page.bg, color: DS.color.text.heading }}
 */

// ─── Color Palette ─────────────────────────────────────────────────────────────

const violet = {
  50:  "#F5F3FF",
  100: "#EDE9FE",
  200: "#DDD6FE",
  300: "#C4B5FD",
  400: "#A78BFA",
  500: "#8B5CF6",  // ← Brand Primary — ONLY use for interactive elements
  600: "#7C3AED",  // ← Brand Dark   — hover, text links, accents
  700: "#6D28D9",
  800: "#5B21B6",  // FORBIDDEN as interactive color — use only in data viz
  900: "#4C1D95",
} as const;

const gray = {
  50:  "#F9FAFB",
  100: "#F3F4F6",
  200: "#E5E7EB",
  300: "#D1D5DB",
  400: "#9CA3AF",  // decorative / disabled — NOT body copy
  500: "#6B7280",  // secondary labels, captions (4.6:1 on white — AA large)
  600: "#4B5563",
  700: "#374151",  // body copy (7.7:1 on white — AAA)
  900: "#15113C",  // headings, icons (near-black violet)
} as const;

const semantic = {
  success:    "#059669",  // green
  successBg:  "#D1FAE5",
  warning:    "#D97706",  // amber
  warningBg:  "#FEF3C7",
  error:      "#DC2626",  // red — use ONLY for genuine error/danger states
  errorBg:    "#FEE2E2",
  info:       "#2563EB",
  infoBg:     "#DBEAFE",
} as const;

// ─── Color Roles ───────────────────────────────────────────────────────────────
// Map semantic roles to palette values. Always use roles, never raw hex in components.

export const DS = {

  color: {
    // Brand
    brand: {
      primary:  violet[500],   // buttons, progress bars, active states
      dark:     violet[600],   // text links, hover, secondary interactive
      light:    violet[400],   // illustrations, scroll hints
      surface:  violet[100],   // card tints, section header bg
      subtle:   violet[50],    // page background end colour
    },

    // Page backgrounds
    page: {
      bg:       `linear-gradient(180deg, ${violet[100]} 0%, ${violet[50]} 100%)`,
      bgDone:   `linear-gradient(135deg, ${violet[100]} 0%, ${violet[300]} 100%)`,
      bgStart:  violet[100],
      bgEnd:    violet[50],
    },

    // Text — all WCAG AA or better on white/violet[50]
    text: {
      heading:    gray[900],   // 7.8:1 on white
      body:       gray[700],   // 7.7:1 on white
      secondary:  gray[500],   // 4.6:1 on white (AA large text ≥18px)
      muted:      gray[400],   // 2.8:1 — decorative only, never body copy
      link:       violet[600], // 5.9:1 on white — AA
      onPrimary:  "#ffffff",   // on violet[500] buttons
      inverse:    "#ffffff",   // on dark surfaces
    },

    // Surfaces (Gestalt figure-ground: cards float on gradient ground)
    surface: {
      glass:        "rgba(255,255,255,0.88)",  // main card bg
      glassBorder:  `1.5px solid rgba(139,92,246,0.12)`,
      elevated:     "#ffffff",                 // modal, bottom sheet
      inner:        gray[50],                  // card within card
      innerBorder:  `1.5px solid ${gray[100]}`,
      overlay:      "rgba(10,5,30,0.65)",      // modal backdrop
    },

    // Borders
    border: {
      subtle:   `rgba(139,92,246,0.12)`,  // glass card border
      default:  gray[200],
      strong:   violet[300],
      focus:    violet[500],
    },

    // Semantic
    semantic,

    // Icon color
    icon: gray[900],   // #15113C — all icons this colour for consistency
  },

  // ─── Shadows ──────────────────────────────────────────────────────────────────
  shadow: {
    none:   "none",
    sm:     "0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.04)",
    md:     "0 2px 8px rgba(139,92,246,0.08)",
    lg:     "0 4px 24px rgba(139,92,246,0.12)",
    xl:     "0 8px 32px rgba(139,92,246,0.18)",
    button: "0 4px 20px rgba(139,92,246,0.35)",
  },

  // ─── Border Radius ────────────────────────────────────────────────────────────
  radius: {
    sm:   "8px",    // chip, small icon badge
    md:   "12px",   // input field, icon container
    lg:   "16px",   // inner card, list item
    xl:   "20px",   // medium card
    "2xl": "24px",  // main card
    "3xl": "28px",  // featured card, modal
    full: "9999px", // pill button, round badge
  },

  // ─── Spacing (4px grid, Material/Atlassian pattern) ──────────────────────────
  spacing: {
    0:   "0px",
    1:   "4px",
    2:   "8px",
    3:   "12px",
    4:   "16px",
    5:   "20px",
    6:   "24px",
    7:   "28px",
    8:   "32px",
    10:  "40px",
    12:  "48px",
    16:  "64px",
  },

  // ─── Typography ───────────────────────────────────────────────────────────────
  type: {
    family: {
      sans:  "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      serif: "Lora, Georgia, serif",
    },

    // Fluid scale (px values — use these in inline styles or CSS vars)
    size: {
      "2xs":  "9px",   // badge numbers ONLY (not body text)
      xs:     "10px",  // chip labels (minimum for readable text)
      sm:     "11px",  // nav labels, overlines (minimum body text)
      base:   "13px",  // caption / secondary body
      md:     "14px",  // primary body copy
      lg:     "15px",  // button label, input
      xl:     "16px",  // subtitle / emphasized body
      "2xl":  "18px",  // H3 / card title
      "3xl":  "20px",  // H2 / section title
      "4xl":  "22px",  // H1 / screen title
      "5xl":  "26px",  // Display / hero text
      "6xl":  "32px",  // Large display
    },

    weight: {
      normal:    400,
      medium:    500,
      semibold:  600,
      bold:      700,
    },

    lineHeight: {
      tight:   1.2,
      snug:    1.35,
      normal:  1.5,
      relaxed: 1.65,
    },

    // Pre-composed text style objects — import and spread into style prop
    styles: {
      display:    { fontFamily: "Lora, Georgia, serif", fontSize: "28px", fontWeight: 500, color: gray[900], lineHeight: 1.2 },
      h1:         { fontFamily: "Lora, Georgia, serif", fontSize: "24px", fontWeight: 500, color: gray[900], lineHeight: 1.3 },
      h2:         { fontFamily: "Lora, Georgia, serif", fontSize: "20px", fontWeight: 500, color: gray[900], lineHeight: 1.35 },
      h3:         { fontFamily: "Inter, sans-serif",    fontSize: "17px", fontWeight: 600, color: gray[900], lineHeight: 1.4 },
      h4:         { fontFamily: "Inter, sans-serif",    fontSize: "15px", fontWeight: 600, color: gray[900], lineHeight: 1.4 },
      bodyLarge:  { fontFamily: "Inter, sans-serif",    fontSize: "15px", fontWeight: 400, color: gray[700], lineHeight: 1.5 },
      body:       { fontFamily: "Inter, sans-serif",    fontSize: "14px", fontWeight: 400, color: gray[700], lineHeight: 1.5 },
      bodySmall:  { fontFamily: "Inter, sans-serif",    fontSize: "13px", fontWeight: 400, color: gray[500], lineHeight: 1.55 },
      caption:    { fontFamily: "Inter, sans-serif",    fontSize: "12px", fontWeight: 400, color: gray[500], lineHeight: 1.5 },
      overline:   { fontFamily: "Inter, sans-serif",    fontSize: "11px", fontWeight: 700, color: gray[400], letterSpacing: "0.06em", textTransform: "uppercase" as const },
      navLabel:   { fontFamily: "Inter, sans-serif",    fontSize: "11px", fontWeight: 600, letterSpacing: "0.03em" },
      buttonLabel:{ fontFamily: "Inter, sans-serif",    fontSize: "15px", fontWeight: 600, letterSpacing: "0.01em" },
      chipLabel:  { fontFamily: "Inter, sans-serif",    fontSize: "10px", fontWeight: 700, letterSpacing: "0.06em" },
      badgeNumber:{ fontFamily: "Inter, sans-serif",    fontSize: "9px",  fontWeight: 700 },
    },
  },

  // ─── Touch Targets (Apple HIG / Material: 44×44px minimum) ──────────────────
  touch: {
    min:  "44px",
    nav:  "48px",
    fab:  "56px",
    icon: "40px",
  },

  // ─── Component Token Bundles ─────────────────────────────────────────────────

  button: {
    // Primary — solid violet pill
    primary: {
      background:   violet[500],
      color:        "#ffffff",
      border:       "none",
      borderRadius: "9999px",
      padding:      "16px 24px",
      fontSize:     "15px",
      fontWeight:   600,
      minHeight:    "52px",
      boxShadow:    "0 4px 20px rgba(139,92,246,0.25)",
    },
    // Ghost — frosted secondary
    ghost: {
      background:   "rgba(255,255,255,0.85)",
      color:        violet[600],
      border:       `1.5px solid ${violet[100]}`,
      borderRadius: "9999px",
      padding:      "14px 24px",
      fontSize:     "15px",
      fontWeight:   600,
      minHeight:    "52px",
    },
    // Outline — purple border
    outline: {
      background:   "transparent",
      color:        violet[600],
      border:       `1.5px solid ${violet[500]}`,
      borderRadius: "9999px",
      padding:      "14px 24px",
      fontSize:     "15px",
      fontWeight:   600,
      minHeight:    "52px",
    },
    // Text link — inline action button
    textLink: {
      background:   "none",
      color:        violet[600],
      border:       "none",
      borderRadius: "0",
      padding:      "4px 0",
      fontSize:     "13px",
      fontWeight:   500,
    },
    // Icon button — round glass (back, toggle, bell)
    icon: {
      background:   "rgba(255,255,255,0.75)",
      border:       "1.5px solid rgba(0,0,0,0.08)",
      borderRadius: "9999px",
      width:        "44px",
      height:       "44px",
      minWidth:     "44px",
      minHeight:    "44px",
      display:      "flex" as const,
      alignItems:   "center" as const,
      justifyContent: "center" as const,
    },
    // Destructive — for logout, delete
    destructive: {
      background:   semantic.error,
      color:        "#ffffff",
      border:       "none",
      borderRadius: "9999px",
      padding:      "16px 24px",
      fontSize:     "15px",
      fontWeight:   600,
      minHeight:    "52px",
    },
    // Disabled state (applied on top of any variant)
    disabled: {
      background:   gray[100],
      color:        gray[400],
      boxShadow:    "none",
      cursor:       "not-allowed",
    },
  },

  card: {
    // Glass card — floats on purple gradient (main pattern)
    glass: {
      background:   "rgba(255,255,255,0.88)",
      border:       "1.5px solid rgba(139,92,246,0.12)",
      borderRadius: "24px",
      boxShadow:    "0 2px 12px rgba(139,92,246,0.08)",
    },
    // Elevated white card — for modals, bottom sheets, off-gradient screens
    elevated: {
      background:   "#ffffff",
      border:       `1.5px solid ${gray[100]}`,
      borderRadius: "24px",
      boxShadow:    "0 4px 24px rgba(139,92,246,0.10)",
    },
    // Inner card — nested inside glass or elevated
    inner: {
      background:   gray[50],
      border:       `1.5px solid ${gray[100]}`,
      borderRadius: "16px",
      boxShadow:    "none",
    },
    // Tinted brand card — featured / highlight
    brand: {
      background:   `linear-gradient(135deg, ${violet[100]} 0%, ${violet[200]} 100%)`,
      border:       `1.5px solid rgba(139,92,246,0.25)`,
      borderRadius: "24px",
      boxShadow:    "0 2px 12px rgba(139,92,246,0.12)",
    },
  },

  input: {
    // Standard text input
    default: {
      background:   "rgba(255,255,255,0.85)",
      border:       "1.5px solid rgba(139,92,246,0.2)",
      borderRadius: "16px",
      padding:      "14px 16px",
      fontSize:     "15px",
      fontFamily:   "Inter, sans-serif",
      color:        gray[900],
      minHeight:    "52px",
      outline:      "none",
    },
    focus: {
      border:       `1.5px solid ${violet[500]}`,
      boxShadow:    `0 0 0 3px rgba(139,92,246,0.15)`,
    },
    error: {
      border:       `1.5px solid ${semantic.error}`,
    },
    placeholder: {
      color: gray[400],
    },
  },

  chip: {
    // Category chip (in filter rows, tags)
    category: {
      borderRadius: "9999px",
      padding:      "6px 14px",
      fontSize:     "13px",
      fontWeight:   600,
      fontFamily:   "Inter, sans-serif",
    },
    // Tool tag (top-right of grid cards)
    tag: {
      borderRadius: "6px",
      padding:      "2px 6px",
      fontSize:     "10px",
      fontWeight:   700,
      fontFamily:   "Inter, sans-serif",
      letterSpacing: "0.06em",
    },
    // Status badge (numbers, "NOW", etc.)
    badge: {
      borderRadius: "9999px",
      padding:      "4px 10px",
      fontSize:     "11px",
      fontWeight:   700,
      fontFamily:   "Inter, sans-serif",
    },
    // Notification dot (numeric, small)
    dot: {
      borderRadius: "9999px",
      minWidth:     "18px",
      height:       "18px",
      fontSize:     "9px",  // badge numbers only — exception to 10px minimum
      fontWeight:   700,
      fontFamily:   "Inter, sans-serif",
      background:   violet[500],
      color:        "#ffffff",
    },
  },

  overline: {
    fontSize:      "11px",
    fontWeight:    700,
    fontFamily:    "Inter, sans-serif",
    letterSpacing: "0.06em",
    textTransform: "uppercase" as const,
    color:         gray[400],
    lineHeight:    1.4,
  },

  divider: {
    borderTop: `1px solid rgba(139,92,246,0.08)`,
  },

  icon: {
    strokeWidth: 1.75,       // all lucide icons — consistent weight
    color:       gray[900],  // default icon color
    size: {
      sm:  16,
      md:  20,
      lg:  24,
    },
  },

  // ─── Progress Bar ────────────────────────────────────────────────────────────
  progress: {
    track:    `rgba(139,92,246,0.12)`,
    fill:     violet[500],
    height:   "8px",
    radius:   "9999px",
  },

  // ─── Animation / Motion ──────────────────────────────────────────────────────
  motion: {
    fast:    "0.1s ease",
    normal:  "0.2s ease",
    slow:    "0.35s ease",
    spring:  "0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
    press:   "scale(0.97)",
  },

} as const;

// ─── Re-export palette for direct access ──────────────────────────────────────
export { violet, gray, semantic };

// ─── Type helpers ─────────────────────────────────────────────────────────────
export type ButtonVariant = "primary" | "ghost" | "outline" | "textLink" | "icon" | "destructive";
export type CardVariant   = "glass"   | "elevated" | "inner" | "brand";
export type ChipVariant   = "category" | "tag" | "badge" | "dot";
