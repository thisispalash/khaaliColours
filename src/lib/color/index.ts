// src/lib/color/index.ts

// Palette v2 (active)
export {
  generateModePaletteV2,
  generateChromaticAccent,
  resolveAccents,
  generateThemeV2,
  formatOklchNone,
  formatOklchHue,
  clampScale,
  getSuggestedL0Options,
  SCALE_MIN,
  SCALE_MAX,
  MUTED_LIGHT_FLOOR,
  MUTED_DARK_CEILING,
  NEUTRAL_WITH_CHROMATIC,
} from './palette-v2';
export type {
  NeutralTokenName,
  NeutralToken,
  ModePaletteV2,
  ChromaticShadeLabel,
  ChromaticShade,
  ChromaticAccent,
  ResolvedAccents,
  ThemeV2Input,
  ThemeV2,
} from './palette-v2';

// System colors
export {
  createSystemTriangle,
  rotateTriangle,
  getRestrictedRange,
} from './system-colors';
export type { SystemTriangle, SystemColorKey } from './system-colors';

// CSS variable bridge
export {
  generateCssVariables,
  generateShadcnVariables,
  generateSystemCssVariables,
} from './css-variables';

// WCAG Contrast
export {
  getContrastRatio,
  checkContrast,
  formatContrastRatio,
  getRelativeLuminance,
} from './contrast';

// Accents (still used for system accent generation)
export {
  createSystemAccent,
  generateDefaultSystemAccents,
  SYSTEM_ACCENT_DEFAULTS,
} from './accents';

// Re-export core types
export type {
  OklchColor,
  HslColor,
  ContrastResult,
  SystemAccent,
  SystemAccentShade,
  SystemShadeLabel,
} from '@/types/color';
