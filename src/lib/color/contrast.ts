/**
 * WCAG Contrast Ratio Calculations
 *
 * WCAG 2.1 contrast requirements:
 * - AA Normal text: 4.5:1
 * - AA Large text (18pt+ or 14pt bold): 3:1
 * - AA UI components: 3:1
 * - AAA Normal text: 7:1
 * - AAA Large text: 4.5:1
 */

import { wcagContrast, converter } from 'culori';
import type { OklchColor, HslColor, ContrastResult } from '@/types/color';
import { toCuloriOklch } from './oklch';

const toRgb = converter('rgb');

/** WCAG contrast thresholds */
export const WCAG_THRESHOLDS = {
  AA_NORMAL: 4.5,
  AA_LARGE: 3,
  AAA_NORMAL: 7,
  AAA_LARGE: 4.5,
} as const;

/**
 * Calculate WCAG contrast ratio between two OKLCH colors
 * @param foreground Foreground color (usually text)
 * @param background Background color
 * @returns Contrast ratio (1:1 to 21:1)
 */
export function getContrastRatio(
  foreground: OklchColor,
  background: OklchColor
): number {
  const fgCulori = toCuloriOklch(foreground);
  const bgCulori = toCuloriOklch(background);

  // Convert to RGB for WCAG calculation (WCAG uses sRGB relative luminance)
  const fgRgb = toRgb(fgCulori);
  const bgRgb = toRgb(bgCulori);

  if (!fgRgb || !bgRgb) {
    return 1; // Fallback
  }

  return wcagContrast(fgRgb, bgRgb);
}

/**
 * Check if contrast meets various WCAG requirements
 * @param foreground Foreground color
 * @param background Background color
 * @returns Object with pass/fail for each requirement
 */
export function checkContrast(
  foreground: OklchColor,
  background: OklchColor
): ContrastResult {
  const ratio = getContrastRatio(foreground, background);

  return {
    ratio,
    passesAA: ratio >= WCAG_THRESHOLDS.AA_NORMAL,
    passesAAA: ratio >= WCAG_THRESHOLDS.AAA_NORMAL,
    passesAALarge: ratio >= WCAG_THRESHOLDS.AA_LARGE,
  };
}

/**
 * Format contrast ratio for display
 * @param ratio Contrast ratio
 * @returns Formatted string like "4.5:1"
 */
export function formatContrastRatio(ratio: number): string {
  return `${ratio.toFixed(2)}:1`;
}

/**
 * Get relative luminance from OKLCH color
 * Uses sRGB conversion as per WCAG spec
 */
export function getRelativeLuminance(color: OklchColor): number {
  const culoriOklch = toCuloriOklch(color);
  const rgb = toRgb(culoriOklch);

  if (!rgb) return 0;

  // WCAG relative luminance formula
  const r = rgb.r ?? 0;
  const g = rgb.g ?? 0;
  const b = rgb.b ?? 0;

  const [rs, gs, bs] = [r, g, b].map((c) => {
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Suggest whether text should be light or dark on a given background
 * Based on relative luminance threshold
 */
export function suggestTextColor(background: OklchColor): 'light' | 'dark' {
  const luminance = getRelativeLuminance(background);
  return luminance > 0.179 ? 'dark' : 'light';
}

/**
 * Find the minimum lightness needed to meet contrast on a background
 * @param background Background color
 * @param targetRatio Target contrast ratio
 * @param forLight Whether to find a lighter color (false = darker)
 */
export function findContrastingLightness(
  background: OklchColor,
  targetRatio: number = WCAG_THRESHOLDS.AA_NORMAL,
  forLight: boolean = false
): number {
  const bgLuminance = getRelativeLuminance(background);

  // Binary search for the right lightness
  let low = forLight ? background.l * 100 : 0;
  let high = forLight ? 100 : background.l * 100;

  for (let i = 0; i < 20; i++) {
    const mid = (low + high) / 2;
    const testColor: OklchColor = { ...background, l: mid / 100 };
    const ratio = getContrastRatio(testColor, background);

    if (ratio >= targetRatio) {
      if (forLight) {
        high = mid;
      } else {
        low = mid;
      }
    } else {
      if (forLight) {
        low = mid;
      } else {
        high = mid;
      }
    }
  }

  return forLight ? high : low;
}
