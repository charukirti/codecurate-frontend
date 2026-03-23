import { deleteReview } from '@/features/reviews/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export function useDeleteReview(resourceId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteReview(resourceId, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resources', resourceId, 'reviews'] });
      queryClient.invalidateQueries({ queryKey: ['resources', resourceId] });
      toast.success('Review deleted!');
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage = error.response?.data.message || 'Failed to delete review. Please try again.';
      toast.error(errorMessage);
    },
  });
}
