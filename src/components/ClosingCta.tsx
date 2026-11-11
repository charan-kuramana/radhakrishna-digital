import Link from 'next/link';
import { hasWhatsapp, site, whatsappHref } from '@/content/site';
import { ArrowRight, MailIcon, WhatsAppIcon } from './Icons';
import SocialIcons from './SocialIcons';
import { AnimatedIcon } from './fx/AnimatedIcons';

/** Every page ends with this block, so a visitor never reaches a dead end. */
export default function ClosingCta({ variant = 'default' }: { variant?: 'default' | 'home' }) {
  const home = variant === 'home';
  return (
    <section aria-labelledby="closing-cta" className="container-page py-16 sm:py-24">
      <div data-reveal="zoom" className="spot-area relative overflow-hidden rounded-[2rem] border border-line bg-surface px-6 py-14 text-center sm:px-12 sm:py-20">
        {/* animated backdrop */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="warm-conic top-1/2 left-1/2 h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2" style={{ opacity: 0.2 }} />
          <div className="bg-grid absolute inset-0 opacity-70" />
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-500 [.spot-area:hover_&]:opacity-100"
            style={{ background: 'radial-gradient(500px circle at var(--mx,50%) var(--my,50%), color-mix(in srgb, var(--accent) 16%, transparent), transparent 50%)' }}
          />
          <span className="float absolute top-10 left-[8%] hidden size-14 place-items-center rounded-2xl border border-line bg-bg/60 text-accent sm:grid">
            <AnimatedIcon name="rocket" size={26} />
          </span>
          <span className="float absolute right-[9%] bottom-12 hidden size-14 place-items-center rounded-2xl border border-line bg-bg/60 text-accent sm:grid [animation-delay:-3s]">
            <AnimatedIcon name="idea" size={26} />
          </span>
          <span className="float-slow absolute top-14 right-[14%] hidden size-3 rounded-full bg-accent-2 shadow-[0_0_20px_var(--accent-2)] sm:block" />
          <span className="float-slow absolute bottom-16 left-[18%] hidden size-2 rounded-full bg-accent shadow-[0_0_16px_var(--accent)] sm:block [animation-delay:-4s]" />
        </div>

        <p className="eyebrow no-line relative justify-center">
          <span className="live-dot" /> {home ? 'Taking new projects' : 'Have a project in mind?'}
        </p>
        <h2 id="closing-cta" className="relative mx-auto mt-4 max-w-3xl text-3xl leading-tight font-extrabold sm:text-5xl">
          {home ? (
            <>
              Let’s build something <span className="text-grad">meaningful.</span>
            </>
          ) : (
            <>
              Have a project in mind? <span className="text-grad">Tell us about it.</span>
            </>
          )}
        </h2>
        <p className="relative mx-auto mt-5 max-w-xl text-muted">
          Tell us what you need in two or three lines. {site.replyPromise}.
        </p>
        <div className="relative mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <Link
            href="/start-a-project#enquiry"
            className="btn btn-primary px-7 text-base"
            data-magnetic
            data-track="Start Project Clicked"
            data-track-label={home ? 'home-final' : 'closing'}
          >
            Start a Project <ArrowRight />
          </Link>
          {hasWhatsapp && (
            <a
            href={whatsappHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp px-7 text-base"
            data-magnetic
            data-track="WhatsApp Clicked"
            data-track-label={home ? 'home-final' : 'closing'}
          >
            <WhatsAppIcon /> Chat on WhatsApp
          </a>
          )}
        </div>
        {home && (
          <div className="relative mt-9 flex flex-col items-center gap-4">
            <a href={`mailto:${site.email.primary}`} className="link-arrow text-ink">
              <MailIcon className="text-accent" /> {site.email.primary}
            </a>
            <SocialIcons />
          </div>
        )}
      </div>
    </section>
  );
}
