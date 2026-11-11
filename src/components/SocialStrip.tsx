import Image from 'next/image';
import { site } from '@/content/site';
import { latestPosts } from '@/content/social-proof';
import { ExternalIcon, FacebookIcon, InstagramIcon, LinkedInIcon } from './Icons';
import { SectionHeading } from './sections';

const ICONS = { linkedin: LinkedInIcon, instagram: InstagramIcon, facebook: FacebookIcon } as const;

/** Links out to the platforms — we don't rebuild their feeds here. */
export default function SocialStrip() {
  const follow = (['linkedin', 'instagram', 'facebook'] as const)
    .map((k) => ({ key: k, ...site.socials[k] }))
    .filter((s) => s.url);

  return (
    <section className="container-page py-20 sm:py-24" aria-labelledby="social-title">
      <SectionHeading id="social-title" eyebrow="Follow our work" title="See what we’re building this week" />

      {latestPosts.length > 0 && (
        <ul className="mb-8 grid gap-5 sm:grid-cols-2">
          {latestPosts.map((p) => {
            const Icon = ICONS[p.platform];
            return (
              <li key={p.href}>
                <a href={p.href} target="_blank" rel="noopener noreferrer" className="card group block overflow-hidden no-underline">
                  <Image src={p.thumbnail} alt={p.alt} width={800} height={450} className="aspect-video h-auto w-full object-cover" />
                  <span className="flex items-center gap-3 p-4">
                    <Icon className="shrink-0 text-accent" />
                    <span className="line-clamp-2 text-sm">{p.caption}</span>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      )}

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {follow.map((s) => {
          const Icon = ICONS[s.key];
          return (
            <li key={s.key}>
              <a
                href={s.url!}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Follow ${site.name} on ${s.label}`}
                className="card flex min-h-20 items-center gap-4 p-5 no-underline transition-colors hover:border-accent"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-accent/12 text-accent">
                  <Icon size={22} />
                </span>
                <span className="flex-1">
                  <span className="block font-bold">{s.label}</span>
                  <span className="block text-sm text-muted">{s.handle}</span>
                </span>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-accent">
                  Follow <ExternalIcon size={12} />
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
