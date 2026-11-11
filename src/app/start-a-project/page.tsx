import type { Metadata } from 'next';
import ClosingCta from '@/components/ClosingCta';
import EnquiryForm from '@/components/EnquiryForm';
import Faq from '@/components/Faq';
import { AnimatedIcon, type AnimatedIconName } from '@/components/fx/AnimatedIcons';
import Starfield from '@/components/fx/Starfield';
import { d, vars } from '@/components/fx/Text';
import { HowWeWork, PageHero, Packages, SectionHeading } from '@/components/sections';
import { processSteps } from '@/content/packages';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Start a Project — Packages, Process and Payment Terms',
  description:
    'Website packages from $300 (3 days), $500 (5 days) and $800 (10 days), or a custom quote. 50% advance, 50% on delivery, safe and verifiable payment.',
  alternates: { canonical: '/start-a-project' },
};

const PATH = 'M20 250 C 90 250, 90 150, 160 150 S 230 60, 300 60 S 370 150, 440 120 S 500 30, 540 30';
const NODES: { x: number; y: number; icon: AnimatedIconName }[] = [
  { x: 20, y: 250, icon: 'chat' },
  { x: 160, y: 150, icon: 'card' },
  { x: 300, y: 60, icon: 'design' },
  { x: 440, y: 120, icon: 'code' },
  { x: 540, y: 30, icon: 'rocket' },
];

/** The five steps as a journey; a glowing dot travels the path (CSS offset-path). */
function Journey() {
  return (
    <div className="relative mx-auto w-full max-w-xl" aria-hidden>
      <svg viewBox="0 0 560 290" className="w-full overflow-visible">
        <defs>
          <linearGradient id="jg" x1="0" x2="1">
            <stop offset="0" stopColor="var(--accent)" />
            <stop offset="1" stopColor="var(--accent-2)" />
          </linearGradient>
        </defs>
        <path d={PATH} fill="none" stroke="var(--line-strong)" strokeWidth="2" />
        <path d={PATH} fill="none" stroke="url(#jg)" strokeWidth="3" pathLength={100} className="draw" strokeLinecap="round" />
        <circle
          r="7"
          fill="#fff"
          stroke="var(--accent)"
          strokeWidth="4"
          style={vars({
            offsetPath: `path('${PATH}')`,
            animation: 'journey 6s cubic-bezier(.6,0,.4,1) infinite',
            filter: 'drop-shadow(0 0 8px var(--accent))',
          })}
        />
      </svg>
      {NODES.map((n, i) => (
        <div key={i} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${(n.x / 560) * 100}%`, top: `${(n.y / 290) * 100}%` }}>
          <span className="glass grid size-12 place-items-center rounded-2xl text-accent shadow-[0_0_30px_-8px_var(--accent)] sm:size-14">
            <AnimatedIcon name={n.icon} size={24} />
          </span>
          <span className="absolute top-full left-1/2 mt-2 hidden w-28 -translate-x-1/2 text-center text-[0.7rem] font-semibold text-muted sm:block">
            {processSteps[i].title}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function StartProjectPage() {
  return (
    <div data-page="start">
      <PageHero
        bg={
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            <Starfield />
            <div className="aurora-blob -top-40 left-1/3 h-[30rem] w-[30rem]" style={{ background: 'var(--accent)', opacity: 0.22 }} />
            <div className="aurora-blob -right-20 bottom-[-14rem] h-[28rem] w-[28rem]" style={{ background: 'var(--accent-2)', opacity: 0.18 }} />
          </div>
        }
        eyebrow="Start a project"
        title={['Packages, process and payment —', { text: 'all upfront.', grad: true }]}
        intro={`Pick a package or ask for a quote. ${site.replyPromise}, and nothing starts until the scope is agreed in writing.`}
        visual={<Journey />}
      >
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a href="#packages" className="btn btn-primary" data-magnetic>
            See packages
          </a>
          <a href="#enquiry" className="btn btn-secondary" data-magnetic data-track="Start Project Clicked" data-track-label="start-header">
            Send an enquiry
          </a>
        </div>
      </PageHero>

      <section id="packages" className="container-page scroll-mt-24 py-20 sm:py-28" aria-labelledby="packages-title">
        <SectionHeading
          id="packages-title"
          center
          eyebrow="Starter packages"
          title={
            <>
              Hostel and PG booking websites, <span className="text-grad">priced upfront.</span>
            </>
          }
          intro="The same packages as our Fiverr gig. Business websites, e-commerce and custom systems are quoted per project."
        />
        <Packages />
      </section>

      <section className="relative overflow-hidden border-y border-line bg-surface/40 py-20 sm:py-28" aria-labelledby="how-title">
        <div aria-hidden className="bg-dots pointer-events-none absolute inset-0 opacity-50" />
        <div className="container-page relative">
          <SectionHeading id="how-title" eyebrow="How we work" title="Five steps, agreed in writing" />
          <HowWeWork />
        </div>
      </section>

      <section id="enquiry" className="container-page grid scroll-mt-24 gap-10 py-20 sm:py-28 lg:grid-cols-[1fr_1.6fr]" aria-labelledby="enquiry-title">
        <div data-reveal="left" className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow">Send an enquiry</p>
          <h2 id="enquiry-title" className="mt-4 text-3xl font-extrabold sm:text-4xl">
            Tell us what <span className="text-grad">you need.</span>
          </h2>
          <p className="mt-4 text-muted">Seven short fields. {site.founder.firstName} reads every enquiry personally and replies within 24 hours on working days.</p>
          <ul className="mt-6 grid gap-3">
            {[
              ['clock', site.replyPromise],
              ['shield', 'Scope agreed in writing before any payment'],
              ['mail', `Prefer email? ${site.email.primary}`],
            ].map(([icon, text], i) => (
              <li key={text} data-reveal style={d(i)} className="flex items-center gap-3 text-sm">
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-accent/12 text-accent">
                  <AnimatedIcon name={icon as AnimatedIconName} size={18} />
                </span>
                <span className="break-all sm:break-normal">{text}</span>
              </li>
            ))}
          </ul>
        </div>
        <div data-reveal="right">
          <EnquiryForm />
        </div>
      </section>

      <section className="border-t border-line bg-surface/40 py-20 sm:py-28" aria-labelledby="faq-title">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeading id="faq-title" eyebrow="Questions" title="Before you send it" />
          <Faq />
        </div>
      </section>

      <ClosingCta />
    </div>
  );
}
