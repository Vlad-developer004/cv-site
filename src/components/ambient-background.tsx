export function AmbientBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="ambient-blob left-[-10%] top-[-10%] h-104 w-104 opacity-[0.12]"
        style={{ background: 'oklch(0.62 0.13 175)' }}
      />
      <div
        className="ambient-blob right-[-8%] top-[20%] h-88 w-88 opacity-[0.08]"
        style={{ background: 'oklch(0.66 0.15 220)' }}
      />
    </div>
  );
}
