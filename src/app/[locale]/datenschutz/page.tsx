import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { Locale } from '@/i18nConfig';
import initTranslations from '@/lib/i18n';
import { localizePath } from '@/lib/locale-path';

export const metadata: Metadata = {
  title: 'Datenschutzerklärung — Vladyslav Tieriekhov',
  robots: { index: false, follow: true },
};

export default async function DatenschutzPage({ params }: { params: Promise<{ locale: string }> }) {
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

      <h1 className="mt-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Datenschutzerklärung
      </h1>

      <div className="mt-8 space-y-8 text-[15px] leading-relaxed text-muted-foreground">
        <section>
          <h2 className="text-lg font-semibold text-foreground">1. Verantwortlicher</h2>
          <p className="mt-2">
            Vladyslav Tieriekhov
            <br />
            Berlin, Deutschland
            <br />
            E-Mail:{' '}
            <a href="mailto:terehovvlad29@gmail.com" className="text-primary hover:underline">
              terehovvlad29@gmail.com
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">2. Übersicht der Verarbeitungen</h2>
          <p className="mt-2">
            Diese Seite ist bewusst datensparsam gebaut: Es gibt kein Tracking, keine Analyse-Tools (z. B. Google
            Analytics), keine Werbung und keine Werbe-Cookies. Es werden nur die Daten verarbeitet, die für den
            technischen Betrieb der Seite und die Bearbeitung von Kontaktanfragen notwendig sind.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">3. Hosting</h2>
          <p className="mt-2">
            Diese Website wird bei Vercel Inc. (USA) gehostet. Beim Aufruf der Seite verarbeitet der Hosting-Anbieter
            automatisch technische Informationen (sogenannte Server-Logfiles), die Ihr Browser übermittelt — etwa
            IP-Adresse, Datum und Uhrzeit der Anfrage, aufgerufene Seite, Browsertyp und Referrer-URL. Diese
            Verarbeitung erfolgt auf Grundlage meines berechtigten Interesses an einem sicheren und funktionsfähigen
            Betrieb der Website (Art. 6 Abs. 1 lit. f DSGVO). Eine Übermittlung dieser Daten in die USA kann im
            Rahmen des Hostings erfolgen; Vercel gibt an, geeignete Garantien (u. a. Standardvertragsklauseln) für
            solche Übermittlungen bereitzustellen.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">4. Cookies &amp; lokaler Speicher</h2>
          <p className="mt-2">
            Beim Aufruf der Seite wird ein technisch notwendiges Cookie (<code>NEXT_LOCALE</code>) gesetzt, das
            lediglich Ihre zuletzt aufgerufene Sprachversion (DE/EN/RU/UK) speichert (Gültigkeit: 1 Jahr). Rufen Sie
            die Seite danach ohne Sprachpfad auf (z. B. nur die Domain), leitet Sie diese Cookie automatisch zu Ihrer
            zuletzt genutzten Sprache weiter, statt zur deutschen Standardsprache. Ein direkt aufgerufener Link zu
            einer bestimmten Sprachversion (z. B. „/en&quot;) wird davon nicht überschrieben. Für dieses rein
            funktionale Cookie ist gemäß § 25 Abs. 2 TTDSG keine Einwilligung erforderlich.
          </p>
          <p className="mt-2">
            Ihre Auswahl des hellen oder dunklen Designs wird ausschließlich im lokalen Speicher (localStorage)
            Ihres Browsers abgelegt. Diese Information verlässt Ihr Gerät nicht und wird an niemanden übermittelt.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">5. Schriftarten</h2>
          <p className="mt-2">
            Diese Seite nutzt Google Fonts (Geist, Playfair Display). Die Schriftdateien werden beim Build der
            Seite lokal eingebunden und von meinem eigenen Server ausgeliefert — es findet keine Verbindung zu
            Servern von Google statt und es werden keine Daten an Google übertragen.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">6. Kontaktformular</h2>
          <p className="mt-2">
            Wenn Sie mich über das Kontaktformular erreichen, werden die von Ihnen eingegebenen Daten (Name,
            E-Mail-Adresse, Nachricht) verarbeitet, um Ihre Anfrage zu beantworten. Die Verarbeitung erfolgt auf
            Grundlage von Art. 6 Abs. 1 lit. b bzw. lit. f DSGVO (Bearbeitung Ihrer Anfrage bzw. mein berechtigtes
            Interesse an Kontaktaufnahme). Zur technischen Zustellung wird der Drittanbieter Web3Forms
            (web3forms.com) eingesetzt, der Ihre Formulardaten entgegennimmt und per E-Mail an mich weiterleitet.
            Ihre Daten werden nur so lange gespeichert, wie es zur Bearbeitung Ihrer Anfrage erforderlich ist.
          </p>
          <p className="mt-2">
            Alternativ können Sie mich jederzeit direkt per E-Mail kontaktieren, ohne dass Daten über einen
            Drittanbieter laufen.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">7. GitHub-Aktivität</h2>
          <p className="mt-2">
            Die auf der Seite angezeigte GitHub-Beitragsübersicht wird serverseitig von einer öffentlichen
            GitHub-Statistik-API abgerufen. Dabei werden ausschließlich öffentlich zugängliche Informationen zu
            meinem eigenen GitHub-Profil geladen — es werden keine Daten von Ihnen als Besucher:in an diesen
            Dienst übermittelt.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">8. Ihre Rechte</h2>
          <p className="mt-2">
            Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer
            personenbezogenen Daten sowie ein Recht auf Datenübertragbarkeit und Widerspruch gegen die
            Verarbeitung. Wenden Sie sich dazu einfach an die oben genannte E-Mail-Adresse. Sie haben außerdem das
            Recht, sich bei einer Datenschutzaufsichtsbehörde zu beschweren — zuständig ist die Berliner
            Beauftragte für Datenschutz und Informationsfreiheit.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">9. Stand</h2>
          <p className="mt-2">September 2026</p>
        </section>
      </div>
    </div>
  );
}
