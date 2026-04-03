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

export async function updateProfile(data: { name?: string; username?: string }) {
  const response = await api.patch<publicProfileResponse>(`/users/me`, data);
  return response.data;
}

export async function deleteProfile(data: { password: string; confirmDeletion: boolean }) {
  const response = await api.delete(`/users/me`, { data });
  return response.data;
}
