import type { CreateReviewInput, ReviewsQueryInput } from '@/features/reviews/schemas/reviews.schema';
import type { ReviewsResponse, TagsResponse } from '@/features/reviews/types/reviews.types';
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

export async function getAllTags() {
  const response = await api.get<TagsResponse>(`/reviews/tags`);
  return response.data;
}

export async function createReview(id: string, data: CreateReviewInput) {
  const { rating, reviewText, tagIds } = data;
  const response = await api.post(`resources/${id}/reviews`, {
    rating,
    reviewText,
    tagIds,
  });

  return response.data;
}

export async function deleteReview(resourceId: string, reviewId: string) {
  const response = await api.delete(`resources/${resourceId}/reviews/${reviewId}`);
  return response.data;
}

export async function likeReview(resourceId: string, reviewId: string) {
  const response = await api.post(`resources/${resourceId}/reviews/${reviewId}/like`);
  return response.data;
}

export async function unlikeReview(resourceId: string, reviewId: string) {
  const response = await api.delete(`resources/${resourceId}/reviews/${reviewId}/unlike`);
  return response.data;
}
