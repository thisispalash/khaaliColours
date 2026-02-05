# PRD: Khaali Colours — OKLCH Color System Generator

**Author:** Trent (via Claude)
**Date:** 2026-02-04
**Status:** Draft

---

## Overview

Khaali Colours is a web-based color system generator that helps designers and developers define consistent, accessible color palettes. The tool generates colors in the OKLCH color space for Display P3 gamut with automatic HSL fallbacks for sRGB compatibility. Built with Next.js 15, server-side rendered, ISR-compliant, and immediately deployable to Vercel.

---

## Problem Statement

**Problem:** Defining a consistent, accessible color system for web projects is complex and error-prone. Designers must manually calculate color relationships, ensure contrast ratios meet WCAG guidelines, and maintain consistency across light/dark modes and accent colors.

**Who:** Designers and developers building web applications who need a systematic approach to color.

**Evidence:**
- Color systems require mathematical relationships (lightness scales, chroma consistency)
- WCAG contrast compliance is frequently missed in manual color selection
- Light/dark mode color relationships are non-trivial to calculate correctly
- Modern browsers support Display P3, but fallbacks to sRGB are still required

---

## Goals & Success Metrics

**Goals:**
1. Generate complete neutral palettes from user-defined scale value
2. Auto-calculate light/dark mode color relationships
3. Generate accent color shades with consistent chroma/lightness
4. Ensure all generated colors meet WCAG contrast guidelines
5. Output Tailwind-compatible CSS with OKLCH (Display P3) and HSL (sRGB) fallbacks

**Success Metrics:**

| Metric | Target | Measurement |
|--------|--------|-------------|
| Color generation accuracy | 100% mathematical correctness | Unit tests for all calculations |
| WCAG compliance | AA or AAA on all text/bg combinations | Automated contrast checking |
| User task completion | Generate full palette in <2 minutes | User testing |

---

## Scope

### In Scope

**Core Features:**
1. Neutral palette generator with any user-defined scale (1-100)
2. Light/dark mode color level calculations (L0, L1, L2, L3/muted)
3. Text color derivation (primary, secondary, muted)
4. Accent color generator (primary + optional secondary hue)
5. System accent colors with customizable semantic names (success, warning, danger → user can rename)
6. WCAG contrast ratio validation with persistent indicator
7. OKLCH to HSL color conversion
8. Tailwind-compatible CSS variable output (Display P3 + sRGB fallbacks)
9. Live preview with sample components rendered using generated colors

**Technical Stack:**
- Next.js 15 with App Router (SSR, ISR-compliant, Vercel-deployable)
- React 19+ (following Vercel best practices)
- TypeScript
- Tailwind CSS v4
- Color math library (culori or similar for OKLCH/HSL conversions)

### Out of Scope (v1)

- User accounts / saved palettes (server-side persistence)
- Export to design tools (Figma, Sketch plugins)
- Color blindness simulation
- Brand color extraction from images

---

## Color System Specification

### 1. Neutral Palette Generation

**Color Space:** OKLCH (Oklab Lightness, Chroma, Hue)
- Hue = 0 (neutral grays)
- Chroma = 0 (achromatic)
- Lightness = 0% to 100%

**Scale System:**
- User enters any scale value from 1-100 (numeric input)
- System generates all steps from L0 to L100 using that delta
- For high scale values, use modular arithmetic to wrap around
- Examples:
  - Scale 5 → L0, L5, L10, L15... L100 (21 steps)
  - Scale 3 → L0, L3, L6, L9... L99 (34 steps)
  - Scale 7 → L0, L7, L14, L21... L98 (15 steps, wraps at 98)

**Step Generation Formula:**
```
steps = [i * scale for i in range(0, floor(100/scale) + 1)]
if steps[-1] != 100 and scale allows: append 100
```
Use modular wrap for edge cases where scale doesn't divide evenly.

### 2. Color Level System

User selects **Color Level 0** (main background) for each mode:

**Light Mode Example (L0 = L100):**
| Level | Calculation | Example |
|-------|-------------|---------|
| L0 (Background) | User-selected | L100 |
| L1 (Cards/Widgets) | L0 - scale | L95 |
| L2 (Elevated) | L0 - (scale × 2) | L90 |
| L3/Muted | L100 - ((100 - L2) × 2) | L80 |

**Dark Mode Example (L0 = L0):**
| Level | Calculation | Example |
|-------|-------------|---------|
| L0 (Background) | User-selected | L0 |
| L1 (Cards/Widgets) | L0 + scale | L5 |
| L2 (Elevated) | L0 + (scale × 2) | L10 |
| L3/Muted | L2 × 2 | L20 |

### 3. Text Color Derivation

| Text Type | Light Mode Source | Dark Mode Source |
|-----------|-------------------|------------------|
| Primary | Dark mode L2 | Light mode L2 |
| Secondary | Dark mode Muted | Light mode Muted |
| Muted | Light mode Muted (self) | Dark mode Muted (self) |

### 4. Accent Color Generation

User selects hue values only. System generates 5 shades per accent by varying:
- Lightness (L): 5 levels spread across usable range
- Chroma (C): Consistent or slightly varied for vibrancy

**Accent Types:**
- Primary accent (user hue)
- Secondary accent (optional user hue)
- Success (green range: ~145°)
- Warning (amber range: ~85°)
- Danger (red range: ~25°)

System ensures accent colors are:
- Harmonious with chosen neutral palette
- Consistent in perceived brightness across accent types
- WCAG compliant when used with neutral text/backgrounds

### 5. WCAG Contrast Requirements

| Ratio | Use Case |
|-------|----------|
| 4.5:1 | Normal text (AA) |
| 3:1 | Large text, UI components (AA) |
| 7:1 | Normal text (AAA) |

Tool validates and warns on all generated color combinations.

### 6. Color Output Format (Tailwind-Compatible)

```css
/* tailwind.config.ts theme extension format */
@theme {
  /* Display P3 (OKLCH) - primary values */
  --color-bg-0: oklch(100% 0 0);
  --color-bg-1: oklch(95% 0 0);
  --color-bg-2: oklch(90% 0 0);
  --color-bg-muted: oklch(80% 0 0);

  --color-text-primary: oklch(10% 0 0);
  --color-text-secondary: oklch(20% 0 0);
  --color-text-muted: oklch(80% 0 0);

  --color-accent-primary-1: oklch(50% 0.15 250);
  /* ... accent shades ... */

  --color-success: oklch(60% 0.15 145);
  --color-warning: oklch(70% 0.15 85);
  --color-danger: oklch(55% 0.15 25);
}

/* sRGB Fallback (HSL) for browsers without OKLCH */
@supports not (color: oklch(0% 0 0)) {
  @theme {
    --color-bg-0: hsl(0 0% 100%);
    --color-bg-1: hsl(0 0% 95%);
    /* ... all fallbacks ... */
  }
}
```

**Tailwind Usage:**
```html
<div class="bg-bg-0 text-text-primary">
  <button class="bg-accent-primary-3 hover:bg-accent-primary-4">
    Click me
  </button>
</div>
```

---

## Technical Architecture

### File Structure (Next.js 15 App Router)

```
src/
├── app/
│   ├── page.tsx              # Main generator UI (SSR entry)
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Base Tailwind styles
├── components/
│   ├── wizard/
│   │   ├── ScaleInput.tsx        # Step 1: Scale number input
│   │   ├── ColorLevelPicker.tsx  # Step 2: L0 selection grid
│   │   ├── HuePicker.tsx         # Steps 4-6: Hue selection (line/wheel)
│   │   └── SystemAccents.tsx     # Step 6: System colors + rename inputs
│   ├── preview/
│   │   ├── LivePreview.tsx       # Sample components with generated colors
│   │   ├── SampleCard.tsx        # Card component preview
│   │   ├── SampleButton.tsx      # Button component preview
│   │   └── SampleForm.tsx        # Form inputs preview
│   ├── validation/
│   │   ├── ContrastIndicator.tsx # Bottom bar WCAG indicator
│   │   └── ContrastMatrix.tsx    # Detailed contrast breakdown
│   └── export/
│       ├── ExportPanel.tsx       # Copy/download controls
│       └── CSSPreview.tsx        # Tailwind CSS preview
├── lib/
│   ├── color/
│   │   ├── oklch.ts          # OKLCH calculations
│   │   ├── hsl.ts            # HSL conversions
│   │   ├── contrast.ts       # WCAG contrast math (AA: 4.5:1, AAA: 7:1)
│   │   ├── palette.ts        # Neutral palette generation
│   │   └── accents.ts        # Accent shade generation
│   └── export/
│       └── tailwind.ts       # Tailwind CSS variable generation
├── hooks/
│   ├── usePalette.ts         # Palette state management
│   ├── useContrast.ts        # Contrast calculations
│   └── useWizardStep.ts      # Wizard navigation state
└── types/
    └── color.ts              # TypeScript types
```

### Key Technical Decisions

1. **Framework:** Next.js 15 with App Router, SSR, ISR-compliant
2. **Color Library:** `culori` for accurate OKLCH ↔ sRGB conversions
3. **State Management:** React state + URL params (shareable palettes)
4. **Rendering:** Server components where possible, client for interactivity
5. **Styling:** Tailwind CSS v4 — generated output is Tailwind-compatible
6. **Deployment:** Vercel-ready out of the box

---

## Requirements

### Functional Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-1 | User can enter any scale value (1-100) via numeric input | Must have |
| FR-2 | System generates all lightness steps from scale with modular wrap | Must have |
| FR-3 | User can select L0 from generated steps (light mode) | Must have |
| FR-4 | User can select L0 from generated steps (dark mode) | Must have |
| FR-5 | System calculates L1, L2, L3/muted automatically | Must have |
| FR-6 | System calculates text colors from opposite mode | Must have |
| FR-7 | User can select primary accent hue (line/wheel picker) | Must have |
| FR-8 | User can optionally add secondary accent hue | Should have |
| FR-9 | System generates 5 shades per accent | Must have |
| FR-10 | System provides success/warning/danger accents | Must have |
| FR-11 | User can adjust system accent hues | Should have |
| FR-12 | User can rename system accent semantic names | Should have |
| FR-13 | Persistent WCAG contrast indicator (bottom bar) | Must have |
| FR-14 | Live preview with sample UI components | Must have |
| FR-15 | Export Tailwind-compatible CSS (copy/download) | Must have |
| FR-16 | CSS includes OKLCH + HSL fallbacks | Must have |
| FR-17 | Shareable URL with palette configuration | Nice to have |

### Non-Functional Requirements

| Category | Requirement |
|----------|-------------|
| Performance | Color calculations <16ms (60fps interaction) |
| Accessibility | Tool itself meets WCAG AA |
| Browser Support | Modern browsers with OKLCH support + fallbacks |
| Responsiveness | Usable on tablet and desktop |
| Deployment | SSR, ISR-compliant, immediately deployable to Vercel |
| Styling | All generated CSS is Tailwind v4 compatible |

---

## User Interface Flow

### Step-by-Step Wizard Flow

**Step 1: Scale Selection**
- Numeric input field (1-100)
- User enters desired scale value
- On entry → system generates all lightness steps

**Step 2: Color Level 0 Selection**
- System shows first ~5 generated steps for both modes:
  - **Light mode options:** e.g., L97, L94, L91, L88, L85 (if scale=3)
  - **Dark mode options:** e.g., L0, L3, L6, L9, L12 (if scale=3)
- User clicks to select their L0 for each mode
- Can experiment/change selection freely

**Step 3: Palette Generation & Preview**
- System calculates L1, L2, L3/muted and text colors automatically
- Live preview shows sample UI components:
  - Cards, buttons, inputs, text hierarchy
  - All rendered with generated colors
- User can go back to adjust L0 selection

**Step 4: Primary Accent Hue**
- Hue picker (line slider or color wheel — pick what feels best)
- System generates 5 shades per accent
- Live preview updates with accent colors applied

**Step 5: Secondary Accent (Optional)**
- Checkbox: "Add secondary accent"
- If checked → show hue picker
- Preview updates accordingly

**Step 6: System Accents Configuration**
- Three hue pickers for: Success (~145°), Warning (~85°), Danger (~25°)
- Editable semantic names (text inputs):
  - "success" → user can rename to "positive", "good", etc.
  - "warning" → "caution", "amber", etc.
  - "danger" → "error", "destructive", etc.
- Preview updates with system accent colors

### Persistent UI Elements

**Bottom Bar — WCAG Contrast Indicator:**
- Always visible at bottom of viewport
- Shows current contrast ratio for key combinations
- ✓ or ✗ icon indicating WCAG AA/AAA compliance
- Updates in real-time as colors change

**Export Panel (accessible anytime):**
- Copy all CSS to clipboard
- Preview CSS variables (expandable)
- Download as `.css` file
- All output is Tailwind-compatible

---

## Implementation Phases

### Phase 1: Project Setup & Core Color Math
- [ ] Initialize Next.js 15 project with TypeScript, Tailwind v4
- [ ] Configure for Vercel deployment (SSR, ISR)
- [ ] Install culori for color math
- [ ] Implement OKLCH color calculations (`lib/color/oklch.ts`)
- [ ] Implement HSL conversion functions (`lib/color/hsl.ts`)
- [ ] Implement WCAG contrast calculations (`lib/color/contrast.ts`)
- [ ] Create neutral palette generator with modular wrap (`lib/color/palette.ts`)
- [ ] Create color level derivation logic (L0 → L1, L2, muted)
- [ ] Create text color derivation (opposite mode mapping)
- [ ] Unit tests for all color math

### Phase 2: Wizard Flow — Scale & Color Levels
- [ ] Scale numeric input component (1-100)
- [ ] Step generation display (show all L values)
- [ ] Color level picker grid for light mode (first ~5 options)
- [ ] Color level picker grid for dark mode (first ~5 options)
- [ ] Automatic L1/L2/muted calculation and display
- [ ] Text color derivation display
- [ ] Wizard step navigation (`hooks/useWizardStep.ts`)

### Phase 3: Live Preview Components
- [ ] LivePreview container component
- [ ] SampleCard component (cards/widgets)
- [ ] SampleButton component (primary, secondary, states)
- [ ] SampleForm component (inputs, labels)
- [ ] Apply generated CSS variables dynamically
- [ ] Light/dark mode toggle in preview

### Phase 4: Accent Color Configuration
- [ ] Hue picker component (line slider or wheel)
- [ ] 5-shade accent generation logic (`lib/color/accents.ts`)
- [ ] Primary accent UI (Step 4)
- [ ] Secondary accent UI with checkbox toggle (Step 5)
- [ ] System accents UI with hue pickers (Step 6)
- [ ] Semantic name text inputs (success→custom, etc.)
- [ ] Accent preview integration

### Phase 5: WCAG Validation & Export
- [ ] ContrastIndicator bottom bar (always visible)
- [ ] Real-time contrast ratio calculation
- [ ] Pass/fail ✓/✗ indicator for WCAG AA
- [ ] Tailwind CSS variable generator (`lib/export/tailwind.ts`)
- [ ] ExportPanel with copy-to-clipboard
- [ ] CSS preview modal/section
- [ ] Download .css file button
- [ ] URL-based palette sharing (optional)

### Phase 6: Polish & Deployment
- [ ] Responsive design (tablet, desktop)
- [ ] Accessibility audit of the tool itself
- [ ] Edge cases (high scale values, boundary L values)
- [ ] Performance optimization (<16ms calculations)
- [ ] Final Vercel deployment verification

---

## Risks & Mitigations

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| OKLCH browser support gaps | Low | Medium | HSL fallback system |
| Color math accuracy issues | Medium | High | Use established library (culori), comprehensive tests |
| Complex UI for non-designers | Medium | Medium | Progressive disclosure, sensible defaults |
| Performance with live updates | Low | Medium | Debounce calculations, optimize renders |

---

## Open Questions

| Question | Owner | Status |
|----------|-------|--------|
| Should palette be saveable to local storage? | Trent | Open |
| Include color blindness preview (v1 or later)? | Trent | Deferred to v2 |
| System accent hues | Trent | Resolved: Success ~145°, Warning ~85°, Danger ~25° |
| Should accent chroma be user-configurable? | Trent | Resolved: Auto-calculate (system determines optimal chroma) |

---

## Verification Plan

### Testing Strategy

1. **Unit Tests:** All color math functions (OKLCH, HSL, contrast, palette generation)
2. **Component Tests:** UI components render correctly with various inputs
3. **Integration Tests:** Full palette generation flow
4. **Visual Testing:** Storybook or similar for component states
5. **Accessibility Testing:** axe-core, manual screen reader testing
6. **Manual Testing:** Generate palettes and verify in real designs

### Definition of Done

- [ ] All color calculations match specification
- [ ] WCAG contrast validation works correctly
- [ ] CSS export produces valid Display P3 + fallback code
- [ ] UI is responsive and accessible
- [ ] No console errors or warnings
- [ ] Performance targets met (<16ms calculations)

---

## References

- [OKLCH Color Space](https://oklch.com/)
- [culori library](https://culorijs.org/)
- [WCAG Contrast Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
- [Display P3 CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklch)
- Vercel React Best Practices (to be applied during implementation)

---

## Next Steps

1. Confirm remaining open questions
2. Approve this PRD
3. Initialize Next.js 15 project in `/Users/trxnt/Desktop/khaaliColours`
4. Begin Phase 1: Project Setup & Core Color Math
