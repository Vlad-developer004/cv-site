'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from 'motion/react';

const TYPE_SPEED = 95;
const DELETE_SPEED = 50;
const HOLD_DELAY = 2600;
const START_DELAY = 700;
const NEXT_WORD_DELAY = 400;

export function TypewriterText({ words, className }: { words: string[]; className?: string }) {
  const prefersReducedMotion = useReducedMotion();
  const [wordIndex, setWordIndex] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCount(words[0]?.length ?? 0);
      return;
    }

    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const runWord = (index: number, delay: number) => {
      const word = words[index];
      let i = 0;

      const typeNext = () => {
        if (cancelled) return;
        i += 1;
        setCount(i);
        if (i < word.length) {
          timeoutId = setTimeout(typeNext, TYPE_SPEED);
          return;
        }
        timeoutId = setTimeout(deleteNext, HOLD_DELAY);
      };

      const deleteNext = () => {
        if (cancelled) return;
        i -= 1;
        setCount(i);
        if (i > 0) {
          timeoutId = setTimeout(deleteNext, DELETE_SPEED);
          return;
        }
        const next = (index + 1) % words.length;
        setWordIndex(next);
        timeoutId = setTimeout(() => runWord(next, 0), NEXT_WORD_DELAY);
      };

      timeoutId = setTimeout(typeNext, delay);
    };

    runWord(0, START_DELAY);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [words, prefersReducedMotion]);

  const word = words[wordIndex] ?? '';
  const longestWord = words.reduce((longest, w) => (w.length > longest.length ? w : longest), '');

  return (
    <span className={`inline-grid ${className ?? ''}`}>
      <span aria-hidden className="invisible col-start-1 row-start-1 whitespace-nowrap">
        {longestWord}
      </span>
      <span aria-hidden className="col-start-1 row-start-1">
        {word.slice(0, count)}
        <span
          className="ml-0.5 inline-block w-0.5 translate-y-[0.1em] animate-pulse bg-primary align-middle"
          style={{ height: '0.85em' }}
        />
      </span>
      <span className="sr-only">{words.join(' / ')}</span>
    </span>
  );
}
