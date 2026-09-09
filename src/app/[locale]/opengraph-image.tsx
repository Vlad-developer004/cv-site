import { ImageResponse } from 'next/og';
import type { Locale } from '@/i18nConfig';
import initTranslations from '@/lib/i18n';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const TITLES: Record<Locale, string> = {
  en: 'Vladyslav Tieriekhov',
  de: 'Vladyslav Tieriekhov',
  ru: 'Владислав Терехов',
  uk: 'Владислав Тєрєхов',
};

const ROLES: Record<Locale, string> = {
  en: 'Full-Stack Developer',
  de: 'Full-Stack Entwickler',
  ru: 'Full-Stack разработчик',
  uk: 'Full-Stack розробник',
};

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = (await params) as { locale: Locale };
  const { t } = await initTranslations(locale);
  const tagline = t('tagline', { ns: 'hero' }) as string;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px 90px',
          background: 'linear-gradient(120deg, #0a1f1c 0%, #0d2b26 40%, #103833 75%, #0f6f57 140%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            fontSize: 26,
            fontWeight: 600,
            letterSpacing: 2,
            textTransform: 'uppercase',
            color: '#55e6bd',
          }}
        >
          <div style={{ width: 34, height: 3, background: '#55e6bd', display: 'flex' }} />
          {ROLES[locale]}
        </div>

        <div
          style={{
            display: 'flex',
            marginTop: 26,
            fontSize: 86,
            fontWeight: 700,
            color: '#ffffff',
            letterSpacing: -2,
          }}
        >
          {TITLES[locale]}
        </div>

        <div
          style={{
            display: 'flex',
            marginTop: 32,
            fontSize: 30,
            lineHeight: 1.45,
            maxWidth: 900,
            color: '#cfe9e1',
          }}
        >
          {tagline}
        </div>

        <div
          style={{
            display: 'flex',
            marginTop: 56,
            fontSize: 24,
            fontWeight: 600,
            color: '#eafaf5',
            gap: 14,
          }}
        >
          <span>React</span>
          <span style={{ color: '#55e6bd' }}>·</span>
          <span>Next.js</span>
          <span style={{ color: '#55e6bd' }}>·</span>
          <span>Node.js</span>
          <span style={{ color: '#55e6bd' }}>·</span>
          <span>TypeScript</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
