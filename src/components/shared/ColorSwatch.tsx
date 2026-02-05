'use client';

import { useState, useCallback } from 'react';

interface ColorSwatchProps {
  color: string;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showLabel?: boolean;
}

export function ColorSwatch({
  color,
  label,
  size = 'md',
  className = '',
  showLabel = true,
}: ColorSwatchProps) {
  const [copied, setCopied] = useState(false);

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(color);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, [color]);

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleCopy}
        className={`${sizeClasses[size]} rounded-lg cursor-pointer transition-transform hover:scale-105 active:scale-95 relative ${className}`}
        style={{ backgroundColor: color }}
        title={`Click to copy: ${color}`}
      >
        {copied && (
          <span className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg text-white text-xs font-medium">
            ✓
          </span>
        )}
      </button>
      {showLabel && label && (
        <span className="text-[10px] text-[var(--app-text-muted)] mt-1">
          {label}
        </span>
      )}
    </div>
  );
}
