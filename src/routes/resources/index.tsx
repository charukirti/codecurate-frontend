import { TutorialCard } from '@/features/home/components/tutorial-card';
import { ResourceFilters } from '@/features/resources/components/resource-filters';
import { ResourcePagination } from '@/features/resources/components/resource-pagination';
import { TutorialCardsSkeleton } from '@/features/resources/components/tutorial-cards-skeleton';
import { useGetResources } from '@/features/resources/queries/use-get-resources-queries';
import { resourcesSearchSchema } from '@/features/resources/schemas/resources.schema';
import { createFileRoute, useSearch } from '@tanstack/react-router';

export const Route = createFileRoute('/resources/')({
  validateSearch: (search) => resourcesSearchSchema.parse(search),
  component: ResourcesPage,
});

function ResourcesPage() {
  const { topic, codeLang, type, page } = useSearch({ from: '/resources/' });
  const { isLoading, data } = useGetResources({ page, limit: 6, topic, codeLang, type });
  const resources = data?.data ?? [];
  const pagination = data?.pagination;
  console.log(data);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-neutral-100 mb-6">Browse Tutorials</h1>
      <ResourceFilters />
      {isLoading ? (
        <TutorialCardsSkeleton count={6} />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {resources.map((resource) => (
              <TutorialCard key={resource.id} resource={resource} />
            ))}
          </div>
          {pagination && <ResourcePagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />}
        </>
      )}
    </main>
  );
}
