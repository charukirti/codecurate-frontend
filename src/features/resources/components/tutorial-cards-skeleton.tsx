interface TutorialCardsSkeletonProps {
  count?: number;
}

export function TutorialCardsSkeleton({ count = 6 }: TutorialCardsSkeletonProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden animate-pulse">
          <div className="aspect-video bg-neutral-800" />
          <div className="p-4 space-y-2">
            <div className="h-3 bg-neutral-800 rounded w-1/3" />
            <div className="h-4 bg-neutral-800 rounded w-full" />
            <div className="h-4 bg-neutral-800 rounded w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );
}
