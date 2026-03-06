import { useQuery, useQueryClient } from '@tanstack/react-query';
import { rotateToken } from '@/features/auth/api';
import { setAccessToken } from '@/lib/axios';
import { authKeys } from '@/features/auth/mutations/queryKeys';

export function useInitAuth() {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ['auth', 'init'],
    queryFn: async () => {
      const data = await rotateToken();
      setAccessToken(data.accessToken);
      await queryClient.invalidateQueries({ queryKey: authKeys.currentUser() });
      return data;
    },
    retry: false,
    staleTime: Infinity,
  });
}
