import type { Metadata } from 'next';
import Link from 'next/link';
import ClosingCta from '@/components/ClosingCta';
import EnquiryForm from '@/components/EnquiryForm';
import { ArrowRight, CloseIcon, CheckIcon, ExternalIcon } from '@/components/Icons';
import { IconTile } from '@/components/fx/AnimatedIcons';
import { AnimatedIcon } from '@/components/fx/AnimatedIcons';
import { BedGridBg } from '@/components/fx/Backgrounds';
import { BrowserFrame, PhoneFrame, Toast } from '@/components/fx/Frames';
import { d, vars } from '@/components/fx/Text';
import { PageHero, SectionHeading } from '@/components/sections';
import { getProject } from '@/content/projects';

export const metadata: Metadata = {
  title: 'Hostlify — Hostel and PG Management Software',
  description:
    'Hostlify helps hostel and PG owners run bookings, staff, complaints and Razorpay payments in one app. Early access is free up to 30 beds. Book a demo.',
  alternates: { canonical: '/work/hostlify' },
};

const features = [
  { icon: 'bed', title: 'Bed booking in 3 steps', body: 'Residents pick a bed and book without back-and-forth on WhatsApp.' },
  { icon: 'users', title: 'Staff roles', body: 'Give wardens and staff the access they need — and nothing more.' },
  { icon: 'chat', title: 'Complaint categories', body: 'Every complaint is logged, categorised and trackable instead of lost in chats.' },
  { icon: 'card', title: 'Online payments via Razorpay', body: 'Collect payments online instead of chasing cash.' },
] as const;

const before = ['Beds tracked in a paper register', 'Enquiries scattered across WhatsApp chats', 'Complaints remembered — or forgotten', 'Chasing residents for cash'];
const after = ['Bed booking in 3 steps', 'Every enquiry in one place', 'Complaints logged by category', 'Payments online via Razorpay'];

function HeroPhone({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative mx-auto w-full max-w-md">
      <BedGridBg cols={8} rows={8} className="absolute inset-0 m-auto aspect-square w-full opacity-70 [mask-image:radial-gradient(circle,#000_30%,transparent_72%)]" />
      <PhoneFrame src={src} alt={alt} className="float relative mx-auto w-56 sm:w-64" />
      <Toast className="float absolute top-[14%] -left-1 sm:-left-8" style={vars({ '--d': '-1.5s' })} icon={<AnimatedIcon name="bed" size={18} />} title="Bed booked" note="Room 2 • in 3 steps" />
      <Toast className="float absolute top-[46%] -right-1 sm:-right-10" style={vars({ '--d': '-3s' })} icon={<AnimatedIcon name="card" size={18} />} title="Payment received" note="online via Razorpay" />
      <Toast className="float absolute bottom-[10%] -left-1 sm:-left-4" style={vars({ '--d': '-4.5s' })} icon={<AnimatedIcon name="chat" size={18} />} title="Complaint logged" note="category: maintenance" />
    </div>
  );
}

export default function HostlifyPage() {
  const p = getProject('hostlify');
  return (
    <div data-page="hostlify">
      <PageHero
        bg={
          <div aria-hidden className="bg-noise pointer-events-none absolute inset-0 overflow-hidden">
            <div className="bg-grid absolute inset-0" />
            <div className="aurora-blob -top-40 -left-20 h-[30rem] w-[30rem]" style={{ background: 'var(--accent)', opacity: 0.22 }} />
            <div className="aurora-blob -right-20 bottom-[-12rem] h-[26rem] w-[26rem]" style={{ background: 'var(--accent-2)', opacity: 0.16 }} />
          </div>
        }
        eyebrow={
          <>
            <span className="live-dot" /> Hostlify • early access open
          </>
        }
        title={['Run your hostel or PG,', { text: 'not spreadsheets.', grad: true }]}
        intro={`${p.problem} Hostlify brings beds, staff, complaints and payments into one app — built for Indian hostels and PGs.`}
        visual={<HeroPhone src={p.images!.mobile!} alt={p.images!.mobileAlt!} />}
      >
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link href="#enquiry" className="btn btn-primary" data-magnetic data-track="Start Project Clicked" data-track-label="hostlify-header">
            Book a 15-minute Demo <ArrowRight />
          </Link>
          <a href={p.live!.href} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" data-magnetic data-track="Live Project Clicked" data-track-label="hostlify">
            Visit hostlify.in <ExternalIcon />
          </a>
        </div>
        <p className="ring-border mt-7 inline-flex rounded-full">
          <span className="rounded-full bg-surface px-4 py-2 text-sm font-bold">🎉 Free up to 30 beds during early access</span>
        </p>
      </PageHero>

      {/* Before / after */}
      <section className="container-page py-20 sm:py-28" aria-labelledby="ba-title">
        <SectionHeading
          id="ba-title"
          center
          eyebrow="Before and after"
          title={
            <>
              From register and WhatsApp chaos to <span className="text-grad">one calm app.</span>
            </>
          }
        />
        <div className="grid gap-5 md:grid-cols-2">
          <div data-reveal="left" className="card p-7 opacity-90">
            <h3 className="flex items-center gap-2 text-lg font-bold text-muted">
              <span className="grid size-8 place-items-center rounded-full bg-red-500/15 text-red-400">
                <CloseIcon size={16} />
              </span>
              Without Hostlify
            </h3>
            <ul className="mt-5 grid gap-3">
              {before.map((b) => (
                <li key={b} className="flex items-center gap-3 rounded-xl border border-line px-4 py-3 text-muted line-through decoration-red-400/50">
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div data-reveal="right" className="ring-border rounded-[1.3rem]">
            <div className="card h-full border-transparent bg-surface p-7">
              <h3 className="flex items-center gap-2 text-lg font-bold">
                <span className="grid size-8 place-items-center rounded-full bg-accent text-accent-ink">
                  <CheckIcon size={16} />
                </span>
                With Hostlify
              </h3>
              <ul className="mt-5 grid gap-3">
                {after.map((a, i) => (
                  <li key={a} data-reveal style={d(i, 120)} className="flex items-center gap-3 rounded-xl border border-accent/30 bg-accent/8 px-4 py-3 font-semibold">
                    <CheckIcon size={16} className="shrink-0 text-accent" /> {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative overflow-hidden border-y border-line bg-surface/40 py-20 sm:py-28" aria-labelledby="hostlify-features">
        <BedGridBg cols={20} rows={6} className="absolute inset-x-0 bottom-0 p-4 opacity-25 [mask-image:linear-gradient(transparent,#000)]" />
        <div className="container-page relative">
          <SectionHeading id="hostlify-features" eyebrow="What Hostlify does" title="Everything a hostel owner juggles, in one place" />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <li key={f.title} data-reveal style={d(i, 110)} className="card spot lift group p-6">
                <IconTile name={f.icon} size="lg" />
                <h3 className="mt-6 text-lg font-bold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted">{f.body}</p>
              </li>
            ))}
          </ul>
          {p.stack && <p className="mt-8 text-sm text-muted">Built with {p.stack.join(' · ')}</p>}
        </div>
      </section>

      {/* Desktop screenshot */}
      <section className="container-page py-20 sm:py-28" aria-labelledby="hostlify-shot">
        <h2 id="hostlify-shot" className="sr-only">
          Hostlify website
        </h2>
        <div data-reveal="zoom" className="group relative mx-auto max-w-5xl">
          <div aria-hidden className="absolute -inset-10 rounded-[3rem] bg-gradient-to-r from-accent/25 to-accent-2/20 blur-3xl" />
          <div data-tilt className="relative">
            <BrowserFrame src={p.images!.desktop} alt={p.images!.alt} url="hostlify.in" sizes="(min-width: 1024px) 64rem, 100vw" />
          </div>
        </div>
      </section>

      {/* Demo form */}
      <section id="enquiry" className="container-page grid scroll-mt-24 gap-10 pb-20 sm:pb-28 lg:grid-cols-[1fr_1.4fr]" aria-labelledby="demo-title">
        <div data-reveal="left">
          <p className="eyebrow">Book a demo</p>
          <h2 id="demo-title" className="mt-4 text-3xl font-extrabold sm:text-4xl">
            See Hostlify on a <span className="text-grad">15-minute call.</span>
          </h2>
          <p className="mt-4 text-muted">Tell us about your hostel or PG — number of beds and what you manage today. We’ll show you how Hostlify handles it, live.</p>
          <p className="mt-4 text-muted">
            Looking for a booking website instead? Our{' '}
            <Link href="/start-a-project#packages" className="text-accent underline">
              hostel and PG website packages
            </Link>{' '}
            start at $300.
          </p>
        </div>
        <div data-reveal="right">
          <EnquiryForm title="Request your Hostlify demo" defaultNeed="Hostlify demo (15 minutes)" />
        </div>
      </section>

      <ClosingCta />
    </div>
  );
}
