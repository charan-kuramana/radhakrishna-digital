/**
 * Starter packages — mirror the live Fiverr gig (hostel / PG booking website).
 *
 * TODO(before launch): copy the exact inclusions from the live Fiverr gig into
 * `includes` for each package so the website and the gig never contradict each
 * other. Do not invent inclusions to fill the list.
 */
export interface Package {
  name: string;
  price: string;
  delivery: string;
  description: string;
  includes: string[];
  featured?: boolean;
}

export const packages: Package[] = [
  {
    name: 'Basic',
    price: '$300',
    delivery: '3 days',
    description: 'Modern hostel or PG booking website with WhatsApp enquiry — core pages and enquiry flow.',
    includes: [],
  },
  {
    name: 'Standard',
    price: '$500',
    delivery: '5 days',
    description: 'Everything in Basic, with more pages, richer content sections and stronger enquiry handling.',
    includes: [],
    featured: true,
  },
  {
    name: 'Premium',
    price: '$800',
    delivery: '10 days',
    description: 'The complete build — fullest page set, polish and launch support.',
    includes: [],
  },
];

export const customProject = {
  name: 'Custom project',
  price: 'Get a quote',
  delivery: 'Agreed per project',
  description: 'Business websites, e-commerce and custom systems.',
  hourly: '$20/hr via Upwork',
};

export const processSteps = [
  { title: 'Enquiry and call', body: 'We talk through your project and confirm the scope in writing.' },
  { title: '50% advance to start', body: 'Work begins once the advance is received against a proper invoice.' },
  { title: 'First version for your review', body: 'You see real pages early, not a slide deck.' },
  { title: 'Revisions within the agreed scope', body: 'We refine together until it matches what we agreed.' },
  { title: 'Final 50% and launch', body: 'Files, access and handover checks completed with you.' },
];

/** The four-stage process kept from the original site, with honest timing. */
export const stages = [
  { title: 'Idea', body: 'A call to understand the business problem, then a written scope and quote.' },
  { title: 'Design', body: 'Page structure and look agreed with you before anything is built.' },
  { title: 'Build', body: 'A working first version for your review, then revisions within scope.' },
  { title: 'Launch', body: 'Domain, HTTPS and handover — you get the files and the access.' },
];

export const timingNote =
  'Package websites are delivered in 3, 5 or 10 days. Custom projects get a written timeline with the quote.';
