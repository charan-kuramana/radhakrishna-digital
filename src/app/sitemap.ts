import type { MetadataRoute } from 'next';
import { site } from '@/content/site';

export const dynamic = 'force-static';

const routes = ['', '/services', '/work', '/work/hostlify', '/about', '/start-a-project', '/contact', '/privacy', '/terms'];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((r) => ({
    url: `${site.url}${r}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: r === '' ? 1 : r === '/privacy' || r === '/terms' ? 0.3 : 0.8,
  }));
}
