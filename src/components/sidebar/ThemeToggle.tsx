'use client';

import { useColorContext } from '@/hooks/useColorContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useColorContext();

  return (
    <div className="px-4 py-3">
      <div className="text-xs font-medium text-[var(--muted-foreground)] mb-2">Theme</div>
      <button
        onClick={toggleTheme}
        className="w-full flex items-center justify-between px-3 py-2 rounded-lg border border-[var(--border)] text-sm text-[var(--foreground)]"
      >
        <span>{theme === 'light' ? 'Light' : 'Dark'}</span>
        <span className="text-lg">{theme === 'light' ? '☀' : '☾'}</span>
      </button>
    </div>
  );
}
