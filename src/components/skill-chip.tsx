'use client';

import type { ReactNode } from 'react';
import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export function SkillChip({
  icon,
  label,
  usedIn,
  usedInLabel,
}: {
  icon: ReactNode;
  label: string;
  usedIn: string[];
  usedInLabel: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);

  function show() {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) setPos({ top: rect.bottom + 8, left: rect.left + rect.width / 2 });
  }

  return (
    <div
      ref={ref}
      onMouseEnter={show}
      onMouseLeave={() => setPos(null)}
      className="flex items-center gap-1.5 rounded-lg border border-border/70 bg-background/40 px-2.5 py-1.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-[0_4px_16px_-4px_color-mix(in_oklch,var(--primary)_40%,transparent)]"
    >
      {icon}
      <span className="text-xs font-medium text-foreground/90">{label}</span>

      {pos &&
        usedIn.length > 0 &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            className="glass pointer-events-none fixed z-50 w-max max-w-55 -translate-x-1/2 rounded-lg px-3 py-2 text-xs shadow-lg"
            style={{ top: pos.top, left: pos.left }}
          >
            <span className="block text-[10px] font-medium uppercase tracking-wider text-primary">
              {usedInLabel}
            </span>
            <span className="text-foreground/90">{usedIn.join(', ')}</span>
          </div>,
          document.body,
        )}
    </div>
  );
}
