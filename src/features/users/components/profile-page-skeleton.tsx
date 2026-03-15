function ProfileHero() {
  return (
    <div className="border-b border-neutral-800 py-10 animate-pulse">
      <div className="container mx-auto px-4">
        <div className="h-12 w-12 rounded-full bg-neutral-800 mb-4" />
        <div className="h-6 w-40 bg-neutral-800 rounded mb-2" />
        <div className="h-6 w-40 bg-neutral-800 rounded mb-2" />
        <div className="h-4 w-32 bg-neutral-800 rounded" />
      </div>
    </div>
  );
}

function UserReviews() {
  return (
    <div className="flex flex-col gap-6 animate-pulse">
      <div className="h-6 w-48 bg-neutral-800 rounded" />
      {[...Array(3)].map((_, i) => (
        <div key={i} className="bg-neutral-900 border border-neutral-800 rounded-lg p-5 flex flex-col gap-3">
          <div className="h-4 bg-neutral-800 rounded w-3/4" />
          <div className="h-3 bg-neutral-800 rounded w-1/3" />
          <div className="h-4 bg-neutral-800 rounded w-full" />
          <div className="flex gap-2">
            <div className="h-5 w-20 bg-neutral-800 rounded-full" />
            <div className="h-5 w-20 bg-neutral-800 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ProfilePageSkeleton() {
  return (
    <main className="container mx-auto px-4 py-8">
      <ProfileHero />
      <UserReviews />
    </main>
  );
}
