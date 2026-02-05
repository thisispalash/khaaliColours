/**
 * Neutral Palette Generator
 *
 * Generates lightness steps based on user-defined scale,
 * then derives color levels (L0, L1, L2, muted) for light/dark modes.
 */

import type {
  NeutralStep,
  ColorLevel,
  TextColor,
  ModePalette,
  OklchColor,
} from '@/types/color';
import { createNeutral, formatOklchCss, clampLightness } from './oklch';
import { oklchToHsl, formatHslCss, createNeutralHsl } from './hsl';

/**
 * Generate lightness steps starting from 0 going up
 * Used for dark mode backgrounds
 * @param scale Scale value 1-100
 * @returns Array of lightness values starting from 0
 */
export function generateStepsFromZero(scale: number): number[] {
  if (scale < 1 || scale > 100) {
    throw new Error('Scale must be between 1 and 100');
  }

  const steps: number[] = [];
  for (let i = 0; i * scale <= 100; i++) {
    steps.push(i * scale);
  }
  return steps;
}

/**
 * Generate lightness steps starting from 100 going down
 * Used for light mode backgrounds
 * @param scale Scale value 1-100
 * @returns Array of lightness values starting from 100
 */
export function generateStepsFromHundred(scale: number): number[] {
  if (scale < 1 || scale > 100) {
    throw new Error('Scale must be between 1 and 100');
  }

  const steps: number[] = [];
  for (let i = 0; 100 - i * scale >= 0; i++) {
    steps.push(100 - i * scale);
  }
  return steps;
}

/**
 * Generate all lightness steps for a given scale
 * For backwards compatibility, returns the from-zero array
 *
 * @param scale Scale value 1-100
 * @returns Array of lightness values from 0 to ~100
 */
export function generateLightnessSteps(scale: number): number[] {
  return generateStepsFromZero(scale);
}

/**
 * Create a neutral step with OKLCH and HSL representations
 */
export function createNeutralStep(lightness: number): NeutralStep {
  const oklch = createNeutral(lightness);
  const hsl = oklchToHsl(oklch);

  return {
    lightness,
    oklch,
    hsl,
    css: {
      oklch: formatOklchCss(oklch),
      hsl: formatHslCss(hsl),
    },
  };
}

/**
 * Generate the full neutral palette steps
 */
export function generateNeutralSteps(scale: number): NeutralStep[] {
  const lightnessValues = generateLightnessSteps(scale);
  return lightnessValues.map(createNeutralStep);
}

/**
 * Create a color level from lightness value
 */
function createColorLevel(
  name: ColorLevel['name'],
  displayName: string,
  lightness: number
): ColorLevel {
  const clampedLightness = clampLightness(lightness);
  const oklch = createNeutral(clampedLightness);
  const hsl = oklchToHsl(oklch);

  return {
    name,
    displayName,
    lightness: clampedLightness,
    oklch,
    hsl,
    css: {
      oklch: formatOklchCss(oklch),
      hsl: formatHslCss(hsl),
    },
  };
}

/**
 * Calculate color levels for light mode
 *
 * Light mode: colors get darker as levels increase
 * - L0: User-selected (typically 95-100)
 * - L1: L0 - scale (for cards)
 * - L2: L0 - (scale * 2) (elevated)
 * - Muted: 100 - ((100 - L2) * 2)
 */
export function calculateLightModeLevels(
  l0Lightness: number,
  scale: number
): ModePalette['levels'] {
  const l0 = l0Lightness;
  const l1 = l0 - scale;
  const l2 = l0 - scale * 2;
  const muted = 100 - (100 - l2) * 2;

  return {
    l0: createColorLevel('l0', 'Background', l0),
    l1: createColorLevel('l1', 'Surface', l1),
    l2: createColorLevel('l2', 'Elevated', l2),
    muted: createColorLevel('muted', 'Muted', muted),
  };
}

/**
 * Calculate color levels for dark mode
 *
 * Dark mode: colors get lighter as levels increase
 * - L0: User-selected (typically 0-10)
 * - L1: L0 + scale (for cards)
 * - L2: L0 + (scale * 2) (elevated)
 * - Muted: L2 * 2
 */
export function calculateDarkModeLevels(
  l0Lightness: number,
  scale: number
): ModePalette['levels'] {
  const l0 = l0Lightness;
  const l1 = l0 + scale;
  const l2 = l0 + scale * 2;
  const muted = l2 * 2;

  return {
    l0: createColorLevel('l0', 'Background', l0),
    l1: createColorLevel('l1', 'Surface', l1),
    l2: createColorLevel('l2', 'Elevated', l2),
    muted: createColorLevel('muted', 'Muted', muted),
  };
}

/**
 * Create a text color from source level
 */
function createTextColor(
  name: TextColor['name'],
  displayName: string,
  sourceMode: 'light' | 'dark',
  sourceLevel: 'l2' | 'muted',
  lightness: number
): TextColor {
  const clampedLightness = clampLightness(lightness);
  const oklch = createNeutral(clampedLightness);
  const hsl = oklchToHsl(oklch);

  return {
    name,
    displayName,
    source: sourceMode,
    sourceLevel,
    lightness: clampedLightness,
    oklch,
    hsl,
    css: {
      oklch: formatOklchCss(oklch),
      hsl: formatHslCss(hsl),
    },
  };
}

/**
 * Calculate text colors for light mode
 *
 * Light mode text colors:
 * - Primary: from dark mode L2 (dark text on light bg)
 * - Secondary: from dark mode Muted
 * - Muted: from light mode's own Muted (same mode)
 */
export function calculateLightModeText(
  lightLevels: ModePalette['levels'],
  darkLevels: ModePalette['levels']
): ModePalette['text'] {
  return {
    primary: createTextColor(
      'primary',
      'Primary',
      'dark',
      'l2',
      darkLevels.l2.lightness
    ),
    secondary: createTextColor(
      'secondary',
      'Secondary',
      'dark',
      'muted',
      darkLevels.muted.lightness
    ),
    muted: createTextColor(
      'muted',
      'Muted',
      'light',
      'muted',
      lightLevels.muted.lightness
    ),
  };
}

/**
 * Calculate text colors for dark mode
 *
 * Dark mode text colors:
 * - Primary: from light mode L2 (light text on dark bg)
 * - Secondary: from light mode Muted
 * - Muted: from dark mode's own Muted (same mode)
 */
export function calculateDarkModeText(
  lightLevels: ModePalette['levels'],
  darkLevels: ModePalette['levels']
): ModePalette['text'] {
  return {
    primary: createTextColor(
      'primary',
      'Primary',
      'light',
      'l2',
      lightLevels.l2.lightness
    ),
    secondary: createTextColor(
      'secondary',
      'Secondary',
      'light',
      'muted',
      lightLevels.muted.lightness
    ),
    muted: createTextColor(
      'muted',
      'Muted',
      'dark',
      'muted',
      darkLevels.muted.lightness
    ),
  };
}

/**
 * Generate complete mode palette (levels + text)
 */
export function generateModePalette(
  mode: 'light' | 'dark',
  l0Lightness: number,
  scale: number,
  oppositeLevels?: ModePalette['levels']
): ModePalette {
  const levels =
    mode === 'light'
      ? calculateLightModeLevels(l0Lightness, scale)
      : calculateDarkModeLevels(l0Lightness, scale);

  // For text colors, we need the opposite mode's levels
  // If not provided, calculate them with default values
  const oppositeL0 = mode === 'light' ? 0 : 100;
  const opposite =
    oppositeLevels ??
    (mode === 'light'
      ? calculateDarkModeLevels(oppositeL0, scale)
      : calculateLightModeLevels(oppositeL0, scale));

  const text =
    mode === 'light'
      ? calculateLightModeText(levels, opposite)
      : calculateDarkModeText(opposite, levels);

  return {
    mode,
    levels,
    text,
  };
}

/**
 * Get suggested L0 options for a given scale
 * Light mode uses steps from 100 down, dark mode uses steps from 0 up
 *
 * @param scale Scale value
 * @param count Number of options to return per mode
 */
export function getSuggestedL0Options(
  scale: number,
  count: number = 6
): { light: number[]; dark: number[] } {
  // Light mode: generate from 100 downward (100, 93, 86, 79... for scale 7)
  const lightSteps = generateStepsFromHundred(scale);
  const lightOptions = lightSteps.slice(0, count);

  // Dark mode: generate from 0 upward (0, 7, 14, 21... for scale 7)
  const darkSteps = generateStepsFromZero(scale);
  const darkOptions = darkSteps.slice(0, count);

  return {
    light: lightOptions,
    dark: darkOptions,
  };
}
