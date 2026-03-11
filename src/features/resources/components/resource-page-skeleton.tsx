function HeroSkeleton() {
  return (
    <section className="container mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row gap-8 animate-pulse">
        <div className="w-full md:w-2/5 aspect-video bg-neutral-800 rounded-xl" />
        <div className="flex flex-col gap-4 justify-center flex-1">
          <div className="h-4 bg-neutral-800 rounded w-1/4" />
          <div className="h-8 bg-neutral-800 rounded w-3/4" />
          <div className="h-4 bg-neutral-800 rounded w-1/3" />
          <div className="h-4 bg-neutral-800 rounded w-1/4" />
          <div className="h-10 bg-neutral-800 rounded w-36" />
        </div>
      </div>
    </section>
  );
}

export function ResourcePageSkeleton() {
  return (
    <main className="container mx-auto px-4 py-8">
      <HeroSkeleton />
    </main>
  );
}
