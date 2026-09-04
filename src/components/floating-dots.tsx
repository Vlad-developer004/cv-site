'use client';

import { useReducedMotion } from 'motion/react';
import { useEffect, useState } from 'react';

type Dot = { id: number; left: number; top: number; size: number; duration: number; delay: number };

function generateDots(count: number): Dot[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: 3 + Math.random() * 3,
    duration: 10 + Math.random() * 12,
    delay: Math.random() * 4,
  }));
}

export function FloatingDots({ count = 10 }: { count?: number }) {
  const prefersReducedMotion = useReducedMotion();
  const [dots, setDots] = useState<Dot[]>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDots(generateDots(count));
  }, [count]);

  if (prefersReducedMotion || dots.length === 0) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((dot) => (
        <span
          key={dot.id}
          className="absolute rounded-full bg-primary/50"
          style={{
            left: `${dot.left}%`,
            top: `${dot.top}%`,
            width: dot.size,
            height: dot.size,
            animation: `dot-float ${dot.duration}s ease-in-out ${dot.delay}s infinite`,
            willChange: 'transform',
          }}
        />
      ))}
    </div>
  );
}
