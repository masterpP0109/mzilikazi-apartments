import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/apartments`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/victoria-falls`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/faq`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.8,
    },
  ];

  // [PLACEHOLDER — add dynamic apartment slugs from Sanity once content is live]
  // Example:
  // const apartments = await sanityClient.fetch(APARTMENTS_QUERY);
  // const apartmentRoutes = apartments.map(apt => ({
  //   url: `${SITE_URL}/apartments/${apt.slug.current}`,
  //   lastModified: now,
  //   changeFrequency: 'weekly' as const,
  //   priority: 0.85,
  // }));
  // return [...staticRoutes, ...apartmentRoutes];

  return staticRoutes;
}
