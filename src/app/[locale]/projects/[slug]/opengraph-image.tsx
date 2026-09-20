import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { ImageResponse } from 'next/og';
import type { Locale } from '@/i18nConfig';
import initTranslations from '@/lib/i18n';
import { PROJECT_IDS } from '@/lib/project-visuals';

export const runtime = 'nodejs';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

type Project = { id: string; name: string; status: string; description: string };

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = (await params) as { locale: Locale; slug: string };
  const { t } = await initTranslations(locale);
  const projects = t('items', { ns: 'projects', returnObjects: true }) as Project[];
  const project = projects.find((p) => p.id === slug);

  // Pre-generated small JPEG (see scripts/generate-og-thumbnails.mjs), not the
  // full source screenshot — keeps this function's payload tiny across every
  // locale × project combination instead of embedding a multi-hundred-KB PNG.
  let screenshotDataUri: string | null = null;
  if ((PROJECT_IDS as readonly string[]).includes(slug)) {
    try {
      const filePath = path.join(process.cwd(), 'public', 'projects', 'og', `${slug}.jpg`);
      const file = await readFile(filePath);
      screenshotDataUri = `data:image/jpeg;base64,${file.toString('base64')}`;
    } catch {
      screenshotDataUri = null;
    }
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(120deg, #0a1f1c 0%, #0d2b26 40%, #103833 75%, #0f6f57 140%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', padding: '56px 64px 28px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: 1.5,
              textTransform: 'uppercase',
              color: '#55e6bd',
            }}
          >
            <div style={{ width: 28, height: 3, background: '#55e6bd', display: 'flex' }} />
            Vladyslav Tieriekhov
          </div>
          <div style={{ display: 'flex', marginTop: 14, fontSize: 52, fontWeight: 700, color: '#ffffff', letterSpacing: -1 }}>
            {project?.name ?? slug}
          </div>
          {project?.status && (
            <div
              style={{
                display: 'flex',
                marginTop: 12,
                alignSelf: 'flex-start',
                fontSize: 20,
                fontWeight: 600,
                color: '#0a1f1c',
                background: '#55e6bd',
                borderRadius: 999,
                padding: '6px 18px',
              }}
            >
              {project.status}
            </div>
          )}
        </div>

        {screenshotDataUri && (
          <div style={{ display: 'flex', flex: 1, padding: '0 64px 56px' }}>
            <img
              src={screenshotDataUri}
              alt=""
              width={1072}
              height={344}
              style={{ borderRadius: 16, objectFit: 'cover', objectPosition: 'top', border: '1px solid rgba(255,255,255,0.15)' }}
            />
          </div>
        )}
      </div>
    ),
    { ...size }
  );
}
