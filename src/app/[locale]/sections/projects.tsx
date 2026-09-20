import type { TFunction } from 'i18next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Clock, ExternalLink, FlaskConical, Globe2, Target } from 'lucide-react';
import type { Locale } from '@/i18nConfig';
import { localizePath } from '@/lib/locale-path';
import { ACCENT, ICONS, SCREENSHOTS, TONES, tagTone } from '@/lib/project-visuals';
import { Reveal } from '@/components/reveal';
import { TiltCard } from '@/components/tilt-card';
import { CountUp } from '@/components/count-up';
import { GithubIcon } from '@/components/icons';

type Project = {
  id: string;
  name: string;
  status: string;
  description: string;
  stack: string[];
  links: { repo: string | null; live: string | null };
  highlight: boolean;
};

const STAT_ICONS = [Clock, FlaskConical, Globe2, Target];
const STAT_LINK_ACCENT: Record<string, string> = { timeline: '#6366f1' };

export function Projects({ t, locale }: { t: TFunction; locale: Locale }) {
  const items = t('items', { ns: 'projects', returnObjects: true }) as Project[];
  const readMore = t('readMore', { ns: 'projects' });
  const stats = t('stats', { ns: 'projects', returnObjects: true }) as {
    value: number;
    decimals?: number;
    suffix?: string;
    decimalSeparator?: string;
    label: string;
    link?: string;
  }[];

  return (
    <section id="projects" className="section-divider relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_100%,color-mix(in_oklch,var(--primary)_9%,transparent),transparent_55%)]"
      />
      <div className="relative mx-auto max-w-6xl px-5 py-11 sm:px-6 sm:py-16">
        <Reveal>
          <span className="inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-widest text-primary">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            {t('eyebrow', { ns: 'projects' })}
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:mt-3 sm:text-4xl">
            {t('headingLead', { ns: 'projects' })}{' '}
            <span className="text-primary">
              <CountUp to={Number(t('headingCount', { ns: 'projects' }))} />{' '}
              {t('headingAccentLabel', { ns: 'projects' })}
            </span>
          </h2>
          <div className="glass mt-6 max-w-2xl rounded-2xl border border-border/60 p-5 sm:p-6">
            <p className="leading-relaxed text-muted-foreground">{t('subheading', { ns: 'projects' })}</p>
            <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4 border-t border-border/60 pt-5 sm:grid-cols-4 sm:divide-x sm:divide-border/60">
              {stats.map((stat, i) => {
                const StatIcon = STAT_ICONS[i % STAT_ICONS.length];
                const finalLabel = `${stat.value.toFixed(stat.decimals ?? 0).replace('.', stat.decimalSeparator ?? '.')}${stat.suffix ?? ''}`;
                const accent = stat.link ? (ACCENT[stat.link] ?? STAT_LINK_ACCENT[stat.link]) : undefined;
                const href = stat.link ? (stat.link === 'timeline' ? '#timeline' : localizePath(`/projects/${stat.link}`, locale)) : undefined;

                const content = (
                  <>
                    <StatIcon
                      className="mt-0.5 h-4 w-4 shrink-0 transition-colors sm:mt-0"
                      style={{ color: accent ?? 'var(--primary)' }}
                    />
                    <div className="min-w-0 flex-1">
                      <span
                        className="block text-base font-bold tabular-nums text-foreground"
                        style={{ minWidth: `${finalLabel.length}ch` }}
                      >
                        <CountUp
                          to={stat.value}
                          decimals={stat.decimals}
                          suffix={stat.suffix}
                          decimalSeparator={stat.decimalSeparator}
                        />
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                        {stat.label}
                        {href && (
                          <ArrowUpRight
                            className="hover-reveal h-3 w-3 shrink-0"
                            style={{ color: accent }}
                          />
                        )}
                      </span>
                    </div>
                  </>
                );

                const cellClassName =
                  'group flex items-start gap-2 rounded-lg transition-all duration-200 sm:flex-col sm:gap-1.5 sm:pl-4 sm:first:pl-0';

                return href ? (
                  <Link key={stat.label} href={href} className={`${cellClassName} hover:-translate-y-0.5`}>
                    {content}
                  </Link>
                ) : (
                  <div key={stat.label} className={cellClassName}>
                    {content}
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {items.map((project, i) => {
            const Icon = ICONS[project.id] ?? ICONS.shop;
            const tone = TONES[project.id] ?? TONES.shop;
            const accent = ACCENT[project.id];
            const StatusIcon = tone.StatusIcon;
            const screenshot = SCREENSHOTS[project.id];
            const href = localizePath(`/projects/${project.id}`, locale);
            return (
              <Reveal key={project.id} delay={i * 0.06} className={project.highlight ? 'sm:col-span-2' : ''}>
                <TiltCard className={`relative ${project.highlight ? 'border-primary/40' : ''}`}>
                  {accent && (
                    <span
                      aria-hidden
                      className="absolute inset-x-0 top-0 z-10 h-1"
                      style={{ background: `linear-gradient(to right, ${accent}, transparent)` }}
                    />
                  )}
                  <Link href={href} className="group block">
                    {screenshot && (
                      <div className="relative overflow-hidden border-b border-border bg-[#0b0b0f]">
                        {screenshot.chrome === 'browser' && (
                          <div className="flex items-center gap-1.5 px-3.5 py-2.5">
                            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                          </div>
                        )}
                        <div
                          className={`relative w-full overflow-hidden ${
                            project.highlight ? 'aspect-video max-h-80 sm:max-h-96' : 'aspect-video'
                          }`}
                        >
                          <Image
                            src={screenshot.src}
                            alt={project.name}
                            fill
                            loading="lazy"
                            className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                            sizes={
                              project.highlight
                                ? '(min-width: 1152px) 1100px, 100vw'
                                : '(min-width: 640px) 50vw, 100vw'
                            }
                          />
                        </div>
                      </div>
                    )}
                    <div className="p-6 pb-0">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span
                            className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${accent ? '' : tone.icon}`}
                            style={
                              accent
                                ? { background: `${accent}1a`, color: accent, boxShadow: `0 4px 18px -6px ${accent}66` }
                                : undefined
                            }
                          >
                            <Icon className="h-5 w-5" />
                          </span>
                          <h3 className="text-lg font-medium text-foreground group-hover:text-primary">
                            {project.name}
                          </h3>
                        </div>
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${tone.badge}`}
                        >
                          <StatusIcon className="h-3.5 w-3.5" />
                          {project.status}
                        </span>
                      </div>

                      <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
                        {project.description}
                      </p>
                    </div>
                  </Link>

                  <div className="p-6 pt-4">
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${tagTone(tech)}`}
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-current" />
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="mt-5 flex flex-wrap items-center gap-2">
                      <Link
                        href={href}
                        className="group/link inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/15"
                      >
                        {readMore}
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5" />
                      </Link>
                      {project.links.repo && (
                        <a
                          href={project.links.repo}
                          className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-foreground/80 transition-colors hover:border-primary/50 hover:text-primary"
                        >
                          <GithubIcon className="h-3.5 w-3.5" /> Code
                        </a>
                      )}
                      {project.links.live && (
                        <a
                          href={project.links.live}
                          className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-foreground/80 transition-colors hover:border-primary/50 hover:text-primary"
                        >
                          <ExternalLink className="h-3.5 w-3.5" /> Live
                        </a>
                      )}
                    </div>
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
