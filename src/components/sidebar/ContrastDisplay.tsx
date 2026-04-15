'use client';

import { useColorContext } from '@/hooks/useColorContext';
import { checkContrast } from '@/lib/color/contrast';

export function ContrastDisplay() {
  const { hoveredContrast, activePalette } = useColorContext();

  const defaultContrast = checkContrast(
    activePalette.tokens.primary.oklch,
    activePalette.tokens.base.oklch
  );

  const contrast = hoveredContrast ?? defaultContrast;
  const level = contrast.passesAAA ? 'AAA' : contrast.passesAA ? 'AA' : 'Fail';
  const levelColor = contrast.passesAA ? 'var(--color-success-base, oklch(65% 0.15 145))' : 'var(--color-danger-base, oklch(60% 0.2 25))';

  return (
    <div className="px-4 py-3">
      <div className="text-xs font-medium text-[var(--muted-foreground)] mb-1">Contrast Ratio</div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-[var(--foreground)]">{contrast.ratio.toFixed(2)}</span>
        <span className="text-xs font-semibold px-1.5 py-0.5 rounded" style={{ backgroundColor: levelColor, color: 'oklch(10% 0 0)' }}>{level}</span>
      </div>
      <div className="text-[10px] text-[var(--muted-foreground)] mt-1">
        {hoveredContrast ? 'Hovered element' : 'Text on background'}
      </div>
    </div>
  );
}
