import type { Locale } from '@/i18nConfig';
import initTranslations from '@/lib/i18n';
import { Hero } from './sections/hero';
import { Expertise } from './sections/expertise';
import { About } from './sections/about';
import { Projects } from './sections/projects';
import { Timeline } from './sections/timeline';
import { GithubActivity } from './sections/github-activity';
import { Skills } from './sections/skills';
import { Contact } from './sections/contact';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = (await params) as { locale: Locale };
  const { t } = await initTranslations(locale);

  return (
    <>
      <Hero t={t} />
      <Expertise t={t} locale={locale} />
      <About t={t} />
      <Skills t={t} />
      <Projects t={t} locale={locale} />
      <Timeline t={t} />
      <GithubActivity t={t} />
      <Contact />
    </>
  );
}
