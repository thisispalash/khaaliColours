import { describe, it, expect } from 'vitest';
import { generateCssVariables, generateShadcnVariables } from './css-variables';
import { generateModePaletteV2, generateChromaticAccent } from './palette-v2';

describe('generateCssVariables', () => {
  const light = generateModePaletteV2('light', 97, 5);
  const dark = generateModePaletteV2('dark', 7, 5);

  it('produces light mode variables', () => {
    const vars = generateCssVariables(light, null);
    expect(vars['--color-bg']).toBe(light.tokens.base.css.oklch);
    expect(vars['--color-surface']).toBe(light.tokens.level1.css.oklch);
    expect(vars['--color-elevated']).toBe(light.tokens.level2.css.oklch);
    expect(vars['--color-muted']).toBe(light.tokens.muted.css.oklch);
    expect(vars['--color-text-primary']).toBe(light.tokens.primary.css.oklch);
    expect(vars['--color-text-secondary']).toBe(light.tokens.secondary.css.oklch);
  });

  it('includes accent variables when chromatic is provided', () => {
    const accent = generateChromaticAccent(light, 220);
    const vars = generateCssVariables(light, accent);
    expect(vars['--color-accent-primary']).toBe(accent.shades.primary.css.oklch);
    expect(vars['--color-accent-level1']).toBe(accent.shades.level1.css.oklch);
  });

  it('maps neutral accents when no chromatic', () => {
    const vars = generateCssVariables(light, null);
    expect(vars['--color-accent-base']).toBe(light.tokens.accentBase.css.oklch);
    expect(vars['--color-accent-level1']).toBe(light.tokens.accentLevel1.css.oklch);
  });
});

describe('generateShadcnVariables', () => {
  const light = generateModePaletteV2('light', 97, 5);

  it('maps to shadcn naming convention', () => {
    const vars = generateShadcnVariables(light, null, null);
    expect(vars['--background']).toBeDefined();
    expect(vars['--foreground']).toBeDefined();
    expect(vars['--muted']).toBeDefined();
    expect(vars['--muted-foreground']).toBeDefined();
    expect(vars['--border']).toBeDefined();
    expect(vars['--input']).toBeDefined();
    expect(vars['--ring']).toBeDefined();
    expect(vars['--primary']).toBeDefined();
    expect(vars['--primary-foreground']).toBeDefined();
    expect(vars['--secondary']).toBeDefined();
    expect(vars['--secondary-foreground']).toBeDefined();
    expect(vars['--accent']).toBeDefined();
    expect(vars['--accent-foreground']).toBeDefined();
    expect(vars['--destructive']).toBeDefined();
    expect(vars['--destructive-foreground']).toBeDefined();
  });

  it('maps destructive to danger system color when provided', () => {
    const vars = generateShadcnVariables(light, null, { danger: 25, warning: 85, success: 145 });
    expect(vars['--destructive']).toMatch(/oklch/);
  });
});
