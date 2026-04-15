'use client';

import { useColorContext } from '@/hooks/useColorContext';
import { HueWheel } from '@/components/wizard/HueWheel';

export function AccentSection() {
  const { accentEnabled, setAccentEnabled, accentHue, setAccentHue } = useColorContext();

  return (
    <div className="px-4 py-3">
      <label className="flex items-center gap-2 cursor-pointer mb-3">
        <input
          type="checkbox"
          checked={accentEnabled}
          onChange={(e) => setAccentEnabled(e.target.checked)}
          className="accent-[var(--primary)]"
        />
        <span className="text-xs font-medium text-[var(--muted-foreground)]">Chromatic Accent</span>
      </label>
      {accentEnabled && (
        <div className="flex justify-center">
          <HueWheel value={accentHue} onChange={setAccentHue} size={140} />
        </div>
      )}
    </div>
  );
}
