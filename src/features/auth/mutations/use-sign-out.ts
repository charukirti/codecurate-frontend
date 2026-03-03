import { signOut } from '@/features/auth/api';
import { authKeys } from '@/features/auth/mutations/queryKeys';
import { clearAccessToken } from '@/lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function useSignOut() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => signOut(),
    onSuccess: () => {
      clearAccessToken();
      queryClient.invalidateQueries({ queryKey: authKeys.currentUser() });
      toast.success('Signed out successfully');
    },
    onError: (error) => {
      console.error('Error signing out:', error);
      toast.error('Failed to sign out. Please try again.');
    },
  });
}
