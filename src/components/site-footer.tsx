import type { CSSProperties } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUp,
  Code2,
  FileText,
  FolderGit2,
  Mail,
  Milestone,
  ShieldCheck,
  Sparkles,
  User,
} from 'lucide-react';
import type { Locale } from '@/i18nConfig';
import initTranslations from '@/lib/i18n';
import { localizePath } from '@/lib/locale-path';
import { GithubIcon, LinkedinIcon } from '@/components/icons';
import { LogoLink } from '@/components/logo-link';
import { BrandMark } from '@/components/brand-mark';

const GITHUB_USERNAME = 'Vlad-developer004';
const SITE_REPO_URL = `https://github.com/${GITHUB_USERNAME}/cv-site`;

const SOCIAL_TONE = {
  github: '#94a3b8',
  linkedin: '#0A66C2',
  email: '#0ea5e9',
};

const TECH_HIGHLIGHT: Record<string, string> = {
  'Next.js': '#ffffff',
  'Tailwind CSS': '#38BDF8',
  motion: '#8B5CF6',
  Antigravity: '#f59e0b',
};

function highlightTech(text: string) {
  const terms = Object.keys(TECH_HIGHLIGHT).sort((a, b) => b.length - a.length);
  const pattern = new RegExp(`(${terms.join('|')})`, 'g');
  return text.split(pattern).map((part, i) =>
    TECH_HIGHLIGHT[part] ? (
      <span key={i} className="font-medium" style={{ color: TECH_HIGHLIGHT[part] }}>
        {part}
      </span>
    ) : (
      part
    ),
  );
}

export async function SiteFooter({ locale }: { locale: Locale }) {
  const { t } = await initTranslations(locale);
  const email = t('email', { ns: 'contact' });
  const year = new Date().getFullYear();

  const home = localizePath('/', locale);
  const navItems = [
    { href: `${home}#expertise`, label: t('nav.expertise', { ns: 'common' }), Icon: Sparkles, accent: '#8b5cf6' },
    { href: `${home}#about`, label: t('nav.about', { ns: 'common' }), Icon: User, accent: '#0ea5e9' },
    { href: `${home}#skills`, label: t('nav.skills', { ns: 'common' }), Icon: Code2, accent: '#10b981' },
    { href: `${home}#projects`, label: t('nav.projects', { ns: 'common' }), Icon: FolderGit2, accent: '#f59e0b' },
    { href: `${home}#timeline`, label: t('nav.timeline', { ns: 'common' }), Icon: Milestone, accent: '#f43f5e' },
    { href: `${home}#contact`, label: t('nav.contact', { ns: 'common' }), Icon: Mail, accent: '#14b8a6' },
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
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
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
            href={`${home}#contact`}
            className="btn-shine group mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-[0_4px_18px_-4px_color-mix(in_oklch,var(--primary)_55%,transparent)] transition-all hover:-translate-y-0.5 hover:scale-[1.03] hover:shadow-[0_8px_26px_-6px_color-mix(in_oklch,var(--primary)_60%,transparent)] active:scale-[0.97]"
          >
            {t('footer.ctaLine', { ns: 'common' })}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>

        <div className="glass relative mt-12 overflow-hidden rounded-2xl p-6 sm:p-8">
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,color-mix(in_oklch,var(--primary)_60%,transparent)_50%,transparent)]"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-primary/10 opacity-60 blur-3xl"
          />
          <div className="relative flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
              <LogoLink href={localizePath('/', locale)} className="group flex items-center gap-2.5">
                <BrandMark className="h-8 w-8 rounded-lg text-xs shadow-[0_2px_10px_-2px_color-mix(in_oklch,var(--primary)_60%,transparent)] transition-transform group-hover:scale-105" />
                <span className="flex flex-col leading-tight">
                  <span className="text-sm font-semibold tracking-tight text-foreground">
                    {t('name', { ns: 'hero' })}
                  </span>
                  <span className="text-xs text-muted-foreground">{t('footer.role', { ns: 'common' })}</span>
                </span>
              </LogoLink>

              <span aria-hidden className="hidden h-8 w-px bg-border sm:block" />

              <div className="flex items-center gap-2.5">
                <a
                  href={`https://github.com/${GITHUB_USERNAME}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  style={{ '--icon-accent': SOCIAL_TONE.github } as CSSProperties}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-(--icon-accent) hover:text-(--icon-accent)"
                >
                  <GithubIcon className="h-3.5 w-3.5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/vladyslav-tieriekhov"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  style={{ '--icon-accent': SOCIAL_TONE.linkedin } as CSSProperties}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-(--icon-accent) hover:text-(--icon-accent)"
                >
                  <LinkedinIcon className="h-3.5 w-3.5" />
                </a>
                <a
                  href={`mailto:${email}`}
                  aria-label="Email"
                  style={{ '--icon-accent': SOCIAL_TONE.email } as CSSProperties}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-(--icon-accent) hover:text-(--icon-accent)"
                >
                  <Mail className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-2.5 sm:items-end">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60">
                {t('footer.navigation', { ns: 'common' })}
              </span>
              <nav className="grid grid-cols-2 gap-x-5 gap-y-2.5 sm:flex sm:flex-wrap sm:items-center sm:justify-end">
                {navItems.map(({ href, label, Icon, accent }) => (
                  <a
                    key={href}
                    href={href}
                    style={{ '--icon-accent': accent } as CSSProperties}
                    className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    <Icon className="h-3.5 w-3.5 shrink-0 text-(--icon-accent) opacity-70 transition-opacity group-hover:opacity-100" />
                    {label}
                  </a>
                ))}
              </nav>
            </div>
          </div>

          <div className="relative mt-8 flex flex-col gap-5 pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--border)_15%,var(--border)_85%,transparent)]"
            />
            <div className="flex flex-col gap-2">
              <p>
                &copy; {year} <span className="font-medium text-foreground/90">{t('name', { ns: 'hero' })}</span>.{' '}
                {t('footer.rights', { ns: 'common' })}
              </p>
              <p>{highlightTech(t('footer.builtWith', { ns: 'common' }))}</p>
              <a
                href={SITE_REPO_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-fit items-center gap-1.5 rounded-full border border-border bg-slate-500/10 px-2.5 py-1 text-xs font-medium text-foreground/80 transition-all hover:border-primary/50 hover:text-primary"
              >
                <GithubIcon className="h-3.5 w-3.5 text-slate-400" />
                {t('footer.sourceCode', { ns: 'common' })}
              </a>
            </div>

            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
              <nav className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <Link
                  href={localizePath('/impressum', locale)}
                  className="inline-flex items-center gap-1.5 text-foreground/80 transition-colors hover:text-primary"
                >
                  <FileText className="h-3.5 w-3.5 text-sky-500" />
                  {t('footer.legalImpressum', { ns: 'common' })}
                </Link>
                <span aria-hidden className="text-border">
                  ·
                </span>
                <Link
                  href={localizePath('/datenschutz', locale)}
                  className="inline-flex items-center gap-1.5 text-foreground/80 transition-colors hover:text-primary"
                >
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                  {t('footer.legalPrivacy', { ns: 'common' })}
                </Link>
              </nav>
              <a
                href="#top"
                aria-label={t('footer.backToTop', { ns: 'common' })}
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-all hover:-translate-y-0.5 hover:bg-primary/15 sm:ml-1"
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
