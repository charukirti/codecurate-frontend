import { verifyEmail } from '@/features/auth/api';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function useVerifyEmail() {
  return useMutation({
    mutationFn: (token: string) => verifyEmail(token),
    onSuccess: () => {
      toast.success('Email verified successfully! You can now sign in.');
    },
    onError: (error) => {
      console.error('Error verifying email:', error);
      toast.error('Failed to verify email. The token may be invalid or expired.');
    },
  });
}
