import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Vladyslav Tieriekhov — Full-Stack Developer',
    short_name: 'Vladyslav Tieriekhov',
    description: 'Portfolio of Vladyslav Tieriekhov, a full-stack developer building React/Next.js and Node.js applications.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0b0b0f',
    theme_color: '#0b0b0f',
    icons: [
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
