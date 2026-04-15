'use client';

import { ButtonSections } from './sections/ButtonSections';
import { InputSections } from './sections/InputSections';
import { FeedbackSections } from './sections/FeedbackSections';
import { OverlaySections } from './sections/OverlaySections';
import { LayoutSections } from './sections/LayoutSections';
import { DataSections } from './sections/DataSections';

export function ComponentGrid() {
  return (
    <div className="space-y-6 pb-12">
      <ButtonSections />
      <InputSections />
      <FeedbackSections />
      <OverlaySections />
      <LayoutSections />
      <DataSections />
    </div>
  );
}
