import { ArrowUp, Mail } from 'lucide-react';
import type { Locale } from '@/i18nConfig';
import initTranslations from '@/lib/i18n';
import { localizePath } from '@/lib/locale-path';
import { GithubIcon } from '@/components/icons';
import { LogoLink } from '@/components/logo-link';

const GITHUB_USERNAME = 'Vlad-developer004';
const SITE_REPO_URL = `https://github.com/${GITHUB_USERNAME}/cv-site`;

export async function SiteFooter({ locale }: { locale: Locale }) {
  const { t } = await initTranslations(locale);
  const email = t('email', { ns: 'contact' });
  const year = new Date().getFullYear();

  const navItems = [
    { href: '#expertise', label: t('nav.expertise', { ns: 'common' }) },
    { href: '#about', label: t('nav.about', { ns: 'common' }) },
    { href: '#skills', label: t('nav.skills', { ns: 'common' }) },
    { href: '#projects', label: t('nav.projects', { ns: 'common' }) },
    { href: '#timeline', label: t('nav.timeline', { ns: 'common' }) },
    { href: '#contact', label: t('nav.contact', { ns: 'common' }) },
  ];

  return (
    <footer className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_100%,color-mix(in_oklch,var(--primary)_8%,transparent),transparent_60%)]"
      />

      <div className="relative mx-auto max-w-6xl px-5 py-12 sm:px-6">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div className="max-w-xs">
            <LogoLink href={localizePath('/', locale)} className="group flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[linear-gradient(135deg,var(--primary),color-mix(in_oklch,var(--primary)_55%,var(--foreground)))] text-sm font-bold text-primary-foreground shadow-sm transition-transform group-hover:scale-105">
                VT
              </span>
              <span className="text-sm font-semibold tracking-tight text-foreground">
                {t('name', { ns: 'hero' })}
              </span>
            </LogoLink>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {t('tagline', { ns: 'hero' })}
            </p>
            <div className="mt-4 flex items-center gap-3">
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary"
              >
                <GithubIcon className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${email}`}
                aria-label="Email"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="sm:text-right">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              {t('footer.navigation', { ns: 'common' })}
            </span>
            <nav className="mt-3 grid grid-cols-2 gap-x-8 gap-y-2 sm:grid-cols-1 sm:content-start">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        <div className="section-divider mt-10 pt-6">
          <div className="flex flex-col gap-3 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>
              &copy; {year} {t('name', { ns: 'hero' })}. {t('footer.rights', { ns: 'common' })}
            </p>
            <div className="flex items-center gap-4">
              <p>
                {t('footer.builtWith', { ns: 'common' })}{' '}
                <a href={SITE_REPO_URL} target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-primary">
                  {t('footer.sourceCode', { ns: 'common' })}
                </a>
              </p>
              <a
                href="#top"
                aria-label={t('footer.backToTop', { ns: 'common' })}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary"
              >
                <ArrowUp className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
