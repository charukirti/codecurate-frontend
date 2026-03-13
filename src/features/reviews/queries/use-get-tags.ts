import { getAllTags } from '@/features/reviews/api';
import { useQuery } from '@tanstack/react-query';

export function useGetTags() {
  return useQuery({
    queryKey: ['reviews', 'tags'],
    queryFn: () => getAllTags(),
    staleTime: 5 * 60 * 1000,
  });
}
