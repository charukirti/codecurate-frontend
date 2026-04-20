import { AcceptDialog } from '@/features/admin/components/accept-dialog';
import { RejectDialog } from '@/features/admin/components/reject-dialog';
import { SubmissionsTable } from '@/features/admin/components/submissions-table';
import { adminSubmissionsQueryOptions } from '@/features/admin/queries/query-options';
import type { submission } from '@/features/admin/types/admin.types';
import { currentUserQueryOptions } from '@/features/auth/queries/useGetCurrentUser';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, isRedirect, redirect } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/admin/submissions')({
  beforeLoad: async ({ context }) => {
    try {
      const user = await context.queryClient.ensureQueryData(currentUserQueryOptions());

      if (user.data.role !== 'admin') redirect({ to: '/auth/sign-in' });
    } catch (error) {
      if (isRedirect(error)) throw error;
      throw redirect({ to: '/auth/sign-in' });
    }
  },
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(adminSubmissionsQueryOptions());
  },
  component: AdminSubmissionsPage,
});

function AdminSubmissionsPage() {
  const { data } = useSuspenseQuery(adminSubmissionsQueryOptions());
  const [selectedSubmission, setSelectedSubmission] = useState<submission | null>(null);
  const [dialog, setDialog] = useState<'accept' | 'reject' | null>(null);

  function onClose() {
    setDialog(null);
    setSelectedSubmission(null);
  }
  const submissions = data.data;
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold ">Submissions</h1>
      <p className="mb-6 text-neutral-400">Review and moderate community submitted resources</p>

      <div className="rounded-lg border">
        <SubmissionsTable
          submissions={submissions}
          onAccept={(submission) => {
            setSelectedSubmission(submission);
            setDialog('accept');
          }}
          onReject={(submission) => {
            setSelectedSubmission(submission);
            setDialog('reject');
          }}
        />

        {dialog === 'reject' && selectedSubmission && (
          <RejectDialog submission={selectedSubmission} onClose={onClose} />
        )}

        {dialog === 'accept' && selectedSubmission && (
          <AcceptDialog submission={selectedSubmission} onClose={onClose} />
        )}
      </div>
    </div>
  );
}
