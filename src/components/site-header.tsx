import type { Locale } from '@/i18nConfig';
import initTranslations from '@/lib/i18n';
import { localizePath } from '@/lib/locale-path';
import { LanguageSwitcher } from '@/components/language-switcher';
import { ThemeToggle } from '@/components/theme-toggle';
import { MobileNav } from '@/components/mobile-nav';
import { SiteNav } from '@/components/site-nav';
import { LogoLink } from '@/components/logo-link';

export async function SiteHeader({ locale }: { locale: Locale }) {
  const { t } = await initTranslations(locale);

  const navItems = [
    { href: '#expertise', label: t('nav.expertise', { ns: 'common' }) },
    { href: '#about', label: t('nav.about', { ns: 'common' }) },
    { href: '#skills', label: t('nav.skills', { ns: 'common' }) },
    { href: '#projects', label: t('nav.projects', { ns: 'common' }) },
    { href: '#timeline', label: t('nav.timeline', { ns: 'common' }) },
    { href: '#contact', label: t('nav.contact', { ns: 'common' }) },
  ];

  return (
    <header className="glass sticky top-0 z-50 border-b">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <LogoLink href={localizePath('/', locale)} className="group flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[linear-gradient(135deg,var(--primary),color-mix(in_oklch,var(--primary)_55%,var(--foreground)))] text-sm font-bold text-primary-foreground shadow-sm transition-transform group-hover:scale-105">
            VT
          </span>
          <span className="hidden whitespace-nowrap text-sm font-semibold tracking-tight text-foreground min-[980px]:inline">
            {t('name', { ns: 'hero' })}
          </span>
        </LogoLink>

        <SiteNav navItems={navItems} />

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
          <MobileNav navItems={navItems} />
        </div>
      </div>
    </header>
  );
}
