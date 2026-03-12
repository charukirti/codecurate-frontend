import { getAllReviews } from '@/features/reviews/api';
import type { ReviewsQueryInput } from '@/features/reviews/schemas/reviews.schema';
import { useQuery } from '@tanstack/react-query';

export function useGetReviews(id: string, params: ReviewsQueryInput) {
  return useQuery({
    queryKey: ['resources', id, 'reviews', params],
    queryFn: () => getAllReviews(id, params),
    staleTime: 5 * 60 * 1000,
  });
}
