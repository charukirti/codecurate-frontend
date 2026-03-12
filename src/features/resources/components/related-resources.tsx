import { TutorialCard } from '@/features/home/components/tutorial-card';
import { TutorialCardsSkeleton } from '@/features/resources/components/tutorial-cards-skeleton';
import { useGetRelatedResources } from '@/features/resources/queries/use-get-related-resources';

interface RelatedResourceParams {
  id: string;
}
export function RelatedResources({ id }: RelatedResourceParams) {
  const { data, isLoading } = useGetRelatedResources(id);
  if (isLoading) {
    return <TutorialCardsSkeleton count={4} />;
  }

  const resources = data?.data;

  if (!resources) {
    return <p className="text-destructive">There are no resources</p>;
  }
  return (
    <div className="flex flex-col gap-4">
      {resources.map((resource) => (
        <TutorialCard key={resource.id} resource={resource} />
      ))}
    </div>
  );
}
