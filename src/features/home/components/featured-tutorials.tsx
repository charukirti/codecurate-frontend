import { TutorialCard } from '@/features/home/components/tutorial-card';
import { useGetResources } from '@/features/resources/queries/use-get-resources-queries';
import { Link } from '@tanstack/react-router';

export function FeaturedTutorials() {
  const { data, isLoading } = useGetResources({ page: 1, limit: 6 });
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-lg font-semibold text-neutral-400">Featured Tutorials</h2>
          <Link
            to="/resources"
            search={{ page: 1, limit: 10 }}
            className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
          >
            View All --&gt;
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden animate-pulse"
              >
                <div className="aspect-video bg-neutral-800" />
                <div className="p-4 space-y-2">
                  <div className="h-3 bg-neutral-800 rounded w-1/3" />
                  <div className="h-4 bg-neutral-800 rounded w-full" />
                  <div className="h-4 bg-neutral-800 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data?.data?.map((resource) => (
              <TutorialCard key={resource.id} resource={resource} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
