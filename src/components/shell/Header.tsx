'use client';

import { useState } from 'react';

interface HeaderProps {
  onExport: () => void;
}

export function Header({ onExport }: HeaderProps) {
  const [ctaHovered, setCtaHovered] = useState(false);

  return (
    <header className="h-14 flex items-center justify-between px-6 border-b border-[var(--border)]">
      {/* Title — left */}
      <h1 className="text-lg font-semibold text-[var(--foreground)]">
        khaaliColors
      </h1>

      {/* Right group: CTA + User Button */}
      <div className="flex items-center gap-3">
        {/* Export CTA — icon only, hover → label + border */}
        <button
          onMouseEnter={() => setCtaHovered(true)}
          onMouseLeave={() => setCtaHovered(false)}
          onClick={onExport}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all text-sm font-medium text-[var(--foreground)] ${
            ctaHovered
              ? 'border border-[var(--border)]'
              : 'border border-transparent'
          }`}
        >
          {/* Download/Export icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          {ctaHovered && <span>Export</span>}
        </button>

        {/* User Button — static placeholder, dashed border = unauthenticated */}
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-dashed border-[var(--border)] text-sm text-[var(--muted-foreground)]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          User Button
        </button>
      </div>
    </header>
  );
}
