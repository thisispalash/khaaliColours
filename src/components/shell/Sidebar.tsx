'use client';

import { ContrastDisplay } from '@/components/sidebar/ContrastDisplay';
import { ThemeToggle } from '@/components/sidebar/ThemeToggle';
import { ScaleSlider } from '@/components/sidebar/ScaleSlider';
import { BaseSelection } from '@/components/sidebar/BaseSelection';
import { AccentSection } from '@/components/sidebar/AccentSection';
import { SystemColors } from '@/components/sidebar/SystemColors';

export function Sidebar() {
  return (
    <aside className="w-[280px] min-w-[280px] h-full overflow-y-auto border-r border-[var(--border)] bg-[var(--card)]">
      <ContrastDisplay />
      <div className="border-t border-[var(--border)]" />
      <ThemeToggle />
      <div className="border-t border-[var(--border)]" />
      <ScaleSlider />
      <div className="border-t border-[var(--border)]" />
      <BaseSelection />
      <div className="border-t border-[var(--border)]" />
      <AccentSection />
      <div className="border-t border-[var(--border)]" />
      <SystemColors />
    </aside>
  );
}
