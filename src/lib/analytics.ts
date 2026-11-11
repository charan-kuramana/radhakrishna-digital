/**
 * Privacy-respecting analytics: only four events are tracked.
 * Works with Plausible (set NEXT_PUBLIC_PLAUSIBLE_DOMAIN). With no provider
 * configured, `track` is a no-op.
 */
export type TrackEvent = 'Form Submitted' | 'WhatsApp Clicked' | 'Start Project Clicked' | 'Live Project Clicked';

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string> }) => void;
  }
}

export function track(event: TrackEvent, props?: Record<string, string>) {
  if (typeof window === 'undefined') return;
  try {
    window.plausible?.(event, props ? { props } : undefined);
  } catch {
    /* analytics must never break the page */
  }
}
