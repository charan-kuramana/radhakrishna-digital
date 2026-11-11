import { site, socialLinks } from '@/content/site';
import { FacebookIcon, InstagramIcon, LinkedInIcon } from './Icons';

const ICONS = { linkedin: LinkedInIcon, instagram: InstagramIcon, facebook: FacebookIcon } as const;

/** LinkedIn, Instagram, Facebook — in that order, new tab, accessible labels, 44px targets. */
export default function SocialIcons({ className = '' }: { className?: string }) {
  return (
    <ul className={`flex items-center gap-2 ${className}`}>
      {socialLinks().map((s) => {
        const Icon = ICONS[s.key];
        return (
          <li key={s.key}>
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${site.name} on ${s.label}`}
              className="social-btn grid size-11 place-items-center rounded-full border border-line text-muted transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:bg-accent/10 hover:text-accent hover:shadow-[0_10px_24px_-10px_var(--accent)]"
            >
              <Icon />
            </a>
          </li>
        );
      })}
    </ul>
  );
}

/** Same links with the handle written out as text (for Contact/About). */
export function SocialList() {
  return (
    <ul className="grid gap-3">
      {(['linkedin', 'instagram', 'facebook'] as const).map((key) => {
        const s = site.socials[key];
        const Icon = ICONS[key];
        const inner = (
          <>
            <span className="grid size-10 place-items-center rounded-full bg-surface-2 text-accent">
              <Icon />
            </span>
            <span>
              <span className="block text-sm text-muted">{s.label}</span>
              <span className="block font-semibold">{s.handle}</span>
            </span>
          </>
        );
        return (
          <li key={key}>
            {s.url ? (
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${site.name} on ${s.label} (${s.handle})`}
                className="flex min-h-12 items-center gap-3 no-underline hover:text-accent"
              >
                {inner}
              </a>
            ) : (
              <span className="flex min-h-12 items-center gap-3">{inner}</span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
