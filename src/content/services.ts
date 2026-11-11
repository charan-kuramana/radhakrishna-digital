export type ServiceIcon = 'brand' | 'web' | 'booking' | 'store' | 'stack' | 'mobile' | 'ai' | 'cloud';

export interface Service {
  id: string;
  title: string;
  icon: ServiceIcon;
  /** One outcome sentence (copy bank, Section 4). */
  outcome: string;
  /** What the client receives. Only things we actually deliver. */
  deliverables: string[];
  /** Price signal: a package starting point, or a quote. */
  price: { label: string; href: string };
  proof?: { label: string; href: string };
}

export const services: Service[] = [
  {
    id: 'brand-identity',
    title: 'Logo and Brand Identity',
    icon: 'brand',
    outcome:
      'A logo, colours and type that make your business look trustworthy from the first glance — ready for your website, app, social media and print.',
    deliverables: ['Logo design', 'Colour palette and fonts', 'Social media profile and cover images', 'Files for web and print'],
    price: { label: 'Get a quote', href: '/start-a-project#enquiry' },
  },
  {
    id: 'business-websites',
    title: 'Business Websites',
    icon: 'web',
    outcome:
      'A fast, mobile-first website that explains what you do, proves it, and turns visitors into enquiries. Pages, contact form, WhatsApp and Google Maps included.',
    deliverables: ['Mobile-first page design', 'Contact form and WhatsApp enquiry button', 'Google Maps location', 'Basic SEO titles, descriptions and sitemap'],
    price: { label: 'From $300', href: '/start-a-project#packages' },
    proof: { label: 'See AP Superspeciality', href: '/work#ap-superspeciality' },
  },
  {
    id: 'booking-systems',
    title: 'Booking and Business Systems',
    icon: 'booking',
    outcome:
      'Custom systems for bookings, admissions, enquiries and operations — like Hostlify for hostels and PGs, with roles, payments and dashboards.',
    deliverables: ['Booking and enquiry flows', 'Staff roles and permissions', 'Online payments', 'Owner dashboards'],
    price: { label: 'Get a quote', href: '/start-a-project#enquiry' },
    proof: { label: 'See Hostlify', href: '/work/hostlify' },
  },
  {
    id: 'ecommerce',
    title: 'E-commerce Stores',
    icon: 'store',
    outcome:
      'Category shopping, product pages and a checkout your customers can finish on a phone — as built for RK Fashions.',
    deliverables: ['Category and product pages', 'Mobile-friendly checkout', 'Responsive storefront', 'Launch and handover'],
    price: { label: 'Get a quote', href: '/start-a-project#enquiry' },
    proof: { label: 'See RK Fashions', href: '/work#rk-fashions' },
  },
  {
    id: 'web-applications',
    title: 'Full-Stack Web Applications',
    icon: 'stack',
    outcome:
      'React and Next.js front ends with Java and Spring Boot back ends, built end to end and ready to scale.',
    deliverables: ['React / Next.js front end', 'Java and Spring Boot back end and APIs', 'Database design', 'Deployment to the cloud'],
    price: { label: 'Get a quote', href: '/start-a-project#enquiry' },
  },
  {
    id: 'mobile-apps',
    title: 'Mobile Apps',
    icon: 'mobile',
    outcome:
      'An app your customers can install on their phones, connected to the same back end as your website — so bookings, orders and data stay in one place.',
    deliverables: ['Android and iOS app', 'Connected to your website and back end', 'Push notifications', 'Help with store publishing'],
    price: { label: 'Get a quote', href: '/start-a-project#enquiry' },
  },
  {
    id: 'ai-features',
    title: 'AI-Powered Features',
    icon: 'ai',
    outcome:
      'Practical AI inside real products — smart search, content help and automation where it saves time, not demos that go nowhere.',
    deliverables: ['Smart search', 'Content assistance', 'Workflow automation', 'Integrated into your existing product'],
    price: { label: 'Get a quote', href: '/start-a-project#enquiry' },
  },
  {
    id: 'hosting-care',
    title: 'Domain, Hosting and Deployment',
    icon: 'cloud',
    outcome:
      'Domain, hosting, deployment, HTTPS and updates handled for you, so your site and apps stay fast, secure and live after launch.',
    deliverables: ['Domain and business email setup', 'Hosting and deployment', 'HTTPS and performance checks', 'Ongoing updates and care'],
    price: { label: 'Get a quote', href: '/start-a-project#enquiry' },
  },
];
