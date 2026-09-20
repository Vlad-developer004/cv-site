'use client';

import { motion } from 'motion/react';
import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';

const REFERENCE_LINE = 120;

type NavItem = { href: string; label: string; icon?: ReactNode; accent?: string };

function idFromHref(href: string) {
  return href.split('#')[1] ?? '';
}

function initialActive(navItems: NavItem[]) {
  if (typeof window !== 'undefined' && window.location.hash) {
    const fromHash = idFromHref(window.location.hash);
    if (navItems.some((item) => idFromHref(item.href) === fromHash)) return fromHash;
  }
  return idFromHref(navItems[0]?.href ?? '');
}

export function SiteNav({ navItems }: { navItems: NavItem[] }) {
  const [active, setActive] = useState(() => initialActive(navItems));

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(idFromHref(item.href)))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) return;
        const closest = visible.reduce((a, b) =>
          Math.abs(a.boundingClientRect.top - REFERENCE_LINE) <= Math.abs(b.boundingClientRect.top - REFERENCE_LINE)
            ? a
            : b
        );
        const id = closest.target.id;
        setActive((prev) => {
          if (prev === id) return prev;
          window.history.replaceState(null, '', `#${id}`);
          return id;
        });
      },
      { rootMargin: `-${REFERENCE_LINE}px 0px -60% 0px`, threshold: 0 }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [navItems]);

  return (
    <nav className="hidden items-center gap-0.5 min-[880px]:flex">
      {navItems.map((item) => {
        const isActive = active === idFromHref(item.href);
        return (
          <a
            key={item.href}
            href={item.href}
            style={{ '--nav-item-accent': item.accent } as CSSProperties}
            className={`nav-link group relative inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-sm transition-colors ${
              isActive ? 'is-active text-primary-foreground' : 'text-foreground/70 hover:text-foreground'
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="nav-active-pill"
                className="absolute inset-0 rounded-full bg-primary"
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              />
            )}
            <span className="hidden min-[1200px]:inline-flex">{item.icon}</span>
            <span className="relative">{item.label}</span>
            {!isActive && (
              <span
                className="absolute inset-x-3 -bottom-0.5 h-px origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"
                style={{ background: item.accent ?? 'var(--primary)' }}
              />
            )}
          </a>
        );
      })}
    </nav>
  );
}
