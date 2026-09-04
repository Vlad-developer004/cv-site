'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

export function LogoLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  const pathname = usePathname();

  function handleClick(e: React.MouseEvent) {
    if (pathname === href) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}
