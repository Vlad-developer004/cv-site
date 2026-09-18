'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const SEQUENCE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

const COLORS = ['var(--primary)', '#F59E0B', '#EC4899', '#38BDF8', '#22C55E'];
const PARTICLE_COUNT = 120;

export function KonamiCode() {
  const { t } = useTranslation('common');
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    let progress = 0;

    function onKeyDown(e: KeyboardEvent) {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      progress = key === SEQUENCE[progress] ? progress + 1 : key === SEQUENCE[0] ? 1 : 0;
      if (progress === SEQUENCE.length) {
        progress = 0;
        setTriggered(true);
        setTimeout(() => setTriggered(false), 3000);
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    if (!triggered || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const container = document.getElementById('konami-confetti');
    if (!container) return;

    const particles: HTMLSpanElement[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const el = document.createElement('span');
      const left = Math.random() * 100;
      const fall = 300 + Math.random() * 260;
      const drift = (Math.random() - 0.5) * 160;
      const rotate = Math.random() * 720 - 360;
      const delay = Math.random() * 400;
      const size = 6 + Math.random() * 5;
      el.style.cssText = `
        position: absolute; left: ${left}%; top: -20px;
        width: ${size}px; height: ${size * 0.4}px;
        background: ${COLORS[i % COLORS.length]};
        border-radius: 1px;
        opacity: 0;
        animation: konami-fall 1800ms ease-in ${delay}ms forwards;
        --konami-x: ${drift}px;
        --konami-y: ${fall}px;
        --konami-rotate: ${rotate}deg;
      `;
      container.appendChild(el);
      particles.push(el);
    }

    const timeout = setTimeout(() => particles.forEach((el) => el.remove()), 2400);
    return () => {
      clearTimeout(timeout);
      particles.forEach((el) => el.remove());
    };
  }, [triggered]);

  if (!triggered) return null;

  return (
    <>
      <div id="konami-confetti" aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-100 h-0 overflow-visible" />
      <div className="glass pointer-events-none fixed top-6 left-1/2 z-100 -translate-x-1/2 rounded-full px-4 py-2 text-sm font-medium text-primary">
        {t('konamiMessage', { ns: 'common' })}
      </div>
    </>
  );
}
