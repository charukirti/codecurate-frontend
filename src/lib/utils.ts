import type { Thumbnails } from '@/features/resources/types/resources.types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getThumbnailUrl(thumbnails: Thumbnails): string {
  const t = thumbnails as Record<string, { url: string }>;
  return t?.maxres?.url || t?.high?.url || t?.medium?.url || t?.default?.url || '';
}

export function formatDuration(seconds: number | null): string {
  if (!seconds) return '';
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}
