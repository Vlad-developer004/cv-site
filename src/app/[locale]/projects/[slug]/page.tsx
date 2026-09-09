import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, CheckCircle2, ExternalLink } from 'lucide-react';
import { i18nConfig, type Locale } from '@/i18nConfig';
import initTranslations from '@/lib/i18n';
import { localizePath } from '@/lib/locale-path';
import { ICONS, PROJECT_IDS, SCREENSHOTS, TONES, tagTone } from '@/lib/project-visuals';
import { Reveal } from '@/components/reveal';
import { GithubIcon } from '@/components/icons';

type Detail = {
  overview: string | string[];
  architecture: string[];
  challenges: { problem: string; solution: string }[];
  highlights: string[];
};

type Project = {
  id: string;
  name: string;
  status: string;
  description: string;
  stack: string[];
  links: { repo: string | null; repoClient?: string | null; live: string | null };
  detail: Detail;
};

export function generateStaticParams() {
  return i18nConfig.locales.flatMap((locale) => PROJECT_IDS.map((slug) => ({ locale, slug })));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = (await params) as { locale: Locale; slug: string };
  const { t } = await initTranslations(locale);

  const items = t('items', { ns: 'projects', returnObjects: true }) as Project[];
  const project = items.find((p) => p.id === slug);
  if (!project) notFound();

  const labels = t('detailLabels', { ns: 'projects', returnObjects: true }) as Record<string, string>;
  const Icon = ICONS[project.id] ?? ICONS.shop;
  const tone = TONES[project.id] ?? TONES.shop;
  const StatusIcon = tone.StatusIcon;
  const screenshot = SCREENSHOTS[project.id];

  return (
    <article className="mx-auto max-w-3xl px-5 py-12 sm:px-6 sm:py-20">
      <Reveal>
        <Link
          href={localizePath('/#projects', locale)}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          {labels.back}
        </Link>
      </Reveal>

      <Reveal delay={0.06}>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${tone.icon}`}>
            <Icon className="h-5 w-5" />
          </span>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{project.name}</h1>
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${tone.badge}`}
          >
            <StatusIcon className="h-3.5 w-3.5" />
            {project.status}
          </span>
        </div>
      </Reveal>

      {screenshot && (
        <Reveal delay={0.1}>
          <div className="relative mt-8 overflow-hidden rounded-2xl border border-border bg-[#0b0b0f]">
            {screenshot.chrome === 'browser' && (
              <div className="flex items-center gap-1.5 px-3.5 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              </div>
            )}
            <div className="relative aspect-video w-full">
              <Image src={screenshot.src} alt={project.name} fill priority className="object-cover object-top" sizes="768px" />
            </div>
          </div>
        </Reveal>
      )}

      <Reveal delay={0.14}>
        <div className="mt-8 space-y-4">
          {(Array.isArray(project.detail.overview) ? project.detail.overview : [project.detail.overview]).map(
            (para, i) => (
              <p key={i} className="text-lg leading-relaxed text-foreground/90">
                {para}
              </p>
            )
          )}
        </div>
      </Reveal>

      <Reveal delay={0.18}>
        <div className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium ${tagTone(tech)}`}
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-current" />
              {tech}
            </span>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.22}>
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-foreground">{labels.architecture}</h2>
          <ul className="mt-4 space-y-3">
            {project.detail.architecture.map((point, i) => (
              <li key={i} className="flex gap-3 text-base leading-relaxed text-muted-foreground">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </section>
      </Reveal>

      <Reveal delay={0.26}>
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-foreground">{labels.challenges}</h2>
          <div className="mt-4 space-y-4">
            {project.detail.challenges.map((c, i) => (
              <div key={i} className="glass overflow-hidden rounded-xl">
                <div className="border-l-2 border-foreground/25 py-4 pl-4 pr-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {labels.problem}
                  </p>
                  <p className="mt-1 text-base text-foreground/90">{c.problem}</p>
                </div>
                <div className="border-l-2 border-primary bg-primary/5 py-4 pl-4 pr-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                    {labels.solution}
                  </p>
                  <p className="mt-1 text-base leading-relaxed text-muted-foreground">{c.solution}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal delay={0.3}>
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-foreground">{labels.highlights}</h2>
          <ul className="mt-4 space-y-3">
            {project.detail.highlights.map((point, i) => (
              <li key={i} className="flex gap-3 text-base leading-relaxed text-foreground/90">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </section>
      </Reveal>

      {(project.links.repo || project.links.repoClient || project.links.live) && (
        <Reveal delay={0.34}>
          <section className="mt-12 border-t border-border pt-8">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {labels.links}
            </h2>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {project.links.repo && (
                <a
                  href={project.links.repo}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:border-primary/50 hover:text-primary"
                >
                  <GithubIcon className="h-4 w-4" /> Code
                </a>
              )}
              {project.links.repoClient && (
                <a
                  href={project.links.repoClient}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:border-primary/50 hover:text-primary"
                >
                  <GithubIcon className="h-4 w-4" /> {labels.frontendCode}
                </a>
              )}
              {project.links.live && (
                <a
                  href={project.links.live}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:border-primary/50 hover:text-primary"
                >
                  <ExternalLink className="h-4 w-4" /> Live
                </a>
              )}
            </div>
          </section>
        </Reveal>
      )}
    </article>
  );
}
