import { updateProfile } from '@/features/users/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { name?: string; username?: string }) => updateProfile(data),
    onSuccess: (data, variables) => {
      if (variables.username) {
        queryClient.invalidateQueries({
          queryKey: ['users', variables.username],
        });
      }
      queryClient.invalidateQueries({
        queryKey: ['users', data.data.username],
      });

      toast.success('Your profile has been updated!');
    },

    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage = error.response?.data.message || 'Failed to update your profile. Please try again.';
      toast.error(errorMessage);
    },
  });
}
