import { d } from './fx/Text';

/** Only verifiable numbers. Each counts up when scrolled into view. */
const STATS = [
  { value: 3, suffix: '', label: 'Live projects you can open today' },
  { value: 4, suffix: '+', label: 'Years of professional full-stack experience' },
  { value: 24, suffix: 'h', label: 'Reply time on working days' },
  { value: 2024, suffix: '', label: 'Building for clients since February' },
];

export default function Stats() {
  return (
    <section aria-label="Studio at a glance" className="container-page py-12">
      <ul className="glass grid grid-cols-2 overflow-hidden rounded-[1.75rem] lg:grid-cols-4">
        {STATS.map((s, i) => (
          <li key={s.label} data-reveal style={d(i)} className="relative border-line p-6 text-center sm:p-8 [&:not(:last-child)]:border-r max-lg:[&:nth-child(2)]:border-r-0 max-lg:[&:nth-child(-n+2)]:border-b">
            <p className="font-display text-4xl font-extrabold sm:text-5xl">
              <span className="text-grad" data-count={s.value < 100 ? s.value : undefined} data-suffix={s.suffix}>
                {s.value}
                {s.suffix}
              </span>
            </p>
            <p className="mt-2 text-sm text-muted">{s.label}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
