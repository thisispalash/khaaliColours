'use client';

import { useState, useMemo } from 'react';
import { useColorContext } from '@/hooks/useColorContext';
import {
  generateCssVariables,
  generateShadcnVariables,
  generateSystemCssVariables,
} from '@/lib/color/css-variables';
import { generateChromaticAccent } from '@/lib/color/palette-v2';
import type { ModePaletteV2, ChromaticAccent } from '@/lib/color/palette-v2';
import type { SystemTriangle } from '@/lib/color/system-colors';

type ExportFormat = 'css' | 'tailwind' | 'json' | 'shadcn';

interface ExportModalProps {
  onClose: () => void;
}

export function ExportModal({ onClose }: ExportModalProps) {
  const {
    lightPalette, darkPalette, scale,
    accentEnabled, accentHue,
    systemTriangle,
  } = useColorContext();

  const [format, setFormat] = useState<ExportFormat>('css');
  const [copied, setCopied] = useState(false);

  const exportCode = useMemo(() => {
    const lightChromatic = accentEnabled ? generateChromaticAccent(lightPalette, accentHue) : null;
    const darkChromatic = accentEnabled ? generateChromaticAccent(darkPalette, accentHue) : null;

    switch (format) {
      case 'css':
        return generateCssExport(lightPalette, darkPalette, lightChromatic, darkChromatic, systemTriangle);
      case 'tailwind':
        return generateTailwindExport(lightPalette, darkPalette, lightChromatic, darkChromatic, systemTriangle);
      case 'json':
        return generateJsonExport(lightPalette, darkPalette, lightChromatic, darkChromatic, systemTriangle, scale);
      case 'shadcn':
        return generateShadcnExport(lightPalette, darkPalette, lightChromatic, darkChromatic, systemTriangle);
      default:
        return '';
    }
  }, [format, lightPalette, darkPalette, accentEnabled, accentHue, systemTriangle, scale]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(exportCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const ext = format === 'json' ? 'json' : 'css';
    const blob = new Blob([exportCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `khaali-colors.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-8">
      <div className="w-full max-w-3xl max-h-[90vh] rounded-2xl flex flex-col bg-[var(--card)] border border-[var(--border)]">
        <div className="flex items-center justify-between p-6 border-b border-[var(--border)]">
          <h2 className="text-xl font-semibold">Export Color System</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[var(--muted)]">
            ✕
          </button>
        </div>

        <div className="flex gap-2 p-4 border-b border-[var(--border)]">
          {(['css', 'tailwind', 'json', 'shadcn'] as ExportFormat[]).map((f) => (
            <button
              key={f}
              onClick={() => setFormat(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                format === f
                  ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                  : 'bg-[var(--muted)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
              }`}
            >
              {f === 'css' ? 'CSS' : f === 'tailwind' ? 'Tailwind v4' : f === 'json' ? 'JSON' : 'shadcn'}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-hidden p-4">
          <pre className="h-full overflow-auto p-4 rounded-lg text-sm font-mono bg-[var(--background)] text-[var(--foreground)]">
            {exportCode}
          </pre>
        </div>

        <div className="flex justify-end gap-3 p-6 border-t border-[var(--border)]">
          <button onClick={handleDownload} className="px-4 py-2 rounded-lg border border-[var(--border)] text-sm font-medium hover:bg-[var(--muted)]">
            Download
          </button>
          <button onClick={handleCopy} className="px-4 py-2 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] text-sm font-medium">
            {copied ? '\u2713 Copied!' : 'Copy to Clipboard'}
          </button>
        </div>
      </div>
    </div>
  );
}

// --- Export generators ---

function buildVars(
  palette: ModePaletteV2,
  chromatic: ChromaticAccent | null,
  system: SystemTriangle
): Record<string, string> {
  const base = generateCssVariables(palette, chromatic);
  const systemVars = generateSystemCssVariables(system);
  return { ...base, ...systemVars };
}

function formatVarsBlock(vars: Record<string, string>, indent = '  '): string {
  return Object.entries(vars).map(([k, v]) => `${indent}${k}: ${v};`).join('\n');
}

function generateCssExport(
  light: ModePaletteV2, dark: ModePaletteV2,
  lightChromatic: ChromaticAccent | null, darkChromatic: ChromaticAccent | null,
  system: SystemTriangle
): string {
  const lightVars = buildVars(light, lightChromatic, system);
  const darkVars = buildVars(dark, darkChromatic, system);
  return `/* khaaliColors — CSS Variables (OKLCH) */\n\n:root {\n${formatVarsBlock(lightVars)}\n}\n\n.dark {\n${formatVarsBlock(darkVars)}\n}`;
}

function generateTailwindExport(
  light: ModePaletteV2, dark: ModePaletteV2,
  lightChromatic: ChromaticAccent | null, darkChromatic: ChromaticAccent | null,
  system: SystemTriangle
): string {
  const lightVars = buildVars(light, lightChromatic, system);
  const darkVars = buildVars(dark, darkChromatic, system);
  return `/* khaaliColors — Tailwind v4 */\n\n@theme {\n${formatVarsBlock(lightVars)}\n}\n\n.dark {\n${formatVarsBlock(darkVars)}\n}`;
}

function generateJsonExport(
  light: ModePaletteV2, dark: ModePaletteV2,
  lightChromatic: ChromaticAccent | null, darkChromatic: ChromaticAccent | null,
  system: SystemTriangle, scale: number
): string {
  return JSON.stringify({
    meta: { generator: 'khaaliColors', colorSpace: 'OKLCH', scale },
    light: buildVars(light, lightChromatic, system),
    dark: buildVars(dark, darkChromatic, system),
  }, null, 2);
}

function generateShadcnExport(
  light: ModePaletteV2, dark: ModePaletteV2,
  lightChromatic: ChromaticAccent | null, darkChromatic: ChromaticAccent | null,
  system: SystemTriangle
): string {
  const lightVars = generateShadcnVariables(light, lightChromatic, system);
  const darkVars = generateShadcnVariables(dark, darkChromatic, system);
  return `/* khaaliColors — shadcn/ui Compatible */\n/* Drop this into your globals.css */\n\n@layer base {\n  :root {\n${formatVarsBlock(lightVars, '    ')}\n  }\n\n  .dark {\n${formatVarsBlock(darkVars, '    ')}\n  }\n}`;
}
