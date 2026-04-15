const DEFAULTS = { danger: 25, warning: 85, success: 145 } as const;
const SPACING = 60;

export type SystemColorKey = 'danger' | 'warning' | 'success';

export interface SystemTriangle {
  danger: number;
  warning: number;
  success: number;
}

function normalize(hue: number): number {
  return ((hue % 360) + 360) % 360;
}

function shortestDelta(from: number, to: number): number {
  const raw = normalize(to) - normalize(from);
  if (raw > 180) return raw - 360;
  if (raw < -180) return raw + 360;
  return raw;
}

export function createSystemTriangle(dangerHue?: number): SystemTriangle {
  const d = dangerHue ?? DEFAULTS.danger;
  return {
    danger: normalize(d),
    warning: normalize(d + SPACING),
    success: normalize(d + SPACING * 2),
  };
}

export function rotateTriangle(
  current: SystemTriangle,
  dragged: SystemColorKey,
  newHue: number
): SystemTriangle {
  const delta = shortestDelta(current[dragged], newHue);
  return {
    danger: normalize(current.danger + delta),
    warning: normalize(current.warning + delta),
    success: normalize(current.success + delta),
  };
}

export function getRestrictedRange(hue: number): { min: number; max: number } {
  return {
    min: normalize(hue - 30),
    max: normalize(hue + 30),
  };
}
