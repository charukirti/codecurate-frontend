import { likeReview, unlikeReview } from '@/features/reviews/api';
import type { ReviewsQueryInput } from '@/features/reviews/schemas/reviews.schema';
import type { Review, ReviewsResponse } from '@/features/reviews/types/reviews.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useToggleReviewLike(resourceId: string, params: ReviewsQueryInput) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (review: Pick<Review, 'id' | 'isLikedByCurrentUser'>) => {
      return review.isLikedByCurrentUser ? unlikeReview(resourceId, review.id) : likeReview(resourceId, review.id);
    },

    onMutate: async (review) => {
      const queryKey = ['resources', resourceId, 'reviews', params]; // 👈 include params

      await queryClient.cancelQueries({ queryKey });
      const previous = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (old: ReviewsResponse) => ({
        ...old,
        data: {
          ...old.data,
          reviews: old.data.reviews.map((r) =>
            r.id === review.id
              ? {
                  ...r,
                  isLikedByCurrentUser: !r.isLikedByCurrentUser,
                  reviewLikeCount: r.isLikedByCurrentUser ? (r.reviewLikeCount ?? 0) - 1 : (r.reviewLikeCount ?? 0) + 1,
                }
              : r,
          ),
        },
      }));

      return { previous, queryKey };
    },

    onError: (_err, _review, context) => {
      if (context) queryClient.setQueryData(context.queryKey, context.previous);
    },

    onSettled: (_data, _err, _review, context) => {
      if (context) queryClient.invalidateQueries({ queryKey: context.queryKey });
    },
  });
}
