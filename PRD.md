# PRD: khaaliColors — OKLCH Color System Generator

**Author:** Trent (via Claude)
**Date:** 2026-02-04
**Last Updated:** 2026-04-15
**Status:** In Progress — Lighthouse Redesign merged, v2 palette math active

---

## Overview

khaaliColors is a web-based color system generator that helps designers and developers define consistent, accessible color palettes. The tool generates colors in the OKLCH color space with automatic HSL fallbacks for sRGB compatibility. Built with Next.js 14, React 18, Tailwind CSS v4, and shadcn/ui. The app itself serves as the preview — real shadcn components consume the generated CSS variables natively.

---

## Problem Statement

**Problem:** Defining a consistent, accessible color system for web projects is complex and error-prone. Designers must manually calculate color relationships, ensure contrast ratios meet WCAG guidelines, and maintain consistency across light/dark modes and accent colors.

**Who:** Designers and developers building web applications who need a systematic approach to color — particularly those using shadcn/ui.

**Evidence:**
- Color systems require mathematical relationships (lightness scales, chroma consistency)
- WCAG contrast compliance is frequently missed in manual color selection
- Light/dark mode color relationships are non-trivial to calculate correctly
- Modern browsers support OKLCH, but fallbacks to sRGB are still required
- shadcn/ui users need a way to generate coherent theme variables

---

## Goals & Success Metrics

**Goals:**
1. Generate complete neutral palettes from user-defined scale value
2. Auto-calculate independent light/dark mode color relationships
3. Generate chromatic accent shades harmonized with neutral palette
4. Provide real-time WCAG contrast feedback
5. Output in 4 formats: CSS, Tailwind v4, JSON, and shadcn-compatible variables

**Success Metrics:**

| Metric | Target | Measurement |
|--------|--------|-------------|
| Color generation accuracy | 100% mathematical correctness | Unit tests (28 passing) |
| WCAG compliance | AA or AAA on all text/bg combinations | Real-time hover contrast display |
| User task completion | Generate full palette interactively | All controls in sidebar, no wizard steps |

---

## Scope

### In Scope

**Core Features:**
1. Neutral palette generator with scale clamped 2–13 (Fibonacci multiplier system)
2. Independent light/dark mode token derivation (9 tokens per mode)
3. Text color derivation via `opposite_base = 100 - base` (self-contained per theme)
4. Chromatic accent generator (primary hue only, 6 shades at neutral lightness positions)
5. System accent colors (success, warning, danger) linked as 60° equilateral triangle
6. Real-time WCAG contrast display in sidebar (updates on hover)
7. OKLCH to HSL color conversion via culori with gamut clamping
8. Export in 4 formats: CSS variables, Tailwind v4, JSON, shadcn-compatible
9. Live preview with real shadcn/ui primitive components in mosaic grid

**Technical Stack:**
- Next.js 14 with App Router
- React 18
- TypeScript
- Tailwind CSS v4
- shadcn/ui (28 components installed)
- culori (OKLCH/HSL conversions, gamut mapping)
- vitest (28 tests passing)

### Out of Scope (v1)

- User accounts / saved palettes (server-side persistence)
- Export to design tools (Figma, Sketch plugins)
- Color blindness simulation
- Brand color extraction from images
- Mobile / responsive layout (desktop only)
- Authentication and user button dropdown
- Secondary chromatic accent (removed — primary only)
- Semantic name renaming for system accents
- Shareable URL with palette configuration
- Pointer/touch events on HueWheel

---

## Color System Specification (v2)

### 1. Neutral Palette Generation

**Color Space:** OKLCH (Oklab Lightness, Chroma, Hue)
- Neutrals format as `oklch(L% 0 none)` — explicit "no hue"
- Chroma = 0 (achromatic)
- Lightness = 0% to 100%

**Scale System:**
- Scale clamped to integer range 2–13
- Fibonacci multipliers (1, 2, 3, 5) derive surface tokens from base
- `opposite_base = 100 - base` derives text and accent tokens (self-contained per theme, no cross-mode dependency)

**9 Neutral Tokens Per Mode:**

| Token | Derivation | Purpose |
|-------|-----------|---------|
| base | User-selected L0 | Main background |
| level1 | base ± scale × 1 | Cards/widgets |
| level2 | base ± scale × 2 | Elevated surfaces |
| level3 | base ± scale × 3 | Borders, inputs |
| muted | base ± scale × 5 (clamped) | Disabled/placeholder, recessed surface |
| primary | opposite_base ∓ scale × 2 | Primary text |
| secondary | opposite_base ∓ scale × 3 or 5 | Secondary text (×5 if scale ≤ 5, ×3 if > 5) |
| accentBase | opposite_base | Neutral accent (strongest) |
| accentLevel1 | opposite_base ∓ scale × 1 | Neutral accent (softer) |

± = subtract for light mode (moving darker), add for dark mode (moving lighter).

**Muted Clamp:** Only the muted token is clamped — light mode floor 60%, dark mode ceiling 40%.

**Worked Examples:**

```
Light (base=97, scale=3):
  base=97, level1=94, level2=91, level3=88, muted=82
  primary=9, secondary=18, accentBase=3, accentLevel1=6

Dark (base=7, scale=7):
  base=7, level1=14, level2=21, level3=28, muted=40 (clamped from 42)
  primary=79, secondary=72, accentBase=93, accentLevel1=86
```

### 2. Chromatic Accent Generation

When the user enables a chromatic accent (checkbox toggle):
- User selects a hue (0–360°) via HueWheel
- 6 shades are generated, each at the same lightness as a neutral token (level1, level2, level3, muted, secondary, primary)
- Chroma at each lightness is computed by `calculateOptimalChroma()` — a curve that peaks around L≈50
- This ensures chromatic shades "rhyme" with the neutral palette
- HSL fallbacks are generated via culori with `clampChroma` for gamut safety

**Accent Resolution:**
- No chromatic: both neutral accents (accentBase + accentLevel1) are used
- Chromatic enabled: chromatic accent fills primary slot, `accentBase` fills secondary (configurable via `NEUTRAL_WITH_CHROMATIC` constant)

**shadcn `--primary` mapping:** When chromatic is active, `--primary` uses a vivid mid-tone shade (`oklch(50% 0.18 hue)`) to ensure visible color in both light and dark themes.

### 3. System Color Linkage

Three system colors (danger, warning, success) are linked as an equilateral triangle with 60° spacing:

```
Defaults:
  danger:  25°
  warning: 85°  (+60° from danger)
  success: 145° (+60° from warning)
```

Dragging any one color rotates all three by the same delta (rigid rotation). Each color gets a restricted HueWheel showing only its 60° arc (±30° from center).

### 4. WCAG Contrast

| Ratio | Use Case |
|-------|----------|
| 4.5:1 | Normal text (AA) |
| 3:1 | Large text, UI components (AA) |
| 7:1 | Normal text (AAA) |

Contrast ratio is displayed in the sidebar. Defaults to primary-text-on-background. Updates in real time when hovering over any component in the main grid (shows that component's foreground/background contrast).

### 5. Export Formats

4 formats available via Export modal:

1. **CSS** — `:root` + `.dark` blocks with `--color-*` OKLCH variables
2. **Tailwind v4** — `@theme` + `.dark` blocks
3. **JSON** — structured token data with meta
4. **shadcn** — `@layer base` with shadcn naming convention (`--background`, `--foreground`, `--primary`, `--primary-foreground`, `--muted`, `--border`, `--ring`, `--destructive`, etc.) for both `:root` and `.dark`

**Not yet implemented:** HSL `@supports not (color: oklch())` fallback block in CSS/Tailwind exports.

---

## Technical Architecture

### File Structure

```
src/
├── app/
│   ├── page.tsx              # Renders ComponentGrid
│   ├── layout.tsx            # ColorProvider + AppShell wrapper
│   └── globals.css           # shadcn base styles + hue wheel CSS
├── providers/
│   └── ColorProvider.tsx     # Central state: palette, theme, CSS variable injection
├── components/
│   ├── shell/
│   │   ├── AppShell.tsx      # Header + Sidebar + main layout
│   │   ├── Header.tsx        # Title + Export CTA + User Button
│   │   └── Sidebar.tsx       # Container for all sidebar controls
│   ├── sidebar/
│   │   ├── ContrastDisplay.tsx   # WCAG ratio + level badge
│   │   ├── ThemeToggle.tsx       # Light/dark switch
│   │   ├── ScaleSlider.tsx       # Range input 2–13
│   │   ├── BaseSelection.tsx     # L0 swatch grids (light + dark)
│   │   ├── AccentSection.tsx     # Checkbox + HueWheel
│   │   └── SystemColors.tsx      # 3 linked restricted HueWheels
│   ├── wizard/
│   │   └── HueWheel.tsx      # Reusable hue wheel (full + restricted modes)
│   ├── preview/
│   │   ├── ComponentGrid.tsx     # Mosaic grid container
│   │   ├── ComponentSection.tsx  # Card wrapper with hover contrast
│   │   └── sections/
│   │       ├── ButtonSections.tsx
│   │       ├── InputSections.tsx
│   │       ├── FeedbackSections.tsx
│   │       ├── OverlaySections.tsx
│   │       ├── LayoutSections.tsx
│   │       └── DataSections.tsx
│   ├── export/
│   │   └── ExportModal.tsx   # 4-format export dialog
│   ├── ui/                   # 28 shadcn/ui primitives (auto-generated)
│   └── shared/
│       └── ColorSwatch.tsx
├── lib/
│   └── color/
│       ├── palette-v2.ts     # V2 palette math (Fibonacci, independent themes)
│       ├── system-colors.ts  # Equilateral triangle linkage
│       ├── css-variables.ts  # Palette → CSS variable mapping (OKLCH + shadcn)
│       ├── accents.ts        # System accent shade generation
│       ├── contrast.ts       # WCAG contrast calculations
│       ├── oklch.ts          # OKLCH utilities
│       ├── hsl.ts            # HSL conversion via culori
│       └── index.ts          # Barrel exports
├── hooks/
│   └── useColorContext.ts    # Convenience hook for ColorProvider
└── types/
    └── color.ts              # TypeScript types
```

### Key Technical Decisions

1. **Framework:** Next.js 14 with App Router (originally planned for 15, settled on 14 for stability)
2. **Color Library:** `culori` for OKLCH ↔ sRGB conversions + `clampChroma` for gamut mapping
3. **State Management:** React context (`ColorProvider`) with `useMemo` derived values — CSS variables injected on `<html>` via `useEffect`
4. **UI Components:** shadcn/ui primitives consume generated CSS variables natively — the app IS the preview
5. **Styling:** Tailwind CSS v4 with shadcn's variable convention
6. **Color Math:** Palette-v2 with Fibonacci multipliers, independent per-theme derivation, scale clamped 2–13

---

## Requirements

### Functional Requirements

| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| FR-1 | User can set scale via slider (2–13) | Must have | DONE |
| FR-2 | System derives 9 neutral tokens per mode using Fibonacci multipliers | Must have | DONE |
| FR-3 | User can select L0 from swatch grid (light mode) | Must have | DONE |
| FR-4 | User can select L0 from swatch grid (dark mode) | Must have | DONE |
| FR-5 | System calculates level1–3, muted, primary, secondary, accentBase, accentLevel1 | Must have | DONE |
| FR-6 | Text colors derived from `opposite_base = 100 - base` (self-contained) | Must have | DONE |
| FR-7 | User can select primary accent hue via HueWheel | Must have | DONE |
| FR-8 | ~~Secondary accent~~ | ~~Should have~~ | REMOVED |
| FR-9 | System generates 6 chromatic shades at neutral lightness positions | Must have | DONE |
| FR-10 | System provides success/warning/danger accents (60° linked triangle) | Must have | DONE |
| FR-11 | User can adjust system accent hues (all three rotate together) | Should have | DONE |
| FR-12 | User can rename system accent semantic names | Should have | DEFERRED |
| FR-13 | WCAG contrast display in sidebar (updates on component hover) | Must have | DONE |
| FR-14 | Live preview with real shadcn/ui components in mosaic grid | Must have | DONE (24/33 components) |
| FR-15 | Export in 4 formats: CSS, Tailwind, JSON, shadcn | Must have | DONE |
| FR-16 | CSS includes OKLCH values; HSL `@supports` fallback | Must have | PARTIAL (OKLCH done, HSL @supports not in export) |
| FR-17 | Shareable URL with palette configuration | Nice to have | NOT STARTED |

### Non-Functional Requirements

| Category | Requirement | Status |
|----------|-------------|--------|
| Performance | Color calculations <16ms (60fps interaction) | MET (useMemo, no lag) |
| Accessibility | Tool itself meets WCAG AA | PARTIAL (contrast display works, full audit not done) |
| Browser Support | Modern browsers with OKLCH support | MET |
| Responsiveness | Desktop only (mobile deferred) | SCOPED |
| Deployment | Deployable to Vercel | MET (pnpm build clean) |
| Styling | Generated CSS is Tailwind v4 + shadcn compatible | MET |
| Testing | 28 unit tests passing (palette-v2, system-colors, css-variables) | MET |

---

## User Interface

### Layout (Lighthouse Framework)

```
┌──────────────────────────────────────────────────────┐
│  HEADER                                              │
│  khaaliColors              [Export icon] [User Button]│
├────────────┬─────────────────────────────────────────┤
│  SIDEBAR   │                                         │
│  (sticky)  │   MAIN CONTENT                          │
│  280px     │   (scrollable mosaic grid)              │
│            │                                         │
│ Contrast   │   ┌─────────┐ ┌─────────┐ ┌─────────┐ │
│ Theme      │   │ Button   │ │ Badge   │ │ Card    │ │
│ Scale      │   └─────────┘ └─────────┘ └─────────┘ │
│ Base       │   ┌───────────────┐ ┌─────────┐       │
│ Accent     │   │ Table         │ │ Input   │       │
│ System     │   └───────────────┘ └─────────┘       │
└────────────┴─────────────────────────────────────────┘
```

All controls are always visible in the sidebar — no wizard step progression. Changes are reflected immediately in the component grid.

**Header:** Title left, Export CTA (icon → label on hover) + "User Button" (placeholder, dashed border) right.

**Sidebar:** Contrast display, theme toggle, scale slider (2–13), base selection swatches, chromatic accent checkbox + HueWheel, 3 linked system color HueWheels.

**Main Content:** CSS columns mosaic (1/2/3 columns by breakpoint) of shadcn component sections with all variants.

---

## Implementation Status

### Completed
- [x] Project setup (Next.js 14, Tailwind v4, culori, vitest)
- [x] OKLCH calculations, HSL conversions, WCAG contrast math
- [x] V2 palette math (Fibonacci multipliers, independent themes, muted clamp)
- [x] System color equilateral triangle linkage (7 tests)
- [x] CSS variable bridge (OKLCH + shadcn naming, 5 tests)
- [x] V2 palette tests (16 tests)
- [x] ColorProvider context with CSS variable injection
- [x] Lighthouse layout (Header + Sidebar + Main)
- [x] All 6 sidebar controls
- [x] HueWheel restricted mode fixes (arc rendering, selector clamping, overflow)
- [x] 28 shadcn/ui components installed
- [x] 6 component section files (24 components rendered with variants)
- [x] Mosaic grid layout (CSS columns)
- [x] Export modal (4 formats, reads from context)
- [x] Dead file cleanup (8 v1 files deleted)
- [x] Chromatic accent visibility fix (vivid mid-tone for --primary)
- [x] Font loading fix (inter variable on html)
- [x] Theme toggle (light/dark, entire site)
- [x] Hover contrast (auto foreground-on-card)

### Remaining
- [ ] 9 missing component sections (Button Group, Combo Box, Date Picker, Field, Input Group, Input OTP, Item Label, Sonner, Toast)
- [ ] HSL `@supports` fallback block in CSS/Tailwind export
- [ ] Semantic name renaming for system accents (FR-12)
- [ ] Shareable URL with palette configuration (FR-17)
- [ ] Mobile / responsive layout
- [ ] Accessibility audit of the tool itself
- [ ] `accents.ts` cleanup (spec says removed, but still needed for createSystemAccent)
- [ ] Rename `palette-v2.ts` → `palette.ts` and clean up v1 types in `color.ts`

---

## Risks & Mitigations

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| OKLCH browser support gaps | Low | Medium | HSL fallback system (partially implemented) |
| Color math accuracy issues | Low | High | culori library + 28 passing tests |
| Complex UI for non-designers | Medium | Medium | All controls visible, immediate feedback, no wizard steps |
| Performance with live updates | Low | Low | useMemo derivation, CSS variable injection (no prop drilling) |

---

## Open Questions

| Question | Owner | Status |
|----------|-------|--------|
| Should palette be saveable to local storage? | Palash | Open |
| Include color blindness preview? | Palash | Deferred |
| System accent hues | — | Resolved: 25°/85°/145°, linked as 60° triangle |
| Accent chroma configurable? | — | Resolved: Auto-calculate via `calculateOptimalChroma` |
| Which neutral accent stays with chromatic? | — | Resolved: `accentBase` (configurable constant) |
| Secondary chromatic accent? | — | Resolved: Removed (primary only) |
| Muted token: disabled/placeholder or separate? | — | Resolved: Muted surface doubles as disabled text |
| Contrast validation approach? | Palash | Open (user mentioned "different solution in mind") |

---

## References

- [OKLCH Color Space](https://oklch.com/)
- [culori library](https://culorijs.org/)
- [WCAG Contrast Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
- [shadcn/ui](https://ui.shadcn.com/)
- [Lighthouse Framework](context in `/Users/thisispalash/local/data-dump/proj/lighthouse/context/engineering/`)
- Design spec: `spec/lighthouse-redesign.md`
- Implementation plan: `spec/lighthouse-redesign-plan.md`
- Code review: `spec/review-2026-04-09.md`
