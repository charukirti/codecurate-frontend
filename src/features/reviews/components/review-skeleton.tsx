interface ReviewSkeletonProps {
  count?: number;
}

export function ReviewSkeleton({ count = 3 }: ReviewSkeletonProps) {
  return (
    <div className="flex flex-col gap-4 animate-pulse">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-neutral-900 border border-neutral-800 rounded-lg p-5 space-y-3">
          <div className="h-4 bg-neutral-800 rounded w-1/4" />
          <div className="h-4 bg-neutral-800 rounded w-full" />
          <div className="h-4 bg-neutral-800 rounded w-2/3" />
        </div>
      ))}
    </div>
  );
}
