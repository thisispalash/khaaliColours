'use client';

import { useRef, useState, useCallback, useEffect } from 'react';

interface HueWheelProps {
  value: number;
  onChange: (hue: number) => void;
  size?: number;
  minHue?: number;
  maxHue?: number;
}

// Comprehensive Pantone-inspired hue names for every 5 degrees
const HUE_NAMES: Record<number, string> = {
  0: 'Vermillion', 5: 'Scarlet', 10: 'Poppy', 15: 'Flame', 20: 'Tangerine',
  25: 'Coral', 30: 'Apricot', 35: 'Peach', 40: 'Marigold', 45: 'Amber',
  50: 'Gold', 55: 'Honey', 60: 'Canary', 65: 'Lemon', 70: 'Citron',
  75: 'Chartreuse', 80: 'Lime', 85: 'Apple', 90: 'Spring', 95: 'Grass',
  100: 'Mint', 105: 'Jade', 110: 'Emerald', 115: 'Forest', 120: 'Kelly',
  125: 'Clover', 130: 'Fern', 135: 'Pine', 140: 'Sage', 145: 'Seafoam',
  150: 'Teal', 155: 'Lagoon', 160: 'Aqua', 165: 'Turquoise', 170: 'Caribbean',
  175: 'Pool', 180: 'Cyan', 185: 'Azure', 190: 'Cerulean', 195: 'Sky',
  200: 'Pacific', 205: 'Ocean', 210: 'Denim', 215: 'Cornflower', 220: 'Cobalt',
  225: 'Sapphire', 230: 'Royal', 235: 'Marine', 240: 'Ultramarine', 245: 'Indigo',
  250: 'Iris', 255: 'Periwinkle', 260: 'Violet', 265: 'Amethyst', 270: 'Lavender',
  275: 'Orchid', 280: 'Grape', 285: 'Plum', 290: 'Mauve', 295: 'Mulberry',
  300: 'Fuchsia', 305: 'Magenta', 310: 'Hot Pink', 315: 'Cerise', 320: 'Rose',
  325: 'Blush', 330: 'Coral Pink', 335: 'Salmon', 340: 'Peach Pink', 345: 'Dusty Rose',
  350: 'Ruby', 355: 'Crimson', 360: 'Vermillion',
};

function getHueName(hue: number): string {
  const normalizedHue = ((hue % 360) + 360) % 360;
  const roundedHue = Math.round(normalizedHue / 5) * 5;
  return HUE_NAMES[roundedHue] || HUE_NAMES[0];
}

export function HueWheel({
  value,
  onChange,
  size = 180,
  minHue,
  maxHue,
}: HueWheelProps) {
  const wheelRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const isRangeLocked = minHue !== undefined && maxHue !== undefined;

  const calculateHue = useCallback(
    (clientX: number, clientY: number) => {
      if (!wheelRef.current) return value;

      const rect = wheelRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const angle = Math.atan2(clientY - centerY, clientX - centerX);
      let hue = (angle * 180) / Math.PI + 90;
      if (hue < 0) hue += 360;
      hue = Math.round(hue);

      if (isRangeLocked) {
        const min = minHue!;
        const max = maxHue!;
        const wraps = max < min;

        const inRange = wraps
          ? hue >= min || hue <= max
          : hue >= min && hue <= max;

        if (!inRange) {
          const distToMin = Math.min(Math.abs(hue - min), 360 - Math.abs(hue - min));
          const distToMax = Math.min(Math.abs(hue - max), 360 - Math.abs(hue - max));
          hue = distToMin <= distToMax ? min : max;
        }
      }

      return hue;
    },
    [value, isRangeLocked, minHue, maxHue]
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      setIsDragging(true);
      onChange(calculateHue(e.clientX, e.clientY));
    },
    [calculateHue, onChange]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      onChange(calculateHue(e.clientX, e.clientY));
    },
    [isDragging, calculateHue, onChange]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Calculate line positions for the selector
  const lineAngle = ((value - 90) * Math.PI) / 180;
  const outerRadius = size / 2 - 4;
  const innerRadius = size / 4 + 4;

  const lineStartX = size / 2 + Math.cos(lineAngle) * innerRadius;
  const lineStartY = size / 2 + Math.sin(lineAngle) * innerRadius;
  const lineEndX = size / 2 + Math.cos(lineAngle) * outerRadius;
  const lineEndY = size / 2 + Math.sin(lineAngle) * outerRadius;

  // Generate gradient based on range
  // For restricted mode: render only the allowed arc with smooth hue gradient,
  // rest is transparent. conic-gradient rotates from 12-o'clock (top),
  // but our hue 0° maps to 3-o'clock in the wheel, so we offset by -90°.
  const gradientStyle = isRangeLocked
    ? (() => {
        const min = minHue!;
        const max = maxHue!;
        const arc = ((max - min + 360) % 360) || 360;
        const mid = (min + arc / 2) % 360;
        // CSS conic-gradient "from" is clockwise from top (12-o'clock).
        // Our hues map: 0° = right (3-o'clock), so subtract 90° for CSS.
        const fromDeg = min - 90;
        return {
          background: `conic-gradient(from ${fromDeg}deg,
            oklch(65% 0.2 ${min}) 0deg,
            oklch(65% 0.2 ${mid}) ${arc / 2}deg,
            oklch(65% 0.2 ${max}) ${arc}deg,
            transparent ${arc}deg,
            transparent 360deg
          )`,
        };
      })()
    : undefined;

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        ref={wheelRef}
        className={`relative cursor-pointer ${isRangeLocked ? '' : 'hue-wheel'}`}
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          ...gradientStyle,
        }}
        onMouseDown={handleMouseDown}
      >
        {/* Center cutout overlay */}
        <div
          className="absolute rounded-full flex items-center justify-center"
          style={{
            top: '25%',
            left: '25%',
            width: '50%',
            height: '50%',
            background: 'var(--card)',
          }}
        >
          {/* Hue value in center */}
          <div
            className="rounded-full flex items-center justify-center"
            style={{
              backgroundColor: `oklch(65% 0.15 ${value})`,
              width: size * 0.3,
              height: size * 0.3,
            }}
          >
            <span
              className="font-bold text-white drop-shadow-sm"
              style={{ fontSize: Math.max(9, size * 0.08) }}
            >
              {value}°
            </span>
          </div>
        </div>

        {/* Line selector spanning the donut */}
        <svg
          className="absolute inset-0 pointer-events-none"
          width={size}
          height={size}
        >
          <line
            x1={lineStartX}
            y1={lineStartY}
            x2={lineEndX}
            y2={lineEndY}
            stroke="white"
            strokeWidth={3}
            strokeLinecap="round"
            style={{ filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.4))' }}
          />
          <circle
            cx={lineEndX}
            cy={lineEndY}
            r={6}
            fill="white"
            style={{ filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.4))' }}
          />
        </svg>
      </div>

      {/* Hue name label: degree + name */}
      <div className="text-center">
        <div
          className="text-base font-semibold"
          style={{ color: `oklch(65% 0.15 ${value})` }}
        >
          {value}° {getHueName(value)}
        </div>
      </div>
    </div>
  );
}
