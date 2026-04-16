/**
 * Generative palette v2 — implements the design system math agreed on
 * 2026-04-09 (see `spec/review-2026-04-09.md` discussion).
 *
 * This file is TEMPORARY. Once components are migrated off the v1 token
 * shape, this will be renamed to `palette.ts` and imports updated. Until
 * then it lives alongside the existing palette and is fully self-contained
 * (we copy `calculateOptimalChroma` rather than importing so the rename is
 * a single `git mv`).
 *
 * Key differences from v1:
 *
 *   1. Independent light/dark scales — each theme is self-contained.
 *   2. `opposite_base = 100 - base` — text/accents derive from the mirror of
 *      this mode's own base, NOT from the other theme's levels.
 *   3. Fibonacci multipliers (1, 2, 3, 5) on scale:
 *        level1 ×1, level2 ×2, level3 ×3, muted ×5
 *      Plus text: primary ×2, secondary ×5 (scale ≤ 5) or ×3 (scale > 5).
 *   4. Five surface tokens: base, level1, level2, level3, muted.
 *      Two text tokens: primary, secondary (muted surface doubles as
 *      disabled/placeholder text — intentional low contrast).
 *      Two neutral accent tokens: accentBase (×0), accentLevel1 (×1) —
 *      both derived from opposite_base.
 *   5. Muted is the ONLY clamped token. Scale is clamped to 2..13, so
 *      extreme cases where level3 would cross muted don't arise.
 *        light floor = 60%, dark ceiling = 40%.
 *   6. Neutrals format as `oklch(L% 0 none)` — explicit "no hue" (culori's
 *      default formatter emits `0`, so we override here).
 *   7. HSL fallbacks are emitted via culori for both neutrals and chromatic
 *      shades, ready to feed the CSS export's `@supports not (oklch())` block.
 */

import { converter, clampChroma } from 'culori';
import type { OklchColor, HslColor } from '@/types/color';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Smallest scale the UI will accept (also the smallest that produces sensible steps). */
export const SCALE_MIN = 2;
/** Largest scale. Beyond this, level3 starts crossing muted even with sensible bases. */
export const SCALE_MAX = 13;

/** Muted floor for light mode (prevents muted from sliding into dark-mode territory). */
export const MUTED_LIGHT_FLOOR = 60;
/** Muted ceiling for dark mode (prevents muted from sliding into light-mode territory). */
export const MUTED_DARK_CEILING = 40;

/**
 * Fibonacci multipliers used by the token derivation. We use the small
 * Fibonacci subset (1, 2, 3, 5) — the jump from ×3 (level3) to ×5 (muted)
 * is deliberate: it creates a visible gap between the "elevated surfaces"
 * cluster and the muted recessed surface.
 */
const FIB = {
  LEVEL1: 1,
  LEVEL2: 2,
  LEVEL3: 3,
  MUTED: 5,
  PRIMARY: 2,
  SECONDARY_SMALL_SCALE: 5, // scale <= 5 needs the larger fib to stay distinct
  SECONDARY_LARGE_SCALE: 3, // scale > 5 already has enough step; ×3 is enough
  ACCENT_BASE: 0,
  ACCENT_LEVEL1: 1,
} as const;

const toHsl = converter('hsl');

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type NeutralTokenName =
  | 'base'
  | 'level1'
  | 'level2'
  | 'level3'
  | 'muted'
  | 'primary'
  | 'secondary'
  | 'accentBase'
  | 'accentLevel1';

export interface NeutralToken {
  name: NeutralTokenName;
  /** 0–100 */
  lightness: number;
  oklch: OklchColor;
  hsl: HslColor;
  css: {
    /** `oklch(L% 0 none)` — explicit "no hue". */
    oklch: string;
    /** `hsl(0 0% X%)` — sRGB fallback. */
    hsl: string;
  };
}

export interface ModePaletteV2 {
  mode: 'light' | 'dark';
  /** The user-chosen starting lightness for this mode. */
  base: number;
  /** The scale actually used (post-clamp). */
  scale: number;
  /** `100 - base`, used to derive text and accent tokens. */
  oppositeBase: number;
  tokens: Record<NeutralTokenName, NeutralToken>;
}

/**
 * A chromatic accent consists of six shades, each positioned at the same
 * lightness as one of the neutral palette's tokens. This guarantees the
 * accent "rhymes" with the neutrals — a tinted level1 surface sits at the
 * same lightness as the neutral level1 surface, etc.
 */
export type ChromaticShadeLabel =
  | 'level1'
  | 'level2'
  | 'level3'
  | 'muted'
  | 'secondary'
  | 'primary';

export interface ChromaticShade {
  label: ChromaticShadeLabel;
  /** The neutral token whose lightness this shade copied. */
  source: NeutralTokenName;
  lightness: number;
  chroma: number;
  hue: number;
  oklch: OklchColor;
  hsl: HslColor;
  css: {
    /** `oklch(L% C H)`. */
    oklch: string;
    /** `hsl(H S% L%)` — sRGB fallback, gamut-clamped by culori. */
    hsl: string;
  };
}

export interface ChromaticAccent {
  hue: number;
  shades: Record<ChromaticShadeLabel, ChromaticShade>;
}

// ---------------------------------------------------------------------------
// Formatters
// ---------------------------------------------------------------------------

/** `oklch(L% 0 none)` literal for pure neutrals (explicit "no hue"). */
export function formatOklchNone(lightness: number): string {
  return `oklch(${lightness.toFixed(1)}% 0 none)`;
}

/** `oklch(L% C H)` for chromatic shades. */
export function formatOklchHue(
  lightness: number,
  chroma: number,
  hue: number
): string {
  return `oklch(${lightness.toFixed(1)}% ${chroma.toFixed(3)} ${hue.toFixed(1)})`;
}

/** `hsl(H S% L%)` sRGB fallback format. */
function formatHslCss(color: HslColor): string {
  return `hsl(${color.h.toFixed(0)} ${color.s.toFixed(1)}% ${color.l.toFixed(1)}%)`;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Clamp scale to the supported range (2..13), rounding to an integer. */
export function clampScale(scale: number): number {
  return Math.max(SCALE_MIN, Math.min(SCALE_MAX, Math.round(scale)));
}

/** Apply the muted floor (light) / ceiling (dark). */
function clampMuted(mode: 'light' | 'dark', raw: number): number {
  return mode === 'light'
    ? Math.max(MUTED_LIGHT_FLOOR, raw)
    : Math.min(MUTED_DARK_CEILING, raw);
}

/** Pick the secondary-text Fibonacci multiplier based on scale. */
function secondaryMultiplier(scale: number): number {
  return scale <= 5
    ? FIB.SECONDARY_SMALL_SCALE
    : FIB.SECONDARY_LARGE_SCALE;
}

/** Normalize a hue to the canonical 0..360 range. */
function normalizeHue(hue: number): number {
  return ((hue % 360) + 360) % 360;
}

/**
 * Convert a chromatic OKLCH color to an HSL fallback via culori. Not used
 * for neutrals — see `createNeutralToken` which forces h=0 s=0 to avoid
 * culori's phantom hue on achromatic inputs.
 *
 * OKLCH's chroma range exceeds the sRGB gamut at most lightnesses, so we
 * MUST gamut-map before converting — otherwise culori happily returns HSL
 * saturation values > 100% (invalid CSS). `clampChroma` preserves L and H
 * while reducing C until the color fits sRGB, which is exactly what we
 * want for a faithful fallback.
 *
 * sRGB HSL L ≠ OKLCH L (perceptual vs sRGB lightness), so we still run
 * the full conversion rather than copying L.
 */
function oklchToHslColor(color: OklchColor): HslColor {
  const inGamut = clampChroma(
    { mode: 'oklch', l: color.l, c: color.c, h: color.h },
    'oklch',
    'rgb'
  );
  const hsl = toHsl(inGamut);
  // Belt-and-suspenders: even after gamut mapping, clamp to valid CSS
  // ranges. A correctly gamut-mapped color won't trip these, but float
  // noise can push s/l a hair past the boundary.
  const s = Math.max(0, Math.min(100, (hsl?.s ?? 0) * 100));
  const l = Math.max(0, Math.min(100, (hsl?.l ?? 0) * 100));
  return {
    mode: 'hsl',
    h: ((hsl?.h ?? 0) % 360 + 360) % 360,
    s,
    l,
  };
}

/** Build a neutral token at the given 0–100 lightness. */
function createNeutralToken(
  name: NeutralTokenName,
  lightness: number
): NeutralToken {
  const oklch: OklchColor = {
    mode: 'oklch',
    l: lightness / 100,
    c: 0,
    h: 0,
  };
  // For pure neutrals, force hue=0 and saturation=0 in the HSL fallback.
  // Culori's converter can return a spurious hue (e.g. 300°) from
  // achromatic inputs due to float precision — semantically irrelevant
  // since s=0 renders identically, but visually confusing in CSS output.
  // OKLCH L ≠ HSL L (perceptual vs sRGB), so we still take L from culori.
  const converted = toHsl({ mode: 'oklch', l: lightness / 100, c: 0, h: 0 });
  const hsl: HslColor = {
    mode: 'hsl',
    h: 0,
    s: 0,
    l: (converted?.l ?? 0) * 100,
  };
  return {
    name,
    lightness,
    oklch,
    hsl,
    css: {
      oklch: formatOklchNone(lightness),
      hsl: formatHslCss(hsl),
    },
  };
}

/**
 * Optimal chroma curve for chromatic accents. Copied verbatim from the v1
 * `accents.ts` implementation — we want identical chroma behavior during
 * the migration, and duplicating ~10 lines keeps this file independently
 * renameable (`git mv palette-v2.ts palette.ts` with no import fixup).
 *
 * The curve peaks around L≈50 (maximum perceptual vibrancy) and tapers at
 * both extremes (near-black and near-white can't sustain high chroma).
 */
function calculateOptimalChroma(lightness: number): number {
  if (lightness < 20) {
    return 0.08 + (lightness / 20) * 0.07;
  }
  if (lightness < 50) {
    return 0.12 + ((lightness - 20) / 30) * 0.06;
  }
  if (lightness < 70) {
    return 0.18 - ((lightness - 50) / 20) * 0.03;
  }
  return 0.15 - ((lightness - 70) / 30) * 0.07;
}

// ---------------------------------------------------------------------------
// Neutral palette generation
// ---------------------------------------------------------------------------

/**
 * Generate a complete mode palette.
 *
 * Light mode: surface tokens move DOWN from base (toward 0); text and
 * accent tokens move UP from opposite_base (toward 100). Dark mode is the
 * mirror image.
 *
 * `base` is NOT clamped. The system is deliberately open at the edges —
 * the UI should encourage sensible values (near 100 for light mode, near
 * 0 for dark mode) but never hard-limit them.
 *
 * Worked examples (verified against spec):
 *
 *   generateModePaletteV2('light', 97, 3) →
 *     { base: 97, level1: 94, level2: 91, level3: 88, muted: 82,
 *       primary: 9, secondary: 18, accentBase: 3, accentLevel1: 6 }
 *
 *   generateModePaletteV2('dark', 7, 7) →
 *     { base: 7, level1: 14, level2: 21, level3: 28, muted: 40 (clamp from 42),
 *       primary: 79, secondary: 72, accentBase: 93, accentLevel1: 86 }
 */
export function generateModePaletteV2(
  mode: 'light' | 'dark',
  base: number,
  scale: number
): ModePaletteV2 {
  const s = clampScale(scale);
  const oppositeBase = 100 - base;

  // Surfaces move AWAY from base toward the center of the lightness range.
  // Text and accents do the same thing but starting from opposite_base.
  const surfaceSign = mode === 'light' ? -1 : 1;
  const textSign = -surfaceSign;

  const level1L = base + surfaceSign * s * FIB.LEVEL1;
  const level2L = base + surfaceSign * s * FIB.LEVEL2;
  const level3L = base + surfaceSign * s * FIB.LEVEL3;
  const mutedRaw = base + surfaceSign * s * FIB.MUTED;
  const mutedL = clampMuted(mode, mutedRaw);

  const primaryL = oppositeBase + textSign * s * FIB.PRIMARY;
  const secondaryL = oppositeBase + textSign * s * secondaryMultiplier(s);

  const accentBaseL = oppositeBase + textSign * s * FIB.ACCENT_BASE; // == oppositeBase
  const accentLevel1L = oppositeBase + textSign * s * FIB.ACCENT_LEVEL1;

  return {
    mode,
    base,
    scale: s,
    oppositeBase,
    tokens: {
      base: createNeutralToken('base', base),
      level1: createNeutralToken('level1', level1L),
      level2: createNeutralToken('level2', level2L),
      level3: createNeutralToken('level3', level3L),
      muted: createNeutralToken('muted', mutedL),
      primary: createNeutralToken('primary', primaryL),
      secondary: createNeutralToken('secondary', secondaryL),
      accentBase: createNeutralToken('accentBase', accentBaseL),
      accentLevel1: createNeutralToken('accentLevel1', accentLevel1L),
    },
  };
}

// ---------------------------------------------------------------------------
// Chromatic accent generation
// ---------------------------------------------------------------------------

function createChromaticShade(
  label: ChromaticShadeLabel,
  source: NeutralTokenName,
  lightness: number,
  hue: number
): ChromaticShade {
  const chroma = calculateOptimalChroma(lightness);
  const h = normalizeHue(hue);
  const oklch: OklchColor = {
    mode: 'oklch',
    l: lightness / 100,
    c: chroma,
    h,
  };
  const hsl = oklchToHslColor(oklch);
  return {
    label,
    source,
    lightness,
    chroma,
    hue: h,
    oklch,
    hsl,
    css: {
      oklch: formatOklchHue(lightness, chroma, h),
      hsl: formatHslCss(hsl),
    },
  };
}

/**
 * Generate a chromatic accent by "swapping the hue from none to the
 * degree" at every shade source lightness, with chroma from the optimal
 * chroma curve.
 */
export function generateChromaticAccent(
  palette: ModePaletteV2,
  hue: number
): ChromaticAccent {
  const build = (label: ChromaticShadeLabel, source: NeutralTokenName) =>
    createChromaticShade(label, source, palette.tokens[source].lightness, hue);

  return {
    hue: normalizeHue(hue),
    shades: {
      level1: build('level1', 'level1'),
      level2: build('level2', 'level2'),
      level3: build('level3', 'level3'),
      muted: build('muted', 'muted'),
      secondary: build('secondary', 'secondary'),
      primary: build('primary', 'primary'),
    },
  };
}

// ---------------------------------------------------------------------------
// Accent resolution — which neutral accent stays when chromatic is active
// ---------------------------------------------------------------------------

/**
 * Which neutral accent fills the "secondary accent" slot when a chromatic
 * accent is active.
 *
 * Default: `accentBase`. Rationale: focus rings and emphasis strokes on a
 * chromatic-colored element need MAXIMUM contrast to remain visible against
 * the chromatic. `accentBase` (= `opposite_base`) is the most extreme
 * neutral the system produces — stronger than `accentLevel1` by exactly one
 * scale-step.
 *
 * Flip to `accentLevel1` if you prefer a softer, one-step-off neutral
 * alongside chromatic. Single line change, no other code affected.
 */
export const NEUTRAL_WITH_CHROMATIC: 'accentBase' | 'accentLevel1' =
  'accentBase';

export interface ResolvedAccents {
  chromatic: ChromaticAccent | null;
  /** One token when chromatic is active; both neutral accents otherwise. */
  neutralAccents: NeutralToken[];
}

/**
 * Resolve the accent slots for a mode palette given an optional chromatic.
 *
 * - No chromatic: returns both neutral accents (accentBase + accentLevel1).
 * - Chromatic: returns the chromatic accent + one neutral
 *   (controlled by `NEUTRAL_WITH_CHROMATIC`).
 */
export function resolveAccents(
  palette: ModePaletteV2,
  chromatic: ChromaticAccent | null
): ResolvedAccents {
  if (chromatic) {
    return {
      chromatic,
      neutralAccents: [palette.tokens[NEUTRAL_WITH_CHROMATIC]],
    };
  }
  return {
    chromatic: null,
    neutralAccents: [palette.tokens.accentBase, palette.tokens.accentLevel1],
  };
}

// ---------------------------------------------------------------------------
// Full theme (convenience wrapper)
// ---------------------------------------------------------------------------

export interface ThemeV2Input {
  light: { base: number; scale: number };
  dark: { base: number; scale: number };
  /** Optional chromatic hue 0..360. Null/undefined = neutral-only theme. */
  chromaticHue?: number | null;
}

export interface ThemeV2 {
  light: ModePaletteV2;
  dark: ModePaletteV2;
  lightAccents: ResolvedAccents;
  darkAccents: ResolvedAccents;
}

/**
 * Generate both mode palettes plus resolved accents in one call. Each mode
 * is fully self-contained — the light palette does not reference the dark
 * palette's values (or vice-versa) at any point.
 */
export function generateThemeV2(input: ThemeV2Input): ThemeV2 {
  const light = generateModePaletteV2('light', input.light.base, input.light.scale);
  const dark = generateModePaletteV2('dark', input.dark.base, input.dark.scale);

  const hue = input.chromaticHue;
  const chromaticLight =
    hue != null ? generateChromaticAccent(light, hue) : null;
  const chromaticDark =
    hue != null ? generateChromaticAccent(dark, hue) : null;

  return {
    light,
    dark,
    lightAccents: resolveAccents(light, chromaticLight),
    darkAccents: resolveAccents(dark, chromaticDark),
  };
}

// ---------------------------------------------------------------------------
// L0 suggestions (ported from v1 palette.ts)
// ---------------------------------------------------------------------------

function generateStepsFromZero(scale: number): number[] {
  const steps: number[] = [];
  for (let i = 0; i * scale <= 100; i++) {
    steps.push(i * scale);
  }
  return steps;
}

function generateStepsFromHundred(scale: number): number[] {
  const steps: number[] = [];
  for (let i = 0; 100 - i * scale >= 0; i++) {
    steps.push(100 - i * scale);
  }
  return steps;
}

/** Suggested L0 options for light and dark mode base selection. */
export function getSuggestedL0Options(
  scale: number,
  count: number = 5
): { light: number[]; dark: number[] } {
  return {
    light: generateStepsFromHundred(scale).slice(0, count),
    dark: generateStepsFromZero(scale).slice(0, count),
  };
}
