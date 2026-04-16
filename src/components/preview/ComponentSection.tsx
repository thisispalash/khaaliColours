'use client';

import { type ReactNode, useCallback } from 'react';
import { useColorContext } from '@/hooks/useColorContext';
import { checkContrast } from '@/lib/color/contrast';
import type { OklchColor } from '@/types/color';

interface ComponentSectionProps {
  title: string;
  children: ReactNode;
  /** Optional foreground/background OKLCH for hover contrast. Falls back to foreground-on-card. */
  contrastPair?: { fg: OklchColor; bg: OklchColor };
}

export function ComponentSection({ title, children, contrastPair }: ComponentSectionProps) {
  const { activePalette, setHoveredContrast } = useColorContext();

  const handleMouseEnter = useCallback(() => {
    // Use explicit pair if provided, otherwise compute foreground-on-card
    const fg = contrastPair?.fg ?? activePalette.tokens.primary.oklch;
    const bg = contrastPair?.bg ?? activePalette.tokens.level1.oklch;
    setHoveredContrast(checkContrast(fg, bg));
  }, [contrastPair, activePalette, setHoveredContrast]);

  const handleMouseLeave = useCallback(() => {
    setHoveredContrast(null);
  }, [setHoveredContrast]);

  return (
    <section
      className="rounded-xl border border-[var(--border)] p-5 bg-[var(--card)] break-inside-avoid mb-5"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <h3 className="text-sm font-semibold text-[var(--foreground)] mb-4">{title}</h3>
      <div className="space-y-3">
        {children}
      </div>
    </section>
  );
}
