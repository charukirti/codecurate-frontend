import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCreateSubmission } from '@/features/submissions/mutations/use-create-submission';
import { createSubmissionSchema, type CreateSubmissionInput } from '@/features/submissions/schemas/submissions.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export function SubmissionForm() {
  const { mutate: createSubmission, isPending } = useCreateSubmission();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateSubmissionInput>({
    resolver: zodResolver(createSubmissionSchema),
  });

  function onSubmit(data: CreateSubmissionInput) {
    createSubmission(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Label htmlFor="title">Title</Label>
        <Input type="text" id="title" {...register('title')} placeholder="Enter video title" />
        {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="url">Video/Playlist URL</Label>
        <Input type="text" id="url" {...register('youtubeURL')} placeholder="Enter YouTube URL" />
        {errors.youtubeURL && <p className="text-sm text-red-500">{errors.youtubeURL.message}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="description">Description</Label>
        <Input type="text" id="description" {...register('description')} placeholder="Enter description" />
        {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="topic">Topic</Label>
        <Input type="text" id="topic" {...register('topic')} placeholder="Enter topic" />
        {errors.topic && <p className="text-sm text-red-500">{errors.topic.message}</p>}
      </div>
      <Button type="submit" disabled={isPending}>
        {isPending ? 'Submitting...' : 'Submit'}
      </Button>
    </form>
  );
}
