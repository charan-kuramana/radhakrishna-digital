import { site } from './site';
import { timingNote } from './packages';

/** Answers use only facts already published on this site. */
export const faqs = [
  {
    q: 'How does payment work?',
    a: `50% advance to start and the final 50% at launch. You can pay by ${site.paymentMethods.charAt(0).toLowerCase()}${site.paymentMethods.slice(1)} ${site.safePayment}`,
  },
  { q: 'How long does a website take?', a: timingNote },
  {
    q: 'Who will I actually be working with?',
    a: `${site.founder.name}, the founder — directly. You talk to the person building your project, not a middleman.`,
  },
  {
    q: 'What do I need to provide?',
    a: 'Your business details, text, images and logo as agreed in the scope. Before we start we confirm in writing what you will supply and by when.',
  },
  {
    q: 'Do you work with clients outside India?',
    a: 'Yes. You can hire us through Fiverr or Upwork with their escrow, or pay directly against a proper invoice.',
  },
  {
    q: 'Can you host and look after the site after launch?',
    a: 'Yes — deployment, HTTPS, performance and updates are part of our Hosting, Cloud and Care service.',
  },
];
