# CereBro Design System

## Philosophy
Every screen should feel like it belongs to the same calm, focused mental-wellness space. The brand palette is deep purple-navy. Colourful backgrounds from other design systems are not permitted in structural chrome — colour is reserved for small semantic indicators only.

---

## Colour Tokens

### Primary Brand
| Token | Value | Use |
|---|---|---|
| `purple` | `#8B5CF6` | Primary CTAs, badges, progress bars, active states |
| `purple-dark` | `#6D28D9` | Hover states, deep text on light purple |
| `purple-deep` | `#4C1D95` | Dark text inside purple tinted areas |
| `purple-light` | `#EDE9FE` | Page background tint, card fills |
| `purple-subtle` | `#F5F3FF` | Ultra-light page backgrounds, secondary fills |
| `navy` | `#15113C` | Primary headings and body text |

### Text Hierarchy
| Token | Value | Use |
|---|---|---|
| `text-primary` | `#15113C` | Headings, labels |
| `text-secondary` | `#4A5565` | Sub-labels, descriptions |
| `text-muted` | `#6B7280` | Body text, step instructions |
| `text-hint` | `#9CA3AF` | Placeholders, step counters, captions |

### Surfaces & Borders
| Token | Value | Use |
|---|---|---|
| `card-bg` | `rgba(255,255,255,0.8)` | Cards, panels |
| `card-bg-alt` | `rgba(255,255,255,0.75)` | Alternate card fill |
| `border` | `rgba(139,92,246,0.15)` | Card borders (purple tint) |
| `border-subtle` | `rgba(0,0,0,0.06)` | Checklist items, dividers |
| `overlay-bg` | `rgba(255,255,255,0.7)` | Back button circles, nav overlays |

---

## Backgrounds

### Page Backgrounds (structural chrome — all screens)
```
Page default:   linear-gradient(180deg, #EDE9FE 0%, #F5F3FF 100%)
Page alternate: linear-gradient(180deg, #F5F3FF 0%, #FFFFFF 100%)
Page deep:      linear-gradient(180deg, #EDE9FE 0%, #F9F8FF 100%)
```

### Completion / Done screens
```
Success:        linear-gradient(135deg, #EDE9FE 0%, #C4B5FD 100%)
```

### Sleep / Night mode (SleepRitualScreen breathing only)
```
Night:          linear-gradient(135deg, #1E1B4B 0%, #312E81 100%)
```

---

## Semantic Colours (content-only, never page backgrounds)
These appear only as small chips, badges, or data indicators — never as full-page background gradients.

| Context | Accent | Light tint |
|---|---|---|
| ZER — Hyper arousal | `#F97316` | `#FED7AA` |
| ZER — Regulated | `#10B981` | `#D1FAE5` |
| ZER — Hypo arousal | `#FBBF24` | `#FEF3C7` |
| Breathing technique chips | Chip-only colour, page stays purple | — |

---

## Component Patterns

### Page Wrapper
```tsx
<div style={{ background: "linear-gradient(180deg, #EDE9FE 0%, #F5F3FF 100%)", padding: "16px", paddingBottom: "40px" }}>
```

### Back Button Circle
```tsx
<button style={{ background: "rgba(255,255,255,0.7)", border: "1.5px solid rgba(0,0,0,0.08)" }}>
  <ArrowLeft style={{ color: "#15113C" }} />
</button>
```

### Progress Bar
```tsx
<div style={{ background: "#E5E7EB" }}>
  <div style={{ background: "#8B5CF6" }} />
</div>
```

### Step Number Badge
```tsx
<div style={{ background: "#8B5CF6", color: "white" }}>1</div>
```

### Content Card
```tsx
<div style={{ background: "rgba(255,255,255,0.8)", border: "1.5px solid rgba(139,92,246,0.15)" }}>
```

### Primary CTA Button
```tsx
<button style={{ background: "#8B5CF6", color: "white", fontFamily: "Inter, sans-serif", fontWeight: 600 }}>
```

### Secondary / Ghost Button
```tsx
<button style={{ background: "#F5F3FF", color: "#6D28D9", border: "1.5px solid #EDE9FE" }}>
```

### Tag / Duration Badge
```tsx
<span style={{ background: "#EDE9FE", color: "#6D28D9" }}>3 min</span>
```

### Completion Check Circle
```tsx
<div style={{ background: "#8B5CF6" }}>
  <Check style={{ color: "white" }} />
</div>
```

---

## Typography
| Role | Font | Size | Weight |
|---|---|---|---|
| Screen title | Lora, serif | 24px | 500 |
| Section heading | Lora, serif | 20–22px | 500 |
| Step title | Lora, serif | 18–20px | 500 |
| Body / instruction | Inter, sans-serif | 14–15px | 400 |
| Label / badge | Inter, sans-serif | 11–13px | 600 |
| Caption / hint | Inter, sans-serif | 11–12px | 400 |

---

## Spacing & Shape
- Screen padding: `16px` all sides, `40px` bottom
- Card border-radius: `24px` (rounded-3xl)
- Button border-radius: `16px` (rounded-2xl) or `9999px` for pill
- Back button: `40×40px` circle
- Progress bar height: `6px`
- Gap between cards: `12px`

---

## Do's and Don'ts

✅ DO
- Use `#8B5CF6` for all primary interactive elements
- Use `#EDE9FE → #F5F3FF` as the page background gradient
- Use semantic colours only as small chips/badges inside content cards
- Keep completion screens on `linear-gradient(135deg, #EDE9FE 0%, #C4B5FD 100%)`

❌ DON'T
- Use blue (`#3B82F6`, `#E0F2FE`), green (`#10B981`, `#D1FAE5`), amber (`#F59E0B`, `#FEF3C7`), cyan (`#06B6D4`, `#CFFAFE`), or pink (`#EC4899`, `#FCE7F3`) as page backgrounds
- Use per-tool accent colours for progress bars or primary buttons
- Use different gradient tints per tool for structural chrome

---

## Heuristic Evaluation Findings (v1)

### H1 — Back Button Consistency
**Rule:** Every tool screen must have a `cb-btn-icon` back button (40×40 circle) in the top-left. Text-only "← Back" links are not permitted.

**Audit findings:**
- ✅ All tool screens: use `cb-btn-icon` with `ArrowLeft`
- ✅ ZOWHistory: fixed from text-only `← Back` → `cb-btn-icon`
- ✅ Modal dismiss (PsychologicalProfileFlow): back during modal dismisses modal, not the step

**Pattern:**
```tsx
<button onClick={onBack} className="cb-btn-icon">
  <ArrowLeft className="w-5 h-5" style={{ color: "#15113C" }} />
</button>
```

---

### H2 — Voice / Mic Button Placement
**Rule:** This is a voice-oriented app. Every tool screen that presents step-by-step content MUST have a mic/voice toggle. Back button lives top-left; mic toggle lives top-right.

**Standard header layout:**
```
[cb-btn-icon ←]   [Screen Title / subtitle]   [cb-btn-icon 🎤]
```

**Voice toggle state:**
- Off: `rgba(255,255,255,0.7)` bg + `rgba(0,0,0,0.08)` border + `<MicOff color="#9CA3AF" />`
- On:  `#EDE9FE` bg + `#C4B5FD` border + `<Mic color="#8B5CF6" />`

**Audit findings — all screens now have voice:**
- ✅ CrisisGroundingScreen (Micro Grounding) — reads step prompts
- ✅ GuidedImageryScreen — reads scene scripts
- ✅ WillTrainingScreen — reads exercise steps
- ✅ BodyScanScreen — reads zone instructions; mic sits next to play/pause
- ✅ AffirmationsScreen — reads affirmations in practice mode
- ✅ GratitudeJournalScreen — reads all 3 prompts aloud on activation
- ✅ BreathLoopsScreen — speaks phase label (Inhale/Hold/Exhale) on transition

**TTS function (shared pattern):**
```typescript
function speakText(text: string) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  utt.rate = 0.9; utt.pitch = 1;
  const preferred = window.speechSynthesis.getVoices().find(
    v => v.name.includes("Samantha") || v.name.includes("Karen") || v.name.includes("Google US English Female")
  );
  if (preferred) utt.voice = preferred;
  window.speechSynthesis.speak(utt);
}
```
Always call `window.speechSynthesis?.cancel()` on back navigation and session completion.

---

### H3 — Button Roundedness & State Consistency
**Rule:** Three button classes, never mixed. All action buttons are full pill-shape:

| Class | Shape | Use |
|---|---|---|
| `cb-btn-primary` | `border-radius: 9999px` (pill) | Primary CTA, full-width or max-width: 240px for completion screens |
| `cb-btn-ghost` | `border-radius: 9999px` (pill) | Secondary/ghost action |
| `cb-btn-icon` | `border-radius: 50%` (circle) | Back, mic, toggle, close — 40×40px |

**Never** use `rounded-2xl`, `rounded-xl`, or inline `border-radius: 16px` on any action button. Inputs and textarea fields may use `rounded-2xl` or `rounded-3xl`. Cards and panels may use `rounded-3xl`.

**Steppers must have step-back navigation:**
- On step 1: back button calls `onDone()` (exits the tool)
- On steps 2+: back button calls `setStepIdx(i => i - 1)` (returns to previous step)
- Pattern: `onClick={() => stepIdx > 0 ? setStepIdx(i => i - 1) : onDone()}`

```tsx
// Primary CTA
<button onClick={handleNext} className="cb-btn-primary">Continue</button>

// Completion Done button (centered, not full-width)
<button onClick={onDone} className="cb-btn-primary" style={{ maxWidth: "240px" }}>Done</button>

// Ghost/secondary
<button onClick={stop} className="cb-btn-ghost">Stop session</button>

// Step-aware back button
<button onClick={() => stepIdx > 0 ? setStepIdx(i => i - 1) : onDone()} className="cb-btn-icon">
  <ArrowLeft className="w-5 h-5" style={{ color: "#15113C" }} />
</button>
```

---

### H4 — Ripple & Press Feedback
**Rule:** All interactive surfaces must respond to touch/click with visual feedback.

- Buttons: add `cb-ripple` class + global `button:active { transform: scale(0.97) }` (in theme.css)
- Cards: use `cb-card-btn` class or `active:scale-[0.98]` Tailwind class
- `-webkit-tap-highlight-color: transparent` set globally to suppress browser default

---

### H5 — Progress Bar Consistency
**Rule:** Every multi-step tool screen must show a progress bar immediately below the header.

- Height: `6px` (`h-1.5`)
- Track: `#E5E7EB`
- Fill: `#8B5CF6`
- Border-radius: `9999px` (pill)
- Animate fill with `transition: width 0.5s ease`

---

### H6 — Completion Screens
**Rule:** Every tool must end on a DONE_BG (`linear-gradient(135deg, #EDE9FE 0%, #C4B5FD 100%)`) completion screen with:
1. Emoji or icon (contextual)
2. Purple check circle (`#8B5CF6` bg + white `<Check />`)
3. Lora serif heading
4. Inter body copy with `color: #4C1D95`
5. Single "Done" CTA using `cb-btn-primary`

---

### H7 — Global Interaction Tokens (theme.css)
These are now declared globally in `src/styles/theme.css`:
- `* { -webkit-tap-highlight-color: transparent }`
- `button:active { transform: scale(0.97) }`
- `.cb-ripple` — CSS radial-gradient ripple on `:active`
- `.cb-btn-primary`, `.cb-btn-ghost`, `.cb-btn-icon` — shared component classes
- `.cb-mic-fab` — floating mic FAB (bottom-right, above tab bar)
- `.cb-card-btn` — card press state
- `@keyframes mic-pulse` — pulsing shadow when mic is active

---

### H8 — Icon & Chip Colour System
**Rule:** Two-variable colour system for all icon containers and category chips. Colour identifies the category; icons and chip text are always a single dark value.

#### Icon containers
| Variable | Value | Rule |
|---|---|---|
| `ICON_COLOR` | `#15113C` | Applied to **every** icon across all screens — never per-category |
| Icon holder BG | Category-specific pastel | Varies by tag/category (see palette below) |

Never use `#8B5CF6` or any other colour for an icon itself. The icon is always navy `#15113C`.

#### Category chips
| Variable | Value | Rule |
|---|---|---|
| Chip text | `#15113C` | Single dark colour for **all** chips — never per-category |
| Chip BG | Category-specific pastel | Varies by tag/category (see palette below) |

#### Canonical category palette
| Tag | Icon BG | Chip BG |
|---|---|---|
| BODY | `#CCFBF1` | `#99F6E4` |
| SELF | `#EDE9FE` | `#C4B5FD` |
| PSYCHE | `#FEF3C7` | `#FDE68A` |
| DAILY | `#DBEAFE` | `#BFDBFE` |
| AGENCY | `#DCFCE7` | `#BBF7D0` |
| HABIT | `#FCE7F3` | `#FBCFE8` |
| PARTS | `#FFF7ED` | `#FED7AA` |
| SOMATIC | `#CFFAFE` | `#A5F3FC` |
| ZER | `#FFE4E6` | `#FECDD3` |
| MIND | `#E0E7FF` | `#C7D2FE` |
| SOS | `#FEE2E2` | `#FCA5A5` |
| REST | `#F3E8FF` | `#E9D5FF` |

**Implementation pattern:**
```tsx
const TAG_STYLES: Record<string, { iconBg: string; chipBg: string }> = { ... };
const ICON_COLOR = "#15113C";
const CHIP_TEXT  = "#15113C";

// Icon container
<div style={{ background: TAG_STYLES[tool.tag].iconBg }}>
  <ToolIcon style={{ color: ICON_COLOR }} />
</div>

// Chip
<span style={{ background: TAG_STYLES[tool.tag].chipBg, color: CHIP_TEXT }}>
  {tool.tag}
</span>
```

**Why this works:** Multi-colour backgrounds → visual noise and no brand signal. With this system, colour identifies category (useful) while icons and text stay legible and consistent (respectful of hierarchy). The purple page gradient carries the brand; the pastel chips carry the content taxonomy.
