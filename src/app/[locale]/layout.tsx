import type { Metadata } from 'next';
import { Geist, Playfair_Display } from 'next/font/google';
import '../globals.css';
import { i18nConfig, type Locale } from '@/i18nConfig';
import initTranslations from '@/lib/i18n';
import TranslationsProvider from '@/components/translations-provider';
import { ThemeProvider } from '@/components/theme-provider';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { ScrollProgress } from '@/components/scroll-progress';
import { SitePreloader } from '@/components/site-preloader';
import { AmbientBackground } from '@/components/ambient-background';
import { ConsoleEasterEgg } from '@/components/console-easter-egg';
import { KonamiCode } from '@/components/konami-code';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  style: ['italic'],
});

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  const { t } = await initTranslations(locale);

  const titles: Record<Locale, string> = {
    en: 'Vladyslav Tieriekhov — Full-Stack Developer',
    de: 'Vladyslav Tieriekhov — Full-Stack Entwickler',
    ru: 'Владислав Терехов — Full-Stack разработчик',
    uk: 'Владислав Тєрєхов — Full-Stack розробник',
  };

  const description = t('tagline', { ns: 'hero' });
  const siteUrl = 'https://vt-cv-site.vercel.app';
  const path = locale === i18nConfig.defaultLocale ? '/' : `/${locale}`;

  return {
    metadataBase: new URL(siteUrl),
    title: titles[locale],
    description,
    alternates: {
      canonical: path,
      languages: Object.fromEntries(
        i18nConfig.locales.map((l) => [l, l === i18nConfig.defaultLocale ? '/' : `/${l}`])
      ),
    },
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/icon.png', type: 'image/png' },
      ],
      apple: '/icon.png',
    },
    openGraph: {
      title: titles[locale],
      description,
      url: path,
      siteName: 'Vladyslav Tieriekhov',
      locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[locale],
      description,
    },
  };
}

function buildJsonLd(locale: Locale, tagline: string) {
  const siteUrl = 'https://vt-cv-site.vercel.app';
  const roles: Record<Locale, string> = {
    en: 'Full-Stack Developer',
    de: 'Full-Stack Entwickler',
    ru: 'Full-Stack разработчик',
    uk: 'Full-Stack розробник',
  };
  const path = locale === i18nConfig.defaultLocale ? '/' : `/${locale}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Vladyslav Tieriekhov',
    jobTitle: roles[locale],
    description: tagline,
    url: `${siteUrl}${path}`,
    image: `${siteUrl}/profile.jpg`,
    email: 'mailto:terehovvlad29@gmail.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Berlin',
      addressCountry: 'DE',
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'National University "Zaporizhzhia Polytechnic"',
    },
    knowsLanguage: ['de', 'en', 'uk', 'ru'],
    sameAs: ['https://github.com/Vlad-developer004', 'https://www.linkedin.com/in/vladyslav-tieriekhov'],
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = (await params) as { locale: Locale };
  const { t, resources } = await initTranslations(locale);
  const jsonLd = buildJsonLd(locale, t('tagline', { ns: 'hero' }) as string);
  const skipToContent = t('skipToContent', { ns: 'common' }) as string;

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${geistSans.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-100 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
        >
          {skipToContent}
        </a>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <TranslationsProvider locale={locale} resources={resources[locale] as Record<string, unknown>}>
            <SitePreloader />
            <ConsoleEasterEgg />
            <KonamiCode />
            <div className="page-reveal flex min-h-full flex-1 flex-col">
              <AmbientBackground />
              <ScrollProgress />
              <SiteHeader locale={locale} />
              <main id="main-content" className="flex-1">{children}</main>
              <SiteFooter locale={locale} />
            </div>
          </TranslationsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
