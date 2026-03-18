import { RelatedResources } from '@/features/resources/components/related-resources';
import { ResourceHero } from '@/features/resources/components/resource-hero';
import { ResourcePageSkeleton } from '@/features/resources/components/resource-page-skeleton';
import { resourceQueryOptions } from '@/features/resources/queries/query-options';
import { ReviewsList } from '@/features/reviews/components/reviews-list';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, useParams } from '@tanstack/react-router';

export const Route = createFileRoute('/resources/$id')({
  loader: ({ context, params }) => context.queryClient.ensureQueryData(resourceQueryOptions(params.id)),
  pendingComponent: ResourcePageSkeleton,
  errorComponent: ({ error }) => <p className="text-destructive">{error.message}</p>,
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = useParams({ from: '/resources/$id' });
  const { data } = useSuspenseQuery(resourceQueryOptions(id));

  const resource = data.data;

  return (
    <main className="container mx-auto px-4 py-8">
      <ResourceHero resource={resource} />
      <section className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <ReviewsList resourceId={id} />
        </div>
        <div className="w-full lg:w-80 shrink-0">
          <h2 className="text-lg font-semibold text-neutral-100 mb-4">Related Tutorials</h2>
          <RelatedResources id={id} />
        </div>
      </section>
    </main>
  );
}
