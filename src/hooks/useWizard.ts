'use client';

import { useState, useCallback } from 'react';

export type WizardStep = 'background' | 'accent' | 'system';

const STEPS: WizardStep[] = ['background', 'accent', 'system'];

export function useWizard() {
  const [currentStep, setCurrentStep] = useState<WizardStep>('background');

  const stepIndex = STEPS.indexOf(currentStep);

  const next = useCallback(() => {
    const nextIndex = stepIndex + 1;
    if (nextIndex < STEPS.length) {
      setCurrentStep(STEPS[nextIndex]);
    }
  }, [stepIndex]);

  const back = useCallback(() => {
    const prevIndex = stepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(STEPS[prevIndex]);
    }
  }, [stepIndex]);

  const goTo = useCallback((step: WizardStep) => {
    setCurrentStep(step);
  }, []);

  const isFirst = stepIndex === 0;
  const isLast = stepIndex === STEPS.length - 1;

  return {
    currentStep,
    stepIndex,
    totalSteps: STEPS.length,
    next,
    back,
    goTo,
    isFirst,
    isLast,
    steps: STEPS,
  };
}
