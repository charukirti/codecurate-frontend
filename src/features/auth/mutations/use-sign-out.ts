import { signOut } from '@/features/auth/api';
import { authKeys } from '@/features/auth/queryKeys';
import { clearAccessToken } from '@/lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import type { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export function useSignOut() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => signOut(),
    onSuccess: () => {
      clearAccessToken();
      queryClient.removeQueries({ queryKey: authKeys.currentUser() });
      navigate({ to: '/auth/sign-in' });
      toast.success('Signed out successfully');
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage = error.response?.data.message || 'Failed to sign out. Please try again.';
      toast.error(errorMessage);
    },
  });
}
