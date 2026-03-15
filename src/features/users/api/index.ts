import type { publicProfileResponse, UserReviewsResponse } from '@/features/users/types/users.types';
import { api } from '@/lib/axios';

export async function getPublicProfile(username: string) {
  const response = await api.get<publicProfileResponse>(`/users/${username}`);
  return response.data;
}

export async function getUserReviews(username: string) {
  const response = await api.get<UserReviewsResponse>(`/users/${username}/reviews`);
  return response.data;
}
