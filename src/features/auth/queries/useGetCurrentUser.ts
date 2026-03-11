import { getUser } from '@/features/auth/api';
import { authKeys } from '@/features/auth/mutations/queryKeys';
import { queryOptions, useQuery } from '@tanstack/react-query';

export function currentUserQueryOptions() {
  return queryOptions({
    queryKey: authKeys.currentUser(),
    queryFn: () => getUser(),
    retry: false,
    staleTime: 15 * 60 * 1000,
  });
}

export function useGetCurrentUser() {
  return useQuery(currentUserQueryOptions());
}
