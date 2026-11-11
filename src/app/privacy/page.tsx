import type { Metadata } from 'next';
import ClosingCta from '@/components/ClosingCta';
import { PageHero } from '@/components/sections';
import { AuroraBg } from '@/components/fx/Backgrounds';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'What the Radhakrishna Digital enquiry form collects, why, and how to have your details deleted.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <div data-page="legal">
      <PageHero bg={<AuroraBg />} eyebrow="Legal" title={[{ text: "Privacy Policy", grad: true }]} intro="Last updated 10 November 2026. Short and plain: what we collect, why, and how to delete it." />
      <article className="container-page prose-legal max-w-3xl py-12">
        <p>
          This website is run by {site.name}, {site.location} (“we”). This page explains what information we collect through the website
          and what we do with it.
        </p>

        <h2>What we collect</h2>
        <p>When you send an enquiry, we receive what you type into the form:</p>
        <ul>
          <li>your name and, if you give it, your business name;</li>
          <li>your email address and, if you give it, your WhatsApp number;</li>
          <li>what you need, your budget range, timeline and your message.</li>
        </ul>
        <p>If you contact us by email or WhatsApp, we receive the details you send through those services.</p>

        <h2>Why we use it</h2>
        <p>
          Only to reply to your enquiry and, if we work together, to deliver your project. We do not sell your details, add you to
          marketing lists, or share them with anyone except the services needed to deliver your message to us (our form provider and email
          provider).
        </p>

        <h2>Analytics</h2>
        <p>
          We may use privacy-respecting, cookie-free analytics to count page visits and four actions: form submitted, WhatsApp clicked,
          Start a Project clicked and live-project link clicked. These counts do not identify you.
        </p>

        <h2>Cookies and storage</h2>
        <p>
          We do not use advertising or tracking cookies. Your browser may store your light/dark theme choice on your own device.
        </p>

        <h2>How long we keep it</h2>
        <p>We keep enquiries only as long as needed to respond and, for clients, for the length of the project and its records.</p>

        <h2>Your choices</h2>
        <p>
          To see, correct or delete the details you sent us, email{' '}
          <a href={`mailto:${site.email.primary}`}>{site.email.primary}</a> and we will act on it.
        </p>
      </article>
      <ClosingCta />
    </div>
  );
}
