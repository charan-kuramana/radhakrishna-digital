import Image from 'next/image';
import type { ReactNode } from 'react';

export function BrowserFrame({
  src,
  alt,
  url,
  sizes = '100vw',
  priority,
  className = '',
}: {
  src: string;
  alt: string;
  url?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={`browser ${className}`}>
      <div className="browser-bar" aria-hidden>
        <i />
        <i />
        <i />
        {url && (
          <span className="ml-3 flex min-w-0 flex-1 items-center gap-1.5 truncate rounded-md bg-bg/70 px-2.5 py-1 text-[0.7rem] text-muted">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
              <rect x="5" y="11" width="14" height="10" rx="2" />
              <path d="M8 11V7a4 4 0 0 1 8 0v4" />
            </svg>
            {url}
          </span>
        )}
      </div>
      <div className="overflow-hidden">
        <Image
          src={src}
          alt={alt}
          width={1280}
          height={800}
          sizes={sizes}
          priority={priority}
          className="aspect-[16/10] h-auto w-full object-cover object-top transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
        />
      </div>
    </div>
  );
}

export function PhoneFrame({ src, alt, className = '', sizes = '240px' }: { src: string; alt: string; className?: string; sizes?: string }) {
  return (
    <div className={`phone ${className}`}>
      <div className="relative">
        <span aria-hidden className="absolute top-1.5 left-1/2 z-10 h-4 w-16 -translate-x-1/2 rounded-full bg-[#0d1117]" />
        <Image src={src} alt={alt} width={600} height={1298} sizes={sizes} className="h-auto w-full" />
      </div>
    </div>
  );
}

/** Small floating notification card used as decoration. */
export function Toast({ icon, title, note, className = '', style }: { icon: ReactNode; title: string; note: string; className?: string; style?: React.CSSProperties }) {
  return (
    <div aria-hidden className={`glass flex items-center gap-3 rounded-2xl px-4 py-3 shadow-2xl ${className}`} style={style}>
      <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent">{icon}</span>
      <span className="min-w-0">
        <span className="block text-sm font-bold whitespace-nowrap">{title}</span>
        <span className="block text-xs whitespace-nowrap text-muted">{note}</span>
      </span>
    </div>
  );
}
