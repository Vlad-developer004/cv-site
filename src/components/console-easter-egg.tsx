'use client';

import { useEffect } from 'react';

const ART = `
 ██╗   ██╗████████╗
 ██║   ██║╚══██╔══╝
 ╚██╗ ██╔╝   ██║
  ╚████╔╝    ██║
   ╚═══╝     ╚═╝
`;

let logged = false;

export function ConsoleEasterEgg() {
  useEffect(() => {
    if (logged) return;
    logged = true;

    console.log(`%c${ART}`, 'color: #2dd4bf; font-weight: bold;');
    console.log(
      '%cVladyslav Tieriekhov — Full-Stack Developer',
      'color: #2dd4bf; font-weight: bold; font-size: 14px;',
    );
    console.log(
      '%cLooking at the console instead of the DOM? I like that already.',
      'color: #e5e7eb; font-size: 13px;',
    );
    console.table({
      Email: { link: 'mailto:terehovvlad29@gmail.com' },
      GitHub: { link: 'https://github.com/Vlad-developer004' },
      LinkedIn: { link: 'https://www.linkedin.com/in/vladyslav-tieriekhov' },
    });

    console.log('%cType contact() to reach out.', 'color: #6b7280; font-size: 12px; font-style: italic;');
    (window as unknown as { contact: () => void }).contact = () => {
      console.log('%cOpening your email client…', 'color: #2dd4bf;');
      window.location.href = 'mailto:terehovvlad29@gmail.com?subject=Hi%20from%20your%20console';
    };
  }, []);

  return null;
}
