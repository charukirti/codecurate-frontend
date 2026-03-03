import { signUp } from '@/features/auth/api';
import type { SignUpInput } from '@/features/auth/schemas/auth.schema';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export function useSignup() {
  return useMutation({
    mutationFn: (data: SignUpInput) => signUp(data),
    onSuccess: (data) => {
      const successMessage = data.message || 'Signup successful! Please check your email to verify your account.';
      toast.success(successMessage);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage = error.response?.data.message || 'Signup failed. Please try again.';
      toast.error(errorMessage);
    },
  });
}
