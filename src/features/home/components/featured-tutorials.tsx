import { TutorialCard } from '@/features/home/components/tutorial-card';
import { resourcesQueryOptions } from '@/features/resources/queries/query-options';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';

export function FeaturedTutorials() {
  const { data } = useSuspenseQuery(resourcesQueryOptions({ page: 1, limit: 6 }));
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data?.data?.map((resource) => (
            <TutorialCard key={resource.id} resource={resource} />
          ))}
        </div>
      </div>
    </section>
  );
}
