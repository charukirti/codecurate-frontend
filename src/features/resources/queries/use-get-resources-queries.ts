import { getResources } from '@/features/resources/api';
import type { ResourcesSearch } from '@/features/resources/schemas/resources.schema';
import { useQuery } from '@tanstack/react-query';

export function useGetResources(params: ResourcesSearch) {
  return useQuery({
    queryKey: ['resources', params],
    queryFn: () => getResources(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
