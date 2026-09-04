export const i18nConfig = {
  locales: ['en', 'de', 'ru', 'uk'],
  defaultLocale: 'de',
  localeDetector: false,
  localeCookie: '',
} as const;

export type Locale = (typeof i18nConfig)['locales'][number];
