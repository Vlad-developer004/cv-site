'use client';

import type { CSSProperties, ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export function SkillChip({
  icon,
  label,
  usedIn,
  usedInLabel,
  totalProjects,
  badge,
  accent,
}: {
  icon: ReactNode;
  label: string;
  usedIn: string[];
  usedInLabel: string;
  totalProjects: number;
  badge?: string;
  accent?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);

  function show() {
    if (usedIn.length === 0) return;
    const rect = ref.current?.getBoundingClientRect();
    if (rect) setPos({ top: rect.bottom + 8, left: rect.left + rect.width / 2 });
  }

  useEffect(() => {
    if (!pos) return;
    function onDocClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setPos(null);
    }
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, [pos]);

  return (
    <div
      ref={ref}
      onMouseEnter={show}
      onMouseLeave={() => setPos(null)}
      onClick={(e) => {
        e.stopPropagation();
        if (pos) setPos(null);
        else show();
      }}
      role={usedIn.length > 0 ? 'button' : undefined}
      tabIndex={usedIn.length > 0 ? 0 : undefined}
      style={accent ? ({ '--chip-accent': accent } as CSSProperties) : undefined}
      className={`group/chip relative flex items-center gap-1.5 rounded-lg border border-border/70 bg-background/40 px-2.5 py-1.5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_16px_-4px_var(--chip-accent,color-mix(in_oklch,var(--primary)_40%,transparent))] ${accent ? 'hover:border-(--chip-accent)' : 'hover:border-primary/50'} ${usedIn.length > 0 ? 'cursor-pointer' : ''}`}
    >
      {icon}
      <span className="text-[13px] font-medium text-foreground/90">{label}</span>
      {badge && (
        <span className="flex shrink-0 items-center gap-1 rounded-full bg-(--chip-accent,var(--primary)) px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white">
          <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-white/90" />
          {badge}
        </span>
      )}
      {usedIn.length > 0 && (
        <span className="rounded-full bg-primary/15 px-1.5 py-0.5 text-[10px] font-semibold leading-none text-primary">
          {usedIn.length}/{totalProjects}
        </span>
      )}

      {pos &&
        usedIn.length > 0 &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            className="glass pointer-events-none fixed z-50 w-max max-w-55 -translate-x-1/2 rounded-lg px-3 py-2 text-xs shadow-lg"
            style={{ top: pos.top, left: pos.left }}
          >
            <span className="block text-[10px] font-medium uppercase tracking-wider text-primary">
              {usedInLabel} ({usedIn.length}/{totalProjects})
            </span>
            <span className="text-foreground/90">{usedIn.join(', ')}</span>
          </div>,
          document.body,
        )}
    </div>
  );
}
