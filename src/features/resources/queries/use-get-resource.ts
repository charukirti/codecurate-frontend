import { getResource } from '@/features/resources/api';
import { useQuery } from '@tanstack/react-query';

export function useGetResource(id: string) {
  return useQuery({
    queryKey: ['resource', id],
    queryFn: () => getResource(id),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
