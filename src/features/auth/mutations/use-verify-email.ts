import { verifyEmail } from '@/features/auth/api';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export function useVerifyEmail() {
  return useMutation({
    mutationFn: (token: string) => verifyEmail(token),
    onSuccess: () => {
      toast.success('Email verified successfully! You can now sign in.');
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage =
        error.response?.data.message || 'Failed to verify email. The token may be invalid or expired.';
      toast.error(errorMessage);
    },
  });
}
