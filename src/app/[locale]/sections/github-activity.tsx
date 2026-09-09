import type { TFunction } from 'i18next';
import { Suspense } from 'react';
import { Reveal } from '@/components/reveal';
import { GithubIcon } from '@/components/icons';

const GITHUB_USERNAME = 'Vlad-developer004';

type Contribution = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };
type ContributionsResponse = { contributions: Contribution[] };

const LEVEL_CLASS: Record<0 | 1 | 2 | 3 | 4, string> = {
  0: 'bg-foreground/[0.06]',
  1: 'bg-primary/25',
  2: 'bg-primary/50',
  3: 'bg-primary/75',
  4: 'bg-primary',
};

const MONTH_KEYS = [
  'jan',
  'feb',
  'mar',
  'apr',
  'may',
  'jun',
  'jul',
  'aug',
  'sep',
  'oct',
  'nov',
  'dec',
] as const;

async function getContributions(): Promise<Contribution[] | null> {
  try {
    const year = new Date().getFullYear();
    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=${year}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const data: ContributionsResponse = await res.json();
    return data.contributions;
  } catch {
    return null;
  }
}

function toWeeks(days: Contribution[]) {
  const first = days[0];
  const firstDay = first ? new Date(`${first.date}T00:00:00Z`).getUTCDay() : 0;
  const padded: (Contribution | null)[] = [...Array(firstDay).fill(null), ...days];

  const weeks: (Contribution | null)[][] = [];
  for (let i = 0; i < padded.length; i += 7) {
    weeks.push(padded.slice(i, i + 7));
  }
  return weeks;
}

export function GithubActivity({ t }: { t: TFunction }) {
  return (
    <section className="section-divider">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6 sm:py-16">
        <Reveal>
          <div className="mb-4 flex flex-wrap items-center gap-x-2 gap-y-1">
            <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              {t('githubActivity', { ns: 'common' })}
            </p>
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
            >
              <GithubIcon className="h-3.5 w-3.5" />@{GITHUB_USERNAME}
            </a>
          </div>

          <p className="mb-4 max-w-3xl text-sm text-muted-foreground">
            {t('githubActivityNote', { ns: 'common' })}
          </p>

          <Suspense fallback={<HeatmapSkeleton />}>
            <HeatmapData t={t} />
          </Suspense>
        </Reveal>
      </div>
    </section>
  );
}

function HeatmapSkeleton() {
  return <div className="h-[139.5px] animate-pulse rounded-2xl border border-border bg-card" />;
}

async function HeatmapData({ t }: { t: TFunction }) {
  const contributions = await getContributions();
  const monthLabels = MONTH_KEYS.map((key) => t(`months.${key}`, { ns: 'common', defaultValue: key }));
  const weekdayLabels = {
    mon: t('weekdays.mon', { ns: 'common', defaultValue: 'Mon' }),
    wed: t('weekdays.wed', { ns: 'common', defaultValue: 'Wed' }),
    fri: t('weekdays.fri', { ns: 'common', defaultValue: 'Fri' }),
  };

  if (!contributions) {
    return (
      <div className="rounded-2xl border border-border bg-card p-6 text-sm text-muted-foreground">
        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noreferrer"
          className="text-primary hover:underline"
        >
          github.com/{GITHUB_USERNAME}
        </a>
      </div>
    );
  }

  return <GithubHeatmap contributions={contributions} monthLabels={monthLabels} weekdayLabels={weekdayLabels} />;
}

function GithubHeatmap({
  contributions,
  monthLabels,
  weekdayLabels,
}: {
  contributions: Contribution[];
  monthLabels: string[];
  weekdayLabels: { mon: string; wed: string; fri: string };
}) {
  const weeks = toWeeks(contributions);

  const monthMarkers = weeks.map((week) => {
    const firstDayOfMonth = week.find((day) => day && day.date.endsWith('-01'));
    if (!firstDayOfMonth) return null;
    return monthLabels[new Date(`${firstDayOfMonth.date}T00:00:00Z`).getUTCMonth()];
  });

  return (
    <div className="relative rounded-2xl border border-border bg-card">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-6 rounded-l-2xl bg-[linear-gradient(90deg,var(--card),transparent)]"
      />
      <div dir="rtl" className="overflow-x-auto p-4">
        <div dir="ltr" className="inline-flex min-w-full gap-2 sm:min-w-0">
          <div className="grid auto-rows-2.5 grid-rows-7 gap-0.75 pt-4 text-[9px] leading-none text-muted-foreground sm:auto-rows-2.75 sm:text-[10px]">
            <span className="row-start-2">{weekdayLabels.mon}</span>
            <span className="row-start-4">{weekdayLabels.wed}</span>
            <span className="row-start-6">{weekdayLabels.fri}</span>
          </div>

          <div className="flex flex-col gap-1">
            <div className="relative flex gap-0.75 text-[9px] text-muted-foreground sm:text-[10px]">
              {monthMarkers.map((label, i) => (
                <span key={i} className="w-2.5 shrink-0 whitespace-nowrap sm:w-2.75">
                  {label ?? ''}
                </span>
              ))}
            </div>

            <div className="flex gap-0.75">
              {weeks.map((week, wi) => (
                <div key={wi} className="grid grid-rows-7 gap-0.75">
                  {week.map((day, di) => (
                    <div
                      key={di}
                      title={day ? `${day.date}: ${day.count}` : undefined}
                      className={`h-2.5 w-2.5 rounded-xs sm:h-2.75 sm:w-2.75 ${
                        day ? LEVEL_CLASS[day.level] : 'bg-transparent'
                      }`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
