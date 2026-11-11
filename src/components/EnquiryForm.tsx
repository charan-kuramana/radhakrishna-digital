'use client';

import Link from 'next/link';
import { useEffect, useId, useState, type FormEvent } from 'react';
import { site } from '@/content/site';
import { track } from '@/lib/analytics';
import { ArrowRight } from './Icons';

export const NEEDS = [
  { value: 'Business website', key: 'website' },
  { value: 'Booking system', key: 'booking' },
  { value: 'Hostlify demo (15 minutes)', key: 'hostlify-demo' },
  { value: 'E-commerce store', key: 'ecommerce' },
  { value: 'Web application', key: 'webapp' },
  { value: 'Mobile app', key: 'mobile' },
  { value: 'Logo and branding', key: 'branding' },
  { value: 'Hosting and deployment', key: 'hosting' },
  { value: 'AI features', key: 'ai' },
  { value: 'Complete package (brand, website, app, hosting)', key: 'end-to-end' },
  { value: 'Other', key: 'other' },
] as const;

const BUDGETS = [
  'Under $300',
  '$300 — Basic package',
  '$500 — Standard package',
  '$800 — Premium package',
  'Above $800 / custom',
  'Not sure yet',
];
const TIMELINES = ['This week', 'This month', 'Next month', 'Exploring'];

/**
 * Submission:
 *  - With NEXT_PUBLIC_WEB3FORMS_KEY set, posts to Web3Forms, which emails the enquiry to you.
 *  - Without it, opens the visitor's email app with the enquiry pre-filled (nothing is lost).
 */
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? '';

type Status = 'idle' | 'sending' | 'sent' | 'mailto' | 'error';

export default function EnquiryForm({
  title = 'Tell us about your project',
  defaultNeed = '',
}: {
  title?: string;
  defaultNeed?: (typeof NEEDS)[number]['value'] | '';
}) {
  const uid = useId();
  const [status, setStatus] = useState<Status>('idle');
  const [need, setNeed] = useState<string>(defaultNeed);
  const [budget, setBudget] = useState('');
  const [prefers, setPrefers] = useState<'Email' | 'WhatsApp'>('Email');

  // Pre-select from links like /contact?need=hostlify-demo or ?budget=Standard
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const n = NEEDS.find((x) => x.key === q.get('need'));
    if (n) setNeed(n.value);
    const b = q.get('budget');
    const match = b && BUDGETS.find((x) => x.toLowerCase().includes(b.toLowerCase()));
    if (match) setBudget(match);
  }, []);

  const id = (name: string) => `${uid}-${name}`;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    if (data.botcheck) return; // honeypot

    const summary = [
      `Name: ${data.name}`,
      `Business: ${data.business || '—'}`,
      `Email: ${data.email}`,
      `WhatsApp: ${data.whatsapp || '—'}`,
      `Prefers reply by: ${data.prefers}`,
      `Need: ${data.need}`,
      `Budget: ${data.budget || '—'}`,
      `Timeline: ${data.timeline || '—'}`,
      '',
      data.message,
    ].join('\n');

    if (!WEB3FORMS_KEY) {
      window.location.href = `mailto:${site.email.primary}?subject=${encodeURIComponent(
        `Project enquiry — ${data.need}`,
      )}&body=${encodeURIComponent(summary)}`;
      track('Form Submitted', { need: data.need, method: 'mailto' });
      setStatus('mailto');
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `New enquiry: ${data.need} — ${data.name}`,
          from_name: 'Radhakrishna Digital website',
          replyto: data.email,
          ...data,
        }),
      });
      const json = (await res.json().catch(() => ({}))) as { success?: boolean };
      if (!res.ok || json.success === false) throw new Error('Send failed');
      track('Form Submitted', { need: data.need });
      setStatus('sent');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  if (status === 'sent' || status === 'mailto') {
    return (
      <div role="status" className="card spot anim-up relative overflow-hidden p-8 text-center sm:p-12">
        <div aria-hidden className="warm-conic top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2" style={{ opacity: 0.18 }} />
        <span className="mx-auto grid size-20 place-items-center rounded-full bg-gradient-to-br from-accent to-accent-2 text-accent-ink shadow-[0_0_0_10px_color-mix(in_srgb,var(--accent)_15%,transparent),0_0_60px_-10px_var(--accent)]">
          <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path className="draw" pathLength={100} d="M5 12.5l4.2 4.2L19 7" />
          </svg>
        </span>
        <h3 className="mt-5 text-2xl font-extrabold">Thank you — we reply within 24 hours on working days.</h3>
        <p className="mt-3 text-muted">
          {status === 'mailto'
            ? `Your email app should have opened with your enquiry filled in — press send. If it didn’t, write to ${site.email.primary}.`
            : `${site.founder.firstName} will reply personally to the contact you chose.`}
        </p>
        <button type="button" onClick={() => setStatus('idle')} className="btn btn-secondary mt-6">
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card spot grid gap-5 p-6 sm:p-8">
      <h3 className="text-2xl font-extrabold">{title}</h3>

      {/* Honeypot: hidden from people, bots fill it in */}
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={id('name')} className="field-label">
            Your name <span className="text-accent">*</span>
          </label>
          <input id={id('name')} name="name" required autoComplete="name" className="field" />
        </div>
        <div>
          <label htmlFor={id('business')} className="field-label">
            Business name <span className="font-normal text-muted">(optional)</span>
          </label>
          <input id={id('business')} name="business" autoComplete="organization" className="field" />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={id('email')} className="field-label">
            Email <span className="text-accent">*</span>
          </label>
          <input id={id('email')} name="email" type="email" required autoComplete="email" className="field" />
        </div>
        <div>
          <label htmlFor={id('whatsapp')} className="field-label">
            WhatsApp number <span className="font-normal text-muted">(optional)</span>
          </label>
          <input id={id('whatsapp')} name="whatsapp" type="tel" inputMode="tel" autoComplete="tel" placeholder="+91 …" className="field" />
        </div>
      </div>

      <fieldset>
        <legend className="field-label">Reply to me by</legend>
        <div className="flex gap-3">
          {(['Email', 'WhatsApp'] as const).map((p) => (
            <label
              key={p}
              className={`flex min-h-11 cursor-pointer items-center gap-2 rounded-full border px-4 text-sm font-semibold ${
                prefers === p ? 'border-accent text-ink' : 'border-line-strong text-muted'
              }`}
            >
              <input type="radio" name="prefers" value={p} checked={prefers === p} onChange={() => setPrefers(p)} className="accent-[var(--accent)]" />
              {p}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <label htmlFor={id('need')} className="field-label">
            What do you need? <span className="text-accent">*</span>
          </label>
          <select id={id('need')} name="need" required className="field" value={need} onChange={(e) => setNeed(e.target.value)}>
            <option value="" disabled>
              Choose one
            </option>
            {NEEDS.map((n) => (
              <option key={n.key}>{n.value}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={id('budget')} className="field-label">
            Budget range
          </label>
          <select id={id('budget')} name="budget" className="field" value={budget} onChange={(e) => setBudget(e.target.value)}>
            <option value="">Choose a range</option>
            {BUDGETS.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={id('timeline')} className="field-label">
            Timeline
          </label>
          <select id={id('timeline')} name="timeline" className="field" defaultValue="">
            <option value="">Choose one</option>
            {TIMELINES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor={id('message')} className="field-label">
          Message <span className="text-accent">*</span>
        </label>
        <textarea
          id={id('message')}
          name="message"
          required
          rows={4}
          placeholder="Tell us about your project in 2–3 lines."
          className="field min-h-28 resize-y"
        />
      </div>

      {status === 'error' && (
        <p role="alert" className="rounded-xl border border-red-400/40 bg-red-500/10 p-4 text-sm">
          Sorry — the message didn’t send. Please email{' '}
          <a href={`mailto:${site.email.primary}`} className="font-semibold underline">
            {site.email.primary}
          </a>{' '}
          or use WhatsApp.
        </p>
      )}

      <div>
        <button type="submit" className="btn btn-primary w-full sm:w-auto" disabled={status === 'sending'}>
          {status === 'sending' ? (
            <>
              <span aria-hidden className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" /> Sending…
            </>
          ) : (
            <>
              Send Enquiry <ArrowRight />
            </>
          )}
        </button>
        <p className="mt-3 text-sm text-muted">
          We use these details only to reply to your enquiry — never for marketing lists. See our{' '}
          <Link href="/privacy" className="underline">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </form>
  );
}
