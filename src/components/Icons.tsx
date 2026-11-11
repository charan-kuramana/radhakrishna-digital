import type { SVGProps } from 'react';

type P = SVGProps<SVGSVGElement> & { size?: number };

const base = (size = 20): SVGProps<SVGSVGElement> => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  'aria-hidden': true,
  focusable: false,
});

const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;

export const ArrowRight = ({ size = 16, className = '', ...p }: P) => (
  <svg {...base(size)} {...stroke} strokeWidth={2.3} {...p} className={`i-arrow ${className}`}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

export const ExternalIcon = ({ size = 14, ...p }: P) => (
  <svg {...base(size)} {...stroke} {...p}>
    <path d="M14 4h6v6M20 4l-9 9M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" />
  </svg>
);

export const CheckIcon = ({ size = 18, ...p }: P) => (
  <svg {...base(size)} {...stroke} strokeWidth={2.4} {...p}>
    <path d="M5 12.5l4.2 4.2L19 7" />
  </svg>
);

export const MailIcon = ({ size = 18, ...p }: P) => (
  <svg {...base(size)} {...stroke} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2.4" />
    <path d="M3 7l9 6 9-6" />
  </svg>
);

export const PinIcon = ({ size = 18, ...p }: P) => (
  <svg {...base(size)} {...stroke} {...p}>
    <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
);

export const ClockIcon = ({ size = 18, ...p }: P) => (
  <svg {...base(size)} {...stroke} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

export const ShieldIcon = ({ size = 18, ...p }: P) => (
  <svg {...base(size)} {...stroke} {...p}>
    <path d="M12 3l8 3v6c0 4.5-3.4 8.2-8 9-4.6-.8-8-4.5-8-9V6l8-3z" />
    <path d="M8.5 12l2.5 2.5 4.5-5" />
  </svg>
);

export const MenuIcon = ({ size = 22, ...p }: P) => (
  <svg {...base(size)} {...stroke} {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const CloseIcon = ({ size = 22, ...p }: P) => (
  <svg {...base(size)} {...stroke} {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const SunIcon = ({ size = 18, ...p }: P) => (
  <svg {...base(size)} {...stroke} {...p}>
    <circle cx="12" cy="12" r="4.2" />
    <path d="M12 2v2M12 20v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2 12h2M20 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
  </svg>
);

export const MoonIcon = ({ size = 18, ...p }: P) => (
  <svg {...base(size)} fill="currentColor" {...p}>
    <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5z" />
  </svg>
);

export const WhatsAppIcon = ({ size = 18, ...p }: P) => (
  <svg {...base(size)} fill="currentColor" {...p}>
    <path d="M12.04 2C6.55 2 2.1 6.45 2.1 11.94c0 1.75.46 3.46 1.33 4.97L2 22l5.23-1.37a9.9 9.9 0 0 0 4.8 1.23h.01c5.48 0 9.94-4.46 9.94-9.95A9.9 9.9 0 0 0 12.04 2zm0 18.17h-.01a8.25 8.25 0 0 1-4.2-1.15l-.3-.18-3.1.81.83-3.03-.2-.31a8.2 8.2 0 0 1-1.26-4.37c0-4.56 3.71-8.27 8.28-8.27a8.27 8.27 0 0 1 8.26 8.28c0 4.56-3.71 8.22-8.3 8.22zm4.53-6.17c-.25-.12-1.47-.72-1.7-.8-.23-.09-.39-.13-.56.12-.16.25-.64.8-.79.97-.14.16-.29.18-.54.06a6.8 6.8 0 0 1-3.36-2.94c-.25-.44.25-.41.72-1.36.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.41-.56-.42h-.47a.9.9 0 0 0-.66.31c-.23.25-.87.85-.87 2.07s.89 2.4 1.01 2.57c.12.16 1.75 2.67 4.24 3.74 1.57.68 2.19.74 2.98.62.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.14-1.18-.06-.11-.22-.17-.47-.29z" />
  </svg>
);

export const LinkedInIcon = ({ size = 18, ...p }: P) => (
  <svg {...base(size)} fill="currentColor" {...p}>
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
  </svg>
);

export const InstagramIcon = ({ size = 18, ...p }: P) => (
  <svg {...base(size)} fill="none" stroke="currentColor" strokeWidth={1.9} {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none" />
  </svg>
);

export const FacebookIcon = ({ size = 18, ...p }: P) => (
  <svg {...base(size)} fill="currentColor" {...p}>
    <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z" />
  </svg>
);

export const FiverrIcon = ({ size = 18, ...p }: P) => (
  <svg {...base(size)} fill="currentColor" {...p}>
    <circle cx="12" cy="12" r="11" opacity=".18" />
    <text x="12" y="16.5" textAnchor="middle" fontSize="12" fontWeight="800" fontFamily="Arial, sans-serif">fi</text>
  </svg>
);

export const UpworkIcon = ({ size = 18, ...p }: P) => (
  <svg {...base(size)} fill="currentColor" {...p}>
    <circle cx="12" cy="12" r="11" opacity=".18" />
    <text x="12" y="16.5" textAnchor="middle" fontSize="11" fontWeight="800" fontFamily="Arial, sans-serif">Up</text>
  </svg>
);

/* Service icons */
export function ServiceGlyph({ name, size = 22 }: { name: string; size?: number }) {
  const s = { ...base(size), ...stroke, strokeWidth: 1.9 };
  switch (name) {
    case 'web':
      return (
        <svg {...s}>
          <rect x="3" y="4" width="18" height="14" rx="2" />
          <path d="M3 8h18M8 21h8M12 18v3" />
        </svg>
      );
    case 'booking':
      return (
        <svg {...s}>
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M3 10h18M8 3v4M16 3v4M8 14h3M8 17h6" />
        </svg>
      );
    case 'store':
      return (
        <svg {...s}>
          <path d="M5 8h14l-1.2 11.1a2 2 0 0 1-2 1.9H8.2a2 2 0 0 1-2-1.9L5 8z" />
          <path d="M9 8V6a3 3 0 0 1 6 0v2" />
        </svg>
      );
    case 'stack':
      return (
        <svg {...s}>
          <path d="M12 3l9 5-9 5-9-5 9-5z" />
          <path d="M3 13l9 5 9-5" />
        </svg>
      );
    case 'ai':
      return (
        <svg {...s}>
          <path d="M12 3l1.8 4.6L18.5 9l-4.7 1.6L12 15l-1.8-4.4L5.5 9l4.7-1.4L12 3z" />
          <path d="M18 15l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8.8-2z" />
        </svg>
      );
    case 'cloud':
      return (
        <svg {...s}>
          <path d="M7 18a4.5 4.5 0 0 1-.6-8.96A6 6 0 0 1 18 9.5a4.25 4.25 0 0 1-.5 8.5H7z" />
        </svg>
      );
    default:
      return null;
  }
}
