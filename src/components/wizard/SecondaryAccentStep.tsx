'use client';

import { useState } from 'react';
import { HueWheel } from './HueWheel';
import type { AccentColor } from '@/types/color';

interface SecondaryAccentStepProps {
  enabled: boolean;
  onEnabledChange: (enabled: boolean) => void;
  hue: number;
  onHueChange: (hue: number) => void;
  accent: AccentColor | null;
  onBack: () => void;
  onNext: () => void;
}

export function SecondaryAccentStep({
  enabled,
  onEnabledChange,
  hue,
  onHueChange,
  accent,
  onBack,
  onNext,
}: SecondaryAccentStepProps) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-2">Secondary Accent</h2>
        <p className="text-sm text-[var(--app-text-muted)] mb-6">
          Optionally add a secondary color for additional visual variety.
        </p>
      </div>

      {/* Toggle */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => onEnabledChange(!enabled)}
          className={`w-12 h-7 rounded-full transition-colors relative ${
            enabled ? 'bg-[var(--app-accent)]' : 'bg-[var(--app-border)]'
          }`}
        >
          <span
            className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-transform ${
              enabled ? 'left-6' : 'left-1'
            }`}
          />
        </button>
        <span className="text-sm">
          {enabled ? 'Secondary accent enabled' : 'No secondary accent'}
        </span>
      </div>

      {enabled && (
        <>
          {/* Hue Wheel */}
          <div className="flex flex-col items-center">
            <HueWheel value={hue} onChange={onHueChange} size={180} />
          </div>

          {/* Generated Shades */}
          {accent && (
            <div>
              <h3 className="text-sm font-medium text-[var(--app-text-muted)] mb-3">
                Generated Shades
              </h3>
              <div className="flex gap-2">
                {accent.shades.map((shade) => (
                  <div
                    key={shade.index}
                    className="w-10 h-10 rounded-lg"
                    style={{ backgroundColor: shade.css.oklch }}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}

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
