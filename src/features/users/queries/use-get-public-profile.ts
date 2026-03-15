import { getPublicProfile } from '@/features/users/api';
import { useQuery } from '@tanstack/react-query';

export function useGetPublicProfile(username: string) {
  return useQuery({
    queryKey: ['users', username],
    queryFn: () => getPublicProfile(username),
    staleTime: 5 * 60 * 1000,
  });
}
