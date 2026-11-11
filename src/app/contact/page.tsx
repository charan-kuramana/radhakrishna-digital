import type { Metadata } from 'next';
import ClosingCta from '@/components/ClosingCta';
import EnquiryForm from '@/components/EnquiryForm';
import { InstagramIcon, LinkedInIcon } from '@/components/Icons';
import { SocialList } from '@/components/SocialIcons';
import { AnimatedIcon, IconTile } from '@/components/fx/AnimatedIcons';
import { RadarBg } from '@/components/fx/Backgrounds';
import { d } from '@/components/fx/Text';
import { PageHero } from '@/components/sections';
import { hasWhatsapp, site, whatsappHref } from '@/content/site';

export const metadata: Metadata = {
  title: 'Contact — Email, WhatsApp and Enquiry Form',
  description:
    'Contact Radhakrishna Digital in Vijayawada, India by enquiry form, email or WhatsApp. We reply within 24 hours on working days.',
  alternates: { canonical: '/contact' },
};

function Scope() {
  const nodes = [
    { el: <AnimatedIcon name="whatsapp" size={24} />, x: '50%', y: '4%', c: 'text-whatsapp' },
    { el: <AnimatedIcon name="mail" size={24} />, x: '92%', y: '38%', c: 'text-accent' },
    { el: <LinkedInIcon size={22} />, x: '76%', y: '88%', c: 'text-accent' },
    { el: <InstagramIcon size={22} />, x: '22%', y: '88%', c: 'text-accent-2' },
    { el: <AnimatedIcon name="form" size={24} />, x: '8%', y: '38%', c: 'text-accent' },
  ];
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[24rem]" aria-hidden>
      <RadarBg className="inset-0" />
      <div className="absolute top-1/2 left-1/2 grid -translate-x-1/2 -translate-y-1/2 place-items-center text-center">
        <span className="glass rounded-2xl px-4 py-3">
          <span className="flex items-center justify-center gap-2 text-sm font-bold">
            <span className="live-dot" /> We’re listening
          </span>
          <span className="mt-0.5 block text-xs text-muted">{site.replyPromise}</span>
        </span>
      </div>
      {nodes.map((n, i) => (
        <span
          key={i}
          className={`float glass absolute grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl shadow-[0_0_30px_-10px_var(--accent)] ${n.c}`}
          style={{ left: n.x, top: n.y, animationDelay: `${-i * 1.1}s` }}
        >
          {n.el}
        </span>
      ))}
    </div>
  );
}

export default function ContactPage() {
  const channels = [
    {
      icon: 'whatsapp' as const,
      title: 'WhatsApp',
      body: 'Fastest for quick questions.',
      action: (
        <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp mt-5 w-full" data-track="WhatsApp Clicked" data-track-label="contact">
          Chat on WhatsApp
        </a>
      ),
    },
    {
      icon: 'mail' as const,
      title: 'Email',
      body: site.email.backup !== site.email.primary ? `Backup: ${site.email.backup}` : 'For detailed briefs and files.',
      action: (
        <a href={`mailto:${site.email.primary}`} className="btn btn-secondary mt-5 w-full overflow-hidden text-ellipsis">
          <span className="truncate">{site.email.primary}</span>
        </a>
      ),
    },
    {
      icon: 'form' as const,
      title: 'Enquiry form',
      body: 'Seven fields — the quickest way to a quote.',
      action: (
        <a href="#enquiry" className="btn btn-primary mt-5 w-full" data-track="Start Project Clicked" data-track-label="contact-card">
          Fill the form
        </a>
      ),
    },
  ];

  return (
    <div data-page="contact">
      <PageHero
        bg={
          <div aria-hidden className="bg-noise pointer-events-none absolute inset-0 overflow-hidden">
            <div className="bg-grid absolute inset-0" />
            <div className="aurora-blob -top-40 -left-24 h-[30rem] w-[30rem]" style={{ background: 'var(--accent)', opacity: 0.2 }} />
            <div className="aurora-blob -right-24 bottom-[-12rem] h-[28rem] w-[28rem]" style={{ background: 'var(--accent-2)', opacity: 0.18 }} />
          </div>
        }
        eyebrow="Contact"
        title={['Every way to', { text: 'reach us.', grad: true }]}
        intro={`Use the form, email or WhatsApp — whichever suits you. ${site.replyPromise}.`}
        visual={<Scope />}
      >
        <ul className="mt-8 flex flex-wrap gap-2">
          {[
            ['pin', site.location],
            ['clock', site.replyPromise],
          ].map(([icon, t]) => (
            <li key={t} className="chip text-muted">
              <span className="text-accent">
                <AnimatedIcon name={icon as 'pin'} size={16} />
              </span>
              {t}
            </li>
          ))}
        </ul>
      </PageHero>

      <section className="container-page py-16 sm:py-20" aria-label="Contact channels">
        <ul className={`grid gap-5 ${hasWhatsapp ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
          {channels.filter((c) => hasWhatsapp || c.title !== 'WhatsApp').map((c, i) => (
            <li key={c.title} data-reveal style={d(i, 120)} className="card spot lift group flex flex-col p-7">
              <IconTile name={c.icon} size="lg" />
              <h2 className="mt-6 text-xl font-bold">{c.title}</h2>
              <p className="mt-1 text-sm text-muted">{c.body}</p>
              <div className="mt-auto">{c.action}</div>
            </li>
          ))}
        </ul>
      </section>

      <section className="container-page grid gap-10 pb-20 sm:pb-28 lg:grid-cols-[1.6fr_1fr]">
        <div id="enquiry" data-reveal="left" className="scroll-mt-24">
          <EnquiryForm title="Send a message" />
        </div>
        <div data-reveal="right" className="flex flex-col gap-5 lg:sticky lg:top-28 lg:self-start">
          <div className="card spot p-7">
            <h2 className="mb-4 text-lg font-bold">Follow our work</h2>
            <SocialList />
          </div>
          <div className="card p-7">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <span className="text-accent">
                <AnimatedIcon name="pin" size={22} />
              </span>
              Based in {site.location}
            </h2>
            <p className="mt-2 text-sm text-muted">Working with clients in India and abroad — through Fiverr, Upwork or direct invoice.</p>
          </div>
        </div>
      </section>

      <ClosingCta />
    </div>
  );
}
