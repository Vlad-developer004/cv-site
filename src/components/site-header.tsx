import { Code2, FolderGit2, Mail, Milestone, Sparkles, User } from 'lucide-react';
import type { Locale } from '@/i18nConfig';
import initTranslations from '@/lib/i18n';
import { localizePath } from '@/lib/locale-path';
import { LanguageSwitcher } from '@/components/language-switcher';
import { ThemeToggle } from '@/components/theme-toggle';
import { MobileNav } from '@/components/mobile-nav';
import { SiteNav } from '@/components/site-nav';
import { LogoLink } from '@/components/logo-link';
import { BrandMark } from '@/components/brand-mark';

const NAV_META = [
  { key: 'expertise', Icon: Sparkles, accent: '#8b5cf6' },
  { key: 'about', Icon: User, accent: '#0ea5e9' },
  { key: 'skills', Icon: Code2, accent: '#10b981' },
  { key: 'projects', Icon: FolderGit2, accent: '#f59e0b' },
  { key: 'timeline', Icon: Milestone, accent: '#f43f5e' },
  { key: 'contact', Icon: Mail, accent: '#14b8a6' },
] as const;

export async function SiteHeader({ locale }: { locale: Locale }) {
  const { t } = await initTranslations(locale);

  const home = localizePath('/', locale);
  const navItems = NAV_META.map(({ key, Icon, accent }) => ({
    href: `${home}#${key}`,
    label: t(`nav.${key}`, { ns: 'common' }),
    accent,
    icon: <Icon className="relative h-3.5 w-3.5 shrink-0 transition-colors" style={{ color: 'var(--nav-icon-color)' }} />,
  }));

  return (
    <header
      className="sticky top-0 z-50 border-b border-border/60 backdrop-blur-lg supports-backdrop-filter:bg-transparent"
      style={{
        backgroundColor: 'color-mix(in oklch, var(--surface) 85%, transparent)',
      }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent,color-mix(in_oklch,var(--primary)_45%,transparent)_50%,transparent)]"
      />
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <LogoLink href={localizePath('/', locale)} className="group flex items-center gap-2.5">
          <BrandMark className="h-9 w-9 rounded-xl text-sm shadow-sm transition-transform group-hover:scale-105" />
          <span className="hidden whitespace-nowrap text-sm font-semibold tracking-tight text-foreground min-[1200px]:inline">
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
