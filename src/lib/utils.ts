import type { Thumbnails } from '@/features/resources/types/resources.types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Status } from '@/features/submissions/types/submissions.types';

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

export const statusConfig: Record<Status, { text: string; color: string }> = {
  pending: { text: 'Pending', color: '#F8DE22' },
  accepted: { text: 'Accepted', color: '#6FCF97' },
  rejected: { text: 'Rejected', color: '#DB1A1A' },
};

export function truncateUrl(url: string, maxLength: number = 30): string {
  try {
    const urlObj = new URL(url);
    const display = urlObj.hostname + urlObj.pathname;
    return display.length > maxLength ? display.slice(0, maxLength) + '...' : display;
  } catch {
    return url.length > maxLength ? url.slice(0, maxLength) + '...' : url;
  }
}
