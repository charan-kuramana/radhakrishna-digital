import Link from 'next/link';
import ClosingCta from '@/components/ClosingCta';
import Faq from '@/components/Faq';
import HeroPipeline from '@/components/hero/HeroPipeline';
import { ArrowRight, CheckIcon, ExternalIcon } from '@/components/Icons';
import ProofStrip from '@/components/ProofStrip';
import SocialStrip from '@/components/SocialStrip';
import Stats from '@/components/Stats';
import { AnimatedIcon } from '@/components/fx/AnimatedIcons';
import { BedGridBg } from '@/components/fx/Backgrounds';
import { PhoneFrame, Toast } from '@/components/fx/Frames';
import Marquee, { TECH, TechChip } from '@/components/fx/Marquee';
import { AnimatedHeading, d, vars } from '@/components/fx/Text';
import Typewriter from '@/components/fx/Typewriter';
import { FounderPhoto, ProcessStrip, ProjectCard, SectionHeading, ServiceCard } from '@/components/sections';
import { getProject, projects } from '@/content/projects';
import { services } from '@/content/services';
import { site } from '@/content/site';
import { testimonials } from '@/content/social-proof';

const WIDE = new Set([0, 3, 4, 7]); // bento layout: 2+1 / 1+2 / 2+1 / 1+2

export default function HomePage() {
  const hostlify = getProject('hostlify');
  const featured = projects.filter((p) => p.live);

  return (
    <div data-page="home">
      {/* 1. HERO */}
      <section className="spot-area relative -mt-16 overflow-hidden pt-16 lg:-mt-[4.5rem] lg:pt-[4.5rem]" aria-labelledby="hero-title">
        {/* Hero v3 background: aurora + moving perspective floor + horizon glow + cursor spotlight */}
        <div aria-hidden className="bg-noise pointer-events-none absolute inset-0 overflow-hidden">
          <div className="aurora-blob -top-56 -left-40 h-[38rem] w-[38rem]" style={{ background: 'var(--accent)', opacity: 0.18 }} />
          <div className="aurora-blob -top-40 right-[-10rem] h-[34rem] w-[34rem] [animation-delay:-9s]" style={{ background: 'var(--accent-2)', opacity: 0.2 }} />
          <div className="hero-horizon" />
          <div className="hero-floor" />
          <div className="absolute inset-0" style={{ background: 'radial-gradient(520px circle at var(--mx, 70%) var(--my, 40%), color-mix(in srgb, var(--accent) 12%, transparent), transparent 60%)' }} />
        </div>
        <div className="container-page relative grid items-center gap-14 pt-10 pb-24 md:pt-14 lg:min-h-[calc(100svh-4.5rem)] lg:grid-cols-[1fr_1.08fr] lg:gap-10">
          <div>
            <p className="anim-up chip text-muted">
              <span className="live-dot" /> End to end:{' '}
              <Typewriter words={['logo and branding', 'websites', 'web applications', 'mobile apps', 'hosting and deployment', 'AI features']} className="font-bold text-accent" />
            </p>
            <AnimatedHeading
              id="hero-title"
              className="mt-6 text-[2.3rem] leading-[1.06] font-extrabold sm:text-5xl lg:text-[3.25rem]"
              parts={['Logo, website, apps, hosting and AI —', { text: 'one team', grad: true }, 'takes your business from', { text: 'idea to launch.', grad: true, mark: true }]}
            />
            <p className="anim-up mt-6 max-w-xl text-lg text-muted" style={d(9, 100)}>
              Radhakrishna Digital is a web studio in Vijayawada, India. We design your brand, build your website, web and mobile apps, add AI where it saves
              time, then host and look after it all — so you work with one team instead of five. We even build our own products, like{' '}
              <Link href="/work/hostlify" className="font-semibold text-ink underline decoration-accent decoration-2 underline-offset-4">
                Hostlify
              </Link>
              .
            </p>
            <div className="anim-up mt-9 flex flex-col gap-3 sm:flex-row" style={d(11, 100)}>
              <Link href="/start-a-project" className="btn btn-primary px-7 text-base" data-magnetic data-track="Start Project Clicked" data-track-label="hero">
                Start a Project <ArrowRight />
              </Link>
              <Link href="/services" className="btn btn-secondary px-7 text-base" data-magnetic>
                Explore Services
              </Link>
            </div>
            {/* proof row: everything under one roof */}
            <div className="anim-up mt-9 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4" style={d(13, 100)}>
              <div className="flex -space-x-2.5">
                {(['brand', 'web', 'stack', 'mobile', 'cloud', 'ai'] as const).map((icon) => (
                  <span key={icon} className="grid size-11 place-items-center rounded-full border-2 border-bg bg-surface text-accent shadow-lg">
                    <AnimatedIcon name={icon} size={20} />
                  </span>
                ))}
              </div>
              <p className="text-sm text-muted">
                <span className="font-bold text-ink">One point of contact</span> from first call to launch
                <br />
                {featured.length} live projects • Since {site.sinceShort} • {site.city}
              </p>
            </div>
          </div>
          <div className="anim-up" style={d(6, 100)}>
            <HeroPipeline />
          </div>
        </div>
        {/* scroll cue */}
        <div aria-hidden className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 lg:block">
          <span className="flex h-10 w-6 justify-center rounded-full border-2 border-line-strong pt-2">
            <span className="h-2 w-1 animate-bounce rounded-full bg-accent" />
          </span>
        </div>
      </section>

      {/* 2. PROOF */}
      <ProofStrip />
      <Stats />

      {/* 3. SERVICES — bento */}
      <section className="container-page py-20 sm:py-24" aria-labelledby="services-title">
        <SectionHeading
          id="services-title"
          eyebrow="What we build"
          title={
            <>
              Everything your business needs online, <span className="text-grad">under one roof.</span>
            </>
          }
          intro="From your logo to your app store listing — each service with a clear outcome and a price signal. Packages start at $300; everything else gets a written quote."
          action={
            <Link href="/services" className="btn btn-secondary">
              All services <ArrowRight />
            </Link>
          }
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <ServiceCard key={s.id} service={s} i={i} wide={WIDE.has(i)} />
          ))}
        </div>
      </section>

      {/* tech marquee */}
      <section aria-label="Technology we use" className="border-y border-line bg-surface/40 py-8">
        <Marquee label="Technology we use" items={TECH.map((t) => <TechChip key={t} name={t} />)} />
        <Marquee label="Technology we use" reverse speed="48s" className="mt-4" items={[...TECH].reverse().map((t) => <TechChip key={t} name={t} />)} />
      </section>

      {/* 4. FEATURED WORK */}
      <section className="container-page py-20 sm:py-28" aria-labelledby="work-title">
        <SectionHeading
          id="work-title"
          eyebrow="Selected work"
          title={
            <>
              Real projects you can <span className="text-grad">open right now.</span>
            </>
          }
          action={
            <Link href="/work" className="btn btn-secondary">
              All case studies <ArrowRight />
            </Link>
          }
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <ProjectCard key={p.id} project={p} i={i} />
          ))}
        </div>
      </section>

      {/* 5. HOSTLIFY SPOTLIGHT */}
      <section className="container-page pb-20 sm:pb-28" aria-labelledby="hostlify-title">
        <div data-reveal="zoom" className="relative overflow-hidden rounded-[2rem] border border-[#2dd4bf]/25 bg-[#04181a] p-6 text-[#f4f7fb] sm:p-10 lg:p-14">
          <BedGridBg cols={16} rows={7} className="absolute inset-0 p-6 opacity-40 [--accent:#2dd4bf] [mask-image:linear-gradient(90deg,transparent,#000_60%)]" />
          <div aria-hidden className="aurora-blob -top-24 -right-16 h-80 w-80" style={{ background: '#2dd4bf', opacity: 0.25 }} />
          <div className="relative grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-[#5eead4]/30 bg-[#5eead4]/10 px-3 py-1.5 text-xs font-bold tracking-[0.14em] text-[#5eead4] uppercase">
                <span className="live-dot" /> Our product • early access open
              </p>
              <h2 id="hostlify-title" className="mt-5 text-3xl font-extrabold sm:text-[2.7rem] sm:leading-[1.1]">
                Hostlify: run your hostel, <span className="bg-gradient-to-r from-[#5eead4] to-[#a3e635] bg-clip-text text-transparent">not spreadsheets.</span>
              </h2>
              <p className="mt-4 text-lg text-[#b7c6d8]">{hostlify.problem} Hostlify puts it in one app.</p>
              <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                {hostlify.built.map((b, i) => (
                  <li key={b} data-reveal style={d(i, 100)} className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-3 text-sm font-semibold">
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-[#2dd4bf] text-[#04211d]">
                      <CheckIcon size={13} />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link href="/work/hostlify#enquiry" className="btn btn-primary [--accent-2:#a3e635] [--accent-ink:#04211d] [--accent:#2dd4bf]" data-magnetic data-track="Start Project Clicked" data-track-label="hostlify-demo">
                  Book a 15-minute Demo <ArrowRight />
                </Link>
                <a href="https://hostlify.in/" target="_blank" rel="noopener noreferrer" className="btn border border-white/25 text-white hover:border-[#5eead4]" data-track="Live Project Clicked" data-track-label="hostlify">
                  Visit hostlify.in <ExternalIcon />
                </a>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-sm">
              <PhoneFrame src={hostlify.images!.mobile!} alt={hostlify.images!.mobileAlt!} className="float mx-auto w-56 sm:w-64" />
              <Toast
                className="float absolute top-[12%] -left-2 text-[#f4f7fb] sm:-left-12 [--accent:#2dd4bf] [--line:rgb(255_255_255/0.12)] [--surface:#0b2224]"
                style={vars({ '--d': '-2s' })}
                icon={<AnimatedIcon name="bed" size={18} />}
                title="Bed booked"
                note="3 steps • no WhatsApp back-and-forth"
              />
              <Toast
                className="float absolute bottom-[14%] -right-2 text-[#f4f7fb] sm:-right-10 [--accent:#a3e635] [--line:rgb(255_255_255/0.12)] [--surface:#0b2224]"
                style={vars({ '--d': '-4s' })}
                icon={<AnimatedIcon name="card" size={18} />}
                title="Payment received"
                note="online via Razorpay"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6. PROCESS AND PAYMENT */}
      <section className="relative overflow-hidden border-y border-line bg-surface/40 py-20 sm:py-28" aria-labelledby="process-title">
        <div aria-hidden className="bg-dots pointer-events-none absolute inset-0 opacity-60" />
        <div className="container-page relative">
          <SectionHeading
            id="process-title"
            center
            eyebrow="How we work"
            title={
              <>
                From idea to launch, with <span className="text-grad">clarity</span> at every step.
              </>
            }
            intro="Clear communication, written scope and normal, verifiable payments. You always know what we’re building and what comes next."
          />
          <ProcessStrip />
        </div>
      </section>

      {/* 7. ABOUT TEASER */}
      <section className="container-page py-20 sm:py-28" aria-labelledby="about-title">
        <div data-reveal className="card spot relative overflow-hidden p-6 sm:p-12">
          <div aria-hidden className="warm-conic -top-40 -right-40 h-96 w-96" style={{ opacity: 0.18 }} />
          <div className="relative flex flex-col gap-10 md:flex-row md:items-center">
            <FounderPhoto />
            <div>
              <p className="eyebrow">Who you’ll work with</p>
              <h2 id="about-title" className="mt-4 text-3xl font-extrabold sm:text-4xl">
                {site.founder.name}, <span className="text-grad">Founder</span>
              </h2>
              <p className="mt-5 max-w-2xl text-lg text-muted">
                Founded by {site.founder.name}, a full-stack developer with 4+ years of professional experience, Radhakrishna Digital has been
                building for clients since {site.since}. We start with the business problem, not the technology.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/about" className="btn btn-secondary">
                  More about the studio <ArrowRight />
                </Link>
                <span className="chip text-muted">
                  <span className="text-accent">
                    <AnimatedIcon name="pin" size={16} />
                  </span>
                  {site.location}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS — only real ones; otherwise recent work */}
      <section className="container-page pb-20 sm:pb-28" aria-labelledby="proof-title">
        {testimonials.length > 0 ? (
          <>
            <SectionHeading id="proof-title" eyebrow="Client words" title="What clients say" />
            <div className="grid gap-5 md:grid-cols-2">
              {testimonials.map((t, i) => (
                <figure key={t.name + t.project} data-reveal style={d(i)} className="card spot p-7">
                  <blockquote className="text-lg">“{t.quote}”</blockquote>
                  <figcaption className="mt-4 text-sm text-muted">
                    — {t.name}, {t.business} · {t.link ? <a href={t.link} target="_blank" rel="noopener noreferrer" className="underline">{t.project}</a> : t.project}
                  </figcaption>
                </figure>
              ))}
            </div>
          </>
        ) : (
          <>
            <SectionHeading
              id="proof-title"
              eyebrow="Recent work"
              title={
                <>
                  Don’t take our word for it — <span className="text-grad">open the sites.</span>
                </>
              }
              intro="Every project below is live. Check them on your phone."
            />
            <ul className="grid gap-4 md:grid-cols-3">
              {featured.map((p, i) => (
                <li key={p.id} data-reveal style={d(i)}>
                  <a
                    href={p.live!.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card spot lift group flex min-h-24 items-center justify-between gap-3 p-6 no-underline"
                    data-track="Live Project Clicked"
                    data-track-label={`recent-${p.id}`}
                  >
                    <span>
                      <span className="flex items-center gap-2 font-bold">
                        <span className="live-dot" /> {p.name}
                      </span>
                      <span className="mt-1 block text-sm text-muted">{p.live!.label}</span>
                    </span>
                    <span className="grid size-10 place-items-center rounded-full border border-line text-accent transition-transform duration-300 group-hover:rotate-45">
                      <ArrowRight size={16} className="-rotate-45" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>

      {/* FAQ */}
      <section className="border-y border-line bg-surface/40 py-20 sm:py-28" aria-labelledby="faq-title">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeading
            id="faq-title"
            eyebrow="Questions"
            title={
              <>
                Answers before you <span className="text-grad">even ask.</span>
              </>
            }
            intro="The things clients ask us first — about payment, timing and who does the work."
          />
          <Faq />
        </div>
      </section>

      {/* 9. SOCIAL */}
      <SocialStrip />

      {/* 10. FINAL CTA */}
      <ClosingCta variant="home" />
    </div>
  );
}
