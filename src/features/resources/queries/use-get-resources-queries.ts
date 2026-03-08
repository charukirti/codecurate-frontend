import { getResources } from '@/features/resources/api';
import type { GetResourcesQuery } from '@/features/resources/schemas/resources.schema';
import { useQuery } from '@tanstack/react-query';

export function useGetResources(params: GetResourcesQuery) {
  return useQuery({
    queryKey: ['resources', params],
    queryFn: () => getResources(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
