export function PhotoGlow() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute -inset-2 -z-10 rounded-4xl opacity-40 blur-xl sm:-inset-3"
      style={{
        background:
          'conic-gradient(from 0deg, oklch(0.62 0.13 175), oklch(0.66 0.15 220), oklch(0.72 0.16 60), oklch(0.62 0.13 175))',
      }}
    />
  );
}
