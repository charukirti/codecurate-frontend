import { createSubmission } from '@/features/submissions/api';
import type { CreateSubmissionInput } from '@/features/submissions/schemas/submissions.schema';
import { submissionKeys } from '@/features/submissions/queryKeys';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from '@tanstack/react-router';

export function useCreateSubmission() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: CreateSubmissionInput) => createSubmission(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: submissionKeys.userSubmissions() });
      toast.success('Submission created successfully!');
      router.navigate({ to: '/submissions' });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage = error.response?.data.message || 'An error occurred while creating the submission.';
      toast.error(errorMessage);
    },
  });
}
