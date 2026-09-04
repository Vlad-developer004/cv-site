'use client';

import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export function SiteNav({ navItems }: { navItems: { href: string; label: string }[] }) {
  const [active, setActive] = useState(navItems[0]?.href ?? '');

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
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
