'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { i18nConfig, type Locale } from '@/i18nConfig';
import { localizePath } from '@/lib/locale-path';
import { Reveal } from '@/components/reveal';

export default function NotFound() {
  const { t, i18n } = useTranslation('common');
  const locale = i18n.language as Locale;
  const home = localizePath('/', (i18nConfig.locales as readonly string[]).includes(locale) ? locale : i18nConfig.defaultLocale);

  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,color-mix(in_oklch,var(--primary)_14%,transparent),transparent_55%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-4 -bottom-8 select-none text-[7rem] font-bold leading-none tracking-tighter text-primary/10 sm:text-[10rem]"
      >
        {'</>'}
      </div>

      <div className="relative mx-auto max-w-2xl px-5 py-20 text-center sm:px-6">
        <Reveal>
          <p className="text-7xl font-bold tracking-tight text-primary sm:text-8xl">
            {t('notFound.code', { ns: 'common' })}
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {t('notFound.title', { ns: 'common' })}
          </h1>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">
            {t('notFound.description', { ns: 'common' })}
          </p>
        </Reveal>
        <Reveal delay={0.16}>
          <Link
            href={home}
            className="btn-shine group mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03] active:scale-[0.97]"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            {t('notFound.cta', { ns: 'common' })}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
