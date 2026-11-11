import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ClosingCta from '@/components/ClosingCta';
import { ArrowRight } from '@/components/Icons';
import { IconTile, type AnimatedIconName } from '@/components/fx/AnimatedIcons';
import { GridBeamsBg } from '@/components/fx/Backgrounds';
import Marquee, { TECH, TechChip } from '@/components/fx/Marquee';
import { d, vars } from '@/components/fx/Text';
import { PageHero, SectionHeading, ServiceRow } from '@/components/sections';
import { services } from '@/content/services';

export const metadata: Metadata = {
  title: 'Services — Branding, Websites, Web and Mobile Apps, Hosting and AI',
  description:
    'Logo and branding, business websites, booking systems, e-commerce, full-stack web apps, mobile apps, AI features, domain and hosting — with clear deliverables and packages from $300.',
  alternates: { canonical: '/services' },
};

function ServiceOrbit() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[26rem] [--r:8.4rem] sm:[--r:11.5rem]">
      <span aria-hidden className="absolute inset-[6%] rounded-full border border-dashed border-line-strong" />
      <span aria-hidden className="absolute inset-[28%] rounded-full border border-line" />
      <span aria-hidden className="absolute inset-[36%] rounded-full bg-accent/20 blur-2xl" />
      <div className="absolute top-1/2 left-1/2 grid size-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-3xl bg-white shadow-[0_0_60px_-10px_var(--accent)]">
        <Image src="/images/brand/logo-mark.webp" alt="" width={64} height={64} />
      </div>
      <div className="orbit" aria-hidden>
        {services.map((s, i) => (
          <div key={s.id} className="orbit-item" style={vars({ '--i': i, '--n': services.length })}>
            <div>
              <IconTile name={s.icon as AnimatedIconName} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <div data-page="services">
      <PageHero
        bg={<GridBeamsBg />}
        eyebrow="Services"
        title={['What we build, what you get,', { text: 'and what it costs.', grad: true }]}
        intro="Every service starts with your business problem. Packages start at $300 for hostel and PG booking websites; everything else gets a written quote before any work begins."
        visual={<ServiceOrbit />}
      >
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link href="/start-a-project#enquiry" className="btn btn-primary" data-magnetic data-track="Start Project Clicked" data-track-label="services-header">
            Get a Quote <ArrowRight />
          </Link>
          <Link href="/start-a-project#packages" className="btn btn-secondary" data-magnetic>
            See packages
          </Link>
        </div>
      </PageHero>

      {/* quick index */}
      <nav aria-label="Jump to a service" className="sticky top-16 z-30 border-b border-line bg-bg/80 backdrop-blur-xl lg:top-[4.5rem]">
        <ul className="container-page flex gap-2 overflow-x-auto py-3 [scrollbar-width:none]">
          {services.map((s) => (
            <li key={s.id} className="shrink-0">
              <a href={`#${s.id}`} className="chip min-h-10 text-muted no-underline transition-colors hover:border-accent hover:text-ink">
                {s.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <section className="container-page grid gap-24 py-20 sm:gap-32 sm:py-28" aria-label="All services">
        {services.map((s, i) => (
          <ServiceRow key={s.id} service={s} i={i} />
        ))}
      </section>

      <section className="relative overflow-hidden border-y border-line bg-surface/40 py-20 sm:py-24" aria-labelledby="principle">
        <div aria-hidden className="bg-dots pointer-events-none absolute inset-0 opacity-60" />
        <div className="container-page relative">
          <SectionHeading
            id="principle"
            center
            eyebrow="Our technology principle"
            title={
              <>
                Use technology with <span className="text-grad">purpose.</span>
              </>
            }
            intro="We choose the architecture for your goals, users, scale, budget and long-term roadmap — not the other way round."
          />
          <ol className="mx-auto grid max-w-4xl gap-3 sm:grid-cols-4">
            {['Right problem', 'Right architecture', 'Right technology', 'Better product'].map((s, i) => (
              <li key={s} data-reveal style={d(i, 160)} className="relative">
                <div className={`card spot p-5 text-center font-display font-bold ${i === 3 ? 'ring-border border-transparent bg-surface' : ''}`}>
                  <span className="block text-xs tracking-[0.2em] text-accent">0{i + 1}</span>
                  <span className="mt-1 block">{s}</span>
                </div>
                {i < 3 && (
                  <span aria-hidden className="absolute top-1/2 -right-3 z-10 hidden -translate-y-1/2 animate-pulse text-accent sm:block">
                    →
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-label="Technology we use" className="py-10">
        <Marquee label="Technology we use" speed="36s" items={TECH.map((t) => <TechChip key={t} name={t} />)} />
      </section>

      <ClosingCta />
    </div>
  );
}
