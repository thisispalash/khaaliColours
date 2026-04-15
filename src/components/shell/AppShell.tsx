'use client';

import { useState, type ReactNode } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { ExportModal } from '@/components/export/ExportModal';

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
      {showExport && <ExportModal onClose={() => setShowExport(false)} />}
    </div>
  );
}
