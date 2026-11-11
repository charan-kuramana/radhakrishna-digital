import type { Metadata } from 'next';
import Link from 'next/link';
import ClosingCta from '@/components/ClosingCta';
import { ArrowRight, ExternalIcon, LinkedInIcon } from '@/components/Icons';
import { SocialList } from '@/components/SocialIcons';
import { AnimatedIcon, IconTile, type AnimatedIconName } from '@/components/fx/AnimatedIcons';
import { WarmBg } from '@/components/fx/Backgrounds';
import { d } from '@/components/fx/Text';
import { FounderPhoto, PageHero, SectionHeading } from '@/components/sections';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'About — Charan Kuramana and the Studio in Vijayawada',
  description:
    'Radhakrishna Digital is a web studio in Vijayawada, India, founded by Charan Kuramana and building for clients since February 2024.',
  alternates: { canonical: '/about' },
};

const values: { icon: AnimatedIconName; label: string; title: string; body: string }[] = [
  { icon: 'idea', label: 'Business first', title: 'We start with the problem, not the technology.', body: 'We take time to understand what you’re trying to achieve before deciding how it should be built.' },
  { icon: 'design', label: 'Built with purpose', title: 'Every feature should have a reason.', body: 'We create experiences that solve real problems rather than adding unnecessary complexity.' },
  { icon: 'rocket', label: 'Engineered to grow', title: 'Build for today. Prepare for tomorrow.', body: 'We create technical foundations that evolve as your users and business grow.' },
  { icon: 'users', label: 'A partnership', title: 'We work with you, not just for you.', body: 'Clear communication, transparency and collaboration from first call to launch.' },
];

/** Only dated facts we can verify; undated milestones are labelled by stage. */
const timeline = [
  { when: 'Feb 2024', title: 'Radhakrishna Digital founded', body: 'The studio starts building for clients from Vijayawada.', href: undefined },
  { when: 'Jan 2025', title: 'RadhaKrishna Fashions store completed', body: 'A responsive e-commerce store for ethnic wear goes live.', href: '/work#rk-fashions' },
  { when: 'Healthcare', title: 'AP Superspeciality website live', body: 'A modern practice website for a dental super-speciality hospital.', href: '/work#ap-superspeciality' },
  { when: 'Now', title: 'Hostlify early access open', body: 'Our own product for hostel and PG owners — free up to 30 beds.', href: '/work/hostlify' },
];

function FounderCard() {
  return (
    <div className="relative mx-auto w-full max-w-sm">
      <div data-tilt className="glass relative rounded-[2rem] p-7 text-center">
        <div className="mx-auto w-fit">
          <FounderPhoto />
        </div>
        <h2 className="mt-6 text-2xl font-extrabold">{site.founder.name}</h2>
        <p className="mt-1 font-semibold text-accent">{site.founder.role}</p>
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          <span className="chip text-muted">
            <span className="text-accent">
              <AnimatedIcon name="pin" size={15} />
            </span>
            {site.location}
          </span>
          <span className="chip text-muted">
            <span className="text-accent">
              <AnimatedIcon name="clock" size={15} />
            </span>
            Since {site.since}
          </span>
        </div>
      </div>
      <span aria-hidden className="float glass absolute -top-4 -right-3 rounded-2xl px-4 py-2 text-sm font-bold">
        4+ yrs <span className="text-accent">full-stack</span>
      </span>
      <span aria-hidden className="float glass absolute top-[38%] -left-4 rounded-2xl px-4 py-2 text-sm font-bold sm:-left-10 [animation-delay:-3s]">
        <span className="text-accent">3</span> live projects
      </span>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div data-page="about">
      <PageHero
        bg={<WarmBg />}
        eyebrow="About Radhakrishna Digital"
        title={['A real person and a real studio', { text: 'behind every project.', grad: true }]}
        intro={
          <>
            Founded by {site.founder.name}, a full-stack developer with 4+ years of professional experience, Radhakrishna Digital has been
            building for clients since {site.since}. We work with founders, hostels and PGs, clinics, stores and small teams — starting with
            the business problem, not the technology.
          </>
        }
        visual={<FounderCard />}
      >
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          {site.founder.linkedin && (
            <a href={site.founder.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-primary" data-magnetic aria-label={`${site.founder.name} on LinkedIn`}>
              <LinkedInIcon /> Connect on LinkedIn
            </a>
          )}
          <a href={site.socials.linkedin.url} target="_blank" rel="noopener noreferrer" className={`btn ${site.founder.linkedin ? 'btn-secondary' : 'btn-primary'}`} data-magnetic>
            <LinkedInIcon /> Studio on LinkedIn
          </a>
          <Link href="/work" className="btn btn-secondary" data-magnetic>
            See our work <ArrowRight />
          </Link>
        </div>
      </PageHero>

      {/* Story timeline */}
      <section className="container-page py-20 sm:py-28" aria-labelledby="story">
        <SectionHeading
          id="story"
          eyebrow="Our story so far"
          title={
            <>
              Technology is what we use. <span className="text-grad">Meaningful products</span> are what we make.
            </>
          }
        />
        <ol data-reveal className="relative grid gap-6 pl-10 sm:pl-14">
          <span aria-hidden className="absolute top-2 bottom-2 left-3 w-0.5 rounded bg-line sm:left-5" />
          <span aria-hidden className="grow-y absolute top-2 bottom-2 left-3 w-0.5 rounded bg-gradient-to-b from-accent to-accent-2 sm:left-5" />
          {timeline.map((t, i) => (
            <li key={t.title} data-reveal="left" style={d(i, 160)} className="relative">
              <span aria-hidden className="absolute top-6 -left-[2.05rem] size-4 rounded-full border-4 border-bg bg-accent shadow-[0_0_0_3px_var(--accent),0_0_20px_var(--accent)] sm:-left-[2.55rem]" />
              <div className="card spot lift p-6 sm:flex sm:items-center sm:justify-between sm:gap-6">
                <div>
                  <span className="font-display text-sm font-extrabold tracking-[0.14em] text-accent uppercase">{t.when}</span>
                  <h3 className="mt-1 text-xl font-bold">{t.title}</h3>
                  <p className="mt-1 text-muted">{t.body}</p>
                </div>
                {t.href && (
                  <Link href={t.href} className="link-arrow mt-4 shrink-0 text-sm sm:mt-0">
                    View <ArrowRight size={14} />
                  </Link>
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Values: 3D cube + cards */}
      <section className="relative overflow-hidden border-y border-line bg-surface/40 py-20 sm:py-28" aria-labelledby="values">
        <div className="container-page grid items-center gap-14 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <SectionHeading id="values" eyebrow="How we think" title="Four principles that shape how we build" intro="Hover the cube to pause it." />
            <div data-reveal="zoom" className="cube-scene mx-auto aspect-square w-full max-w-[19rem] [--half:9.5rem]" aria-hidden>
              <div className="cube">
                {values.map((v) => (
                  <div key={v.label} className="cube-face">
                    <span className="text-accent">
                      <AnimatedIcon name={v.icon} size={34} />
                    </span>
                    <p className="eyebrow no-line mt-4">{v.label}</p>
                    <p className="mt-2 font-display text-xl leading-snug font-bold">{v.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <ul className="grid gap-5 sm:grid-cols-2">
            {values.map((v, i) => (
              <li key={v.label} data-reveal style={d(i, 110)} className="card spot lift group p-6">
                <IconTile name={v.icon} />
                <p className="eyebrow no-line mt-5">{v.label}</p>
                <h3 className="mt-2 text-lg font-bold">{v.title}</h3>
                <p className="mt-2 text-sm text-muted">{v.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Connect */}
      <section className="container-page py-20 sm:py-28" aria-labelledby="connect">
        <div className="grid gap-10 lg:grid-cols-2">
          <SectionHeading
            id="connect"
            eyebrow="Connect with Charan"
            title={
              <>
                Check us on the platforms <span className="text-grad">you already trust.</span>
              </>
            }
            intro="A client who can see us in several places doesn’t have to trust one website."
          />
          <div data-reveal="right" className="card spot p-7">
            <h3 className="mb-4 font-bold">Studio profiles</h3>
            <SocialList />
            <h3 className="mt-7 mb-3 font-bold">Find us on</h3>
            <ul className="flex flex-wrap gap-2">
              {[site.profiles.fiverr, site.profiles.upwork, site.profiles.linkedin]
                .filter((p) => p.url)
                .map((p) => (
                  <li key={p.label}>
                    <a
                      href={p.url!}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-4 text-sm font-semibold no-underline transition-all hover:-translate-y-0.5 hover:border-accent"
                    >
                      {p.label} <span className="font-normal text-muted">{p.handle}</span> <ExternalIcon size={12} />
                    </a>
                  </li>
                ))}
            </ul>
            <Link href="/contact" className="link-arrow mt-7">
              Or contact us directly <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <ClosingCta />
    </div>
  );
}

