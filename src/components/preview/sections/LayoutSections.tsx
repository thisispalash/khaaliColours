'use client';

import { ComponentSection } from '../ComponentSection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

export function LayoutSections() {
  return (
    <>
      <ComponentSection title="Accordion">
        <Accordion className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Section One</AccordionTrigger>
            <AccordionContent>Content for section one.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Section Two</AccordionTrigger>
            <AccordionContent>Content for section two.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Section Three</AccordionTrigger>
            <AccordionContent>Content for section three.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </ComponentSection>

      <ComponentSection title="Card">
        <div className="max-w-sm">
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card description goes here.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Card content with some example text.</p>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline" size="sm">Cancel</Button>
              <Button size="sm">Save</Button>
            </CardFooter>
          </Card>
        </div>
      </ComponentSection>

      <ComponentSection title="Collapsible">
        <Collapsible>
          <CollapsibleTrigger className="inline-flex h-7 items-center justify-center rounded-[min(var(--radius-md),12px)] border border-border bg-background px-2.5 text-[0.8rem] font-medium transition-all hover:bg-muted">
            Toggle Content
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 p-3 rounded-lg border border-[var(--border)]">
            <p className="text-sm">This content can be toggled.</p>
          </CollapsibleContent>
        </Collapsible>
      </ComponentSection>

      <ComponentSection title="Separator">
        <div className="space-y-4">
          <Separator />
          <div className="flex items-center gap-4">
            <span className="text-sm">Left</span>
            <Separator orientation="vertical" className="h-6" />
            <span className="text-sm">Right</span>
          </div>
        </div>
      </ComponentSection>
    </>
  );
}
