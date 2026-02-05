'use client';

import { useState, useMemo } from 'react';
import { useWizard, type WizardStep } from '@/hooks/useWizard';
import { BackgroundStep } from '@/components/wizard/BackgroundStep';
import { AccentStep } from '@/components/wizard/AccentStep';
import { SystemAccentsStep } from '@/components/wizard/SystemAccentsStep';
import { LivePreview } from '@/components/preview/LivePreview';
import { ExportModal } from '@/components/export/ExportModal';
import {
  generateModePalette,
  createAccentColor,
  createSystemAccent,
  checkContrast,
} from '@/lib/color';

const STEP_LABELS: Record<WizardStep, string> = {
  background: 'Background',
  accent: 'Accents',
  system: 'System Colors',
};

export default function Home() {
  const wizard = useWizard();
  const [showExport, setShowExport] = useState(false);

  // State
  const [scale, setScale] = useState(5);
  const [lightL0, setLightL0] = useState(100);
  const [darkL0, setDarkL0] = useState(0);
  const [primaryHue, setPrimaryHue] = useState(220);
  const [showSecondary, setShowSecondary] = useState(false);
  const [secondaryHue, setSecondaryHue] = useState(150);
  const [systemAccents, setSystemAccents] = useState({
    success: { hue: 145, name: 'success' },
    warning: { hue: 85, name: 'warning' },
    danger: { hue: 25, name: 'danger' },
  });

  // Generate palettes
  const lightPalette = useMemo(
    () => generateModePalette('light', lightL0, scale),
    [lightL0, scale]
  );

  const darkPalette = useMemo(
    () => generateModePalette('dark', darkL0, scale, lightPalette.levels),
    [darkL0, scale, lightPalette.levels]
  );

  const lightPaletteWithText = useMemo(
    () => generateModePalette('light', lightL0, scale, darkPalette.levels),
    [lightL0, scale, darkPalette.levels]
  );

  const primaryAccent = useMemo(
    () => createAccentColor('primary', primaryHue),
    [primaryHue]
  );

  const secondaryAccent = useMemo(
    () => (showSecondary ? createAccentColor('secondary', secondaryHue) : null),
    [showSecondary, secondaryHue]
  );

  const successAccent = useMemo(
    () => createSystemAccent('success', systemAccents.success.hue, systemAccents.success.name),
    [systemAccents.success]
  );

  const warningAccent = useMemo(
    () => createSystemAccent('warning', systemAccents.warning.hue, systemAccents.warning.name),
    [systemAccents.warning]
  );

  const dangerAccent = useMemo(
    () => createSystemAccent('danger', systemAccents.danger.hue, systemAccents.danger.name),
    [systemAccents.danger]
  );

  // Contrast checks
  const lightContrast = useMemo(
    () => checkContrast(lightPaletteWithText.text.primary.oklch, lightPaletteWithText.levels.l0.oklch),
    [lightPaletteWithText]
  );

  const darkContrast = useMemo(
    () => checkContrast(darkPalette.text.primary.oklch, darkPalette.levels.l0.oklch),
    [darkPalette]
  );

  const handleFinish = () => {
    setShowExport(true);
  };

  return (
    <div className="h-screen flex bg-[var(--app-bg)]">
      {/* Left Panel - Wizard (60%) */}
      <div className="w-[60%] flex flex-col border-r" style={{ borderColor: 'var(--app-border)' }}>
        {/* Header */}
        <header className="px-8 py-6 border-b" style={{ borderColor: 'var(--app-border)' }}>
          <h1 className="text-2xl font-bold">Khaali Colours</h1>
          <p className="text-sm text-[var(--app-text-muted)]">
            OKLCH Color System Generator
          </p>
        </header>

        {/* Step Indicators - Horizontal */}
        <nav className="px-8 py-4 border-b" style={{ borderColor: 'var(--app-border)' }}>
          <div className="flex gap-3 max-w-2xl mx-auto">
            {wizard.steps.map((step, index) => {
              const isActive = wizard.currentStep === step;
              const isCompleted = index < wizard.stepIndex;

              return (
                <button
                  key={step}
                  onClick={() => wizard.goTo(step)}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-[var(--app-accent)] text-white'
                      : isCompleted
                      ? 'bg-[var(--app-surface)] text-[var(--app-text)]'
                      : 'bg-[var(--app-surface)] text-[var(--app-text-muted)]'
                  }`}
                  style={{ border: isActive ? 'none' : '1px solid var(--app-border)' }}
                >
                  <span
                    className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-medium ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : isCompleted
                        ? 'bg-[var(--app-accent)] text-white'
                        : 'bg-[var(--app-border)] text-[var(--app-text-muted)]'
                    }`}
                  >
                    {isCompleted ? '✓' : index + 1}
                  </span>
                  <span className="text-sm font-medium">{STEP_LABELS[step]}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Step Content - Centered */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-2xl mx-auto px-8 py-8">
            {wizard.currentStep === 'background' && (
              <BackgroundStep
                scale={scale}
                onScaleChange={setScale}
                lightL0={lightL0}
                onLightL0Change={setLightL0}
                darkL0={darkL0}
                onDarkL0Change={setDarkL0}
                onNext={wizard.next}
              />
            )}

            {wizard.currentStep === 'accent' && (
              <AccentStep
                primaryHue={primaryHue}
                onPrimaryHueChange={setPrimaryHue}
                primaryAccent={primaryAccent}
                showSecondary={showSecondary}
                onShowSecondaryChange={setShowSecondary}
                secondaryHue={secondaryHue}
                onSecondaryHueChange={setSecondaryHue}
                secondaryAccent={secondaryAccent}
                onBack={wizard.back}
                onNext={wizard.next}
              />
            )}

            {wizard.currentStep === 'system' && (
              <SystemAccentsStep
                success={systemAccents.success}
                warning={systemAccents.warning}
                danger={systemAccents.danger}
                successAccent={successAccent}
                warningAccent={warningAccent}
                dangerAccent={dangerAccent}
                onSuccessChange={(config) =>
                  setSystemAccents((s) => ({ ...s, success: config }))
                }
                onWarningChange={(config) =>
                  setSystemAccents((s) => ({ ...s, warning: config }))
                }
                onDangerChange={(config) =>
                  setSystemAccents((s) => ({ ...s, danger: config }))
                }
                onBack={wizard.back}
                onFinish={handleFinish}
              />
            )}
          </div>
        </div>
      </div>

      {/* Right Panel - Live Preview (40%) */}
      <div className="w-[40%] p-6" style={{ background: 'var(--app-surface)' }}>
        <LivePreview
          lightPalette={lightPaletteWithText}
          darkPalette={darkPalette}
          primaryAccent={primaryAccent}
          secondaryAccent={secondaryAccent}
          successAccent={successAccent}
          warningAccent={warningAccent}
          dangerAccent={dangerAccent}
          lightContrast={lightContrast}
          darkContrast={darkContrast}
          currentStep={wizard.currentStep}
        />
      </div>

      {/* Export Modal */}
      {showExport && (
        <ExportModal
          lightPalette={lightPaletteWithText}
          darkPalette={darkPalette}
          primaryAccent={primaryAccent}
          secondaryAccent={secondaryAccent}
          successAccent={successAccent}
          warningAccent={warningAccent}
          dangerAccent={dangerAccent}
          scale={scale}
          onClose={() => setShowExport(false)}
        />
      )}
    </div>
  );
}
