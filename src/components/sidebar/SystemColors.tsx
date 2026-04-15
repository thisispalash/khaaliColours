'use client';

import { useColorContext } from '@/hooks/useColorContext';
import { getRestrictedRange } from '@/lib/color/system-colors';
import { HueWheel } from '@/components/wizard/HueWheel';

const LABELS: Record<string, string> = {
  danger: 'Danger',
  warning: 'Warning',
  success: 'Success',
};

export function SystemColors() {
  const { systemTriangle, rotateSystem } = useColorContext();

  const colors = (['danger', 'warning', 'success'] as const).map((key) => {
    const hue = systemTriangle[key];
    const range = getRestrictedRange(hue);
    return { key, hue, range };
  });

  return (
    <div className="px-4 py-3">
      <div className="text-xs font-medium text-[var(--muted-foreground)] mb-3">System Colors</div>
      <div className="space-y-4">
        {colors.map(({ key, hue, range }) => (
          <div key={key} className="flex flex-col items-center gap-1">
            <span className="text-[10px] text-[var(--muted-foreground)]">{LABELS[key]}</span>
            <HueWheel
              value={hue}
              onChange={(newHue) => rotateSystem(key, newHue)}
              size={80}
              minHue={range.min}
              maxHue={range.max}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
