'use client';

import { useEffect } from 'react';
import { track, type TrackEvent } from '@/lib/analytics';

/**
 * One delegated listener so server-rendered links can be tracked by adding
 * `data-track="WhatsApp Clicked"` (and optionally `data-track-label`).
 */
export default function ClickTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>('[data-track]');
      if (!el) return;
      const label = el.dataset.trackLabel;
      track(el.dataset.track as TrackEvent, label ? { label } : undefined);
    };
    document.addEventListener('click', onClick, { capture: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, []);
  return null;
}
