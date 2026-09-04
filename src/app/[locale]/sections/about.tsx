import type { TFunction } from 'i18next';
import type { ReactNode } from 'react';
import { Briefcase, BookOpen, Bug, Download, GraduationCap, Languages, MapPin, Target, Workflow, Wand2, Zap } from 'lucide-react';
import { Reveal } from '@/components/reveal';
import { TiltCard } from '@/components/tilt-card';

type Fact = { label: string; value: string };
type SoftSkill = { id: string; title: string; description: string };

const ICONS: Record<string, typeof BookOpen> = {
  learner: BookOpen,
  precision: Target,
  'fast-learner': Zap,
  ownership: Workflow,
  'ai-workflow': Wand2,
  debugging: Bug,
};

const FACT_ICONS = [MapPin, GraduationCap, Languages, Briefcase];

const HIGHLIGHT_PATTERN = /(B1|B2|H\+|CI\/CD)/;

function highlight(text: string): ReactNode {
  return text
    .split(HIGHLIGHT_PATTERN)
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

export function About({ t }: { t: TFunction }) {
  const paragraphs = t('paragraphs', { ns: 'about', returnObjects: true }) as string[];
  const facts = t('facts', { ns: 'about', returnObjects: true }) as Fact[];
  const softSkills = t('softSkills', { ns: 'about', returnObjects: true }) as SoftSkill[];

  return (
    <section id="about" className="section-divider relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,color-mix(in_oklch,var(--primary)_10%,transparent),transparent_55%)]"
      />

      <div className="relative mx-auto max-w-6xl px-5 py-14 sm:px-6 sm:py-20">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {t('eyebrow', { ns: 'about' })}
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
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

        <div className="mt-10 grid gap-10 lg:grid-cols-[280px_1fr] lg:gap-16">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1 lg:sticky lg:top-24 lg:self-start">
            {facts.map((fact, i) => {
              const Icon = FACT_ICONS[i] ?? MapPin;
              return (
                <Reveal key={fact.label} delay={0.04 + i * 0.05}>
                  <TiltCard>
                    <div className="flex items-start gap-3 p-4">
                      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-4 w-4" />
                      </span>
                      <div>
                        <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                          {fact.label}
                        </dt>
                        <dd className="mt-1 text-sm font-medium text-foreground">{fact.value}</dd>
                      </div>
                    </div>
                  </TiltCard>
                </Reveal>
              );
            })}

            <Reveal delay={0.04 + facts.length * 0.05} className="sm:col-span-2 lg:col-span-1">
              <a
                href="/cv.pdf"
                className="flex items-center justify-center gap-2 rounded-xl border border-dashed border-border px-4 py-3.5 text-sm font-medium text-foreground/80 transition-colors hover:border-primary/50 hover:text-primary"
              >
                <Download className="h-4 w-4" />
                {t('ctaDownloadCv', { ns: 'hero' })}
              </a>
            </Reveal>
          </div>

          <div className="space-y-5">
            {paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.1 + i * 0.06}>
                <p
                  className={
                    i === 0
                      ? 'text-lg leading-relaxed text-foreground/90 sm:text-xl'
                      : 'leading-relaxed text-muted-foreground'
                  }
                >
                  {highlight(p)}
                </p>
              </Reveal>
            ))}

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
            const Icon = ICONS[skill.id] ?? BookOpen;
            return (
              <Reveal key={skill.id} delay={0.15 + i * 0.06}>
                <TiltCard className="h-full">
                  <div className="h-full p-5">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
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
