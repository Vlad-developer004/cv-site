'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from 'motion/react';

export function TypewriterText({
  text,
  className,
  startDelay = 700,
  speed = 55,
}: {
  text: string;
  className?: string;
  startDelay?: number;
  speed?: number;
}) {
  const prefersReducedMotion = useReducedMotion();
  const [count, setCount] = useState(0);
  const done = count >= text.length;

  useEffect(() => {
    if (prefersReducedMotion) {
      setCount(text.length);
      return;
    }

    let i = 0;
    let interval: ReturnType<typeof setInterval>;
    const startTimeout = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setCount(i);
        if (i >= text.length) clearInterval(interval);
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(startTimeout);
      clearInterval(interval);
    };
  }, [text, startDelay, speed, prefersReducedMotion]);

  return (
    <span className={className}>
      <span aria-hidden>
        {text.slice(0, count)}
        <span
          className={`ml-0.5 inline-block w-0.5 translate-y-[0.1em] bg-primary align-middle ${done ? 'opacity-0' : 'animate-pulse'}`}
          style={{ height: '0.85em' }}
        />
      </span>
      <span className="sr-only">{text}</span>
    </span>
  );
}
