'use client';

import { ComponentSection } from '../ComponentSection';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';

export function InputSections() {
  return (
    <>
      <ComponentSection title="Input">
        <div className="space-y-2 max-w-sm">
          <Input placeholder="Default input" />
          <Input disabled placeholder="Disabled input" />
          <Input type="password" placeholder="Password" />
        </div>
      </ComponentSection>

      <ComponentSection title="Textarea">
        <div className="max-w-sm space-y-2">
          <Textarea placeholder="Type your message here..." />
          <Textarea disabled placeholder="Disabled textarea" />
        </div>
      </ComponentSection>

      <ComponentSection title="Checkbox">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="c1" />
            <Label htmlFor="c1">Unchecked</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="c2" defaultChecked />
            <Label htmlFor="c2">Checked</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="c3" disabled />
            <Label htmlFor="c3">Disabled</Label>
          </div>
        </div>
      </ComponentSection>

      <ComponentSection title="Radio Group">
        <RadioGroup defaultValue="option-1">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-1" id="r1" />
            <Label htmlFor="r1">Option 1</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-2" id="r2" />
            <Label htmlFor="r2">Option 2</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-3" id="r3" />
            <Label htmlFor="r3">Option 3</Label>
          </div>
        </RadioGroup>
      </ComponentSection>

      <ComponentSection title="Select">
        <div className="max-w-sm">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="cherry">Cherry</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </ComponentSection>

      <ComponentSection title="Slider">
        <div className="max-w-sm space-y-4">
          <Slider defaultValue={[50]} max={100} step={1} />
          <Slider defaultValue={[25, 75]} max={100} step={1} />
        </div>
      </ComponentSection>

      <ComponentSection title="Switch">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Switch id="s1" />
            <Label htmlFor="s1">Off</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="s2" defaultChecked />
            <Label htmlFor="s2">On</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="s3" disabled />
            <Label htmlFor="s3">Disabled</Label>
          </div>
        </div>
      </ComponentSection>
    </>
  );
}
