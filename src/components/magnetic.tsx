'use client';

import { motion, useMotionValue, useSpring } from 'motion/react';
import { useSyncExternalStore, type ReactNode } from 'react';

const DISABLE_QUERY = '(pointer: coarse), (prefers-reduced-motion: reduce)';
const STRENGTH = 0.35;
const MAX_OFFSET = 10;

function subscribeToDisable(callback: () => void) {
  const mql = window.matchMedia(DISABLE_QUERY);
  mql.addEventListener('change', callback);
  return () => mql.removeEventListener('change', callback);
}

function getDisableSnapshot() {
  return window.matchMedia(DISABLE_QUERY).matches;
}

function getDisableServerSnapshot() {
  return false;
}

export function Magnetic({ children, className }: { children: ReactNode; className?: string }) {
  const disabled = useSyncExternalStore(subscribeToDisable, getDisableSnapshot, getDisableServerSnapshot);

  const x = useSpring(useMotionValue(0), { stiffness: 300, damping: 20, mass: 0.5 });
  const y = useSpring(useMotionValue(0), { stiffness: 300, damping: 20, mass: 0.5 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (disabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - rect.left - rect.width / 2;
    const py = e.clientY - rect.top - rect.height / 2;
    x.set(Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, px * STRENGTH)));
    y.set(Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, py * STRENGTH)));
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={disabled ? undefined : { x, y }}
      className={`inline-block w-fit ${className ?? ''}`}
    >
      {children}
    </motion.div>
  );
}
