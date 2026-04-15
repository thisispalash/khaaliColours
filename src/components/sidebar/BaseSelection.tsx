'use client';

import { useMemo } from 'react';
import { useColorContext } from '@/hooks/useColorContext';
import { getSuggestedL0Options } from '@/lib/color/palette-v2';

export function BaseSelection() {
  const { scale, lightL0, setLightL0, darkL0, setDarkL0 } = useColorContext();
  const suggestions = useMemo(() => getSuggestedL0Options(scale, 5), [scale]);

  return (
    <div className="px-4 py-3 space-y-3">
      <div>
        <div className="text-xs font-medium text-[var(--muted-foreground)] mb-2">Light Base</div>
        <div className="flex gap-1.5">
          {suggestions.light.map((l) => (
            <button
              key={l}
              onClick={() => setLightL0(l)}
              className="relative w-10 h-10 rounded-lg transition-all hover:scale-110"
              style={{
                backgroundColor: `oklch(${l}% 0 0)`,
                border: lightL0 === l ? '2px solid var(--primary)' : '1px solid var(--border)',
              }}
            >
              <span
                className="absolute inset-0 flex items-center justify-center text-[9px] font-medium"
                style={{ color: l > 50 ? 'oklch(20% 0 0)' : 'oklch(90% 0 0)' }}
              >
                {l}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div>
        <div className="text-xs font-medium text-[var(--muted-foreground)] mb-2">Dark Base</div>
        <div className="flex gap-1.5">
          {suggestions.dark.map((l) => (
            <button
              key={l}
              onClick={() => setDarkL0(l)}
              className="relative w-10 h-10 rounded-lg transition-all hover:scale-110"
              style={{
                backgroundColor: `oklch(${l}% 0 0)`,
                border: darkL0 === l ? '2px solid var(--primary)' : '1px solid var(--border)',
              }}
            >
              <span
                className="absolute inset-0 flex items-center justify-center text-[9px] font-medium"
                style={{ color: l > 50 ? 'oklch(20% 0 0)' : 'oklch(90% 0 0)' }}
              >
                {l}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
