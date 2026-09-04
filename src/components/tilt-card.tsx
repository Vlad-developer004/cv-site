'use client';

import { motion, useMotionTemplate, useMotionValue, useSpring } from 'motion/react';
import { useEffect, useRef, useState, type ReactNode } from 'react';

export function TiltCard({
  children,
  className,
  disableTilt = false,
}: {
  children: ReactNode;
  className?: string;
  disableTilt?: boolean;
}) {
  const [isCoarsePointer, setIsCoarsePointer] = useState(false);
  useEffect(() => {
    setIsCoarsePointer(window.matchMedia('(pointer: coarse)').matches);
  }, []);
  const tiltDisabled = disableTilt || isCoarsePointer;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 });
  const glowTransform = useMotionTemplate`translate(${x}px, ${y}px)`;
  const rectRef = useRef<DOMRect | null>(null);
  const rafRef = useRef<number | null>(null);
  const pointerRef = useRef({ x: 0, y: 0 });

  function handleMouseEnter(e: React.MouseEvent<HTMLDivElement>) {
    rectRef.current = e.currentTarget.getBoundingClientRect();
  }

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    pointerRef.current = { x: e.clientX, y: e.clientY };
    if (rafRef.current !== null) return;

    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const rect = rectRef.current;
      if (!rect) return;
      const px = pointerRef.current.x - rect.left;
      const py = pointerRef.current.y - rect.top;
      x.set(px);
      y.set(py);
      if (tiltDisabled) return;
      rotateY.set(((px - rect.width / 2) / rect.width) * 10);
      rotateX.set(-((py - rect.height / 2) / rect.height) * 10);
    });
  }

  function handleMouseLeave() {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={tiltDisabled ? undefined : { rotateX, rotateY, transformPerspective: 800 }}
      className={`group relative overflow-hidden rounded-2xl border border-border bg-card ${className ?? ''}`}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      >
        <motion.div
          className="absolute -left-50 -top-50 h-100 w-100 rounded-full"
          style={{
            transform: glowTransform,
            background:
              'radial-gradient(circle, color-mix(in oklch, var(--primary) 18%, transparent), transparent 70%)',
          }}
        />
      </motion.div>
      {children}
    </motion.div>
  );
}
