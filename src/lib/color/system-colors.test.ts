import { describe, it, expect } from 'vitest';
import {
  createSystemTriangle,
  rotateTriangle,
  getRestrictedRange,
} from './system-colors';

describe('createSystemTriangle', () => {
  it('creates default triangle with 60° spacing', () => {
    const tri = createSystemTriangle();
    expect(tri.danger).toBe(25);
    expect(tri.warning).toBe(85);
    expect(tri.success).toBe(145);
  });

  it('creates triangle from custom anchor', () => {
    const tri = createSystemTriangle(30);
    expect(tri.danger).toBe(30);
    expect(tri.warning).toBe(90);
    expect(tri.success).toBe(150);
  });
});

describe('rotateTriangle', () => {
  it('rotates all three by the same delta', () => {
    const tri = createSystemTriangle(); // 25, 85, 145
    const rotated = rotateTriangle(tri, 'danger', 35); // danger 25 → 35, delta = +10
    expect(rotated.danger).toBe(35);
    expect(rotated.warning).toBe(95);
    expect(rotated.success).toBe(155);
  });

  it('wraps around 360', () => {
    const tri = createSystemTriangle(350);
    const rotated = rotateTriangle(tri, 'danger', 10); // delta = +20 (350→10 wraps)
    expect(rotated.danger).toBe(10);
    expect(rotated.warning).toBe(70);
    expect(rotated.success).toBe(130);
  });

  it('handles negative rotation', () => {
    const tri = createSystemTriangle(25);
    const rotated = rotateTriangle(tri, 'warning', 75); // warning 85 → 75, delta = -10
    expect(rotated.danger).toBe(15);
    expect(rotated.warning).toBe(75);
    expect(rotated.success).toBe(135);
  });
});

describe('getRestrictedRange', () => {
  it('returns 60° arc centered on the hue', () => {
    const range = getRestrictedRange(85);
    expect(range.min).toBe(55);
    expect(range.max).toBe(115);
  });

  it('wraps around 0/360', () => {
    const range = getRestrictedRange(10);
    expect(range.min).toBe(340);
    expect(range.max).toBe(40);
  });
});
