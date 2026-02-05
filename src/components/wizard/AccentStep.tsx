'use client';

import { HueWheel } from './HueWheel';
import { ColorSwatch } from '@/components/shared/ColorSwatch';
import type { AccentColor } from '@/types/color';

interface AccentStepProps {
  primaryHue: number;
  onPrimaryHueChange: (hue: number) => void;
  primaryAccent: AccentColor;
  showSecondary: boolean;
  onShowSecondaryChange: (show: boolean) => void;
  secondaryHue: number;
  onSecondaryHueChange: (hue: number) => void;
  secondaryAccent: AccentColor | null;
  onBack: () => void;
  onNext: () => void;
}

export function AccentStep({
  primaryHue,
  onPrimaryHueChange,
  primaryAccent,
  showSecondary,
  onShowSecondaryChange,
  secondaryHue,
  onSecondaryHueChange,
  secondaryAccent,
  onBack,
  onNext,
}: AccentStepProps) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-2">Accent Colors</h2>
        <p className="text-sm text-[var(--app-text-muted)] mb-6">
          Choose your primary accent color for buttons and highlights.
          Optionally add a secondary accent for additional variety.
        </p>
      </div>

      {/* Primary Accent */}
      <div
        className="p-6 rounded-xl"
        style={{ background: 'var(--app-surface)', border: '1px solid var(--app-border)' }}
      >
        <h3 className="text-sm font-medium mb-6">Primary Accent</h3>

        <div className="flex justify-between items-start gap-8">
          {/* Hue Wheel */}
          <div className="flex-shrink-0">
            <HueWheel value={primaryHue} onChange={onPrimaryHueChange} size={180} />
          </div>

          {/* Generated Shades */}
          <div className="flex-1">
            <div className="text-xs text-[var(--app-text-muted)] mb-3">
              Generated Shades (click to copy)
            </div>
            <div className="flex gap-2 flex-wrap">
              {primaryAccent.shades.map((shade) => (
                <ColorSwatch
                  key={shade.label}
                  color={shade.css.oklch}
                  label={shade.label}
                  size="lg"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Accent Toggle */}
      <div
        className="p-6 rounded-xl"
        style={{ background: 'var(--app-surface)', border: '1px solid var(--app-border)' }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium">Secondary Accent</h3>
          <button
            onClick={() => onShowSecondaryChange(!showSecondary)}
            className={`w-12 h-7 rounded-full transition-colors relative ${
              showSecondary ? 'bg-[var(--app-accent)]' : 'bg-[var(--app-border)]'
            }`}
          >
            <span
              className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-transform ${
                showSecondary ? 'left-6' : 'left-1'
              }`}
            />
          </button>
        </div>

        {showSecondary && secondaryAccent ? (
          <div className="flex justify-between items-start gap-8">
            {/* Hue Wheel */}
            <div className="flex-shrink-0">
              <HueWheel value={secondaryHue} onChange={onSecondaryHueChange} size={180} />
            </div>

            {/* Generated Shades */}
            <div className="flex-1">
              <div className="text-xs text-[var(--app-text-muted)] mb-3">
                Generated Shades (click to copy)
              </div>
              <div className="flex gap-2 flex-wrap">
                {secondaryAccent.shades.map((shade) => (
                  <ColorSwatch
                    key={shade.label}
                    color={shade.css.oklch}
                    label={shade.label}
                    size="lg"
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-[var(--app-text-muted)]">
            Enable to add a secondary accent color for additional visual variety.
          </p>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <button onClick={onBack} className="btn btn-secondary">
          ← Back
        </button>
        <button onClick={onNext} className="btn btn-primary">
          Next: System Colors →
        </button>
      </div>
    </div>
  );
}
