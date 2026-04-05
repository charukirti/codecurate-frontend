import { useGetCurrentUser } from '@/features/auth/queries/useGetCurrentUser';
import { useState } from 'react';
import type { SortType } from '@/features/reviews/schemas/reviews.schema';
import { useDeleteReview } from '@/features/reviews/mutations/use-delete-review';
import { useQuery } from '@tanstack/react-query';
import { reviewsQueryOptions } from '@/features/reviews/queries/query-options';
import { useToggleReviewLike } from '@/features/reviews/mutations/use-toggle-review-like';
import { ReviewHeader } from '@/features/reviews/components/review-header';
import { ReviewCard } from '@/features/reviews/components/review-card';
import { EmptyReviews } from '@/features/reviews/components/empty-reviews';
import { ReviewSkeleton } from '@/features/reviews/components/review-skeleton';

interface ReviewsListProps {
  resourceId: string;
}

export function ReviewsList({ resourceId }: ReviewsListProps) {
  const [open, setIsOpen] = useState(false);
  const [sort, setSort] = useState<SortType>('newest');
  const reviewParams = { page: 1, limit: 10, sort };
  const { data: currentUser } = useGetCurrentUser();
  const { data, isLoading } = useQuery(reviewsQueryOptions(resourceId, reviewParams));
  const { mutate: deleteReview, isPending } = useDeleteReview(resourceId);
  const { mutate: toggleLike, isPending: togglingLike } = useToggleReviewLike(resourceId, reviewParams);
  const reviews = data?.data.reviews ?? [];

  if (isLoading) return <ReviewSkeleton count={3} />;

  return (
    <section className="flex flex-col gap-6">
      <ReviewHeader
        resourceId={resourceId}
        open={open}
        setIsOpen={setIsOpen}
        sort={sort}
        setSort={setSort}
        totalItems={data?.data.pagination.totalItems ?? 0}
        isLoggedIn={!!currentUser?.data}
      />

      {reviews.length === 0 && <EmptyReviews />}

      {reviews.map((review) => (
        <ReviewCard
          key={review.id}
          review={review}
          currentUserId={currentUser?.data?.id}
          onDelete={deleteReview}
          onToggleLike={toggleLike}
          isDeleting={isPending}
          isTogglingLike={togglingLike}
          isLoggedIn={!!currentUser?.data}
        />
      ))}
    </section>
  );
}
