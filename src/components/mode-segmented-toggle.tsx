'use client';

import { useEffect, useState } from 'react';

import { useTheme } from 'next-themes';

import { defaultTheme } from '@/constants/theme';

import SegmentedButton from './ui/segmented-button';

const options = [
  { id: 'system', label: 'System' },
  { id: 'light', label: 'Light' },
  { id: 'dark', label: 'Dark' }
];

export function ModeSegmentedToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line
    setMounted(true);
  }, []);

  return (
    <SegmentedButton
      options={options}
      selected={mounted ? (theme ?? defaultTheme) : defaultTheme}
      setSelectedAction={setTheme}
    />
  );
}
