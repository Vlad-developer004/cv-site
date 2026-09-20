'use client';

import { useEffect, useRef, useState } from 'react';

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
const DURATION = 1500;

function easeOutQuad(t: number) {
  return 1 - (1 - t) * (1 - t);
}

export function CountUp({
  to,
  decimals = 0,
  prefix = '',
  suffix = '',
  decimalSeparator = '.',
  className,
}: {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  decimalSeparator?: string;
  className?: string;
}) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const runId = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(REDUCED_MOTION_QUERY).matches;
    if (prefersReducedMotion) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setValue(to);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;

        const thisRun = ++runId.current;
        setValue(0);
        const start = performance.now();
        function tick(now: number) {
          if (runId.current !== thisRun) return;
          const progress = Math.min((now - start) / DURATION, 1);
          setValue(easeOutQuad(progress) * to);
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [to]);

  const formatted = value.toFixed(decimals).replace('.', decimalSeparator);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
