import type { Review } from '@/features/users/types/users.types';
import { Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Link } from '@tanstack/react-router';

interface UserReviewsProps {
  reviews: Review[];
  totalItems: number;
  username: string;
}

export function UserReviews({ reviews, totalItems, username }: UserReviewsProps) {
  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-lg font-semibold text-neutral-100">
        Reviews by @{username} <span className="text-neutral-500 font-normal text-sm">({totalItems})</span>
      </h2>

      {reviews.length === 0 && <p className="text-neutral-500 text-sm">No reviews yet.</p>}

      {reviews.map((review) => (
        <div key={review.id} className="bg-neutral-900 border border-neutral-800 rounded-lg p-5 flex flex-col gap-3">
          <Link
            to="/resources/$id"
            params={{ id: review.resource.id }}
            className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors line-clamp-1"
          >
            {review.resource.title}
          </Link>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                <Star
                  key={star}
                  className={`w-3 h-3 ${star <= review.rating ? 'text-amber-400 fill-amber-400' : 'text-neutral-700 fill-neutral-700'}`}
                />
              ))}
              <span className="text-xs text-neutral-400 ml-1 font-mono">{review.rating}/10</span>
            </div>
            <span className="text-xs text-neutral-500 font-mono">
              {new Date(review.createdAt!).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </div>

          {review.reviewText && <p className="text-sm text-neutral-300 leading-relaxed">{review.reviewText}</p>}

          {review.reviewTags.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {review.reviewTags.map(({ tag }) => (
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
