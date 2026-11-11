'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { projects } from '@/content/projects';
import { site } from '@/content/site';
import { AnimatedIcon } from '../fx/AnimatedIcons';

const SHOWCASE = projects.filter((p) => p.images && p.live);
const CYCLE_MS = 5000;

/**
 * Hero v2 — a live showcase of real, verifiable work.
 * A tilted browser cycles through the live projects (crossfade + Ken Burns,
 * typed URL, progress bar); a phone shows the matching mobile screen; tabs let
 * the visitor switch. Auto-play pauses on hover/focus and is off for reduced motion.
 */
export default function HeroShowcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [auto, setAuto] = useState(true);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setAuto(false);
  }, []);

  useEffect(() => {
    if (!auto || paused) return;
    timer.current = setTimeout(() => setActive((i) => (i + 1) % SHOWCASE.length), CYCLE_MS);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [active, paused, auto]);

  const select = useCallback((i: number) => setActive(i), []);
  const p = SHOWCASE[active];

  return (
    <div
      className="relative mx-auto w-full max-w-[40rem] sm:pt-28 lg:pt-24"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* glow that takes the active project's brand colour */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-10 rounded-full opacity-45 blur-3xl transition-[background] duration-1000"
        style={{ background: `radial-gradient(closest-side, ${p.accent}, transparent)` }}
      />

      {/* stage */}
      <div className="relative [perspective:1400px]">
        <div data-tilt className="relative">
          {/* browser */}
          <div className="browser relative shadow-[0_50px_100px_-40px_rgb(0_0_0/0.6)]">
            <div className="browser-bar">
              <i />
              <i />
              <i />
              <span className="ml-3 flex min-w-0 flex-1 items-center gap-1.5 rounded-md bg-bg/70 px-2.5 py-1 text-[0.72rem] text-muted">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
                  <rect x="5" y="11" width="14" height="10" rx="2" />
                  <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                </svg>
                <span key={p.id} className="type-url truncate font-medium text-ink">
                  {p.live!.label}
                </span>
              </span>
              <a
                href={p.live!.href}
                target="_blank"
                rel="noopener noreferrer"
                data-track="Live Project Clicked"
                data-track-label={`hero-${p.id}`}
                className="ml-2 hidden shrink-0 items-center gap-1 rounded-md bg-accent/15 px-2 py-1 text-[0.68rem] font-bold text-accent no-underline sm:inline-flex"
              >
                Open live ↗
              </a>
            </div>
            {/* progress */}
            <div className="h-0.5 bg-line">
              <div
                key={`${p.id}-${paused}-${auto}`}
                className="h-full origin-left bg-gradient-to-r from-accent to-accent-2"
                style={{ animation: auto && !paused ? `cycle ${CYCLE_MS}ms linear forwards` : undefined, transform: auto ? undefined : 'scaleX(1)' }}
              />
            </div>
            <div className="relative aspect-[16/10] overflow-hidden bg-surface-2">
              {SHOWCASE.map((s, i) => (
                <Image
                  key={s.id}
                  src={s.images!.desktop}
                  alt={i === active ? s.images!.alt : ''}
                  aria-hidden={i !== active}
                  width={1280}
                  height={800}
                  priority={i === 0}
                  sizes="(min-width: 1024px) 40rem, 92vw"
                  className={`absolute inset-0 size-full object-cover object-top transition-opacity duration-700 ${i === active ? 'kenburns opacity-100' : 'opacity-0'}`}
                />
              ))}
            </div>
          </div>

          {/* phone */}
          <div className="phone absolute -right-3 -bottom-10 w-[26%] sm:-right-8 sm:-bottom-12">
            <div className="relative aspect-[600/1298]">
              <span aria-hidden className="absolute top-1.5 left-1/2 z-10 h-3 w-12 -translate-x-1/2 rounded-full bg-[#0d1117]" />
              {SHOWCASE.map((s, i) => (
                <Image
                  key={s.id}
                  src={s.images!.mobile!}
                  alt=""
                  aria-hidden
                  width={600}
                  height={1298}
                  sizes="170px"
                  className={`absolute inset-0 size-full object-cover object-top transition-opacity delay-150 duration-700 ${i === active ? 'opacity-100' : 'opacity-0'}`}
                />
              ))}
            </div>
          </div>

          {/* WhatsApp enquiry bubble — the real pre-filled message */}
          <div aria-hidden className="float absolute -top-3 left-4 hidden w-64 -translate-y-full rounded-2xl border border-line bg-surface/95 p-3 shadow-2xl backdrop-blur-xl sm:block lg:-left-6">
            <div className="flex items-center gap-2 text-xs font-bold">
              <span className="grid size-6 place-items-center rounded-full bg-[#25d366] text-white">
                <AnimatedIcon name="whatsapp" size={14} />
              </span>
              New enquiry
              <span className="ml-auto font-normal text-muted">now</span>
            </div>
            <div key={p.id} className="relative mt-2 min-h-[3.4rem]">
              <span className="typing-dots inline-flex gap-1 rounded-xl rounded-tl-sm bg-surface-2 px-3 py-2">
                <i />
                <i />
                <i />
              </span>
              <p className="msg-in rounded-xl rounded-tl-sm bg-[#25d366]/15 px-3 py-2 text-xs leading-snug text-ink">{site.whatsapp.message}</p>
            </div>
          </div>

          {/* active project card */}
          <div key={p.id} className="card-in absolute -bottom-14 -left-3 w-[62%] max-w-[17rem] rounded-2xl border border-line bg-surface/95 p-4 shadow-2xl backdrop-blur-xl sm:-left-8">
            <p className="flex items-center gap-2 text-[0.68rem] font-bold tracking-[0.12em] uppercase" style={{ color: p.accent }}>
              <span className="live-dot" /> <span className="truncate">Live • {p.clientType.split(' — ')[0]}</span>
            </p>
            <p className="mt-1.5 font-display text-lg font-extrabold">{p.name}</p>
            {p.stack ? (
              <p className="mt-1 truncate text-xs text-muted">{p.stack.join(' · ')}</p>
            ) : (
              <p className="mt-1 truncate text-xs text-muted">{p.summary}</p>
            )}
          </div>
        </div>
      </div>

      {/* tabs */}
      <div role="tablist" aria-label="Featured live projects" className="relative mt-24 flex justify-center gap-2 sm:mt-24 sm:justify-end">
        {SHOWCASE.map((s, i) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={i === active}
            onClick={() => select(i)}
            className={`relative min-h-11 overflow-hidden rounded-full border px-3 text-[0.8rem] font-semibold whitespace-nowrap transition-colors sm:px-4 sm:text-sm ${
              i === active ? 'border-accent text-ink' : 'border-line text-muted hover:text-ink'
            }`}
          >
            <span className="relative">{s.name.replace('RadhaKrishna ', 'RK ')}</span>
            {i === active && <span aria-hidden className="absolute inset-0 -z-0 bg-accent/12" />}
          </button>
        ))}
      </div>
    </div>
  );
}
