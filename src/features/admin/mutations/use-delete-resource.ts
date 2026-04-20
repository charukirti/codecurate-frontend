import { deleteResource } from '@/features/admin/api';
import { adminKeys } from '@/features/admin/queryKeys';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export function useDeleteResource() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteResource(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.resources() });
      toast.success('Resource deleted successfully');
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage = error.response?.data.message || 'Unable to delete resource';
      toast.error(errorMessage);
    },
  });
}
