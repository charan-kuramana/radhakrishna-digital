'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

/**
 * One lightweight, delegated effects layer for the whole site:
 *  - [data-reveal]       fade/slide in when scrolled into view (adds .is-in)
 *  - [data-count="24"]   number counts up when visible (optional data-suffix)
 *  - .spot / .spot-area  cursor spotlight (sets --mx/--my)
 *  - [data-tilt]         3D tilt toward the cursor
 *  - [data-magnetic]     button gently follows the cursor
 *  - scroll progress bar + back-to-top button with a progress ring
 * Pointer effects only run on mouse/trackpad devices and respect reduced motion.
 */
export default function Effects() {
  const pathname = usePathname();
  const barRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLButtonElement>(null);

  /* Scroll progress + back-to-top */
  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const p = max > 0 ? Math.min(1, h.scrollTop / max) : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
      const btn = topRef.current;
      if (btn) {
        btn.style.setProperty('--p', String(p));
        btn.dataset.show = h.scrollTop > 700 ? 'true' : 'false';
      }
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  /* Pointer effects */
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let tiltEl: HTMLElement | null = null;
    let magEl: HTMLElement | null = null;

    const onMove = (e: PointerEvent) => {
      const target = e.target as Element | null;
      if (!target?.closest) return;

      const spot = target.closest<HTMLElement>('.spot, .spot-area');
      if (spot) {
        const r = spot.getBoundingClientRect();
        spot.style.setProperty('--mx', `${e.clientX - r.left}px`);
        spot.style.setProperty('--my', `${e.clientY - r.top}px`);
      }
      if (reduce) return;

      const tilt = target.closest<HTMLElement>('[data-tilt]');
      if (tiltEl && tiltEl !== tilt) tiltEl.style.transform = '';
      if (tilt) {
        const r = tilt.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        tilt.style.transform = `perspective(1000px) rotateX(${(-y * 7).toFixed(2)}deg) rotateY(${(x * 9).toFixed(2)}deg)`;
      }
      tiltEl = tilt;

      const mag = target.closest<HTMLElement>('[data-magnetic]');
      if (magEl && magEl !== mag) magEl.style.transform = '';
      if (mag) {
        const r = mag.getBoundingClientRect();
        const x = e.clientX - (r.left + r.width / 2);
        const y = e.clientY - (r.top + r.height / 2);
        mag.style.transform = `translate(${(x * 0.2).toFixed(1)}px, ${(y * 0.3).toFixed(1)}px)`;
      }
      magEl = mag;
    };
    const onLeave = () => {
      if (tiltEl) tiltEl.style.transform = '';
      if (magEl) magEl.style.transform = '';
      tiltEl = magEl = null;
    };
    document.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      document.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  /* Reveal + counters — rescan on every route change */
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('reveal-ready');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const countUp = (el: HTMLElement) => {
      const target = Number(el.dataset.count);
      const suffix = el.dataset.suffix ?? '';
      if (!Number.isFinite(target) || reduce) return;
      const start = performance.now();
      const dur = 1500;
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = `${Math.round(target * eased)}${suffix}`;
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.classList.add('is-in');
          if (el.dataset.count && !el.dataset.counted) {
            el.dataset.counted = 'true';
            countUp(el);
          }
          io.unobserve(el);
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.01 },
    );
    const raf = requestAnimationFrame(() => {
      document.querySelectorAll('[data-reveal]:not(.is-in), [data-count]:not([data-counted])').forEach((el) => io.observe(el));
    });
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [pathname]);

  return (
    <>
      <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]">
        <div ref={barRef} className="scroll-progress h-full w-full" />
      </div>
      <button
        ref={topRef}
        type="button"
        data-show="false"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="group fixed right-4 bottom-4 z-40 grid size-12 translate-y-4 place-items-center rounded-full opacity-0 transition-all duration-300 data-[show=true]:translate-y-0 data-[show=true]:opacity-100 data-[show=false]:pointer-events-none sm:right-6 sm:bottom-6"
        style={{ background: 'conic-gradient(var(--accent) calc(var(--p, 0) * 1turn), var(--line-strong) 0)' }}
      >
        <span className="grid size-[2.6rem] place-items-center rounded-full bg-surface text-ink shadow-lg transition-colors group-hover:text-accent">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="transition-transform duration-300 group-hover:-translate-y-0.5">
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </span>
      </button>
    </>
  );
}
