'use client';

import { useEffect, useState } from 'react';
import { MoonIcon, SunIcon } from './Icons';

/** Dark is the default; the choice is remembered per visitor. */
export default function ThemeToggle({ className = '', withLabel = false }: { className?: string; withLabel?: boolean }) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');
  }, []);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem('rd-theme', next);
    } catch {
      /* storage may be blocked */
    }
    document.documentElement.dispatchEvent(new CustomEvent('rd-theme-change', { detail: { theme: next } }));
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      className={
        withLabel
          ? `flex min-h-12 items-center gap-3 text-lg font-semibold text-muted hover:text-ink ${className}`
          : `size-11 place-items-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-ink ${className || 'grid'}`
      }
    >
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
      {withLabel && (theme === 'dark' ? 'Light theme' : 'Dark theme')}
    </button>
  );
}
