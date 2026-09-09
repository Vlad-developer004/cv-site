import type { TFunction } from 'i18next';
import type { ComponentType, CSSProperties } from 'react';
import Image from 'next/image';
import { ArrowRight, Download, Mail, MapPin } from 'lucide-react';
import { SiNextdotjs, SiNodedotjs, SiReact, SiTypescript } from 'react-icons/si';
import { Reveal } from '@/components/reveal';
import { FloatingDots } from '@/components/floating-dots';
import { TiltCard } from '@/components/tilt-card';
import { TypewriterText } from '@/components/typewriter-text';
import { PhotoGlow } from '@/components/photo-glow';
import { GithubIcon, LinkedinIcon } from '@/components/icons';

const GITHUB_USERNAME = 'Vlad-developer004';

type IconComp = ComponentType<{ className?: string; style?: CSSProperties }>;

const STACK_ICONS: { Icon: IconComp; color: string; size?: string; position: string; style: CSSProperties }[] = [
  {
    Icon: SiReact,
    color: '#61DAFB',
    position: 'left-[22%] top-8',
    style: { animation: 'float 6s ease-in-out infinite' },
  },
  {
    Icon: SiNextdotjs,
    color: '#ffffff',
    position: 'right-[20%] top-12',
    style: { animation: 'float 7s ease-in-out infinite', animationDelay: '1s' },
  },
  {
    Icon: SiNodedotjs,
    color: '#5FA04E',
    position: 'left-5 top-1/2 -translate-y-1/2',
    style: { animation: 'float 5.5s ease-in-out infinite', animationDelay: '0.5s' },
  },
  {
    Icon: SiTypescript,
    color: '#3178C6',
    size: 'h-4 w-4 sm:h-5 sm:w-5',
    position: 'right-5 top-[58%] -translate-y-1/2',
    style: { animation: 'float 6.5s ease-in-out infinite', animationDelay: '1.5s' },
  },
];

export function Hero({ t }: { t: TFunction }) {
  return (
    <section className="section-divider relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_-10%,color-mix(in_oklch,var(--primary)_22%,transparent),transparent_55%)]"
      />
      <FloatingDots />

      <div className="relative mx-auto grid max-w-6xl gap-10 px-5 pb-14 pt-8 sm:gap-12 sm:px-6 sm:pb-24 sm:pt-12 lg:grid-cols-2 lg:items-center lg:gap-8 lg:pb-32 lg:pt-16">
        <div className="flex flex-col gap-6">
          <Reveal>
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              {t('eyebrow', { ns: 'hero' })}
            </span>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="max-w-xl text-4xl font-bold leading-[1.1] tracking-tight sm:text-6xl">
              {t('headlineLead', { ns: 'hero' })}{' '}
              <span className="text-primary">{t('headlineAccent', { ns: 'hero' })}</span>
              <br />
              {t('headlineMid', { ns: 'hero' })}{' '}
              <TypewriterText
                text={t('headlineItalic', { ns: 'hero' })}
                className="font-serif italic font-normal"
              />
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t('tagline', { ns: 'hero' })}
            </p>
          </Reveal>

          <Reveal delay={0.22}>
            <span className="inline-flex w-fit items-center rounded-xl border border-border bg-muted px-4 py-2 text-sm text-foreground/80">
              {t('visaBadge', { ns: 'hero' })}
            </span>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="btn-shine inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03] active:scale-[0.97]"
              >
                {t('ctaContact', { ns: 'hero' })}
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="/cv.pdf"
                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-transform hover:scale-[1.03] active:scale-[0.97] hover:border-primary/50"
              >
                <Download className="h-4 w-4" />
                {t('ctaDownloadCv', { ns: 'hero' })}
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.36}>
            <div className="flex items-center gap-3 text-muted-foreground">
              <span className="text-sm">{t('followMe', { ns: 'hero' })}</span>
              <a href={`https://github.com/${GITHUB_USERNAME}`} aria-label="GitHub" className="rounded-full border border-border p-2 hover:text-primary hover:border-primary/50">
                <GithubIcon className="h-4 w-4" />
              </a>
              <a href="https://www.linkedin.com/in/vladyslav-tieriekhov" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="rounded-full border border-border p-2 hover:text-primary hover:border-primary/50">
                <LinkedinIcon className="h-4 w-4" />
              </a>
              <a href={`mailto:${t('email', { ns: 'contact' })}`} aria-label="Email" className="rounded-full border border-border p-2 hover:text-primary hover:border-primary/50">
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="relative order-first w-full sm:mx-auto sm:max-w-md lg:order-0 lg:mx-0 lg:max-w-none">
          <PhotoGlow />
          <TiltCard className="aspect-4/5 glow">
            <div className="relative h-full w-full overflow-hidden">
              <Image
                src="/profile.jpg"
                alt={t('name', { ns: 'hero' })}
                fill
                priority
                className="object-cover object-[50%_32%]"
                sizes="(min-width: 1024px) 480px, 384px"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,color-mix(in_oklch,var(--background)_70%,transparent)_100%)]"
              />

              {STACK_ICONS.map(({ Icon, color, size, position, style }, i) => (
                <span
                  key={i}
                  style={{ ...style, boxShadow: `0 0 0 1px color-mix(in oklch, ${color} 35%, transparent), 0 4px 14px color-mix(in oklch, ${color} 25%, transparent)` }}
                  className={`glass-static absolute ${position} hidden h-10 w-10 items-center justify-center rounded-full sm:flex sm:h-12 sm:w-12`}
                >
                  <Icon className={size ?? 'h-5 w-5 sm:h-6 sm:w-6'} style={{ color }} />
                </span>
              ))}
            </div>

            <div className="glass absolute bottom-4 right-4 flex items-center gap-2 rounded-xl px-4 py-3">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-green-500" />
              <span className="text-sm font-medium">{t('photoAvailableBadge', { ns: 'hero' })}</span>
            </div>

            <div className="glass absolute bottom-4 left-4 hidden items-center gap-1.5 rounded-xl px-3 py-2.5 sm:flex">
              <MapPin className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-medium">{t('locationBadge', { ns: 'hero' })}</span>
            </div>
          </TiltCard>
        </Reveal>
      </div>
    </section>
  );
}
