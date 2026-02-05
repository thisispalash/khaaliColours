'use client';

import { useState, useMemo } from 'react';
import type { ModePalette, AccentColor, SystemAccent } from '@/types/color';

interface ExportModalProps {
  lightPalette: ModePalette;
  darkPalette: ModePalette;
  primaryAccent: AccentColor | null;
  secondaryAccent: AccentColor | null;
  successAccent: SystemAccent;
  warningAccent: SystemAccent;
  dangerAccent: SystemAccent;
  scale: number;
  onClose: () => void;
}

type ExportFormat = 'css' | 'tailwind' | 'json';

export function ExportModal({
  lightPalette,
  darkPalette,
  primaryAccent,
  secondaryAccent,
  successAccent,
  warningAccent,
  dangerAccent,
  scale,
  onClose,
}: ExportModalProps) {
  const [format, setFormat] = useState<ExportFormat>('css');
  const [copied, setCopied] = useState(false);

  const exportCode = useMemo(() => {
    switch (format) {
      case 'css':
        return generateCssVariables(lightPalette, darkPalette, primaryAccent, secondaryAccent, successAccent, warningAccent, dangerAccent);
      case 'tailwind':
        return generateTailwindConfig(lightPalette, darkPalette, primaryAccent, secondaryAccent, successAccent, warningAccent, dangerAccent);
      case 'json':
        return generateJsonExport(lightPalette, darkPalette, primaryAccent, secondaryAccent, successAccent, warningAccent, dangerAccent, scale);
      default:
        return '';
    }
  }, [format, lightPalette, darkPalette, primaryAccent, secondaryAccent, successAccent, warningAccent, dangerAccent, scale]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(exportCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleDownload = () => {
    const extension = format === 'json' ? 'json' : format === 'tailwind' ? 'js' : 'css';
    const mimeType = format === 'json' ? 'application/json' : 'text/plain';
    const blob = new Blob([exportCode], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `khaali-colours.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-8">
      <div
        className="w-full max-w-3xl max-h-[90vh] rounded-2xl flex flex-col"
        style={{ background: 'var(--app-surface)', border: '1px solid var(--app-border)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'var(--app-border)' }}>
          <h2 className="text-xl font-semibold">Export Color System</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[var(--app-bg)] transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Format Tabs */}
        <div className="flex gap-2 p-4 border-b" style={{ borderColor: 'var(--app-border)' }}>
          {(['css', 'tailwind', 'json'] as ExportFormat[]).map((f) => (
            <button
              key={f}
              onClick={() => setFormat(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                format === f
                  ? 'bg-[var(--app-accent)] text-white'
                  : 'bg-[var(--app-bg)] text-[var(--app-text-muted)] hover:text-[var(--app-text)]'
              }`}
            >
              {f === 'css' ? 'CSS Variables' : f === 'tailwind' ? 'Tailwind v4' : 'JSON'}
            </button>
          ))}
        </div>

        {/* Code Preview */}
        <div className="flex-1 overflow-hidden p-4">
          <pre
            className="h-full overflow-auto p-4 rounded-lg text-sm font-mono"
            style={{ background: 'var(--app-bg)', color: 'var(--app-text)' }}
          >
            {exportCode}
          </pre>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 p-6 border-t" style={{ borderColor: 'var(--app-border)' }}>
          <button onClick={handleDownload} className="btn btn-secondary">
            Download
          </button>
          <button onClick={handleCopy} className="btn btn-primary">
            {copied ? '✓ Copied!' : 'Copy to Clipboard'}
          </button>
        </div>
      </div>
    </div>
  );
}

function generateCssVariables(
  light: ModePalette,
  dark: ModePalette,
  primary: AccentColor | null,
  secondary: AccentColor | null,
  success: SystemAccent,
  warning: SystemAccent,
  danger: SystemAccent
): string {
  const lines: string[] = ['/* Khaali Colours - CSS Variables */', '/* Generated with OKLCH color space */', ''];

  // Light mode
  lines.push(':root {');
  lines.push('  /* Background Levels */');
  lines.push(`  --color-bg: ${light.levels.l0.css.oklch};`);
  lines.push(`  --color-surface: ${light.levels.l1.css.oklch};`);
  lines.push(`  --color-elevated: ${light.levels.l2.css.oklch};`);
  lines.push(`  --color-muted: ${light.levels.muted.css.oklch};`);
  lines.push('');
  lines.push('  /* Text Colors */');
  lines.push(`  --color-text-primary: ${light.text.primary.css.oklch};`);
  lines.push(`  --color-text-secondary: ${light.text.secondary.css.oklch};`);
  lines.push(`  --color-text-muted: ${light.text.muted.css.oklch};`);

  if (primary) {
    lines.push('');
    lines.push('  /* Primary Accent */');
    primary.shades.forEach(s => {
      lines.push(`  --color-primary-${s.label}: ${s.css.oklch};`);
    });
  }

  if (secondary) {
    lines.push('');
    lines.push('  /* Secondary Accent */');
    secondary.shades.forEach(s => {
      lines.push(`  --color-secondary-${s.label}: ${s.css.oklch};`);
    });
  }

  lines.push('');
  lines.push('  /* System Colors */');
  success.shades.forEach(s => {
    lines.push(`  --color-success-${s.label}: ${s.css.oklch};`);
  });
  warning.shades.forEach(s => {
    lines.push(`  --color-warning-${s.label}: ${s.css.oklch};`);
  });
  danger.shades.forEach(s => {
    lines.push(`  --color-danger-${s.label}: ${s.css.oklch};`);
  });

  lines.push('}');
  lines.push('');

  // Dark mode
  lines.push('.dark, [data-theme="dark"] {');
  lines.push('  /* Background Levels */');
  lines.push(`  --color-bg: ${dark.levels.l0.css.oklch};`);
  lines.push(`  --color-surface: ${dark.levels.l1.css.oklch};`);
  lines.push(`  --color-elevated: ${dark.levels.l2.css.oklch};`);
  lines.push(`  --color-muted: ${dark.levels.muted.css.oklch};`);
  lines.push('');
  lines.push('  /* Text Colors */');
  lines.push(`  --color-text-primary: ${dark.text.primary.css.oklch};`);
  lines.push(`  --color-text-secondary: ${dark.text.secondary.css.oklch};`);
  lines.push(`  --color-text-muted: ${dark.text.muted.css.oklch};`);
  lines.push('}');

  return lines.join('\n');
}

function generateTailwindConfig(
  light: ModePalette,
  dark: ModePalette,
  primary: AccentColor | null,
  secondary: AccentColor | null,
  success: SystemAccent,
  warning: SystemAccent,
  danger: SystemAccent
): string {
  const lines: string[] = [
    '/* Khaali Colours - Tailwind v4 CSS */',
    '/* Add this to your main CSS file */',
    '',
    '@theme {',
    '  /* Background Colors */',
    `  --color-bg: ${light.levels.l0.css.oklch};`,
    `  --color-surface: ${light.levels.l1.css.oklch};`,
    `  --color-elevated: ${light.levels.l2.css.oklch};`,
    `  --color-muted: ${light.levels.muted.css.oklch};`,
    '',
    '  /* Text Colors */',
    `  --color-text-primary: ${light.text.primary.css.oklch};`,
    `  --color-text-secondary: ${light.text.secondary.css.oklch};`,
    `  --color-text-muted: ${light.text.muted.css.oklch};`,
  ];

  if (primary) {
    lines.push('');
    lines.push('  /* Primary Accent */');
    primary.shades.forEach(s => {
      lines.push(`  --color-primary-${s.label}: ${s.css.oklch};`);
    });
  }

  if (secondary) {
    lines.push('');
    lines.push('  /* Secondary Accent */');
    secondary.shades.forEach(s => {
      lines.push(`  --color-secondary-${s.label}: ${s.css.oklch};`);
    });
  }

  lines.push('');
  lines.push('  /* System Colors */');
  success.shades.forEach(s => {
    lines.push(`  --color-success-${s.label}: ${s.css.oklch};`);
  });
  warning.shades.forEach(s => {
    lines.push(`  --color-warning-${s.label}: ${s.css.oklch};`);
  });
  danger.shades.forEach(s => {
    lines.push(`  --color-danger-${s.label}: ${s.css.oklch};`);
  });

  lines.push('}');
  lines.push('');
  lines.push('/* Dark mode overrides */');
  lines.push('.dark {');
  lines.push(`  --color-bg: ${dark.levels.l0.css.oklch};`);
  lines.push(`  --color-surface: ${dark.levels.l1.css.oklch};`);
  lines.push(`  --color-elevated: ${dark.levels.l2.css.oklch};`);
  lines.push(`  --color-muted: ${dark.levels.muted.css.oklch};`);
  lines.push(`  --color-text-primary: ${dark.text.primary.css.oklch};`);
  lines.push(`  --color-text-secondary: ${dark.text.secondary.css.oklch};`);
  lines.push(`  --color-text-muted: ${dark.text.muted.css.oklch};`);
  lines.push('}');

  return lines.join('\n');
}

function generateJsonExport(
  light: ModePalette,
  dark: ModePalette,
  primary: AccentColor | null,
  secondary: AccentColor | null,
  success: SystemAccent,
  warning: SystemAccent,
  danger: SystemAccent,
  scale: number
): string {
  const data = {
    meta: {
      generator: 'Khaali Colours',
      colorSpace: 'OKLCH',
      scale,
    },
    light: {
      levels: {
        bg: light.levels.l0.css.oklch,
        surface: light.levels.l1.css.oklch,
        elevated: light.levels.l2.css.oklch,
        muted: light.levels.muted.css.oklch,
      },
      text: {
        primary: light.text.primary.css.oklch,
        secondary: light.text.secondary.css.oklch,
        muted: light.text.muted.css.oklch,
      },
    },
    dark: {
      levels: {
        bg: dark.levels.l0.css.oklch,
        surface: dark.levels.l1.css.oklch,
        elevated: dark.levels.l2.css.oklch,
        muted: dark.levels.muted.css.oklch,
      },
      text: {
        primary: dark.text.primary.css.oklch,
        secondary: dark.text.secondary.css.oklch,
        muted: dark.text.muted.css.oklch,
      },
    },
    accents: {
      primary: primary ? Object.fromEntries(primary.shades.map(s => [s.label, s.css.oklch])) : null,
      secondary: secondary ? Object.fromEntries(secondary.shades.map(s => [s.label, s.css.oklch])) : null,
    },
    system: {
      success: Object.fromEntries(success.shades.map(s => [s.label, s.css.oklch])),
      warning: Object.fromEntries(warning.shades.map(s => [s.label, s.css.oklch])),
      danger: Object.fromEntries(danger.shades.map(s => [s.label, s.css.oklch])),
    },
  };

  return JSON.stringify(data, null, 2);
}
