import { currentUserQueryOptions } from '@/features/auth/queries/useGetCurrentUser';
import { SubmissionCard } from '@/features/submissions/components/submission-card';
import { SubmissionPageSkeleton } from '@/features/submissions/components/submission-page-skeleton';
import { userSubmissionsQueryOptions } from '@/features/submissions/queries/query-options';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, isRedirect, redirect } from '@tanstack/react-router';
import { FileX } from 'lucide-react';

export const Route = createFileRoute('/submissions/')({
  beforeLoad: async ({ context }) => {
    try {
      const user = await context.queryClient.ensureQueryData(currentUserQueryOptions());
      if (!user) throw redirect({ to: '/auth/sign-in' });
    } catch (error) {
      if (isRedirect(error)) throw error;
      throw redirect({ to: '/auth/sign-in' });
    }
  },
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(userSubmissionsQueryOptions());
  },
  pendingComponent: SubmissionPageSkeleton,
  errorComponent: ({ error }) => (
    <main className="container mx-auto px-4 py-8">
      <p className="text-destructive">{error.message}</p>
    </main>
  ),
  component: MySubmissions,
});

function MySubmissions() {
  const { data: submissionsData } = useSuspenseQuery(userSubmissionsQueryOptions());
  const submissions = submissionsData.data;
  return (
    <section>
      <h1 className="text-2xl font-bold mb-6 text-white">My Submissions ({submissions.length})</h1>

      {submissions.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
          <FileX className="size-10 text-neutral-600" strokeWidth={1.5} />
          <p className="text-neutral-500 text-sm">You haven't made any submissions yet.</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {submissions.map((submission) => (
          <SubmissionCard key={submission.id} data={submission} />
        ))}
      </div>
    </section>
  );
}
