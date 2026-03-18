import { getPublicProfile, getUserReviews } from '@/features/users/api';
import { queryOptions } from '@tanstack/react-query';

export function getPublicProfileQueryOptions(username: string) {
  return queryOptions({
    queryKey: ['users', username],
    queryFn: () => getPublicProfile(username),
    staleTime: 5 * 60 * 1000,
  });
}

export function getUserReviewsQueryOptions(username: string) {
  return queryOptions({
    queryKey: ['users', username, 'reviews'],
    queryFn: () => getUserReviews(username),
    staleTime: 5 * 60 * 1000,
  });
}
