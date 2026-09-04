import type { TFunction } from 'i18next';
import Link from 'next/link';
import { ArrowUpRight, Code2, ShieldCheck, Sparkles } from 'lucide-react';
import type { Locale } from '@/i18nConfig';
import { localizePath } from '@/lib/locale-path';
import { ICONS as PROJECT_ICONS, TONES as PROJECT_TONES } from '@/lib/project-visuals';
import { Reveal } from '@/components/reveal';
import { TiltCard } from '@/components/tilt-card';

type Pillar = { id: string; title: string; description: string; linkedProjectIds: string[] };
type ProjectRef = { id: string; name: string };

const ICONS: Record<string, typeof ShieldCheck> = {
  privacy: ShieldCheck,
  ai: Sparkles,
  fullstack: Code2,
};

export function Expertise({ t, locale }: { t: TFunction; locale: Locale }) {
  const pillars = t('pillars', { ns: 'expertise', returnObjects: true }) as Pillar[];
  const projects = t('items', { ns: 'projects', returnObjects: true }) as ProjectRef[];
  const seeIn = t('seeIn', { ns: 'expertise' });

  const projectName = (id: string) => projects.find((p) => p.id === id)?.name ?? id;

  return (
    <section id="expertise" className="section-divider relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,color-mix(in_oklch,var(--primary)_10%,transparent),transparent_55%)]"
      />

      <div className="relative mx-auto max-w-6xl px-5 py-14 sm:px-6 sm:py-20">
        <Reveal>
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            {t('eyebrow', { ns: 'expertise' })}
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            {t('headingLead', { ns: 'expertise' })}{' '}
            <span className="text-primary">{t('headingAccent', { ns: 'expertise' })}</span>
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {pillars.map((pillar, i) => {
            const Icon = ICONS[pillar.id] ?? Code2;
            const primaryHref = localizePath(`/projects/${pillar.linkedProjectIds[0]}`, locale);

            return (
              <Reveal key={pillar.id} delay={i * 0.08}>
                <TiltCard className="flex h-full flex-col">
                  <Link href={primaryHref} className="group block p-6 pb-0">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                    </div>

                    <h3 className="mt-5 text-lg font-medium text-foreground group-hover:text-primary">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                      {pillar.description}
                    </p>
                  </Link>

                  <div className="mt-auto border-t border-border/60 p-6 pt-4">
                    <span className="block text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                      {seeIn}
                    </span>
                    <div className="mt-2 flex min-h-16 flex-wrap items-start gap-1.5">
                      {pillar.linkedProjectIds.map((pid) => {
                        const ProjIcon = PROJECT_ICONS[pid] ?? Code2;
                        const tone = PROJECT_TONES[pid];
                        return (
                          <Link
                            key={pid}
                            href={localizePath(`/projects/${pid}`, locale)}
                            className="group/chip inline-flex items-center gap-1.5 rounded-full border border-border py-1.5 pl-1 pr-2.5 text-[13px] font-medium text-foreground/80 transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary"
                          >
                            <span
                              className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${tone?.icon ?? 'bg-primary/10 text-primary'}`}
                            >
                              <ProjIcon className="h-3 w-3" />
                            </span>
                            {projectName(pid)}
                            <ArrowUpRight className="h-3 w-3 shrink-0 opacity-0 transition-opacity group-hover/chip:opacity-100" />
                          </Link>
                        );
                      })}
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
