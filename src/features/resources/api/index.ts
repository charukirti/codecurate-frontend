import type { GetResourcesQuery } from '@/features/resources/schemas/resources.schema';
import type { ResourcesResponse } from '@/features/resources/types/resources.types';
import { api } from '@/lib/axios';

export async function getResources(params: GetResourcesQuery) {
  const { page, limit, search, codeLang, topic, type } = params;

  const response = await api.get<ResourcesResponse>('/resources', {
    params: {
      page,
      limit,
      search,
      codeLang,
      topic,
      type,
    },
  });

  return response.data;
}
