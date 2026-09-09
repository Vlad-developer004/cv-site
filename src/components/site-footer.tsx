import { ArrowRight, ArrowUp, Mail } from 'lucide-react';
import type { Locale } from '@/i18nConfig';
import initTranslations from '@/lib/i18n';
import { localizePath } from '@/lib/locale-path';
import { GithubIcon, LinkedinIcon } from '@/components/icons';
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
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,color-mix(in_oklch,var(--primary)_70%,transparent)_25%,color-mix(in_oklch,var(--primary)_70%,transparent)_75%,transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05] bg-[radial-gradient(var(--primary)_1px,transparent_1px)] bg-size-[24px_24px] mask-[radial-gradient(ellipse_60%_80%_at_20%_20%,black,transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_100%,color-mix(in_oklch,var(--primary)_8%,transparent),transparent_60%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-2 -bottom-4 select-none text-[6rem] font-bold leading-none tracking-tighter text-primary/10 sm:text-[8rem]"
      >
        {'</>'}
      </div>

      <div className="relative mx-auto max-w-6xl px-5 py-14 sm:px-6 sm:py-16">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            {t('footer.availability', { ns: 'common' })}
          </span>

          <h2 className="mt-4 text-2xl font-bold tracking-tight text-balance text-foreground sm:text-4xl">
            {t('footer.closingLead', { ns: 'common' })}{' '}
            <span className="text-primary">{t('footer.closingAccent', { ns: 'common' })}</span>
          </h2>
          <p className="mt-3 max-w-md text-sm text-muted-foreground sm:text-base">
            {t('footer.closingSub', { ns: 'common' })}
          </p>

          <a
            href="#contact"
            className="btn-shine group mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03] active:scale-[0.97]"
          >
            {t('footer.ctaLine', { ns: 'common' })}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>

        <div className="glass mt-12 rounded-2xl p-5 sm:p-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
              <LogoLink href={localizePath('/', locale)} className="group flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[linear-gradient(135deg,var(--primary),color-mix(in_oklch,var(--primary)_55%,var(--foreground)))] text-xs font-bold text-primary-foreground shadow-sm transition-transform group-hover:scale-105">
                  VT
                </span>
                <span className="text-sm font-semibold tracking-tight text-foreground">
                  {t('name', { ns: 'hero' })}
                </span>
              </LogoLink>

              <div className="flex items-center gap-2.5">
                <a
                  href={`https://github.com/${GITHUB_USERNAME}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary"
                >
                  <GithubIcon className="h-3.5 w-3.5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/vladyslav-tieriekhov"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary"
                >
                  <LinkedinIcon className="h-3.5 w-3.5" />
                </a>
                <a
                  href={`mailto:${email}`}
                  aria-label="Email"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary"
                >
                  <Mail className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            <nav className="flex flex-wrap items-center gap-x-5 gap-y-2">
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

          <div className="mt-6 flex flex-col gap-3 border-t border-border pt-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
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
