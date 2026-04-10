import { describe, it, expect } from 'vitest';
import {
  generateModePaletteV2,
  generateChromaticAccent,
  resolveAccents,
  clampScale,
  SCALE_MIN,
  SCALE_MAX,
} from './palette-v2';

describe('palette-v2 spec examples', () => {
  it('Light mode (base=97, scale=3) matches spec', () => {
    const p = generateModePaletteV2('light', 97, 3);
    expect(p.tokens.base.lightness).toBe(97);
    expect(p.tokens.level1.lightness).toBe(94);
    expect(p.tokens.level2.lightness).toBe(91);
    expect(p.tokens.level3.lightness).toBe(88);
    expect(p.tokens.muted.lightness).toBe(82);
    expect(p.tokens.primary.lightness).toBe(9);
    expect(p.tokens.secondary.lightness).toBe(18);
    expect(p.tokens.accentBase.lightness).toBe(3);
    expect(p.tokens.accentLevel1.lightness).toBe(6);
  });

  it('Dark mode (base=7, scale=7) matches spec (with muted clamp)', () => {
    const p = generateModePaletteV2('dark', 7, 7);
    expect(p.tokens.base.lightness).toBe(7);
    expect(p.tokens.level1.lightness).toBe(14);
    expect(p.tokens.level2.lightness).toBe(21);
    expect(p.tokens.level3.lightness).toBe(28);
    expect(p.tokens.muted.lightness).toBe(40); // raw would be 42, clamped to 40
    expect(p.tokens.primary.lightness).toBe(79);
    expect(p.tokens.secondary.lightness).toBe(72);
    expect(p.tokens.accentBase.lightness).toBe(93);
    expect(p.tokens.accentLevel1.lightness).toBe(86);
  });

  it('emits oklch(L% 0 none) format for neutrals', () => {
    const p = generateModePaletteV2('light', 97, 3);
    expect(p.tokens.base.css.oklch).toBe('oklch(97.0% 0 none)');
    expect(p.tokens.level1.css.oklch).toBe('oklch(94.0% 0 none)');
    expect(p.tokens.primary.css.oklch).toBe('oklch(9.0% 0 none)');
  });

  it('emits hsl() fallback for neutrals with zero hue and zero saturation', () => {
    const p = generateModePaletteV2('light', 97, 3);
    // h=0, s=0.0% (toFixed(1)), l=<sRGB lightness>%
    expect(p.tokens.base.css.hsl).toMatch(/^hsl\(0 0\.0% \d+(\.\d+)?%\)$/);
    expect(p.tokens.level1.css.hsl).toMatch(/^hsl\(0 0\.0% \d+(\.\d+)?%\)$/);
    expect(p.tokens.primary.css.hsl).toMatch(/^hsl\(0 0\.0% \d+(\.\d+)?%\)$/);
  });

  it('secondary uses ×5 multiplier when scale ≤ 5', () => {
    const p = generateModePaletteV2('light', 97, 5);
    // primary = 3 + 5*2 = 13
    // secondary = 3 + 5*5 = 28
    expect(p.tokens.primary.lightness).toBe(13);
    expect(p.tokens.secondary.lightness).toBe(28);
  });

  it('secondary uses ×3 multiplier when scale > 5', () => {
    const p = generateModePaletteV2('light', 97, 6);
    // primary = 3 + 6*2 = 15
    // secondary = 3 + 6*3 = 21
    expect(p.tokens.primary.lightness).toBe(15);
    expect(p.tokens.secondary.lightness).toBe(21);
  });
});

describe('palette-v2 clamping', () => {
  it('clamps scale to 2..13', () => {
    expect(clampScale(0)).toBe(SCALE_MIN);
    expect(clampScale(1)).toBe(SCALE_MIN);
    expect(clampScale(2)).toBe(2);
    expect(clampScale(13)).toBe(13);
    expect(clampScale(14)).toBe(SCALE_MAX);
    expect(clampScale(99)).toBe(SCALE_MAX);
  });

  it('clamps light muted to floor 60', () => {
    // base=90 scale=8 → raw muted = 90-40 = 50, should clamp to 60
    const p = generateModePaletteV2('light', 90, 8);
    expect(p.tokens.muted.lightness).toBe(60);
  });

  it('clamps dark muted to ceiling 40', () => {
    // base=10 scale=8 → raw muted = 10+40 = 50, should clamp to 40
    const p = generateModePaletteV2('dark', 10, 8);
    expect(p.tokens.muted.lightness).toBe(40);
  });

  it('does not clamp light muted above floor', () => {
    // base=97 scale=3 → raw muted = 82, above floor, not clamped
    const p = generateModePaletteV2('light', 97, 3);
    expect(p.tokens.muted.lightness).toBe(82);
  });
});

describe('palette-v2 chromatic accent', () => {
  it('produces 6 shades at neutral token lightnesses', () => {
    const p = generateModePaletteV2('light', 97, 3);
    const a = generateChromaticAccent(p, 220);
    expect(a.hue).toBe(220);
    expect(Object.keys(a.shades).sort()).toEqual(
      ['level1', 'level2', 'level3', 'muted', 'primary', 'secondary'].sort()
    );
    expect(a.shades.level1.lightness).toBe(94);
    expect(a.shades.level2.lightness).toBe(91);
    expect(a.shades.level3.lightness).toBe(88);
    expect(a.shades.muted.lightness).toBe(82);
    expect(a.shades.secondary.lightness).toBe(18);
    expect(a.shades.primary.lightness).toBe(9);
  });

  it('each shade carries hue + chroma > 0', () => {
    const p = generateModePaletteV2('light', 97, 3);
    const a = generateChromaticAccent(p, 220);
    for (const shade of Object.values(a.shades)) {
      expect(shade.hue).toBe(220);
      expect(shade.chroma).toBeGreaterThan(0);
      expect(shade.css.oklch).toMatch(/^oklch\(/);
    }
  });

  it('normalizes negative and >360 hues', () => {
    const p = generateModePaletteV2('light', 97, 3);
    expect(generateChromaticAccent(p, -40).hue).toBe(320);
    expect(generateChromaticAccent(p, 400).hue).toBe(40);
  });

  it('HSL fallback saturation and lightness stay within 0..100 across all shades and hues', () => {
    // Chromatic shades can otherwise land outside sRGB gamut. Verify every
    // shade in both modes across the full hue wheel produces valid HSL.
    for (const mode of ['light', 'dark'] as const) {
      const p = generateModePaletteV2(mode, mode === 'light' ? 97 : 7, 5);
      for (let hue = 0; hue < 360; hue += 15) {
        const a = generateChromaticAccent(p, hue);
        for (const shade of Object.values(a.shades)) {
          expect(shade.hsl.s).toBeGreaterThanOrEqual(0);
          expect(shade.hsl.s).toBeLessThanOrEqual(100);
          expect(shade.hsl.l).toBeGreaterThanOrEqual(0);
          expect(shade.hsl.l).toBeLessThanOrEqual(100);
          // CSS string must not contain saturation > 100
          const match = shade.css.hsl.match(/hsl\(\d+(?:\.\d+)? (\d+(?:\.\d+)?)% (\d+(?:\.\d+)?)%\)/);
          expect(match).not.toBeNull();
          const sStr = parseFloat(match![1]);
          const lStr = parseFloat(match![2]);
          expect(sStr).toBeGreaterThanOrEqual(0);
          expect(sStr).toBeLessThanOrEqual(100);
          expect(lStr).toBeGreaterThanOrEqual(0);
          expect(lStr).toBeLessThanOrEqual(100);
        }
      }
    }
  });
});

describe('palette-v2 accent resolution', () => {
  it('returns both neutral accents when no chromatic', () => {
    const p = generateModePaletteV2('light', 97, 3);
    const r = resolveAccents(p, null);
    expect(r.chromatic).toBeNull();
    expect(r.neutralAccents.map(t => t.name)).toEqual(['accentBase', 'accentLevel1']);
  });

  it('returns one neutral + chromatic when chromatic is set', () => {
    const p = generateModePaletteV2('light', 97, 3);
    const a = generateChromaticAccent(p, 220);
    const r = resolveAccents(p, a);
    expect(r.chromatic).toBe(a);
    expect(r.neutralAccents).toHaveLength(1);
    expect(r.neutralAccents[0].name).toBe('accentBase');
  });
});

