import type { TFunction } from 'i18next';
import { Award, Briefcase, Code2, GraduationCap, MessageCircle, Microscope } from 'lucide-react';
import { Reveal } from '@/components/reveal';
import { TiltCard } from '@/components/tilt-card';

type TimelineItem = { date: string; icon: string; title: string; description: string };

const ICONS: Record<string, typeof GraduationCap> = {
  start: Code2,
  education: GraduationCap,
  thesis: Microscope,
  language: MessageCircle,
  diploma: Award,
  job: Briefcase,
};

export function Timeline({ t }: { t: TFunction }) {
  const items = t('items', { ns: 'timeline', returnObjects: true }) as TimelineItem[];

  return (
    <section id="timeline" className="section-divider relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,color-mix(in_oklch,var(--primary)_10%,transparent),transparent_55%)]"
      />

      <div className="relative mx-auto max-w-4xl px-5 py-11 sm:px-6 sm:py-16">
        <Reveal>
          <span className="inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-widest text-primary">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            {t('eyebrow', { ns: 'timeline' })}
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:mt-3 sm:text-4xl">
            {t('headingLead', { ns: 'timeline' })}{' '}
            <span className="text-primary">{t('headingAccent', { ns: 'timeline' })}</span>
          </h2>
        </Reveal>

        <div className="relative mt-12 space-y-6 before:absolute before:left-6 before:top-2 before:bottom-2 before:w-px before:bg-border sm:before:left-7">
          {items.map((item, i) => {
            const Icon = ICONS[item.icon] ?? GraduationCap;
            return (
              <Reveal key={i} delay={i * 0.06} className="relative pl-16 sm:pl-20">
                <span className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background text-primary sm:h-14 sm:w-14">
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </span>
                <TiltCard>
                  <div className="p-5">
                    <p className="text-xs font-medium uppercase tracking-wider text-primary">{item.date}</p>
                    <h3 className="mt-1 font-medium text-foreground">{item.title}</h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-muted-foreground">{item.description}</p>
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
