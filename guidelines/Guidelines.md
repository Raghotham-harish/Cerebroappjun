# CereBro Design Guidelines

## Core Principle: Context Shapes Medium

Every screen in CereBro must earn its visual language from the emotional and sensory context of the module it serves. The wrong medium strips meaning — an icon where an image belongs makes a breathing exercise feel like a settings panel. An over-designed UI where minimal text belongs distracts from reflection.

---

## Decision Tree: When to Use What

### 1. Use Full-Bleed Photography when:
- The module evokes a physical environment (forest, ocean, mountain)
- Immersion drives the therapeutic effect (guided imagery, sleep onset)
- The user needs to visually inhabit a space, not just read about it

**Pattern:** Background `backgroundImage` with `cover` sizing + dual gradient overlay (dark at top for header readability, dark at bottom for card legibility). Frosted glass card (`backdrop-filter: blur(20px)` + `rgba(255,255,255,0.12)`) for text content during session.

**Screens using this:** `GuidedImageryScreen`

---

### 2. Use Functional SVG Diagrams when:
- The tool has anatomical specificity (EFT tapping points, body regions)
- Spatial awareness is required (where to tap, which zone to focus on)
- Abstract icons would make the instruction ambiguous or hard to follow

**Pattern:** `viewBox="0 0 W H"` silhouette with zone highlight ellipses overlaid. Active zone pulses via CSS keyframe (`@keyframes pulse { 0%,100%{opacity:0.35} 50%{opacity:0.7} }`). Non-active body parts: `fill: #EDE9FE`, `stroke: #C4B5FD`. Active indicator: `fill: rgba(139,92,246,0.35)`, `stroke: #8B5CF6`.

**Screens using this:** `CrisisGroundingScreen` (EFT tapping face/torso diagram), `BodyScanScreen` (full-body silhouette with 8 zone highlights)

---

### 3. Use Ambient Gradient Cards when:
- The tool has distinct modes/patterns with different emotional qualities
- Each option should feel like its own atmosphere, not just a label difference
- Selection is an act of emotional tuning, not just picking from a list

**Pattern:** Each card gets a unique gradient background (`linear-gradient(135deg, ...)`), a decorative ambient circle (semi-transparent, top-right, `borderRadius: 50%`), and a contextual accent color. Phase chips use `rgba(255,255,255,0.65)` to float over the gradient. No filled icon holder — the gradient IS the visual identity.

**Pattern-to-gradient mapping (BreathLoops):**
- 4-7-8 (calming/sleep): cool blue to lavender `#DBEAFE to #EDE9FE`
- Box Breathing (focus): mint green to sky blue `#D1FAE5 to #DBEAFE`
- Coherence (heart sync): rose to lavender `#FCE7F3 to #FDE8FF`

**Screens using this:** `BreathLoopsScreen`, `CrisisGroundingScreen` (Cold Breath phases)

---

### 4. Use Large Sensory Imagery Panels when:
- A step involves a specific sense and scale communicates intensity
- The user needs to inhabit the step emotionally, not just read it
- Icons are too small to carry the perceptual weight of the instruction

**Pattern:** Full-width 200px-tall colored panel with `w-20 h-20` icon centered, each panel having its own sense-specific gradient. Text card below. No tiny icons — size matters here.

**Sense-to-color mapping (5-4-3-2-1 grounding):**
- SEE: deep purple `#4C1D95 to #5B21B6`
- TOUCH: forest teal `#065F46 to #047857`
- HEAR: navy `#1E3A5F to #1E40AF`
- SMELL: amber `#78350F to #92400E`
- TASTE: crimson `#7F1D1D to #991B1B`

---

### 5. Use Themed Typography Cards when:
- The content itself IS the design artifact (affirmations, quotes)
- Visual identity should amplify what the words mean
- The user needs to feel the emotional register before reading

**Pattern:** Category card with gradient background + ambient circle + all-caps serif label + large italic Lora affirmation preview text. The card shows the first affirmation at reading size — not a truncated excerpt. Accent color derived from the category's emotional territory.

**Category-to-theme mapping (Affirmations):**
- Strength: `#D1FAE5 to #A7F3D0` (emerald green — growth, vitality)
- Calm: `#DBEAFE to #EDE9FE` (blue-lavender — stillness, space)
- Self-Worth: `#FCE7F3 to #FDE8FF` (rose-fuchsia — love, tenderness)
- Clarity: `#EDE9FE to #DDD6FE` (violet — depth, insight)

---

### 6. Use Warm Parchment Aesthetic when:
- The module involves reflective writing or journaling
- The goal is introspection, not stimulation
- Cooler purple tones would create the wrong register (analytical vs. heartfelt)

**Pattern:** Background `#FFFBEB to #FEF9EE` (warm cream). Card backgrounds `rgba(255,255,255,0.75)`. Accent color amber `#D97706`. Prompt label band with `rgba(253,230,138,0.35)` wash. Button gradient amber `#F59E0B to #D97706`. Decorative horizontal rule with centered label between `FDE68A to transparent` gradients.

**Screens using this:** `GratitudeJournalScreen`

---

### 7. Use Dark Night Mode when:
- The module is designed for use at or near bedtime
- Bright screens would be physiologically counterproductive
- The atmosphere itself is part of the ritual

**Pattern:** Background `linear-gradient(135deg, #1E1B4B 0%, #312E81 100%)`. All text white or `#A5B4FC`. Buttons `#8B5CF6`. Breathing circle rings use `rgba(139,92,246,0.1–0.3)`.

**Screens using this:** `SleepRitualScreen` (breathing and done states)

---

### 8. Use Colored Icon Holders with Lucide Line Icons when:
- The module is navigation/utility (chat suggestion cards, tools home grid)
- The tool is cognitive/structured (ZER quadrant, assessments, subpersonality work)
- Each item in a list needs categorical color differentiation, not immersive atmosphere

**Pattern:** `w-10 h-10 rounded-2xl` container with category `iconBg`. Lucide icon at `w-5 h-5`, `strokeWidth: 1.75`, `color: iconColor`. Never `strokeWidth > 2` for decorative use. Never fill a lucide icon.

**Do NOT use icon holders for:** breathing, imagery, body work, journaling. Context is lost when abstract symbols replace sensory or anatomical information.

---

## Typography Rules

| Use case | Font | Weight | Size | Style |
|---|---|---|---|---|
| Screen titles | Lora, serif | 500 | 22-28px | Normal |
| Session instruction text | Lora, serif | 400 | 18-22px | Italic |
| Category labels | Inter, sans-serif | 700 | 11px | Uppercase, tracked |
| Body copy / descriptions | Inter, sans-serif | 400 | 13-14px | Normal |
| Phase labels (Inhale/Exhale) | Lora, serif | 500 | 28-36px | Normal |
| Chip / tag text | Inter, sans-serif | 600 | 11-12px | Normal |
| Prompt questions | Inter, sans-serif | 600 | 13-14px | Normal |

Never use emoji in place of icons. Never use `strokeWidth > 2` for Lucide icons in production UI.

---

## Color System

| Token | Value | Usage |
|---|---|---|
| PURPLE | `#8B5CF6` | Primary interactive, progress bars, active states |
| ICON_COLOR | `#15113C` | Default icon color on light bg |
| PAGE_BG | `linear-gradient(180deg, #EDE9FE 0%, #F5F3FF 100%)` | Default screen background |
| DONE_BG | `linear-gradient(135deg, #EDE9FE 0%, #C4B5FD 100%)` | Completion screens |
| WARM_BG | `linear-gradient(180deg, #FFFBEB 0%, #FEF9EE 100%)` | Journaling screens |
| NIGHT_BG | `linear-gradient(135deg, #1E1B4B 0%, #312E81 100%)` | Sleep screens |

---

## Animation Rules

| Trigger | Technique |
|---|---|
| Active tapping point | CSS `@keyframes eftPulse` - opacity 0.4 to 0.9, scale 1 to 1.15, 1.5s infinite |
| Active body scan zone | CSS `@keyframes bodyZonePulse` - opacity 0.35 to 0.6, 2s infinite |
| Breathing circle expand/contract | CSS `transition: width 0.8s ease, height 0.8s ease` on radius-derived width/height |
| Thumbs up click | CSS `@keyframes ceThumbUp` - scale bounce + slight rotation, re-triggered via React `key` prop |
| Thumbs down click | CSS `@keyframes ceThumbDown` - translateX wobble + rotation, re-triggered via React `key` prop |
| Consent modal entrance | `translateY(100%) to translateY(0)` with `opacity 0 to 1`, 500ms |

Never import `AnimatePresence` or `useScroll` from `motion` directly - use `motion/react` or CSS keyframes.

---

## QA Checklist for Each Tool Screen

- [ ] No emoji anywhere in the component
- [ ] No Lucide icon with `strokeWidth > 2`
- [ ] Visual context matches the module's sensory/emotional register
- [ ] Anatomically specific tools (EFT, Body Scan) use SVG diagrams, not icon placeholders
- [ ] Immersive tools (Imagery, Sleep breathing) use environmental backgrounds
- [ ] Journaling tools use warm, non-clinical color palettes
- [ ] Breathing tools use ambient gradient orbs with smooth scale transitions
- [ ] All screens have a functional `onDone` exit path
- [ ] Voice toggle uses `Mic` / `MicOff` from lucide-react, `strokeWidth: 1.75`
- [ ] Completion/done screen uses `DONE_BG` gradient (or `NIGHT_BG` for sleep)
- [ ] No hardcoded font sizes below 10px
- [ ] All interactive elements have `active:scale-95` or equivalent press feedback

---

## Purple Theme Mandate

CereBro's visual identity is built on a purple foundation. The page background must be purple on every screen unless a specific override applies (Night Mode for sleep, imagery/photograph for immersive tools).

**Rule:** `PAGE_BG = "linear-gradient(180deg, #EDE9FE 0%, #F5F3FF 100%)"` is the default for all tool and assessment screens.

**Allowed exceptions:**
- `NIGHT_BG` for `SleepRitualScreen` breathing and done states
- Full-bleed photography (with overlay) for `GuidedImageryScreen`

**Category accent colors** (amber, blue, teal, orange, rose, etc.) are permitted ONLY in:
- Category chips and section labels
- Selected response button border and background tint
- Progress bar fill color (as an alternative; purple is also acceptable)
- Result score ring gradient or band chip
- Dimension/cluster breakdown bar fills
- Icon holder backgrounds

Category accent colors must NOT appear in:
- The page background (`background` of the root screen container)
- Primary text colors on the page background
- Primary action buttons (use `PURPLE = "#8B5CF6"` for all)

**Journaling exception:** `GratitudeJournalScreen` may retain amber as an accent (prompt labels, textarea borders, decorative rules, save button). The page background must remain purple.

---

## Icon Color Rule

**All Lucide icons must use `color: "#15113C"` (dark navy) on light backgrounds.** This creates visual consistency across the entire tool library regardless of the icon holder's background color.

**Only the icon holder background (`iconBg`)** may vary by category:
- Gratitude: `#FDE68A` (amber)
- Anxiety: `#DBEAFE` (blue)
- Trauma: `#CFFAFE` (teal)
- Burnout: `#FFEDD5` (orange)
- Sleep: `#EDE9FE` (violet) or `#1E1B4B` (night, icon color white)
- Default: any pastel appropriate to the category

**Violation pattern to avoid:** `color: dim.color` or `color: ORANGE` or `color: TEAL` on Lucide icons. These must be replaced with `color: "#15113C"`.

---

## Assessment Screen Layout Standard

Assessment screens (multi-question flows with intro → Q&A → result) must follow this layout pattern consistently:

### Intro view
- Full-page purple `PAGE_BG`
- Back button: `w-10 h-10 rounded-full` glass white circle, `#15113C` icon
- Icon holder: `w-14 h-14 rounded-2xl` centered, category light `iconBg`, `#15113C` icon
- Title: Lora 26px/600, `#15113C`
- Subtitle chip: category accent bg with dark text, centered below title
- Body copy: Inter 14px, `#4B5563`
- Scale preview or dimension chips: category accent bg, dark text
- Begin button: purple `#8B5CF6`

### Question view
- Full-page purple `PAGE_BG`
- Header row: `[back circle] [Q{n} of {total}] [Save & Exit text]`
  - Back: `w-10 h-10 rounded-full` glass white, `#15113C` icon
  - Q counter: Inter 14px/600, `#15113C`
  - Save & Exit: Inter 12px/600, `#9CA3AF` (tappable, calls `onDone`)
- Progress bar: `height: 6`, background `#E5E7EB`, fill `#8B5CF6`
- Section/cluster chip: category accent bg, centered below progress bar
- Question card: `rounded-3xl px-6 py-8`, `background: rgba(255,255,255,0.85)`
  - Question text: Lora 18px, italic, `#15113C`
- Response buttons: unselected = `#E5E7EB` border + white bg; selected = category accent border + category tint bg
- Next/Complete button: purple `#8B5CF6`, disabled = `#E5E7EB`/`#9CA3AF`
- Skip button: Inter 13px, `#9CA3AF`, below Next button, full width

### Result view
- `DONE_BG = "linear-gradient(135deg, #EDE9FE 0%, #C4B5FD 100%)"`
- Score ring: `linear-gradient(135deg, #A78BFA 0%, #7C3AED 100%)`, purple shadow
- Band chip: severity-band color (green/amber/orange/red as appropriate)
- Breakdown bars: category cluster/dimension accent colors
- Action card: `rgba(255,255,255,0.7)`, icon holder with category light bg, `#15113C` icon
- Done button: purple `#8B5CF6`

---

## Skip & Save UX Pattern (Assessment Flows)

### Skip question
- Renders as a plain text button below the primary Next button
- Label: "Skip this question"
- Style: Inter 13px, `#9CA3AF`, no border, no background, full width
- Behavior: advances to next question without updating the answer for the current item (answer stays at its default unset value)
- Scoring: skipped items are imputed at the scale midpoint (e.g. 4 on a 1-7 scale; 3 on a 1-5 scale; 2 on a 0-4 scale)

### Save & Exit
- Renders as a small text button in the top-right of the question header row
- Label: "Save & Exit"
- Style: Inter 12px/600, `#9CA3AF`, no border, no background
- Behavior: calls `onDone()` immediately — no confirmation dialog needed for MVP
- Intro view: the Back button (circle) exits directly to `onDone()` since no answers have been recorded yet

---

## Heuristic Evaluation Framework (Nielsen + Gestalt)

### Severity Scale (Nielsen 0–4)
| Rating | Label | Action |
|---|---|---|
| 0 | Not a problem | No fix needed |
| 1 | Cosmetic | Fix if time allows |
| 2 | Minor | Low priority — schedule |
| 3 | Major | Important — fix before next release |
| 4 | Catastrophic | Must fix before ship — blocks usage |

---

### Nielsen's 10 Heuristics — CereBro-Specific Rules

**H1 · Visibility of System Status**
- Progress bars must always be visible during multi-step flows. Fill is `#8B5CF6`, track is `#E5E7EB`, height `6px`, fully rounded.
- Loading/processing states must show a spinner or shimmer — never a frozen screen.
- Assessment "Q{n} of {total}" counter must always be visible in the header during question flows.
- Voice listening state must clearly differentiate "Ready" vs "Listening" (color + label change).

**H2 · Match Between System and Real World**
- Use plain language. Avoid clinical abbreviations as the primary tool name (e.g. "GAD-7 Anxiety" not just "GAD-7"). Abbreviation may appear in the description.
- Binary Yes/No questions (ACE) must show explicit labels — never just checkboxes.
- Assessment time estimates must be visible on the tool card (e.g. "· 2 min").
- "Save & Exit" label is permissible even without cloud persistence — users understand it as "leave without completing."

**H3 · User Control and Freedom**
- Every tool screen must have a visible back/exit affordance: circle back button (top-left) + "Save & Exit" text (top-right) for assessment flows; circle back button alone for practice flows.
- Back button: `w-11 h-11 rounded-full` (44px minimum), `rgba(255,255,255,0.7)` glass bg, `1.5px solid rgba(0,0,0,0.07)` border, `#15113C` icon.
- Destructive or irreversible actions (account deletion, data clear) require a confirmation dialog.
- Sensitive-content flows (ACE questionnaire) must NOT auto-advance on selection — require an explicit "Next" tap.

**H4 · Consistency and Standards**
- **Single brand primary: `#8B5CF6` (violet).** Never use `#6366F1` (indigo) anywhere in the product. If a component from an external library uses indigo, override it.
- All navigation active states use `#8B5CF6`. All primary CTAs use `#8B5CF6`. All progress fills use `#8B5CF6`.
- Text-link buttons (e.g. "See all →", "History") use `#7C3AED` — a slightly deeper purple that subordinates to the primary but stays on-brand.
- Tab-screen backgrounds (Activities, Insights, Profile): `linear-gradient(180deg, #EDE9FE 0%, #F5F3FF 100%)` — same purple as tool screens. No warm cream exception for navigation screens.
- Tool screen backgrounds: same `PAGE_BG` as above. Exception: SleepRitualScreen breathing/done uses `NIGHT_BG`.

**H5 · Error Prevention**
- Disable primary action buttons until required input exists (grey state: `#E5E7EB` bg, `#9CA3AF` text).
- Sensitive multi-choice questions (ACE Yes/No) require explicit "Next" — no auto-advance on tap.
- Forms with irreversible consequences show a confirmation step.

**H6 · Recognition Rather Than Recall**
- Tool grid must always show name + description + time estimate — never rely on the user remembering what a tool does from a name alone.
- Category filter tabs must be persistent in the ToolsScreen so users can narrow without scrolling through 20+ cards.
- Assessment result screens must show the full band reference table — users should not need to remember what their score means.

**H7 · Flexibility and Efficiency of Use**
- Quick-reply chips on the chat screen allow one-tap entry for common moods.
- Category filter in ToolsScreen lets returning users jump directly to assessments or practices.
- Tool history in ToolsScreen provides a shortcut back to previously used tools.

**H8 · Aesthetic and Minimalist Design**
- Each screen has exactly one primary CTA (purple filled button). Secondary actions are text-only.
- Progress rings and breakdown bars are the only decorative data elements permitted on result screens.
- Cards use `rgba(255,255,255,0.85)` bg and `1.5px solid rgba(139,92,246,0.12)` border — no solid borders, no drop shadows heavier than `0 2px 12px rgba(139,92,246,0.10)`.

**H9 · Help Users Recognize, Diagnose, and Recover from Errors**
- Network/save errors: plain-language message + retry button — never error codes.
- Empty state for History tab: "No sessions yet — try your first tool" with a purple CTA.
- Skipped assessment items: silently imputed at midpoint — no error state shown to user.

**H10 · Help and Documentation**
- Assessment intro screens serve as in-context documentation: scale preview, time estimate, what the score means.
- Safety notices for sensitive assessments (ACE) appear as amber warning cards on the intro view, not as blocking modals.
- First-launch tooltips or coach marks: not yet implemented — add to backlog.

---

### Gestalt Principles — CereBro Mobile Rules

**Proximity**
- Related controls grouped within `gap-2` (8px) or `gap-3` (12px). Unrelated sections separated by `mb-6` or `mb-8` (24–32px).
- Label + input pairs always within 8px. Label above, input below — never label to the right on mobile (too narrow).
- Icon holder + tool name + description: vertical stack with max `gap-3`. No orphaned icons far from their labels.
- In the BottomNav, icon + label gap is `gap-1` (4px) — tight enough to read as a unit.

**Similarity**
- All primary buttons: filled purple `#8B5CF6`, rounded-2xl, full width, `cb-btn-primary` class or equivalent inline style.
- All secondary text-links: `#7C3AED`, Inter 13px, no border.
- All back buttons: identical `w-11 h-11 rounded-full` glass circle. No variation.
- All card containers: `rounded-3xl` for question/journal cards; `rounded-2xl` for summary/info cards; `rounded-xl` for chip-sized elements.
- All chips/tags: `rounded-full` or `rounded-md`, category accent bg, Inter 11px/700, uppercase with tracking.
- Consistent use of similarity signals which elements share behavior — users learn the grammar once.

**Figure-Ground**
- White `rgba(255,255,255,0.85)` cards float on purple gradient ground. Never use a card bg close to the page bg tint — maintain ≥ 20% luminance contrast between card and page.
- Modals/overlays: `rgba(0,0,0,0.4)` scrim behind the modal surface.
- Active selection states: category accent tint bg + accent color border — lifts the selected button above the unselected ground.
- Score rings on result screens: solid gradient circle over the gradient page — ring must be visually heavier than the background (use `boxShadow: "0 8px 32px rgba(139,92,246,0.35)"`).

**Continuity**
- Progress bars fill left-to-right, predictably. Users infer "I am N% through this flow."
- Question flows always move forward (left-to-right conceptually). Back button reverses. Skip advances.
- In category filter rows, tabs are ordered: All → Practice → Assessments → Urgent. This mirrors a funnel from general to specific to emergency.
- Vertical lists (tool cards, history entries) read top-to-bottom. Featured or urgent items sit at the top.

**Common Fate**
- All cards in the tool grid respond to tap with the same animation (`active:scale-95`). Cards that share this behavior are perceived as a group.
- Assessment option buttons: all selected with the same accent color treatment. The uniform animation on tap signals they all belong to the same interaction type.
- Bottom navigation icons all animate at the same speed on tab switch. Mixed animation speeds would break the sense of a unified nav.

**Closure**
- Progress rings are circular even when partially filled — the complete ring shape is implied, and the filled arc communicates completion percentage through partial closure.
- Dashed border on "Coming soon" placeholder cards implies an incomplete state — users read it as a container waiting to be filled.

**Symmetry**
- Two-column tool grid maintains symmetric column widths. Never allow a single card to span both columns unless it is a featured hero card.
- Header row: back button (left) + counter (center) + Save & Exit (right) — symmetric weight distribution.
- Result screens: score ring centered, band chip centered below, insight text centered. Vertical axis symmetry creates calm.

---

### Typography Minimums

| Use case | Min size | Font | Weight |
|---|---|---|---|
| Screen titles | 22px | Lora, serif | 500–600 |
| Question text | 16px | Lora, serif | 400 italic |
| Body copy | 14px | Inter, sans-serif | 400 |
| Card labels / descriptions | 13px | Inter, sans-serif | 400–600 |
| Tags / chips | 11px | Inter, sans-serif | 600–700, uppercase |
| Nav labels | 11px | Inter, sans-serif | 400 (inactive) / 600 (active) |
| Badge / counter text | 10px | Inter, sans-serif | 700 |
| **Absolute minimum** | **10px** | — | — |

**Never go below 10px.** 9px text violates H8 (Aesthetic minimalism — tiny text is noise, not information) and is illegible at arm's length on mobile screens.

---

### Touch Target Rules

| Element | Minimum size | Implementation |
|---|---|---|
| Primary button | 48px height, full width | `py-3` + `rounded-2xl` |
| Back / nav circle button | 44px × 44px | `w-11 h-11 rounded-full` |
| Option/response buttons | 48px height | explicit `height: 52` or `py-4` |
| Bottom nav tab | 44px × 44px tap area | add `py-1 px-4` padding to each tab |
| Text-only link button | 44px touch area | wrap in `py-3 px-4` invisible tap zone |
| Icon-only button | 44px × 44px | `w-11 h-11` minimum |

**Rationale:** Apple HIG specifies 44×44pt minimum. Google Material Design specifies 48×48dp. Under-sized targets cause accidental taps and missed taps — both are H5 (Error Prevention) violations.

---

### Single Brand Primary Rule

**The only primary interactive color in CereBro is `#8B5CF6` (violet).**

| ✅ Permitted | ❌ Prohibited |
|---|---|
| `#8B5CF6` — primary buttons, nav active, progress fill | `#6366F1` — indigo, formerly used in BottomNav |
| `#7C3AED` — secondary text links, deeper accent | `#5B21B6` — profile stats (not brand primary) |
| `#A78BFA` — light accent, ring gradients | `#6B21A8` — profile labels (not brand primary) |
| `#C4B5FD` — subtle borders, chip fills | Any other purple-adjacent hue not in this list |

Category accent colors (amber, blue, teal, rose, orange) are permitted ONLY in chips, selected states, and data visualization — never as primary interactive color.

---

### QA Checklist (Updated — Nielsen + Gestalt)

**Consistency (H4)**
- [ ] All primary buttons use `#8B5CF6` — zero instances of `#6366F1`
- [ ] All text links use `#7C3AED`
- [ ] All icon colors `#15113C` (except white icons on dark/night bg)
- [ ] All Lucide icon `strokeWidth: 1.75` — never above 2 for decorative use
- [ ] Back buttons are `w-11 h-11 rounded-full` (44px)
- [ ] Nav active color is `#8B5CF6`

**Typography (H8 + minimums)**
- [ ] No text below 10px anywhere
- [ ] Nav labels ≥ 11px
- [ ] Body copy ≥ 13px
- [ ] Screen titles ≥ 22px in Lora serif

**Touch targets (H5)**
- [ ] All tappable elements ≥ 44px in at least one dimension
- [ ] Primary buttons full-width with ≥ 48px height

**System status (H1)**
- [ ] Progress bar present in all multi-step flows
- [ ] Disabled button states visually distinct (grey bg + grey text)
- [ ] Q counter always visible during assessment question views

**Gestalt**
- [ ] Related elements grouped with ≤ 12px gap; unrelated separated with ≥ 24px
- [ ] All cards: same rounding grammar (3xl for primary, 2xl for secondary, xl for chips)
- [ ] All primary buttons respond to tap with `active:scale-95`
- [ ] Score rings have `boxShadow: "0 8px 32px rgba(139,92,246,0.35)"`

**Error prevention (H5)**
- [ ] Primary buttons disabled until input exists
- [ ] Sensitive flows (ACE) do not auto-advance on selection


---

# CereBro Design System v1.0

> Single source of truth for all visual decisions. Inspired by Material Design 3 color role patterns, Atlassian spacing scale, and Lucide icon conventions. WCAG 2.1 AA compliant throughout.
>
> **Files:**
> - Tokens (JS): `src/ds/tokens.ts` — export `DS`
> - Components (React): `src/ds/components.tsx`
> - CSS utilities: `src/styles/theme.css` (`--cb-*` custom properties + `.cb-*` classes)

---

## 1. Color System

### Palette

| Token | Value | Role |
|---|---|---|
| `violet-500` | `#8B5CF6` | **Brand Primary** — buttons, progress, active states |
| `violet-600` | `#7C3AED` | **Brand Dark** — text links, hover states |
| `violet-400` | `#A78BFA` | **Brand Light** — illustrations, scroll hints |
| `violet-100` | `#EDE9FE` | **Brand Surface** — card tints, section bg |
| `violet-50`  | `#F5F3FF` | **Brand Subtle** — page gradient end colour |
| `gray-900`   | `#15113C` | **Heading / Icon** — near-black violet |
| `gray-700`   | `#374151` | **Body text** — 7.7:1 on white (AAA) |
| `gray-500`   | `#6B7280` | **Secondary** — 4.6:1 on white (AA large text) |
| `gray-400`   | `#9CA3AF` | **Muted** — decorative only, NEVER body copy |

### Color Role Rules

| Use case | Color |
|---|---|
| Primary interactive (button, progress bar, active tab) | `#8B5CF6` |
| Text links, secondary interactive | `#7C3AED` |
| Headings, icon stroke | `#15113C` |
| Body copy | `#374151` |
| Secondary labels, captions | `#6B7280` |
| Disabled / placeholder text | `#9CA3AF` |
| Success (checkmark, completion) | `#059669` |
| Warning (advisory, not error) | `#D97706` |
| Error / Danger — genuine failure states ONLY | `#DC2626` |

### FORBIDDEN

- `#6366F1` (indigo) — NOT a brand color. Replace with `#8B5CF6`.
- `#5B21B6` / `#6B21A8` as UI text — too dark-purple. Use `#8B5CF6` for numbers, `#6B7280` for labels.
- `#F87171` (red) as "current stage" or "in progress" — implies danger. Use `#8B5CF6`.
- Any `#FFFFFF` page background — always use the purple gradient.

### WCAG Contrast Summary

| Pair | Ratio | Result |
|---|---|---|
| `#15113C` on white | 7.8:1 | ✅ AAA |
| `#374151` on white | 7.7:1 | ✅ AAA |
| `#6B7280` on white | 4.6:1 | ✅ AA (large text ≥18px) |
| `#8B5CF6` on white | 4.5:1 | ✅ AA |
| `#7C3AED` on white | 5.9:1 | ✅ AA |
| `#9CA3AF` on white | 2.8:1 | ⚠️ decorative only |
| white on `#8B5CF6` | 4.5:1 | ✅ AA |

---

## 2. Typography

### Scale

| Token | Size | Weight | Family | Use |
|---|---|---|---|---|
| Display | 28–32px | 500 | Lora | Hero / score display |
| H1 | 24–26px | 500–600 | Lora | Screen title |
| H2 | 20–22px | 500 | Lora | Section title |
| H3 | 17–18px | 600 | Inter | Card title |
| H4 / Label | 15px | 600 | Inter | Field label, list title |
| Body Large | 15px | 400 | Inter | Primary body copy |
| Body | 14px | 400 | Inter | Default body |
| Body Small | 13px | 400 | Inter | Caption / secondary |
| Caption | 12px | 400 | Inter | Fine print |
| Overline | 11px | 700 | Inter | Section labels (UPPERCASE) |
| Nav Label | 11px | 600 | Inter | Bottom nav |
| Chip label | 10px | 700 | Inter | Minimum for readable chips |
| Badge number | 9px | 700 | Inter | Notification dot ONLY |

### Rules

- **Minimum body text:** 11px (10px absolute minimum for chips).
- **9px** is reserved exclusively for notification badge numbers inside ≤18px circles.
- Headings use **Lora** (serif). All UI text uses **Inter** (sans).
- Line height: headings 1.2–1.35, body 1.5, fine print 1.65.
- Letter spacing on overlines: `0.05–0.07em`.

---

## 3. Spacing

4px grid (Atlassian pattern):

| Token | Value | Use |
|---|---|---|
| 1 | 4px | icon gap |
| 2 | 8px | compact row gap |
| 3 | 12px | list item gap |
| 4 | 16px | card padding, page padding |
| 5 | 20px | section gap |
| 6 | 24px | large card padding |
| 8 | 32px | section spacing |
| 12 | 48px | large section gap |

---

## 4. Border Radius

| Token | Value | Use |
|---|---|---|
| sm | 8px | chip, icon badge, small tag |
| md | 12px | input field, icon container |
| lg | 16px | inner card, list row |
| xl | 20px | medium card |
| 2xl | 24px | main content card |
| 3xl | 28px | featured card, modal, bottom sheet |
| full | 9999px | pill button, round chip |

### Rules

- **Primary action buttons are always pill (`border-radius: 9999px`)** — never boxed/square.
- **Icon buttons are always round (`border-radius: 50%` or `9999px`)**.
- **Cards** use 2xl (24px) as default.
- **Input fields** use md (12px) or lg (16px) — never round, never sharp.
- Consistency: never mix pill + boxed buttons in the same screen region.

---

## 5. Shadow Scale

| Token | Value | Use |
|---|---|---|
| sm | `0 1px 3px rgba(0,0,0,0.05)` | inline cards, list items |
| md | `0 2px 8px rgba(139,92,246,0.08)` | glass cards |
| lg | `0 4px 24px rgba(139,92,246,0.12)` | elevated cards |
| xl | `0 8px 32px rgba(139,92,246,0.18)` | score rings, modals |
| btn | `0 4px 20px rgba(139,92,246,0.35)` | primary button |

Purple-tinted shadows reinforce the brand. Use pure-black shadows (`rgba(0,0,0,0.xx)`) only for elevation-neutral surfaces (white cards on white backgrounds).

---

## 6. Button System

### Variants

| Variant | When to use | Class / token |
|---|---|---|
| **Primary** | Single main CTA per screen | `.cb-btn-primary` or `DS.button.primary` |
| **Ghost** | Secondary action alongside primary | `.cb-btn-ghost` |
| **Outline** | Tertiary or paired secondary | `DS.button.outline` |
| **Text link** | Inline actions ("See all →", "History") | `.cb-text-link` |
| **Icon** | Back, bell, close, toggle | `.cb-btn-icon` / `IconButton` |
| **Destructive** | Logout, delete, irreversible | `DS.button.destructive` |

### Rules

- One primary button per screen (H8 Minimalist Design).
- Primary and ghost/outline buttons are **always pill-shaped**.
- Text links are **never boxed** — no border, no background, `color: #7C3AED`.
- Icon buttons: **44×44px minimum** touch target (Apple HIG).
- Disabled state: `#F3F4F6` bg, `#D1D5DB` text — never grey out by opacity alone.
- All buttons have `transition: transform 0.1s ease` and `active:scale(0.97)`.
- Use the `Button` component from `src/ds/components.tsx` for all new buttons.

---

## 7. Card System

### Variants

| Variant | Class | Use |
|---|---|---|
| Glass | `.cb-card` | Main content cards on purple gradient (Gestalt figure-ground) |
| Elevated | `.cb-card-elevated` | Modals, bottom sheets, off-gradient screens |
| Inner | `.cb-card-inner` | Nested cards within a glass/elevated parent |
| Brand | `.cb-card-brand` | Featured card, highlighted CTA area |

### Rules

- Glass cards: `rgba(255,255,255,0.88)` + `1.5px solid rgba(139,92,246,0.12)` + md shadow.
- Inner cards: `#FAFAFA` + `1.5px solid #F3F4F6` — no shadow.
- Padding: 20px (inner) or 24px (featured/large).
- Interactive cards add `active:scale(0.98)` press feedback.

---

## 8. Input Fields

### Rules

- Background: `rgba(255,255,255,0.85)` — always glass on purple gradient.
- Border: `1.5px solid rgba(139,92,246,0.2)` at rest, `#8B5CF6` on focus.
- Border radius: **16px** (lg). Never round (pill), never sharp (0px).
- Minimum height: **52px** (WCAG touch target).
- Font: Inter 15px, `#15113C`.
- Placeholder: `#9CA3AF` (muted — WCAG decorative exception).
- Focus ring: `0 0 0 3px rgba(139,92,246,0.15)`.
- Error state: border `#DC2626`, helper text `#DC2626`.
- Use the `Input` component from `src/ds/components.tsx`.

---

## 9. Chip & Badge System

### Variants

| Variant | Size | Use |
|---|---|---|
| Category chip | 13px, pill, `padding: 6px 14px` | Filter rows (All / Practice / Assessments) |
| Tag chip | 10px, rounded-sm, `padding: 2px 6px` | Tool grid card corners (BURNOUT, GAD, etc.) |
| Status badge | 11px, pill, `padding: 4px 10px` | "NOW", "IN PROGRESS", result labels |
| Notification dot | 9px, 17px circle | Unread count on bell icon — 9px exception |

### Rules

- Active category chip: `#8B5CF6` bg, white text, `box-shadow: 0 2px 8px rgba(139,92,246,0.25)`.
- Inactive chip: glass bg, `#6B7280` text.
- Tags in tool grid: semantic color pairing (chipBg + CHIP_TEXT `#15113C`).
- Never use red (`#DC2626`, `#F87171`) for status badges unless it's a genuine error/danger.
- "NOW" / "IN PROGRESS" badges: violet (`#EDE9FE` bg, `#7C3AED` text).

---

## 10. Overline / Section Labels

```
font: Inter 11px/700 UPPERCASE
letter-spacing: 0.06em
color: #9CA3AF (muted)
margin-bottom: 8–12px before section content
```

Use `.cb-overline` or the `Overline` component. Never use a colon after overline labels.

---

## 11. Dividers

- Style: `1px solid rgba(139,92,246,0.08)` — very subtle violet tint.
- Use `.cb-divider` or `DS.divider`.
- Never use a heavy `#E5E7EB` divider inside glass cards — it breaks the float effect.

---

## 12. Icons

- Library: **Lucide React** throughout.
- `strokeWidth: 1.75` — all icons, no exceptions.
- Default color: `#15113C` (icon role).
- Size: 20×20 for nav/header, 16×16 for inline, 24×24 for featured.
- Never mix strokeWidth values on the same screen.

---

## 13. Progress Indicators

- Track: `rgba(139,92,246,0.12)` (violet tint).
- Fill: `#8B5CF6` (brand primary).
- Height: 8px pill for linear bars.
- Circular (score rings): same fill, 6px stroke.
- Never use indigo (`#6366F1`) or cyan (`#06B6D4`) for progress.

---

## 14. Screen Layout

```
Page bg:        linear-gradient(180deg, #EDE9FE 0%, #F5F3FF 100%)
Page padding:   16px horizontal
Bottom padding: 128px (above tab bar)
Header:         pt-10 (40px safe area top)
Section gap:    16–20px between card groups
```

---

## 15. Quick Implementation Reference

```tsx
// Token import
import { DS } from "@/ds/tokens";

// Button
<Button variant="primary" fullWidth onClick={...}>Begin</Button>
<Button variant="ghost" size="sm">Cancel</Button>
<Button variant="textLink">See all →</Button>

// Card
<Card variant="glass" padding="20px">...</Card>
<Card variant="inner">...</Card>

// Input
<Input label="Your name" placeholder="Enter name" />

// Chip (filter)
<Chip label="Practice" count={11} active={tab==="practice"} onClick={...} />

// Overline
<Overline>TODAY'S PRACTICES</Overline>

// Progress
<ProgressBar value={68} />
<ScoreRing value={72} label="72" sublabel="Score" />
```

---

## 16. Anti-Pattern Checklist

| ❌ Don't | ✅ Do |
|---|---|
| Mix pill + boxed buttons on one screen | All buttons pill-shaped |
| Use `#6366F1` anywhere | Use `#8B5CF6` |
| `#F87171` for "current" / "in progress" | Use `#8B5CF6` |
| Inline `strokeWidth: 2` or `2.5` | Always `strokeWidth: 1.75` |
| `fontSize: '9px'` for readable text | 10px minimum for chips, 11px for body |
| Hand-roll button styles per screen | Use `Button` component |
| `background: white` cards on purple bg | Use glass `rgba(255,255,255,0.88)` |
| `color: '#9CA3AF'` for body copy | Use `#6B7280` minimum |
| No touch target on icon buttons | Always 44×44px minimum |
| Text links with visible border | Pure text: `color: #7C3AED`, no border |
