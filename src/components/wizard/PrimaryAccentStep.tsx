'use client';

import { HueWheel } from './HueWheel';
import type { AccentColor } from '@/types/color';

interface PrimaryAccentStepProps {
  hue: number;
  onHueChange: (hue: number) => void;
  accent: AccentColor;
  onBack: () => void;
  onNext: () => void;
}

export function PrimaryAccentStep({
  hue,
  onHueChange,
  accent,
  onBack,
  onNext,
}: PrimaryAccentStepProps) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-2">Primary Accent</h2>
        <p className="text-sm text-[var(--app-text-muted)] mb-6">
          This color will be used for call-to-action buttons, links, and key highlights
          in your project.
        </p>
      </div>

      {/* Hue Wheel */}
      <div className="flex flex-col items-center">
        <HueWheel value={hue} onChange={onHueChange} size={200} />
      </div>

      {/* Generated Shades */}
      <div>
        <h3 className="text-sm font-medium text-[var(--app-text-muted)] mb-3">
          Generated Shades
        </h3>
        <div className="flex gap-2">
          {accent.shades.map((shade) => (
            <div
              key={shade.index}
              className="w-12 h-12 rounded-lg"
              style={{ backgroundColor: shade.css.oklch }}
            />
          ))}
        </div>
        <div className="flex gap-2 mt-1">
          {accent.shades.map((shade) => (
            <div
              key={shade.index}
              className="w-12 text-center text-xs text-[var(--app-text-muted)]"
            >
              {shade.index}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <button onClick={onBack} className="btn btn-secondary">
          ← Back
        </button>
        <button onClick={onNext} className="btn btn-primary">
          Next: Secondary Accent →
        </button>
      </div>
    </div>
  );
}
