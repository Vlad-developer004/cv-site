'use client';

import { useEffect, useState } from 'react';
import { BrandMark } from '@/components/brand-mark';

const VISIBLE_MS = 280;
const EXIT_MS = 260;
const CIRCUMFERENCE = 2 * Math.PI * 35;

export function SitePreloader() {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // Purely a brand flourish over content that's already fully rendered
    // (SSR) — skip it entirely for reduced-motion, and never delay or hide
    // real content: it's an overlay, not a gate.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const timer = setTimeout(() => setVisible(false), 0);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(() => {
      setExiting(true);
      setTimeout(() => setVisible(false), EXIT_MS);
    }, VISIBLE_MS);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed inset-0 z-100 flex items-center justify-center bg-background transition-opacity duration-260 ease-out ${
        exiting ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div
        aria-hidden
        className="preloader-blob pointer-events-none absolute h-144 w-xl rounded-full opacity-40 blur-3xl"
        style={{
          background:
            'conic-gradient(from 0deg, oklch(0.75 0.13 175), oklch(0.75 0.14 210), oklch(0.78 0.16 60), oklch(0.75 0.13 175))',
        }}
      />

      <div
        className={`relative flex flex-col items-center gap-5 transition-all duration-260 ease-in-out ${
          exiting ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        <div className="relative flex h-20 w-20 items-center justify-center">
          <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="35" fill="none" stroke="var(--border)" strokeWidth="3" />
            <circle
              className="preloader-progress"
              cx="40"
              cy="40"
              r="35"
              fill="none"
              stroke="url(#preloader-gradient)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
            />
            <defs>
              <linearGradient id="preloader-gradient" x1="0" y1="0" x2="80" y2="80">
                <stop offset="0%" stopColor="oklch(0.75 0.13 175)" />
                <stop offset="100%" stopColor="oklch(0.78 0.16 60)" />
              </linearGradient>
            </defs>
          </svg>

          <BrandMark className="preloader-badge h-12 w-12 rounded-2xl text-sm shadow-lg" />
        </div>

        <div className="h-0.5 w-24 overflow-hidden rounded-full bg-border" aria-hidden>
          <div className="preloader-shimmer h-full w-1/3 rounded-full bg-[linear-gradient(90deg,transparent,var(--primary),transparent)]" />
        </div>
      </div>
    </div>
  );
}
