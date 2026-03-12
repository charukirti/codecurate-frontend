import { useGetCurrentUser } from '@/features/auth/queries/useGetCurrentUser';

import { Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useGetReviews } from '@/features/reviews/queries/use-get-reviews';

interface ReviewsListProps {
  resourceId: string;
}

export function ReviewsList({ resourceId }: ReviewsListProps) {
  const { data: currentUser } = useGetCurrentUser();
  const { data, isLoading } = useGetReviews(resourceId, { page: 1, limit: 10, sort: 'newest' });
  const reviews = data?.data.reviews ?? [];

  if (isLoading)
    return (
      <div className="flex flex-col gap-4 animate-pulse">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-neutral-900 border border-neutral-800 rounded-lg p-5 space-y-3">
            <div className="h-4 bg-neutral-800 rounded w-1/4" />
            <div className="h-4 bg-neutral-800 rounded w-full" />
            <div className="h-4 bg-neutral-800 rounded w-2/3" />
          </div>
        ))}
      </div>
    );

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-neutral-100">
          Reviews{' '}
          <span className="text-neutral-500 font-normal text-sm">({data?.data.pagination.totalItems ?? 0})</span>
        </h2>
        {currentUser?.data && (
          <Button size="sm" className=" text-white text-xs">
            Write a Review
          </Button>
        )}
      </div>

      {reviews.length === 0 && <p className="text-neutral-500 text-sm">No reviews yet. Be the first to review!</p>}

      {reviews.map((review) => (
        <div key={review.id} className="bg-neutral-900 border border-neutral-800 rounded-lg p-5 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-neutral-200">@{review.user.username}</span>
            <span className="text-xs text-neutral-500 font-mono">
              {new Date(review.createdAt!).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </div>

          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
              <Star
                key={star}
                className={`w-3.5 h-3.5 ${star <= review.rating ? 'text-amber-400 fill-amber-400' : 'text-neutral-700 fill-neutral-700'}`}
              />
            ))}
            <span className="text-xs text-neutral-400 ml-2 font-mono">{review.rating}/10</span>
          </div>

          {review.reviewText && <p className="text-sm text-neutral-300 leading-relaxed">{review.reviewText}</p>}

          {review.tags.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {review.tags.map((tag) => (
                <Badge
                  key={tag.id}
                  variant="secondary"
                  className="text-[11px] font-mono bg-neutral-800 text-neutral-400 border border-neutral-700"
                >
                  {tag.displayName}
                </Badge>
              ))}
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
