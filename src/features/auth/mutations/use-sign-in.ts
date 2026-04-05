import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { SignInInput } from '@/features/auth/schemas/auth.schema';
import { signIn } from '@/features/auth/api';
import { clearAccessToken, setAccessToken } from '@/lib/axios';
import type { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { authKeys } from '@/features/auth/queryKeys';

export function useSignInMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SignInInput) => signIn(data),
    onSuccess: (data) => {
      setAccessToken(data.accessToken);
      queryClient.setQueryData(authKeys.currentUser(), {
        message: data.message,
        data: data.data,
      });
      const successMessage = data.message || 'Sign in successful!';
      toast.success(successMessage);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      clearAccessToken();
      const errorMessage = error.response?.data.message || 'Sign in failed. Please try again.';
      toast.error(errorMessage);
    },
  });
}
