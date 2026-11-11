/**
 * Testimonials — ONLY real ones, approved by the client.
 * Template: quote, client first name and business type, project, and (only with permission) a link.
 * While this list is empty the homepage shows "Recent work" instead. Never write one yourself.
 */
export interface Testimonial {
  quote: string;
  name: string;
  business: string;
  project: string;
  link?: string;
}
export const testimonials: Testimonial[] = [];

/**
 * Latest posts for the homepage social strip. Add your latest LinkedIn post and
 * Instagram reel here (link + a thumbnail saved under public/images/social/).
 * While empty, the strip shows Follow cards that link to the profiles.
 */
export interface SocialPost {
  platform: 'linkedin' | 'instagram';
  href: string;
  thumbnail: string;
  alt: string;
  caption: string;
}
export const latestPosts: SocialPost[] = [];
