import type { TFunction } from 'i18next';
import type { ComponentType, CSSProperties } from 'react';
import { Bot, Code2, Database, Drama, FileText, KeyRound, Layout, Mic, Server, Table2, Waves, Webhook, Wrench } from 'lucide-react';
import {
  SiClaudecode,
  SiCss,
  SiDocker,
  SiExpress,
  SiFramer,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiJsonwebtokens,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiReact,
  SiStripe,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVite,
  SiVuedotjs,
} from 'react-icons/si';
import { Reveal } from '@/components/reveal';
import { SkillChip } from '@/components/skill-chip';
import { TiltCard } from '@/components/tilt-card';

type SkillGroup = { id: string; name: string; items: string[] };
type ProjectRef = { name: string; stack: string[] };
type IconComp = ComponentType<{ className?: string; style?: CSSProperties }>;

const GROUP_ICONS: Record<string, IconComp> = {
  languages: Code2,
  frontend: Layout,
  backend: Server,
  data: Database,
  ai: Bot,
  tools: Wrench,
};

const TECH: Record<string, { Icon: IconComp; color?: string; tier: 1 | 2 | 3 }> = {
  'Claude Code': { Icon: SiClaudecode, color: '#D97757', tier: 3 },
  TypeScript: { Icon: SiTypescript, color: '#3178C6', tier: 3 },
  'JavaScript (ES6+)': { Icon: SiJavascript, color: '#F0DB4F', tier: 3 },
  Python: { Icon: SiPython, color: '#3776AB', tier: 2 },
  SQL: { Icon: Table2, color: '#4A90D9', tier: 2 },
  HTML5: { Icon: SiHtml5, color: '#E34F26', tier: 3 },
  'CSS3/SCSS': { Icon: SiCss, color: '#2965F1', tier: 3 },
  React: { Icon: SiReact, color: '#61DAFB', tier: 3 },
  'Next.js': { Icon: SiNextdotjs, tier: 3 },
  'Vue.js': { Icon: SiVuedotjs, color: '#4FC08D', tier: 2 },
  Vite: { Icon: SiVite, color: '#646CFF', tier: 2 },
  'Tailwind CSS': { Icon: SiTailwindcss, color: '#38BDF8', tier: 3 },
  'Framer Motion / motion': { Icon: SiFramer, color: '#8B5CF6', tier: 2 },
  'Node.js': { Icon: SiNodedotjs, color: '#5FA04E', tier: 3 },
  Express: { Icon: SiExpress, tier: 3 },
  'RESTful APIs': { Icon: Webhook, color: '#F59E0B', tier: 3 },
  'RESTful API': { Icon: Webhook, color: '#F59E0B', tier: 3 },
  'JWT Auth': { Icon: SiJsonwebtokens, color: '#EC4899', tier: 2 },
  'JWT-Authentifizierung': { Icon: SiJsonwebtokens, color: '#EC4899', tier: 2 },
  'JWT-аутентификация': { Icon: SiJsonwebtokens, color: '#EC4899', tier: 2 },
  'JWT-автентифікація': { Icon: SiJsonwebtokens, color: '#EC4899', tier: 2 },
  WebSockets: { Icon: Waves, color: '#38BDF8', tier: 2 },
  'Auth.js': { Icon: KeyRound, color: '#22C55E', tier: 2 },
  Stripe: { Icon: SiStripe, color: '#635BFF', tier: 2 },
  'pdf-lib': { Icon: FileText, color: '#F59E0B', tier: 2 },
  PostgreSQL: { Icon: SiPostgresql, color: '#4A90D9', tier: 3 },
  MongoDB: { Icon: SiMongodb, color: '#47A248', tier: 2 },
  Mongoose: { Icon: SiMongodb, color: '#88231E', tier: 2 },
  'Prisma ORM': { Icon: SiPrisma, color: '#5A67D8', tier: 3 },
  'LLM APIs': { Icon: Bot, color: '#A78BFA', tier: 2 },
  'LLM-APIs': { Icon: Bot, color: '#A78BFA', tier: 2 },
  'LLM API': { Icon: Bot, color: '#A78BFA', tier: 2 },
  'Speech-to-Text / Text-to-Speech pipelines': { Icon: Mic, color: '#FB7185', tier: 2 },
  'Speech-to-Text-/Text-to-Speech-Pipelines': { Icon: Mic, color: '#FB7185', tier: 2 },
  'Speech-to-Text / Text-to-Speech пайплайны': { Icon: Mic, color: '#FB7185', tier: 2 },
  Git: { Icon: SiGit, color: '#F05033', tier: 3 },
  Docker: { Icon: SiDocker, color: '#2496ED', tier: 2 },
  Playwright: { Icon: Drama, color: '#2EAD33', tier: 2 },
  Vercel: { Icon: SiVercel, tier: 2 },
};

const TIER_ORDER = [3, 2, 1] as const;

const TIER_BAR: Record<1 | 2 | 3, string> = {
  3: 'from-primary via-primary/60 to-transparent',
  2: 'from-foreground/40 to-transparent',
  1: 'from-foreground/20 to-transparent',
};

const TIER_DOT: Record<1 | 2 | 3, string> = {
  3: 'bg-primary',
  2: 'bg-foreground/50',
  1: 'bg-foreground/25',
};

const TIER_LABEL: Record<1 | 2 | 3, string> = {
  3: 'text-primary',
  2: 'text-foreground/70',
  1: 'text-muted-foreground',
};

export function Skills({ t }: { t: TFunction }) {
  const groups = t('groups', { ns: 'skills', returnObjects: true }) as SkillGroup[];
  const projects = t('items', { ns: 'projects', returnObjects: true }) as ProjectRef[];
  const usedInLabel = t('usedIn', { ns: 'skills' });
  const levels = t('levels', { ns: 'skills', returnObjects: true }) as {
    advanced: string;
    comfortable: string;
    familiar: string;
  };

  const usageMap = new Map<string, string[]>();
  projects.forEach((project) => {
    project.stack.forEach((tech) => {
      const list = usageMap.get(tech) ?? [];
      if (!list.includes(project.name)) list.push(project.name);
      usageMap.set(tech, list);
    });
  });

  const tierCounts: Record<1 | 2 | 3, number> = { 1: 0, 2: 0, 3: 0 };
  groups.forEach((group) => {
    group.items.forEach((item) => {
      tierCounts[TECH[item]?.tier ?? 2] += 1;
    });
  });
  const tierLabel = (tier: 1 | 2 | 3) =>
    tier === 3 ? levels.advanced : tier === 2 ? levels.comfortable : levels.familiar;

  return (
    <section id="skills" className="section-divider relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_100%,color-mix(in_oklch,var(--primary)_9%,transparent),transparent_55%)]"
      />
      <div className="relative mx-auto max-w-6xl px-5 py-11 sm:px-6 sm:py-16">
        <Reveal>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t('headingLead', { ns: 'skills' })}{' '}
            <span className="text-primary">{t('headingAccent', { ns: 'skills' })}</span>
          </h2>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-5 flex flex-wrap gap-2.5">
            {TIER_ORDER.filter((tier) => tierCounts[tier] > 0).map((tier) => (
              <span
                key={tier}
                className="glass inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium"
              >
                <span className={`h-1.5 w-1.5 rounded-full ${TIER_DOT[tier]}`} />
                <span className={TIER_LABEL[tier]}>{tierCounts[tier]}</span>
                <span className="text-muted-foreground">{tierLabel(tier)}</span>
              </span>
            ))}
          </div>
        </Reveal>

        <div className="relative mt-10">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_25%_15%,color-mix(in_oklch,var(--primary)_10%,transparent),transparent_55%)]"
          />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {groups.map((group, i) => {
              const GroupIcon = GROUP_ICONS[group.id] ?? Code2;
              const buckets = TIER_ORDER.map((tier) => ({
                tier,
                items: group.items.filter((item) => (TECH[item]?.tier ?? 2) === tier),
              })).filter((bucket) => bucket.items.length > 0);

              return (
                <Reveal key={group.id} delay={i * 0.05}>
                  <TiltCard className="h-full">
                    <div className="h-full p-5">
                      <div className="flex items-center gap-2.5">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <GroupIcon className="h-4 w-4" />
                        </span>
                        <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                          {group.name}
                        </h3>
                      </div>

                      <div className="mt-4 space-y-3">
                        {buckets.map(({ tier, items }) => (
                          <div
                            key={tier}
                            className="relative overflow-hidden rounded-xl border border-border/60 bg-background/30 p-4"
                          >
                            <span
                              className={`absolute inset-x-0 top-0 h-0.75 bg-linear-to-r ${TIER_BAR[tier]}`}
                            />
                            <div
                              className={`mb-2.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider ${TIER_LABEL[tier]}`}
                            >
                              <span className={`h-1.5 w-1.5 rounded-full ${TIER_DOT[tier]}`} />
                              {tierLabel(tier)}
                            </div>

                            <div className="flex flex-wrap gap-1.5">
                              {items.map((item) => {
                                const meta = TECH[item];
                                const Icon = meta?.Icon ?? Code2;
                                return (
                                  <SkillChip
                                    key={item}
                                    icon={
                                      <Icon
                                        className="h-3.5 w-3.5 shrink-0"
                                        style={meta?.color ? { color: meta.color } : undefined}
                                      />
                                    }
                                    label={item}
                                    usedIn={usageMap.get(item) ?? []}
                                    usedInLabel={usedInLabel}
                                  />
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TiltCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
