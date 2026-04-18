import { acceptSubmission } from '@/features/admin/api';
import { adminKeys } from '@/features/admin/queryKeys';
import type { AcceptSubmissionInput } from '@/features/admin/schemas/admin.schema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import toast from 'react-hot-toast';

type AcceptSubmissionMutationArgs = {
  submissionId: string;
  data: AcceptSubmissionInput;
};

export function useAcceptSubmission() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: AcceptSubmissionMutationArgs) => acceptSubmission(params.submissionId, params.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.submissions() });
      toast.success('Submission Accepted');
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage = error.response?.data.message || 'Unable to accept message';
      toast.error(errorMessage);
    },
  });
}
