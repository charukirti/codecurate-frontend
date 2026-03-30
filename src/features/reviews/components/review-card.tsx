import { ReviewCardHeader } from './review-card-header';
import { ReviewRating } from './review-rating';
import { ReviewActions } from './review-actions';
import { Badge } from '@/components/ui/badge';
import type { Review } from '@/features/reviews/types/reviews.types';

interface ReviewCardProps {
  review: Review;
  currentUserId?: string;
  onDelete: (reviewId: string) => void;
  onToggleLike: (payload: { id: string; isLikedByCurrentUser: boolean }) => void;
  isDeleting: boolean;
  isTogglingLike: boolean;
  isLoggedIn: boolean;
}

export function ReviewCard({
  review,
  currentUserId,
  onDelete,
  onToggleLike,
  isDeleting,
  isTogglingLike,
  isLoggedIn,
}: ReviewCardProps) {
  const isOwner = currentUserId === review.userId;

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-5 flex flex-col gap-3">
      <ReviewCardHeader
        username={review.user.username}
        createdAt={review.createdAt!}
        isOwner={isOwner}
        onDelete={() => onDelete(review.id)}
        isDeleting={isDeleting}
      />

      <ReviewRating rating={review.rating} />

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

      <ReviewActions
        reviewId={review.id}
        likeCount={review.reviewLikeCount ?? 0}
        isLiked={review.isLikedByCurrentUser}
        onToggleLike={onToggleLike}
        isTogglingLike={isTogglingLike}
        isLoggedIn={isLoggedIn}
      />
    </div>
  );
}
