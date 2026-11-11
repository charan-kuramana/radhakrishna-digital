import Link from 'next/link';
import { site } from '@/content/site';
import { services } from '@/content/services';
import Logo from './Logo';
import SocialIcons from './SocialIcons';
import { ShieldIcon } from './Icons';
import Marquee from './fx/Marquee';

const workLinks = [
  { href: '/work/hostlify', label: 'Hostlify' },
  { href: '/work#rk-fashions', label: 'RK Fashions' },
  { href: '/work#ap-superspeciality', label: 'AP Superspeciality' },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t border-line bg-surface/40">
      <Marquee
        label="Radhakrishna Digital"
        speed="55s"
        className="border-b border-line py-6"
        items={['Websites', 'Booking systems', 'E-commerce', 'Web apps', 'Hostlify'].map((t) => (
          <span key={t} className="flex items-center gap-6 font-display text-4xl font-extrabold tracking-tight sm:text-6xl">
            <span
              className="text-transparent transition-colors duration-500 hover:text-accent"
              style={{ WebkitTextStroke: '1.5px color-mix(in srgb, var(--ink) 45%, transparent)' }}
            >
              {t}
            </span>
            <span aria-hidden className="text-grad text-3xl sm:text-5xl">
              ✦
            </span>
          </span>
        ))}
      />
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-muted">{site.tagline}</p>
          <p className="mt-3 text-sm text-muted">
            {site.location} • Since {site.since}
          </p>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.14em] text-muted">Services</h2>
          <ul className="grid gap-1">
            {services.map((s) => (
              <li key={s.id}>
                <Link href={`/services#${s.id}`} className="inline-flex min-h-9 items-center no-underline hover:text-accent">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.14em] text-muted">Work</h2>
          <ul className="grid gap-1">
            {workLinks.map((w) => (
              <li key={w.href}>
                <Link href={w.href} className="inline-flex min-h-9 items-center no-underline hover:text-accent">
                  {w.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/about" className="inline-flex min-h-9 items-center no-underline hover:text-accent">
                About the studio
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.14em] text-muted">Contact</h2>
          <a href={`mailto:${site.email.primary}`} className="break-all font-semibold no-underline hover:text-accent">
            {site.email.primary}
          </a>
          <p className="mt-2">
            <Link href="/contact" className="link-arrow">
              Contact page
            </Link>
          </p>
          <SocialIcons className="mt-4" />
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col gap-4 py-6 text-sm text-muted lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span>
              © {year} {site.name}, {site.location}
            </span>
            <Link href="/privacy" className="underline-offset-4 hover:text-ink hover:underline">
              Privacy
            </Link>
            <Link href="/terms" className="underline-offset-4 hover:text-ink hover:underline">
              Terms
            </Link>
          </div>
          <p className="flex max-w-xl gap-2 lg:text-right">
            <ShieldIcon className="mt-0.5 shrink-0 text-accent" />
            <span>{site.safePayment}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
