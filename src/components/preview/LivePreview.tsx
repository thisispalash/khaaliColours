'use client';

import type { ModePalette, AccentColor, SystemAccent, ContrastResult } from '@/types/color';
import type { WizardStep } from '@/hooks/useWizard';
import { formatContrastRatio } from '@/lib/color';

interface LivePreviewProps {
  lightPalette: ModePalette;
  darkPalette: ModePalette;
  primaryAccent: AccentColor | null;
  secondaryAccent: AccentColor | null;
  successAccent: SystemAccent;
  warningAccent: SystemAccent;
  dangerAccent: SystemAccent;
  lightContrast: ContrastResult;
  darkContrast: ContrastResult;
  currentStep?: WizardStep;
}

export function LivePreview({
  lightPalette,
  darkPalette,
  primaryAccent,
  secondaryAccent,
  successAccent,
  warningAccent,
  dangerAccent,
  lightContrast,
  darkContrast,
  currentStep = 'system',
}: LivePreviewProps) {
  const showAccents = currentStep === 'accent' || currentStep === 'system';
  const showSystemAccents = currentStep === 'system';

  return (
    <div className="h-full flex flex-col gap-4">
      {/* Light Mode Preview */}
      <PreviewCard
        mode="Light"
        palette={lightPalette}
        primaryAccent={showAccents ? primaryAccent : null}
        secondaryAccent={showAccents ? secondaryAccent : null}
        successAccent={showSystemAccents ? successAccent : null}
        warningAccent={showSystemAccents ? warningAccent : null}
        dangerAccent={showSystemAccents ? dangerAccent : null}
      />

      {/* Dark Mode Preview */}
      <PreviewCard
        mode="Dark"
        palette={darkPalette}
        primaryAccent={showAccents ? primaryAccent : null}
        secondaryAccent={showAccents ? secondaryAccent : null}
        successAccent={showSystemAccents ? successAccent : null}
        warningAccent={showSystemAccents ? warningAccent : null}
        dangerAccent={showSystemAccents ? dangerAccent : null}
      />

      {/* WCAG Indicator */}
      <div
        className="p-4 rounded-xl"
        style={{ background: 'var(--app-bg)', border: '1px solid var(--app-border)' }}
      >
        <div className="text-xs font-medium text-[var(--app-text-muted)] mb-3">
          WCAG Contrast
        </div>
        <div className="flex gap-6">
          <ContrastBadge label="Light" result={lightContrast} />
          <ContrastBadge label="Dark" result={darkContrast} />
        </div>
      </div>
    </div>
  );
}

interface PreviewCardProps {
  mode: 'Light' | 'Dark';
  palette: ModePalette;
  primaryAccent: AccentColor | null;
  secondaryAccent: AccentColor | null;
  successAccent: SystemAccent | null;
  warningAccent: SystemAccent | null;
  dangerAccent: SystemAccent | null;
}

function PreviewCard({
  mode,
  palette,
  primaryAccent,
  secondaryAccent,
  successAccent,
  warningAccent,
  dangerAccent,
}: PreviewCardProps) {
  const { levels, text } = palette;
  const isDark = mode === 'Dark';

  // Get button colors
  const buttonBg = primaryAccent?.shades.find(s => s.label === 'base')?.css.oklch ?? levels.muted.css.oklch;
  const buttonText = primaryAccent?.shades.find(s => s.label === 'darkest')?.css.oklch ?? (isDark ? 'oklch(10% 0 0)' : 'oklch(100% 0 0)');
  const secondaryButtonBg = secondaryAccent?.shades.find(s => s.label === 'base')?.css.oklch;
  const secondaryButtonText = secondaryAccent?.shades.find(s => s.label === 'darkest')?.css.oklch;

  return (
    <div
      className="flex-1 rounded-xl p-4 flex flex-col"
      style={{ backgroundColor: levels.l0.css.oklch }}
    >
      {/* Mode label */}
      <div className="text-[10px] font-medium mb-2 opacity-50" style={{ color: text.muted.css.oklch }}>
        {mode} Mode
      </div>

      {/* Main content - landscape layout */}
      <div className="flex-1 flex gap-3">
        {/* Left: Widget/Card */}
        <div
          className="flex-1 rounded-lg p-3 flex flex-col"
          style={{
            backgroundColor: levels.l1.css.oklch,
            border: isDark ? `1px solid ${levels.l2.css.oklch}` : 'none',
          }}
        >
          {/* Muted square */}
          <div
            className="w-10 h-10 rounded-lg mb-3"
            style={{ backgroundColor: levels.muted.css.oklch }}
          />

          {/* Text hierarchy on card */}
          <div className="space-y-1 mb-3">
            <p className="text-sm font-semibold" style={{ color: text.primary.css.oklch }}>
              Primary
            </p>
            <p className="text-xs" style={{ color: text.secondary.css.oklch }}>
              Secondary
            </p>
            <p className="text-[10px]" style={{ color: text.muted.css.oklch }}>
              Muted
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-2 mt-auto">
            <button
              className="px-3 py-1.5 rounded-lg text-[10px] font-medium"
              style={{ backgroundColor: buttonBg, color: buttonText }}
            >
              Primary
            </button>
            {secondaryAccent && secondaryButtonBg && (
              <button
                className="px-3 py-1.5 rounded-lg text-[10px] font-medium"
                style={{ backgroundColor: secondaryButtonBg, color: secondaryButtonText }}
              >
                Secondary
              </button>
            )}
          </div>
        </div>

        {/* Right: Background area with text + toasts */}
        <div className="flex-1 flex flex-col">
          {/* Text on background */}
          <div className="space-y-1 mb-3">
            <p className="text-sm font-semibold" style={{ color: text.primary.css.oklch }}>
              Primary
            </p>
            <p className="text-xs" style={{ color: text.secondary.css.oklch }}>
              Secondary
            </p>
            <p className="text-[10px]" style={{ color: text.muted.css.oklch }}>
              Muted
            </p>
          </div>

          {/* Toasts area */}
          {(successAccent || warningAccent || dangerAccent) && (
            <div className="mt-auto space-y-1.5">
              {successAccent && (
                <Toast accent={successAccent} label={successAccent.semanticName} isDark={isDark} />
              )}
              {warningAccent && (
                <Toast accent={warningAccent} label={warningAccent.semanticName} isDark={isDark} />
              )}
              {dangerAccent && (
                <Toast accent={dangerAccent} label={dangerAccent.semanticName} isDark={isDark} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface ToastProps {
  accent: SystemAccent;
  label: string;
  isDark: boolean;
}

function Toast({ accent, label, isDark }: ToastProps) {
  const bgShade = accent.shades.find(s => s.label === 'bg');
  const textShade = accent.shades.find(s => s.label === 'text');
  const baseShade = accent.shades.find(s => s.label === 'base');
  const darkShade = accent.shades.find(s => s.label === 'dark');

  // For dark mode, invert the background
  const bg = isDark ? darkShade?.css.oklch : bgShade?.css.oklch;
  const textColor = isDark ? bgShade?.css.oklch : textShade?.css.oklch;
  const borderColor = isDark ? baseShade?.css.oklch : darkShade?.css.oklch;

  return (
    <div
      className="px-2 py-1 rounded text-[9px] font-medium flex items-center gap-1.5"
      style={{
        backgroundColor: bg,
        color: textColor,
        borderLeft: `2px solid ${borderColor}`,
      }}
    >
      <span
        className="w-2 h-2 rounded-full"
        style={{ backgroundColor: baseShade?.css.oklch }}
      />
      {label}
    </div>
  );
}

interface ContrastBadgeProps {
  label: string;
  result: ContrastResult;
}

function ContrastBadge({ label, result }: ContrastBadgeProps) {
  const level = result.passesAAA ? 'AAA' : result.passesAA ? 'AA' : 'Fail';
  const color = result.passesAA ? 'oklch(65% 0.15 145)' : 'oklch(60% 0.2 25)';

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-[var(--app-text-muted)]">{label}</span>
      <span className="text-xs font-medium" style={{ color }}>
        {result.passesAA ? '✓' : '✗'} {formatContrastRatio(result.ratio)}
      </span>
      <span
        className="text-[9px] px-1.5 py-0.5 rounded font-medium"
        style={{ backgroundColor: color, color: 'oklch(10% 0 0)' }}
      >
        {level}
      </span>
    </div>
  );
}
