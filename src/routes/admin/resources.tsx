import { ResourcesTable } from '@/features/admin/components/resources-table';
import { resourcesQueryOptions } from '@/features/resources/queries/query-options';
import { resourcesSearchSchema } from '@/features/resources/schemas/resources.schema';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/resources')({
  validateSearch: (search) => resourcesSearchSchema.parse(search),
  loaderDeps: ({ search }) => ({
    page: search.page,
    limit: search.limit,
    codeLang: search.codeLang,
    topic: search.topic,
    type: search.type,
    search: search.search,
  }),
  loader: ({ context, deps }) => context.queryClient.ensureQueryData(resourcesQueryOptions(deps)),
  component: RouteComponent,
});

function RouteComponent() {
  const search = Route.useSearch();
  const { data } = useSuspenseQuery(resourcesQueryOptions(search));
  const resources = data.data;

  return (
    <div className="p-6">
      <div>
        <h1 className="text-2xl font-bold ">Resources</h1>
        <p className="mb-6 text-neutral-400">{resources.length} total videos/playlists in library</p>
      </div>

      <ResourcesTable resources={resources} />
    </div>
  );
}
