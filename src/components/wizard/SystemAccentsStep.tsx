'use client';

import { useState } from 'react';
import { HueWheel } from './HueWheel';
import { ColorSwatch } from '@/components/shared/ColorSwatch';
import { SYSTEM_ACCENT_DEFAULTS } from '@/lib/color';
import type { SystemAccent } from '@/types/color';

interface SystemAccentConfig {
  hue: number;
  name: string;
}

interface SystemAccentsStepProps {
  success: SystemAccentConfig;
  warning: SystemAccentConfig;
  danger: SystemAccentConfig;
  successAccent: SystemAccent;
  warningAccent: SystemAccent;
  dangerAccent: SystemAccent;
  onSuccessChange: (config: SystemAccentConfig) => void;
  onWarningChange: (config: SystemAccentConfig) => void;
  onDangerChange: (config: SystemAccentConfig) => void;
  onBack: () => void;
  onFinish: () => void;
}

export function SystemAccentsStep({
  success,
  warning,
  danger,
  successAccent,
  warningAccent,
  dangerAccent,
  onSuccessChange,
  onWarningChange,
  onDangerChange,
  onBack,
  onFinish,
}: SystemAccentsStepProps) {
  const [editingName, setEditingName] = useState<string | null>(null);

  const accents = [
    {
      key: 'success' as const,
      config: success,
      accent: successAccent,
      onChange: onSuccessChange,
      defaults: SYSTEM_ACCENT_DEFAULTS.success,
    },
    {
      key: 'warning' as const,
      config: warning,
      accent: warningAccent,
      onChange: onWarningChange,
      defaults: SYSTEM_ACCENT_DEFAULTS.warning,
    },
    {
      key: 'danger' as const,
      config: danger,
      accent: dangerAccent,
      onChange: onDangerChange,
      defaults: SYSTEM_ACCENT_DEFAULTS.danger,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">System Colors</h2>
        <p className="text-sm text-[var(--app-text-muted)] mb-4">
          Configure colors for success, warning, and danger states.
          Double-click names to customize them.
        </p>
      </div>

      <div className="space-y-6">
        {accents.map(({ key, config, accent, onChange, defaults }) => (
          <div
            key={key}
            className="p-6 rounded-xl"
            style={{ background: 'var(--app-surface)', border: '1px solid var(--app-border)' }}
          >
            {/* Editable name header */}
            <div className="mb-4">
              {editingName === key ? (
                <input
                  type="text"
                  value={config.name}
                  onChange={(e) => onChange({ ...config, name: e.target.value })}
                  onBlur={() => setEditingName(null)}
                  onKeyDown={(e) => e.key === 'Enter' && setEditingName(null)}
                  autoFocus
                  className="text-sm font-medium px-2 py-1 rounded border w-40"
                  style={{ borderColor: 'var(--app-border)' }}
                />
              ) : (
                <div
                  className="text-sm font-medium cursor-pointer hover:text-[var(--app-accent)] transition-colors inline-block"
                  onDoubleClick={() => setEditingName(key)}
                  title="Double-click to edit"
                >
                  {config.name}
                </div>
              )}
            </div>

            <div className="flex justify-between items-start gap-8">
              {/* Hue Wheel with range lock */}
              <div className="flex-shrink-0">
                <HueWheel
                  value={config.hue}
                  onChange={(hue) => onChange({ ...config, hue })}
                  size={160}
                  minHue={defaults.minHue}
                  maxHue={defaults.maxHue}
                />
              </div>

              {/* Generated Shades */}
              <div className="flex-1">
                <div className="text-xs text-[var(--app-text-muted)] mb-3">
                  Generated Shades (click to copy)
                </div>
                <div className="flex gap-2 flex-wrap">
                  {accent.shades.map((shade) => (
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
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <button onClick={onBack} className="btn btn-secondary">
          ← Back
        </button>
        <button onClick={onFinish} className="btn btn-primary">
          Finish & Export
        </button>
      </div>
    </div>
  );
}
