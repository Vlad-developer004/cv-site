import type { TFunction } from 'i18next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';
import type { Locale } from '@/i18nConfig';
import { localizePath } from '@/lib/locale-path';
import { ICONS, SCREENSHOTS, TONES, tagTone } from '@/lib/project-visuals';
import { Reveal } from '@/components/reveal';
import { TiltCard } from '@/components/tilt-card';
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

export function Projects({ t, locale }: { t: TFunction; locale: Locale }) {
  const items = t('items', { ns: 'projects', returnObjects: true }) as Project[];
  const readMore = t('readMore', { ns: 'projects' });

  return (
    <section id="projects" className="section-divider">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6 sm:py-20">
        <Reveal>
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            {t('eyebrow', { ns: 'projects' })}
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            {t('headingLead', { ns: 'projects' })}{' '}
            <span className="text-primary">{t('headingAccent', { ns: 'projects' })}</span>
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
            {t('subheading', { ns: 'projects' })}
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {items.map((project, i) => {
            const Icon = ICONS[project.id] ?? ICONS.shop;
            const tone = TONES[project.id] ?? TONES.shop;
            const StatusIcon = tone.StatusIcon;
            const screenshot = SCREENSHOTS[project.id];
            const href = localizePath(`/projects/${project.id}`, locale);
            return (
              <Reveal key={project.id} delay={i * 0.06} className={project.highlight ? 'sm:col-span-2' : ''}>
                <TiltCard className={project.highlight ? 'border-primary/40' : ''}>
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
                        <div className="relative aspect-video w-full">
                          <Image
                            src={screenshot.src}
                            alt={project.name}
                            fill
                            className="object-cover object-top"
                            sizes="(min-width: 640px) 50vw, 100vw"
                          />
                        </div>
                      </div>
                    )}
                    <div className="p-6 pb-0">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${tone.icon}`}>
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
