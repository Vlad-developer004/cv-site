'use client';

import { useEffect, useState } from 'react';

const TIME_ZONE = 'Europe/Berlin';

function formatTime() {
  return new Intl.DateTimeFormat('de-DE', {
    timeZone: TIME_ZONE,
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date());
}

export function LocalClock({ className }: { className?: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTime(formatTime());
    const interval = setInterval(() => setTime(formatTime()), 30000);
    return () => clearInterval(interval);
  }, []);

  if (!time) return null;

  return <span className={className}>{time}</span>;
}
