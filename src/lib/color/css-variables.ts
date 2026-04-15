/**
 * CSS Variable Bridge
 *
 * Maps palette-v2 output to CSS variables — both our OKLCH naming convention
 * and shadcn's convention.
 */

import type { ModePaletteV2, ChromaticAccent } from './palette-v2';
import { createSystemAccent } from './accents';

type CssVarMap = Record<string, string>;

/**
 * Generate our OKLCH naming convention CSS variables from a ModePaletteV2
 * and optional ChromaticAccent.
 *
 * When chromatic is provided, accent variables map to the chromatic shades.
 * When null, accent variables map to the neutral accent tokens.
 */
export function generateCssVariables(
  palette: ModePaletteV2,
  chromatic: ChromaticAccent | null
): CssVarMap {
  const t = palette.tokens;
  const vars: CssVarMap = {
    '--color-bg': t.base.css.oklch,
    '--color-surface': t.level1.css.oklch,
    '--color-elevated': t.level2.css.oklch,
    '--color-level3': t.level3.css.oklch,
    '--color-muted': t.muted.css.oklch,
    '--color-text-primary': t.primary.css.oklch,
    '--color-text-secondary': t.secondary.css.oklch,
    '--color-text-muted': t.muted.css.oklch,
  };

  if (chromatic) {
    vars['--color-accent-primary'] = chromatic.shades.primary.css.oklch;
    vars['--color-accent-secondary'] = chromatic.shades.secondary.css.oklch;
    vars['--color-accent-level1'] = chromatic.shades.level1.css.oklch;
    vars['--color-accent-level2'] = chromatic.shades.level2.css.oklch;
    vars['--color-accent-level3'] = chromatic.shades.level3.css.oklch;
    vars['--color-accent-muted'] = chromatic.shades.muted.css.oklch;
    vars['--color-accent-base'] = t.accentBase.css.oklch;
  } else {
    vars['--color-accent-base'] = t.accentBase.css.oklch;
    vars['--color-accent-level1'] = t.accentLevel1.css.oklch;
  }

  return vars;
}

/**
 * Generate shadcn/ui compatible CSS variables from a ModePaletteV2 and
 * optional ChromaticAccent and system hues.
 *
 * Maps our palette tokens to shadcn's expected variable names:
 * --background, --foreground, --card, --card-foreground, --popover,
 * --popover-foreground, --muted, --muted-foreground, --border, --input,
 * --ring, --primary, --primary-foreground, --secondary,
 * --secondary-foreground, --accent, --accent-foreground, --destructive,
 * --destructive-foreground.
 */
export function generateShadcnVariables(
  palette: ModePaletteV2,
  chromatic: ChromaticAccent | null,
  systemHues: { danger: number; warning: number; success: number } | null
): CssVarMap {
  const t = palette.tokens;

  const vars: CssVarMap = {
    '--background': t.base.css.oklch,
    '--foreground': t.primary.css.oklch,
    '--card': t.level1.css.oklch,
    '--card-foreground': t.primary.css.oklch,
    '--popover': t.level1.css.oklch,
    '--popover-foreground': t.primary.css.oklch,
    '--muted': t.muted.css.oklch,
    '--muted-foreground': t.secondary.css.oklch,
    '--border': t.level3.css.oklch,
    '--input': t.level3.css.oklch,
    '--ring': chromatic ? chromatic.shades.primary.css.oklch : t.accentBase.css.oklch,
    '--primary': chromatic ? chromatic.shades.primary.css.oklch : t.accentBase.css.oklch,
    '--primary-foreground': t.base.css.oklch,
    '--secondary': t.level2.css.oklch,
    '--secondary-foreground': t.primary.css.oklch,
    '--accent': t.level2.css.oklch,
    '--accent-foreground': t.primary.css.oklch,
  };

  if (systemHues) {
    const danger = createSystemAccent('danger', systemHues.danger);
    const dangerBase = danger.shades.find(s => s.label === 'base');
    const dangerText = danger.shades.find(s => s.label === 'text');
    if (dangerBase) vars['--destructive'] = dangerBase.css.oklch;
    if (dangerText) vars['--destructive-foreground'] = dangerText.css.oklch;
  } else {
    vars['--destructive'] = 'oklch(55% 0.2 25)';
    vars['--destructive-foreground'] = 'oklch(95% 0 none)';
  }

  return vars;
}

/**
 * Generate CSS variables for all system accent colors (success, warning,
 * danger). Each shade is emitted as `--color-{type}-{label}`.
 */
export function generateSystemCssVariables(
  systemHues: { danger: number; warning: number; success: number }
): CssVarMap {
  const vars: CssVarMap = {};
  const types = ['success', 'warning', 'danger'] as const;

  for (const type of types) {
    const accent = createSystemAccent(type, systemHues[type]);
    for (const shade of accent.shades) {
      vars[`--color-${type}-${shade.label}`] = shade.css.oklch;
    }
  }

  return vars;
}
