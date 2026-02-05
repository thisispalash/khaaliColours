/**
 * Color Types for Khaali Colours
 * OKLCH-first color system with HSL fallbacks
 */

/** OKLCH color representation */
export interface OklchColor {
  mode: 'oklch';
  l: number;  // Lightness: 0-1 (we use 0-100 for UI, convert internally)
  c: number;  // Chroma: 0-0.4 (higher = more saturated)
  h: number;  // Hue: 0-360 degrees
  alpha?: number;
}

/** HSL color representation (for sRGB fallback) */
export interface HslColor {
  mode: 'hsl';
  h: number;  // Hue: 0-360
  s: number;  // Saturation: 0-100
  l: number;  // Lightness: 0-100
  alpha?: number;
}

/** Neutral palette step (achromatic) */
export interface NeutralStep {
  lightness: number;  // 0-100
  oklch: OklchColor;
  hsl: HslColor;
  css: {
    oklch: string;
    hsl: string;
  };
}

/** Color level in the palette system */
export interface ColorLevel {
  name: 'l0' | 'l1' | 'l2' | 'muted';
  displayName: string;
  lightness: number;
  oklch: OklchColor;
  hsl: HslColor;
  css: {
    oklch: string;
    hsl: string;
  };
}

/** Text color derived from palette */
export interface TextColor {
  name: 'primary' | 'secondary' | 'muted';
  displayName: string;
  source: 'light' | 'dark';
  sourceLevel: 'l2' | 'muted';
  lightness: number;
  oklch: OklchColor;
  hsl: HslColor;
  css: {
    oklch: string;
    hsl: string;
  };
}

/** Semantic shade names for accent colors (7 shades) */
export type ShadeLabel = 'darkest' | 'darker' | 'dark' | 'base' | 'light' | 'lighter' | 'lightest';

/** Semantic shade names for system colors (5 shades for toasts) */
export type SystemShadeLabel = 'dark' | 'base' | 'light' | 'bg' | 'text';

/** Accent color shade */
export interface AccentShade {
  index: number;  // 0-6 (7 shades)
  label: ShadeLabel;
  lightness: number;
  chroma: number;
  oklch: OklchColor;
  hsl: HslColor;
  css: {
    oklch: string;
    hsl: string;
  };
}

/** Accent color with all shades */
export interface AccentColor {
  name: string;
  hue: number;
  shades: AccentShade[];
}

/** System accent shade for toasts */
export interface SystemAccentShade {
  label: SystemShadeLabel;
  lightness: number;
  chroma: number;
  oklch: OklchColor;
  hsl: HslColor;
  css: {
    oklch: string;
    hsl: string;
  };
}

/** System accent (success, warning, danger) with 5 toast-optimized shades */
export interface SystemAccent {
  name: string;
  semanticName: string;
  hue: number;
  defaultHue: number;
  shades: SystemAccentShade[];
}

/** Mode-specific palette (light or dark) */
export interface ModePalette {
  mode: 'light' | 'dark';
  levels: {
    l0: ColorLevel;
    l1: ColorLevel;
    l2: ColorLevel;
    muted: ColorLevel;
  };
  text: {
    primary: TextColor;
    secondary: TextColor;
    muted: TextColor;
  };
}

/** Complete color palette */
export interface ColorPalette {
  scale: number;
  steps: NeutralStep[];
  light: ModePalette;
  dark: ModePalette;
  accents: {
    primary: AccentColor | null;
    secondary: AccentColor | null;
  };
  systemAccents: {
    success: SystemAccent;
    warning: SystemAccent;
    danger: SystemAccent;
  };
}

/** WCAG contrast result */
export interface ContrastResult {
  ratio: number;
  passesAA: boolean;
  passesAAA: boolean;
  passesAALarge: boolean;
}

/** Palette configuration (user input) */
export interface PaletteConfig {
  scale: number;
  lightL0: number;
  darkL0: number;
  primaryHue: number | null;
  secondaryHue: number | null;
  systemAccents: {
    success: { hue: number; name: string };
    warning: { hue: number; name: string };
    danger: { hue: number; name: string };
  };
}
