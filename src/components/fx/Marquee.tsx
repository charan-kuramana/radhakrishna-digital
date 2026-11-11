import type { ReactNode } from 'react';
import { vars } from './Text';

/** Infinite, pause-on-hover marquee. Content is duplicated once (the copy is aria-hidden). */
export default function Marquee({
  items,
  speed = '40s',
  reverse = false,
  className = '',
  label,
}: {
  items: ReactNode[];
  speed?: string;
  reverse?: boolean;
  className?: string;
  label: string;
}) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-4 pr-4">
      {items.map((it, i) => (
        <li key={i} className="shrink-0">
          {it}
        </li>
      ))}
    </ul>
  );
  return (
    <div className={`marquee ${reverse ? 'reverse' : ''} ${className}`} aria-label={label} role="region">
      <div className="marquee-track" style={vars({ '--speed': speed })}>
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

export const TECH = [
  'React',
  'Next.js',
  'TypeScript',
  'Tailwind CSS',
  'Vite',
  'Java',
  'Spring Boot',
  'Node.js',
  'Python',
  'Three.js',
  'Azure',
  'Google Cloud',
  'Razorpay',
  'AI integrations',
];

export function TechChip({ name }: { name: string }) {
  return (
    <span className="chip px-5 py-2.5 text-[0.95rem] text-ink">
      <span aria-hidden className="size-1.5 rounded-full bg-gradient-to-r from-accent to-accent-2" />
      {name}
    </span>
  );
}
