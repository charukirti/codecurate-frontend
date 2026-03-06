import { getUser } from '@/features/auth/api';
import { authKeys } from '@/features/auth/mutations/queryKeys';

import { useQuery } from '@tanstack/react-query';

export function useGetCurrentUser() {
  return useQuery({
    queryKey: authKeys.currentUser(),
    queryFn: () => getUser(),
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
