export default function Loading() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="relative flex h-20 w-20 items-center justify-center">
        <div
          aria-hidden
          className="absolute h-24 w-24 animate-spin rounded-full opacity-60 blur-xl"
          style={{
            background:
              'conic-gradient(from 0deg, oklch(0.75 0.13 175), oklch(0.75 0.14 210), oklch(0.78 0.16 60), oklch(0.75 0.13 175))',
            animationDuration: '3s',
          }}
        />

        <svg className="absolute inset-0 h-full w-full -rotate-90 animate-spin" style={{ animationDuration: '1.4s' }} viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="35" fill="none" stroke="var(--border)" strokeWidth="3" />
          <circle
            cx="40"
            cy="40"
            r="35"
            fill="none"
            stroke="url(#loading-gradient)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 35}
            strokeDashoffset={2 * Math.PI * 35 * 0.72}
          />
          <defs>
            <linearGradient id="loading-gradient" x1="0" y1="0" x2="80" y2="80">
              <stop offset="0%" stopColor="oklch(0.75 0.13 175)" />
              <stop offset="100%" stopColor="oklch(0.78 0.16 60)" />
            </linearGradient>
          </defs>
        </svg>

        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--primary),color-mix(in_oklch,var(--primary)_55%,var(--foreground)))] text-sm font-bold text-primary-foreground shadow-lg">
          VT
        </span>
      </div>
    </div>
  );
}
