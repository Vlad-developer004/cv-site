'use client';

import { useEffect, useState } from 'react';

const MIN_VISIBLE_MS = 700;
const EXIT_MS = 700;
const CIRCUMFERENCE = 2 * Math.PI * 35;

export function SitePreloader() {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const start = Date.now();

    function finish() {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, MIN_VISIBLE_MS - elapsed);
      setTimeout(() => {
        setExiting(true);
        setTimeout(() => setVisible(false), EXIT_MS);
      }, remaining);
    }

    if (document.readyState === 'complete') {
      finish();
    } else {
      window.addEventListener('load', finish, { once: true });
      return () => window.removeEventListener('load', finish);
    }
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = visible ? 'hidden' : '';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-100 flex items-center justify-center bg-background transition-opacity duration-600 ease-out ${
        exiting ? 'opacity-0 delay-150' : 'opacity-100'
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
        className={`relative flex flex-col items-center gap-5 transition-all duration-300 ease-in-out ${
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

          <span className="preloader-badge flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--primary),color-mix(in_oklch,var(--primary)_55%,var(--foreground)))] text-sm font-bold text-primary-foreground shadow-lg">
            VT
          </span>
        </div>

        <div className="h-0.5 w-24 overflow-hidden rounded-full bg-border" aria-hidden>
          <div className="preloader-shimmer h-full w-1/3 rounded-full bg-[linear-gradient(90deg,transparent,var(--primary),transparent)]" />
        </div>
      </div>
    </div>
  );
}
