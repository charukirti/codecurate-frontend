import { getRelatedResources, getResource, getResources } from '@/features/resources/api';
import type { ResourcesSearch } from '@/features/resources/schemas/resources.schema';
import { queryOptions } from '@tanstack/react-query';

export function resourceQueryOptions(id: string) {
  return queryOptions({
    queryKey: ['resource', id],
    queryFn: () => getResource(id),
    staleTime: 5 * 60 * 1000,
  });
}

export function resourcesQueryOptions(params: ResourcesSearch) {
  return queryOptions({
    queryKey: ['resources', params],
    queryFn: () => getResources(params),
    staleTime: 5 * 60 * 1000,
  });
}

export function relatedResourcesQueryOptions(id: string) {
  return queryOptions({
    queryKey: ['resources', id, 'related'],
    queryFn: () => getRelatedResources(id),
    staleTime: 5 * 60 * 1000,
  });
}
