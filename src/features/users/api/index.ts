import type { publicProfileResponse } from '@/features/users/types/users.types';
import { api } from '@/lib/axios';

export async function getPublicProfile(username: string) {
  const response = await api.get<publicProfileResponse>(`/users/${username}`);
  return response.data;
}
