import { addResource } from '@/features/admin/api';
import { adminKeys } from '@/features/admin/queryKeys';
import type { AddResourceInput } from '@/features/admin/schemas/admin.schema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export function useAddResource() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: AddResourceInput) => addResource(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.resources() });
      toast.success('Resource added successfully');
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage = error.response?.data.message || 'Unable to add new resource';
      toast.error(errorMessage);
    },
  });
}
