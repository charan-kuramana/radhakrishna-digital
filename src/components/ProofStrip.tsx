import { site } from '@/content/site';
import { ExternalIcon, FiverrIcon, LinkedInIcon, UpworkIcon } from './Icons';

/** "Are you real?" — every item clicks through to the real thing. */
export default function ProofStrip() {
  const items = [
    { label: 'Hostlify', note: 'Live product', href: 'https://hostlify.in/', track: 'Live Project Clicked' },
    { label: 'RK Fashions', note: 'Live store', href: 'https://www.rkfashions.shop/', track: 'Live Project Clicked' },
    { label: 'AP Superspeciality', note: 'Live website', href: 'https://apsuperspeciality.com/', track: 'Live Project Clicked' },
  ];
  const profiles = [
    { ...site.profiles.fiverr, Icon: FiverrIcon },
    { ...site.profiles.upwork, Icon: UpworkIcon },
    { ...site.profiles.linkedin, Icon: LinkedInIcon },
  ].filter((p) => p.url);

  return (
    <section aria-label="Proof: live projects and profiles" className="border-y border-line bg-surface/60">
      <div className="container-page flex flex-col gap-4 py-5 lg:flex-row lg:items-center lg:gap-8">
        <p className="shrink-0 text-xs font-semibold tracking-[0.16em] text-muted uppercase">Check us out</p>
        <ul className="flex flex-wrap gap-2">
          {items.map((i) => (
            <li key={i.label}>
              <a
                href={i.href}
                target="_blank"
                rel="noopener noreferrer"
                data-track={i.track}
                data-track-label={`proof-${i.label}`}
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-surface/60 px-4 text-sm no-underline transition-all duration-300 hover:-translate-y-0.5 hover:border-accent"
              >
                <span className="live-dot" />
                <span className="font-semibold">{i.label}</span>
                <span className="text-muted">{i.note}</span>
                <ExternalIcon size={12} className="text-muted" />
              </a>
            </li>
          ))}
          {profiles.map((p) => (
            <li key={p.label}>
              <a
                href={p.url!}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${site.name} on ${p.label}`}
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-4 text-sm font-semibold no-underline transition-colors hover:border-accent"
              >
                <p.Icon size={18} className="text-accent" />
                {p.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
