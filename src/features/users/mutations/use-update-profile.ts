import { updateProfile } from '@/features/users/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

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
    },
  });
}
