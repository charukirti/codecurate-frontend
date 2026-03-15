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

export function ProfilePageSkeleton() {
  return (
    <main className="container mx-auto px-4 py-8">
      <ProfileHero />
    </main>
  );
}
