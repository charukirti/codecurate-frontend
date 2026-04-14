import { SubmissionForm } from '@/features/submissions/components/submission-form';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/submissions/create')({
  component: CreateSubmissionPage,
});

function CreateSubmissionPage() {
  return (
    <div className="max-w-lg mx-auto py-10">
      <h1 className="text-2xl font-semibold mb-6">Suggest a Youtube Video or Playlist</h1>
      <SubmissionForm />
    </div>
  );
}
