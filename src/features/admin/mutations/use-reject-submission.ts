import { rejectSubmission } from '@/features/admin/api';
import { adminKeys } from '@/features/admin/queryKeys';
import type { RejectSubmissionInput } from '@/features/admin/schemas/admin.schema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import toast from 'react-hot-toast';

type RejectSubmissionMutationArgs = {
  submissionId: string;
  data: RejectSubmissionInput;
};

export function useRejectSubmission() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: RejectSubmissionMutationArgs) => rejectSubmission(params.submissionId, params.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.submissions() });
      toast.success('Submission Rejected');
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage = error.response?.data.message || 'Unable to reject message';
      toast.error(errorMessage);
    },
  });
}
