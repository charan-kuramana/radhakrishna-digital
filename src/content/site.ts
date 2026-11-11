/**
 * Single source of truth for business facts, contact routes and social links.
 *
 * Anything marked `TODO(before launch)` is intentionally left empty because the
 * value has not been verified. While a value is `null`/empty, the site hides
 * that link instead of showing a guess. Fill each one in from the real source
 * (open the profile/page, copy its address) and the site picks it up everywhere.
 */

export const site = {
  name: 'Radhakrishna Digital',
  /** Canonical public address. Defaults to the live Cloudflare Pages address; set NEXT_PUBLIC_SITE_URL once a custom domain is live. */
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://radhakrishna-digital.pages.dev').replace(/\/$/, ''),
  tagline: 'Brand, website, apps, hosting and AI — end to end, for small businesses.',
  city: 'Vijayawada',
  region: 'Andhra Pradesh',
  country: 'India',
  location: 'Vijayawada, India',
  since: 'February 2024',
  sinceShort: 'Feb 2024',
  replyPromise: 'Reply within 24 hours on working days',

  founder: {
    name: 'Charan Kuramana',
    firstName: 'Charan',
    role: 'Founder and Full-Stack Developer',
    /** TODO(before launch): add a real photo at public/images/founder.webp (npm run images) and set this to '/images/founder.webp'. */
    photo: null as string | null,
    /** TODO(before launch): Charan's personal LinkedIn profile URL. */
    linkedin: null as string | null,
  },

  email: {
    /**
     * TODO(before launch): once domain email exists (e.g. hello@radhakrishnadigital.com),
     * set NEXT_PUBLIC_CONTACT_EMAIL to it. The Gmail address then becomes the backup.
     */
    primary: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'charank.freelance@gmail.com',
    backup: 'charank.freelance@gmail.com',
  },

  whatsapp: {
    /** TODO(before launch): WhatsApp Business number, digits only with country code, e.g. 919876543210. */
    number: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '',
    message: 'Hi Radhakrishna Digital, I need a website for my business',
  },

  socials: {
    linkedin: {
      label: 'LinkedIn',
      handle: 'Radhakrishna Digital',
      url: 'https://www.linkedin.com/in/radhakrishna-digital-37544b3a1/',
    },
    instagram: {
      label: 'Instagram',
      handle: '@charank.tech',
      /** Confirm this opens the @charank.tech account in a logged-out window before launch. */
      url: 'https://www.instagram.com/charank.tech/',
    },
    facebook: {
      label: 'Facebook',
      handle: '@charank.tech',
      /** TODO(before launch): open the Facebook Page, copy its exact address and paste it here. Do not guess. */
      url: null as string | null,
    },
  },

  profiles: {
    fiverr: { label: 'Fiverr', handle: 'charan_kuramana', url: 'https://www.fiverr.com/charan_kuramana' },
    /** TODO(before launch): Upwork profile URL. */
    upwork: { label: 'Upwork', handle: 'Upwork profile', url: null as string | null },
    linkedin: { label: 'LinkedIn', handle: 'Radhakrishna Digital', url: 'https://www.linkedin.com/in/radhakrishna-digital-37544b3a1/' },
  },

  safePayment:
    'We do not accept cashier’s checks or money orders, and we never ask a third party in another country to receive payment for us.',
  paymentMethods: 'Bank transfer, card through a proper invoice, or escrow on Fiverr / Upwork.',
} as const;

export type SocialKey = keyof typeof site.socials;

/** WhatsApp buttons only render once a real number is set, so none of them lead nowhere. */
export const hasWhatsapp = /^\d{8,15}$/.test(site.whatsapp.number);

export function whatsappHref(message: string = site.whatsapp.message): string {
  return `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

export function mailtoHref(subject = 'Project enquiry'): string {
  return `mailto:${site.email.primary}?subject=${encodeURIComponent(subject)}`;
}

/** Social links in the order the plan requires: LinkedIn, Instagram, Facebook. Unverified ones are skipped. */
export function socialLinks() {
  return (['linkedin', 'instagram', 'facebook'] as const)
    .map((key) => ({ key, ...site.socials[key] }))
    .filter((s): s is typeof s & { url: string } => Boolean(s.url));
}

export const nav = [
  { href: '/services', label: 'Services' },
  { href: '/work', label: 'Work' },
  { href: '/work/hostlify', label: 'Hostlify' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
] as const;
