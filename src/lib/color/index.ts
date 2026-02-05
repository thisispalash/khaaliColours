/**
 * Color Library - Main Export
 *
 * Khaali Colours OKLCH Color System Generator
 */

// Core OKLCH utilities
export {
  createOklch,
  createNeutral,
  formatOklchCss,
  toCuloriOklch,
  fromCuloriOklch,
  getLightness100,
  clampLightness,
  clampChroma,
  normalizeHue,
  isAchromatic,
} from './oklch';

// HSL utilities (sRGB fallback)
export {
  createHsl,
  createNeutralHsl,
  oklchToHsl,
  formatHslCss,
  isInSrgbGamut,
  clampHsl,
} from './hsl';

// WCAG Contrast
export {
  WCAG_THRESHOLDS,
  getContrastRatio,
  checkContrast,
  formatContrastRatio,
  getRelativeLuminance,
  suggestTextColor,
  findContrastingLightness,
} from './contrast';

// Palette generation
export {
  generateLightnessSteps,
  createNeutralStep,
  generateNeutralSteps,
  calculateLightModeLevels,
  calculateDarkModeLevels,
  calculateLightModeText,
  calculateDarkModeText,
  generateModePalette,
  getSuggestedL0Options,
} from './palette';

// Accent colors
export {
  SYSTEM_ACCENT_DEFAULTS,
  generateAccentShades,
  generateSystemAccentShades,
  createAccentColor,
  createSystemAccent,
  getAccentShade,
  getSystemAccentShade,
  generateDefaultSystemAccents,
  validateAccentHarmony,
} from './accents';

// Re-export types
export type {
  OklchColor,
  HslColor,
  NeutralStep,
  ColorLevel,
  TextColor,
  ModePalette,
  AccentShade,
  AccentColor,
  SystemAccent,
  SystemAccentShade,
  ColorPalette,
  ContrastResult,
  PaletteConfig,
  ShadeLabel,
  SystemShadeLabel,
} from '@/types/color';
