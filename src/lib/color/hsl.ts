/**
 * HSL Color Utilities
 *
 * HSL is used for sRGB fallback when browsers don't support OKLCH.
 * - H: Hue (0-360 degrees)
 * - S: Saturation (0-100%)
 * - L: Lightness (0-100%)
 */

import { converter, formatCss, type Hsl } from 'culori';
import type { OklchColor, HslColor } from '@/types/color';
import { toCuloriOklch } from './oklch';

const toHsl = converter('hsl');

/**
 * Create an HSL color object
 * @param h Hue 0-360
 * @param s Saturation 0-100
 * @param l Lightness 0-100
 */
export function createHsl(h: number, s: number, l: number): HslColor {
  return {
    mode: 'hsl',
    h,
    s,
    l,
  };
}

/**
 * Create a neutral (achromatic) HSL color
 * Neutrals have saturation = 0
 * @param lightness Lightness 0-100
 */
export function createNeutralHsl(lightness: number): HslColor {
  return createHsl(0, 0, lightness);
}

/**
 * Convert OKLCH to HSL (sRGB fallback)
 * Note: Colors outside sRGB gamut will be clamped
 * @param oklch OKLCH color object
 * @returns HSL color object
 */
export function oklchToHsl(oklch: OklchColor): HslColor {
  const culoriOklch = toCuloriOklch(oklch);
  const hsl = toHsl(culoriOklch);

  if (!hsl) {
    // Fallback for edge cases
    return createNeutralHsl(oklch.l * 100);
  }

  return {
    mode: 'hsl',
    h: hsl.h ?? 0,
    s: (hsl.s ?? 0) * 100,  // Convert 0-1 to 0-100
    l: (hsl.l ?? 0) * 100,  // Convert 0-1 to 0-100
    alpha: hsl.alpha,
  };
}

/**
 * Format HSL color as CSS string
 * @param color HSL color object
 * @returns CSS hsl() string
 */
export function formatHslCss(color: HslColor): string {
  const h = color.h.toFixed(0);
  const s = color.s.toFixed(1);
  const l = color.l.toFixed(1);

  if (color.alpha !== undefined && color.alpha < 1) {
    return `hsl(${h} ${s}% ${l}% / ${color.alpha})`;
  }
  return `hsl(${h} ${s}% ${l}%)`;
}

/**
 * Check if HSL color is within sRGB gamut
 * (Always true for HSL, but useful for interface consistency)
 */
export function isInSrgbGamut(color: HslColor): boolean {
  return (
    color.h >= 0 && color.h <= 360 &&
    color.s >= 0 && color.s <= 100 &&
    color.l >= 0 && color.l <= 100
  );
}

/**
 * Clamp HSL values to valid ranges
 */
export function clampHsl(color: HslColor): HslColor {
  return {
    mode: 'hsl',
    h: ((color.h % 360) + 360) % 360,
    s: Math.max(0, Math.min(100, color.s)),
    l: Math.max(0, Math.min(100, color.l)),
    alpha: color.alpha,
  };
}
