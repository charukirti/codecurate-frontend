import { SubmissionsTable } from '@/features/admin/components/submissions-table';
import { adminSubmissionsQueryOptions } from '@/features/admin/queries/query-options';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/submissions')({
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(adminSubmissionsQueryOptions());
  },
  component: AdminSubmissionsPage,
});

function AdminSubmissionsPage() {
  const { data } = useSuspenseQuery(adminSubmissionsQueryOptions());

  console.log(data);

  const submissions = data.data;
  return (
    <div className="p-6">
      <h1 className="text-xl font-medium mb-6">Submissions</h1>

      <div className="rounded-lg border">
        <SubmissionsTable submissions={submissions} />
      </div>
    </div>
  );
}
