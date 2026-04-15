'use client';

import { useState, type ReactNode } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

export function AppShell({ children }: { children: ReactNode }) {
  const [showExport, setShowExport] = useState(false);

  return (
    <div className="h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
      <Header onExport={() => setShowExport(true)} />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
      {showExport && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8 text-center">
            <p className="text-lg font-semibold mb-2">Export</p>
            <p className="text-sm text-[var(--muted-foreground)] mb-4">Export modal will be updated in next task.</p>
            <button onClick={() => setShowExport(false)} className="px-4 py-2 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] text-sm">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
