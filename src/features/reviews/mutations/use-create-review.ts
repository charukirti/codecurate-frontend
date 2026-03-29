import { createReview } from '@/features/reviews/api';
import type { CreateReviewInput } from '@/features/reviews/schemas/reviews.schema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export function useCreateReview(resourceId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateReviewInput) => createReview(resourceId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resources', resourceId, 'reviews'] });
      queryClient.invalidateQueries({ queryKey: ['resource', resourceId] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage = error.response?.data.message || 'Failed to submit your review. Please try again.';
      toast.error(errorMessage);
    },
  });
}
