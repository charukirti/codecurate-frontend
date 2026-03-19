import { getAllReviews, getAllTags } from '@/features/reviews/api';
import type { ReviewsQueryInput } from '@/features/reviews/schemas/reviews.schema';
import { queryOptions } from '@tanstack/react-query';

export function reviewsQueryOptions(id: string, params: ReviewsQueryInput) {
  return queryOptions({
    queryKey: ['resources', id, 'reviews', params],
    queryFn: () => getAllReviews(id, params),
    staleTime: 5 * 60 * 1000,
  });
}

export function tagsQueryOptions() {
  return queryOptions({
    queryKey: ['reviews', 'tags'],
    queryFn: () => getAllTags(),
    staleTime: 5 * 60 * 1000,
  });
}
