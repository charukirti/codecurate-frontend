import { resetPassword } from '@/features/auth/api';
import type { ResetPasswordInput } from '@/features/auth/schemas/auth.schema';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export function useResetPassword() {
  return useMutation({
    mutationFn: (data: ResetPasswordInput) => resetPassword(data.newPassword, data.token),
    onSuccess: (data) => {
      toast.success(data.message || 'Password reset successful! You can now sign in with your new password.');
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage = error.response?.data?.message || 'Failed to reset password.';
      toast.error(errorMessage);
    },
  });
}
