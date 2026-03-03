import { forgotPassword } from '@/features/auth/api';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export function useForgotPassword() {
  return useMutation({
    mutationFn: (email: string) => forgotPassword(email),
    onSuccess: (data) => {
      toast.success(data.message || 'Password reset email sent!');
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage = error.response?.data?.message || 'Failed to send reset email.';
      toast.error(errorMessage);
    },
  });
}
