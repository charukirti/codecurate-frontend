import { ResourceHero } from '@/features/resources/components/resource-hero';
import { ResourcePageSkeleton } from '@/features/resources/components/resource-page-skeleton';
import { useGetResource } from '@/features/resources/queries/use-get-resource';
import { createFileRoute, useParams } from '@tanstack/react-router';

export const Route = createFileRoute('/resources/$id')({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = useParams({ from: '/resources/$id' });
  const { data, isLoading } = useGetResource(id);

  const resource = data?.data;

  if (isLoading) {
    return <ResourcePageSkeleton />;
  }
  if (!resource) {
    return <p className="text-destructive">Resource does not exist</p>;
  }
  return (
    <main className="container mx-auto px-4 py-8">
      resources
      <ResourceHero resource={resource} />
    </main>
  );
}
