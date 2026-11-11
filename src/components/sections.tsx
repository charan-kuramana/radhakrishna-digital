import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { site } from '@/content/site';
import type { Service } from '@/content/services';
import type { Project } from '@/content/projects';
import { customProject, packages, processSteps, stages, timingNote } from '@/content/packages';
import { ArrowRight, CheckIcon, ExternalIcon } from './Icons';
import { AnimatedIcon, IconTile, type AnimatedIconName } from './fx/AnimatedIcons';
import { AnimatedHeading, d, type HeadingPart } from './fx/Text';
import { BrowserFrame, PhoneFrame } from './fx/Frames';

/* ------------------------------------------------------------------ */
/** Page hero: animated headline + slot for a unique background and visual. */
export function PageHero({
  eyebrow,
  title,
  intro,
  bg,
  visual,
  children,
}: {
  eyebrow: ReactNode;
  title: HeadingPart[];
  intro?: ReactNode;
  bg?: ReactNode;
  visual?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="spot-area relative -mt-16 overflow-hidden border-b border-line pt-16 lg:-mt-[4.5rem] lg:pt-[4.5rem]">
      {bg}
      <div className={`container-page relative grid items-center gap-12 py-16 sm:py-20 lg:py-24 ${visual ? 'lg:grid-cols-[1.1fr_1fr]' : ''}`}>
        <div>
          <p className="eyebrow anim-up">{eyebrow}</p>
          <AnimatedHeading parts={title} className="mt-5 max-w-3xl text-[2.35rem] leading-[1.06] font-extrabold sm:text-5xl lg:text-[3.6rem]" />
          {intro && (
            <p className="anim-up mt-6 max-w-2xl text-lg text-muted" style={d(5, 100)}>
              {intro}
            </p>
          )}
          {children && (
            <div className="anim-up" style={d(7, 100)}>
              {children}
            </div>
          )}
        </div>
        {visual && (
          <div className="anim-up relative" style={d(4, 100)}>
            {visual}
          </div>
        )}
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  id,
  center = false,
  action,
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  intro?: ReactNode;
  id?: string;
  center?: boolean;
  action?: ReactNode;
}) {
  return (
    <div className={`mb-12 flex flex-wrap items-end justify-between gap-6 ${center ? 'justify-center text-center' : ''}`}>
      <div className={`max-w-2xl ${center ? 'mx-auto' : ''}`} data-reveal="blur">
        <p className={`eyebrow ${center ? 'justify-center' : ''}`}>{eyebrow}</p>
        <h2 id={id} className="mt-4 text-3xl leading-[1.1] font-extrabold sm:text-[2.6rem]">
          {title}
        </h2>
        {intro && <p className="mt-4 text-lg text-muted">{intro}</p>}
      </div>
      {action && <div data-reveal="right">{action}</div>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
export function ServiceCard({ service, i = 0, wide = false }: { service: Service; i?: number; wide?: boolean }) {
  return (
    <article data-reveal style={d(i)} className={`card spot lift group flex h-full flex-col p-6 sm:p-7 ${wide ? 'lg:col-span-2' : ''}`}>
      <div className="flex items-start justify-between gap-4">
        <IconTile name={service.icon as AnimatedIconName} />
        <span className="font-display text-sm font-extrabold text-muted/60">0{i + 1}</span>
      </div>
      <h3 className="mt-6 text-xl font-bold">{service.title}</h3>
      <p className="mt-3 text-muted">{service.outcome}</p>
      {wide && (
        <ul className="mt-5 flex flex-wrap gap-2">
          {service.deliverables.map((x) => (
            <li key={x} className="chip text-muted">
              <CheckIcon size={13} className="text-accent" /> {x}
            </li>
          ))}
        </ul>
      )}
      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-7">
        <Link href={service.price.href} className="rounded-full bg-accent/10 px-3.5 py-1.5 font-display text-sm font-extrabold text-accent no-underline">
          {service.price.label}
        </Link>
        <Link href={`/services#${service.id}`} className="link-arrow text-sm" aria-label={`Details: ${service.title}`}>
          Details <ArrowRight size={14} />
        </Link>
      </div>
    </article>
  );
}

/** Large zig-zag row used on the Services page. */
export function ServiceRow({ service, i }: { service: Service; i: number }) {
  const flip = i % 2 === 1;
  return (
    <article id={service.id} className="grid scroll-mt-28 items-center gap-8 lg:grid-cols-2 lg:gap-16">
      <div data-reveal={flip ? 'right' : 'left'} className={`spot group relative overflow-hidden rounded-[1.75rem] border border-line bg-surface p-8 sm:p-10 ${flip ? 'lg:order-2' : ''}`}>
        <div aria-hidden className="bg-grid absolute inset-0 opacity-70" />
        <div aria-hidden className="aurora-blob -right-20 -bottom-24 h-64 w-64" style={{ background: i % 2 ? 'var(--accent-2)' : 'var(--accent)', opacity: 0.25 }} />
        <div className="relative flex min-h-56 flex-col justify-between gap-10">
          <div className="flex items-center justify-between">
            <IconTile name={service.icon as AnimatedIconName} size="lg" />
            <span className="font-display text-7xl font-extrabold text-transparent" style={{ WebkitTextStroke: '1.5px var(--line-strong)' }}>
              0{i + 1}
            </span>
          </div>
          <ul className="grid gap-2.5 sm:grid-cols-2">
            {service.deliverables.map((x, j) => (
              <li key={x} data-reveal style={d(j, 80)} className="glass flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-sm font-semibold">
                <CheckIcon size={15} className="shrink-0 text-accent" /> {x}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div data-reveal="blur">
        <p className="eyebrow">Service 0{i + 1}</p>
        <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">{service.title}</h2>
        <p className="mt-4 text-lg text-muted">{service.outcome}</p>
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Link href={service.price.href} className="btn btn-primary" data-track="Start Project Clicked" data-track-label={`service-${service.id}`}>
            {service.price.label === 'Get a quote' ? 'Get a quote' : `${service.price.label} — see packages`} <ArrowRight />
          </Link>
          {service.proof && (
            <Link href={service.proof.href} className="btn btn-secondary">
              {service.proof.label}
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
function Visual({ project, sizes, priority }: { project: Project; sizes: string; priority?: boolean }) {
  if (!project.images) {
    return (
      <div className="browser">
        <div className="browser-bar" aria-hidden>
          <i />
          <i />
          <i />
        </div>
        <div className="relative grid aspect-[16/10] place-items-center overflow-hidden bg-gradient-to-br from-surface-2 to-bg">
          <div aria-hidden className="bg-grid absolute inset-0" />
          <div aria-hidden className="css-globe absolute size-44 opacity-80">
            <div className="core" />
          </div>
          <span className="relative font-display text-2xl font-extrabold">
            You’re looking at it<span className="text-accent">.</span>
          </span>
        </div>
      </div>
    );
  }
  return <BrowserFrame src={project.images.desktop} alt={project.images.alt} url={project.live?.label} sizes={sizes} priority={priority} />;
}

export function ProjectCard({ project, i = 0 }: { project: Project; i?: number }) {
  const href = project.id === 'hostlify' ? '/work/hostlify' : `/work#${project.id}`;
  return (
    <article data-reveal style={d(i, 120)} className="h-full">
      <div data-tilt className="card spot group flex h-full flex-col overflow-hidden p-3">
        <Link href={href} className="block no-underline" tabIndex={-1} aria-hidden>
          <Visual project={project} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw" />
        </Link>
        <div className="flex flex-1 flex-col p-3 pt-5">
          <p className="text-xs font-bold tracking-[0.14em] uppercase" style={{ color: project.accent }}>
            {project.clientType}
          </p>
          <h3 className="mt-2 text-xl font-bold">
            <Link href={href} className="no-underline hover:text-accent">
              {project.name}
            </Link>
          </h3>
          <p className="mt-2 text-muted">{project.summary}</p>
          {project.stack && (
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {project.stack.map((s) => (
                <li key={s} className="rounded-md bg-surface-2 px-2 py-0.5 text-xs text-muted">
                  {s}
                </li>
              ))}
            </ul>
          )}
          <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-6">
            {project.live && (
              <a href={project.live.href} target="_blank" rel="noopener noreferrer" className="link-arrow text-sm" data-track="Live Project Clicked" data-track-label={project.id}>
                <span className="live-dot" /> View Live Site <ExternalIcon />
              </a>
            )}
            <Link href={href} className="link-arrow text-sm text-muted">
              Case study <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

/** Full case-study block (Section 5 template), alternating sides. */
export function CaseStudy({ project, i = 0 }: { project: Project; i?: number }) {
  const flip = i % 2 === 1;
  return (
    <article id={project.id} className="grid scroll-mt-28 items-center gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
      <div data-reveal={flip ? 'right' : 'left'} className={`group relative ${flip ? 'lg:order-2' : ''}`}>
        <div aria-hidden className="aurora-blob -top-10 left-1/4 h-72 w-72" style={{ background: project.accent, opacity: 0.25 }} />
        <div data-tilt className="relative">
          <Visual project={project} sizes="(min-width: 1024px) 55vw, 100vw" />
        </div>
        {project.images?.mobile && (
          <PhoneFrame
            src={project.images.mobile}
            alt={project.images.mobileAlt ?? ''}
            sizes="170px"
            className={`float absolute -bottom-10 hidden w-[24%] sm:block ${flip ? '-left-4' : '-right-4'}`}
          />
        )}
      </div>
      <div data-reveal="blur">
        <div className="flex items-center gap-4">
          <span className="font-display text-6xl font-extrabold text-transparent" style={{ WebkitTextStroke: `1.5px ${project.accent}` }}>
            0{i + 1}
          </span>
          <p className="text-xs font-bold tracking-[0.14em] uppercase" style={{ color: project.accent }}>
            {project.clientType}
            {project.date ? ` • ${project.date}` : ''}
          </p>
        </div>
        <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">{project.name}</h2>
        {project.live && (
          <a href={project.live.href} target="_blank" rel="noopener noreferrer" className="link-arrow mt-3" data-track="Live Project Clicked" data-track-label={project.id}>
            <span className="live-dot" /> {project.live.label} <ExternalIcon />
          </a>
        )}

        <div className="mt-6 grid gap-4">
          <div className="card p-5">
            <h3 className="text-xs font-bold tracking-[0.14em] text-muted uppercase">The problem</h3>
            <p className="mt-2">{project.problem}</p>
          </div>
          <div className="card p-5">
            <h3 className="text-xs font-bold tracking-[0.14em] text-muted uppercase">What we built</h3>
            <ul className="mt-3 grid gap-2">
              {project.built.map((b) => (
                <li key={b} className="flex gap-2.5">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
                    <CheckIcon size={12} />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {project.stack && (
          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Stack">
            {project.stack.map((s) => (
              <li key={s} className="chip text-muted">
                {s}
              </li>
            ))}
          </ul>
        )}
        <p className="mt-5 flex gap-2 text-sm text-muted">
          <span className="live-dot mt-1.5" /> {project.result}
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          {project.cta.external ? (
            <a href={project.cta.href} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" data-track="Live Project Clicked" data-track-label={project.id}>
              {project.cta.label} <ExternalIcon />
            </a>
          ) : (
            <Link href={project.cta.href} className="btn btn-secondary">
              {project.cta.label} <ArrowRight />
            </Link>
          )}
          <Link href="/start-a-project#enquiry" className="btn btn-primary" data-track="Start Project Clicked" data-track-label={`case-${project.id}`}>
            Want something like this? <ArrowRight />
          </Link>
        </div>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
export function Packages() {
  return (
    <div className="grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-4">
      {packages.map((p, i) => (
        <article key={p.name} data-reveal style={d(i, 110)} className={`h-full ${p.featured ? 'ring-border rounded-[1.4rem]' : ''}`}>
          <div className={`card spot lift flex h-full flex-col p-7 ${p.featured ? 'border-transparent bg-surface' : ''}`}>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">{p.name}</h3>
              <span className="chip text-xs text-muted">{p.delivery}</span>
            </div>
            <p className="mt-5 font-display text-5xl font-extrabold">
              <span className="text-grad">{p.price}</span>
            </p>
            <p className="mt-1 text-sm text-muted">Delivered in {p.delivery}</p>
            <p className="mt-5 mb-7 text-muted">{p.description}</p>
            {p.includes.length > 0 && (
              <ul className="mb-7 grid gap-2 text-sm">
                {p.includes.map((x) => (
                  <li key={x} className="flex gap-2">
                    <CheckIcon className="mt-0.5 shrink-0 text-accent" size={16} />
                    {x}
                  </li>
                ))}
              </ul>
            )}
            <Link
              href={`/start-a-project?budget=${encodeURIComponent(p.name)}#enquiry`}
              className={`btn mt-auto ${p.featured ? 'btn-primary' : 'btn-secondary'}`}
              data-track="Start Project Clicked"
              data-track-label={`package-${p.name}`}
            >
              Choose {p.name} <ArrowRight />
            </Link>
          </div>
        </article>
      ))}
      <article data-reveal style={d(3, 110)} className="h-full">
        <div className="card spot lift flex h-full flex-col border-dashed p-7">
          <h3 className="text-lg font-bold">{customProject.name}</h3>
          <p className="mt-5 font-display text-5xl font-extrabold">Quote</p>
          <p className="mt-1 text-sm text-muted">{customProject.delivery}</p>
          <p className="mt-5 text-muted">{customProject.description}</p>
          <p className="mt-3 mb-7 text-sm text-muted">
            Also available hourly at{' '}
            {site.profiles.upwork.url ? (
              <a href={site.profiles.upwork.url} target="_blank" rel="noopener noreferrer" className="text-accent underline">
                {customProject.hourly}
              </a>
            ) : (
              customProject.hourly
            )}
            .
          </p>
          <Link href="/start-a-project#enquiry" className="btn btn-secondary mt-auto" data-track="Start Project Clicked" data-track-label="package-custom">
            Get a quote <ArrowRight />
          </Link>
        </div>
      </article>
    </div>
  );
}

/* ------------------------------------------------------------------ */
export function SafePaymentNote({ className = '' }: { className?: string }) {
  return (
    <div data-reveal className={`flex gap-4 rounded-2xl border border-accent/35 bg-accent/8 p-5 ${className}`}>
      <span className="text-accent">
        <AnimatedIcon name="shield" size={28} />
      </span>
      <div>
        <p className="font-semibold">Payment: {site.paymentMethods}</p>
        <p className="mt-1 text-muted">{site.safePayment}</p>
      </div>
    </div>
  );
}

/** Vertical timeline whose line draws itself on scroll. */
export function HowWeWork() {
  return (
    <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
      <ol data-reveal className="relative grid gap-5 pl-14">
        <span aria-hidden className="absolute top-3 bottom-3 left-[1.15rem] w-0.5 rounded bg-line" />
        <span aria-hidden className="grow-y absolute top-3 bottom-3 left-[1.15rem] w-0.5 rounded bg-gradient-to-b from-accent to-accent-2" />
        {processSteps.map((s, i) => (
          <li key={s.title} data-reveal="left" style={d(i, 140)} className="card spot relative p-5">
            <span className="absolute top-4 -left-14 grid size-10 place-items-center rounded-full bg-gradient-to-br from-accent to-accent-2 font-display font-extrabold text-accent-ink shadow-[0_0_0_6px_var(--bg),0_0_24px_-4px_var(--accent)]">
              {i + 1}
            </span>
            <h3 className="font-bold">{s.title}</h3>
            <p className="mt-1 text-sm text-muted">{s.body}</p>
          </li>
        ))}
      </ol>
      <div className="flex flex-col gap-5">
        <SafePaymentNote />
        <div data-reveal style={d(1)} className="card p-6">
          <h3 className="flex items-center gap-2 font-bold">
            <span className="text-accent">
              <AnimatedIcon name="form" size={22} />
            </span>
            Before we start, we confirm in writing
          </h3>
          <ul className="mt-4 grid gap-2.5 text-sm text-muted">
            {['Your business name and address', 'A phone or video call', 'What content you will supply, and by when', 'The payment method'].map((t) => (
              <li key={t} className="flex gap-2">
                <CheckIcon className="mt-0.5 shrink-0 text-accent" size={16} />
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div data-reveal style={d(2)} className="card flex items-center gap-5 p-6">
          <span className="font-display text-4xl font-extrabold">
            <span className="text-grad">50/50</span>
          </span>
          <span className="text-sm text-muted">50% advance to start, 50% on delivery — nothing more upfront.</span>
        </div>
      </div>
    </div>
  );
}

const STAGE_ICONS: AnimatedIconName[] = ['idea', 'design', 'code', 'rocket'];

/** Idea → Design → Build → Launch with a flowing connector (homepage). */
export function ProcessStrip() {
  return (
    <>
      <div className="relative">
        <svg aria-hidden className="absolute top-12 left-[12%] hidden h-2 w-[76%] lg:block" preserveAspectRatio="none" viewBox="0 0 100 2">
          <line x1="0" y1="1" x2="100" y2="1" stroke="var(--accent)" strokeOpacity=".5" strokeWidth="2" vectorEffect="non-scaling-stroke" className="dash-flow" />
        </svg>
        <ol className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stages.map((s, i) => (
            <li key={s.title} data-reveal style={d(i, 140)} className="card spot lift group p-6 text-center">
              <span className="mx-auto block w-fit">
                <IconTile name={STAGE_ICONS[i]} size="lg" />
              </span>
              <span className="mt-5 block font-display text-xs font-extrabold tracking-[0.2em] text-accent">STEP 0{i + 1}</span>
              <h3 className="mt-1 text-xl font-bold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
      <p data-reveal className="mt-8 text-center text-muted">
        {timingNote}
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-[auto_1fr]">
        <div data-reveal className="card flex items-center gap-4 p-5">
          <span className="font-display text-4xl font-extrabold">
            <span className="text-grad">50/50</span>
          </span>
          <span className="text-sm text-muted">
            50% advance to start,
            <br />
            50% on delivery.
          </span>
        </div>
        <SafePaymentNote />
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
export function FounderPhoto({ size = 'lg' }: { size?: 'sm' | 'lg' }) {
  const dim = size === 'lg' ? 'size-40 sm:size-52' : 'size-24';
  return (
    <div className={`ring-border shrink-0 rounded-[1.9rem] p-1 ${dim}`}>
      {site.founder.photo ? (
        <Image
          src={site.founder.photo}
          alt={`${site.founder.name}, ${site.founder.role} of ${site.name}`}
          width={416}
          height={416}
          className="size-full rounded-[1.7rem] object-cover"
        />
      ) : (
        // Initials until a real photo is added (never a stock photo).
        <div
          role="img"
          aria-label={`${site.founder.name} — photo coming soon`}
          className="grid size-full place-items-center rounded-[1.7rem] bg-surface font-display text-5xl font-extrabold"
        >
          <span className="text-grad">CK</span>
        </div>
      )}
    </div>
  );
}
