'use client';

import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

const REFERENCE_LINE = 120;

export function SiteNav({ navItems }: { navItems: { href: string; label: string }[] }) {
  const [active, setActive] = useState(navItems[0]?.href ?? '');
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    let offsets: { id: string; top: number }[] = [];

    function measure() {
      offsets = sections.map((el) => ({ id: el.id, top: el.getBoundingClientRect().top + window.scrollY }));
    }

    function update() {
      rafRef.current = null;
      const y = window.scrollY + REFERENCE_LINE;
      let current = offsets[0];
      for (const entry of offsets) {
        if (entry.top <= y) current = entry;
      }
      if (current) setActive((prev) => (prev === `#${current.id}` ? prev : `#${current.id}`));
    }

    function onScroll() {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(update);
    }

    function onResize() {
      measure();
      onScroll();
    }

    measure();
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [navItems]);

  return (
    <nav className="hidden items-center gap-0.5 min-[880px]:flex">
      {navItems.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className={`group relative whitespace-nowrap rounded-full px-2.5 py-1.5 text-sm transition-colors ${
            active === item.href ? 'text-primary-foreground' : 'text-foreground/70 hover:text-foreground'
          }`}
        >
          {active === item.href && (
            <motion.span
              layoutId="nav-active-pill"
              className="absolute inset-0 rounded-full bg-primary"
              transition={{ type: 'spring', stiffness: 400, damping: 32 }}
            />
          )}
          <span className="relative">{item.label}</span>
          {active !== item.href && (
            <span className="absolute inset-x-2.5 -bottom-0.5 h-px origin-left scale-x-0 bg-primary transition-transform duration-300 ease-out group-hover:scale-x-100" />
          )}
        </a>
      ))}
    </nav>
  );
}
