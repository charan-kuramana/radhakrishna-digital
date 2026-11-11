import type { Metadata, Viewport } from 'next';
import { Inter, Manrope } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ClickTracker from '@/components/ClickTracker';
import Effects from '@/components/fx/Effects';
import { site, socialLinks } from '@/content/site';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const manrope = Manrope({ subsets: ['latin'], weight: ['600', '700', '800'], variable: '--font-manrope', display: 'swap' });

const HOME_TITLE = 'Radhakrishna Digital — Websites, Booking Systems and E-commerce in Vijayawada';
const HOME_DESCRIPTION =
  'Web studio in Vijayawada, India — logo and branding, websites, e-commerce, web and mobile apps, hosting and AI, end to end. Makers of Hostlify for hostels and PGs.';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: HOME_TITLE, template: '%s | Radhakrishna Digital' },
  description: HOME_DESCRIPTION,
  applicationName: site.name,
  authors: [{ name: site.founder.name }],
  creator: site.founder.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: site.name,
    locale: 'en_IN',
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: '/',
  },
  twitter: { card: 'summary_large_image', title: HOME_TITLE, description: HOME_DESCRIPTION },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#050A14',
  width: 'device-width',
  initialScale: 1,
};

// Runs before paint so there is no flash of the wrong theme. Dark is the default.
// Also marks JS as available (enables scroll reveals) with a safety net: if the
// effects layer hasn't started within 3.5s, everything is simply shown.
const themeScript = `(function(){var d=document.documentElement;d.classList.add('js');try{if(localStorage.getItem('rd-theme')==='light')d.dataset.theme='light'}catch(e){}setTimeout(function(){if(!d.classList.contains('reveal-ready'))d.classList.add('reveal-fallback')},3500)})();`;

const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: site.name,
  url: site.url,
  logo: `${site.url}/images/brand/logo-full.webp`,
  image: `${site.url}/opengraph-image`,
  description: HOME_DESCRIPTION,
  email: site.email.primary,
  foundingDate: '2024-02',
  founder: { '@type': 'Person', name: site.founder.name, jobTitle: site.founder.role },
  address: { '@type': 'PostalAddress', addressLocality: site.city, addressRegion: site.region, addressCountry: 'IN' },
  areaServed: 'Worldwide',
  sameAs: [...socialLinks().map((s) => s.url), site.profiles.fiverr.url, site.profiles.upwork.url].filter(Boolean),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${manrope.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="min-h-dvh">
        <a
          href="#main"
          className="fixed top-3 left-3 z-[100] -translate-y-24 rounded-lg bg-accent px-4 py-3 font-bold text-accent-ink transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <ClickTracker />
        <Effects />
        {PLAUSIBLE_DOMAIN && (
          <Script defer data-domain={PLAUSIBLE_DOMAIN} src="https://plausible.io/js/script.js" strategy="afterInteractive" />
        )}
      </body>
    </html>
  );
}
