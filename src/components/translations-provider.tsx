'use client';

import { createInstance, type Resource } from 'i18next';
import { ReactNode, useState } from 'react';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { i18nConfig } from '@/i18nConfig';
import { NAMESPACES } from '@/lib/i18n';

export default function TranslationsProvider({
  children,
  locale,
  resources,
}: {
  children: ReactNode;
  locale: string;
  resources: Record<string, unknown>;
}) {
  const [i18n] = useState(() => {
    const instance = createInstance();
    instance.use(initReactI18next).init({
      lng: locale,
      resources: { [locale]: resources } as Resource,
      fallbackLng: i18nConfig.defaultLocale,
      supportedLngs: i18nConfig.locales,
      defaultNS: 'common',
      fallbackNS: 'common',
      ns: NAMESPACES,
    });
    return instance;
  });

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
