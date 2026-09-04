'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GB, DE, RU, UA } from 'country-flag-icons/react/3x2';
import { i18nConfig } from '@/i18nConfig';
import { localizePath } from '@/lib/locale-path';

const LABELS: Record<string, string> = {
  en: 'EN',
  de: 'DE',
  ru: 'RU',
  uk: 'UK',
};

const FLAGS: Record<string, typeof GB> = {
  en: GB,
  de: DE,
  ru: RU,
  uk: UA,
};

export function LanguageSwitcher() {
  const pathname = usePathname();
  const { t, i18n } = useTranslation('common');
  const [open, setOpen] = useState(false);
  const CurrentFlag = FLAGS[i18n.language];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={t('languageSwitcher.label')}
        aria-expanded={open}
        className="inline-flex h-9 items-center gap-1 rounded-full border border-border px-3 text-sm font-medium text-foreground/80 transition-colors hover:text-primary hover:border-primary/50"
      >
        {CurrentFlag && <CurrentFlag className="h-3 w-4 shrink-0 rounded-[1px]" />}
        {LABELS[i18n.language] ?? i18n.language.toUpperCase()}
      </button>
      {open && (
        <div
          className="absolute right-0 top-full mt-2 flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-lg"
          onMouseLeave={() => setOpen(false)}
        >
          {i18nConfig.locales.map((locale) => {
            const Flag = FLAGS[locale];
            return (
              <Link
                key={locale}
                href={localizePath(pathname, locale)}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted ${
                  locale === i18n.language ? 'text-primary font-medium' : 'text-foreground/80'
                }`}
              >
                {Flag && <Flag className="h-3 w-4 shrink-0 rounded-[1px]" />}
                {LABELS[locale]}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
