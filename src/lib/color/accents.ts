/**
 * Accent Color Generation
 *
 * Generates 7 shades per accent hue by varying lightness and chroma.
 * System accents get 5 shades optimized for toast notifications.
 */

import type {
  AccentShade,
  AccentColor,
  SystemAccent,
  SystemAccentShade,
  ShadeLabel,
  SystemShadeLabel,
} from '@/types/color';
import { createOklch, formatOklchCss, normalizeHue } from './oklch';
import { oklchToHsl, formatHslCss } from './hsl';

/** Default hues for system accents */
export const SYSTEM_ACCENT_DEFAULTS = {
  success: { hue: 145, name: 'success', minHue: 100, maxHue: 180 },
  warning: { hue: 85, name: 'warning', minHue: 40, maxHue: 100 },
  danger: { hue: 25, name: 'danger', minHue: 0, maxHue: 50 },
} as const;

/**
 * Shade configuration for accent colors (7 shades)
 */
const ACCENT_SHADE_CONFIG: { label: ShadeLabel; lightness: number }[] = [
  { label: 'darkest', lightness: 20 },
  { label: 'darker', lightness: 30 },
  { label: 'dark', lightness: 40 },
  { label: 'base', lightness: 55 },
  { label: 'light', lightness: 70 },
  { label: 'lighter', lightness: 80 },
  { label: 'lightest', lightness: 90 },
];

/**
 * Shade configuration for system accents (5 shades for toasts)
 * - dark: dark accent for borders/icons
 * - base: main color for buttons/badges
 * - light: lighter accent
 * - bg: background for toast
 * - text: text color for toast
 */
const SYSTEM_SHADE_CONFIG: { label: SystemShadeLabel; lightness: number }[] = [
  { label: 'dark', lightness: 35 },
  { label: 'base', lightness: 50 },
  { label: 'light', lightness: 65 },
  { label: 'bg', lightness: 92 },
  { label: 'text', lightness: 25 },
];

/**
 * Calculate optimal chroma for a given lightness
 */
function calculateOptimalChroma(lightness: number): number {
  if (lightness < 20) {
    return 0.08 + (lightness / 20) * 0.07;
  } else if (lightness < 50) {
    return 0.12 + ((lightness - 20) / 30) * 0.06;
  } else if (lightness < 70) {
    return 0.18 - ((lightness - 50) / 20) * 0.03;
  } else {
    return 0.15 - ((lightness - 70) / 30) * 0.07;
  }
}

/**
 * Create a single accent shade
 */
function createAccentShade(
  index: number,
  label: ShadeLabel,
  hue: number,
  lightness: number
): AccentShade {
  const chroma = calculateOptimalChroma(lightness);
  const oklch = createOklch(lightness, chroma, normalizeHue(hue));
  const hsl = oklchToHsl(oklch);

  return {
    index,
    label,
    lightness,
    chroma,
    oklch,
    hsl,
    css: {
      oklch: formatOklchCss(oklch),
      hsl: formatHslCss(hsl),
    },
  };
}

/**
 * Create a single system accent shade
 */
function createSystemAccentShade(
  label: SystemShadeLabel,
  hue: number,
  lightness: number
): SystemAccentShade {
  const chroma = calculateOptimalChroma(lightness);
  const oklch = createOklch(lightness, chroma, normalizeHue(hue));
  const hsl = oklchToHsl(oklch);

  return {
    label,
    lightness,
    chroma,
    oklch,
    hsl,
    css: {
      oklch: formatOklchCss(oklch),
      hsl: formatHslCss(hsl),
    },
  };
}

/**
 * Generate 7 accent shades for a given hue
 */
export function generateAccentShades(hue: number): AccentShade[] {
  return ACCENT_SHADE_CONFIG.map((config, i) =>
    createAccentShade(i, config.label, hue, config.lightness)
  );
}

/**
 * Generate 5 system accent shades for toasts
 */
export function generateSystemAccentShades(hue: number): SystemAccentShade[] {
  return SYSTEM_SHADE_CONFIG.map((config) =>
    createSystemAccentShade(config.label, hue, config.lightness)
  );
}

/**
 * Create an accent color with all shades
 */
export function createAccentColor(name: string, hue: number): AccentColor {
  return {
    name,
    hue: normalizeHue(hue),
    shades: generateAccentShades(hue),
  };
}

/**
 * Create a system accent with 5 toast-optimized shades
 */
export function createSystemAccent(
  type: 'success' | 'warning' | 'danger',
  hue?: number,
  semanticName?: string
): SystemAccent {
  const defaults = SYSTEM_ACCENT_DEFAULTS[type];
  const actualHue = hue ?? defaults.hue;
  const actualName = semanticName ?? defaults.name;

  return {
    name: type,
    semanticName: actualName,
    hue: normalizeHue(actualHue),
    defaultHue: defaults.hue,
    shades: generateSystemAccentShades(actualHue),
  };
}

/**
 * Get a specific shade from an accent by label
 */
export function getAccentShade(
  accent: AccentColor,
  label: ShadeLabel
): AccentShade {
  const shade = accent.shades.find(s => s.label === label);
  if (!shade) {
    throw new Error(`Shade ${label} not found`);
  }
  return shade;
}

/**
 * Get a specific shade from a system accent by label
 */
export function getSystemAccentShade(
  accent: SystemAccent,
  label: SystemShadeLabel
): SystemAccentShade {
  const shade = accent.shades.find(s => s.label === label);
  if (!shade) {
    throw new Error(`System shade ${label} not found`);
  }
  return shade;
}

/**
 * Generate all system accents with defaults
 */
export function generateDefaultSystemAccents(): {
  success: SystemAccent;
  warning: SystemAccent;
  danger: SystemAccent;
} {
  return {
    success: createSystemAccent('success'),
    warning: createSystemAccent('warning'),
    danger: createSystemAccent('danger'),
  };
}

/**
 * Validate that accent hues are sufficiently different
 */
export function validateAccentHarmony(
  hues: number[],
  minDifference: number = 30
): boolean {
  for (let i = 0; i < hues.length; i++) {
    for (let j = i + 1; j < hues.length; j++) {
      const diff = Math.abs(normalizeHue(hues[i]) - normalizeHue(hues[j]));
      const minDiff = Math.min(diff, 360 - diff);
      if (minDiff < minDifference) {
        return false;
      }
    }
  }
  return true;
}
