import { faqs } from '@/content/faq';
import { d } from './fx/Text';

/** Native <details> accordion — accessible, works without JS, animates where supported. */
export default function Faq() {
  return (
    <div className="grid gap-3">
      {faqs.map((f, i) => (
        <details key={f.q} className="faq card spot group overflow-hidden" data-reveal style={d(i, 70)} name="faq">
          <summary className="flex min-h-16 items-center justify-between gap-4 px-5 py-4 sm:px-6">
            <span className="font-display text-base font-bold sm:text-lg">{f.q}</span>
            <span className="faq-plus grid size-9 shrink-0 place-items-center rounded-full border border-line text-accent">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden>
                <path d="M12 5v14M5 12h14" />
              </svg>
            </span>
          </summary>
          <p className="px-5 pb-5 text-muted sm:px-6">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
