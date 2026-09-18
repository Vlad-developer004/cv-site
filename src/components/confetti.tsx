'use client';

import { useEffect, useRef } from 'react';

const COLORS = ['var(--primary)', '#F59E0B', '#EC4899', '#38BDF8', '#22C55E'];
const PARTICLE_COUNT = 40;

export function Confetti() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const particles: HTMLSpanElement[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const el = document.createElement('span');
      const x = (Math.random() - 0.5) * 260;
      const y = -(120 + Math.random() * 140);
      const rotate = Math.random() * 520 - 260;
      const delay = Math.random() * 80;
      const size = 5 + Math.random() * 4;
      el.style.cssText = `
        position: absolute; left: 50%; top: 0;
        width: ${size}px; height: ${size * 0.4}px;
        background: ${COLORS[i % COLORS.length]};
        border-radius: 1px;
        opacity: 0;
        transform: translate(-50%, 0);
        animation: confetti-burst 900ms ease-out ${delay}ms forwards;
        --confetti-x: ${x}px;
        --confetti-y: ${y}px;
        --confetti-rotate: ${rotate}deg;
      `;
      container.appendChild(el);
      particles.push(el);
    }

    const timeout = setTimeout(() => {
      particles.forEach((el) => el.remove());
    }, 1200);

    return () => {
      clearTimeout(timeout);
      particles.forEach((el) => el.remove());
    };
  }, []);

  return <div ref={ref} aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-0 overflow-visible" />;
}
