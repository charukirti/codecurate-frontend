export function SubmissionPageSkeleton() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-pulse">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-neutral-900 border border-neutral-800 rounded-lg h-40" />
        ))}
      </div>
    </main>
  );
}
