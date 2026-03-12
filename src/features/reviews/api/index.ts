import type { ReviewsQueryInput } from '@/features/reviews/schemas/reviews.schema';
import type { ReviewsResponse } from '@/features/reviews/types/reviews.types';
import { api } from '@/lib/axios';

export async function getAllReviews(id: string, params: ReviewsQueryInput) {
  const { page, limit, sort } = params;
  const response = await api.get<ReviewsResponse>(`/resources/${id}/reviews`, {
    params: {
      page,
      limit,
      sort,
    },
  });

  return response.data;
}
