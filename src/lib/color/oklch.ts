/**
 * OKLCH Color Utilities
 *
 * OKLCH is a perceptually uniform color space:
 * - L: Lightness (0-1, we use 0-100 in UI)
 * - C: Chroma (0-0.4, saturation/colorfulness)
 * - H: Hue (0-360 degrees)
 */

import { oklch, formatCss, type Oklch } from 'culori';
import type { OklchColor } from '@/types/color';

/**
 * Create an OKLCH color object
 * @param l Lightness 0-100 (converted to 0-1 internally)
 * @param c Chroma 0-0.4 (0 for neutrals)
 * @param h Hue 0-360 (0 for neutrals)
 */
export function createOklch(l: number, c: number = 0, h: number = 0): OklchColor {
  return {
    mode: 'oklch',
    l: l / 100,  // Convert 0-100 to 0-1
    c,
    h,
  };
}

/**
 * Create a neutral (achromatic) OKLCH color
 * Neutrals have chroma = 0 and hue = 0
 * @param lightness Lightness 0-100
 */
export function createNeutral(lightness: number): OklchColor {
  return createOklch(lightness, 0, 0);
}

/**
 * Format OKLCH color as CSS string
 * @param color OKLCH color object
 * @returns CSS oklch() string for Display P3
 */
export function formatOklchCss(color: OklchColor): string {
  const l = (color.l * 100).toFixed(1);
  const c = color.c.toFixed(3);
  const h = color.h.toFixed(1);

  if (color.alpha !== undefined && color.alpha < 1) {
    return `oklch(${l}% ${c} ${h} / ${color.alpha})`;
  }
  return `oklch(${l}% ${c} ${h})`;
}

/**
 * Convert internal OKLCH to culori format
 */
export function toCuloriOklch(color: OklchColor): Oklch {
  return {
    mode: 'oklch',
    l: color.l,
    c: color.c,
    h: color.h,
    alpha: color.alpha,
  };
}

/**
 * Convert culori OKLCH to internal format
 */
export function fromCuloriOklch(color: Oklch): OklchColor {
  return {
    mode: 'oklch',
    l: color.l ?? 0,
    c: color.c ?? 0,
    h: color.h ?? 0,
    alpha: color.alpha,
  };
}

/**
 * Get lightness as 0-100 value
 */
export function getLightness100(color: OklchColor): number {
  return color.l * 100;
}

/**
 * Clamp lightness to valid range
 */
export function clampLightness(l: number): number {
  return Math.max(0, Math.min(100, l));
}

/**
 * Clamp chroma to valid range
 */
export function clampChroma(c: number): number {
  return Math.max(0, Math.min(0.4, c));
}

/**
 * Clamp hue to valid range (wraps around)
 */
export function normalizeHue(h: number): number {
  return ((h % 360) + 360) % 360;
}

/**
 * Check if a color is achromatic (neutral gray)
 */
export function isAchromatic(color: OklchColor): boolean {
  return color.c < 0.001;
}
