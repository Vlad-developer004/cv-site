import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { Locale } from '@/i18nConfig';
import initTranslations from '@/lib/i18n';
import { localizePath } from '@/lib/locale-path';

export const metadata: Metadata = {
  title: 'Impressum — Vladyslav Tieriekhov',
  robots: { index: false, follow: true },
};

export default async function ImpressumPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = (await params) as { locale: Locale };
  const { t } = await initTranslations(locale);

  return (
    <div className="mx-auto max-w-3xl px-5 py-16 sm:px-6 sm:py-20">
      <Link
        href={localizePath('/', locale)}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        {t('legal.backHome', { ns: 'common' })}
      </Link>

      {locale !== 'de' && (
        <p className="mt-6 rounded-lg border border-border bg-card px-4 py-3 text-sm text-muted-foreground">
          {t('legal.germanNotice', { ns: 'common' })}
        </p>
      )}

      <h1 className="mt-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Impressum</h1>

      <div className="prose-legal mt-8 space-y-8 text-[15px] leading-relaxed text-muted-foreground">
        <section>
          <h2 className="text-lg font-semibold text-foreground">Angaben gemäß § 5 TMG</h2>
          <p className="mt-2">
            Vladyslav Tieriekhov
            <br />
            Berlin, Deutschland
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">Kontakt</h2>
          <p className="mt-2">
            E-Mail:{' '}
            <a href="mailto:terehovvlad29@gmail.com" className="text-primary hover:underline">
              terehovvlad29@gmail.com
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">Hinweis zum Charakter dieser Seite</h2>
          <p className="mt-2">
            Diese Website ist eine private Projekt- und Bewerbungspräsentation. Sie dient ausschließlich der
            Vorstellung eigener Software-Projekte gegenüber potenziellen Arbeitgebern und enthält kein
            kommerzielles Waren- oder Dienstleistungsangebot.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">Haftung für Inhalte</h2>
          <p className="mt-2">
            Als Diensteanbieter bin ich gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den
            allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG bin ich als Diensteanbieter jedoch nicht
            verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen
            zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">Haftung für Links</h2>
          <p className="mt-2">
            Diese Website enthält Links zu externen Websites Dritter (u. a. GitHub, LinkedIn, live deployte
            Projekte), auf deren Inhalte ich keinen Einfluss habe. Für diese fremden Inhalte kann ich daher keine
            Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder
            Betreiber der Seiten verantwortlich.
          </p>
        </section>
      </div>
    </div>
  );
}
