'use client';

import { ComponentSection } from '../ComponentSection';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

export function ButtonSections() {
  return (
    <>
      <ComponentSection title="Button">
        <div className="flex flex-wrap gap-2">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button disabled>Disabled</Button>
        </div>
      </ComponentSection>

      <ComponentSection title="Toggle">
        <div className="flex flex-wrap gap-2">
          <Toggle>Toggle</Toggle>
          <Toggle defaultPressed>Pressed</Toggle>
          <Toggle disabled>Disabled</Toggle>
          <Toggle variant="outline">Outline</Toggle>
        </div>
      </ComponentSection>

      <ComponentSection title="Toggle Group">
        <div className="space-y-2">
          <ToggleGroup defaultValue={['center']}>
            <ToggleGroupItem value="left">Left</ToggleGroupItem>
            <ToggleGroupItem value="center">Center</ToggleGroupItem>
            <ToggleGroupItem value="right">Right</ToggleGroupItem>
          </ToggleGroup>
          <ToggleGroup multiple defaultValue={['bold', 'italic']}>
            <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
            <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
            <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
          </ToggleGroup>
        </div>
      </ComponentSection>
    </>
  );
}
