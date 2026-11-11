export interface Project {
  id: string;
  name: string;
  clientType: string;
  /** Short one-line outcome for cards. */
  summary: string;
  live: { href: string; label: string } | null;
  date?: string;
  images: { desktop: string; mobile?: string; alt: string; mobileAlt?: string } | null;
  problem: string;
  built: string[];
  /** null = not confirmed yet, so the stack line is hidden. */
  stack: string[] | null;
  result: string;
  cta: { label: string; href: string; external?: boolean };
  accent: string;
}

export const projects: Project[] = [
  {
    id: 'hostlify',
    name: 'Hostlify',
    clientType: 'Our own product — hostels and PGs',
    summary: 'One app for hostel and PG owners: bed bookings, staff, complaints and rent collection.',
    live: { href: 'https://hostlify.in/', label: 'hostlify.in' },
    images: {
      desktop: '/images/work/hostlify-desktop.webp',
      mobile: '/images/work/hostlify-mobile.webp',
      alt: 'Hostlify hostel and PG management homepage on desktop',
      mobileAlt: 'Hostlify homepage on a phone',
    },
    problem: 'Hostel and PG owners manage beds, enquiries and complaints on paper and WhatsApp.',
    built: [
      'Bed booking in 3 steps',
      'Staff roles and complaint categories',
      'Online payments via Razorpay',
      'Early access — free up to 30 beds',
    ],
    // TODO(before launch): confirm the exact stack line from the product, then set it here.
    stack: null,
    result: 'Live at hostlify.in with early access open — open it and book a demo to see it working.',
    cta: { label: 'Book a 15-minute demo', href: '/work/hostlify#enquiry' },
    accent: '#2DD4BF',
  },
  {
    id: 'rk-fashions',
    name: 'RadhaKrishna Fashions',
    clientType: 'Ethnic-wear retail store',
    summary: 'A responsive online store for sarees, ethnic wear, kidswear and ready-to-wear.',
    live: { href: 'https://www.rkfashions.shop/', label: 'rkfashions.shop' },
    date: 'Completed Jan 2025',
    images: {
      desktop: '/images/work/rkfashions-desktop.webp',
      mobile: '/images/work/rkfashions-mobile.webp',
      alt: 'RadhaKrishna Fashions online store homepage on desktop',
      mobileAlt: 'RadhaKrishna Fashions store on a phone',
    },
    problem: 'A premium ethnic-wear business needed to sell online beyond the shop floor.',
    built: [
      'Responsive e-commerce storefront',
      'Category shopping for sarees, ethnic wear, kids and ready-to-wear',
      'Product pages built for phone shoppers',
    ],
    stack: ['React', 'Tailwind CSS', 'TypeScript', 'Vite'],
    result: 'Live at rkfashions.shop — open it on your phone and browse a category.',
    cta: { label: 'View live store', href: 'https://www.rkfashions.shop/', external: true },
    accent: '#F472B6',
  },
  {
    id: 'ap-superspeciality',
    name: 'AP Superspeciality',
    clientType: 'Dental / super-speciality healthcare practice',
    summary: 'A modern practice website that helps patients find treatments and reach the clinic quickly.',
    live: { href: 'https://apsuperspeciality.com/', label: 'apsuperspeciality.com' },
    images: {
      desktop: '/images/work/apsuperspeciality-desktop.webp',
      mobile: '/images/work/apsuperspeciality-mobile.webp',
      alt: 'AP Superspeciality dental hospital homepage on desktop',
      mobileAlt: 'AP Superspeciality homepage on a phone',
    },
    problem: 'A dental / super-speciality practice needed patients to find services and reach the clinic quickly.',
    built: [
      'A modern practice website with clear services',
      'Treatments patients can browse by what they need',
      'Contact routes — appointment, call and WhatsApp — always in reach',
    ],
    stack: ['React', 'Tailwind CSS', 'TypeScript', 'Vite', 'Next.js'],
    result: 'Live at apsuperspeciality.com — open it and try to book a visit.',
    cta: { label: 'View live site', href: 'https://apsuperspeciality.com/', external: true },
    accent: '#F87171',
  },
  {
    id: 'this-website',
    name: 'Radhakrishna Digital',
    clientType: 'This website — designed and built in-house',
    summary: 'The site you are reading: React, Next.js and a live, animated project showcase.',
    live: null,
    images: null,
    problem: 'A studio website needed to look distinctive and still load fast, read well and work on any phone.',
    built: [
      'Prerendered pages with real, searchable text',
      'Animated live-project showcase that never blocks the headline',
      'Light and dark themes, reduced-motion support',
    ],
    stack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    result: 'You are looking at it — try it on your phone.',
    cta: { label: 'Start a project', href: '/start-a-project' },
    accent: '#22D3EE',
  },
];

export const getProject = (id: string) => projects.find((p) => p.id === id)!;
