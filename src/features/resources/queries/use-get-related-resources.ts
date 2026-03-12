import { getRelatedResources } from '@/features/resources/api';
import { useQuery } from '@tanstack/react-query';

export function useGetRelatedResources(id: string) {
  return useQuery({
    queryKey: ['resources', id, 'related'],
    queryFn: () => getRelatedResources(id),
    staleTime: 5 * 60 * 1000,
  });
}
