/**
 * Animated SVG icons. Outlines draw in when their card scrolls into view
 * (.draw + pathLength=100), then a small looping motion keeps them alive.
 * All motion is CSS (see globals.css §6) and stops under reduced motion.
 */
const S = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

function Svg({ size, children }: { size: number; children: React.ReactNode }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden focusable={false} {...S}>
      {children}
    </svg>
  );
}

export type AnimatedIconName =
  | 'web'
  | 'booking'
  | 'store'
  | 'stack'
  | 'ai'
  | 'cloud'
  | 'bed'
  | 'users'
  | 'chat'
  | 'card'
  | 'mail'
  | 'whatsapp'
  | 'rocket'
  | 'idea'
  | 'design'
  | 'code'
  | 'shield'
  | 'clock'
  | 'pin'
  | 'form'
  | 'brand'
  | 'mobile';

export function AnimatedIcon({ name, size = 26 }: { name: AnimatedIconName; size?: number }) {
  switch (name) {
    case 'web':
      return (
        <Svg size={size}>
          <rect className="draw" pathLength={100} x="2.5" y="3.5" width="19" height="14" rx="2.2" />
          <path className="draw" pathLength={100} d="M8 21h8M12 17.5V21" />
          <path className="ai-type" d="M6 8h7" />
          <path className="ai-type d2" d="M6 11h10" />
          <path className="ai-type d3" d="M6 14h5" />
          <path className="ai-blink" d="M17.5 12.5v2.5" />
        </Svg>
      );
    case 'booking':
      return (
        <Svg size={size}>
          <rect className="draw" pathLength={100} x="3" y="4.5" width="18" height="16.5" rx="2.2" />
          <path className="draw" pathLength={100} d="M3 9.5h18M8 2.5v4M16 2.5v4" />
          <path className="ai-check" d="M8.5 15l2.4 2.4 4.6-4.8" />
        </Svg>
      );
    case 'store':
      return (
        <Svg size={size}>
          <g className="ai-bob">
            <path className="draw" pathLength={100} d="M5 8h14l-1.2 11.1a2 2 0 0 1-2 1.9H8.2a2 2 0 0 1-2-1.9L5 8z" />
            <path className="ai-swing" d="M9 8V6.2a3 3 0 0 1 6 0V8" />
          </g>
          <path className="ai-twinkle" d="M20 2.5v3M18.5 4h3" />
        </Svg>
      );
    case 'stack':
      return (
        <Svg size={size}>
          <path className="ai-layer" d="M12 2.8l9 5-9 5-9-5 9-5z" />
          <path className="draw" pathLength={100} d="M3 12.3l9 5 9-5" />
          <path className="draw" pathLength={100} d="M3 16.5l9 5 9-5" />
        </Svg>
      );
    case 'brand':
      return (
        <Svg size={size}>
          <path className="draw" pathLength={100} d="M12 2.8l3.2 6.4-3.2 11.9-3.2-11.9L12 2.8z" />
          <circle className="ai-pulse" cx="12" cy="10.2" r="1.3" />
          <path className="ai-twinkle" d="M18.5 4.5l.6 1.4 1.4.6-1.4.6-.6 1.4-.6-1.4-1.4-.6 1.4-.6z" />
        </Svg>
      );
    case 'mobile':
      return (
        <Svg size={size}>
          <rect className="draw" pathLength={100} x="6.5" y="2.5" width="11" height="19" rx="2.4" />
          <path d="M10.5 18.5h3" />
          <path className="ai-type" d="M9 7h6" />
          <path className="ai-type d2" d="M9 10h4" />
          <circle className="ai-pulse" cx="16.8" cy="4.2" r="1.6" fill="currentColor" stroke="none" />
        </Svg>
      );
    case 'ai':
      return (
        <Svg size={size}>
          <path className="ai-pulse" d="M11 2.5l1.9 5 5.1 1.6-5.1 1.7L11 16l-1.9-5.2L4 9.1l5.1-1.6L11 2.5z" />
          <path className="ai-twinkle" d="M18.5 14.5l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8.8-2z" />
          <path className="ai-twinkle d2" d="M5 17.5l.5 1.3 1.3.5-1.3.5L5 21l-.5-1.2-1.3-.5 1.3-.5.5-1.3z" />
        </Svg>
      );
    case 'cloud':
      return (
        <Svg size={size}>
          <path className="draw" pathLength={100} d="M7 18.5a4.5 4.5 0 0 1-.6-8.96A6 6 0 0 1 18 10a4.25 4.25 0 0 1-.5 8.5H7z" />
          <g className="ai-up">
            <path d="M12 16v-5M9.8 13.2L12 11l2.2 2.2" />
          </g>
        </Svg>
      );
    case 'bed':
      return (
        <Svg size={size}>
          <path className="draw" pathLength={100} d="M3 19V6M3 15h18v4M21 15v-3a3 3 0 0 0-3-3h-7v6" />
          <circle className="ai-pulse" cx="7" cy="11" r="1.8" />
        </Svg>
      );
    case 'users':
      return (
        <Svg size={size}>
          <circle className="draw" pathLength={100} cx="9" cy="8" r="3.2" />
          <path className="draw" pathLength={100} d="M3 20c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5" />
          <g className="ai-bob">
            <circle cx="17" cy="9" r="2.5" />
            <path d="M16 14.6c2.8.2 5 2.2 5 5.4" />
          </g>
        </Svg>
      );
    case 'chat':
      return (
        <Svg size={size}>
          <path className="draw" pathLength={100} d="M4 5h16v11H9l-5 4V5z" />
          <circle className="ai-twinkle" cx="9" cy="10.5" r=".6" fill="currentColor" />
          <circle className="ai-twinkle d2" cx="12" cy="10.5" r=".6" fill="currentColor" />
          <circle className="ai-twinkle" cx="15" cy="10.5" r=".6" fill="currentColor" />
        </Svg>
      );
    case 'card':
      return (
        <Svg size={size}>
          <rect className="draw" pathLength={100} x="2.5" y="5" width="19" height="14" rx="2.2" />
          <path className="draw" pathLength={100} d="M2.5 9.5h19" />
          <path className="ai-type" d="M6 15h4" />
          <circle className="ai-pulse" cx="17" cy="15" r="1.4" />
        </Svg>
      );
    case 'mail':
      return (
        <Svg size={size}>
          <rect className="draw" pathLength={100} x="3" y="5" width="18" height="14" rx="2.4" />
          <path className="ai-bob" d="M3 7l9 6 9-6" />
        </Svg>
      );
    case 'whatsapp':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden className="ai-wiggle" fill="currentColor">
          <path d="M12.04 2C6.55 2 2.1 6.45 2.1 11.94c0 1.75.46 3.46 1.33 4.97L2 22l5.23-1.37a9.9 9.9 0 0 0 4.8 1.23h.01c5.48 0 9.94-4.46 9.94-9.95A9.9 9.9 0 0 0 12.04 2zm0 18.17a8.25 8.25 0 0 1-4.2-1.15l-.3-.18-3.1.81.83-3.03-.2-.31a8.2 8.2 0 0 1-1.26-4.37c0-4.56 3.71-8.27 8.28-8.27a8.27 8.27 0 0 1 8.26 8.28c0 4.56-3.71 8.22-8.3 8.22zm4.53-6.17c-.25-.12-1.47-.72-1.7-.8-.23-.09-.39-.13-.56.12-.16.25-.64.8-.79.97-.14.16-.29.18-.54.06a6.8 6.8 0 0 1-3.36-2.94c-.25-.44.25-.41.72-1.36.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.41-.56-.42h-.47a.9.9 0 0 0-.66.31c-.23.25-.87.85-.87 2.07s.89 2.4 1.01 2.57c.12.16 1.75 2.67 4.24 3.74 1.57.68 2.19.74 2.98.62.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.14-1.18-.06-.11-.22-.17-.47-.29z" />
        </svg>
      );
    case 'rocket':
      return (
        <Svg size={size}>
          <g className="ai-bob">
            <path className="draw" pathLength={100} d="M12 2.5c3.5 2 5.5 5.6 5 10l-2.5 3h-5L7 12.5c-.5-4.4 1.5-8 5-10z" />
            <circle cx="12" cy="9" r="1.7" />
          </g>
          <path className="ai-twinkle" d="M10 19l-.5 2.5M14 19l.5 2.5M12 18.5V22" />
        </Svg>
      );
    case 'idea':
      return (
        <Svg size={size}>
          <path className="draw" pathLength={100} d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2V16h5v-.1c0-.8.4-1.5 1-2A6 6 0 0 0 12 3z" />
          <path className="ai-twinkle" d="M12 7v3M10.5 8.5h3" />
        </Svg>
      );
    case 'design':
      return (
        <Svg size={size}>
          <path className="draw" pathLength={100} d="M12 3a9 9 0 1 0 0 18c1.2 0 1.8-.9 1.4-1.9-.5-1.2.3-2.1 1.5-2.1H17a4 4 0 0 0 4-4c0-5.5-4-10-9-10z" />
          <circle className="ai-pulse" cx="7.5" cy="11" r="1.1" fill="currentColor" />
          <circle className="ai-pulse" cx="10.5" cy="7" r="1.1" fill="currentColor" />
          <circle className="ai-pulse" cx="15" cy="7.5" r="1.1" fill="currentColor" />
        </Svg>
      );
    case 'code':
      return (
        <Svg size={size}>
          <path className="draw" pathLength={100} d="M8 7l-5 5 5 5M16 7l5 5-5 5" />
          <path className="ai-blink" d="M13.5 5l-3 14" />
        </Svg>
      );
    case 'shield':
      return (
        <Svg size={size}>
          <path className="draw" pathLength={100} d="M12 3l8 3v6c0 4.5-3.4 8.2-8 9-4.6-.8-8-4.5-8-9V6l8-3z" />
          <path className="ai-check" d="M8.5 12l2.5 2.5 4.5-5" />
        </Svg>
      );
    case 'clock':
      return (
        <Svg size={size}>
          <circle className="draw" pathLength={100} cx="12" cy="12" r="9" />
          <path d="M12 12V7.5" className="ai-hand" />
          <path d="M12 12l3 1.8" />
        </Svg>
      );
    case 'pin':
      return (
        <Svg size={size}>
          <g className="ai-bob">
            <path className="draw" pathLength={100} d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
            <circle cx="12" cy="9.5" r="2.5" />
          </g>
        </Svg>
      );
    case 'form':
      return (
        <Svg size={size}>
          <rect className="draw" pathLength={100} x="4" y="3" width="16" height="18" rx="2" />
          <path className="ai-type" d="M8 8h8" />
          <path className="ai-type d2" d="M8 12h8" />
          <path className="ai-check" d="M8 16.5l1.6 1.6 3-3" />
        </Svg>
      );
  }
}

/** Icon inside a glowing tile. */
export function IconTile({ name, size = 'md' }: { name: AnimatedIconName; size?: 'sm' | 'md' | 'lg' }) {
  const box = size === 'lg' ? 'size-16' : size === 'sm' ? 'size-10' : 'size-12';
  const px = size === 'lg' ? 32 : size === 'sm' ? 20 : 26;
  return (
    <span className={`icon-tile ${box}`}>
      <AnimatedIcon name={name} size={px} />
    </span>
  );
}
