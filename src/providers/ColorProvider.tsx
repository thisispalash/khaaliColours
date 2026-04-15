'use client';

import {
  createContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react';
import {
  generateModePaletteV2,
  generateChromaticAccent,
  resolveAccents,
  clampScale,
  type ModePaletteV2,
  type ChromaticAccent,
  type ResolvedAccents,
} from '@/lib/color/palette-v2';
import {
  createSystemTriangle,
  rotateTriangle,
  type SystemTriangle,
  type SystemColorKey,
} from '@/lib/color/system-colors';
import {
  generateCssVariables,
  generateShadcnVariables,
  generateSystemCssVariables,
} from '@/lib/color/css-variables';
import { createSystemAccent } from '@/lib/color/accents';
import type { ContrastResult, SystemAccent } from '@/types/color';

interface ColorContextValue {
  // User inputs
  scale: number;
  setScale: (s: number) => void;
  theme: 'light' | 'dark';
  setTheme: (t: 'light' | 'dark') => void;
  toggleTheme: () => void;
  lightL0: number;
  setLightL0: (l: number) => void;
  darkL0: number;
  setDarkL0: (l: number) => void;
  accentEnabled: boolean;
  setAccentEnabled: (b: boolean) => void;
  accentHue: number;
  setAccentHue: (h: number) => void;
  systemTriangle: SystemTriangle;
  rotateSystem: (key: SystemColorKey, newHue: number) => void;

  // Hover contrast
  hoveredContrast: ContrastResult | null;
  setHoveredContrast: (r: ContrastResult | null) => void;

  // Computed
  lightPalette: ModePaletteV2;
  darkPalette: ModePaletteV2;
  activePalette: ModePaletteV2;
  chromaticAccent: ChromaticAccent | null;
  lightAccents: ResolvedAccents;
  darkAccents: ResolvedAccents;
  systemAccents: { success: SystemAccent; warning: SystemAccent; danger: SystemAccent };
  cssVariables: Record<string, string>;
}

const ColorContext = createContext<ColorContextValue | null>(null);

function ColorProvider({ children }: { children: ReactNode }) {
  const [scale, setScaleRaw] = useState(5);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [lightL0, setLightL0] = useState(97);
  const [darkL0, setDarkL0] = useState(7);
  const [accentEnabled, setAccentEnabled] = useState(false);
  const [accentHue, setAccentHue] = useState(220);
  const [systemTriangle, setSystemTriangle] = useState<SystemTriangle>(createSystemTriangle());
  const [hoveredContrast, setHoveredContrast] = useState<ContrastResult | null>(null);

  const setScale = useCallback((s: number) => setScaleRaw(clampScale(s)), []);
  const toggleTheme = useCallback(() => setTheme(t => t === 'light' ? 'dark' : 'light'), []);
  const rotateSystem = useCallback(
    (key: SystemColorKey, newHue: number) => {
      setSystemTriangle(prev => rotateTriangle(prev, key, newHue));
    },
    []
  );

  const lightPalette = useMemo(
    () => generateModePaletteV2('light', lightL0, scale),
    [lightL0, scale]
  );
  const darkPalette = useMemo(
    () => generateModePaletteV2('dark', darkL0, scale),
    [darkL0, scale]
  );
  const activePalette = theme === 'light' ? lightPalette : darkPalette;

  const chromaticAccent = useMemo(
    () => accentEnabled ? generateChromaticAccent(activePalette, accentHue) : null,
    [accentEnabled, activePalette, accentHue]
  );

  const lightAccents = useMemo(
    () => resolveAccents(lightPalette, accentEnabled ? generateChromaticAccent(lightPalette, accentHue) : null),
    [lightPalette, accentEnabled, accentHue]
  );
  const darkAccents = useMemo(
    () => resolveAccents(darkPalette, accentEnabled ? generateChromaticAccent(darkPalette, accentHue) : null),
    [darkPalette, accentEnabled, accentHue]
  );

  const systemAccents = useMemo(() => ({
    success: createSystemAccent('success', systemTriangle.success),
    warning: createSystemAccent('warning', systemTriangle.warning),
    danger: createSystemAccent('danger', systemTriangle.danger),
  }), [systemTriangle]);

  const cssVariables = useMemo(() => {
    const base = generateCssVariables(activePalette, chromaticAccent);
    const shadcn = generateShadcnVariables(activePalette, chromaticAccent, systemTriangle);
    const system = generateSystemCssVariables(systemTriangle);
    return { ...base, ...shadcn, ...system };
  }, [activePalette, chromaticAccent, systemTriangle]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.classList.toggle('light', theme === 'light');

    for (const [key, value] of Object.entries(cssVariables)) {
      root.style.setProperty(key, value);
    }

    return () => {
      for (const key of Object.keys(cssVariables)) {
        root.style.removeProperty(key);
      }
    };
  }, [theme, cssVariables]);

  const value: ColorContextValue = {
    scale, setScale, theme, setTheme, toggleTheme,
    lightL0, setLightL0, darkL0, setDarkL0,
    accentEnabled, setAccentEnabled, accentHue, setAccentHue,
    systemTriangle, rotateSystem,
    hoveredContrast, setHoveredContrast,
    lightPalette, darkPalette, activePalette,
    chromaticAccent, lightAccents, darkAccents,
    systemAccents, cssVariables,
  };

  return (
    <ColorContext.Provider value={value}>
      {children}
    </ColorContext.Provider>
  );
}

export { ColorContext, ColorProvider };
