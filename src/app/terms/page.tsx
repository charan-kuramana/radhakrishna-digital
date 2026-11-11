import type { Metadata } from 'next';
import Link from 'next/link';
import ClosingCta from '@/components/ClosingCta';
import { PageHero } from '@/components/sections';
import { AuroraBg } from '@/components/fx/Backgrounds';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Terms — Projects and Payments',
  description: 'How Radhakrishna Digital agrees scope, takes payment and hands over projects: 50% advance, 50% on delivery, safe payment methods only.',
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <div data-page="legal">
      <PageHero bg={<AuroraBg />} eyebrow="Legal" title={["Terms —", { text: "projects and payments.", grad: true }]} intro="Last updated 10 November 2026. How we agree scope, take payment and hand over your project." />
      <article className="container-page prose-legal max-w-3xl py-12">
        <p>
          These terms describe how {site.name}, {site.location}, works with clients. The written scope agreed for your project sits
          alongside these terms; where the two differ, the written scope wins.
        </p>

        <h2>Scope</h2>
        <p>
          Every project starts with an enquiry and a call. We then confirm the scope, deliverables, timeline and price in writing before any
          work begins. Package prices and delivery times are listed on the{' '}
          <Link href="/start-a-project#packages">Start a Project</Link> page.
        </p>

        <h2>Payment</h2>
        <ul>
          <li>50% advance to start the work.</li>
          <li>The final 50% at launch, once files, access and handover checks are completed with you.</li>
          <li>Payment methods: {site.paymentMethods}</li>
          <li>{site.safePayment}</li>
        </ul>

        <h2>Reviews and revisions</h2>
        <p>
          You receive a first version for review. Revisions are included within the agreed scope; anything outside it is quoted separately
          before we do it.
        </p>

        <h2>Your content</h2>
        <p>
          You supply the text, images and business details agreed in the scope, by the dates agreed. Delays in content can move the delivery
          date.
        </p>

        <h2>Handover</h2>
        <p>At launch we hand over the files and access agreed in the scope and check them with you.</p>

        <h2>Platform projects</h2>
        <p>Work ordered through Fiverr or Upwork follows that platform’s terms and escrow, together with the scope agreed there.</p>

        <h2>Questions</h2>
        <p>
          Email <a href={`mailto:${site.email.primary}`}>{site.email.primary}</a>.
        </p>
      </article>
      <ClosingCta />
    </div>
  );
}
