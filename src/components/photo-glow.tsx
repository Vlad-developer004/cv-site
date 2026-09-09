export function PhotoGlow() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute -inset-2 -z-10 rounded-4xl opacity-40 blur-xl sm:-inset-3"
      style={{
        background:
          'conic-gradient(from 0deg, oklch(0.58 0.12 175), oklch(0.6 0.14 210), oklch(0.55 0.11 190), oklch(0.58 0.12 175))',
      }}
    />
  );
}
