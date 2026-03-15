import { getUserReviews } from '@/features/users/api';
import { useQuery } from '@tanstack/react-query';

export function useGetUserReviews(username: string) {
  return useQuery({
    queryKey: ['users', username, 'reviews'],
    queryFn: () => getUserReviews(username),
    staleTime: 5 * 60 * 1000,
  });
}
