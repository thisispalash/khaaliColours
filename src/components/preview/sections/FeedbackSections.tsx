'use client';

import { ComponentSection } from '../ComponentSection';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export function FeedbackSections() {
  return (
    <>
      <ComponentSection title="Alert">
        <div className="space-y-2">
          <Alert>
            <AlertTitle>Default Alert</AlertTitle>
            <AlertDescription>This is a default alert message.</AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <AlertTitle>Destructive Alert</AlertTitle>
            <AlertDescription>Something went wrong.</AlertDescription>
          </Alert>
        </div>
      </ComponentSection>

      <ComponentSection title="Badge">
        <div className="flex flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </ComponentSection>

      <ComponentSection title="Progress">
        <div className="space-y-3 max-w-sm">
          <Progress value={0} />
          <Progress value={50} />
          <Progress value={100} />
        </div>
      </ComponentSection>

      <ComponentSection title="Spinner">
        <div className="flex gap-4 items-center">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-[var(--muted)] border-t-[var(--primary)]" />
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--muted)] border-t-[var(--primary)]" />
        </div>
      </ComponentSection>
    </>
  );
}
