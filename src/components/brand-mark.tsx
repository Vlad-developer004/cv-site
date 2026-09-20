export function BrandMark({ className = 'h-9 w-9 rounded-xl text-sm' }: { className?: string }) {
  return (
    <span
      className={`relative flex shrink-0 items-center justify-center overflow-hidden bg-[linear-gradient(135deg,var(--primary),color-mix(in_oklch,var(--primary)_55%,var(--foreground)))] font-extrabold text-primary-foreground ${className}`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_18%,color-mix(in_oklch,white_50%,transparent),transparent_65%)]"
      />
      <span aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/15" />
      <span className="relative">VT</span>
    </span>
  );
}
