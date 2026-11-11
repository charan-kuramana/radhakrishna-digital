import { Fragment, type CSSProperties, type ElementType } from 'react';

export type HeadingPart = string | { text: string; grad?: boolean; br?: boolean; mark?: boolean };

/** CSS custom properties in a style prop. */
export const vars = (o: Record<string, string | number>) => o as CSSProperties;

/**
 * Headline that reveals word by word (blur + rise). Pure CSS — it plays on
 * first paint with no JavaScript, and the full text stays in the HTML for SEO.
 */
export function AnimatedHeading({
  as: Tag = 'h1',
  parts,
  className = '',
  id,
  delay = 0,
}: {
  as?: ElementType;
  parts: HeadingPart[];
  className?: string;
  id?: string;
  delay?: number;
}) {
  let i = delay;
  return (
    <Tag id={id} className={`words ${className}`}>
      {parts.map((part, pi) => {
        const p: Exclude<HeadingPart, string> = typeof part === 'string' ? { text: part } : part;
        const words = p.text
          .split(/\s+/)
          .filter(Boolean)
          .map((w, wi, all) => (
            <Fragment key={wi}>
              <span className={`w ${p.grad ? 'text-grad' : ''}`} style={vars({ '--i': i++ })}>
                {w}
              </span>
              {(!p.mark || wi < all.length - 1) && ' '}
            </Fragment>
          ));
        return (
          <Fragment key={pi}>
            {p.mark ? (
              <>
                <span className="relative inline-block whitespace-nowrap">
                  {words}
                  <svg aria-hidden className="scribble" viewBox="0 0 300 24" preserveAspectRatio="none" fill="none">
                    <defs>
                      <linearGradient id="scribble-g" x1="0" x2="1">
                        <stop offset="0" stopColor="var(--accent)" />
                        <stop offset="1" stopColor="var(--accent-2)" />
                      </linearGradient>
                    </defs>
                    <path
                      pathLength={100}
                      d="M4 16 C 60 6, 120 4, 180 9 S 270 18, 296 8"
                      stroke="url(#scribble-g)"
                      strokeWidth="5"
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                </span>{' '}
              </>
            ) : (
              words
            )}
            {p.br && <br className="hidden sm:block" />}
          </Fragment>
        );
      })}
    </Tag>
  );
}

/** Stagger delay helper for lists: style={d(i)} */
export const d = (i: number, step = 90) => vars({ '--d': `${i * step}ms` });
