'use client';

import { useColorContext } from '@/hooks/useColorContext';
import { SCALE_MIN, SCALE_MAX } from '@/lib/color/palette-v2';

export function ScaleSlider() {
  const { scale, setScale } = useColorContext();

  return (
    <div className="px-4 py-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-[var(--muted-foreground)]">Scale</span>
        <span className="text-sm font-bold text-[var(--foreground)]">{scale}</span>
      </div>
      <input
        type="range"
        min={SCALE_MIN}
        max={SCALE_MAX}
        step={1}
        value={scale}
        onChange={(e) => setScale(Number(e.target.value))}
        className="w-full accent-[var(--primary)]"
      />
      <div className="flex justify-between text-[10px] text-[var(--muted-foreground)] mt-1">
        <span>{SCALE_MIN}</span>
        <span>{SCALE_MAX}</span>
      </div>
    </div>
  );
}
