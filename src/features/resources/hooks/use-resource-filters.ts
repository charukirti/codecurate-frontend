import { useSearch } from '@tanstack/react-router';

export function useResourceFilters() {
  const { type, codeLang, search } = useSearch({ from: '/resources/' });
  const hasActiveFilters = !!(search || codeLang || type);
  return { type, codeLang, search, hasActiveFilters };
}
