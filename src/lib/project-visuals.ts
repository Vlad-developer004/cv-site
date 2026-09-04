import type { ComponentType } from 'react';
import { Bot, Bus, CheckCircle2, Clock3, FileText, Sparkles, TrendingUp } from 'lucide-react';

type IconComp = ComponentType<{ className?: string }>;

export const PROJECT_IDS = ['bus-tickets', 'shop', 'rechtsform', 'jarvis', 'paper-trader'] as const;

export const ICONS: Record<string, IconComp> = {
  'bus-tickets': Bus,
  shop: Sparkles,
  rechtsform: FileText,
  jarvis: Bot,
  'paper-trader': TrendingUp,
};

export const TONES: Record<string, { badge: string; icon: string; StatusIcon: IconComp }> = {
  'bus-tickets': {
    badge: 'bg-primary/10 text-primary',
    icon: 'bg-primary/10 text-primary',
    StatusIcon: Sparkles,
  },
  shop: {
    badge: 'bg-primary/10 text-primary',
    icon: 'bg-primary/10 text-primary',
    StatusIcon: Sparkles,
  },
  rechtsform: {
    badge: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    icon: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    StatusIcon: CheckCircle2,
  },
  jarvis: {
    badge: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    icon: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    StatusIcon: Clock3,
  },
  'paper-trader': {
    badge: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    icon: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    StatusIcon: CheckCircle2,
  },
};

export const SCREENSHOTS: Record<string, { src: string; chrome: 'browser' | 'native' }> = {
  'bus-tickets': { src: '/projects/bus-tickets.png', chrome: 'browser' },
  shop: { src: '/projects/shop.png', chrome: 'browser' },
  rechtsform: { src: '/projects/rechtsform.png', chrome: 'browser' },
  'paper-trader': { src: '/projects/paper-trader.png', chrome: 'browser' },
  jarvis: { src: '/projects/jarvis.png', chrome: 'native' },
};

const TAG_PALETTE = [
  'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  'bg-violet-500/10 text-violet-600 dark:text-violet-400',
  'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  'bg-rose-500/10 text-rose-600 dark:text-rose-400',
  'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400',
  'bg-orange-500/10 text-orange-600 dark:text-orange-400',
  'bg-teal-500/10 text-teal-600 dark:text-teal-400',
];

export function tagTone(tech: string) {
  let hash = 0;
  for (let i = 0; i < tech.length; i++) hash = (hash * 31 + tech.charCodeAt(i)) >>> 0;
  return TAG_PALETTE[hash % TAG_PALETTE.length];
}
