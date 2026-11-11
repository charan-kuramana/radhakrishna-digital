'use client';

import Link from 'next/link';
import { useEffect, useState, type CSSProperties } from 'react';
import { ArrowRight } from '../Icons';
import { AnimatedIcon, type AnimatedIconName } from '../fx/AnimatedIcons';
import { vars } from '../fx/Text';

const STEP_MS = 4600;
const dl = (s: number) => vars({ '--d': `${s}s` });

/**
 * Hero v3 — "idea to launch". One window walks through everything we deliver
 * for a single (illustrative) business: brand → website → web app → mobile app
 * → launch → AI. Every scene is drawn in code, so nothing here needs updating
 * when new client projects ship. Auto-plays; pauses on hover/focus; static for reduced motion.
 */
const STAGES: {
  id: string;
  label: string;
  title: string;
  icon: AnimatedIconName;
  color: string;
  href: string;
  caption: string;
  Scene: () => React.ReactElement;
}[] = [
  { id: 'brand', label: 'Brand', title: 'Logo and brand', icon: 'brand', color: '#f472b6', href: '/services#brand-identity', caption: 'A logo, colours and fonts that look trustworthy everywhere.', Scene: BrandScene },
  { id: 'website', label: 'Website', title: 'Website', icon: 'web', color: '#22d3ee', href: '/services#business-websites', caption: 'A fast, mobile-first site that turns visitors into enquiries.', Scene: WebsiteScene },
  { id: 'app', label: 'Web app', title: 'Full-stack web app', icon: 'stack', color: '#a78bfa', href: '/services#web-applications', caption: 'Bookings, payments, roles and dashboards — built end to end.', Scene: AppScene },
  { id: 'mobile', label: 'Mobile app', title: 'Mobile app', icon: 'mobile', color: '#34d399', href: '/services#mobile-apps', caption: 'An app on your customers’ phones, synced with your website.', Scene: MobileScene },
  { id: 'launch', label: 'Launch', title: 'Domain, hosting and deployment', icon: 'cloud', color: '#fbbf24', href: '/services#hosting-care', caption: 'Domain, HTTPS and hosting set up — then kept live and fast.', Scene: LaunchScene },
  { id: 'ai', label: 'AI', title: 'AI features', icon: 'ai', color: '#818cf8', href: '/services#ai-features', caption: 'An assistant that answers, searches and automates for you.', Scene: AiScene },
];

export default function HeroPipeline() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setAuto(false);
  }, []);

  useEffect(() => {
    if (!auto || paused) return;
    const t = setTimeout(() => setActive((i) => (i + 1) % STAGES.length), STEP_MS);
    return () => clearTimeout(t);
  }, [active, paused, auto]);

  const s = STAGES[active];
  const Scene = s.Scene;
  const n = STAGES.length;

  return (
    <div
      className="relative mx-auto w-full max-w-[40rem]"
      style={vars({ '--c': s.color })}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* glow in the current stage's colour */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-8 rounded-full opacity-40 blur-3xl transition-[background] duration-1000"
        style={{ background: `radial-gradient(closest-side, ${s.color}, transparent)` }}
      />

      <div className="relative [perspective:1400px]">
        <div data-tilt className="relative">
          <div className="browser relative shadow-[0_50px_100px_-40px_rgb(0_0_0/0.6)]">
            <div className="browser-bar">
              <i />
              <i />
              <i />
              <span className="ml-3 flex min-w-0 flex-1 items-center gap-1.5 rounded-md bg-bg/70 px-2.5 py-1 text-[0.72rem] text-muted">
                <span style={{ color: s.color }} className="shrink-0">
                  <AnimatedIcon name={s.icon} size={13} />
                </span>
                <span className="font-medium text-ink">yourbrand</span>
                <span>/</span>
                <span key={s.id} className="type-url truncate font-medium text-ink">
                  {s.label.toLowerCase().replace(' ', '-')}
                </span>
              </span>
              <span className="ml-2 shrink-0 font-mono text-[0.68rem] font-bold text-muted">
                {String(active + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
              </span>
            </div>
            <div className="h-0.5 bg-line">
              <div
                key={`${s.id}-${paused}-${auto}`}
                className="h-full origin-left"
                style={{
                  background: `linear-gradient(90deg, var(--accent), ${s.color})`,
                  animation: auto && !paused ? `cycle ${STEP_MS}ms linear forwards` : undefined,
                  transform: auto ? undefined : 'scaleX(1)',
                }}
              />
            </div>
            <div className="relative aspect-[16/11] overflow-hidden bg-surface-2">
              <div aria-hidden className="bg-dots absolute inset-0 opacity-40" />
              <p className="sr-only">Illustration: {s.title}</p>
              <div key={s.id} aria-hidden className="sc-in absolute inset-0">
                <Scene />
              </div>
            </div>
          </div>

          {/* floating badge */}
          <div className="float absolute -top-4 -right-2 flex items-center gap-2 rounded-full border border-line bg-surface/95 px-3.5 py-2 text-xs font-bold shadow-xl backdrop-blur-xl sm:-top-5 sm:-right-6">
            <span className="live-dot" /> One team · idea to launch
          </div>
        </div>
      </div>

      {/* stepper */}
      <div className="relative mt-8">
        <div aria-hidden className="absolute top-5 right-[8.33%] left-[8.33%] h-0.5 rounded-full bg-line">
          <div
            className="h-full rounded-full transition-[width] duration-700 ease-out"
            style={{ width: `${(active / (n - 1)) * 100}%`, background: `linear-gradient(90deg, var(--accent), ${s.color})` }}
          />
        </div>
        <div role="tablist" aria-label="What we build, step by step" className="relative grid grid-cols-6">
          {STAGES.map((st, i) => {
            const on = i === active;
            const done = i < active;
            const style: CSSProperties | undefined = on
              ? { background: st.color, boxShadow: `0 0 26px -2px ${st.color}` }
              : done
                ? { borderColor: st.color, color: st.color }
                : undefined;
            return (
              <button
                key={st.id}
                type="button"
                role="tab"
                aria-selected={on}
                aria-label={st.title}
                onClick={() => setActive(i)}
                className="group flex min-h-11 flex-col items-center gap-2"
              >
                <span
                  style={style}
                  className={`grid size-10 place-items-center rounded-full border-2 bg-surface transition-all duration-500 ${
                    on ? 'scale-110 border-transparent text-[#0b0f19]' : done ? '' : 'border-line text-muted group-hover:text-ink'
                  }`}
                >
                  <AnimatedIcon name={st.icon} size={18} />
                </span>
                <span className={`hidden text-[0.72rem] font-semibold whitespace-nowrap sm:block ${on ? 'text-ink' : 'text-muted'}`}>{st.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* caption for the current stage */}
      <div key={s.id} className="card-in mt-5 flex flex-col gap-2 rounded-2xl border border-line bg-surface/90 p-4 backdrop-blur-xl sm:flex-row sm:items-center sm:gap-4">
        <p className="text-sm leading-snug">
          <span className="mr-1.5 font-mono text-xs font-bold" style={{ color: s.color }}>
            {String(active + 1).padStart(2, '0')}
          </span>
          <span className="font-bold">{s.title}</span> <span className="text-muted">— {s.caption}</span>
        </p>
        <Link href={s.href} className="link-arrow shrink-0 text-sm font-semibold sm:ml-auto">
          Explore <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ scenes */

const card = 'rounded-xl border border-line bg-surface';
const label = 'text-[0.5rem] font-bold tracking-[0.18em] text-muted uppercase sm:text-[0.62rem]';
const bar = 'block h-1.5 rounded-full bg-line-strong';

function BrandScene() {
  const swatches = ['var(--c)', 'var(--accent-2)', '#0f172a', '#f8fafc'];
  return (
    <div className="absolute inset-0 grid grid-cols-[1.15fr_1fr] gap-2.5 p-3 sm:gap-4 sm:p-6">
      <div className={`${card} sc-rise grid place-items-center`}>
        <div className="text-center">
          <svg viewBox="0 0 80 80" className="mx-auto size-16 sm:size-28" fill="none">
            <defs>
              <linearGradient id="sc-brand-g" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="var(--c)" />
                <stop offset="1" stopColor="var(--accent-2)" />
              </linearGradient>
            </defs>
            <rect className="sc-draw" pathLength={100} x="6" y="6" width="68" height="68" rx="22" stroke="url(#sc-brand-g)" strokeWidth="4" style={dl(0.2)} />
            <path className="sc-draw" pathLength={100} d="M25 24 L40 44 L55 24 M40 44 V58" stroke="currentColor" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" style={dl(0.7)} />
            <circle className="sc-pop" cx="58" cy="58" r="5.5" fill="var(--c)" style={dl(1.5)} />
          </svg>
          <p className="mt-1 font-display text-sm font-extrabold sm:mt-2 sm:text-2xl">
            <span className="sc-type" style={dl(1.2)}>
              Your Brand
            </span>
          </p>
          <p className={`${label} sc-rise mt-0.5`} style={dl(1.8)}>
            Logo · Identity
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2 sm:gap-3">
        <div className={`${card} sc-rise p-2 sm:p-3`} style={dl(0.4)}>
          <p className={label}>Palette</p>
          <div className="mt-1.5 flex gap-1.5 sm:mt-2 sm:gap-2">
            {swatches.map((c, i) => (
              <span key={c} className="sc-pop block size-5 rounded-md border border-line sm:size-9 sm:rounded-lg" style={{ background: c, ...dl(0.7 + i * 0.15) }} />
            ))}
          </div>
        </div>
        <div className={`${card} sc-rise flex items-center gap-2 p-2 sm:gap-3 sm:p-3`} style={dl(0.6)}>
          <span className="font-display text-xl leading-none font-extrabold sm:text-4xl">Aa</span>
          <span>
            <p className={label}>Type</p>
            <p className="text-[0.55rem] font-semibold sm:text-xs">Manrope · Inter</p>
          </span>
        </div>
        <div className={`${card} sc-rise flex-1 p-2 sm:p-3`} style={dl(0.8)}>
          <p className={label}>Social kit</p>
          <div className="mt-1.5 grid grid-cols-3 gap-1.5 sm:mt-2 sm:gap-2">
            {[135, 200, 45].map((deg, i) => (
              <span
                key={deg}
                className="sc-pop grid aspect-square place-items-center rounded-md text-[0.6rem] font-black text-white/90 sm:rounded-lg sm:text-base"
                style={{ background: `linear-gradient(${deg}deg, var(--c), var(--accent-2))`, ...dl(1.3 + i * 0.12) }}
              >
                Y.
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function WebsiteScene() {
  return (
    <div className="absolute inset-0 p-3 sm:p-5">
      <div className={`${card} sc-rise relative h-full overflow-hidden`}>
        <div className="flex items-center gap-2 border-b border-line px-2.5 py-1.5 sm:px-4 sm:py-2.5">
          <span className="size-2.5 rounded-full sm:size-3.5" style={{ background: 'linear-gradient(135deg, var(--c), var(--accent-2))' }} />
          <span className="text-[0.55rem] font-extrabold sm:text-xs">Your Brand</span>
          <span className="ml-auto hidden gap-2 sm:flex">
            <i className={`${bar} w-7`} />
            <i className={`${bar} w-7`} />
            <i className={`${bar} w-7`} />
          </span>
          <span className="ml-auto rounded-full px-2 py-0.5 text-[0.5rem] font-bold text-[#0b0f19] sm:ml-2 sm:text-[0.65rem]" style={{ background: 'var(--c)' }}>
            Enquire
          </span>
        </div>
        <div className="grid grid-cols-[1.25fr_1fr] gap-2.5 p-2.5 sm:gap-4 sm:p-4">
          <div>
            <p className="sc-rise font-display text-[0.8rem] leading-tight font-extrabold sm:text-xl" style={dl(0.3)}>
              Grow your business online.
            </p>
            <i className={`${bar} sc-grow-x mt-2 w-[90%]`} style={dl(0.6)} />
            <i className={`${bar} sc-grow-x mt-1 w-[70%]`} style={dl(0.7)} />
            <div className="sc-rise mt-2.5 flex gap-1.5 sm:mt-4" style={dl(0.8)}>
              <span className="relative rounded-full px-2.5 py-1 text-[0.5rem] font-bold text-[#0b0f19] sm:text-[0.68rem]" style={{ background: 'var(--c)' }}>
                Book now
                <span className="sc-ripple absolute inset-0 rounded-full border-2" style={{ borderColor: 'var(--c)' }} />
                <svg className="sc-cursor absolute top-1/2 left-1/2 size-3.5 text-ink sm:size-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4 2l15 9-6.5 1.5L16 20l-3 1.5-3.5-7.5L4 18z" stroke="var(--surface)" strokeWidth="1.2" />
                </svg>
              </span>
              <span className="rounded-full border border-line-strong px-2.5 py-1 text-[0.5rem] font-semibold sm:text-[0.68rem]">Our work</span>
            </div>
          </div>
          <div className="sc-pop relative overflow-hidden rounded-lg" style={{ background: 'linear-gradient(135deg, var(--c), var(--accent-2))', ...dl(0.4) }}>
            <span className="absolute top-[16%] right-[16%] aspect-square w-[16%] rounded-full bg-white/70" />
            <span className="absolute -bottom-[30%] -left-[10%] h-[70%] w-[80%] rotate-12 rounded-[40%] bg-black/20" />
            <span className="absolute -right-[20%] -bottom-[35%] h-[70%] w-[80%] -rotate-12 rounded-[40%] bg-black/25" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-1.5 px-2.5 sm:gap-3 sm:px-4">
          {[0, 1, 2].map((i) => (
            <div key={i} className="sc-rise rounded-lg border border-line p-1.5 sm:p-2.5" style={dl(1 + i * 0.12)}>
              <span className="block size-2.5 rounded sm:size-4" style={{ background: 'color-mix(in srgb, var(--c) 60%, transparent)' }} />
              <i className={`${bar} mt-1.5 w-[80%]`} />
              <i className={`${bar} mt-1 w-[55%] opacity-60`} />
            </div>
          ))}
        </div>
        {/* contact strip: map + WhatsApp */}
        <div className="mx-2.5 mt-2 grid grid-cols-[1.4fr_1fr] gap-3 sm:mx-4 sm:mt-3">
          <div style={dl(1.4)} className="sc-rise relative h-16 overflow-hidden rounded-lg border border-line bg-[linear-gradient(var(--line)_1px,transparent_1px),linear-gradient(90deg,var(--line)_1px,transparent_1px)] bg-[size:14px_14px]">
            <svg viewBox="0 0 24 24" className="absolute top-1/2 left-1/2 size-6 -translate-x-1/2 -translate-y-full" fill="var(--c)">
              <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
            </svg>
          </div>
          <div style={dl(1.55)} className="sc-rise flex flex-col justify-center gap-1.5">
            <i className={`${bar} w-[80%]`} />
            <span className="inline-flex w-fit items-center gap-1 rounded-full bg-[#25d366] px-2.5 py-1 text-[0.62rem] font-bold text-white">
              <AnimatedIcon name="whatsapp" size={11} /> WhatsApp us
            </span>
          </div>
        </div>
        <div className="sc-pop absolute right-2 bottom-2 flex items-center gap-1.5 rounded-lg border border-line bg-surface px-2 py-1 text-[0.5rem] font-bold shadow-lg sm:right-3 sm:bottom-3 sm:px-3 sm:py-1.5 sm:text-[0.68rem]" style={dl(2.5)}>
          <span className="grid size-3 place-items-center rounded-full bg-[#22c55e] text-[0.45rem] text-white sm:size-4 sm:text-[0.6rem]">✓</span>
          New enquiry received
        </div>
      </div>
    </div>
  );
}

function AppScene() {
  const bars = [38, 52, 44, 66, 58, 74, 62, 86, 78];
  const kpis = [
    ['Bookings', '128'],
    ['Payments', '₹2.4L'],
    ['Customers', '342'],
  ];
  return (
    <div className="absolute inset-0 p-3 sm:p-5">
      <div className={`${card} sc-rise grid h-full grid-cols-[auto_1fr] overflow-hidden`}>
        <div className="flex w-7 flex-col items-center gap-2 border-r border-line py-2.5 sm:w-11 sm:gap-3 sm:py-4">
          <span className="size-3 rounded-full sm:size-4" style={{ background: 'linear-gradient(135deg, var(--c), var(--accent-2))' }} />
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="size-3 rounded sm:size-4" style={{ background: i === 0 ? 'color-mix(in srgb, var(--c) 55%, transparent)' : 'var(--line-strong)' }} />
          ))}
        </div>
        <div className="flex min-w-0 flex-col gap-2 p-2 sm:gap-3 sm:p-4">
          <div className="flex items-center gap-2">
            <p className="text-[0.6rem] font-extrabold sm:text-sm">Dashboard</p>
            <span className="ml-auto h-3.5 w-16 rounded-full border border-line sm:h-5 sm:w-28" />
            <span className="size-3.5 rounded-full bg-line-strong sm:size-5" />
          </div>
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5">
            {kpis.map(([k, v], i) => (
              <div key={k} className="sc-rise rounded-lg border border-line p-1.5 sm:p-2.5" style={dl(0.3 + i * 0.12)}>
                <p className="text-[0.45rem] text-muted sm:text-[0.62rem]">{k}</p>
                <p className="font-display text-[0.7rem] font-extrabold sm:text-lg">{v}</p>
              </div>
            ))}
          </div>
          <div className="sc-rise relative flex-1 rounded-lg border border-line p-1.5 sm:p-3" style={dl(0.6)}>
            <div className="flex h-full items-end gap-1 sm:gap-2">
              {bars.map((h, i) => (
                <span
                  key={i}
                  className="sc-grow-y flex-1 rounded-t-sm sm:rounded-t-md"
                  style={{ height: `${h}%`, background: `color-mix(in srgb, var(--c) ${i === bars.length - 2 ? 95 : 45}%, transparent)`, ...dl(0.8 + i * 0.07) }}
                />
              ))}
            </div>
            <svg className="absolute inset-1.5 h-[calc(100%-0.75rem)] w-[calc(100%-0.75rem)] sm:inset-3 sm:h-[calc(100%-1.5rem)] sm:w-[calc(100%-1.5rem)]" viewBox="0 0 100 50" preserveAspectRatio="none" fill="none">
              <path className="sc-draw" pathLength={100} d="M2 38 L14 30 L26 33 L38 22 L50 25 L62 15 L74 19 L86 8 L98 11" stroke="var(--accent-2)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={dl(1.4)} />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileScene() {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="sc-rise relative h-[86%] overflow-hidden rounded-[1.1rem] border-[3px] border-line-strong bg-surface shadow-2xl sm:rounded-[1.8rem] sm:border-4" style={{ aspectRatio: '9 / 18' }}>
        <span className="absolute top-1 left-1/2 z-10 h-1.5 w-8 -translate-x-1/2 rounded-full bg-line-strong sm:top-1.5 sm:h-2.5 sm:w-14" />
        <div className="px-2 pt-4 pb-2 sm:px-3.5 sm:pt-7 sm:pb-3" style={{ background: 'linear-gradient(135deg, var(--c), var(--accent-2))' }}>
          <p className="text-[0.45rem] font-semibold text-[#0b0f19]/70 sm:text-[0.62rem]">Welcome back</p>
          <p className="font-display text-[0.62rem] font-extrabold text-[#0b0f19] sm:text-base">Your Brand</p>
        </div>
        <div className="flex flex-col gap-1.5 p-2 sm:gap-2 sm:p-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="sc-rise flex items-center gap-1.5 rounded-lg border border-line p-1.5 sm:gap-2 sm:p-2" style={dl(0.4 + i * 0.15)}>
              <span className="size-3.5 shrink-0 rounded-md sm:size-6" style={{ background: 'color-mix(in srgb, var(--c) 50%, transparent)' }} />
              <span className="min-w-0 flex-1">
                <i className={`${bar} w-[80%]`} />
                <i className={`${bar} mt-1 w-[50%] opacity-60`} />
              </span>
            </div>
          ))}
        </div>
        <div className="absolute inset-x-0 bottom-0 flex justify-around border-t border-line bg-surface py-1.5 sm:py-2.5">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="size-2 rounded-full sm:size-3" style={{ background: i === 0 ? 'var(--c)' : 'var(--line-strong)' }} />
          ))}
        </div>
      </div>

      <div className={`${card} sc-pop absolute top-[16%] left-[4%] flex items-center gap-1.5 px-2 py-1.5 shadow-xl sm:left-[7%] sm:gap-2 sm:px-3 sm:py-2`} style={dl(1.1)}>
        <span className="grid size-4 place-items-center rounded-full text-[#0b0f19] sm:size-6" style={{ background: 'var(--c)' }}>
          <svg viewBox="0 0 24 24" className="size-2.5 sm:size-3.5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
            <path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10 21h4" />
          </svg>
        </span>
        <span>
          <p className="text-[0.5rem] font-bold sm:text-[0.7rem]">Booking confirmed</p>
          <p className="text-[0.42rem] text-muted sm:text-[0.6rem]">Push notification · now</p>
        </span>
      </div>
      <div className="absolute top-[30%] right-[4%] flex flex-col items-end gap-1.5 sm:right-[7%] sm:gap-2">
        {['Android', 'iOS'].map((t, i) => (
          <span key={t} className={`${card} sc-pop px-2 py-1 text-[0.5rem] font-bold shadow-lg sm:px-3 sm:py-1.5 sm:text-[0.7rem]`} style={dl(1.4 + i * 0.15)}>
            {t}
          </span>
        ))}
      </div>
      <div className={`${card} sc-pop absolute right-[4%] bottom-[12%] flex items-center gap-1.5 px-2 py-1 text-[0.5rem] font-semibold shadow-lg sm:right-[7%] sm:px-3 sm:py-1.5 sm:text-[0.7rem]`} style={dl(1.8)}>
        <svg viewBox="0 0 24 24" className="sc-spin size-2.5 sm:size-3.5" fill="none" stroke="var(--c)" strokeWidth="2.6" strokeLinecap="round">
          <path d="M20 12a8 8 0 0 1-14 5.3M4 12a8 8 0 0 1 14-5.3M18 3v4h-4M6 21v-4h4" />
        </svg>
        Synced with website
      </div>
    </div>
  );
}

function LaunchScene() {
  const lines: [string, string][] = [
    ['$ git push origin main', '#e2e8f0'],
    ['→ Building website and app…', '#94a3b8'],
    ['✓ Build passed', '#4ade80'],
    ['✓ yourbrand.com connected', '#4ade80'],
    ['✓ HTTPS certificate issued', '#4ade80'],
    ['✓ hello@yourbrand.com ready', '#4ade80'],
    ['✓ Monitoring and updates on', '#4ade80'],
    ['✓ Deployed — you are live', '#fde047'],
  ];
  return (
    <div className="absolute inset-0 grid grid-cols-[1.35fr_1fr] gap-2.5 p-3 sm:gap-4 sm:p-5">
      <div className="sc-rise flex flex-col rounded-xl border border-white/10 bg-[#0a0f1d] p-2 font-mono text-[0.48rem] leading-relaxed shadow-xl sm:p-3.5 sm:text-[0.7rem]">
        <div className="mb-1.5 flex gap-1 sm:mb-2.5 sm:gap-1.5">
          <i className="size-1.5 rounded-full bg-[#ff5f57] sm:size-2" />
          <i className="size-1.5 rounded-full bg-[#febc2e] sm:size-2" />
          <i className="size-1.5 rounded-full bg-[#28c840] sm:size-2" />
        </div>
        {lines.map(([t, c], i) => (
          <p key={t} className="sc-rise truncate sm:leading-[1.95]" style={{ color: c, ...dl(0.3 + i * 0.26) }}>
            {t}
            {i === lines.length - 1 && <span className="ai-blink ml-0.5 inline-block h-[1em] w-[0.5em] translate-y-[0.15em] bg-[#fde047]" />}
          </p>
        ))}
      </div>
      <div className={`${card} sc-rise flex flex-col items-center justify-center gap-1.5 p-2 text-center sm:gap-2.5 sm:p-3`} style={dl(0.4)}>
        <span className="relative grid size-10 place-items-center sm:size-16">
          <span className="sc-ring absolute inset-0 rounded-full" style={{ background: 'color-mix(in srgb, var(--c) 35%, transparent)' }} />
          <span className="sc-ring absolute inset-0 rounded-full" style={{ background: 'color-mix(in srgb, var(--c) 25%, transparent)', ...dl(1.2) }} />
          <svg viewBox="0 0 24 24" className="relative size-8 sm:size-12" fill="none" stroke="var(--c)" strokeWidth="1.6">
            <circle cx="12" cy="12" r="9" />
            <path d="M3 12h18M12 3c2.8 3 2.8 15 0 18M12 3c-2.8 3-2.8 15 0 18" />
          </svg>
        </span>
        <p className="text-[0.6rem] font-extrabold sm:text-sm">yourbrand.com</p>
        <span className="sc-pop inline-flex items-center gap-1 rounded-full bg-[#22c55e]/15 px-2 py-0.5 text-[0.5rem] font-bold text-[#16a34a] sm:text-[0.68rem]" style={dl(2.1)}>
          <span className="size-1.5 rounded-full bg-[#22c55e]" /> Live
        </span>
        <div className="flex flex-wrap justify-center gap-1">
          {['HTTPS', 'Hosting', 'Email'].map((t, i) => (
            <span key={t} className="sc-pop rounded-md border border-line px-1.5 py-0.5 text-[0.45rem] font-semibold text-muted sm:text-[0.6rem]" style={dl(2.3 + i * 0.12)}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function AiScene() {
  return (
    <div className="absolute inset-0 p-3 sm:p-5">
      <div className={`${card} sc-rise flex h-full flex-col overflow-hidden`}>
        <div className="flex items-center gap-2 border-b border-line px-2.5 py-1.5 sm:px-4 sm:py-2.5">
          <span className="grid size-4 place-items-center rounded-full text-[#0b0f19] sm:size-6" style={{ background: 'linear-gradient(135deg, var(--c), var(--accent-2))' }}>
            <AnimatedIcon name="ai" size={12} />
          </span>
          <span className="text-[0.55rem] font-extrabold sm:text-xs">Your Brand Assistant</span>
          <span className="ml-auto flex items-center gap-1 text-[0.48rem] text-muted sm:text-[0.62rem]">
            <span className="size-1.5 rounded-full bg-[#22c55e]" /> online
          </span>
        </div>
        <div className="flex min-h-0 flex-1 flex-col justify-end gap-1.5 overflow-hidden p-2.5 text-[0.52rem] leading-snug sm:gap-2.5 sm:p-4 sm:text-[0.74rem]">
          <p className="sc-rise max-w-[80%] rounded-xl rounded-tl-sm bg-surface-2 px-2.5 py-1.5" style={dl(0.1)}>
            Hi! I can answer questions, find products and book visits — any time of day.
          </p>
          <p className="sc-rise ml-auto max-w-[70%] rounded-xl rounded-br-sm px-2.5 py-1.5 text-ink" style={{ background: 'color-mix(in srgb, var(--c) 28%, transparent)', ...dl(0.3) }}>
            Are you open on Sunday?
          </p>
          <div className="relative">
            <span className="sc-blip absolute top-0 left-0 inline-flex gap-1 rounded-xl rounded-tl-sm bg-surface-2 px-2.5 py-2" style={dl(0.8)}>
              <span className="typing-dots-static flex gap-1">
                <i className="size-1 rounded-full bg-muted sm:size-1.5" />
                <i className="size-1 rounded-full bg-muted sm:size-1.5" />
                <i className="size-1 rounded-full bg-muted sm:size-1.5" />
              </span>
            </span>
            <p className="sc-rise max-w-[80%] rounded-xl rounded-tl-sm bg-surface-2 px-2.5 py-1.5" style={dl(1.75)}>
              Yes — we are open 10 am to 6 pm on Sundays. Shall I book a visit for you?
            </p>
          </div>
          <div className="flex flex-wrap gap-1 sm:gap-1.5">
            {['Book a visit', 'Call us', 'Directions'].map((t, i) => (
              <span key={t} className="sc-pop rounded-full border px-2 py-0.5 font-semibold sm:px-2.5 sm:py-1" style={{ borderColor: 'var(--c)', ...dl(2.3 + i * 0.12) }}>
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="mx-2.5 mb-2.5 flex items-center gap-2 rounded-full border border-line px-2.5 py-1 text-[0.5rem] text-muted sm:mx-4 sm:mb-4 sm:py-1.5 sm:text-[0.7rem]">
          Ask anything…
          <span className="ml-auto grid size-3.5 place-items-center rounded-full text-[#0b0f19] sm:size-5" style={{ background: 'var(--c)' }}>
            <ArrowRight size={9} />
          </span>
        </div>
      </div>
    </div>
  );
}
