import Link from 'next/link';
import ClosingCta from '@/components/ClosingCta';

export default function NotFound() {
  return (
    <div data-page="legal">
      <section className="container-page py-24 text-center">
        <p className="eyebrow">404</p>
        <h1 className="mt-3 text-4xl font-extrabold">This page doesn’t exist</h1>
        <p className="mx-auto mt-4 max-w-md text-muted">The link may be old. Here are the places most people are looking for:</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-secondary">
            Home
          </Link>
          <Link href="/work" className="btn btn-secondary">
            Our work
          </Link>
          <Link href="/services" className="btn btn-secondary">
            Services
          </Link>
        </div>
      </section>
      <ClosingCta />
    </div>
  );
}
