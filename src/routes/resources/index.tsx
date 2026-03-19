import { TutorialCard } from '@/features/home/components/tutorial-card';
import { ResourceFilters } from '@/features/resources/components/resource-filters';
import { ResourcePagination } from '@/features/resources/components/resource-pagination';
import { TutorialCardsSkeleton } from '@/features/resources/components/tutorial-cards-skeleton';
import { resourcesQueryOptions } from '@/features/resources/queries/query-options';
import { resourcesSearchSchema } from '@/features/resources/schemas/resources.schema';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/resources/')({
  validateSearch: (search) => resourcesSearchSchema.parse(search),
  loaderDeps: ({ search }) => ({
    page: search.page,
    limit: search.limit,
    codeLang: search.codeLang,
    topic: search.topic,
    type: search.type,
  }),
  loader: ({ context, deps }) => context.queryClient.ensureQueryData(resourcesQueryOptions(deps)),
  pendingComponent: () => (
    <main className="container mx-auto px-4 py-8">
      <TutorialCardsSkeleton count={6} />
    </main>
  ),
  errorComponent: ({ error }) => (
    <main className="container mx-auto px-4 py-8">
      <p className="text-destructive">{error.message}</p>
    </main>
  ),
  component: ResourcesPage,
});

function ResourcesPage() {
  const { topic, codeLang, type, page } = Route.useSearch();
  const { data } = useSuspenseQuery(resourcesQueryOptions({ page, limit: 10, topic, codeLang, type }));
  const resources = data.data ?? [];
  const pagination = data.pagination;

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-neutral-100 mb-6">Browse Tutorials</h1>
      <ResourceFilters />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {resources.map((resource) => (
          <TutorialCard key={resource.id} resource={resource} />
        ))}
      </div>
      {pagination && <ResourcePagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />}
    </main>
  );
}
