import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

interface ReviewActionsProps {
  reviewId: string;
  likeCount: number;
  isLiked: boolean;
  onToggleLike: (payload: { id: string; isLikedByCurrentUser: boolean }) => void;
  isTogglingLike: boolean;
  isLoggedIn: boolean;
}

export function ReviewActions({
  reviewId,
  likeCount,
  isLiked,
  onToggleLike,
  isTogglingLike,
  isLoggedIn,
}: ReviewActionsProps) {
  return (
    <div className="flex items-center justify-end">
      <Button
        variant="ghost"
        size="icon-lg"
        disabled={isTogglingLike || !isLoggedIn}
        onClick={() => onToggleLike({ id: reviewId, isLikedByCurrentUser: isLiked })}
        className="flex items-center gap-1.5 text-xs font-mono text-neutral-400 hover:text-red-400 transition-colors"
      >
        <Heart size={16} className={isLiked ? 'fill-red-500 text-red-500' : ''} />
        <span>{likeCount}</span>
      </Button>
    </div>
  );
}
