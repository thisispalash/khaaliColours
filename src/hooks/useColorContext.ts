'use client';

import { useContext } from 'react';
import { ColorContext } from '@/providers/ColorProvider';

export function useColorContext() {
  const ctx = useContext(ColorContext);
  if (!ctx) {
    throw new Error('useColorContext must be used within a ColorProvider');
  }
  return ctx;
}
