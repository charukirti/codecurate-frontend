import { Star } from 'lucide-react';

interface ReviewRatingProps {
  rating: number;
}

export function ReviewRating({ rating }: ReviewRatingProps) {
  return (
    <span className="flex items-center gap-1 text-xs font-mono bg-amber-400/10 text-amber-400 border border-amber-400/20 rounded px-2 py-0.5 w-fit">
      <Star size={11} className="fill-amber-400" />
      {rating}/10
    </span>
  );
}
