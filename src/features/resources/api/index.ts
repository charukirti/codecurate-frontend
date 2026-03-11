import type { ResourcesSearch } from '@/features/resources/schemas/resources.schema';
import type { ResourceResponse, ResourcesResponse } from '@/features/resources/types/resources.types';
import { api } from '@/lib/axios';

export async function getResources(params: ResourcesSearch) {
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

export async function getResource(id: string) {
  const response = await api.get<ResourceResponse>(`/resources/${id}`);
  return response.data;
}
