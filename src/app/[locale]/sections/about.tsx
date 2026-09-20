import type { TFunction } from 'i18next';
import type { CSSProperties, ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowUpRight,
  Briefcase,
  BookOpen,
  Bug,
  Download,
  Flag,
  GraduationCap,
  Languages,
  MapPin,
  Target,
  Workflow,
  Wand2,
} from 'lucide-react';
import { GB, DE, RU, UA } from 'country-flag-icons/react/3x2';
import type { Locale } from '@/i18nConfig';
import { localizePath } from '@/lib/locale-path';
import { ACCENT as PROJECT_ACCENT, ICONS as PROJECT_ICONS, SCREENSHOTS as PROJECT_SCREENSHOTS } from '@/lib/project-visuals';
import { Reveal } from '@/components/reveal';
import { TiltCard } from '@/components/tilt-card';
import { CvPreview } from '@/components/cv-preview';

type Fact = { label: string; value: string };
type LanguageItem = { code: string; level: string };
type SoftSkill = { id: string; title: string; description: string };
type ProjectTag = { id: string; label: string };

const SOFT_SKILL_ICONS: Record<string, typeof BookOpen> = {
  learner: BookOpen,
  precision: Target,
  resilient: Flag,
  ownership: Workflow,
  'ai-workflow': Wand2,
  debugging: Bug,
};

const SOFT_SKILL_TONE: Record<string, { icon: string; accent: string }> = {
  learner: { icon: 'bg-cyan-500/10 text-cyan-500', accent: '#06b6d4' },
  precision: { icon: 'bg-rose-500/10 text-rose-500', accent: '#f43f5e' },
  resilient: { icon: 'bg-orange-500/10 text-orange-500', accent: '#f97316' },
  ownership: { icon: 'bg-indigo-500/10 text-indigo-500', accent: '#6366f1' },
  'ai-workflow': { icon: 'bg-violet-500/10 text-violet-500', accent: '#8b5cf6' },
  debugging: { icon: 'bg-red-500/10 text-red-500', accent: '#ef4444' },
};

const FACT_ICONS = [MapPin, GraduationCap, Briefcase];

const FACT_TONE: { icon: string; accent: string }[] = [
  { icon: 'bg-sky-500/10 text-sky-500', accent: '#0ea5e9' },
  { icon: 'bg-violet-500/10 text-violet-500', accent: '#8b5cf6' },
  { icon: 'bg-emerald-500/10 text-emerald-500', accent: '#10b981' },
];

const LANGUAGES_TONE = { icon: 'bg-teal-500/10 text-teal-500', accent: '#14b8a6' };

const PARAGRAPH_TONE: { icon: typeof Workflow; accent: string }[] = [
  { icon: Workflow, accent: '#6366f1' },
  { icon: Briefcase, accent: '#10b981' },
  { icon: GraduationCap, accent: '#8b5cf6' },
];

const LANGUAGE_FLAGS: Record<string, typeof GB> = {
  EN: GB,
  DE: DE,
  RU: RU,
  UK: UA,
};

const BASE_HIGHLIGHTS = ['B1', 'B2', 'H\\+', 'CI/CD'];

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function buildHighlightPattern(words: string[]): RegExp {
  const terms = [...words.map(escapeRegExp), ...BASE_HIGHLIGHTS].sort((a, b) => b.length - a.length);
  return new RegExp(`(${terms.join('|')})`);
}

function highlight(text: string, pattern: RegExp): ReactNode {
  return text
    .split(pattern)
    .map((part, i) =>
      i % 2 === 1 ? (
        <span key={i} className="font-semibold text-primary">
          {part}
        </span>
      ) : (
        part
      ),
    );
}

export function About({ t, locale }: { t: TFunction; locale: Locale }) {
  const paragraphs = t('paragraphs', { ns: 'about', returnObjects: true }) as string[];
  const paragraphLabels = t('paragraphLabels', { ns: 'about', returnObjects: true }) as string[];
  const facts = t('facts', { ns: 'about', returnObjects: true }) as Fact[];
  const languagesLabel = t('languagesLabel', { ns: 'about' });
  const languages = t('languages', { ns: 'about', returnObjects: true }) as LanguageItem[];
  const softSkills = t('softSkills', { ns: 'about', returnObjects: true }) as SoftSkill[];
  const highlightWords = t('highlightWords', { ns: 'about', returnObjects: true }) as string[];
  const highlightPattern = buildHighlightPattern(highlightWords);
  const projectsIntro = t('projectsIntro', { ns: 'about' });
  const projectTags = t('projectTags', { ns: 'about', returnObjects: true }) as ProjectTag[];

  return (
    <section id="about" className="section-divider relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,color-mix(in_oklch,var(--primary)_10%,transparent),transparent_55%)]"
      />

      <div className="relative mx-auto max-w-6xl px-5 py-11 sm:px-6 sm:py-16">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-widest text-primary">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              {t('eyebrow', { ns: 'about' })}
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:mt-3 sm:text-4xl">
              {t('headingLead', { ns: 'about' })}{' '}
              <span className="text-primary">{t('headingAccent', { ns: 'about' })}</span>
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <span className="glass mt-1 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-foreground/90">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              {t('photoAvailableBadge', { ns: 'hero' })}
            </span>
          </Reveal>
        </div>

        <div className="relative mt-10 grid gap-10 lg:grid-cols-[280px_1fr] lg:gap-16">
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 hidden w-70 rounded-3xl bg-[linear-gradient(180deg,color-mix(in_oklch,var(--primary)_6%,transparent),transparent_70%)] lg:block"
          />
          <div className="relative grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1 lg:sticky lg:top-24 lg:self-start">
            {facts.slice(0, 2).map((fact, i) => {
              const Icon = FACT_ICONS[i] ?? MapPin;
              const tone = FACT_TONE[i];
              return (
                <Reveal key={fact.label} delay={0.04 + i * 0.05}>
                  <TiltCard className="relative">
                    <span
                      aria-hidden
                      className="absolute inset-x-0 top-0 h-1"
                      style={{ background: `linear-gradient(to right, ${tone.accent}, transparent)` }}
                    />
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-25 blur-xl"
                      style={{ background: tone.accent }}
                    />
                    <div className="relative flex items-start gap-3 p-4">
                      <span
                        className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${tone.icon}`}
                        style={{ boxShadow: `0 4px 18px -6px ${tone.accent}66` }}
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                      <dl>
                        <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                          {fact.label}
                        </dt>
                        <dd className="mt-1 text-sm font-medium text-foreground">{fact.value}</dd>
                      </dl>
                    </div>
                  </TiltCard>
                </Reveal>
              );
            })}

            <Reveal delay={0.14}>
              <TiltCard className="relative">
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-1"
                  style={{ background: `linear-gradient(to right, ${LANGUAGES_TONE.accent}, transparent)` }}
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-25 blur-xl"
                  style={{ background: LANGUAGES_TONE.accent }}
                />
                <div className="relative flex items-start gap-3 p-4">
                  <span
                    className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${LANGUAGES_TONE.icon}`}
                    style={{ boxShadow: `0 4px 18px -6px ${LANGUAGES_TONE.accent}66` }}
                  >
                    <Languages className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {languagesLabel}
                    </p>
                    <ul className="mt-2 space-y-1.5">
                      {languages.map((lang) => {
                        const Flag = LANGUAGE_FLAGS[lang.code];
                        return (
                          <li key={lang.code} className="flex items-center gap-2.5 text-sm">
                            {Flag && (
                              <Flag className="h-3.5 w-5 shrink-0 rounded-[2px] ring-1 ring-inset ring-white/15" />
                            )}
                            <span className="sr-only">{lang.code}</span>
                            <span className="text-foreground/90">{lang.level}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </TiltCard>
            </Reveal>

            {facts.slice(2).map((fact, i) => {
              const Icon = FACT_ICONS[i + 2] ?? MapPin;
              const tone = FACT_TONE[i + 2];
              return (
                <Reveal key={fact.label} delay={0.18 + i * 0.05}>
                  <TiltCard className="relative">
                    <span
                      aria-hidden
                      className="absolute inset-x-0 top-0 h-1"
                      style={{ background: `linear-gradient(to right, ${tone.accent}, transparent)` }}
                    />
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-25 blur-xl"
                      style={{ background: tone.accent }}
                    />
                    <div className="relative flex items-start gap-3 p-4">
                      <span
                        className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${tone.icon}`}
                        style={{ boxShadow: `0 4px 18px -6px ${tone.accent}66` }}
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                      <dl>
                        <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                          {fact.label}
                        </dt>
                        <dd className="mt-1 text-sm font-medium text-foreground">{fact.value}</dd>
                      </dl>
                    </div>
                  </TiltCard>
                </Reveal>
              );
            })}

            <Reveal delay={0.04 + (facts.length + 1) * 0.05} className="sm:col-span-2 lg:col-span-1">
              <CvPreview href="/cv.pdf" className="block w-full">
                <a
                  href="/cv.pdf"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_4px_16px_-4px_color-mix(in_oklch,var(--primary)_50%,transparent)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-6px_color-mix(in_oklch,var(--primary)_55%,transparent)]"
                >
                  <Download className="h-4 w-4" />
                  {t('ctaDownloadCv', { ns: 'hero' })}
                </a>
              </CvPreview>
            </Reveal>
          </div>

          <div className="space-y-5">
            <Reveal delay={0.08}>
              <p className="text-xl font-semibold text-foreground sm:text-2xl">{t('pitch', { ns: 'about' })}</p>
            </Reveal>

            {paragraphs.slice(0, 2).map((p, i) => {
              const tone = PARAGRAPH_TONE[i];
              const KickerIcon = tone.icon;
              return (
                <Reveal key={i} delay={0.1 + i * 0.06}>
                  <div className="border-l-2 pl-4" style={{ borderColor: `${tone.accent}40` }}>
                    <span
                      className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider"
                      style={{ color: tone.accent }}
                    >
                      <KickerIcon className="h-3.5 w-3.5" />
                      {paragraphLabels[i]}
                    </span>
                    <p
                      className={
                        i === 0
                          ? 'mt-1.5 text-lg leading-relaxed text-foreground/90 sm:text-xl'
                          : 'mt-1.5 leading-relaxed text-muted-foreground'
                      }
                    >
                      {highlight(p, highlightPattern)}
                    </p>
                  </div>
                </Reveal>
              );
            })}

            <Reveal delay={0.22}>
              <div>
                <p className="leading-relaxed text-muted-foreground">{projectsIntro}</p>
                <ul className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {projectTags.map((tag) => {
                    const Icon = PROJECT_ICONS[tag.id] ?? PROJECT_ICONS.shop;
                    const accent = PROJECT_ACCENT[tag.id] ?? '#10b981';
                    const screenshot = PROJECT_SCREENSHOTS[tag.id];
                    return (
                      <li key={tag.id}>
                        <Link
                          href={localizePath(`/projects/${tag.id}`, locale)}
                          style={{ '--tag-accent': accent } as CSSProperties}
                          className="group flex items-center gap-3 overflow-hidden rounded-xl border border-border/70 bg-background/40 pr-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--tag-accent)] hover:shadow-[0_8px_24px_-8px_color-mix(in_oklch,var(--tag-accent)_45%,transparent)]"
                        >
                          {screenshot && (
                            <div className="relative h-16 w-24 shrink-0 overflow-hidden bg-[#0b0b0f]">
                              <Image
                                src={screenshot.src}
                                alt={tag.label}
                                fill
                                loading="lazy"
                                className="object-cover object-top transition-transform duration-300 group-hover:scale-110"
                                sizes="96px"
                              />
                              <span
                                aria-hidden
                                className="pointer-events-none absolute inset-0"
                                style={{ background: `linear-gradient(90deg, transparent 55%, ${accent}26)` }}
                              />
                            </div>
                          )}
                          <div className="flex min-w-0 flex-1 items-center gap-2 py-2.5">
                            <span
                              className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md"
                              style={{ background: `${accent}1a`, color: accent }}
                            >
                              <Icon className="h-3.5 w-3.5" />
                            </span>
                            <span className="min-w-0 flex-1 text-[13px] font-medium text-foreground/90">
                              {tag.label}
                            </span>
                            <ArrowUpRight
                              className="hover-reveal h-3.5 w-3.5 shrink-0"
                              style={{ color: accent }}
                            />
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Reveal>

            {paragraphs.slice(2).map((p, i) => {
              const tone = PARAGRAPH_TONE[i + 2];
              const KickerIcon = tone.icon;
              return (
                <Reveal key={i + 2} delay={0.28 + i * 0.06}>
                  <div className="border-l-2 pl-4" style={{ borderColor: `${tone.accent}40` }}>
                    <span
                      className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider"
                      style={{ color: tone.accent }}
                    >
                      <KickerIcon className="h-3.5 w-3.5" />
                      {paragraphLabels[i + 2]}
                    </span>
                    <p className="mt-1.5 leading-relaxed text-muted-foreground">
                      {highlight(p, highlightPattern)}
                    </p>
                  </div>
                </Reveal>
              );
            })}

            <Reveal delay={0.1 + paragraphs.length * 0.06}>
              <blockquote className="relative overflow-hidden rounded-2xl border border-primary/20 bg-[linear-gradient(135deg,color-mix(in_oklch,var(--primary)_8%,transparent),transparent_60%)] px-8 py-7 sm:px-10 sm:py-8">
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-4 left-3 select-none font-serif text-8xl text-primary/15"
                >
                  “
                </span>
                <p className="relative font-serif text-xl italic font-normal leading-snug text-foreground/90 sm:text-2xl">
                  {t('quote', { ns: 'about' })}
                </p>
              </blockquote>
            </Reveal>
          </div>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {softSkills.map((skill, i) => {
            const Icon = SOFT_SKILL_ICONS[skill.id] ?? BookOpen;
            const tone = SOFT_SKILL_TONE[skill.id] ?? { icon: 'bg-primary/10 text-primary', accent: undefined };
            return (
              <Reveal key={skill.id} delay={0.15 + i * 0.06}>
                <TiltCard className="relative h-full">
                  {tone.accent && (
                    <>
                      <span
                        aria-hidden
                        className="absolute inset-x-0 top-0 h-1"
                        style={{ background: `linear-gradient(to right, ${tone.accent}, transparent)` }}
                      />
                      <span
                        aria-hidden
                        className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-25 blur-2xl"
                        style={{ background: tone.accent }}
                      />
                    </>
                  )}
                  <div className="relative h-full p-5">
                    <span
                      className={`inline-flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 ${tone.icon}`}
                      style={tone.accent ? { boxShadow: `0 4px 18px -6px ${tone.accent}66` } : undefined}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 text-sm font-semibold text-foreground">{skill.title}</h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-muted-foreground">
                      {skill.description}
                    </p>
                  </div>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
