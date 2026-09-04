import { i18nConfig, type Locale } from '@/i18nConfig';

export function localizePath(pathname: string, targetLocale: Locale): string {
  const segments = pathname.split('/');
  const maybeLocale = segments[1];
  const isLocalePrefixed = (i18nConfig.locales as readonly string[]).includes(maybeLocale);
  const rest = isLocalePrefixed ? '/' + segments.slice(2).join('/') : pathname;
  const cleanRest = rest === '/' ? '' : rest;

  return targetLocale === i18nConfig.defaultLocale ? cleanRest || '/' : `/${targetLocale}${cleanRest}`;
}
