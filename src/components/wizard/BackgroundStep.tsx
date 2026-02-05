'use client';

import { useMemo, useState } from 'react';
import { getSuggestedL0Options } from '@/lib/color';
import { ColorSwatch } from '@/components/shared/ColorSwatch';

interface BackgroundStepProps {
  scale: number;
  onScaleChange: (scale: number) => void;
  lightL0: number;
  onLightL0Change: (l: number) => void;
  darkL0: number;
  onDarkL0Change: (l: number) => void;
  onNext: () => void;
}

export function BackgroundStep({
  scale,
  onScaleChange,
  lightL0,
  onLightL0Change,
  darkL0,
  onDarkL0Change,
  onNext,
}: BackgroundStepProps) {
  const [isEditingScale, setIsEditingScale] = useState(false);
  const [tempScale, setTempScale] = useState(scale.toString());
  const suggestions = useMemo(() => getSuggestedL0Options(scale, 6), [scale]);

  const handleScaleDoubleClick = () => {
    setIsEditingScale(true);
    setTempScale(scale.toString());
  };

  const handleScaleBlur = () => {
    const newScale = Math.max(1, Math.min(100, parseInt(tempScale) || 5));
    onScaleChange(newScale);
    setIsEditingScale(false);
  };

  const handleScaleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleScaleBlur();
    } else if (e.key === 'Escape') {
      setIsEditingScale(false);
      setTempScale(scale.toString());
    }
  };

  return (
    <div className="space-y-10">
      {/* Scale Selection */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Choose Your Scale</h2>
        <p className="text-sm text-[var(--app-text-muted)] mb-6">
          The scale determines the lightness steps in your color system.
        </p>

        <div className="flex items-baseline gap-3">
          {isEditingScale ? (
            <input
              type="number"
              min={1}
              max={100}
              value={tempScale}
              onChange={(e) => setTempScale(e.target.value)}
              onBlur={handleScaleBlur}
              onKeyDown={handleScaleKeyDown}
              autoFocus
              className="text-5xl font-bold w-28 text-center bg-transparent border-b-2 border-[var(--app-accent)] outline-none"
            />
          ) : (
            <span
              className="text-5xl font-bold cursor-pointer hover:text-[var(--app-accent)] transition-colors"
              onDoubleClick={handleScaleDoubleClick}
              title="Double-click to edit"
            >
              {scale}
            </span>
          )}
          <span className="text-lg text-[var(--app-text-muted)]">
            lightness step
          </span>
        </div>
      </div>

      {/* Light Mode Background */}
      <div>
        <h3 className="text-lg font-medium mb-2">Light Mode Background</h3>
        <p className="text-sm text-[var(--app-text-muted)] mb-4">
          Select the base background color for light mode.
        </p>
        <div className="flex gap-3 flex-wrap">
          {suggestions.light.map((l) => (
            <button
              key={l}
              onClick={() => onLightL0Change(l)}
              className="relative w-16 h-16 rounded-xl transition-all hover:scale-105"
              style={{
                backgroundColor: `oklch(${l}% 0 0)`,
                border:
                  lightL0 === l
                    ? '3px solid var(--app-accent)'
                    : '2px solid transparent',
                boxShadow: lightL0 === l ? '0 0 0 2px var(--app-bg)' : '0 2px 8px rgba(0,0,0,0.1)',
              }}
            >
              <span
                className="absolute bottom-1.5 left-1/2 -translate-x-1/2 text-sm font-medium"
                style={{ color: l > 50 ? 'oklch(20% 0 0)' : 'oklch(90% 0 0)' }}
              >
                {l}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Dark Mode Background */}
      <div>
        <h3 className="text-lg font-medium mb-2">Dark Mode Background</h3>
        <p className="text-sm text-[var(--app-text-muted)] mb-4">
          Select the base background color for dark mode.
        </p>
        <div className="flex gap-3 flex-wrap">
          {suggestions.dark.map((l) => (
            <button
              key={l}
              onClick={() => onDarkL0Change(l)}
              className="relative w-16 h-16 rounded-xl transition-all hover:scale-105"
              style={{
                backgroundColor: `oklch(${l}% 0 0)`,
                border:
                  darkL0 === l
                    ? '3px solid var(--app-accent)'
                    : '2px solid var(--app-border)',
                boxShadow: darkL0 === l ? '0 0 0 2px var(--app-bg)' : 'none',
              }}
            >
              <span
                className="absolute bottom-1.5 left-1/2 -translate-x-1/2 text-sm font-medium"
                style={{ color: l > 50 ? 'oklch(20% 0 0)' : 'oklch(90% 0 0)' }}
              >
                {l}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Next Button */}
      <div className="pt-4">
        <button onClick={onNext} className="btn btn-primary">
          Next: Choose Accents →
        </button>
      </div>
    </div>
  );
}
