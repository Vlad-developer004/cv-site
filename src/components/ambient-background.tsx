export function AmbientBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, color-mix(in oklch, var(--surface) 55%, transparent), transparent 18%, transparent 82%, color-mix(in oklch, var(--surface) 45%, transparent))',
        }}
      />
      <div
        className="ambient-blob left-[-10%] top-[-8%] h-120 w-120 opacity-[0.16]"
        style={{ background: 'oklch(0.62 0.13 175)', animationDuration: '24s' }}
      />
      <div
        className="ambient-blob right-[-8%] top-[12%] h-100 w-100 opacity-[0.11]"
        style={{ background: 'oklch(0.66 0.15 220)', animationDuration: '19s', animationDelay: '-6s' }}
      />
      <div
        className="ambient-blob left-[8%] top-[45%] h-80 w-80 opacity-[0.07]"
        style={{ background: 'oklch(0.65 0.14 145)', animationDuration: '25s', animationDelay: '-3s' }}
      />
      <div
        className="ambient-blob right-[12%] top-[55%] h-72 w-72 opacity-[0.08]"
        style={{ background: 'oklch(0.6 0.14 300)', animationDuration: '23s', animationDelay: '-11s' }}
      />
      <div
        className="ambient-blob left-[-6%] bottom-[-10%] h-108 w-108 opacity-[0.1]"
        style={{ background: 'oklch(0.6 0.14 300)', animationDuration: '27s', animationDelay: '-14s' }}
      />
      <div
        className="ambient-blob right-[-10%] bottom-[8%] h-80 w-80 opacity-[0.09]"
        style={{ background: 'oklch(0.72 0.15 60)', animationDuration: '21s', animationDelay: '-9s' }}
      />
    </div>
  );
}
