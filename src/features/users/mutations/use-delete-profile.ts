import { deleteProfile } from '@/features/users/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import type { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export function useDeleteProfile() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: { password: string }) => deleteProfile(data),
    onSuccess: () => {
      queryClient.clear();
      toast.success('Profile deleted successfully');
      navigate({ to: '/' });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message || 'Failed to delete profile');
    },
  });
}
