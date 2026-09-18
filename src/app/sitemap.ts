import type { MetadataRoute } from 'next';
import { i18nConfig } from '@/i18nConfig';
import { localizePath } from '@/lib/locale-path';
import { PROJECT_IDS } from '@/lib/project-visuals';

const SITE_URL = 'https://vt-cv-site.vercel.app';

function alternates(pathname: string) {
  return Object.fromEntries(
    i18nConfig.locales.map((locale) => [locale, `${SITE_URL}${localizePath(pathname, locale)}`])
  );
}

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['/', ...PROJECT_IDS.map((id) => `/projects/${id}`)];

  return i18nConfig.locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${SITE_URL}${localizePath(path, locale)}`,
      lastModified: new Date(),
      changeFrequency: path === '/' ? 'weekly' : 'monthly',
      priority: path === '/' ? 1 : 0.7,
      alternates: { languages: alternates(path) },
    }))
  );
}
