import { cache } from 'react';
import { createInstance, type i18n, type Resource } from 'i18next';
import { i18nConfig, type Locale } from '@/i18nConfig';

const NAMESPACES = ['common', 'hero', 'about', 'expertise', 'projects', 'timeline', 'skills', 'contact'] as const;

async function loadResources(locale: Locale) {
  const modules = await Promise.all(
    NAMESPACES.map((ns) => import(`../locales/${locale}/${ns}.json`))
  );

  return NAMESPACES.reduce<Record<string, unknown>>((acc, ns, index) => {
    acc[ns] = modules[index].default;
    return acc;
  }, {});
}

const initTranslationsCached = cache(async (locale: string) => {
  const i18nInstance = createInstance();

  await i18nInstance.init({
    lng: locale,
    resources: { [locale]: await loadResources(locale as Locale) } as Resource,
    fallbackLng: i18nConfig.defaultLocale,
    supportedLngs: i18nConfig.locales,
    defaultNS: 'common',
    fallbackNS: 'common',
    ns: NAMESPACES,
    preload: [],
  });

  return {
    i18n: i18nInstance,
    resources: i18nInstance.services.resourceStore.data,
    t: i18nInstance.t,
  };
});

export default async function initTranslations(
  locale: string,
  i18nInstance?: i18n,
  resources?: Resource
) {
  if (!i18nInstance && !resources) return initTranslationsCached(locale);

  i18nInstance = i18nInstance || createInstance();

  const finalResources: Resource =
    resources || ({ [locale]: await loadResources(locale as Locale) } as Resource);

  await i18nInstance.init({
    lng: locale,
    resources: finalResources,
    fallbackLng: i18nConfig.defaultLocale,
    supportedLngs: i18nConfig.locales,
    defaultNS: 'common',
    fallbackNS: 'common',
    ns: NAMESPACES,
    preload: [],
  });

  return {
    i18n: i18nInstance,
    resources: i18nInstance.services.resourceStore.data,
    t: i18nInstance.t,
  };
}

export { NAMESPACES };
